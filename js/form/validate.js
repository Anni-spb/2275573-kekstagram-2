const HASHTAGS_REGEXP = /^#[a-za-яё0-9]{1,19}$/i;
const HASHTAGS_MAX_COUNT = 5;
const CAPTION_MAX_LENGTH = 140;
const INVALID_HASHTAG_UNIQUE = 'Один и тот же хэштег не может быть использован дважды';
const INVALID_HASHTAG_SYMBOLS = 'Хэштег начинается с # и может состоять только из букв и цифр длиной не больше 20 символов';
const INVALID_HASHTAG_COUNT = `Нельзя использовать больше ${HASHTAGS_MAX_COUNT} хэштегов`;
const INVALID_CAPTION = 'Длина комментария не может составлять больше 140 символов';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const captionInput = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const normalizeTags = (value) => value.trim().toLowerCase().split(' ').filter((hashtag) => hashtag);

const isUniqueHashtags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());

  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isValidHashtags = (value) => normalizeTags(value).every((tag) => HASHTAGS_REGEXP.test(tag));

const isMaxCountHashtags = (value) => normalizeTags(value).length <= HASHTAGS_MAX_COUNT;

const isValidCaption = (value) => value.length <= CAPTION_MAX_LENGTH;

const setPristine = () => {
  pristine.addValidator(
    hashtagsInput,
    isUniqueHashtags,
    INVALID_HASHTAG_UNIQUE,
    1,
    true
  );

  pristine.addValidator(
    hashtagsInput,
    isValidHashtags,
    INVALID_HASHTAG_SYMBOLS,
    1,
    true
  );

  pristine.addValidator(
    hashtagsInput,
    isMaxCountHashtags,
    INVALID_HASHTAG_COUNT,
    1,
    true
  );

  pristine.addValidator(
    captionInput,
    isValidCaption,
    INVALID_CAPTION,
    1,
    true
  );
};

const validatePristine = () => pristine.validate();
const resetPristine = () => pristine.reset();

export {validatePristine, setPristine, resetPristine};
