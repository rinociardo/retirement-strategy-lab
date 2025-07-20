import { userParams } from '../inputs/userParams.js'; // Or wherever your state lives

export function createInputField(field) {
  const wrapper = document.createElement('div');
  wrapper.style.marginBottom = '10px';

  const label = document.createElement('label');
  label.textContent = field.label;
  label.htmlFor = field.key;
  label.style.display = 'block';
  label.style.marginBottom = '4px';

  let input;
  switch (field.type) {
    case 'number':
    case 'date':
    case 'range':
      input = document.createElement('input');
      input.type = field.type;
      input.id = field.key;
      if (field.min !== undefined) input.min = field.min;
      if (field.max !== undefined) input.max = field.max;
      if (field.step !== undefined) input.step = field.step;
      break;

    case 'select':
      input = document.createElement('select');
      input.id = field.key;
      field.options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        input.appendChild(option);
      });
      break;

    case 'checkbox':
      input = document.createElement('input');
      input.type = 'checkbox';
      input.id = field.key;
      break;

    default:
      input = document.createElement('input');
      input.type = 'text';
      input.id = field.key;
  }

  wrapper.appendChild(label);
  wrapper.appendChild(input);
  return wrapper;
}

export function bindToUserParams(field, inputEl) {
  const input = inputEl.querySelector(`#${field.key}`);
  if (!input) return;

  // Set initial value
  if (field.type === 'checkbox') {
    input.checked = !!userParams[field.key];
  } else {
    input.value = userParams[field.key] ?? '';
  }

  // Bind change handler
  input.addEventListener('change', () => {
    userParams[field.key] = field.type === 'checkbox' ? input.checked : parseInput(input.value, field.type);
  });
}

function parseInput(value, type) {
  switch (type) {
    case 'number':
    case 'range':
      return parseFloat(value);
    case 'checkbox':
      return !!value;
    default:
      return value;
  }
}