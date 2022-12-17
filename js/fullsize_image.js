const fullsizeImage = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('.social__comment');
const resetButton = document.querySelector('.big-picture__cancel');
const commentCounter = document.querySelector('.shown__comments-count');
const commentLoader = document.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comments');

let hiddenCommentsCount = socialComments.getElementsByTagName('li').length;

const pushCommsents = (image) => {
  while(socialComments.firstChild) {socialComments.removeChild(socialComments.firstChild);}
  image.comments.forEach((comment) => {
    const tmpComm = commentTemplate.cloneNode(true);
    tmpComm.querySelector('img').src = comment.avatar;
    tmpComm.querySelector('img').alt = comment.name;
    tmpComm.querySelector('.social__text').textContent = comment.message;
    tmpComm.classList.add('hidden');
    socialComments.appendChild(tmpComm);
  });
  hiddenCommentsCount = socialComments.getElementsByTagName('li').length;
};

const pushImageInfo = (image) => {
  document.querySelector('.big-picture__img').querySelector('img').src = image.url;
  document.querySelector('.likes-count').textContent = image.likes;
  document.querySelector('.comments-count').textContent = image.comments.length;
  pushCommsents(image);
  document.querySelector('.social__caption').textContent = image.description;
};

let childNum = 1;

const removeHiddenComments = (n) => {
  for (let i = 0; i < n; i++) {
    socialComments.querySelector(`li:nth-child(${childNum})`).classList.remove('hidden');
    childNum++;
  }
};

const showComments = () => {
  if (hiddenCommentsCount > 5) {
    removeHiddenComments(5);
    hiddenCommentsCount -= 5;
  } else {
    removeHiddenComments(hiddenCommentsCount);
    hiddenCommentsCount = 0;
    commentLoader.classList.add('hidden');
  }
  commentCounter.textContent = socialComments.getElementsByTagName('li').length - hiddenCommentsCount;
};

const removeFullsizeImage = () => {
  document.body.classList.remove('modal-open');
  resetButton.removeEventListener('click', (removeFullsizeImage));
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', (resetByEsc));
  commentLoader.removeEventListener('click', (showComments));
  commentLoader.classList.remove('hidden');
  childNum = 1;
  fullsizeImage.classList.add('hidden');
};

const resetByEsc = (event) => {
  if (event.keyCode === 27) {
    event.preventDefault();
    removeFullsizeImage();
  }
};

export const getFullSizeImage = (image) => {
  pushImageInfo(image);
  resetButton.addEventListener('click', removeFullsizeImage);
  document.addEventListener('keydown', (resetByEsc));
  commentLoader.addEventListener('click', showComments);
  showComments();
  fullsizeImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
};
