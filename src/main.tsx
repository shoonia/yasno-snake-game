import { jsx, useText } from 'jsx-dom-runtime';

import type { IState, IPoint } from './types';
import { Dir, Mode } from './types';
import { delay, randomInt } from './utils';
import { Icon } from './components/Icon';

const SIZE = 20;
const H = SIZE * 7;

const state: IState = {
  step: 0,
  stepMax: 7,
  scope: 0,
  mode: Mode.Easy,
  x: SIZE,
  y: SIZE,
  dirX: 0,
  dirY: 0,
  items: [],
  maxBodySize: 1,
  dir: Dir.Empty,
};

const [scope, setScope] = useText(state.scope);
const [textMode, setMode] = useText<Mode>(state.mode);

const canvas = jsx('canvas', {
  class: 'canvas',
  height: H,
});

const ctx = canvas.getContext('2d', {
  colorSpace: 'srgb',
  desynchronized: true,
  willReadFrequently: true,
})!;

const img = jsx('img', {
  src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="%23192f3e" viewBox="0 0 18 18"%3E%3Cpath d="M16.875 16.082 1.918 1.125l-.793.793 3.6 3.606-.787 3.347a.562.562 0 0 0 .562.692h2.717l-1.03 6.665a.563.563 0 0 0 .563.647.563.563 0 0 0 .444-.22l3.758-4.91 5.13 5.13.793-.793ZM12.673 9.49l1.834-2.397a.563.563 0 0 0 .062-.562.561.561 0 0 0-.507-.343h-2.671l.984-4.377a.563.563 0 0 0-.563-.686H6.189a.563.563 0 0 0-.563.433l-.169.732 7.217 7.2Z"/%3E%3C/svg%3E',
  width: SIZE,
  height: SIZE,
});

const bombImg = jsx('img', {
  src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none"%3E%3Cpath stroke="%23fff" stroke-width=".5" d="M12.25 6.322s.412-1.534 0-2.357c-.291-.582-.596-.888-1.179-1.179-.823-.411-2.357.59-2.946.59"/%3E%3Cpath fill="%233C3C3C" d="M9.893 6.322h4.714v2.357H9.893z"/%3E%3Cpath stroke="%23fff" stroke-width=".3" d="M9.893 8.679V6.322h4.714v2.357"/%3E%3Cpath fill="%233C3C3C" stroke="%23fff" stroke-width=".3" d="M20.35 15.75a8.1 8.1 0 1 1-16.2 0 8.1 8.1 0 0 1 16.2 0Z"/%3E%3Cpath fill="%233C3C3C" stroke="%23fff" stroke-width=".3" d="M20.35 15.75a8.1 8.1 0 1 1-16.2 0 8.1 8.1 0 0 1 16.2 0Z"/%3E%3Cpath stroke="%23222" d="M12.25 22.133c1.768 0 5.421-1.179 5.893-5.893"/%3E%3Cpath fill="url(%23a)" d="M9.536 3.464c-.405.881-1.254 1.205-2.22 1.115-.604-.056-1.411-.648-1.411-.648s.296-.017.583-.111l-.612-.756.914-.403c-.302-.435-.78-.817-.78-.817s.6.115 1.127.06l-.29-.956.92-.143c-.11-.226-.243-.4-.243-.4s.975.227 1.41.648c.699.674 1.007 1.529.602 2.41Z"/%3E%3Cpath stroke="%23ECBB00" stroke-width=".1" d="M6.488 3.82c.174-.058.346-.143.446-.27.47-.594-.925-1.706-.925-1.706s.601.115 1.128.06M6.488 3.82c-.287.094-.583.111-.583.111s.807.592 1.41.648c.967.09 1.816-.234 2.22-1.115.406-.882.098-1.737-.6-2.411-.436-.421-1.41-.648-1.41-.648s.132.174.242.4M6.488 3.82l-.612-.756.914-.403.347-.757m0 0c.373-.039.709-.162.769-.47.038-.196-.042-.432-.139-.629m-.63 1.1-.29-.957.92-.143"/%3E%3Cdefs%3E%3ClinearGradient id="a" x1="6.009" x2="9.536" y1="1.844" y2="3.464" gradientUnits="userSpaceOnUse"%3E%3Cstop stop-color="%23EBFF00"/%3E%3Cstop offset=".479" stop-color="%23EE5F00"/%3E%3Cstop offset="1" stop-color="%239B0000"/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E',
  width: SIZE,
  height: SIZE,
});

const food: IPoint = {
  x: randomInt(0, canvas.width / SIZE) * SIZE,
  y: randomInt(0, H / SIZE) * SIZE,
};

const bomb: IPoint = {
  x: -SIZE,
  y: -SIZE,
};

const ready = () => {
  const matches = window.matchMedia('(max-width: 650px)').matches;

  canvas.width = SIZE * (matches ? 18 : 24);
  ctx.fillRect(0, 0, canvas.width, H);

  restart();
};

const drawImage = (i: HTMLImageElement, p: IPoint) =>
  ctx.drawImage(i, p.x, p.y, SIZE, SIZE);

