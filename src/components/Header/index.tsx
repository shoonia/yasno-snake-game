import s from './styles.css';

import logo from '../../images/logo.svg';
import blackout from '../../images/blackout.png';
import { Share } from '../Share';
import { scope } from './scope';

export const Header: JSX.FC = () =>
  <header class={s.header}>
    <a href="./" aria-current="page">
      <img src={logo} width="100" alt="Шо не Yasno?" />
    </a>
    <div class={s.bar}>
      <div class={s.item}>
        <img src={blackout} alt="перекреслена молнія" width="28" height="28" />
        <span aria-label="результат">
          {scope}
        </span>
      </div>
      <Share />
    </div>
  </header>;
