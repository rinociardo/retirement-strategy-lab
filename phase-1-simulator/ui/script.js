// import { renderInputsPanel } from './inputs.js';
import { generateMarketPaths } from '../core/monteCarloEngine.js';
import { simulateAnnualFlows } from '../core/simulateAnnualFlows.js';
import { getMarketAssumptions } from '../core/getMarketAssumptions.js';
import { userParams } from '../inputs/userParams.js';
import { renderAssetTrajectoryChart } from '../charts/assetTrajectory.js';
import { renderAnnualFlowChart } from '../charts/annualFlowChart.js';
import { renderInputPanel } from './inputPanel.js';
renderInputPanel('inputSection');




function runSimulation() {
  const marketAssumptions = getMarketAssumptions(userParams);

  const marketPaths = generateMarketPaths({
    startingAssets: userParams.savings,
    marketAssumptions,
    projectionYears: userParams.projectionYears,
    numPaths: userParams.numPaths
  });

  const allFlows = marketPaths.map((path) =>
    simulateAnnualFlows({
      marketPath: path,
      spending: userParams.targetAnnualSpending,
      pension1Monthly: userParams.pension1Monthly,
      pension2Monthly: userParams.pension2Monthly,
      inflationRate: userParams.inflationRate,
      colaRate: userParams.colaRate,
      startingAge: userParams.startingAge,
      showRealDollars: userParams.showRealDollars,
      standardDeduction: userParams.standardDeduction
    })
  );

  // Compute percentiles across all flows
  const results = [];
  const projectionYears = userParams.projectionYears;

  for (let year = 0; year < projectionYears; year++) {
    const values = allFlows.map((flow) => flow[year].assets).sort((a, b) => a - b);
    const median = values[Math.floor(values.length * 0.5)];
    const p25 = values[Math.floor(values.length * 0.25)];
    const p75 = values[Math.floor(values.length * 0.75)];

    results.push({
      year,
      median,
      p25,
      p75
    });
  }

  // Use first flow for annual breakdown chart
  const firstFlow = allFlows[0];
  const spendingArray = firstFlow.map((r) => r.spending);
  const taxArray = firstFlow.map((r) => r.tax);
  const pensionArray = firstFlow.map((r) => r.pensionIncome);
  const rmdArray = firstFlow.map((r) => r.rmd);

  

  renderAssetTrajectoryChart('assetChart', results, userParams.startingAge);
  renderAnnualFlowChart('flowChart', spendingArray, taxArray, pensionArray, rmdArray, userParams.startingAge);
}



// Kick off the inputs panel first
import { renderLifeExpectancyPanel } from './lifeExpectancy.js';
renderLifeExpectancyPanel('lifeExpectancyPanel');
renderInputPanel('inputSection');
// renderInputsPanel('inputsPanel');

runSimulation();
export { runSimulation };// Ensure the simulation runs after inputs are rendered