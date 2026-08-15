import { CalculatorInputs, CalculatorResults, TariffRecord, SolarResourceProfile } from "./types";
import { GENERIC_TARIFF, DEFAULT_SOLAR_PROFILE, SCENARIOS, DEFAULT_COST_MODEL, NATIONAL_SUBSIDY } from "./assumptions";
import { estimateKwhFromBill } from "./calculateSlabBill";
import { calculateRequiredSystemSize, calculateRoofCapacity, recommendSystemSize } from "./calculateSystemSize";
import { calculateAnnualGeneration } from "./calculateGeneration";
import { calculateSavings } from "./calculateSavings";
import { estimateSystemCost, estimateIncentive, calculateCashFlow, calculatePaybackYears, calculateROI } from "./calculateFinancials";
import { calculateCO2Avoided } from "./calculateEmissions";

/**
 * Main calculation engine function that processes user inputs and generates full financial and technical results.
 */
export function runSolarCalculation(inputs: CalculatorInputs): CalculatorResults {
  // 1. Resolve Tariff and Profile
  const tariff: TariffRecord = inputs.tariff || GENERIC_TARIFF;
  const profile: SolarResourceProfile = { 
    ...DEFAULT_SOLAR_PROFILE, 
    performanceRatio: SCENARIOS[inputs.scenario].performanceRatio 
  };
  const scenarioConfig = SCENARIOS[inputs.scenario];

  // 2. Estimate Current Consumption
  const estimatedMonthlyKwh = inputs.monthlyKwh 
    ? inputs.monthlyKwh 
    : estimateKwhFromBill(inputs.monthlyBill, tariff);

  const annualKwh = estimatedMonthlyKwh * 12;
  const currentAnnualBill = inputs.monthlyBill * 12;

  // 3. System Sizing
  const requiredKw = calculateRequiredSystemSize(annualKwh, profile);
  const roofKw = inputs.roofAreaSqFt ? calculateRoofCapacity(inputs.roofAreaSqFt) : undefined;
  const recommendedKw = recommendSystemSize(requiredKw, roofKw);

  // 4. Generation
  const annualGeneration = calculateAnnualGeneration(recommendedKw, profile);

  // 5. Savings (Year 1)
  const savingsResult = calculateSavings(estimatedMonthlyKwh, annualGeneration / 12, tariff);
  const newAnnualBill = savingsResult.newBill * 12;
  const annualSavings = savingsResult.monthlySavings * 12;

  // 6. Financial Costs & Incentives
  const estimatedSystemCost = estimateSystemCost(recommendedKw, DEFAULT_COST_MODEL);
  const applicableIncentive = estimateIncentive(recommendedKw, NATIONAL_SUBSIDY);
  const netInvestment = Math.max(0, estimatedSystemCost - applicableIncentive);

  // 7. Cash Flow & ROI over 25 Years
  const cashFlow = calculateCashFlow(
    netInvestment,
    currentAnnualBill,
    newAnnualBill,
    scenarioConfig.tariffEscalationRate,
    scenarioConfig.solarDegradationRate,
    DEFAULT_COST_MODEL.maintenanceReserve! * recommendedKw
  );

  const paybackYears = calculatePaybackYears(cashFlow);
  const roiPercentage = calculateROI(cashFlow, netInvestment);
  const finalYear = cashFlow[cashFlow.length - 1];
  const lifetimeSavings25Y = finalYear.withoutSolar - finalYear.withSolar;

  // 8. Environmental
  const co2AvoidedTonnesPerYear = calculateCO2Avoided(annualGeneration);

  // 9. Confidence Score
  let confidenceScore: "High" | "Medium" | "Low" = "Low";
  if (inputs.tariff && inputs.location && inputs.tariff.discom !== "Generic National Grid") {
    confidenceScore = "High";
  } else if (inputs.tariff && inputs.tariff.discom !== "Generic National Grid") {
    confidenceScore = "Medium";
  } else {
    confidenceScore = "Low";
  }

  return {
    estimatedMonthlyKwh: Math.round(estimatedMonthlyKwh),
    recommendedSystemSizeKw: recommendedKw,
    estimatedAnnualGenerationKwh: Math.round(annualGeneration),
    
    currentAnnualBill: Math.round(currentAnnualBill),
    newAnnualBill: Math.round(newAnnualBill),
    annualSavings: Math.round(annualSavings),
    monthlySavings: Math.round(savingsResult.monthlySavings),
    
    estimatedSystemCost: Math.round(estimatedSystemCost),
    applicableIncentive: Math.round(applicableIncentive),
    netInvestment: Math.round(netInvestment),
    paybackYears,
    lifetimeSavings25Y,
    roiPercentage,
    
    co2AvoidedTonnesPerYear,
    
    cashFlow25Years: cashFlow,
    
    confidenceScore,
    assumptions: {
      tariffSource: tariff.sourceName,
      solarProfileUsed: profile.region,
      tariffEscalationRate: scenarioConfig.tariffEscalationRate,
      solarDegradationRate: scenarioConfig.solarDegradationRate,
    }
  };
}
