const STORAGE_KEY = 'memory-game-results';
const MAX_RESULTS = 10;

function isValidResult(result) {
  return Number.isFinite(result?.moves) && Number.isFinite(result?.date);
}

// Меньше ходов — выше; при равенстве выше более ранняя игра.
function compareResults(a, b) {
  return a.moves - b.moves || a.date - b.date;
}

/**
 * Возвращает до 10 лучших результатов, отсортированных по правилам рейтинга.
 * @returns {Array<{ moves: number, date: number }>}
 */
export function getResults() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidResult).sort(compareResults).slice(0, MAX_RESULTS);
  } catch {
    return [];
  }
}

/**
 * Добавляет результат завершённой игры и оставляет в хранилище только 10 лучших.
 * @param {{ moves: number, date: number }} result
 */
export function addResult(result) {
  const results = [...getResults(), result].sort(compareResults).slice(0, MAX_RESULTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    // Хранилище недоступно (приватный режим, переполнение) — игра продолжает работать без рейтинга.
  }
}
