import { createDeck } from './deck.js';

export const TOTAL_PAIRS = 8;
const MISMATCH_DELAY = 1000;

export function createGame({ onNewDeck, onUpdate, onWin }) {
  let deck = [];
  let openIndices = [];
  let matchedIndices = new Set();
  let moves = 0;
  let pairsFound = 0;
  let isFinished = false;
  let mismatchTimerId = null;

  function cancelMismatchTimer() {
    if (mismatchTimerId !== null) {
      clearTimeout(mismatchTimerId);
      mismatchTimerId = null;
    }
  }

  function start() {
    cancelMismatchTimer();
    deck = createDeck();
    openIndices = [];
    matchedIndices = new Set();
    moves = 0;
    pairsFound = 0;
    isFinished = false;

    onNewDeck(deck);
    onUpdate();
  }

  function canFlip(index) {
    return (
      !isFinished &&
      openIndices.length < 2 &&
      !openIndices.includes(index) &&
      !matchedIndices.has(index)
    );
  }

  function closeMismatchedPair() {
    mismatchTimerId = null;
    openIndices = [];
    onUpdate();
  }

  function resolvePair() {
    const [first, second] = openIndices;
    moves += 1;

    if (deck[first].id !== deck[second].id) {
      mismatchTimerId = setTimeout(closeMismatchedPair, MISMATCH_DELAY);
      onUpdate();
      return;
    }

    matchedIndices.add(first);
    matchedIndices.add(second);
    openIndices = [];
    pairsFound += 1;
    isFinished = pairsFound === TOTAL_PAIRS;
    onUpdate();

    if (isFinished) {
      onWin?.({ moves });
    }
  }

  function flip(index) {
    if (!canFlip(index)) {
      return;
    }

    openIndices.push(index);

    if (openIndices.length === 2) {
      resolvePair();
    } else {
      onUpdate();
    }
  }

  function getCardState(index) {
    const isMatched = matchedIndices.has(index);
    return { isMatched, isOpen: isMatched || openIndices.includes(index) };
  }

  function getStats() {
    return { moves, pairsFound, totalPairs: TOTAL_PAIRS };
  }

  return { start, flip, getCardState, getStats };
}
