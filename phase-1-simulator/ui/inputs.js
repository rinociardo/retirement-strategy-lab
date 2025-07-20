// 🎯 Modular configuration file

export const sections = [
  {
    title: '💼 Investments',
    fields: [
      { key: 'savings', label: 'Starting Assets ($)', type: 'number' }
      // Allocation sliders can go here later
    ]
  },
  {
    title: '🏠 Household Data',
    fields: [
      { key: 'targetAnnualSpending', label: 'Annual Spending ($)', type: 'number' },
      { key: 'pension1Monthly', label: 'Pension 1 ($/mo)', type: 'number' },
      { key: 'pension2Monthly', label: 'Pension 2 ($/mo)', type: 'number' }
    ]
  },
  {
    title: '📊 Economic Parameters',
    fields: [
      { key: 'inflationRate', label: 'Inflation Rate (%)', type: 'range', min: 0, max: 10, step: 0.1 },
      { key: 'colaRate', label: 'COLA (%)', type: 'range', min: 0, max: 10, step: 0.1 },
      { key: 'standardDeduction', label: 'Standard Deduction ($)', type: 'number' },
      { key: 'showRealDollars', label: 'Show Real Dollars', type: 'checkbox' }
    ]
  },
  {
    title: '🎲 Simulation Settings',
    fields: [
      { key: 'numPaths', label: 'Monte Carlo Paths', type: 'range', min: 100, max: 5000, step: 100 },
      { key: 'projectionYears', label: 'Number of years to Simulate', type: 'range', min: 10, max: 60 }
    ]
  }
];
