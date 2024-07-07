const calcWidth = (width: number) => {
  const x = Math.floor((width - 32) / 22.5);

  return x > 24 ? 24 : x;
};

export const Size = {
  X : calcWidth(window.innerWidth),
  Y: 7,
};

window.addEventListener('resize', () => {
  const x = calcWidth(window.innerWidth);

  if (x !== Size.X) {
    location.reload();
  }
}, { passive: true });
