export const from = <T>(length: number, cb: (i: number) => T) =>
  Array.from<unknown, T>({ length }, (_, i) => cb(i));
