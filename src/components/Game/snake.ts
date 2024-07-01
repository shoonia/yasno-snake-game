import { randomInt } from '../../utils';
import { Size } from './consts';

export interface IPoint {
  x: number;
  y: number;
}

interface ISnake {
  readonly points: IPoint[];
  float: IPoint;
  x: number;
  y: number;
  size: number;
  dir: Dir;
  dirX: number;
  dirY: number;
  up(): void;
  down(): void;
  left(): void;
  right(): void;
  reset(): void;
  next(): IPoint;
  setFloat(): void;
  intercept(p: IPoint): boolean;
  catched(p: IPoint): boolean;
}

const enum Dir {
  Empty = 0,
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4,
}

export const snake: ISnake = {
  x: 1,
  y: 1,
  size: 1,
  dir: Dir.Empty,
  dirX: 0,
  dirY: 0,
  points: [],
  float: { x: 0, y: 0 },

  up() {
    if (this.dir !== Dir.Down) {
      this.dir = Dir.Up;
      this.dirX = 0;
      this.dirY = -1;
    }
  },

  down() {
    if (this.dir !== Dir.Up) {
      this.dir = Dir.Down;
      this.dirX = 0;
      this.dirY = 1;
    }
  },

  left() {
    if (this.dir !== Dir.Right) {
      this.dir = Dir.Left;
      this.dirX = -1;
      this.dirY = 0;
    }
  },

  right() {
    if (this.dir !== Dir.Left) {
      this.dir = Dir.Right;
      this.dirX = 1;
      this.dirY = 0;
    }
  },

  reset() {
    this.points.length = this.dirX = this.dirY = 0;
    this.size = this.x = this.y = 1;
    this.dir = Dir.Empty;
  },

  next() {
    const x = this.x + this.dirX;
    const y = this.y + this.dirY;

    return {
      x: this.x = x < 0 ? Size.X - 1 : x >= Size.X ? 0 : x,
      y: this.y = y < 0 ? Size.Y - 1 : y >= Size.Y ? 0 : y,
    };
  },

  setFloat() {
    const positions = this.points.reduce<Set<number>>(
      (acc, i) => acc.add(i.x + i.y * Size.X),
      new Set(),
    );

    let x: number;
    let y: number;

    do {
      x = randomInt(Size.X);
      y = randomInt(Size.Y);
    } while (positions.has(x + y * Size.X));

    this.float = { x, y };
  },

  intercept(p) {
    for (let i = 3; i < this.points.length;) {
      const c = this.points[i++];

      if (p.x === c.x && p.y === c.y) {
        return true;
      }
    }

    return false;
  },

  catched(p) {
    return this.float.x === p.x && this.float.y === p.y;
  },
};
