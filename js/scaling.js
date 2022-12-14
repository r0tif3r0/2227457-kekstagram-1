const getSmallerImgButton = document.querySelector('.scale__control--smaller');
const getBiggerImgButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');

const minScale = 25;
const maxScale = 100;

const getImgSmaller = () => {
  const scale = parseInt(scaleValue.value.match(/\d*/), 10);
  if ((scale-25) >= minScale) {
    scaleValue.value = `${scale-25}%`;
    imgPreview.style = `transform: scale(${(scale-25)/100})`;
  }
};

const getImgSBigger = () => {
  const scale = parseInt(scaleValue.value.match(/\d*/), 10);
  if ((scale+25) <= maxScale) {
    scaleValue.value = `${scale+25}%`;
    imgPreview.style = `transform: scale(${(scale+25)/100})`;
  }
};

getSmallerImgButton.addEventListener('click', getImgSmaller);
getBiggerImgButton.addEventListener('click', getImgSBigger);

