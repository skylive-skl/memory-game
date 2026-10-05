const STORAGE_KEY = 'memory-game-results';
const MAX_RESULTS = 10;

function isValidResult(result) {
  return Number.isFinite(result?.moves) && Number.isFinite(result?.date);
}
function compareResults(a, b) {
  return a.moves - b.moves || a.date - b.date;
}

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

export function addResult(result) {
  const results = [...getResults(), result].sort(compareResults).slice(0, MAX_RESULTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    // ignore
  }
}
