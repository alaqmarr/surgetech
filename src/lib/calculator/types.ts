export type ConsumerCategory = 
  | "residential"
  | "commercial"
  | "industrial"
  | "agricultural"
  | "other";

export type TariffSlab = {
  fromKwh: number;
  toKwh?: number;
  ratePerKwh: number;
};

export type TariffRecord = {
  id: string;
  state: string;
  district?: string;
  discom: string;
  consumerCategory: ConsumerCategory;
  effectiveFrom: string;
  effectiveTo?: string;
  energySlabs: TariffSlab[];
  fixedCharge?: {
    type: "monthly" | "load_based" | "other";
    amount?: number;
    rate?: number; // e.g. per kW of sanctioned load
  };
  demandCharge?: number;
  subsidy?: {
    enabled: boolean;
    description?: string;
  };
  sourceName: string;
  sourceUrl: string;
  verifiedAt: string;
};

export type SolarResourceProfile = {
  region: string;
  peakSunHours: number; // daily average
  annualEquivalentSunHours: number; // yearly total
  performanceRatio: number; // e.g. 0.75 for 75%
};

export type SolarCostModel = {
  baseCostPerKw: number;
  inverterCost?: number;
  mountingCost?: number;
  installationCost?: number;
  electricalBalanceOfSystem?: number;
  optionalBatteryCost?: number;
  maintenanceReserve?: number; // annual
};

export type Incentive = {
  region: string;
  consumerCategory: ConsumerCategory;
  effectiveFrom: string;
  effectiveTo?: string;
  eligibility: string;
  amount?: number; // fixed amount
  percentage?: number; // percentage of system cost
  maxAmount?: number; // cap on percentage-based incentive
  sourceName: string;
  sourceUrl: string;
};

export type LocationContext = {
  pincode: string;
  state: string;
  district?: string;
  city?: string;
  likelyDiscom?: string;
  selectedDiscom?: string;
  source: string;
  resolvedAt: string;
};

// Inputs for the calculation engine
export type CalculatorInputs = {
  location?: LocationContext;
  state?: string; // Fallback if no location
  discom?: string; // Selected discom
  tariff?: TariffRecord; // Injected dynamic tariff
  
  propertyType: ConsumerCategory;
  monthlyBill: number;
  
  // Detailed inputs
  monthlyKwh?: number;
  roofAreaSqFt?: number;
  sanctionedLoadKw?: number;
  
  // Scenarios
  scenario: "conservative" | "expected" | "optimistic";
};

// Outputs from the calculation engine
export type CashFlowYear = {
  year: number;
  withoutSolar: number;
  withSolar: number;
};

export type CalculatorResults = {
  estimatedMonthlyKwh: number;
  recommendedSystemSizeKw: number;
  estimatedAnnualGenerationKwh: number;
  
  // Savings
  currentAnnualBill: number;
  newAnnualBill: number;
  annualSavings: number;
  monthlySavings: number;
  
  // Financials
  estimatedSystemCost: number;
  applicableIncentive: number;
  netInvestment: number;
  paybackYears: number;
  lifetimeSavings25Y: number;
  roiPercentage: number;
  
  // Environmental
  co2AvoidedTonnesPerYear: number;
  
  // Graphs
  cashFlow25Years: CashFlowYear[];
  
  // Meta
  confidenceScore: "High" | "Medium" | "Low";
  assumptions: {
    tariffSource: string;
    solarProfileUsed: string;
    tariffEscalationRate: number;
    solarDegradationRate: number;
  };
};
