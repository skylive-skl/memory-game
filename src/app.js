import { createElement } from './utils/create-element.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';
import { createBoard } from './components/board.js';
import { createGame } from './game/game.js';

export function createApp(root) {
  const stats = createStats();
  const board = createBoard({ onCardClick: (index) => game.flip(index) });

  const game = createGame({
    onNewDeck: (deck) => board.render(deck),
    onUpdate: () => {
      board.update(game.getCardState);
      stats.update(game.getStats());
    },
  });

  const header = createHeader({
    onNewGame: () => {},
    onShowLeaderboard: () => {},
  });

  const main = createElement('main', { className: 'main' }, [stats.element, board.element]);

  root.append(createElement('div', { className: 'app' }, [header, main]));
  game.start();
}
