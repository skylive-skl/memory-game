import { createElement } from '../utils/create-element.js';
import { formatDate } from '../utils/format-date.js';
import { createModal } from './modal.js';

function createTable(results) {
  const head = createElement('thead', {}, [
    createElement(
      'tr',
      {},
      ['Место', 'Ходы', 'Дата'].map((text) =>
        createElement('th', { text, attrs: { scope: 'col' } }),
      ),
    ),
  ]);

  const rows = results.map(({ moves, date }, index) =>
    createElement('tr', {}, [
      createElement('td', { text: String(index + 1) }),
      createElement('td', { text: String(moves) }),
      createElement('td', { text: formatDate(date) }),
    ]),
  );

  return createElement('table', { className: 'leaderboard' }, [
    head,
    createElement('tbody', {}, rows),
  ]);
}

export function showLeaderboardModal(results) {
  const content =
    results.length > 0
      ? createTable(results)
      : createElement('p', { className: 'leaderboard__empty', text: 'Пока нет результатов' });

  createModal({ title: 'Таблица лидеров', content }).open();
}
