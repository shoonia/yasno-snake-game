export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
