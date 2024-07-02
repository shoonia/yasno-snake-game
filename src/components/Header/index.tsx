import s from './styles.css';

import logo from './logo.svg';
import { Share } from '../Share';
import { scope } from './scope';

export const Header: JSX.FC = () =>
  <header class={s.header}>
    <a href="./" aria-current="page">
      <img src={logo} width="100" alt="Шо не Yasno?" />
    </a>
    <div class={s.bar}>
      <span class={s.item} aria-label="результат">
        {scope}
      </span>
      <Share />
    </div>
  </header>;
