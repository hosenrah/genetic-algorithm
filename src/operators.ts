import { Observable, from, zip, concat, range } from "rxjs";
import { repeat, map, filter, take, count, distinct } from 'rxjs/operators';

function getRandomBoolean(): boolean {
  return Math.random() >= 0.5;
}

const operandsAndOperators: Observable<string | number> = concat(
  range(0, 9),
  from(['+', '-', '*', '/'])
);

const deoxyribonucleotides: Observable<string> = from([
  '0000', '0001', '0010', '0011', '0100', '0101', '0110',
  '0111', '1000', '1001', '1010', '1011', '1100', '1110'
]);

export function createNucleotideDictionary(operandsAndOperators, deoxyribonucleotides) {
  return zip(
    deoxyribonucleotides.pipe(distinct()),
    operandsAndOperators.pipe(distinct())
  ).pipe(map(([nucleotide, decoded]) => ({ nucleotide: nucleotide, decoded })));
}

/** Generates an observable consisting of n deoxyribonucleotides.
 * 
 * @param n   n > 0
 *            The amount of nucleotides you want your dna
 *            to consist of.
 */
export function generateRandomDNA (n: number) {
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

/**   Decode a nucleotide by searching the nucleotideDictionary for matches
 * 
 * @param dictionary The tuples of nucleotides and values we are searching in
 * @param nucleotide The nucleotide we are searching for.
 */
export function decodeNucleotide(
  dictionary: Observable<{
    nucleotide: string;
    decoded: string | number;
  }>, nucleotide: string
  ) {
  const decodedNucleotide = dictionary.pipe(
    filter(x => x.nucleotide === nucleotide)
  );
  let counter = 0;
  const subscriber = decodedNucleotide.pipe(count()).subscribe(x => counter = x)
  if (counter > 0) {
    return decodedNucleotide;
  } else {
    throw new Error('Could not decode');
  }
}
