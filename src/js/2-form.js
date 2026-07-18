const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

let feedbackForm = { email: '', message: '' };

const textarea = form.querySelector('textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', onFormInput);

populateForm();

function onFormSubmit(event) {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }
  console.log({ email, message });

  localStorage.removeItem(STORAGE_KEY);
  event.target.reset();
  feedbackForm = { email: '', message: '' };
}

function onFormInput(event) {
  feedbackForm[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackForm));
}

function populateForm() {
  const newFeedbackForm = localStorage.getItem(STORAGE_KEY);

  if (newFeedbackForm) {
    feedbackForm = JSON.parse(newFeedbackForm);

    form.elements.email.value = feedbackForm.email ?? '';
    form.elements.message.value = feedbackForm.message ?? '';
  }
}
