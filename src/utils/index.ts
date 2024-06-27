export const randomInt = (max: number, list: number[]): number => {
  let i;

  do {
    i = Math.floor(Math.random() * max);
  } while (list.includes(i));

  return i;
};


export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const from = (length: number, cb: (v: unknown, i: number) => JSX.Element) =>
  Array.from<unknown, JSX.Element>({ length }, cb);
