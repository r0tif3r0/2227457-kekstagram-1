import { getFullSizeImage } from './fullsize_image.js';
import { getData } from './loader.js';
import { showAlert } from './util.js';

export function render() {
  getData((posts) => {
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
  },
  (err) => {
    showAlert(`${err}`);
  });
}
