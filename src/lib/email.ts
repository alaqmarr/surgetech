import nodemailer from "nodemailer";
import { prisma } from "./db";

const DEFAULT_TEMPLATES: Record<string, { subject: string, body: string }> = {
  NEW_ENQUIRY: {
    subject: "Your Solar Estimate from Surgetech",
    body: `Hello {{customerName}},\n\nThank you for exploring solar with Surgetech. Based on your inputs, we recommend a {{recommendedSystemKw}} kW system which could save you {{annualSavings}} annually.\n\nOur engineers will review your request for PIN {{location}} and contact you shortly with a formal quote.\n\nBest,\nSurgetech Solar Team`
  },
  ADMIN_NOTIFICATION: {
    subject: "New Solar Enquiry: {{customerName}}",
    body: "A new enquiry was received.\n\nName: {{customerName}}\nLocation: {{location}}\nRecommended System: {{recommendedSystemKw}} kW\n\nPlease log in to the admin panel to view details."
  }
};

export async function sendTemplatedEmail({
  to,
  templateName,
  variables,
  enquiryId,
}: {
  to: string;
  templateName: string;
  variables: Record<string, string | number>;
  enquiryId?: string;
}) {
  const settings = await prisma.siteSettings.findFirst();
  
  if (!settings?.smtpHost || !settings?.smtpUser || !settings?.smtpPassEncrypted) {
    throw new Error("SMTP credentials are not configured in settings");
  }

  let template = await prisma.emailTemplate.findUnique({
    where: { name: templateName }
  });

  if (!template && DEFAULT_TEMPLATES[templateName]) {
    template = {
      id: "fallback",
      name: templateName,
      subject: DEFAULT_TEMPLATES[templateName].subject,
      body: DEFAULT_TEMPLATES[templateName].body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  if (!template) {
    throw new Error(`Email template ${templateName} not found and no fallback provided`);
  }


  // Parse variables
  let body = template.body;
  let subject = template.subject;

  for (const [key, value] of Object.entries(variables)) {
    const escapedValue = String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    const regex = new RegExp(`{{${key}}}`, 'g');
    body = body.replace(regex, escapedValue);
    subject = subject.replace(regex, escapedValue);
  }

  const transporter = nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort || 587,
    secure: settings.smtpPort === 465,
    auth: {
      user: settings.smtpUser,
      pass: settings.smtpPassEncrypted, // Assuming this is plain text for now, could decrypt
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Surgetech Solar" <${settings.smtpUser}>`,
      to,
      subject,
      text: body, // Provide text version
      html: body.replace(/\n/g, "<br>"), // Basic HTML conversion
    });

    if (enquiryId) {
      await prisma.emailLog.create({
        data: {
          enquiryId,
          templateId: template.id === "fallback" ? undefined : template.id,
          status: "SENT",
        }
      });
    }

    return info;
  } catch (error: any) {
    if (enquiryId) {
      await prisma.emailLog.create({
        data: {
          enquiryId,
          templateId: template.id === "fallback" ? undefined : template.id,
          status: "FAILED",
          error: error.message,
        }
      });
    }
    throw error;
  }
}
