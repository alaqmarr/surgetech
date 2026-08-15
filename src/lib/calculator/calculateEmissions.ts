import { GRID_EMISSION_FACTOR } from "./assumptions";

/**
 * Calculates CO2 avoided based on annual solar generation.
 * @param annualGenerationKwh Total solar generation in kWh
 * @returns CO2 avoided in tonnes per year
 */
export function calculateCO2Avoided(annualGenerationKwh: number): number {
  // Grid Emission Factor: kg CO2 per kWh
  const kgCO2 = annualGenerationKwh * GRID_EMISSION_FACTOR;
  
  // Convert kg to tonnes (1 tonne = 1000 kg)
  // Round to nearest 0.1
  return Math.round((kgCO2 / 1000) * 10) / 10;
}
