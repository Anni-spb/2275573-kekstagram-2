const POST_COUNT = 25;
const COMMENTS_COUNT = {min: 0, max: 30};
const LIKES_COUNT = {min: 15, max: 200};
const AVATAR_COUNT = {min: 1, max: 6};


const DESCRIPTION = [
  'Просто классная фотка',
  'Красивый закат',
  'Решил поделится',
  'Миленько'
];

const NAMES = [
  'Степан',
  'Николай',
  'Артем',
  'Михаил',
  'Татьяна',
  'Анна',
  'Кирилл'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

let postId = 1;
let commentId = 1;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const createMessage = () => {
  const message = Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES));
  return Array.from(new Set(message)).join(' ');
};

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(AVATAR_COUNT.min, AVATAR_COUNT.max)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPost = () => ({
  id: postId++,
  url: `photos/${postId++}.jpg`,
  likes: getRandomInteger(LIKES_COUNT.min, LIKES_COUNT.max),
  description: getRandomArrayElement(DESCRIPTION),
  comments : Array.from({length: getRandomInteger(COMMENTS_COUNT.min, COMMENTS_COUNT.max)}, createComment)
});

export const createPosts = () => Array.from({length: POST_COUNT}, createPost);


