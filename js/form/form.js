import {isEscapeKey} from '../utils.js';
import {validatePristine, setPristine, resetPristine} from './validate.js';

const uploadInput = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__form');
const formModal = document.querySelector('.img-upload__overlay');
const formCloseButton = document.querySelector('.img-upload__cancel');

const openForm = () => {
  formModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  formCloseButton.addEventListener('click', onFormCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  form.reset();
  resetPristine();

  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  formCloseButton.removeEventListener('click', onFormCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onFormSubmit(evt) {
  evt.preventDefault();

  if(validatePristine()) {
    form.submit();
  }
}

function onFormCloseButtonClick() {
  closeForm();
}

function onDocumentKeydown(evt) {
  const hashtagsInput = evt.target.closest('.text__hashtags');
  const captionInput = evt.target.closest('.text__description');

  if (isEscapeKey(evt) && !hashtagsInput && !captionInput) {
    evt.preventDefault();

    closeForm();
  }
}

function onUploadInputChange() {
  openForm();
}

const initFormAction = () => {
  setPristine();

  uploadInput.addEventListener('change', onUploadInputChange);
  form.addEventListener('submit', onFormSubmit);
};

export {initFormAction};
