/**
 * Выбирает форму слова для числа: pluralize(5, ['ход', 'хода', 'ходов']) → 'ходов'.
 * @param {number} count
 * @param {[string, string, string]} forms — для 1, 2–4 и 5+ (а также 11–14)
 */
export function pluralize(count, [one, few, many]) {
  const lastTwo = count % 100;
  const last = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return many;
  }
  if (last === 1) {
    return one;
  }
  if (last >= 2 && last <= 4) {
    return few;
  }
  return many;
}
