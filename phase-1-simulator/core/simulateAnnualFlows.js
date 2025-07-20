// simulateAnnualFlows.js
// Applies budget logic to a single market path

import { getRMD } from './getRMD.js';
import { getTaxEstimate } from './getTaxEstimate.js';
import { adjustForInflation } from './helpers.js';

export function simulateAnnualFlows({
  marketPath,
  spending,
  pension1Monthly,
  pension2Monthly,
  inflationRate,
  colaRate,
  startingAge,
  showRealDollars,
  standardDeduction
}) {
  const flowResults = [];

  for (let year = 0; year < marketPath.length; year++) {
    const rawAssets = marketPath[year];
    const age = startingAge + year;

    const pensionIncome = (pension1Monthly + pension2Monthly) * 12 * Math.pow(1 + colaRate, year);
    const rmd = getRMD(rawAssets, age);
    const grossIncome = pensionIncome + rmd;
    const tax = getTaxEstimate(grossIncome, standardDeduction);
    const netIncome = grossIncome - tax;

    const adjustedAssets = adjustForInflation(rawAssets, inflationRate, year, showRealDollars);

    flowResults.push({
      year,
      age,
      assets: adjustedAssets,
      pensionIncome,
      rmd,
      tax,
      netIncome,
      spending,
      shortfall: Math.max(spending - netIncome, 0)
    });
  }

  return flowResults;
}