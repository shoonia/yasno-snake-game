export const randomInt = (max: number, list: number[]): number => {
  let i;

  do {
    i = Math.floor(Math.random() * max);
  } while (list.includes(i));

  return i;
};


export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
