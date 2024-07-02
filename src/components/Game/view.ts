import s from './style.css';
import type { IPoint } from './snake';

interface IView {
  readonly grid: HTMLElement[][];
  cellClass(): string;
  add(p: IPoint): void;
  remove(p: IPoint): void
  bulkRemove(ps: IPoint[]): void
}

const generator = () => {
  let i = 0;
  const matrix = [1, 1, 1, 1, 0, 0, 0, 0, 0];

  return (): string => matrix[i++ % matrix.length] ? s.cellg : s.cell;
};

export const view: IView = {
  grid: [],
  cellClass: generator(),

  add(p) {
    this.grid[p.y][p.x].classList.add(p.isFloat ? s.float : s.point);
  },

  remove(p) {
    this.grid[p.y][p.x].classList.remove(s.point, s.float);
  },

  bulkRemove(ps) {
    for (const p of ps) this.remove(p);
  },
};
