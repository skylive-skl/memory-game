import { createElement } from './utils/create-element.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';
import { createBoard } from './components/board.js';
import { createDeck } from './game/deck.js';

const TOTAL_PAIRS = 8;

export function createApp(root) {
  const stats = createStats();
  const board = createBoard({ onCardClick: () => {} });

  const header = createHeader({
    onNewGame: () => {},
    onShowLeaderboard: () => {},
  });

  const main = createElement('main', { className: 'main' }, [stats.element, board.element]);

  board.render(createDeck());
  stats.update({ moves: 0, pairsFound: 0, totalPairs: TOTAL_PAIRS });
  root.append(createElement('div', { className: 'app' }, [header, main]));
}
