import { prisma } from './src/lib/db';

const NEW_ENQUIRY_BODY = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; background-color: #ffffff; }
  .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eaeaea; }
  .header h1 { color: #0f172a; margin: 0; font-size: 24px; }
  .content { padding: 20px 0; }
  .stat-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px; margin-bottom: 15px; }
  .stat-box h3 { margin-top: 0; color: #0f172a; font-size: 16px; margin-bottom: 10px; }
  .stat-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
  .stat-label { color: #64748b; font-size: 14px; }
  .stat-value { font-weight: bold; color: #0f172a; font-size: 14px; }
  .highlight { color: #22c55e; font-weight: bold; font-size: 16px; }
  .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #94a3b8; }
  .disclaimer { font-size: 11px; color: #cbd5e1; margin-top: 20px; border-top: 1px solid #f1f5f9; padding-top: 15px; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Surgetech Solar Estimate</h1>
    </div>
    
    <div class="content">
      <p>Hi <strong>{{customerName}}</strong>,</p>
      <p>Thank you for exploring solar with Surgetech Solar. Based on the information you provided for <strong>{{location}}</strong> ({{discom}}), here is your preliminary estimate.</p>
      
      <div class="stat-box">
        <h3>System Details</h3>
        <div class="stat-row">
          <span class="stat-label">Recommended System:</span>
          <span class="stat-value">{{recommendedSystemKw}} kW</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Estimated Annual Generation:</span>
          <span class="stat-value">{{annualGenerationKwh}} kWh</span>
        </div>
      </div>

      <div class="stat-box">
        <h3>Financial Outlook</h3>
        <div class="stat-row">
          <span class="stat-label">Estimated Annual Savings:</span>
          <span class="stat-value highlight">{{annualSavings}}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Estimated Payback Period:</span>
          <span class="stat-value">{{paybackYears}} years</span>
        </div>
      </div>
      
      <p>Our engineering team will review your request and contact you shortly to provide a formal, customized quotation.</p>
      
      <div class="disclaimer">
        <strong>IMPORTANT:</strong> This is an approximate estimate, not a final quotation. Actual pricing, generation, and savings may vary based on site conditions, roof structure, equipment selection, electrical work, tariffs, government policies, and other factors. A detailed assessment is required before final pricing.
      </div>
    </div>
    
    <div class="footer">
      &copy; 2026 Surgetech Solar. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

const ADMIN_NOTIFICATION_BODY = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; background-color: #f8fafc; }
  .header { padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
  .header h2 { color: #b91c1c; margin: 0; }
  .content { padding: 20px 0; }
  .detail { margin-bottom: 10px; }
  .label { font-weight: bold; color: #475569; display: inline-block; width: 150px; }
  .value { color: #0f172a; }
  .btn { display: inline-block; background-color: #0f172a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Solar Enquiry Received</h2>
    </div>
    <div class="content">
      <div class="detail"><span class="label">Customer Name:</span> <span class="value">{{customerName}}</span></div>
      <div class="detail"><span class="label">Location:</span> <span class="value">{{location}}</span></div>
      <div class="detail"><span class="label">System Size:</span> <span class="value">{{recommendedSystemKw}} kW</span></div>
      
      <a href="https://surgetechsolar.com/admin/enquiries" class="btn">View Enquiry Dashboard</a>
    </div>
  </div>
</body>
</html>
`;

const QUOTE_SENT_BODY = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; }
  .container { max-width: 650px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
  .header { text-align: center; padding-bottom: 25px; border-bottom: 2px solid #06b6d4; }
  .header h1 { color: #0f172a; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
  .header p { color: #64748b; margin: 5px 0 0 0; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; font-weight: bold; }
  .content { padding: 30px 0; }
  .greeting { font-size: 18px; margin-bottom: 25px; color: #1e293b; }
  
  .quote-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
  .quote-card { background: linear-gradient(145deg, #f8fafc, #f1f5f9); border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; }
  .quote-card.highlight { background: linear-gradient(145deg, #ecfdf5, #d1fae5); border-color: #34d399; }
  
  .card-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; margin-bottom: 10px; }
  .highlight .card-title { color: #059669; }
  
  .stat { margin-bottom: 12px; }
  .stat:last-child { margin-bottom: 0; }
  .stat-label { font-size: 13px; color: #475569; display: block; margin-bottom: 2px; }
  .stat-value { font-size: 20px; font-weight: 800; color: #0f172a; }
  .highlight .stat-value { color: #065f46; font-size: 24px; }
  
  .next-steps { background-color: #0f172a; color: white; padding: 25px; border-radius: 10px; margin-top: 30px; }
  .next-steps h3 { margin-top: 0; color: #38bdf8; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; }
  .next-steps p { margin-bottom: 0; color: #cbd5e1; }
  
  .footer { margin-top: 40px; text-align: center; padding-top: 20px; border-top: 1px solid #f1f5f9; }
  .footer p { color: #94a3b8; font-size: 12px; margin: 5px 0; }
  
  /* Fallback for email clients that don't support grid */
  @media only screen and (max-width: 600px) {
    .quote-grid { display: block; }
    .quote-card { margin-bottom: 20px; }
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Formal Solar Quote</h1>
      <p>Quote Ref: {{quoteNumber}}</p>
    </div>
    
    <div class="content">
      <div class="greeting">
        Hello <strong>{{customerName}}</strong>,
      </div>
      <p>Based on our engineering review of your property at <strong>{{location}}</strong>, we are pleased to present your formal solar quotation.</p>
      
      <div class="quote-grid" style="display: flex; gap: 20px; margin-bottom: 30px;">
        <div class="quote-card" style="flex: 1;">
          <div class="card-title">System Specifications</div>
          <div class="stat">
            <span class="stat-label">System Size</span>
            <span class="stat-value">{{systemSizeKw}} kW</span>
          </div>
          <div class="stat">
            <span class="stat-label">Estimated Annual Generation</span>
            <span class="stat-value">{{annualGeneration}} kWh</span>
          </div>
        </div>
        
        <div class="quote-card highlight" style="flex: 1;">
          <div class="card-title">Financial Summary</div>
          <div class="stat">
            <span class="stat-label">Net Investment (After Subsidy)</span>
            <span class="stat-value">{{netInvestment}}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Estimated Annual Savings</span>
            <span class="stat-value" style="color: #065f46;">{{annualSavings}}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Payback Period</span>
            <span class="stat-value">{{paybackYears}} years</span>
          </div>
        </div>
      </div>
      
      <div class="next-steps">
        <h3>Next Steps</h3>
        <p>One of our solar specialists will call you shortly to discuss this quote in detail, explain the installation process, and answer any questions you may have.</p>
      </div>
    </div>
    
    <div class="footer">
      <p>Surgetech Solar | Innovating for a Greener Tomorrow</p>
      <p>Need help? Reply to this email or call us at {{contactPhone}}.</p>
    </div>
  </div>
</body>
</html>
`;

async function main() {
  console.log('Updating email templates to HTML versions...');

  await prisma.emailTemplate.upsert({
    where: { name: 'NEW_ENQUIRY' },
    update: {
      subject: 'Your Surgetech Solar Estimate - {{recommendedSystemKw}} kW',
      body: NEW_ENQUIRY_BODY,
    },
    create: {
      name: 'NEW_ENQUIRY',
      subject: 'Your Surgetech Solar Estimate - {{recommendedSystemKw}} kW',
      body: NEW_ENQUIRY_BODY,
    }
  });
  console.log('Updated NEW_ENQUIRY template.');

  await prisma.emailTemplate.upsert({
    where: { name: 'ADMIN_NOTIFICATION' },
    update: {
      subject: 'New Solar Enquiry: {{customerName}}',
      body: ADMIN_NOTIFICATION_BODY,
    },
    create: {
      name: 'ADMIN_NOTIFICATION',
      subject: 'New Solar Enquiry: {{customerName}}',
      body: ADMIN_NOTIFICATION_BODY,
    }
  });
  console.log('Updated ADMIN_NOTIFICATION template.');

  await prisma.emailTemplate.upsert({
    where: { name: 'QUOTE_SENT' },
    update: {
      subject: 'Your Formal Solar Quote [{{quoteNumber}}] from Surgetech',
      body: QUOTE_SENT_BODY,
    },
    create: {
      name: 'QUOTE_SENT',
      subject: 'Your Formal Solar Quote [{{quoteNumber}}] from Surgetech',
      body: QUOTE_SENT_BODY,
    }
  });
  console.log('Created QUOTE_SENT template.');

  console.log('Successfully updated all templates!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
