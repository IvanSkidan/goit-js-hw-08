import throttle  from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";
let formData = {};

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form  input');
const textarea = document.querySelector('.feedback-form textarea');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput(evt) {
  formData = {
    email: input.value,
    message: textarea.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  // console.log('Відправляємо форму');
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
