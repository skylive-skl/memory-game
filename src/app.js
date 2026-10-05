import { createElement } from './utils/create-element.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';
import { createBoard } from './components/board.js';
import { createGame } from './game/game.js';
import { showWinModal } from './components/win-modal.js';
import { showLeaderboardModal } from './components/leaderboard-modal.js';
import { addResult, getResults } from './storage/leaderboard.js';

export function createApp(root) {
  const stats = createStats();
  const board = createBoard({ onCardClick: (index) => game.flip(index) });

  const game = createGame({
    onNewDeck: (deck) => board.render(deck),
    onUpdate: () => {
      board.update(game.getCardState);
      stats.update(game.getStats());
    },
    onWin: ({ moves }) => {
      addResult({ moves, date: Date.now() });
      showWinModal({ moves, onNewGame: () => game.start() });
    },
  });

  const header = createHeader({
    onNewGame: () => game.start(),
    onShowLeaderboard: () => showLeaderboardModal(getResults()),
  });

  const main = createElement('main', { className: 'main' }, [stats.element, board.element]);

  root.append(createElement('div', { className: 'app' }, [header, main]));
  game.start();
}
