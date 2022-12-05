import { getRandomPositiveInteger } from './util.js';

const NAMES = [
    'Роман',
    'Амалия',
    'Надежда',
    'Клара',
    'Владимир',
    'Елена',
    'Юлия',
    'Макар',
    'Василиса',
    'Валерий',
    'Оксана',
    'Альберт',
    'Ольга',
    'Викентий',
    'Арсений',
    'Емельян',
    'Ангелина',
    'Филимон',
    'Тихон',
    'Наталия',
    'Бронислав',
    'Валерия',
    'Роберт',
    'Борис',
    'Юлиана'
]

const DESCRIPTIONS = [
    'Супер фото',
    'Крутая фотка',
    'Прикольная картинка',
    'Очень красивое фото',
    'Классный вид',
    'Очень смешное фото',
    'Забавная картинка',
    'Бомбический снимок',
    'Идеальный ракурс',
    'Хорошая фотография'
]

const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

const idContainer = [];

const getId = (from, to) => {
    let tmpId;
    do {
        tmpId = getRandomPositiveInteger(from,to);
    }
    while(idContainer.includes(tmpId))
    idContainer.push(tmpId);
    return tmpId;
}

const urlContainer = [];

const getURL = (from, to) => {
    let tmpURL;
    do {
        tmpURL = getRandomPositiveInteger(from,to);
    }
    while(urlContainer.includes(tmpURL))
    urlContainer.push(tmpURL);
    return `photos/${tmpURL}.jpg`;
}

const commentIdContainer = [];

const getCommentId = (from, to) => {
    let tmpId;
    do {
        tmpId = getRandomPositiveInteger(from, to);
    }
    while(commentIdContainer.includes(tmpId))
    commentIdContainer.push(tmpId);
    return tmpId;
}

const getAvatar = () => `img/avatar-${getRandomPositiveInteger(1,6)}.svg`

const getRandArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const getMessage = () => {
    let msg = '';
    let commentArr = [];
    let tmpI;
    for (let i = 0; i < getRandomPositiveInteger(1,2); i++) {
        do {
            tmpI = getRandArrayElement(MESSAGES);
        }
        while(commentArr.includes(tmpI))
        commentArr.push(tmpI);
        msg += tmpI + ' ';
    }
    return msg.trim();
}

const getName = () => getRandArrayElement(NAMES);

const getComment = () => {
    return {
        id: getCommentId(1,1000),
        avatar: getAvatar(),
        message: getMessage(),
        name: getName()  
    }
}

const getDescription = () => getRandArrayElement(DESCRIPTIONS);

const getLikes = () => getRandomPositiveInteger(15, 200);

const getPost = (from, to) => {
    return {
        id: getId(from, to),
        url: getURL(from, to),
        description: getDescription(),
        likes: getLikes(),
        comments: getComment()
    }
}

export const generatePosts = (container) => {
    for (let i = 0; i < 25; i++){
        container.push(getPost(1,25));
    }
}