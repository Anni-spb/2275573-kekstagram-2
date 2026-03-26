import {isEscapeKey} from './utils.js';

const modalContainer = document.querySelector('.big-picture');
const modalCloseButton = modalContainer.querySelector('.big-picture__cancel');
const bigPicture = modalContainer.querySelector('.big-picture__img img');
const postCaption = modalContainer.querySelector('.social__caption');
const LikesCount = modalContainer.querySelector('.likes-count');
const commentsList = modalContainer.querySelector('.social__comments');
const commentsItem = modalContainer.querySelector('.social__comment');
const commentsCount = modalContainer.querySelector('.social__comment-count');
const commentsLoadingButton = modalContainer.querySelector('.comments-loader');

const openModal = () => {
  modalContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  modalCloseButton.addEventListener('click', onModalCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  modalContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  modalCloseButton.removeEventListener('click', onModalCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onModalCloseButtonClick() {
  closeModal();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const createPhotoInfo = ({description, url, likes}) => {
  commentsList.innerHTML = '';

  bigPicture.src = url;
  bigPicture.alt = description;
  postCaption.textContent = description;
  LikesCount.textContent = likes;
};

const createComment = ({avatar, name, message}) => {
  const newComment = commentsItem.cloneNode(true);
  const img = newComment.querySelector('.social__picture');
  const commentText = newComment.querySelector('.social__text');

  img.src = avatar;
  img.alt = name;
  commentText.textContent = message;

  return newComment;
};

const createComments = (comments) => {
  comments.forEach((comment) => commentsList.append(createComment(comment)));
};

const renderModal = (post) => {
  commentsCount.classList.add('hidden');
  commentsLoadingButton.classList.add('hidden');

  openModal();
  createPhotoInfo(post);
  createComments(post.comments);
};

export {renderModal};
