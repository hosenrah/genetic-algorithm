import { generateRandomDNA, decodeNucleotide } from "../src/operators";
import { Observable, from, of, concat, zip } from "rxjs";
import { count, map } from 'rxjs/operators';

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
  const decodedNucleotide = {nucleotide: '1110', decoded: '/'};
  const unknownNucleotide = '1111';

  it('should decode a given nucleotide', () => {
    const result = decodeNucleotide(dictionary, decodedNucleotide.nucleotide);
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
