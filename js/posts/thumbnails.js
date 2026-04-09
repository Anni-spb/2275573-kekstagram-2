import {renderModal} from '../posts/gallery.js';
import {debounce} from '../utils.js';

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

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderModal({description, url, likes, comments});
  });

  fragment.append(thumbnail);
};

const deletePosts = () => document.querySelectorAll('.picture').forEach((element) => element.remove());

const renderThumbnails = debounce((posts) => {
  if(!picturesContainer) {
    return;
  }
  deletePosts();

  posts.forEach((post) => createThumbnail(post));
  picturesContainer.append(fragment);
});

export {renderThumbnails};
