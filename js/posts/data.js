import {getData} from '../api/api.js';
import {renderThumbnails} from './/thumbnails.js';
import {renderError} from '../api/alerts.js';

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');

const uploadPosts = (data) => renderThumbnails(data);

const showError = () => renderError(dataError);

const initPosts = () => getData(uploadPosts, showError);

export {initPosts};
