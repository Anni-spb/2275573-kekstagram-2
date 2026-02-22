/** Проверяет длинну стоки по заданным параметрам
 * @param {string} string строка для проверки
 * @param {number} lengthMax максимальная длина строки
 * @returns {boolean}
 */
export function checkStringValid(string, lengthMax) {
  return string.length <= lengthMax;
}

/** Проверяет, является ли строка палиндромом
 * @param {string} string строка для проверки
 * @returns {boolean}
 */
export const isPalindrome = (string) => {
  const stringCheck = string.replaceAll(' ', '').toLowerCase();
  let stringReverse = '';
  for (let i = stringCheck.length - 1; i >= 0; i--) {
    stringReverse += stringCheck[i];
  }
  return stringCheck === stringReverse;
};


/** Извлекает из строкисодержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
 * Если в строке нет ни одной цифры, функция должна вернуть NaN
 * @param {string} string
 * @returns {number}
 */
export const getIntegerNumber = (input) => {
  const digits = String(input).replace(/\D/g, '');

  if (digits.length === 0) {
    return NaN;
  }

  return parseInt(digits, 10);
};
