import s from './styles.css';
import { Game } from '../Game';
import { openInstructionModal } from '../InstructionModal';

const click: JSX.EventListener = (event) => {
  event.preventDefault();
  openInstructionModal();
};

export const Main: JSX.FC = () =>
  <main class={s.wrapper}>
    <div class={s.box}>
      <h1>
        Графік неймовірних відключень
      </h1>
      <p>
        Ви не просили, а я зробив. <a href="#" on:click={click}>Опис</a>
      </p>
      <Game />
    </div>
  </main>;
