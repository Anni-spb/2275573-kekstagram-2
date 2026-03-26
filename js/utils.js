/**
 * Генератор случайного целого числа.
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @returns {number} - случайное число в диапазоне [min, max]
 */
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Получить случайный элемент массива.
 * @param {Array} elements - массив элементов
 * @returns {*} - случайный элемент массива
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomArrayElement, isEscapeKey };
