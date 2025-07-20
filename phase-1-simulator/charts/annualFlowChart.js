// annualFlowChart.js
// Renders annual financial flows as separate lines by age

export function renderAnnualFlowChart(canvasId, spendingArray, taxArray, pensionArray, rmdArray, startingAge) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  const ages = Array.from({ length: spendingArray.length }, (_, i) => i + startingAge);

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ages,
      datasets: [
        {
          label: 'Spending',
          data: spendingArray,
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          fill: false,
          tension: 0.3
        },
        {
          label: 'Taxes',
          data: taxArray,
          borderColor: '#F44336',
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          fill: false,
          tension: 0.3
        },
        {
          label: 'Pensions',
          data: pensionArray,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          fill: false,
          tension: 0.3
        },
        {
          label: 'RMDs',
          data: rmdArray,
          borderColor: '#FFC107',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          fill: false,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Annual Financial Flows by Age'
        },
        tooltip: {
          callbacks: {
            label: (context) => `$${context.parsed.y.toLocaleString()}`
          }
        },
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Age'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Amount ($)'
          }
        }
      }
    }
  });

  return chart;
}