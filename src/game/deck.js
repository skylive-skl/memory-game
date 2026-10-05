import { CARDS } from '../data/cards.js';
import { shuffle } from '../utils/shuffle.js';

/**
 * Создаёт перемешанную колоду: каждая карточка встречается дважды.
 */
export function createDeck() {
  return shuffle([...CARDS, ...CARDS]);
}
