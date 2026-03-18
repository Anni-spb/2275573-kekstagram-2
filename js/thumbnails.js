import {createPosts} from './data.js';

const posts = createPosts ();
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const createThumbnail = ({description, url, likes, comments}) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  const img = thumbnail.querySelector('.picture__img');

  img.src = url;
  img.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  fragment.append(thumbnail);
};

const renderThumbnails = () => {
  posts.forEach((post) => createThumbnail(post));
  picturesContainer.append(fragment);
};

export {renderThumbnails};
