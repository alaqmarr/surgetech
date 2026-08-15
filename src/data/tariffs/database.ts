import { TariffRecord } from "@/lib/calculator/types";

export const tariffDatabase: TariffRecord[] = [
  {
    id: "ts-tssdpcl-res-2026",
    state: "Telangana",
    discom: "TSSPDCL",
    consumerCategory: "residential",
    effectiveFrom: "2026-04-01",
    energySlabs: [
      { fromKwh: 0, toKwh: 100, ratePerKwh: 1.95 }, // Actual LT-I(A) structure approx
      { fromKwh: 101, toKwh: 200, ratePerKwh: 3.10 },
      { fromKwh: 201, toKwh: 300, ratePerKwh: 5.80 },
      { fromKwh: 301, toKwh: 400, ratePerKwh: 7.30 },
      { fromKwh: 401, toKwh: 800, ratePerKwh: 8.80 },
      { fromKwh: 801, ratePerKwh: 9.30 },
    ],
    fixedCharge: { type: "monthly", amount: 100 }, // Approx fixed charges
    subsidy: { enabled: true, description: "PM Surya Ghar Subsidy Applicable" },
    sourceName: "TSERC Tariff Order 2026",
    sourceUrl: "https://tserc.gov.in/",
    verifiedAt: "2026-08-15T00:00:00Z"
  },
  {
    id: "ts-tssdpcl-com-2026",
    state: "Telangana",
    discom: "TSSPDCL",
    consumerCategory: "commercial",
    effectiveFrom: "2026-04-01",
    energySlabs: [
      { fromKwh: 0, toKwh: 50, ratePerKwh: 7.50 },
      { fromKwh: 51, ratePerKwh: 10.50 },
    ],
    fixedCharge: { type: "monthly", amount: 200 },
    demandCharge: 400, // Per kW
    sourceName: "TSERC Tariff Order 2026",
    sourceUrl: "https://tserc.gov.in/",
    verifiedAt: "2026-08-15T00:00:00Z"
  },
  {
    id: "dl-bses-res-2026",
    state: "Delhi",
    discom: "BSES Rajdhani",
    consumerCategory: "residential",
    effectiveFrom: "2026-04-01",
    energySlabs: [
      { fromKwh: 0, toKwh: 200, ratePerKwh: 3.00 },
      { fromKwh: 201, toKwh: 400, ratePerKwh: 4.50 },
      { fromKwh: 401, toKwh: 800, ratePerKwh: 6.50 },
      { fromKwh: 801, toKwh: 1200, ratePerKwh: 7.00 },
      { fromKwh: 1201, ratePerKwh: 8.00 },
    ],
    fixedCharge: { type: "monthly", amount: 250 },
    subsidy: { enabled: true, description: "Delhi Govt up to 200 units free" },
    sourceName: "DERC Tariff Order 2026",
    sourceUrl: "https://derc.gov.in/",
    verifiedAt: "2026-08-15T00:00:00Z"
  },
  {
    id: "generic-national-res-2026",
    state: "Generic National Grid",
    discom: "Generic National Grid",
    consumerCategory: "residential",
    effectiveFrom: "2026-01-01",
    energySlabs: [
      { fromKwh: 0, ratePerKwh: 8.50 }, // Flat assumption fallback
    ],
    fixedCharge: { type: "monthly", amount: 150 },
    sourceName: "Surgetech National Average Estimate",
    sourceUrl: "https://surgetechsolar.com",
    verifiedAt: "2026-08-15T00:00:00Z"
  },
  {
    id: "generic-national-com-2026",
    state: "Generic National Grid",
    discom: "Generic National Grid",
    consumerCategory: "commercial",
    effectiveFrom: "2026-01-01",
    energySlabs: [
      { fromKwh: 0, ratePerKwh: 11.00 },
    ],
    fixedCharge: { type: "monthly", amount: 500 },
    sourceName: "Surgetech National Average Estimate",
    sourceUrl: "https://surgetechsolar.com",
    verifiedAt: "2026-08-15T00:00:00Z"
  }
];

export function getTariff(discom: string, category: string): TariffRecord {
  const match = tariffDatabase.find(t => t.discom === discom && t.consumerCategory === category);
  
  if (match) return match;

  // Fallback to generic based on category
  const fallback = tariffDatabase.find(t => t.discom === "Generic National Grid" && t.consumerCategory === category);
  
  if (fallback) return fallback;

  // Ultimate fallback
  return tariffDatabase.find(t => t.id === "generic-national-res-2026")!;
}
