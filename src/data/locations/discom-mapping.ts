export type DiscomMapping = {
  state: string;
  district?: string;
  discom: string;
  confidence: "high" | "medium" | "low";
};

export const discomMappings: DiscomMapping[] = [
  // Telangana
  { state: "Telangana", district: "Hyderabad", discom: "TSSPDCL", confidence: "high" },
  { state: "Telangana", district: "Rangareddy", discom: "TSSPDCL", confidence: "high" },
  { state: "Telangana", district: "Medchal", discom: "TSSPDCL", confidence: "high" },
  { state: "Telangana", discom: "TSNPDCL", confidence: "medium" }, // Fallback for other districts

  // Delhi
  { state: "Delhi", district: "New Delhi", discom: "NDMC", confidence: "high" },
  { state: "Delhi", district: "Central", discom: "BSES Yamuna", confidence: "medium" },
  { state: "Delhi", district: "South", discom: "BSES Rajdhani", confidence: "medium" },
  { state: "Delhi", discom: "Tata Power DDL", confidence: "low" },

  // Maharashtra
  { state: "Maharashtra", district: "Mumbai", discom: "BEST", confidence: "medium" }, // Also Adani, Tata
  { state: "Maharashtra", district: "Mumbai Suburban", discom: "Adani Electricity", confidence: "medium" },
  { state: "Maharashtra", discom: "MSEDCL (Mahavitaran)", confidence: "medium" }, // Rest of Maharashtra

  // Fallback
  { state: "Karnataka", discom: "BESCOM", confidence: "medium" },
];

export function getDiscomForLocation(state: string, district?: string): { likelyDiscom: string, confidence: string, alternatives: string[] } {
  // Exact match for state + district
  const districtMatch = discomMappings.find(m => m.state.toLowerCase() === state.toLowerCase() && m.district?.toLowerCase() === district?.toLowerCase());
  
  if (districtMatch) {
    // Find alternatives in the same district or state
    const alts = discomMappings.filter(m => m.state.toLowerCase() === state.toLowerCase() && m.discom !== districtMatch.discom).map(m => m.discom);
    return {
      likelyDiscom: districtMatch.discom,
      confidence: districtMatch.confidence,
      alternatives: [...new Set(alts)]
    };
  }

  // State match
  const stateMatch = discomMappings.find(m => m.state.toLowerCase() === state.toLowerCase() && !m.district);
  
  if (stateMatch) {
    const alts = discomMappings.filter(m => m.state.toLowerCase() === state.toLowerCase() && m.discom !== stateMatch.discom).map(m => m.discom);
    return {
      likelyDiscom: stateMatch.discom,
      confidence: stateMatch.confidence,
      alternatives: [...new Set(alts)]
    };
  }

  return {
    likelyDiscom: "Generic National Grid",
    confidence: "low",
    alternatives: []
  };
}
