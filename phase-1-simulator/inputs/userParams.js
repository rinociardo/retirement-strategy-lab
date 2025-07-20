// userParams.js
// Central config object for user-defined planning preferences

export const userParams = {
  startingAge: 72,
  savings: 800000,

  // Spending goals
  targetAnnualSpending: 60000,
  lifestyleFloor: 45000,

  // Pension streams
  pension1Monthly: 1200,
  pension2Monthly: 0,
  colaRate: 0.02,

  // Risk/return envelope
  expectedReturnMin: 0.03,
  expectedReturnMax: 0.08,
  riskMin: 0.05,
  riskMax: 0.25,
  selectedProfile: "balanced", // Options: "conservative", "balanced", "aggressive"

  // Inflation & Taxes
  inflationRate: 0.025,
  taxRateOverride: null, // Optional manual override
  standardDeduction: 14600, // Adjustable per filing status

  // Simulation config
  projectionYears: 35,
  numPaths: 1000,
  showRealDollars: true
};