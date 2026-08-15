import { SolarResourceProfile } from "./types";

/**
 * Calculates the required system size based on annual consumption.
 * @param annualKwh Annual electricity consumption in kWh
 * @param profile Solar resource profile
 * @returns Recommended system size in kW
 */
export function calculateRequiredSystemSize(annualKwh: number, profile: SolarResourceProfile): number {
  if (annualKwh <= 0) return 0;
  
  // Required Solar Capacity (kW) ≈ Annual Electricity Consumption / Expected Annual Generation per kW
  const annualGenerationPerKw = profile.annualEquivalentSunHours * profile.performanceRatio;
  
  const requiredKw = annualKwh / annualGenerationPerKw;
  
  // Round to nearest 0.1 kW
  return Math.round(requiredKw * 10) / 10;
}

/**
 * Calculates maximum system size that can fit on the roof.
 * @param roofAreaSqFt Roof area in square feet
 * @returns Maximum system size in kW
 */
export function calculateRoofCapacity(roofAreaSqFt: number): number {
  // Approximate: 1 kW requires ~100 sq ft of shadow-free roof area
  const SQ_FT_PER_KW = 100;
  
  const maxKw = roofAreaSqFt / SQ_FT_PER_KW;
  
  // Round down to nearest 0.1 kW
  return Math.floor(maxKw * 10) / 10;
}

/**
 * Recommends a final system size balancing required capacity and roof limits.
 */
export function recommendSystemSize(requiredKw: number, roofCapacityKw?: number): number {
  if (roofCapacityKw === undefined || roofCapacityKw === null) return requiredKw;
  
  return Math.min(requiredKw, roofCapacityKw);
}
