import { range, of, from } from 'rxjs';
import { map, concatAll, tap, toArray } from 'rxjs/operators';
import { generateRandomDNA, decode, validateDNA } from "./operators";

console.log('Welcome to my genetic algorithm');

// from(["0001", "0110", "0111", "1011", "0000", "0001", "0101"]).pipe(
//   decode()
// ).subscribe(x => console.log(x))

// generateRandomDNA(7).pipe(
//   decode()
// ).subscribe(x => console.log(x));

range(5).pipe(
  map(organism => generateRandomDNA(12).pipe(decode())),
  concatAll(),
).subscribe(organism => {
  validateDNA(organism).subscribe(valid => {
    if (valid) {
      console.log(`%c current organism: ${organism}`,
                  'color: lightgreen')
    } else {
      console.log(`%c current organism: ${organism}`,
                  'color: red')
    }
    
  })
});