import { TariffRecord, SolarResourceProfile, SolarCostModel, Incentive } from "./types";

// ==========================================
// SCENARIO CONFIGURATIONS
// ==========================================

export const SCENARIOS = {
  conservative: {
    tariffEscalationRate: 0.03, // 3% annual increase
    solarDegradationRate: 0.007, // 0.7% degradation per year
    performanceRatio: 0.70, // 70% efficiency
  },
  expected: {
    tariffEscalationRate: 0.05, // 5% annual increase
    solarDegradationRate: 0.005, // 0.5% degradation per year
    performanceRatio: 0.75, // 75% efficiency
  },
  optimistic: {
    tariffEscalationRate: 0.07, // 7% annual increase
    solarDegradationRate: 0.004, // 0.4% degradation per year
    performanceRatio: 0.80, // 80% efficiency
  }
};

// ==========================================
// GENERIC TARIFF DATA (Phase 1 Placeholders)
// ==========================================

// Generic National Average Slab (Used as fallback)
export const GENERIC_TARIFF: TariffRecord = {
  id: "generic-national",
  state: "National Average",
  discom: "Generic DISCOM",
  consumerCategory: "residential",
  effectiveFrom: "2024-01-01",
  energySlabs: [
    { fromKwh: 0, toKwh: 100, ratePerKwh: 3.5 },
    { fromKwh: 101, toKwh: 200, ratePerKwh: 4.5 },
    { fromKwh: 201, toKwh: 400, ratePerKwh: 6.5 },
    { fromKwh: 401, ratePerKwh: 8.0 }
  ],
  fixedCharge: {
    type: "monthly",
    amount: 150
  },
  sourceName: "Surgetech Generic Estimate",
  sourceUrl: "#",
  verifiedAt: "2024-01-01"
};

// ==========================================
// SOLAR PROFILES
// ==========================================

// India receives roughly 4.5 to 5.5 kWh/m2/day. 
// We use a safe average of 4.5 Peak Sun Hours for calculations.
export const DEFAULT_SOLAR_PROFILE: SolarResourceProfile = {
  region: "India (Average)",
  peakSunHours: 4.5,
  annualEquivalentSunHours: 4.5 * 365, // 1642.5
  performanceRatio: SCENARIOS.expected.performanceRatio, 
};

// ==========================================
// SYSTEM COSTS
// ==========================================

// Cost assumptions per kW for a grid-tied residential system in India.
export const DEFAULT_COST_MODEL: SolarCostModel = {
  baseCostPerKw: 45000, // INR 45,000 per kW (Panels, Inverter, BOS, Installation)
  maintenanceReserve: 500, // INR 500 per kW per year
};

// ==========================================
// INCENTIVES (PM Surya Ghar / National Subsidy)
// ==========================================

// National residential subsidy scheme (up to 3kW focus)
export const NATIONAL_SUBSIDY: Incentive = {
  region: "National",
  consumerCategory: "residential",
  effectiveFrom: "2024-02-01",
  eligibility: "Residential consumers installing grid-connected rooftop solar.",
  amount: 30000, // This is an approximation. The actual structure is slab-based. 
                 // We will handle dynamic calculation in the subsidy module.
  sourceName: "PM Surya Ghar Muft Bijli Yojana",
  sourceUrl: "https://pmsuryaghar.gov.in/",
};

// ==========================================
// ENVIRONMENTAL
// ==========================================

// India Grid Emission Factor: ~0.71 kg CO2 per kWh
export const GRID_EMISSION_FACTOR = 0.71; 
