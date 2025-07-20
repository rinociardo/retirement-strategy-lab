// assetTrajectory.js
// Renders asset trajectory chart with percentile bands and depletion threshold

Chart.register(window['chartjs-plugin-annotation']);

Chart.register(window['chartjs-plugin-annotation']); // ✅ works with CDN

export function updateChartAnnotations(markers) {
  if (!window.assetChart) return;

  const annotations = markers.map(({ age, label }) => ({
    type: 'line',
    scaleID: 'x',
    value: age,
    borderColor: '#888',
    borderWidth: 1,
    borderDash: [4, 4],
    label: {
      display: true,
      content: label,
      position: 'start',
      backgroundColor: 'rgba(0,0,0,0.6)',
      color: '#fff',
      font: { style: 'italic', size: 10 },
      padding: 4
    }
  }));

  window.assetChart.options.plugins.annotation.annotations = annotations;
  window.assetChart.update();
}
export function renderAssetTrajectoryChart(canvasId, simulationResults, startingAge) {
  const ctx = document.getElementById(canvasId).getContext('2d');


  // ✅ Use startingAge passed into the function
  const ages = simulationResults.map((r) => r.year + startingAge);

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ages,
      datasets: [
        {
          label: 'Median Assets',
          data: simulationResults.map((r) => r.median),
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          fill: false,
          tension: 0.3
        },
        {
          label: '25th Percentile',
          data: simulationResults.map((r) => r.p25),
          borderColor: '#FF9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          fill: false,
          tension: 0.3
        },
        {
          label: '75th Percentile',
          data: simulationResults.map((r) => r.p75),
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          fill: false,
          tension: 0.3
        },
        {
          label: 'Depletion Threshold ($20k)',
          data: Array(ages.length).fill(20000),
          borderColor: '#F44336',
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        annotation: {
 //         annotations: []
          annotations: [
            {
              type: 'line',
              scaleID: 'x',
              value: 83,
              borderColor: '#ccc',
              borderWidth: 1,
              label: {
                display: true,
                content: 'Sample',
                position: 'start'
              }
            }
          ]

        },
        title: {
          display: true,
          text: 'Asset Trajectory by Age'
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
            text: 'Asset Value ($)'
          }
        }
      }
    }
  });

  return chart;
}

