import { _icon, _cell_g, _cell } from './style.css';
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

  return (): string => matrix[i++ % matrix.length] ? _cell_g : _cell;
};

export const view: IView = {
  grid: [],
  cellClass: generator(),

  add(p) {
    this.grid[p.y]?.[p.x]?.classList.add(_icon);
  },

  remove(p) {
    this.grid[p.y]?.[p.x]?.classList.remove(_icon);
  },

  bulkRemove(ps) {
    ps.forEach((p) => this.remove(p));
  },
};
