import { createElement } from './utils/create-element.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';

const TOTAL_PAIRS = 8;

export function createApp(root) {
  const stats = createStats();
  const board = createElement('section', {
    className: 'board',
    attrs: { 'aria-label': 'Игровое поле' },
  });

  const header = createHeader({
    onNewGame: () => {},
    onShowLeaderboard: () => {},
  });

  const main = createElement('main', { className: 'main' }, [stats.element, board]);

  stats.update({ moves: 0, pairsFound: 0, totalPairs: TOTAL_PAIRS });
  root.append(createElement('div', { className: 'app' }, [header, main]));
}
