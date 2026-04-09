import {createFilterPosts} from '../posts/filter.js';
import {createError, createFormSuccessMessage, createFormErrorMessage} from './alerts.js';
import {setSubmitButtonStatus, closeForm} from '../form/form.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/';
const GET_URL = `${BASE_URL}data`;

const createServerData = async (url, method, body) => {
  const response = await fetch(url, {method, body});

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
};

const getServerData = async () => createServerData(GET_URL, 'GET');
const sendServerData = async (data) => createServerData(BASE_URL, 'POST', data);

const getData = async () => {
  try {
    const pictures = await getServerData();
    createFilterPosts(pictures);
  } catch {
    createError();
  }
};

const submitForm = async (formElement) => {
  try {
    setSubmitButtonStatus(true);
    await sendServerData(new FormData(formElement));

    closeForm();
    createFormSuccessMessage();
    setSubmitButtonStatus(false);
  }catch {
    createFormErrorMessage();
    setSubmitButtonStatus(false);
  }
};

export {getData, submitForm};
