import { parse } from 'mathjs';
import { DNA, Dictionary, getRandomIntArrayInRange, zipToDictionary, round, getRandomNumber } from './helpers';
import { evaluate } from 'mathjs';
import { Population } from '.';

export interface Organism {
  valid: boolean;
  dna: DNA;
  value: number;
  fitness: number;
}

export const nucleotides: Array<string> = [
  '0000', '0001', '0010', '0011', '0100', '0101', '0110',
  '0111', '1000', '1001', '1010', '1011', '1100', '1110'
];

export const operandsAndOperators: Array<string | number> = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/'
];

/** Generates a random dna of length n
 * 
 * @param n 
 */
export const generateRandomDNA = (n: number): DNA => {
  let dna = getRandomIntArrayInRange(0, nucleotides.length - 1, n);
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
export const validateDNA = (dna: DNA): boolean => {
  let formula: string = dna.map(x => x.value).join('');
  try {
    return parse(formula) ? true : false;
  } catch (error) {
    return false;
  }
};

/** Recombine father and mother dna and return new dna
 * 
 * @param father 
 * @param mother 
 */
export const recombine = (fatherDNA: DNA, motherDNA: DNA): [DNA, DNA] => {
  const slicingPoint = getRandomNumber(fatherDNA.length - 1);
  const newRightDNA = motherDNA.slice(0, slicingPoint).concat(fatherDNA.slice(slicingPoint, fatherDNA.length));
  const newLeftDNA = fatherDNA.slice(0, slicingPoint).concat(motherDNA.slice(slicingPoint, motherDNA.length));
  return [newLeftDNA, newRightDNA];
};

export const calculateFitness = (goal: number, current: number) => {
  
  if (goal != current) {
    let fitness = 1.001 / Math.abs(goal - current);
    fitness = Math.round(fitness * 1e4) / 1e4;
    return fitness;
  } else {
    return 1;
  }
};

export const createOrganism = (dna: DNA): Organism => {
  const organism = {
    valid: validateDNA(dna),
    dna,
    value: 0,
    fitness: 0
  };
  if (organism.valid) {
    organism.value = evaluate(organism.dna.map(x => x.value).join(''));
    organism.fitness = calculateFitness(42, organism.value);
  }

  return organism;
};

export const createPopulation = (organisms: Organism[]): Population => {
  let newPopulation = {} as Population;
  newPopulation.organisms = organisms;
  let averageFitness = organisms.reduce((acc, cur) => acc + cur.fitness, 0);
  averageFitness = Math.round(averageFitness / organisms.length * 1e4) / 1e4
  newPopulation.averageFitness = averageFitness;
  return newPopulation;
};