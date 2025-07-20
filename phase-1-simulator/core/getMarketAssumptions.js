// getMarketAssumptions.js
// Maps user risk profile to mean and standard deviation for market returns

export function getMarketAssumptions(userParams) {
  const {
    expectedReturnMin = 0.03,
    expectedReturnMax = 0.08,
    riskMin = 0.05,
    riskMax = 0.25,
    selectedProfile = "balanced"
  } = userParams;

  const profiles = {
    conservative: {
      mean: expectedReturnMin,
      stdDev: riskMin
    },
    balanced: {
      mean: (expectedReturnMin + expectedReturnMax) / 2,
      stdDev: (riskMin + riskMax) / 2
    },
    aggressive: {
      mean: expectedReturnMax,
      stdDev: riskMax
    }
  };

  return profiles[selectedProfile] || profiles.balanced;
}