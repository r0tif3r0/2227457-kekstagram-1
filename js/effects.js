const imgPreview = document.querySelector('.img-upload__preview');
const imgForm = document.querySelector('.img-upload__effects');
const sliderForm = document.querySelector('.img-upload__effect-level');
const slider = sliderForm.querySelector('.effect-level__slider');
const effectLevel = sliderForm.querySelector('.effect-level__value');

let currentEffect = 'none';
sliderForm.classList.add('hidden');

const sliderOptions = {
  'none': {
    range: {min: 0, max: 1},
    step: 0.1,
    start: 1
  },
  'chrome': {
    range: {min: 0, max: 1},
    step: 0.1,
    start: 1,
    valueUnit: '',
  },
  'sepia': {
    range: {min: 0, max: 1},
    step: 0.1,
    start: 1,
    valueUnit: '',
  },
  'marvin': {
    range: {min: 0, max: 100},
    step: 1,
    start: 100,
    valueUnit: '%',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  'phobos': {
    range: {min: 0, max: 3},
    step: 0.1,
    start: 3,
    valueUnit: 'px',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  'heat': {
    range: {min: 1, max: 3},
    step: 0.1,
    start: 3,
    valueUnit: '',
  }
};

noUiSlider.create(slider, sliderOptions['none']);

const changeImgEffect = (event) => {
  imgPreview.classList.remove(`effects__preview--${currentEffect}`);
  imgPreview.classList.add(`effects__preview--${event.target.value}`);
  currentEffect = event.target.value;
  imgPreview.style.filter = '';
  sliderForm.classList.remove('hidden');
};

const filters = (effect) => {
  switch (effect) {
    case 'chrome':
      return 'grayscale';
    case 'sepia':
      return 'sepia';
    case 'marvin':
      return 'invert';
    case 'phobos':
      return 'blur';
    case 'heat':
      return 'brightness';
  }
};

slider.noUiSlider.on('update', () => {
  const effectValue = slider.noUiSlider.get();
  imgPreview.style.filter = `${filters(currentEffect)}(${effectValue}${sliderOptions[currentEffect].valueUnit})`;
  effectLevel.value = effectValue;
});

imgForm.addEventListener('change', (event) => {
  event.preventDefault();
  if (!event.target.matches('input')) {
    return;
  }
  changeImgEffect(event);
  if (event.target.value === 'none') {
    sliderForm.classList.add('hidden');
    return;
  }
  slider.noUiSlider.updateOptions(sliderOptions[event.target.value]);
});

export const clearPreview = () => {
  imgPreview.classList.remove(`effects__preview--${currentEffect}`);
  imgPreview.removeAttribute('style');
  sliderForm.classList.add('hidden');
};
