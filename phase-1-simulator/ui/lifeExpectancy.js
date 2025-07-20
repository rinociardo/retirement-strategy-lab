// lifeExpectancy.js
// Derives life expectancy estimates from DOB and health status

import { userParams } from '../inputs/userParams.js';
import { updateChartAnnotations } from '../charts/assetTrajectory.js'; // You’ll wire this in

export function renderLifeExpectancyPanel(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '<h2>🧬 Life Expectancy Estimates</h2>';

function createFieldBlock(labelText, element) {
  const wrapper = document.createElement('div');
  wrapper.style.marginBottom = '10px';
  wrapper.style.display = 'flex';
  wrapper.style.flexDirection = 'column';

  const label = document.createElement('label');
  label.textContent = labelText;
  label.style.marginBottom = '4px';

  wrapper.appendChild(label);
  wrapper.appendChild(element);
  return wrapper;
}




  // Gender dropdown
const genderSelect = document.createElement('select');
['male', 'female'].forEach((gender) => {
  const option = document.createElement('option');
  option.value = gender;
  option.textContent = gender.charAt(0).toUpperCase() + gender.slice(1);
  genderSelect.appendChild(option);
});

container.appendChild(createFieldBlock('Gender:', genderSelect));


// Country dropdown
const countrySelect = document.createElement('select');


// You can refine this later—starting with most-used
['United States', 'Italy', 'Canada', 'United Kingdom', 'Germany'].forEach((country) => {
  const option = document.createElement('option');
  option.value = country;
  option.textContent = country;
  countrySelect.appendChild(option);
});

container.appendChild(createFieldBlock('Country:', countrySelect));

  // DOB input
  const dobInput = document.createElement('input');

  dobInput.type = 'date';
  dobInput.id = 'dob';
  dobInput.name = 'dob';
  dobInput.style.marginBottom = '10px';
  dobInput.value = userParams.dateOfBirth || '1960-01-01';

  

  container.appendChild(createFieldBlock('Date of Birth:', dobInput));

  // Health status dropdown
  const healthLabel = document.createElement('label');
  healthLabel.textContent = 'Current Health Status:';
  healthLabel.htmlFor = 'healthStatus';
  healthLabel.style.display = 'block';
  const healthSelect = document.createElement('select');
  healthSelect.id = 'healthStatus';
  healthSelect.name = 'healthStatus';

  const healthOptions = [
    { label: 'Very Poor Health', percentile: 10 },
    { label: 'Poor Health', percentile: 25 },
    { label: 'Average', percentile: 50 },
    { label: 'Good Health', percentile: 75 },
    { label: 'Very Good Health', percentile: 90 }
  ];

  healthOptions.forEach(({ label, percentile }) => {
    const option = document.createElement('option');
    option.value = percentile;
    option.textContent = label;
    healthSelect.appendChild(option);
  });



  container.appendChild(createFieldBlock('Current Health Status:', healthSelect));

  // Life expectancy table
  const table = document.createElement('table');
  table.style.marginTop = '15px';
  table.style.borderCollapse = 'collapse';

  const headerRow = document.createElement('tr');
  ['Current Health', 'Estimated Life Expectancy'].forEach((text) => {
    const th = document.createElement('th');
    th.textContent = text;
    th.style.borderBottom = '1px solid #ccc';
    th.style.padding = '6px';
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  const rows = [];

  function updateTable() {
    const dob = new Date(dobInput.value);
    const currentYear = new Date().getFullYear();
    const birthYear = dob.getFullYear();
    const currentAge = currentYear - birthYear;

    const estimates = {
      10: Math.round(currentAge + 72.4 - currentAge),
      25: Math.round(currentAge + 77.3 - currentAge),
      50: Math.round(currentAge + 82.6 - currentAge),
      75: Math.round(currentAge + 87.2 - currentAge),
      90: Math.round(currentAge + 90.6 - currentAge)
    };

    table.innerHTML = '';
    table.appendChild(headerRow);
    rows.length = 0;

    healthOptions.forEach(({ label, percentile }) => {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      td1.textContent = label;
      const td2 = document.createElement('td');
      td2.textContent = estimates[percentile];
      td1.style.padding = td2.style.padding = '6px';

      if (parseInt(healthSelect.value) === percentile) {
        tr.style.backgroundColor = '#f0f8ff';
        tr.style.fontWeight = 'bold';
      }

      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
      rows.push({ age: estimates[percentile], label });
    });

    // Optional: update chart annotations
    updateChartAnnotations(rows.map((r) => ({
      age: r.age,
      label: r.label
    })));
  }

genderSelect.addEventListener('change', () => {
    updateTable();
    runSimulation();
});

countrySelect.addEventListener('change', () => {
    updateTable();
    runSimulation();
});

  dobInput.addEventListener('change', updateTable);
  healthSelect.addEventListener('change', updateTable);

  container.appendChild(table);
}