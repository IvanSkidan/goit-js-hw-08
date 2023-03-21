import throttle  from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";
let formData = {};

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form  input');
const textarea = document.querySelector('.feedback-form textarea');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

form.addEventListener('input', event => {
  // console.log(event.target.name);
  // console.log(event.target.value);
  
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
});

populateForm();

function onFormSubmit(event) {
  event.preventDefault();
  // console.log('Відправляємо форму');
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
};

function onFormInput(event) {
  // const message = event.target.value;
  // console.log(message);
  formData = {
    email: input.value,
    message: textarea.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function populateForm() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!savedMessage) {
    return;
  };

  input.value = savedMessage.email || '';
  textarea.value = savedMessage.message || '';
  formData.email = savedMessage.email || '';
  formData.message = savedMessage.message || '';
};
