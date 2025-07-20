// getRandomReturn.js
// Generates market return using basic randomness (can support seeding later)

export function getRandomReturn(marketAssumptions, year = 0, path = 0) {
  const { mean = 0.06, stdDev = 0.15 } = marketAssumptions;

  // Basic Gaussian noise using Box-Muller transform
  const u1 = Math.random();
  const u2 = Math.random();
  const randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  const returnThisYear = mean + stdDev * randStdNormal;

  return returnThisYear;
}