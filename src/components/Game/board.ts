const calcWidth = (width: number) => {
  const x = Math.floor((width - 54) / 22.5);

  return x > 24 ? 24 : x;
};

export interface IBoard {
  readonly x: number;
  readonly y: number;
}

export const board: IBoard = {
  x: calcWidth(window.innerWidth),
  y: 7,
};

window.addEventListener('resize', () => {
  const x = calcWidth(window.innerWidth);

  if (x !== board.x) {
    location.reload();
  }
}, { passive: true });
