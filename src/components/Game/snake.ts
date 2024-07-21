import type { IBoard } from './board';
import { from } from '../../utils';

export interface IPoint {
  readonly x: number;
  readonly y: number;
  readonly float?: true,
}

const enum Dir {
  Empty,
  Up,
  Down,
  Left,
  Right,
}

export class Snake {
  readonly points: IPoint[] = [];
  readonly #orders: number[];
  readonly #board: IBoard;

  float: IPoint = { x: 0, y: 0, float: true };
  size = 1;
  active = true;

  #x = 1;
  #y = 1;
  #dir = Dir.Empty;
  #nextDir = Dir.Empty;
  #dirX = 0;
  #dirY = 0;

  constructor(board: IBoard) {
    this.#board = board;
    this.#orders = from(board.x * board.y, (i) => i);
  }

  up(): void {
    if (this.active && this.#dir !== Dir.Down) {
      this.#nextDir = Dir.Up;
      this.#dirX = 0;
      this.#dirY = -1;
    }
  }

  down(): void {
    if (this.active && this.#dir !== Dir.Up) {
      this.#nextDir = Dir.Down;
      this.#dirX = 0;
      this.#dirY = 1;
    }
  }

  left(): void {
    if (this.active && this.#dir !== Dir.Right) {
      this.#nextDir = Dir.Left;
      this.#dirX = -1;
      this.#dirY = 0;
    }
  }

  right(): void {
    if (this.active && this.#dir !== Dir.Left) {
      this.#nextDir = Dir.Right;
      this.#dirX = 1;
      this.#dirY = 0;
    }
  }

  reset(): void {
    this.points.length = this.#dirX = this.#dirY = 0;
    this.size = this.#x = this.#y = 1;
    this.#nextDir = this.#dir = Dir.Empty;
    this.active = true;
  }

  next(): IPoint {
    const nx = this.#x + this.#dirX;
    const ny = this.#y + this.#dirY;
    const b = this.#board;

    this.#dir = this.#nextDir;

    return {
      x: (this.#x = nx < 0 ? b.x - 1 : nx >= b.x ? 0 : nx),
      y: (this.#y = ny < 0 ? b.y - 1 : ny >= b.y ? 0 : ny),
    };
  }

  setFloat(): void {
    const b = this.#board;
    const positions = this.points.reduce<Set<number>>(
      (acc, i) => acc.add(i.x + i.y * b.x),
      new Set(),
    );

    const orders = this.#orders.filter((i) => !positions.has(i));
    const i = orders[Math.floor(Math.random() * orders.length)];
    const y = Math.floor(i / b.x);

    this.float = {
      x: i < b.x ? i : i - (y * b.x),
      y,
      float: true,
    };
  }

  intercept(): boolean {
    for (let i = 4; i < this.points.length;) {
      const p = this.points[i++];

      if (this.#x === p.x && this.#y === p.y) {
        return true;
      }
    }

    return false;
  }

  catched(): boolean {
    return this.float.x === this.#x && this.float.y === this.#y;
  }
}
