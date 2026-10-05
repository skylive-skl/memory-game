import { createElement } from '../utils/create-element.js';

export function createHeader({ onNewGame, onShowLeaderboard }) {
  const newGameButton = createElement('button', {
    className: 'button',
    text: 'Новая игра',
    attrs: { type: 'button' },
    on: { click: onNewGame },
  });

  const leaderboardButton = createElement('button', {
    className: 'button button--secondary',
    text: 'Таблица лидеров',
    attrs: { type: 'button' },
    on: { click: onShowLeaderboard },
  });

  return createElement('header', { className: 'header' }, [
    createElement('h1', { className: 'header__title', text: 'Memory Game' }),
    createElement('nav', { className: 'header__actions' }, [newGameButton, leaderboardButton]),
  ]);
}
