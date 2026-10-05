/**
 * Форматирует дату как ДД.ММ.ГГГГ.
 * @param {Date | number} value
 */
export function formatDate(value) {
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${day}.${month}.${date.getFullYear()}`;
}
