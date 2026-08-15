import { SolarResourceProfile } from "./types";

/**
 * Calculates annual generation for a given system size.
 * 
 * @param systemSizeKw Size of the solar system in kW
 * @param profile Solar resource profile
 * @param degradation Optional degradation factor (e.g. 0.99 for year 2)
 * @returns Annual generation in kWh
 */
export function calculateAnnualGeneration(
  systemSizeKw: number, 
  profile: SolarResourceProfile,
  degradation: number = 1
): number {
  if (systemSizeKw <= 0) return 0;

  // Annual Generation = System Size × Annual Equivalent Sun Hours × Performance Ratio
  const baseGeneration = systemSizeKw * profile.annualEquivalentSunHours * profile.performanceRatio;
  
  return Math.round(baseGeneration * degradation);
}

/**
 * Calculates average monthly generation.
 */
export function calculateMonthlyGeneration(annualGeneration: number): number {
  return annualGeneration / 12; // Simple average. For advanced, apply monthly irradiance factors.
}
