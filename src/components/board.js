import { createElement } from '../utils/create-element.js';
import { createCard } from './card.js';

export function createBoard({ onCardClick }) {
  const element = createElement('section', {
    className: 'board',
    attrs: { 'aria-label': 'Игровое поле' },
  });
  let cards = [];

  function render(deck) {
    cards = deck.map((card, index) => createCard({ card, onClick: () => onCardClick(index) }));
    element.replaceChildren(...cards.map((card) => card.element));
  }

  function update(getCardState) {
    cards.forEach((card, index) => card.update(getCardState(index)));
  }

  return { element, render, update };
}
