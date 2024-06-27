import { Game } from '../Game';
import { _box, _title } from './styles.css';

export const Main: JSX.FC = () =>
  <main class={_box}>
    <h1 class={_title}>
      Графік неймовірних відключень
    </h1>
    <p>Ви не просили, а я зробив</p>
    <Game />
  </main>;
