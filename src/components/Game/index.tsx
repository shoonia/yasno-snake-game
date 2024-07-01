import s from './style.css';
import { delay, from } from '../../utils';
import { Size } from './consts';
import { Time } from './Time';
import { snake } from './snake';
import { view } from './view';

interface TouchEventListenerObject extends EventListenerObject {
  x: number;
  y: number
}

const drawFloatPoin = () => {
  view.remove(snake.float);
  snake.setFloat();
  view.add(snake.float);
};

const start = () => {
  view.bulkRemove(snake.points);
  snake.reset();
  drawFloatPoin();
};

const drawSnake = () => {
  const head = snake.next();
  const len = snake.points.unshift(head);

  if (snake.catched()) {
    snake.size++;
    drawFloatPoin();
  } if (len > snake.size) {
    view.remove(snake.points.pop()!);
  }

  if (snake.intercept()) {
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
  snake.right();
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
          if (diffX > 0) snake.right();
          else snake.left();
        } else {
          if (diffY > 0) snake.down();
          else snake.up();
        }
      }
    }
  },
};

document.addEventListener('touchstart', touchEventListener);
document.addEventListener('touchmove', touchEventListener, { passive: true });
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp': return snake.up();
    case 'KeyS':
    case 'ArrowDown': return snake.down();
    case 'KeyA':
    case 'ArrowLeft': return snake.left();
    case 'KeyD':
    case 'ArrowRight': return snake.right();
  }
});

export const Game: JSX.FC = () =>
  <article ref={ready} class={s.game}>
    <Time />
    {from(Size.Y, () => {
      const row: HTMLDivElement[] = [];

      view.grid.push(row);

      return (
        <div class={s.row}>
          {from(Size.X, () =>
            <div
              ref={(div) => row.push(div)}
              class={view.cellClass()}
            />,
          )}
        </div>
      );
    })}
  </article>;
