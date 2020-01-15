import { range, } from 'rxjs';
import { map, filter, toArray } from 'rxjs/operators';
import { generateRandomDNA, decodeNucleotide, validateDNA, createOrganism, Organism } from "./operators";
import { DNA } from './helpers';
import { evaluate } from 'mathjs';

interface Population {
  organisms: Organism[];
};

console.log('Welcome to my genetic algorithm');

let population = {} as Population;

range(0, 50).pipe(
  map(x => createOrganism(generateRandomDNA(20))),
  filter(x => x.valid === true),
  map(x => {
    x.value = evaluate(x.dna.map(x => x.value).join(''));
    x.value = Math.round(x.value);
    return x;
  }),
  toArray()
  ).subscribe(x => population.organisms = x);

console.log(population);