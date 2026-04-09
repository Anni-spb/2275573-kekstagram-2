import {isEscapeKey} from '../utils';

const TIME_REMOVE = 5000;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageData = document.querySelector('#data-error').content.querySelector('.data-error');

const renderMessage = (element, buttonClass) => {
  document.body.append(element);
  const messageCloseButton = element.querySelector(buttonClass);
  messageCloseButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const createFormSuccessMessage = () => {
  const newSuccessMessage = successMessageTemplate.cloneNode(true);
  renderMessage(newSuccessMessage, '.success__button');
};

const createFormErrorMessage = () => {
  const newErrorMessage = errorMessageTemplate.cloneNode(true);
  renderMessage(newErrorMessage, '.error__button');
};


const closeMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');

  message.remove();

  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
};

function onMessageButtonClick() {
  closeMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onDocumentClick(evt) {
  const success = evt.target.closest('.success__inner');
  const error = evt.target.closest('.error__inner');

  if (success || error) {
    return;
  }
  closeMessage();
}

const createError = () => {
  const newErrorMessage = errorMessageData.cloneNode(true);
  document.body.append(newErrorMessage);

  setTimeout(() => newErrorMessage.remove(), TIME_REMOVE);
};

export {createFormSuccessMessage, createFormErrorMessage, createError};
