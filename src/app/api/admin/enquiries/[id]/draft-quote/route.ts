import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

    // See if there's already a draft quote
    const existingQuote = await prisma.quote.findFirst({
      where: { enquiryId: id, status: "DRAFT" },
      orderBy: { createdAt: "desc" }
    });

    if (existingQuote) {
      return NextResponse.json({ quote: existingQuote });
    }

    const snapshot = enquiry.calculationSnapshot[0];
    const quoteNumber = `Q-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const quote = await prisma.quote.create({
      data: {
        enquiryId: enquiry.id,
        calculationSnapshotId: snapshot?.id || "",
        quoteNumber,
        status: "DRAFT",
        systemType: "On-Grid",
        structureType: "Flush Mount",
      }
    });

    return NextResponse.json({ quote });
  } catch (error: any) {
    console.error("Draft quote creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
