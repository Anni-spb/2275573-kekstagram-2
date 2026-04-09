const EFFECTS = {
  none: {
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },

  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },

  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },

  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },

  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },

  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const previewPhoto = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level');

const setSliderState = (target) => {
  if (target.matches('#effect-none')) {
    effectLevel.classList.add('hidden');
    previewPhoto.style.filter = '';
    return;
  }

  effectLevel.classList.remove('hidden');
};

const createSlider = (target) => {
  let currentValue = target.value;
  if (!EFFECTS[currentValue]) {
    currentValue = 'none';
  }

  noUiSlider.create(slider , {
    range: {
      min: EFFECTS[currentValue].min,
      max: EFFECTS[currentValue].max
    },
    start: EFFECTS[currentValue].max,
    step: EFFECTS[currentValue].step,
    connect: 'lower'
  });

  slider.noUiSlider.off('update');
  slider.noUiSlider.on('update', () => {
    effectValue.value = parseFloat(slider.noUiSlider.get());
    previewPhoto.style.filter = `${EFFECTS[currentValue].filter}(${effectValue.value}${EFFECTS[currentValue].unit})`;
  });
};

const updateEffects = (target) => {
  let currentValue = target.value;

  if (!EFFECTS[currentValue]) {
    currentValue = 'none';
  }

  slider.noUiSlider.updateOptions({
    range: {
      min: EFFECTS[currentValue].min,
      max: EFFECTS[currentValue].max
    },
    start: EFFECTS[currentValue].max,
    step: EFFECTS[currentValue].step,
    connect: 'lower'
  });

  slider.noUiSlider.off('update');
  slider.noUiSlider.on('update', () => {
    effectValue.value = parseFloat(slider.noUiSlider.get());
    previewPhoto.style.filter = `${EFFECTS[currentValue].filter}(${effectValue.value}${EFFECTS[currentValue].unit})`;
  });
};

const initSlider = (target) => {
  if (!slider.noUiSlider) {
    createSlider(target);
  }

  setSliderState(target);
};

const onEffectsListChange = (evt) => {
  updateEffects(evt.target);
  setSliderState(evt.target);
};

export {onEffectsListChange, initSlider};
