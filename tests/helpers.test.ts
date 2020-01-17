import { Dictionary, getRandomIntArrayInRange, zipToDictionary, round } from '../src/helpers';

describe('Test getRandomNumbers', () => {
  it('Should generate an array n random integers in the specified range', () => {
    const min = 0, max = 1000;
    const length = 10;
    const randomIntArrayInRange = getRandomIntArrayInRange(min, max, length);
  });
});

describe('Test zipToDictionary', () => {
  it('Should return an object associating the properties to the values', () => {
    const properties = ['a', 'b', 'c'];
    const values = [1, 2];
    const expectedResult: Dictionary = {
      a: 1,
      b: 2,
      c: undefined
    };
    const zip = zipToDictionary(properties, values);
    expect(zip).toStrictEqual(expectedResult);
  });
});

describe('Test round function', () => {
  it('Should round correctly', () => {
    const roundedNumber = round(1.005, 2);
    expect(roundedNumber).toBe(1.01);
  });
});