// helpers.js
// Shared utility functions for inflation, rounding, clamping, and formatting

export function adjustForInflation(value, inflationRate, year, showRealDollars = true) {
  const inflationFactor = Math.pow(1 + inflationRate, year);
  return showRealDollars ? value / inflationFactor : value;
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function round(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function formatCurrency(value) {
  return `$${round(value).toLocaleString()}`;
}
