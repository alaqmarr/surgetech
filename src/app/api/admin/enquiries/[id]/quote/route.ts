import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sendTemplatedEmail } from "@/lib/email";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
      include: {
        calculationSnapshot: true,
      }
    });

    if (!enquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    if (enquiry.calculationSnapshot.length === 0) {
      return NextResponse.json({ error: "No calculation snapshot found for this enquiry" }, { status: 400 });
    }

    const snapshot = enquiry.calculationSnapshot[0];
    
    // Generate a simple quote number
    const quoteNumber = `Q-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const siteSettings = await prisma.siteSettings.findFirst();

    const formatCurrency = (val: number) => 
      new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    // Estimate cost based on system size (assuming 60,000 INR per kW)
    const estimatedCost = snapshot.recommendedSystemSizeKw * 60000;
    // Assume a flat subsidy for simplicity, e.g., 78000 for residential up to 3kW, etc. 
    // We'll just show the payback and savings from the snapshot and a generic cost.
    const netInvestment = estimatedCost * 0.7; // assuming 30% subsidy on average for the quote display

    // Create the quote record
    const quote = await prisma.quote.create({
      data: {
        enquiryId: enquiry.id,
        calculationSnapshotId: snapshot.id,
        quoteNumber,
        status: "SENT",
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Valid for 30 days
      }
    });

    // Update enquiry status
    await prisma.enquiry.update({
      where: { id },
      data: { status: "QUOTED" }
    });

    if (enquiry.email) {
      try {
        await sendTemplatedEmail({
          to: enquiry.email,
          templateName: "QUOTE_SENT",
          variables: {
            customerName: enquiry.name || "Customer",
            quoteNumber: quoteNumber,
            location: `PIN ${enquiry.pinCode}`,
            systemSizeKw: snapshot.recommendedSystemSizeKw,
            annualGeneration: Math.round(snapshot.recommendedSystemSizeKw * 1400), // Approx generation
            netInvestment: formatCurrency(netInvestment),
            annualSavings: formatCurrency(snapshot.annualSavings),
            paybackYears: snapshot.paybackYears,
            contactPhone: siteSettings?.contactPhone || "+91 90000 00000"
          },
          enquiryId: enquiry.id
        });
      } catch (emailError) {
        console.error("Failed to send quote email:", emailError);
        // Continue, the quote is created in DB even if email fails
      }
    }

    return NextResponse.json({ success: true, quote });
  } catch (error: any) {
    console.error("Quote generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
