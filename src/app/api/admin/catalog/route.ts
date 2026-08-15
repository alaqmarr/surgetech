import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category");

    const items = await prisma.catalogItem.findMany({
      where: {
        AND: [
          query ? { name: { contains: query } } : {},
          category ? { category } : {}
        ]
      },
      take: 20,
      orderBy: { name: "asc" }
    });

    return NextResponse.json({ items });
  } catch (error: any) {
    console.error("Catalog fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { name, category, uom, unitPrice, description } = body;

    if (!name || !uom || unitPrice === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.catalogItem.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json({ error: "Item with this name already exists" }, { status: 400 });
    }

    const item = await prisma.catalogItem.create({
      data: {
        name,
        category,
        uom,
        unitPrice: parseFloat(unitPrice),
        description
      }
    });

    return NextResponse.json({ item });
  } catch (error: any) {
    console.error("Catalog creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
