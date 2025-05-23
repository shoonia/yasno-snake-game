import s from './style.css';
import { from } from '../../utils';
import { board } from './board';
import { Time } from './Time';
import { Snake } from './snake';
import { view } from './view';
import { setScope } from '../Header/scope';
import { tooglePauseModal } from '../PauseModal';

interface TouchEventListenerObject extends EventListenerObject {
  x: number;
  y: number;
}

const snake = new Snake(board);

const drawFloatPoin = () => {
  view.remove(snake.float);
  snake.setFloat();
  view.add(snake.float);
};


const drawSnake = () => {
  if (snake.active) {
    const head = snake.next();
    const len = snake.points.unshift(head);

    if (snake.catched()) {
      snake.size++;
      setScope(snake.size - 1);
      drawFloatPoin();
    } if (len > snake.size) {
      view.remove(snake.points.pop()!);
    }

    if (snake.intercept()) {
      view.bulkRemove(snake.points);
      snake.reset();
      drawFloatPoin();
    } else {
      view.add(head);
    }
  }
};

const gameLoop = () =>
  setTimeout(() => {
    drawSnake();
    requestAnimationFrame(gameLoop);
  }, 250);

const ready = () => {
  drawFloatPoin();
  snake.right();
  gameLoop();
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
    case 'ArrowUp': snake.up(); break;
    case 'KeyS':
    case 'ArrowDown': snake.down(); break;
    case 'KeyA':
    case 'ArrowLeft': snake.left(); break;
    case 'KeyD':
    case 'ArrowRight': snake.right(); break;
    case 'Pause':
    case 'Escape':
    case 'Backspace':
    case 'Space': tooglePauseModal(snake.active = !snake.active); break;
    default:
      return;
  }

  event.preventDefault();
  event.stopPropagation();
});

export const Game: JSX.FC = () =>
  <article ref={ready} class={s.game}>
    <Time />
    {from(board.y, () => {
      const row: HTMLDivElement[] = [];

      view.grid.push(row);

      return (
        <div class={s.row}>
          {from(board.x, () =>
            <div
              ref={(div) => row.push(div)}
              class={view.cellClass()}
            />,
          )}
        </div>
      );
    })}
  </article>;
