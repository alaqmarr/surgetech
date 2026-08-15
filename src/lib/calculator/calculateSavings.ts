import { calculateBillFromKwh } from "./calculateSlabBill";
import { TariffRecord } from "./types";

/**
 * Calculates new grid bill and savings after solar installation.
 * Uses Net Metering logic where exports offset imports.
 * 
 * @param originalMonthlyKwh The original grid consumption before solar
 * @param monthlySolarGenerationKwh Estimated solar generation for the month
 * @param tariff The tariff rules
 * @param selfConsumptionRatio Estimated percentage of solar consumed directly (0 to 1)
 * @returns An object containing the new bill and savings
 */
export function calculateSavings(
  originalMonthlyKwh: number,
  monthlySolarGenerationKwh: number,
  tariff: TariffRecord,
  selfConsumptionRatio: number = 0.5 // Default 50% consumed during day, 50% exported
) {
  // 1. Calculate the baseline bill without solar
  const originalBill = calculateBillFromKwh(originalMonthlyKwh, tariff);

  // 2. Separate solar into self-consumption and export
  // You cannot self-consume more than your total consumption
  const maxSelfConsumption = Math.min(originalMonthlyKwh, monthlySolarGenerationKwh);
  const estimatedSelfConsumption = Math.min(maxSelfConsumption, monthlySolarGenerationKwh * selfConsumptionRatio);
  const exportedKwh = monthlySolarGenerationKwh - estimatedSelfConsumption;

  // 3. Under standard Net Metering, remaining grid consumption = original - self-consumed
  // AND exported units offset remaining units 1:1 up to the total import.
  // (Note: In pure net metering, we just do: netKwh = originalMonthlyKwh - monthlySolarGenerationKwh)
  // We'll use the pure net metering approach which is standard in most Indian states for residential.
  
  const netGridImportKwh = Math.max(0, originalMonthlyKwh - monthlySolarGenerationKwh);
  
  // 4. Calculate the new bill for the net grid import
  let newBill = calculateBillFromKwh(netGridImportKwh, tariff);
  
  // 5. Some states pay for net exports at a fixed feed-in tariff (usually lower than import tariff)
  // For simplicity in Phase 1, we assume no cash payout for net exports, they just offset the bill to 0 (excluding fixed charges).
  
  // Fixed charges still apply even if net import is 0
  if (netGridImportKwh === 0 && tariff.fixedCharge?.amount) {
    newBill = Math.max(newBill, tariff.fixedCharge.amount);
  }

  const monthlySavings = Math.max(0, originalBill - newBill);

  return {
    originalBill,
    newBill,
    monthlySavings,
    selfConsumedKwh: estimatedSelfConsumption,
    exportedKwh
  };
}
