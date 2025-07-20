
import { sections } from './inputs.js';
import { createInputField, bindToUserParams } from '../utils/utils.js'; // Assuming modular utils
import { renderLifeExpectancyPanel } from './lifeExpectancy.js';

export function renderInputPanel(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '<h2>🧭 Simulation Inputs</h2>';

  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.flexWrap = 'wrap';
  wrapper.style.gap = '20px';
  wrapper.style.justifyContent = 'space-between';
  container.appendChild(wrapper); // ✅ Must come before appending panels


  sections.forEach((section, index) => {
    const panel = document.createElement('div');
    panel.style.flex = '1 1 250px';
    panel.style.border = '1px solid #ccc';
    panel.style.borderRadius = '6px';
    panel.style.padding = '12px';
    panel.style.background = '#fdfdfd';
    panel.style.minWidth = '250px';
    panel.id = `inputPanel-${index}`;

    const header = document.createElement('h3');
    header.textContent = section.title;
    panel.appendChild(header);

    section.fields.forEach((field) => {
      const inputEl = createInputField(field);
      bindToUserParams(field, inputEl);
      inputEl.style.marginBottom = '10px';
      panel.appendChild(inputEl);
    });

    wrapper.appendChild(panel);
  });
  const lifePanel = document.createElement('div');
    lifePanel.id = 'lifeExpectancyPanel';
    lifePanel.style.flex = '1 1 300px';
    lifePanel.style.border = '1px solid #ccc';
    lifePanel.style.borderRadius = '6px';
    lifePanel.style.padding = '12px';
    lifePanel.style.background = '#fdfdfd';
    lifePanel.style.minWidth = '250px';
    wrapper.appendChild(lifePanel);

    renderLifeExpectancyPanel('lifeExpectancyPanel');

  container.appendChild(wrapper);
}
