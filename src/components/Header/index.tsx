import { _header } from './styles.css';

import logo from './logo.svg';

export const Header: JSX.FC = () =>
  <header class={_header}>
    <a href="./" aria-current="page">
      <img src={logo} width="100" alt="Шо не Yasno?" />
    </a>
  </header>;
