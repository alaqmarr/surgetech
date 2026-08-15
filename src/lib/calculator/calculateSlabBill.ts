import { TariffRecord } from "./types";

/**
 * Calculates the total electricity bill based on a progressive slab tariff.
 * 
 * @param monthlyKwh The total kWh consumed in a month
 * @param tariff The tariff record containing slab rates and fixed charges
 * @returns The total estimated monthly bill
 */
export function calculateBillFromKwh(monthlyKwh: number, tariff: TariffRecord): number {
  if (monthlyKwh <= 0) return 0;

  let totalEnergyCharge = 0;
  let remainingKwh = monthlyKwh;

  // Ensure slabs are sorted by fromKwh
  const sortedSlabs = [...tariff.energySlabs].sort((a, b) => a.fromKwh - b.fromKwh);

  for (const slab of sortedSlabs) {
    if (remainingKwh <= 0) break;

    const slabCapacity = slab.toKwh 
      ? (slab.toKwh - slab.fromKwh) 
      : Infinity; // If no toKwh, it's the final open-ended slab

    const kwhInThisSlab = Math.min(remainingKwh, slabCapacity);
    totalEnergyCharge += kwhInThisSlab * slab.ratePerKwh;
    remainingKwh -= kwhInThisSlab;
  }

  // Add fixed charges
  let totalFixedCharge = 0;
  if (tariff.fixedCharge) {
    if (tariff.fixedCharge.type === "monthly" && tariff.fixedCharge.amount) {
      totalFixedCharge = tariff.fixedCharge.amount;
    }
    // Note: load_based fixed charges would require the user's sanctioned load.
    // For simplicity in generic estimates, we assume a base amount if provided.
  }

  return totalEnergyCharge + totalFixedCharge;
}

/**
 * Reverse calculates estimated monthly kWh from a target monthly bill amount.
 * It uses a binary search approach since the slab function is monotonically increasing.
 * 
 * @param monthlyBill Target monthly bill in INR
 * @param tariff The tariff record
 * @returns Estimated monthly kWh
 */
export function estimateKwhFromBill(monthlyBill: number, tariff: TariffRecord): number {
  if (monthlyBill <= 0) return 0;
  if (tariff.fixedCharge?.amount && monthlyBill <= tariff.fixedCharge.amount) return 0;

  let low = 0;
  let high = 10000; // Unlikely to exceed 10k kWh for residential quick estimate
  
  // Quick bounds check
  const maxBill = calculateBillFromKwh(high, tariff);
  if (monthlyBill >= maxBill) {
    // If it exceeds bounds, just extrapolate linearly from the highest slab rate
    const highestSlab = tariff.energySlabs.reduce((prev, current) => 
      (prev.ratePerKwh > current.ratePerKwh) ? prev : current
    );
    return high + ((monthlyBill - maxBill) / highestSlab.ratePerKwh);
  }

  // Binary search for the kWh that produces the bill
  let iterations = 0;
  while (low <= high && iterations < 50) {
    const mid = low + (high - low) / 2;
    const midBill = calculateBillFromKwh(mid, tariff);
    
    if (Math.abs(midBill - monthlyBill) < 1) { // Within 1 INR
      return mid;
    }
    
    if (midBill < monthlyBill) {
      low = mid;
    } else {
      high = mid;
    }
    iterations++;
  }

  return low + (high - low) / 2; // Best estimate
}

/**
 * Calculates the effective rate per kWh based on total bill and consumption.
 */
export function calculateEffectiveRate(monthlyBill: number, monthlyKwh: number): number {
  if (monthlyKwh <= 0) return 0;
  return monthlyBill / monthlyKwh;
}
