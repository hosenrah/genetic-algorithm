import { DNA, Dictionary } from '../src/helpers';
import { generateRandomDNA, decodeNucleotide, validateDNA, recombine } from '../src/operators';

describe('Tets dna generator', () => {
  it('Should generate dna', () => {
    const n = 7;
    const dna = generateRandomDNA(n);
    expect(dna.length).toBe(n);
  });
});

describe('Test decodeNucleotide', () => {
  it('Should decode a nucleotide using the given dictionary', () => {
    const dictionary: Dictionary = {
      '1001': 9
    };
    const nucleotide = '1001';
    const decodedNucleotide = decodeNucleotide(nucleotide, dictionary);
    expect(decodedNucleotide).toStrictEqual(dictionary['1001']);
  });
});

describe('Test validateDNA', () => {
  it('Should return true when given a valid dna', () => {
    const dna: DNA = [
      { nucleotide: '0001', value: '1' },
      { nucleotide: '1010', value: '+' },
      { nucleotide: '0010', value: '2' },
    ];
    expect(validateDNA(dna)).toBe(true);
  });
  it('Should return false when given invalid dna', () => {
    const invalidDna: DNA = [
      { nucleotide: '1100', value: '*' },
      { nucleotide: '1010', value: '+' },
      { nucleotide: '0010', value: '2' },
    ];
    expect(validateDNA(invalidDna)).toBe(false);
  });
});

describe('Test genetic recombination', () => {
  it('Should return dna', () => {
    const dna1: DNA = [
      { nucleotide: '0001', value: '1' },
      { nucleotide: '1010', value: '+' },
      { nucleotide: '0010', value: '2' },
    ];
    const dna2: DNA = [
      { nucleotide: '0001', value: '3' },
      { nucleotide: '1010', value: '-' },
      { nucleotide: '0010', value: '1' },
      { nucleotide: '0010', value: '2' },
    ];
    console.log(recombine(dna1, dna2));
  })
});
