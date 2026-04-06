const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_VALUE = 100;
const PERCENT = 100;

const buttonZoomOut = document.querySelector('.scale__control--smaller');
const buttonZoomIn = document.querySelector('.scale__control--bigger');
const previewPhoto = document.querySelector('.img-upload__preview img');
const controlInput = document.querySelector('.scale__control--value');

const getInputValue = () => parseInt(controlInput.value, 10);

const updateScale = (value) => {
  previewPhoto.style.transform = `scale(${value / 100})`;
  controlInput.value = `${value}%`;
  previewPhoto.style.transform = `scale(${value / PERCENT})`;
};

function buttonZoomOutClickHandler() {
  const stepBack = Math.max(getInputValue() - SCALE_STEP, MIN_SCALE);

  updateScale(stepBack);
}

function buttonZoomInClickHandler() {
  const stepForward = Math.min(getInputValue() + SCALE_STEP, MAX_SCALE);

  updateScale(stepForward);
}

const setPhotoScale = () => {
  buttonZoomOut.addEventListener('click', buttonZoomOutClickHandler);
  buttonZoomIn.addEventListener('click', buttonZoomInClickHandler);
};

const resetPhotoScale = () => updateScale(DEFAULT_VALUE);

export {setPhotoScale, resetPhotoScale};
