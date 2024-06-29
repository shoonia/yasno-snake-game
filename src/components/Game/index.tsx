import s from './style.css';
import { delay, from } from '../../utils';
import { X, Y } from './consts';
import { Time } from './Time';
import { snake, type IPoint } from './snake';
import { view } from './view';

interface TouchEventListenerObject extends EventListenerObject {
  x: number;
  y: number
}

let food: IPoint = {
  x: 0,
  y: 0,
};

const start = () => {
  view.bulkRemove(snake.points);
  snake.reset();
  randomFood();
};

const randomFood = () => {
  view.remove(food);
  food = snake.randomPoin();
  view.add(food);
};

const drawSnake = () => {
  const head = snake.nextPoin();
  const len = snake.points.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    snake.size++;
    randomFood();
  } if (len > snake.size) {
    view.remove(snake.points.pop()!);
  }

  if (snake.isIntercept(head)) {
    requestAnimationFrame(start);
  } else {
    view.add(head);
  }
};

const gameLoop = async () => {
  await delay(250);
  requestAnimationFrame(gameLoop);
  drawSnake();
};

const ready = () => {
  start();
  snake.turnRight();
  requestAnimationFrame(gameLoop);
};

const touchEventListener: TouchEventListenerObject = {
  x: -1,
  y: -1,

  handleEvent(event: TouchEvent) {
    const touch = event.touches[0];

    switch (event.type) {
      case 'touchstart': {
        this.x = touch.clientX;
        this.y = touch.clientY;
        return;
      }

      case 'touchmove': {
        if (this.x < 0 || this.y < 0) {
          return;
        }

        const diffX = touch.clientX - this.x;
        const diffY = touch.clientY - this.y;

        this.x = this.y = -1;

        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) snake.turnRight();
          else snake.turnLeft();
        } else {
          if (diffY > 0) snake.turnDown();
          else snake.turnUp();
        }
      }
    }
  },
};

document.addEventListener('touchstart', touchEventListener);
document.addEventListener('touchmove', touchEventListener);
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp': return snake.turnUp();
    case 'KeyS':
    case 'ArrowDown': return snake.turnDown();
    case 'KeyA':
    case 'ArrowLeft': return snake.turnLeft();
    case 'KeyD':
    case 'ArrowRight': return snake.turnRight();
  }
});

export const Game: JSX.FC = () =>
  <article ref={ready} class={s.game}>
    <Time />
    {from(Y, () => {
      const row: HTMLDivElement[] = [];

      view.grid.push(row);

      return (
        <div class={s.row}>
          {from(X, () =>
            <div
              ref={(div) => row.push(div)}
              class={view.cellClass()}
            />,
          )}
        </div>
      );
    })}
  </article>;
