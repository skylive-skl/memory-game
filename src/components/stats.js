import { createElement } from '../utils/create-element.js';

export function createStats() {
  const movesValue = createElement('span', { className: 'stats__value' });
  const pairsValue = createElement('span', { className: 'stats__value' });

  const element = createElement(
    'section',
    { className: 'stats', attrs: { 'aria-live': 'polite' } },
    [
      createElement('p', { className: 'stats__item' }, ['Ходы: ', movesValue]),
      createElement('p', { className: 'stats__item' }, ['Пары: ', pairsValue]),
    ],
  );

  function update({ moves, pairsFound, totalPairs }) {
    movesValue.textContent = String(moves);
    pairsValue.textContent = `${pairsFound} из ${totalPairs}`;
  }

  return { element, update };
}
