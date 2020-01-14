import { parse } from 'mathjs';
import { DNA, Dictionary, getRandomIntArrayInRange, zipToDictionary } from './helpers';

export const nucleotides: Array<string> = [
  '0000', '0001', '0010', '0011', '0100', '0101', '0110',
  '0111', '1000', '1001', '1010', '1011', '1100', '1110'
];

export const operandsAndOperators: Array<string | number> = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/'
];

export const dictionary = zipToDictionary(nucleotides, operandsAndOperators);

/** Generates a random dna of length n
 * 
 * @param n 
 */
export const generateRandomDNA = (n: number): DNA => {
  let dna = getRandomIntArrayInRange(0, 14, n);
  return dna.map(val => {
    return {
      nucleotide: nucleotides[val],
      value: operandsAndOperators[val]
    }
  });
};

/** Decodes a nucleotide using the given dictionary
 * 
 * @param nucleotide 
 * @param dictionary 
 */
export const decodeNucleotide = (nucleotide: string, dictionary: Dictionary): string | number | undefined => {
  return dictionary[nucleotide];
};

/** Transforms and validates a given dna
 * 
 * @param dna 
 */
export const validateDNA = (dna: DNA) => {
  let formula: string = dna.map(x => x.value).join('');
  try {
    return parse(formula) ? true : false;
  } catch (error) {
    return false;
  }
};
