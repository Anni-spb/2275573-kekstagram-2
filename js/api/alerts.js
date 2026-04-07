import {isEscapeKey} from '../utils';

const TIME_REMOVE = 5000;

let template;

const renderMessage = (item, value) => {
  template = item.cloneNode(true);
  document.body.append(template);

  const messageButton = template.querySelector(`.${value}__button`);
  messageButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onDodyClick);
};

const closeMessage = () => {
  template.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onDodyClick);
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

function onDodyClick(evt) {
  const success = evt.target.closest('.success__inner');
  const error = evt.target.closest('.error__inner');

  if (success || error) {
    return;
  }
  closeMessage();
}

const renderError = (item) => {
  template = item.cloneNode(true);
  document.body.append(template);

  setTimeout(() => {
    template.remove();
  }, TIME_REMOVE);
};

export {renderMessage, renderError};
