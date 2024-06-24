export const enum Mode {
  Easy = 'Easy',
  Hard = 'Hard',
}

export const enum Dir {
  Empty = 0,
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4,
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IState {
  step: number;
  stepMax: number;
  scope: number;
  mode: Mode;
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  maxBodySize: number;
  items: IPoint[];
  dir: Dir;
}
