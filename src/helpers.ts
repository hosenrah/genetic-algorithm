export interface DNA {
  [index: number]: {
    nucleotide: string;
    value: number | string | undefined;
  };
  length: number;
  map: Function;
}
  
export interface Dictionary {
  [property: string]: string | number | undefined;
}


/** Returns an array of n random integers in the specified range.
 *
 * @param min
 * @param max
 * @param n
 */
export const getRandomIntArrayInRange = (min = 0, max = 10, n = 1): number[] =>
  Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);

/** Given an array of valid property identifiers and an array of values,
 *  return an object associating the properties to the values.
 * 
 * @param props 
 * @param values 
 */
export const zipToDictionary = (props: Array<any>, values: Array<any>): Dictionary =>
  props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});
