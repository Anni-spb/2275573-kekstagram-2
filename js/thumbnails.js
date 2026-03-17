import {createPosts} from './data.js';

const posts = createPosts ();
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const createThumbnail = (data) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  const img = thumbnail.querySelector('.picture__img');
  img.src = data.url;
  img.alt = data.description;
  thumbnail.querySelector('.picture__likes').textContent = data.likes;
  thumbnail.querySelector('.picture__comments').textContent = data.comments.length;
  fragment.append(thumbnail);
};

const renderThumbnails = () => {
  posts.forEach((post) => createThumbnail(post));
  picturesContainer.append(fragment);
};

export {renderThumbnails};
