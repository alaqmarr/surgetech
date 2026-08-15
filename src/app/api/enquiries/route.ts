import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { runSolarCalculation } from "@/lib/calculator";
import { getTariff } from "@/data/tariffs/database";
import { sendTemplatedEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, pinCode, monthlyBill, propertyType, scenario } = data;

    if (!email || !pinCode || !monthlyBill || !propertyType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const safeScenario = scenario || "expected";
    if (!['conservative', 'expected', 'optimistic'].includes(safeScenario)) {
      return NextResponse.json({ error: "Invalid scenario" }, { status: 400 });
    }

    // 1. Resolve Tariff
    // Quick heuristic for discom
    let discom = "Generic National Grid";
    const pinStr = String(pinCode);
    if (pinStr.startsWith("50")) discom = "TSSPDCL";
    else if (pinStr.startsWith("11")) discom = "BSES Rajdhani";

    const tariff = getTariff(discom, propertyType);

    // 2. Run Calc to get Snapshot
    const calcResults = runSolarCalculation({
      state: "Generic National Grid",
      discom,
      tariff,
      propertyType,
      monthlyBill,
      scenario: safeScenario as any,
    });

    // 3. Create Enquiry & Snapshot in DB
    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        phone,
        pinCode,
        monthlyBill,
        propertyType,
        status: "NEW",
        calculationSnapshot: {
          create: {
            recommendedSystemSizeKw: calcResults.recommendedSystemSizeKw,
            annualSavings: calcResults.annualSavings,
            paybackYears: calcResults.paybackYears,
            lifetimeSavings25Y: calcResults.lifetimeSavings25Y,
          }
        }
      },
      include: {
        calculationSnapshot: true
      }
    });

    // 4. Send Auto-Reply Email
    try {
      await sendTemplatedEmail({
        to: email,
        templateName: "NEW_ENQUIRY",
        variables: {
          customerName: name || "Valued Customer",
          recommendedSystemKw: calcResults.recommendedSystemSizeKw,
          annualGenerationKwh: Math.round(calcResults.estimatedAnnualGenerationKwh),
          annualSavings: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(calcResults.annualSavings),
          paybackYears: calcResults.paybackYears,
          location: `PIN ${pinCode}`,
          discom: discom
        },
        enquiryId: enquiry.id
      });
      
      // 5. Send Admin Notification Email
      const adminEmails = await prisma.notificationEmail.findMany({ where: { isActive: true } });
      for (const admin of adminEmails) {
        try {
          await sendTemplatedEmail({
            to: admin.email,
            templateName: "ADMIN_NOTIFICATION",
            variables: {
              customerName: name || "Unknown",
              recommendedSystemKw: calcResults.recommendedSystemSizeKw,
              location: `PIN ${pinCode}`,
            },
            enquiryId: enquiry.id // Links this log to the same enquiry
          });
        } catch (adminEmailError) {
          console.error(`Failed to send admin notification to ${admin.email}:`, adminEmailError);
        }
      }
    } catch (e) {
      console.error("Failed to send auto-reply email:", e);
      // We don't fail the enquiry creation if the email fails.
    }

    return NextResponse.json({ success: true, enquiryId: enquiry.id });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
