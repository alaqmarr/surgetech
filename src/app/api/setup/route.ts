import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { error: "Invalid input. Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.$transaction(async (tx) => {
      const adminCount = await tx.adminUser.count();
      if (adminCount > 0) {
        throw new Error("ALREADY_SETUP");
      }

      return tx.adminUser.create({
        data: {
          email,
          name,
          passwordHash,
          role: "SUPER_ADMIN",
        },
      });
    });

    return NextResponse.json(
      { message: "Setup completed successfully", user: { email: newAdmin.email } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Setup error:", error);
    if (error.message === "ALREADY_SETUP") {
      return NextResponse.json(
        { error: "Setup already completed. An admin account exists." },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { error: "Failed to setup admin account" },
      { status: 500 }
    );
  }
}
