import { createElement } from '../utils/create-element.js';
import { pluralize } from '../utils/pluralize.js';
import { createModal } from './modal.js';

const MOVE_FORMS = ['ход', 'хода', 'ходов'];

export function showWinModal({ moves, onNewGame }) {
  const content = createElement('div', { className: 'win' }, [
    createElement('p', { className: 'win__result' }, [
      'Ваш результат: ',
      createElement('strong', { text: `${moves} ${pluralize(moves, MOVE_FORMS)}` }),
    ]),
  ]);

  createModal({
    title: 'Победа!',
    content,
    actions: [{ text: 'Новая игра', onClick: onNewGame }],
  }).open();
}
