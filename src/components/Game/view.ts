import { _icon } from './style.css';
import type { IPoint } from './snake';

interface IView {
  readonly grid: HTMLElement[][];
  add(p: IPoint): void;
  remove(p: IPoint): void
  bulkRemove(ps: IPoint[]): void
}

export const view: IView = {
  grid: [],

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
