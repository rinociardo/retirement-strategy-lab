// monteCarloEngine.js
// Generates stochastic market paths using random returns

import { getRandomReturn } from './getRandomReturn.js';

export function generateMarketPaths({
  startingAssets,
  marketAssumptions,
  projectionYears,
  numPaths
}) {
  const allPaths = [];

  for (let path = 0; path < numPaths; path++) {
    let assets = startingAssets;
    const pathAssets = [];

    for (let year = 0; year < projectionYears; year++) {
      const returnRate = getRandomReturn(marketAssumptions);
      assets *= 1 + returnRate;
      pathAssets.push(assets);
    }

    allPaths.push(pathAssets);
  }

  return allPaths;
}