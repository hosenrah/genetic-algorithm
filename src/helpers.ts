export interface DNA {
  [index: number]: {
    nucleotide: string;
    value: number | string | undefined;
  };
  length: number;
  map: Function;
  slice: Function;
}
  
export interface Dictionary {
  [property: string]: string | number | undefined;
}

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

export const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );

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

export const round = (n, decimals = 0) => {
  const one = Number(`${n}e${decimals}`)
  const two = Math.round(one)
  const three = `${two}e-${decimals}`
  return Number(three);
}