import s from './styles.css';
import { Game } from '../Game';

export const Main: JSX.FC = () =>
  <main class={s.wrapper}>
    <div class={s.box}>
      <h1 class={s.title}>
        Графік неймовірних відключень
      </h1>
      <p>Ви не просили, а я зробив</p>
      <Game />
    </div>
  </main>;
