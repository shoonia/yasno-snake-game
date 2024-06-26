import { _game, _row, _cell } from './style.css';
import { delay, randomInt } from '../../utils';
import { LightningIcon } from '../LightningIcon';

interface IPoint {
  x: number;
  y: number;
}

interface IState {
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  size: number;
  dir: Dir;
  points: IPoint[];
  food: IPoint;
}

const enum Dir {
  Empty = 0,
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4,
}

const Y = 7;
const X = 24;

const state: IState = {
  x: 1,
  y: 1,
  dirX: 0,
  dirY: 0,
  size: 1,
  points: [],
  dir: Dir.Empty,
  food: {
    x: randomInt(0, X),
    y: randomInt(0, Y),
  },
};

const grid: HTMLDivElement[][] = [];

const restart = () => {
  state.points.forEach(removePoint);
  state.points = [];
  state.dir = Dir.Empty;
  state.x = state.y = 1;
  state.dirX = state.dirY = 0;
  state.size = 1;
  randomFood(state.food);
};

const turnUp = () => {
  if (state.dir !== Dir.Down) {
    state.dir = Dir.Up;
    state.dirX = 0;
    state.dirY = -1;
  }
};

const turnLeft = () => {
  if (state.dir !== Dir.Right) {
    state.dir = Dir.Left;
    state.dirX = -1;
    state.dirY = 0;
  }
};

const turnDown = () => {
  if (state.dir !== Dir.Up) {
    state.dir = Dir.Down;
    state.dirX = 0;
    state.dirY = 1;
  }
};

const turnRight = () => {
  if (state.dir !== Dir.Left) {
    state.dir = Dir.Right;
    state.dirX = 1;
    state.dirY = 0;
  }
};

const addPoint = (point: IPoint) => {
  const div = grid[point.y]?.[point.x];

  if (div) {
    div.append(<LightningIcon />);
  }
};

const removePoint = (point?: IPoint) => {
  if (point) {
    const div = grid[point.y]?.[point.x];

    if (div) {
      div.innerHTML = '';
    }
  }
};

const randomFood = (f: IPoint) => {
  removePoint(f);

  f.x = randomInt(0, X);
  f.y = randomInt(0, Y);

  addPoint(f);
};

const drawSnake = () => {
  state.x += state.dirX;
  state.y += state.dirY;

  if (state.x < 0) {
    state.x = X - 1;
  } else if (state.x >= X) {
    state.x = 0;
  } else if (state.y < 0) {
    state.y = Y - 1;
  } else if (state.y >= Y) {
    state.y = 0;
  }

  const head: IPoint = {
    x: state.x,
    y: state.y,
  };

  const len = state.points.unshift(head);

  if (len > state.size) {
    removePoint(state.points.pop());
  }

  if (head.x === state.food.x && head.y === state.food.y) {
    state.size++;
    randomFood(state.food);
  }

  const isIntercepted = state.points.some((point) =>
    head !== point && head.x === point.x && head.y === point.y,
  );

  if (isIntercepted) {
    requestAnimationFrame(restart);
  } else {
    addPoint(head);
  }
};

const gameLoop = async () => {
  await delay(250);
  requestAnimationFrame(gameLoop);
  drawSnake();
};

const from = (length: number, cb: (_: unknown, i: number) => JSX.Element) =>
  Array.from<unknown, JSX.Element>({ length }, cb);

let x: number | null, y: number | null;

document.addEventListener('touchstart', (event) => {
  const touch = event.touches[0];
  x = touch.clientX;
  y = touch.clientY;
});

document.addEventListener('touchmove', (event) => {
  if (!x || !y) {
    return false;
  }

  const xDiff = event.touches[0].clientX - x;
  const yDiff = event.touches[0].clientY - y;

  x = y = null;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) turnRight();
    else turnLeft();
  } else {
    if (yDiff > 0) turnDown();
    else turnUp();
  }
});

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 87:
    case 38: return turnUp();
    case 65:
    case 37: return turnLeft();
    case 83:
    case 40: return turnDown();
    case 68:
    case 39: return turnRight();
  }
});

requestAnimationFrame(gameLoop);

export const Game: JSX.FC = () =>
  <article ref={restart} class={_game}>
    {from(Y, (_, y) => {
      const row: HTMLDivElement[] = [];

      grid.push(row);

      return (
        <div class={_row} data-y={y}>
          {from(X, (_, x) =>
            <div
              class={_cell}
              data-x={x}
              ref={(div) => row.push(div)}
            />,
          )}
        </div>
      );
    })}
  </article>;
