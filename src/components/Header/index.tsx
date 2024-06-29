import s from './styles.css';

import logo from './logo.svg';
import { Share } from '../Share';

export const Header: JSX.FC = () =>
  <header class={s.header}>
    <a href="./" aria-current="page">
      <img src={logo} width="100" alt="Шо не Yasno?" />
    </a>
    <Share />
  </header>;
