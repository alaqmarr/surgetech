import { SolarCostModel, Incentive, CashFlowYear } from "./types";

/**
 * Estimates total system cost before incentives.
 */
export function estimateSystemCost(systemSizeKw: number, costModel: SolarCostModel): number {
  return systemSizeKw * costModel.baseCostPerKw;
}

/**
 * Estimates applicable incentives (Subsidies).
 * A simple model based on PM Surya Ghar guidelines where:
 * Up to 2kW: 30k per kW
 * Additional 1kW (up to 3kW): 18k
 * >3kW: capped at 78k
 */
export function estimateIncentive(systemSizeKw: number, incentive: Incentive): number {
  if (incentive.consumerCategory !== "residential") return 0;

  if (systemSizeKw <= 2) {
    return systemSizeKw * 30000;
  } else if (systemSizeKw <= 3) {
    return (2 * 30000) + ((systemSizeKw - 2) * 18000);
  } else {
    return 78000; // Capped
  }
}

/**
 * Computes 25-year cash flow.
 * 
 * @param netInvestment Initial out of pocket cost
 * @param firstYearSavings Savings in year 1
 * @param currentAnnualBill Grid bill in year 1
 * @param postSolarAnnualBill Grid bill in year 1 with solar
 * @param tariffEscalationRate Annual increase in grid rates
 * @param solarDegradationRate Annual decrease in solar generation
 * @param annualMaintenance Base maintenance cost per year
 */
export function calculateCashFlow(
  netInvestment: number,
  currentAnnualBill: number,
  postSolarAnnualBill: number,
  tariffEscalationRate: number,
  solarDegradationRate: number,
  annualMaintenance: number
): CashFlowYear[] {
  const cashFlow: CashFlowYear[] = [];
  
  let cumulativeWithout = 0;
  let cumulativeWith = netInvestment; // Upfront cost in Year 0

  // Year 0
  cashFlow.push({
    year: 0,
    withoutSolar: 0,
    withSolar: netInvestment
  });

  for (let year = 1; year <= 25; year++) {
    // Escalate tariff
    const escalationFactor = Math.pow(1 + tariffEscalationRate, year - 1);
    
    // Escalate maintenance slightly (inflation 5%)
    const inflationFactor = Math.pow(1.05, year - 1);

    // Grid bill goes up
    const yearlyWithout = currentAnnualBill * escalationFactor;
    cumulativeWithout += yearlyWithout;

    // Solar generation goes down, grid bill goes up slightly more if grid usage increases
    // Approx: (Old Bill - Savings * degradation) * escalation
    const degradationFactor = Math.pow(1 - solarDegradationRate, year - 1);
    
    // Original generation was responsible for (currentAnnualBill - postSolarAnnualBill) worth of energy at Year 1 rates.
    const year1Savings = currentAnnualBill - postSolarAnnualBill;
    const currentYearSavings = year1Savings * degradationFactor * escalationFactor;
    
    // So new bill is the new 'without' bill minus the savings from solar.
    // If savings exceed bill, bill is 0 (assuming no payout for excess)
    const yearlyWithGridPart = Math.max(0, yearlyWithout - currentYearSavings);
    
    const yearlyMaintenance = annualMaintenance * inflationFactor;
    
    cumulativeWith += (yearlyWithGridPart + yearlyMaintenance);

    cashFlow.push({
      year,
      withoutSolar: Math.round(cumulativeWithout),
      withSolar: Math.round(cumulativeWith)
    });
  }

  return cashFlow;
}

/**
 * Calculates Payback Period in years from the cash flow.
 */
export function calculatePaybackYears(cashFlow: CashFlowYear[]): number {
  for (let i = 1; i < cashFlow.length; i++) {
    if (cashFlow[i].withSolar < cashFlow[i].withoutSolar) {
      // Find fractional year by linear interpolation
      const prev = cashFlow[i - 1];
      const curr = cashFlow[i];
      
      const prevDiff = prev.withoutSolar - prev.withSolar; // Negative
      const currDiff = curr.withoutSolar - curr.withSolar; // Positive
      
      const fraction = Math.abs(prevDiff) / (currDiff - prevDiff);
      
      return Math.round((prev.year + fraction) * 10) / 10;
    }
  }
  return 25; // If it doesn't pay back in 25 years
}

/**
 * Calculates ROI percentage over 25 years.
 */
export function calculateROI(cashFlow: CashFlowYear[], netInvestment: number): number {
  const finalYear = cashFlow[cashFlow.length - 1];
  const lifetimeNetBenefit = finalYear.withoutSolar - finalYear.withSolar;
  
  if (netInvestment <= 0) return 0;
  
  return Math.round((lifetimeNetBenefit / netInvestment) * 100);
}
