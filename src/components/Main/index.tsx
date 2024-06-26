import { _box } from './styles.css';

export const Main: JSX.FC = (props) =>
  <main class={_box}>
    {props.children}
  </main>;
