import {describe, it, expect} from 'vitest';
import {checkStringValid, isPalindrome, getIntegerNumber} from '../js/functions';

describe('checkStringValid', () => {
  it('should return true if string length is less than lengthMax', () => {
    expect(checkStringValid('Утро', 5)).toBe(true);
  });
  it('should return true if string length is exactly lengthMax', () => {
    expect(checkStringValid('Привет', 6)).toBe(true);
  });
  it('should return false if string length is more than lengthMax', () => {
    expect(checkStringValid('abcdef', 5)).toBe(false);
  });
  it('should return true for empty string and positive lengthMax', () => {
    expect(checkStringValid('', 3)).toBe(true);
  });
  it('should return true for empty string and zero lengthMax', () => {
    expect(checkStringValid('', 0)).toBe(true);
  });
  it('should throw an error if string is undefined', () => {
    expect(() => checkStringValid(undefined, 3)).toThrow();
  });
});

describe('isPalindrome', () => {
  it('should return true for simple palindromes', () => {
    expect(isPalindrome('мадам')).toBe(true);
  });

  it('should return true for palindromes with spaces and punctuation', () => {
    expect(isPalindrome('А роза упала на лапу Азора')).toBe(true);
  });

  it('should return false for non-palindromes', () => {
    expect(isPalindrome('Тест')).toBe(false);
  });

  it('should work with empty strings and single characters', () => {
    expect(isPalindrome('')).toBe(true);
    expect(isPalindrome('a')).toBe(true);
  });
});

describe('getIntegerNumber', () => {
  it('should extract digits from a string with letters and symbols', () => {
    expect(getIntegerNumber('abc123def')).toBe(123);
    expect(getIntegerNumber('test-456-test')).toBe(456);
    expect(getIntegerNumber('a1b2c3')).toBe(123);
  });

  it('should process floating‑point numbers', () => {
    expect(getIntegerNumber(3.14)).toBe(314);
    expect(getIntegerNumber('5.67')).toBe(567);
  });

  it('should yield a currect handle negative numbers', () => {
    expect(getIntegerNumber(-42)).toBe(42);
  });

  it('should yield NaN if there are no digits in the input', () => {
    expect(isNaN(getIntegerNumber('abc'))).toBe(true);
    expect(isNaN(getIntegerNumber(''))).toBe(true);
    expect(isNaN(getIntegerNumber(null))).toBe(true);
    expect(isNaN(getIntegerNumber(undefined))).toBe(true);
    expect(isNaN(getIntegerNumber([]))).toBe(true);
  });
});
