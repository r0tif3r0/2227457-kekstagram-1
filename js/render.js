export function render(posts) {
  const imgTemplate = document.querySelector('#picture').content;
  const imgList = document.createDocumentFragment();

  for (let i = 0; i < posts.length; i++) {
    const tmpImg = imgTemplate.cloneNode(true);
    tmpImg.querySelector('.picture__img').src = posts[i].url;
    tmpImg.querySelector('.picture__likes').textContent = posts[i].likes;
    tmpImg.querySelector('.picture__comments').textContent = posts[i].comments.length;
    imgList.appendChild(tmpImg);
  }

  document.querySelector('.pictures').appendChild(imgList);
}
