function calculateSharpeRatio(returnSeries, stdDevSeries) {
  const avgReturn = mean(returnSeries);
  const avgVolatility = mean(stdDevSeries);
  return (avgReturn - 0.02) / avgVolatility; // Assuming 2% risk-free rate
}