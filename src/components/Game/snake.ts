import { randomInt } from '../../utils';
import { X, Y } from './consts';

export interface IPoint {
  x: number;
  y: number;
}

interface ISnake {
  readonly points: IPoint[];
  x: number;
  y: number;
  size: number;
  dir: Dir;
  dirX: number;
  dirY: number;
  turnUp(): void;
  turnDown(): void;
  turnLeft(): void;
  turnRight(): void;
  reset(): void;
  nextPoin(): IPoint;
  randomPoin(): IPoint;
}

const enum Dir {
  Empty = 0,
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4,
}

export const snake: ISnake = {
  x: 0,
  y: 0,
  size: 1,
  dir: Dir.Empty,
  dirX: 0,
  dirY: 0,
  points: [],

  turnUp() {
    if (this.dir !== Dir.Down) {
      this.dir = Dir.Up;
      this.dirX = 0;
      this.dirY = -1;
    }
  },

  turnDown() {
    if (this.dir !== Dir.Up) {
      this.dir = Dir.Down;
      this.dirX = 0;
      this.dirY = 1;
    }
  },

  turnLeft() {
    if (this.dir !== Dir.Right) {
      this.dir = Dir.Left;
      this.dirX = -1;
      this.dirY = 0;
    }
  },

  turnRight() {
    if (this.dir !== Dir.Left) {
      this.dir = Dir.Right;
      this.dirX = 1;
      this.dirY = 0;
    }
  },

  reset() {
    this.points.length = this.dirX = this.dirY = 0;
    this.x = this.y = this.size = 1;
  },

  nextPoin() {
    this.x += this.dirX;
    this.y += this.dirY;

    if (this.x < 0) {
      this.x = X - 1;
    } else if (this.x >= X) {
      this.x = 0;
    } else if (this.y < 0) {
      this.y = Y - 1;
    } else if (this.y >= Y) {
      this.y = 0;
    }

    return {
      x: this.x,
      y: this.y,
    };
  },

  randomPoin() {
    const positions = this.points.reduce<Set<number>>(
      (acc, i) => acc.add(i.x + i.y),
      new Set(),
    );

    let x: number;
    let y: number;

    do {
      x = randomInt(X);
      y = randomInt(Y);
    } while (positions.has(x + y));

    return { x, y };
  },
};
