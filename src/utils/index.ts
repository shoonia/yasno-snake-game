export const randomInt = (max: number) => Math.floor(Math.random() * max);

export const from = (length: number, cb: (v: unknown, i: number) => JSX.Element) =>
  Array.from<unknown, JSX.Element>({ length }, cb);
