import { from, Observable } from "rxjs";
import { repeat, map, filter, take } from 'rxjs/operators';

const operandsAndOperators: Observable<string> = from(
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/']
);

const deoxyribonucleotides: Observable<string> = from([
  '0000', '0001', '0010', '0011', '0100', '0101', '0110',
  '0111', '1000', '1001', '1010', '1011', '1100', '1110'
]);

function getRandomBoolean(): boolean {
  return Math.random() >= 0.5;
}

/** Generates an observable consisting of n deoxyribonucleotides
 * 
 * @param nucleotides 0 < nucelotides < n
 *                    The amount of nucleotides you want your dna
 *                    to consist of.
 */
export function generateRandomDNA (nucleotides: number): Observable<string> {
  if (Math.sign(nucleotides) === -1) {
    throw new Error('generateRandomDNA only accepts numbers > 0');
  }
  return deoxyribonucleotides.pipe(
    map(x => getRandomBoolean() ? x : null),
    filter(x => x !== null),
    repeat(nucleotides),
    take(nucleotides)
  )
};
