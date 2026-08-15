"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Start seeding...');
    // 1. Initial SiteSettings
    const siteSettings = await prisma.siteSettings.create({
        data: {
            contactEmail: 'hello@surgetechsolar.com',
            contactPhone: '+91 90000 00000',
            contactAddress: 'Surgetech Innovation Hub, Cyberabad, Hyderabad, Telangana, 500081',
            smtpHost: 'smtp.gmail.com',
            smtpPort: 587,
            smtpUser: 'hello@surgetechsolar.com',
            smtpPassEncrypted: 'mock-encrypted-password-replace-me', // User should replace in UI
        },
    });
    console.log('Seeded Site Settings');
    // 2. Initial Email Templates
    await prisma.emailTemplate.create({
        data: {
            name: 'NEW_ENQUIRY',
            subject: 'Your Surgetech Solar Estimate - {{recommendedSystemKw}} kW',
            body: `Hi {{customerName}},

Thank you for exploring solar with Surgetech Solar.

Based on the information you provided, we estimate:

Recommended system: {{recommendedSystemKw}} kW
Estimated annual generation: {{annualGenerationKwh}} kWh
Estimated annual savings: {{annualSavings}}
Estimated payback: {{paybackYears}} years
Location: {{location}}
Electricity provider: {{discom}}

IMPORTANT
This is an approximate estimate, not a final quotation.

Actual pricing, generation and savings may vary based on site
conditions, roof structure, equipment selection, electrical work,
tariffs, government policies, approvals, taxes, financing,
net-metering/export rules and other factors.

A detailed assessment is required before final pricing.

Regards,
Surgetech Solar Team`,
        },
    });
    console.log('Seeded Email Templates');
    // 3. Initial Tariff Data (From old database)
    const tariffs = [
        {
            discomName: 'TSSPDCL',
            consumerCategory: 'residential',
            fixedCharge: 100,
            energySlabs: JSON.stringify([
                { fromKwh: 0, toKwh: 100, ratePerKwh: 1.95 },
                { fromKwh: 101, toKwh: 200, ratePerKwh: 3.10 },
                { fromKwh: 201, toKwh: 300, ratePerKwh: 5.80 },
                { fromKwh: 301, toKwh: 400, ratePerKwh: 7.30 },
                { fromKwh: 401, toKwh: 800, ratePerKwh: 8.80 },
                { fromKwh: 801, ratePerKwh: 9.30 },
            ]),
        },
        {
            discomName: 'TSSPDCL',
            consumerCategory: 'commercial',
            fixedCharge: 200,
            energySlabs: JSON.stringify([
                { fromKwh: 0, toKwh: 50, ratePerKwh: 7.50 },
                { fromKwh: 51, ratePerKwh: 10.50 },
            ]),
        },
        {
            discomName: 'BSES Rajdhani',
            consumerCategory: 'residential',
            fixedCharge: 250,
            energySlabs: JSON.stringify([
                { fromKwh: 0, toKwh: 200, ratePerKwh: 3.00 },
                { fromKwh: 201, toKwh: 400, ratePerKwh: 4.50 },
                { fromKwh: 401, toKwh: 800, ratePerKwh: 6.50 },
                { fromKwh: 801, toKwh: 1200, ratePerKwh: 7.00 },
                { fromKwh: 1201, ratePerKwh: 8.00 },
            ]),
        },
        {
            discomName: 'Generic National Grid',
            consumerCategory: 'residential',
            fixedCharge: 150,
            energySlabs: JSON.stringify([
                { fromKwh: 0, ratePerKwh: 8.50 },
            ]),
        },
        {
            discomName: 'Generic National Grid',
            consumerCategory: 'commercial',
            fixedCharge: 500,
            energySlabs: JSON.stringify([
                { fromKwh: 0, ratePerKwh: 11.00 },
            ]),
        }
    ];
    for (const t of tariffs) {
        await prisma.tariff.create({
            data: t
        });
    }
    console.log('Seeded Tariffs');
    console.log('Seeding finished.');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
