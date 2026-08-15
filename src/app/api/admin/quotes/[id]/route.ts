import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    const quote = await prisma.quote.findUnique({
      where: { id },
      include: {
        lineItems: {
          orderBy: { sortOrder: "asc" }
        },
        enquiry: true,
        calculationSnapshot: true,
      }
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({ quote });
  } catch (error: any) {
    console.error("Quote fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    const { 
      systemType, 
      structureType, 
      subtotal, 
      taxAmount, 
      discount, 
      totalAmount, 
      notes, 
      terms,
      lineItems
    } = body;

    // Use a transaction to update quote and replace line items safely
    const updatedQuote = await prisma.$transaction(async (tx) => {
      // 1. Update the main quote
      const quote = await tx.quote.update({
        where: { id },
        data: {
          systemType,
          structureType,
          subtotal: subtotal ? parseFloat(subtotal) : null,
          taxAmount: taxAmount ? parseFloat(taxAmount) : null,
          discount: discount ? parseFloat(discount) : null,
          totalAmount: totalAmount ? parseFloat(totalAmount) : null,
          notes,
          terms,
        }
      });

      // 2. Delete existing line items
      await tx.quoteLineItem.deleteMany({
        where: { quoteId: id }
      });

      // 3. Insert new line items and update Catalog
      if (lineItems && Array.isArray(lineItems) && lineItems.length > 0) {
        await tx.quoteLineItem.createMany({
          data: lineItems.map((item: any, index: number) => ({
            quoteId: id,
            name: item.name,
            description: item.description,
            quantity: parseFloat(item.quantity) || 1,
            uom: item.uom || "Unit",
            unitPrice: parseFloat(item.unitPrice) || 0,
            total: (parseFloat(item.quantity) || 1) * (parseFloat(item.unitPrice) || 0),
            sortOrder: index,
          }))
        });

        // 4. Auto-add new unique items to the Catalog for future use
        for (const item of lineItems) {
          if (!item.name) continue;
          
          const existingItem = await tx.catalogItem.findUnique({
            where: { name: item.name }
          });
          
          if (!existingItem) {
            await tx.catalogItem.create({
              data: {
                name: item.name,
                category: "General",
                uom: item.uom || "Unit",
                unitPrice: parseFloat(item.unitPrice) || 0,
                description: item.description || ""
              }
            });
          }
        }
      }

      // Return the updated quote with fresh line items
      return await tx.quote.findUnique({
        where: { id },
        include: {
          lineItems: {
            orderBy: { sortOrder: "asc" }
          }
        }
      });
    });

    return NextResponse.json({ quote: updatedQuote });
  } catch (error: any) {
    console.error("Quote update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
