import {isEscapeKey} from '../utils.js';
import {validatePristine, setPristine, resetPristine} from './validate.js';
import {setPhotoScale, resetPhotoScale} from './scale.js';
import {createSlider, updateSliderOptions} from './effects.js';

const uploadInput = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__form');
const formModal = document.querySelector('.img-upload__overlay');
const formCloseButton = document.querySelector('.img-upload__cancel');
const effectsControl = document.querySelector('.effects__list');
const checkedEffect = document.querySelector('.effects__radio[checked]');

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
  updateSliderOptions(checkedEffect.value);
  uploadInput.value = '';


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

function onEffectsControlChange(evt) {
  updateSliderOptions(evt.target.value);
}

const initFormAction = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  form.addEventListener('submit', onFormSubmit);
  effectsControl.addEventListener('change', onEffectsControlChange);

  setPristine();
  setPhotoScale();
  createSlider(checkedEffect.value);
};

export {initFormAction};
