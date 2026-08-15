import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Since we only want one global settings record, get the first one or create it if missing
    let settings = await prisma.siteSettings.findFirst();
    
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          contactEmail: "info@surgetechsolar.com",
          contactPhone: "+91 98765 43210",
          contactAddress: "123 Solar Avenue, Clean Energy Park, TS 500001",
        }
      });
    }

    // Do not return SMTP password to the client!
    const { smtpPassEncrypted, ...safeSettings } = settings;

    return NextResponse.json(safeSettings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const {
      contactEmail,
      contactPhone,
      contactAddress,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass, // Incoming plain text password
    } = body;

    let settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { contactEmail } // Minimal creation
      });
    }

    const updateData: any = {
      contactEmail,
      contactPhone,
      contactAddress,
      smtpHost,
      smtpPort: smtpPort ? parseInt(smtpPort) : null,
      smtpUser,
    };

    // If they provided a new SMTP password, update it
    if (smtpPass) {
      updateData.smtpPassEncrypted = smtpPass; // NOTE: In a real app, symmetrically encrypt this!
    }

    const updatedSettings = await prisma.siteSettings.update({
      where: { id: settings.id },
      data: updateData,
    });

    const { smtpPassEncrypted, ...safeSettings } = updatedSettings;

    return NextResponse.json(safeSettings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
