import { _game, _row, _cell, _cell_g, _icon } from './style.css';
import { delay, from } from '../../utils';
import { X, Y } from './consts';
import { Time } from './Time';
import { snake, type IPoint } from './snake';

interface IState {
  food: IPoint;
}

const state: IState = {
  food: { x: 0, y: 0 },
};

const grid: HTMLDivElement[][] = [];

const start = () => {
  snake.points.forEach(removePoint);
  snake.reset();
  randomFood(state);
};

const addPoint = (p: IPoint) => {
  grid[p.y]?.[p.x]?.classList.add(_icon);
};

const removePoint = (p: IPoint) => {
  grid[p.y]?.[p.x]?.classList.remove(_icon);
};

const randomFood = (state: IState) => {
  removePoint(state.food);
  state.food = snake.randomPoin();
  addPoint(state.food);
};

const drawSnake = () => {
  const head = snake.nextPoin();
  const len = snake.points.unshift(head);

  if (head.x === state.food.x && head.y === state.food.y) {
    snake.size++;
    randomFood(state);
  } if (len > snake.size) {
    removePoint(snake.points.pop()!);
  }

  const intercepted = snake.points.some((p) =>
    head !== p && head.x === p.x && head.y === p.y,
  );

  if (intercepted) {
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
    if (xDiff > 0) snake.turnRight();
    else snake.turnLeft();
  } else {
    if (yDiff > 0) snake.turnDown();
    else snake.turnUp();
  }
});

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 87:
    case 38: return snake.turnUp();
    case 65:
    case 37: return snake.turnLeft();
    case 83:
    case 40: return snake.turnDown();
    case 68:
    case 39: return snake.turnRight();
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
  snake.turnRight();
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
