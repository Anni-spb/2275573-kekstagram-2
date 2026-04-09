const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
const DEFAULT_IMAGE_SRC = 'img/upload-default-image.jpg';

const uploadImage = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const uploadPhoto = (evt) => {
  const file = evt.target.files[0];

  if (file && isValidType(file)) {
    const src = URL.createObjectURL(file);
    uploadImage.src = src;
    effectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${src})`;
    });
  }
};

const resetUploadPhoto = () => {
  const src = DEFAULT_IMAGE_SRC;
  uploadImage.src = src;
  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${src})`;
  });
};

export {uploadPhoto, resetUploadPhoto};
