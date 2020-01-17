import { range, from, Observable, } from 'rxjs';
import { map, filter, toArray, bufferCount, pairwise, concatAll } from 'rxjs/operators';
import { generateRandomDNA, decodeNucleotide, validateDNA, createOrganism, Organism, calculateFitness, recombine, createPopulation } from "./operators";
import { DNA, round, shuffle, orderBy } from './helpers';

export interface Population {
  gen: number;
  averageFitness: number;
  organisms: Organism[];
  [Symbol.iterator];
};

console.log('Welcome to my genetic algorithm');

let startPopulation = {} as Population;
const startPopulationSize = 10;
const startDNAComplexity = 5;
const lifecylcle = 10;

range(0, startPopulationSize).pipe(
  map(x => createOrganism(generateRandomDNA(startDNAComplexity))),
  filter(x => x.valid === true),
  toArray()
  ).subscribe(x => {
    startPopulation = createPopulation(x);
    startPopulation.gen = 0;
  });

console.log(startPopulation);

const liveForOneGeneration = (cur: Population) => {
  let newGeneration = {} as Population;
  cur.organisms = shuffle(cur.organisms);
  const pairedOrganisms: Observable<[Organism, Organism]> = from(cur.organisms).pipe(pairwise());
  pairedOrganisms.pipe(
    map(pair => {
      const newOrganisms: [DNA, DNA] = recombine(pair[0].dna, pair[1].dna);
      return [createOrganism(newOrganisms[0]), createOrganism(newOrganisms[1])];
    }),
    concatAll(),
    filter(x => x.fitness >= 0.003),
    toArray()
  ).subscribe(x => {
    newGeneration = createPopulation(x);
    newGeneration.gen = cur.gen + 1;
  });
  return newGeneration;
};

let currentPopulation = startPopulation;

for (let index = 0; index < lifecylcle; index++) {
  currentPopulation = liveForOneGeneration(currentPopulation);
  currentPopulation.organisms = orderBy(currentPopulation.organisms, ['value'], ['desc']);
  console.log(currentPopulation);
}

