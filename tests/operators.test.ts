import { generateRandomDNA } from "../src/operators";
import { count } from 'rxjs/operators';

describe( 'Test random DNA generator', () => {

  it('should return a random DNA observable with 7 nucleotides', () => {
    const nucleotides: number = 7;
    const result = generateRandomDNA(nucleotides).pipe(count());
    result.subscribe(val => {
      expect(val).toBe(nucleotides);
    });
  });

  it('should return an error on nucleotide amounts <= 0', () => {
    const nucleotides: number = -3;
    function generate() {
      generateRandomDNA(nucleotides)
    };
    expect(generate)
    .toThrowError('generateRandomDNA only accepts numbers > 0');
  })
});
