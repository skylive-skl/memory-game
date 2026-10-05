import { createElement } from '../utils/create-element.js';
import { CARD_BACK } from '../data/cards.js';

const CLOSED_LABEL = 'Закрытая карточка';

export function createCard({ card, onClick }) {
  const element = createElement(
    'button',
    {
      className: 'card',
      attrs: { type: 'button', 'aria-label': CLOSED_LABEL },
      on: { click: onClick },
    },
    [
      createElement('span', { className: 'card__inner' }, [
        createElement('span', { className: 'card__side card__side--back' }, [
          createElement('img', { className: 'card__image', attrs: { src: CARD_BACK, alt: '' } }),
        ]),
        createElement('span', { className: 'card__side card__side--front' }, [
          createElement('img', { className: 'card__image', attrs: { src: card.image, alt: '' } }),
        ]),
      ]),
    ],
  );

  function update({ isOpen, isMatched }) {
    element.classList.toggle('card--open', isOpen);
    element.classList.toggle('card--matched', isMatched);
    element.setAttribute('aria-label', isOpen ? card.name : CLOSED_LABEL);
  }

  return { element, update };
}
