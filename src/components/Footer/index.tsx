import { _box, _auth } from './styles.css';
import cba from './images/cba.svg';
import fp from './images/fp.svg';
import u24 from './images/u24.svg';

export const Footer: JSX.FC = () =>
  <footer>
    <div class={_box}>
      <a href="https://savelife.in.ua/donate/">
        <img src={cba} width="100" alt="Повернись Живим — фонд компетентної допомоги армії" />
      </a>
      <a href="https://prytulafoundation.org/donation">
        <img src={fp} height="50" alt="благодійний фонд Сергія Притули" />
      </a>
      <a href="https://u24.gov.ua/uk/donate">
        <img src={u24} width="100" alt="United24 - офіційна фандрейзингова платформа України" />
      </a>
    </div>
    <div class={_auth}>
      <time dateTime="2024">2024 </time>
      <a href="https://x.com/_shoonia" target="_blank" rel="me">
        @_shoonia
      </a>
    </div>
  </footer>;
