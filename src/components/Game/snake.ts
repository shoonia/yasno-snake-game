import { from } from '../../utils';
import { Size } from './consts';

export interface IPoint {
  x: number;
  y: number;
  isFloat?: true,
}

interface ISnake {
  readonly points: IPoint[];
  readonly orders: number[];
  float: IPoint;
  x: number;
  y: number;
  size: number;
  dir: Dir;
  nextDir: Dir,
  dirX: number;
  dirY: number;
  active: boolean;
  up(): void;
  down(): void;
  left(): void;
  right(): void;
  reset(): void;
  next(): IPoint;
  setFloat(): void;
  intercept(): boolean;
  catched(): boolean;
}

const enum Dir {
  Empty,
  Up,
  Down,
  Left,
  Right,
}

export const snake: ISnake = {
  points: [],
  orders: from(Size.X * Size.Y, (i) => i),
  float: { x: 0, y: 0, isFloat: true },
  x: 1,
  y: 1,
  size: 1,
  dir: Dir.Empty,
  nextDir: Dir.Empty,
  dirX: 0,
  dirY: 0,
  active: true,

  up() {
    if (this.active && this.dir !== Dir.Down) {
      this.nextDir = Dir.Up;
      this.dirX = 0;
      this.dirY = -1;
    }
  },

  down() {
    if (this.active && this.dir !== Dir.Up) {
      this.nextDir = Dir.Down;
      this.dirX = 0;
      this.dirY = 1;
    }
  },

  left() {
    if (this.active && this.dir !== Dir.Right) {
      this.nextDir = Dir.Left;
      this.dirX = -1;
      this.dirY = 0;
    }
  },

  right() {
    if (this.active && this.dir !== Dir.Left) {
      this.nextDir = Dir.Right;
      this.dirX = 1;
      this.dirY = 0;
    }
  },

  reset() {
    this.points.length = this.dirX = this.dirY = 0;
    this.size = this.x = this.y = 1;
    this.nextDir = this.dir = Dir.Empty;
    this.active = true;
  },

  next() {
    const nx = this.x + this.dirX;
    const ny = this.y + this.dirY;

    this.dir = this.nextDir;

    return {
      x: (this.x = nx < 0 ? Size.X - 1 : nx >= Size.X ? 0 : nx),
      y: (this.y = ny < 0 ? Size.Y - 1 : ny >= Size.Y ? 0 : ny),
    };
  },

  setFloat() {
    const positions = this.points.reduce<Set<number>>(
      (acc, i) => acc.add(i.x + i.y * Size.X),
      new Set(),
    );

    const orders = this.orders.filter((i) => !positions.has(i));
    const i = orders[Math.floor(Math.random() * orders.length)];
    const y = Math.floor(i / Size.X);

    this.float = {
      x: i < Size.X ? i : i - (y * Size.X),
      y,
      isFloat: true,
    };
  },

  intercept() {
    for (let i = 4; i < this.points.length;) {
      const p = this.points[i++];

      if (this.x === p.x && this.y === p.y) {
        return true;
      }
    }

    return false;
  },

  catched() {
    return this.float.x === this.x && this.float.y === this.y;
  },
};