const gameLoop = async () => {
  await delay(25);
  requestAnimationFrame(gameLoop);

  if (++state.step < state.stepMax) {
    return;
  }

  state.step = 0;

  ctx.clearRect(0, 0, canvas.width, H);
  drawImage(img, food);
  drawSnake();

  if (state.mode === Mode.Hard) {
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, H);
    drawImage(bombImg, bomb);
  }
};

const setRandomFood = () => {
  food.x = randomInt(0, canvas.width / SIZE) * SIZE;
  food.y = randomInt(0, H / SIZE) * SIZE;

  drawImage(img, food);

  if (state.mode === Mode.Hard) {
    const chance = randomInt(1, 5) === 3;

    bomb.x = chance ? randomInt(0, canvas.width / SIZE) * SIZE : -SIZE;
    bomb.y = chance ? randomInt(0, H / SIZE) * SIZE : -SIZE;

    drawImage(bombImg, bomb);
  }
};

const audioPlay = (name: 'end' | 'turn' | 'hit' | 'add') => {
  console.log(name);
};

const restart =() => {
  state.stepMax = 6;
  state.scope = 0;
  state.dir = Dir.Empty;
  state.x = state.y = SIZE;
  state.dirX = state.dirY = 0;
  state.items = [];
  state.maxBodySize = 1;
  setScope(state.scope);
  setRandomFood();
};

const checkBorder = () => {
  if (state.x < 0) {
    state.x = canvas.width - SIZE;
  } else if (state.x >= canvas.width) {
    state.x = 0;
  }
  if (state.y < 0) {
    state.y = H - SIZE;
  } else if (state.y >= H) {
    state.y = 0;
  }
};

const withoutBorder = () => {
  if (state.x < 0 || state.y < 0 || state.x >= canvas.width || state.y >= H) {
    audioPlay('end');
    restart();
  }
};

const drawSnake = () => {
  state.x += state.dirX;
  state.y += state.dirY;

  if (state.mode === Mode.Easy) {
    checkBorder();
  } else if (state.mode === Mode.Hard) {
    withoutBorder();
  }

  state.items.unshift({ x: state.x, y: state.y });

  if (state.items.length > state.maxBodySize) {
    state.items.pop();
  }

  state.items.forEach((e, index) => {
    drawImage(img, e);

    if (e.x === food.x && e.y === food.y) {
      audioPlay('add');
      setRandomFood();
      setScope(++state.scope);
      state.stepMax = state.scope > 15 ? 5 : 6;
      state.maxBodySize++;
    }

    if (state.mode === Mode.Hard) {
      if (e.x === bomb.x && e.y === bomb.y) {
        if (state.scope >= 2) {
          audioPlay('hit');
          state.scope = Math.ceil(state.scope / 2);
          state.maxBodySize = state.scope + 1;
          for (let i = 0; i < state.maxBodySize; i++) {
            state.items.pop();
          }
          setScope(state.scope);
          setRandomFood();
        } else {
          audioPlay('end');
          restart();
        }
      }
    }

    for (let i = index + 1; i < state.items.length; i++) {
      const s = state.items[i];

      if (e.x === s.x && e.y === s.y) {
        audioPlay('end');
        restart();
      }
    }
  });
};

const turnUp = () => {
  if (state.dir !== Dir.Down) {
    audioPlay('turn');
    state.dir = Dir.Up;
    state.dirY = -SIZE;
    state.dirX = 0;
  }
};

const turnLeft = () => {
  if (state.dir !== Dir.Right) {
    audioPlay('turn');
    state.dir = Dir.Left;
    state.dirX = -SIZE;
    state.dirY = 0;
  }
};

const turnDown = () => {
  if (state.dir !== Dir.Up) {
    audioPlay('turn');
    state.dir = Dir.Down;
    state.dirY = SIZE;
    state.dirX = 0;
  }
};

const turnRight = () => {
  if (state.dir !== Dir.Left) {
    audioPlay('turn');
    state.dir = Dir.Right;
    state.dirX = SIZE;
    state.dirY = 0;
  }
};

const changeDifficulty: JSX.EventListener = () => {
  if (state.mode === Mode.Easy) {
    setMode(state.mode = Mode.Hard);
  } else {
    setMode(state.mode = Mode.Easy);
  }

  restart();
};

let x1: number | null, y1: number | null;

document.addEventListener('touchstart', (event) => {
  const touch = event.touches[0];
  x1 = touch.clientX;
  y1 = touch.clientY;
});

document.addEventListener('touchmove', (event) => {
  if (!x1 || !y1) {
    return false;
  }

  const x2 = event.touches[0].clientX;
  const y2 = event.touches[0].clientY;

  const xDiff = x2 - x1;
  const yDiff = y2 - y1;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    // swipe left or right
    xDiff > 0 ? turnRight() : turnLeft();
  } else {
    // swipe up or down
    yDiff < 0 ? turnUp() : turnDown();
  }

  x1 = null;
  y1 = null;
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

document.body.append(
  <div class="wrapper" ref={ready}>
    <header>
      <Icon />
    </header>
    <main>
      <ul>
        <li>Score: {scope}</li>
        <li>
          Difficulty: {textMode}
          <button type="button" on:click={changeDifficulty}>
            Change
          </button>
        </li>
      </ul>
      {canvas}
    </main>
    <footer>
    </footer>
  </div>,
);

window.addEventListener('resize', ready, { passive: true });
requestAnimationFrame(gameLoop);
turnRight();
