import { generateRandomDNA, decodeNucleotide, validateDNA } from "../src/operators";
import { from } from "rxjs";
import { count } from 'rxjs/operators';

describe('Test random DNA generator', () => {
  it('should return a random DNA observable with 7 nucleotides', () => {
    const nucleotides = 7;
    const dna = generateRandomDNA(nucleotides);
    dna.pipe(count()).subscribe(count => {
      expect(count).toBe(nucleotides);
    });
  });

  it('should return an error on nucleotide amounts = 0', () => {
    const nucleotides = 0;
    function generate() {
      generateRandomDNA(nucleotides);
    };
    expect(generate).toThrowError('generateRandomDNA::generateRandomDNA only accepts numbers > 0');
  });

  it('should return an error on nucleotide amounts < 0', () => {
    const nucleotides = -3;
    function generate() {
      generateRandomDNA(nucleotides);
    };
    expect(generate).toThrowError('generateRandomDNA::generateRandomDNA only accepts numbers > 0');
  });
});

describe('Test nucleotide decoding', () => {
  const dictionary = from([
    { nucleotide: '1001', decoded: 9 },
    { nucleotide: '0000', decoded: 0 },
    { nucleotide: '1110', decoded: '/' }
  ]);

  const nucleotide = '1110'
  const decodedNucleotide = '/';
  const unknownNucleotide = '1111';

  it('should decode a given nucleotide', () => {
    const result = decodeNucleotide(dictionary, nucleotide);
    result.subscribe((val) => {
      expect(val).toStrictEqual(decodedNucleotide);
    });
  });

  it('should return an error if the nucleotide can not be decoded', () => {
    function decode() {
      decodeNucleotide(dictionary, unknownNucleotide);
    }
    expect(decode).toThrowError('Could not decode')
  });
});

describe('Test DNA validator', () => {
  const dictionary = from([
    { nucleotide: '1001', decoded: 9 },
    { nucleotide: '0000', decoded: 0 },
    { nucleotide: '1110', decoded: '/' }
  ]);
  const validDecodedDNA = [1, '+', 3, '*', 5];
  const invalidDecodedDNA = [1, '+', '*', 2];

  it('should return true if DNA is valid', () => {
    validateDNA(validDecodedDNA).subscribe((result) => {
      expect(result).toStrictEqual(true);
    });
  });

  it('should return an error if DNA is invalid', done => {
    validateDNA(invalidDecodedDNA).subscribe({
      next(x) { console.log('got value ' + x); },
      error(err) { expect(err).toBe('No valid DNA'); done(); },
      complete() { console.log('done'); }
    });
  }, 1500); 
});