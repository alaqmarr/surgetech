import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, phone, type, message } = data;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        type: type || "General",
        message,
      },
    });

    // 2. Fetch SMTP settings and Notification Emails
    const settings = await prisma.siteSettings.findFirst();
    const notificationEmails = await prisma.notificationEmail.findMany({
      where: { isActive: true },
    });

    // 3. Send Email (if configured)
    if (
      settings?.smtpHost &&
      settings?.smtpPort &&
      settings?.smtpUser &&
      settings?.smtpPassEncrypted &&
      notificationEmails.length > 0
    ) {
      const transporter = nodemailer.createTransport({
        host: settings.smtpHost,
        port: settings.smtpPort,
        secure: settings.smtpPort === 465, // true for 465, false for other ports
        auth: {
          user: settings.smtpUser,
          pass: settings.smtpPassEncrypted, // Assuming stored as plain for now or decrypted if needed
        },
      });

      const escapeHtml = (str: string) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
      const bccList = notificationEmails.map(ne => ne.email).join(", ");

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
          <h2 style="color: #06b6d4; margin-top: 0;">New Contact Form Submission</h2>
          <p style="color: #555;">You have received a new message from the Surgetech Solar website.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5; width: 120px; font-weight: bold; color: #333;">Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5; color: #555;">${escapeHtml(firstName)} ${escapeHtml(lastName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5;"><a href="mailto:${escapeHtml(email)}" style="color: #06b6d4;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5; color: #555;">${escapeHtml(phone) || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5; font-weight: bold; color: #333;">Type:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5; color: #555;">${escapeHtml(type)}</td>
            </tr>
          </table>
          <h4 style="margin-bottom: 8px; color: #333;">Message:</h4>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; color: #555; white-space: pre-wrap;">${escapeHtml(message)}</div>
          <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">This is an automated notification from your Surgetech Solar website.</p>
        </div>
      `;

      try {
        await transporter.sendMail({
          from: `"Surgetech Website" <${settings.smtpUser}>`,
          to: settings.contactEmail || settings.smtpUser, // Send to main contact email
          bcc: bccList, // BCC all admin notification emails
          subject: `New Lead: ${firstName} ${lastName} (${type})`,
          html: htmlContent,
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // We still return success since the message was saved to the DB
      }
    } else {
      console.warn("Skipping email notification: SMTP settings or Notification Emails are missing.");
    }

    return NextResponse.json({ success: true, id: contactMessage.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
