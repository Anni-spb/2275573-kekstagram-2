const EFFECTS = {
  default: {
    range: {
      min: 0,
      max: 100,
    },

    start: 100,
    step: 1,
  },

  chrome: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },

    start: 1,
    step: 0.1,
    unit: '',
  },

  sepia: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },

    start: 1,
    step: 0.1,
    unit: '',
  },

  marvin: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },

    start: 100,
    step: 1,
    unit: '%',
  },

  phobos: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },

    start: 3,
    step: 0.1,
    unit: 'px',
  },

  heat: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },

    start: 3,
    step: 0.1,
    unit: '',
  },
};

const previewPhoto = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderInput = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');

const setSliderEffect = (value) => EFFECTS[value] || EFFECTS.default;

const setSliderStatus = (effect) => sliderContainer.classList.toggle('hidden', effect === EFFECTS.default);

const setSliderValue = (effect, value) => {
  if (effect === EFFECTS.default) {
    previewPhoto.style.filter = null;

    return;
  }
  previewPhoto.style.filter = `${effect.filter}(${value}${effect.unit})`;
};

const updateSlider = (effect) => {
  slider.noUiSlider.off();

  slider.noUiSlider.on('update', () => {
    sliderInput.value = slider.noUiSlider.get();
    setSliderValue(effect, sliderInput.value);
  });
};

const createSlider = (value) => {
  const effect = setSliderEffect(value);

  setSliderStatus(effect);
  noUiSlider.create(slider, {
    range: {
      min: effect.range.min,
      max: effect.range.max,
    },
    start: effect.start,
    step: effect.step,
    connect: 'lower',
  });

  updateSlider(effect);
};

const updateSliderOptions = (value) => {
  const effect = setSliderEffect(value);

  setSliderStatus(effect);
  slider.noUiSlider.updateOptions({
    range: {
      min: effect.range.min,
      max: effect.range.max,
    },
    start: effect.start,
    step: effect.step,
  });

  updateSlider(effect);
};

export {createSlider, updateSliderOptions};
