import { Observable, from, zip, concat, range, of, throwError, pipe, OperatorFunction, MonoTypeOperatorFunction } from "rxjs";
import { repeat, map, filter, take, count, distinct, last, catchError, tap } from 'rxjs/operators';
import { parse } from 'mathjs';

function getRandomBoolean(): boolean {
  return Math.random() >= 0.5;
}

export const deoxyribonucleotides: Observable<string> = from([
  '0000', '0001', '0010', '0011', '0100', '0101', '0110',
  '0111', '1000', '1001', '1010', '1011', '1100', '1110'
]);

export const operandsAndOperators: Observable<string | number> = concat(
  from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
  from(['+', '-', '*', '/'])
);

/** As the name says, create dictionary out of operandsAndOperators + deoxyribonucleotides
 * 
 * @returns Observable<{nucleotide: string, decoded: string | number}>
 */
export function createNucleotideDictionary(
  deoxyribonucleotides: Observable<string>,
  operandsAndOperators: Observable<string | number>) {
  return zip(
    deoxyribonucleotides.pipe(distinct()),
    operandsAndOperators.pipe(distinct())
  ).pipe(map(([nucleotide, decoded]) => ({ nucleotide: nucleotide, decoded })));
}

/** Generates an observable consisting of n deoxyribonucleotides.
 * 
 * @param n   n > 0
 *            The amount of nucleotides you want your DNA
 *            to consist of.
 * @returns   An Observable of strings e.g.: '1001'...'1010'...'1011'...'1100'...'1110'
 */
export function generateRandomDNA (n: number) {
  // TODO: check for only odd numbers
  if (n > 0) {
    return deoxyribonucleotides.pipe(
      map(x => getRandomBoolean() ? x : null),
      filter(x => x !== null),
      repeat(n),
      take(n)
    )
  } else {
    throw new Error('generateRandomDNA::generateRandomDNA only accepts numbers > 0');
  }
}

/** Decode a nucleotide by searching the nucleotideDictionary for matches.
 *
 * @param dictionary  The tuples of nucleotides and values we are searching in.
 * @param nucleotide  The nucleotide we are searching for e.g.: '1110'.
 * @returns           A decoded nucleotide e.g.: '/'.
 */
export function decode(nucleotide: string) {
  return pipe(
    filter((x: any) => x.nucleotide === nucleotide),
    map(x => x.decoded),
    last(),
    catchError(err => throwError('decode operator::No match found'))
  );
}

/** Checks with the help of mathjs parse if the decodedDNA is a valid expression.
 * 
 * @param   decodedDNA  An array of operands and operators e.g.: [1, '+', 3, '*', 5].
 * @returns             True if the decodedDNA is a valid expression.
 */
export function validateDNA(decodedDNA: (string | number)[]): Observable<boolean | Error> {
  let a = "";
  return from(decodedDNA).pipe(
    tap(op => (a += op)),
    last(),
    map(() => a),
    filter(formula => parse(formula)),
    map(x => true),
    catchError(err => throwError('No valid DNA'))
  );
};