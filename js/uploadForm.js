import './scaling.js';
import './effects.js';
import { clearPreview } from './effects.js';
import { sendData } from './loader.js';
import { isValidate } from './formValidation.js';

const inputFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__overlay');
const resetButton = document.querySelector('#upload-cancel');
const scaleValue = document.querySelector('.scale__control--value');
const submitButton = document.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successForm = successTemplate.cloneNode(true);
const successButton = successForm.querySelector('.success__button');
const errorForm = errorTemplate.cloneNode(true);
const errorButton = errorForm.querySelector('.error__button');
const hashArea = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');

const removeUploadForm = () => {
  document.body.classList.remove('modal-open');
  resetButton.removeEventListener('click', (removeUploadForm));
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', (resetByEsc));
  inputFile.value = '';
  scaleValue.value = '100%';
  clearPreview();
  hashArea.value = '';
  commentArea.value = '';
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
  uploadForm.classList.add('hidden');
};

const resetByEsc = (event) => {
  if (event.keyCode === 27) {
    event.preventDefault();
    if ((event.target.matches('input[name="hashtags"]')) || (event.target.matches('textarea[name="description"]'))) {
      return;
    }
    removeUploadForm();
  }
};

const addUploadForm = () => {
  document.body.classList.add('modal-open');
  resetButton.addEventListener('click', (removeUploadForm));
  document.addEventListener('keydown', (resetByEsc));
  scaleValue.value = '100%';
  uploadForm.classList.remove('hidden');
};

inputFile.addEventListener('change', () => {
  addUploadForm();
});

const removeSuccessForm = () => {
  submitButton.removeEventListener('click', removeSuccessForm);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', clickOutOfSuccessForm);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', removeSuccessFormByEsc);
  document.body.removeChild(successForm);
};

const clickOutOfSuccessForm = (event) => {
  if (event.target === successForm) {
    event.preventDefault();
    removeSuccessForm();
  }
};

const removeSuccessFormByEsc = (event) => {
  if (event.keyCode === 27) {
    event.preventDefault();
    removeSuccessForm();
  }
};

const addSuccessForm = () => {
  removeUploadForm();
  document.body.appendChild(successForm);
  successButton.addEventListener('click', (removeSuccessForm));
  document.addEventListener('click', (clickOutOfSuccessForm));
  document.addEventListener('keydown', (removeSuccessFormByEsc));
};

const removeErrorForm = () => {
  document.body.removeChild(errorForm);
  submitButton.removeEventListener('click', removeErrorForm);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', clickOutOfErrorForm);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', removeErrorFormByEsc);
  uploadForm.classList.remove('hidden');
};

const clickOutOfErrorForm = (event) => {
  if (event.target === errorForm) {
    event.preventDefault();
    removeErrorForm();
  }
};

const removeErrorFormByEsc = (event) => {
  if (event.keyCode === 27) {
    event.preventDefault();
    removeErrorForm();
  }
};

const addErrorForm = () => {
  uploadForm.classList.add('hidden');
  document.body.appendChild(errorForm);
  errorButton.addEventListener('click', (removeErrorForm));
  document.addEventListener('click', (clickOutOfErrorForm));
  document.addEventListener('keydown', (removeErrorFormByEsc));
};

document.querySelector('.img-upload__form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (isValidate()) {
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка';
    sendData(
      () => {
        addSuccessForm();
      },
      () => {
        addErrorForm();
        submitButton.disabled = false;
        submitButton.textContent = 'Опубликовать';
      },
      new FormData(event.target),
    );
  }
});
