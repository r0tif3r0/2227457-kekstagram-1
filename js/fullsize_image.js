const fullsizeImage = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('.social__comment');
const resetButton = document.querySelector('.big-picture__cancel');


const pushCommsents = (image) => {
  const socialComments = document.querySelector('.social__comments');
  while(socialComments.firstChild) {socialComments.removeChild(socialComments.firstChild);}
  image.comments.forEach((comment) => {
    const tmpComm = commentTemplate.cloneNode(true);
    tmpComm.querySelector('img').src = comment.avatar;
    tmpComm.querySelector('img').alt = comment.name;
    tmpComm.querySelector('.social__text').textContent = comment.message;
    socialComments.appendChild(tmpComm);
  });
};

const pushImageInfo = (image) => {
  document.querySelector('.big-picture__img').querySelector('img').src = image.url;
  document.querySelector('.likes-count').textContent = image.likes;
  document.querySelector('.comments-count').textContent = image.comments.length;
  pushCommsents(image);
  document.querySelector('.social__caption').textContent = image.description;
};

resetButton.addEventListener('click', () => {
  document.body.classList.remove('modal-open');
  fullsizeImage.classList.add('hidden');
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 27) {
    document.body.classList.remove('modal-open');
    fullsizeImage.classList.add('hidden');
  }
});

export const getFullSizeImage = (image) => {
  pushImageInfo(image);
  fullsizeImage.querySelector('.social__comment-count').classList.add('hidden');
  fullsizeImage.querySelector('.comments-loader').classList.add('hidden');
  fullsizeImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
};
