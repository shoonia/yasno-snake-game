import { _game, _row, _cell, _cell_g, _icon } from './style.css';
import { delay, from, randomInt } from '../../utils';
import { Dir, X, Y } from './consts';
import { Time } from './Time';

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

const state: IState = {
  x: 1,
  y: 1,
  dirX: 0,
  dirY: 0,
  size: 1,
  points: [],
  dir: Dir.Empty,
  food: {
    x: randomInt(X, [1]),
    y: randomInt(Y, [1]),
  },
};

const grid: HTMLDivElement[][] = [];

const start = () => {
  state.points.forEach(removePoint);
  state.points = [];
  state.dir = Dir.Empty;
  state.x = state.y = 1;
  state.dirX = state.dirY = 0;
  state.size = 1;
  randomFood(state);
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

const addPoint = (p: IPoint) => {
  grid[p.y]?.[p.x]?.classList.add(_icon);
};

const removePoint = (p?: IPoint) => {
  if (p) {
    grid[p.y]?.[p.x]?.classList.remove(_icon);
  }
};

const randomFood = (state: IState) => {
  removePoint(state.food);

  state.food = {
    x: randomInt(X, state.points.map((i) => i.x)),
    y: randomInt(Y, state.points.map((i) => i.y)),
  };

  addPoint(state.food);
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

  if (head.x === state.food.x && head.y === state.food.y) {
    state.size++;
    randomFood(state);
  } if (len > state.size) {
    removePoint(state.points.pop());
  }

  const isIntercepted = state.points.some((point) =>
    head !== point && head.x === point.x && head.y === point.y,
  );

  if (isIntercepted) {
    requestAnimationFrame(start);
  } else {
    addPoint(head);
  }
};

const gameLoop = async () => {
  await delay(250);
  requestAnimationFrame(gameLoop);
  drawSnake();
};

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

const cellClass: Generator<string, string> = (function* () {
  let i = 0;
  const matrix = [1, 1, 1, 1, 0, 0, 0, 0, 0];

  while (true) {
    yield matrix[i++ % matrix.length] ? _cell_g : _cell;
  }
})();

const ready = () => {
  start();
  turnRight();
  requestAnimationFrame(gameLoop);
};

export const Game: JSX.FC = () =>
  <article ref={ready} class={_game}>
    <Time />
    {from(Y, () => {
      const row: HTMLDivElement[] = [];

      grid.push(row);

      return (
        <div class={_row}>
          {from(X, () =>
            <div
              ref={(div) => row.push(div)}
              class={cellClass.next().value}
            />,
          )}
        </div>
      );
    })}
  </article>;
