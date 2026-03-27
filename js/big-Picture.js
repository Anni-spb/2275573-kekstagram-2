import {isEscapeKey} from './utils.js';

const modalContainer = document.querySelector('.big-picture');
const modalCloseButton = modalContainer.querySelector('.big-picture__cancel');
const bigPicture = modalContainer.querySelector('.big-picture__img img');
const postCaption = modalContainer.querySelector('.social__caption');
const LikesCounter = modalContainer.querySelector('.likes-count');
const commentsList = modalContainer.querySelector('.social__comments');
const commentsItem = modalContainer.querySelector('.social__comment');
const commentsLoader = modalContainer.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');

const COMMENTS_INTERVAL = 5;
let showComments = 0;
let comments = [];

const hideCommentsLoader = () => {
  if (showComments >= comments.length) {
    commentsLoader.classList.add('hidden');

    return;
  }

  commentsLoader.classList.remove('hidden');
};

const createComment = ({avatar, name, message}) => {
  const newComment = commentsItem.cloneNode(true);
  const img = newComment.querySelector('.social__picture');

  img.src = avatar;
  img.alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const openModal = () => {
  commentsList.innerHTML = '';
  showComments = 0;

  modalContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  modalCloseButton.addEventListener('click', onModalCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

const closeModal = () => {
  modalContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  modalCloseButton.removeEventListener('click', onModalCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

const updateCommentsCounter = () => {
  commentCount.innerHTML = `<span class="social__comment-shown-count">${showComments}</span> из <span class="social__comment-total-count">${comments.length}</span> комментариев`;
};

const createComments = () => {
  const currentComments = comments.slice(showComments, showComments + COMMENTS_INTERVAL);
  showComments = Math.min(showComments + COMMENTS_INTERVAL, comments.length);

  currentComments.forEach((comment) => commentsList.append(createComment(comment)));

  updateCommentsCounter();
  hideCommentsLoader();
};

const createPhotoInfo = ({description, url, likes}) => {
  bigPicture.src = url;
  bigPicture.alt = description;
  postCaption.textContent = description;
  LikesCounter.textContent = likes;
};

const renderModal = (post) => {
  comments = post.comments;

  openModal();
  createPhotoInfo(post);
  createComments();
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
function onCommentsLoaderClick() {
  createComments();
}

export {renderModal};
