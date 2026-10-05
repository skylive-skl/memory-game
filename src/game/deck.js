import { CARDS } from '../data/cards.js';
import { shuffle } from '../utils/shuffle.js';

export function createDeck() {
  return shuffle([...CARDS, ...CARDS]);
}
