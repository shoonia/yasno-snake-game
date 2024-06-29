const m35 = window.matchMedia('(max-width: 35em)').matches;

export const Size = {
  X: m35 ? 14 : 24,
  Y: 7,
};
