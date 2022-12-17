import { checkStringLength } from './util.js';

const imgForm = document.querySelector('.img-upload__form');
const tag = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');

const pristine = new Pristine(imgForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form-invalid',
  successClass: 'form-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p'
});

const commentValidate = (str) => checkStringLength(str, 140);

const tagCountValidate = (str) => str.trim().split(' ').length <= 5;

const tagCopyValidate = (str) => new Set(str.trim().toLowerCase().split(' ')).size === str.trim().split(' ').length;

const tagLengthValidate = (str) => {
  let errors = 0;
  str.trim().split(' ').forEach((item) => {
    if (!checkStringLength(item, 20)) {
      errors++;
    }
  });
  return errors === 0;
};

const tagValidate = (str) => {
  if (str.length === 0) {
    return true;
  }
  const reg = /^#[А-яа-яЁё\w]+$/;
  let errors = 0;
  str.trim().split(' ').forEach((item) => {
    if (!reg.test(item)) {
      errors++;
    }

  });
  return errors === 0;
};

pristine.addValidator(comment, commentValidate, 'Длина комментария не может составлять больше 140 символов');
pristine.addValidator(tag, tagCountValidate, 'Нельзя указать больше пяти хэш-тегов');
pristine.addValidator(tag, tagCopyValidate, 'Один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(tag, tagLengthValidate, 'Максимальная длина одного хэш-тега 20 символов, включая решётку');
pristine.addValidator(tag, tagValidate, 'Некорректный хэштег');

export const isValidate = () => pristine.validate();
