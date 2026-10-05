import deadline from '../assets/cards/deadline.svg';
import error from '../assets/cards/error.svg';
import everythingWorks from '../assets/cards/everything-works.svg';
import google from '../assets/cards/google.svg';
import howISee from '../assets/cards/how-i-see.svg';
import lazy from '../assets/cards/lazy.svg';
import notABug from '../assets/cards/not-a-bug.svg';
import whatDoYouWant from '../assets/cards/what-do-you-want.svg';
import back from '../assets/cards/back.svg';

export const CARD_BACK = back;

export const CARDS = [
  { id: 'deadline', name: 'Дедлайн', image: deadline },
  { id: 'error', name: 'Ошибка', image: error },
  { id: 'everything-works', name: 'У меня всё работает', image: everythingWorks },
  { id: 'google', name: 'Погуглю', image: google },
  { id: 'how-i-see', name: 'Я так вижу', image: howISee },
  { id: 'lazy', name: 'Лень наше всё', image: lazy },
  { id: 'not-a-bug', name: 'Это не баг, это фича', image: notABug },
  { id: 'what-do-you-want', name: 'Что надо?', image: whatDoYouWant },
];
