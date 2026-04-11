import {renderThumbnails} from './thumbnails.js';
import {mixElements} from '../utils.js';

const CURRENT_FILTER = 'img-filters__button--active';
const POSTS_MAX_COUNT = 10;

const postFilters = document.querySelector('.img-filters');
const filtersContainer = document.querySelector('.img-filters__form');

const showFiltersButton = () => postFilters.classList.remove('img-filters--inactive');

const createRandomPosts = (posts) => {
  const elements = posts.slice();

  return mixElements(elements).slice(0, POSTS_MAX_COUNT);
};

const createDiscussedPosts = (posts) => posts.slice().sort((currentPost, nextPost) => nextPost.comments.length - currentPost.comments.length);

const changeCurrentFilter = (evt) => {
  document.querySelector(`.${CURRENT_FILTER}`).classList.remove(`${CURRENT_FILTER}`);
  evt.target.classList.add(`${CURRENT_FILTER}`);
};

const isButtonSort = (evt) => {
  if (!evt.target.matches('.img-filters__button')) {

    return;
  }

  changeCurrentFilter(evt);
};

function onFilterButtonClick(evt, posts) {
  isButtonSort(evt);

  if (evt.target.matches('#filter-default')) {
    renderThumbnails(posts);
  }

  if (evt.target.matches('#filter-random')) {
    renderThumbnails(createRandomPosts(posts));
  }

  if (evt.target.matches('#filter-discussed')) {
    renderThumbnails(createDiscussedPosts(posts));
  }
}

const createFilterPosts = (posts) => {
  showFiltersButton();
  renderThumbnails(posts);

  filtersContainer.addEventListener('click', (evt) => onFilterButtonClick(evt, posts));
};

export {createFilterPosts};
