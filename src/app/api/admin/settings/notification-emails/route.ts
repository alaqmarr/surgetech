import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const emails = await prisma.notificationEmail.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(emails);
  } catch (error) {
    console.error("Failed to fetch notification emails:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const newEmail = await prisma.notificationEmail.create({
      data: {
        email,
        name: name || null,
        isActive: true,
      },
    });

    return NextResponse.json(newEmail);
  } catch (error) {
    console.error("Failed to create notification email:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
