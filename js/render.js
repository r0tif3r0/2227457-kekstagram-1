import { getFullSizeImage } from './fullsize_image.js';
import { getData } from './loader.js';
import { showAlert, debounce } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const defaultButton = document.querySelector('[id=filter-default]');
const randomButton = document.querySelector('[id=filter-random]');
const discussedButton = document.querySelector('[id=filter-discussed]');
const elements = document.querySelector('.pictures').getElementsByTagName('a');

let currentFilter = 'filter-default';
const RANDOM_POSTS_COUNT = 10;

const removeAllPosts = () => {
  const size = elements.length;
  for (let i = 0; i < size; i++) {
    document.querySelector('.pictures').removeChild(elements[0]);
  }
};

const loadPosts = (posts) => {
  removeAllPosts();
  const imgTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const imgList = document.createDocumentFragment();
  for (let i = 0; i < posts.length; i++) {
    const tmpImg = imgTemplate.cloneNode(true);
    tmpImg.querySelector('.picture__img').src = posts[i].url;
    tmpImg.querySelector('.picture__likes').textContent = posts[i].likes;
    tmpImg.querySelector('.picture__comments').textContent = posts[i].comments.length;
    tmpImg.addEventListener('click', (event) => {
      event.preventDefault();
      getFullSizeImage(posts[i]);
    });
    imgList.appendChild(tmpImg);
  }
  document.querySelector('.pictures').appendChild(imgList);
};

const loadDefaultPosts = (posts) => {
  if (currentFilter !== 'filter-default') {
    document.querySelector(`[id=${currentFilter}]`).classList.remove('img-filters__button--active');
    defaultButton.classList.add('img-filters__button--active');
    currentFilter = 'filter-default';
    debounce(() => loadPosts(posts), 500);
  }
};

const loadRandomPosts = (posts) => {
  if (currentFilter !== 'filter-random') {
    document.querySelector(`[id=${currentFilter}]`).classList.remove('img-filters__button--active');
    randomButton.classList.add('img-filters__button--active');
    currentFilter = 'filter-random';
    const randomPosts = posts.slice(0, RANDOM_POSTS_COUNT-elements.length).sort(() => Math.random() - 0.5);
    debounce(() => loadPosts(randomPosts), 500);
  }
};

const loadDiscussedPosts = (posts) => {
  if (currentFilter !== 'filter-discussed') {
    document.querySelector(`[id=${currentFilter}]`).classList.remove('img-filters__button--active');
    discussedButton.classList.add('img-filters__button--active');
    currentFilter = 'filter-discussed';
    const discussedPosts = posts.slice(0).sort((a, b) =>
      b.comments.length - a.comments.length
    );
    debounce(() => loadPosts(discussedPosts), 500);
  }
};

export function render() {
  getData((posts) => {
    loadPosts(posts);
    defaultButton.addEventListener('click', () => {
      loadDefaultPosts(posts);
    });
    randomButton.addEventListener('click', () => {
      loadRandomPosts(posts);
    });
    discussedButton.addEventListener('click', () => {
      loadDiscussedPosts(posts);
    });
    imgFilters.classList.remove('img-filters--inactive');
  },
  (err) => {
    showAlert(`${err}`);
  });
}
