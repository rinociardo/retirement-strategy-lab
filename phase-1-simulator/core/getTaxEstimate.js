// getTaxEstimate.js
// Federal income tax estimator (single filer by default)
// Standard deduction is now configurable

export function getTaxEstimate(income, standardDeduction = 14600) {
  if (income <= 0) return 0;

  // 2024 single filer brackets (approximate)
  const brackets = [
    { limit: 11000, rate: 0.10 },
    { limit: 44725, rate: 0.12 },
    { limit: 95375, rate: 0.22 },
    { limit: 182100, rate: 0.24 },
    { limit: 231250, rate: 0.32 },
    { limit: 578125, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ];

  let taxable = Math.max(income - standardDeduction, 0);
  let tax = 0;
  let previousLimit = 0;

  for (const bracket of brackets) {
    const amountInBracket = Math.min(taxable, bracket.limit - previousLimit);
    if (amountInBracket > 0) {
      tax += amountInBracket * bracket.rate;
      taxable -= amountInBracket;
      previousLimit = bracket.limit;
    } else {
      break;
    }
  }

  return Math.round(tax);
}