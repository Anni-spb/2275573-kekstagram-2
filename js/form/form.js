import {isEscapeKey} from '../utils.js';
import {submitForm} from '../api/api.js';
import {validatePristine, renderErrorMessages, resetPristine} from './validate.js';
import {setPhotoScale, resetPhotoScale} from './scale.js';
import {onEffectsListChange, initSlider} from './effects.js';
import {uploadPhoto, resetUploadPhoto} from './upload-photo.js';

const uploadInput = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__form');
const formModal = document.querySelector('.img-upload__overlay');
const formCloseButton = document.querySelector('.img-upload__cancel');
const effectsControl = document.querySelector('.effects__list');
const currentEffect = document.querySelector('.effects__radio[checked]');
const formSubmitButton = document.querySelector('.img-upload__submit');

const openForm = () => {
  formModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  formCloseButton.addEventListener('click', onFormCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  form.reset();
  resetPristine();
  resetPhotoScale();
  resetUploadPhoto();
  initSlider(currentEffect);

  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  formCloseButton.removeEventListener('click', onFormCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const setSubmitButtonStatus = (value) => {
  formSubmitButton.disabled = value;
};

function onFormSubmit(evt) {
  evt.preventDefault();

  if (validatePristine()) {
    submitForm(evt.target);
  }
}

function onFormCloseButtonClick() {
  closeForm();
}

function onDocumentKeydown(evt) {
  const hashtagsInput = evt.target.closest('.text__hashtags');
  const captionInput = evt.target.closest('.text__description');
  const errorMessage = document.querySelector('.error');


  if (isEscapeKey(evt) && !hashtagsInput && !captionInput && !errorMessage) {
    evt.preventDefault();
    closeForm();
  }
}

function onUploadInputChange(evt) {
  uploadPhoto(evt);
  openForm();
}

const initFormAction = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  effectsControl.addEventListener('change', onEffectsListChange);
  form.addEventListener('submit', onFormSubmit);

  renderErrorMessages();
  setPhotoScale();
  initSlider(currentEffect);
};

export {initFormAction, closeForm, setSubmitButtonStatus};
