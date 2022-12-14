import './scaling.js';
import './effects.js';
import { clearPreview } from './effects.js';

const inputFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__overlay');
const resetButton = document.querySelector('#upload-cancel');
const scaleValue = document.querySelector('.scale__control--value');

const removeUploadForm = () => {
  document.body.classList.remove('modal-open');
  resetButton.removeEventListener('click', (removeUploadForm));
  inputFile.value = '';
  scaleValue.value = '100%';
  clearPreview();
  uploadForm.classList.add('hidden');
};

const addUploadForm = () => {
  document.body.classList.add('modal-open');
  resetButton.addEventListener('click', (removeUploadForm));
  scaleValue.value = '100%';
  uploadForm.classList.remove('hidden');
};

const resetByEsc = () => {
  document.removeEventListener('keydown', (resetByEsc));
  removeUploadForm();
};

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 27 && !(event.target.matches('input')) && !(event.target.matches('textarea'))) {
    event.preventDefault();
    resetByEsc();
  }
});

inputFile.addEventListener('change', () => {
  addUploadForm();
});
