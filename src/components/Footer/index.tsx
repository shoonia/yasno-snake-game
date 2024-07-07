import s from './styles.css';
import cba from '../../images/cba.svg';
import fp from '../../images/fp.svg';
import u24 from '../../images/u24.svg';

export const Footer: JSX.FC = () =>
  <footer>
    <ul class={s.list}>
      <li>
        <a href="https://savelife.in.ua/donate/">
          <img src={cba} width="90" alt="Повернись Живим — фонд компетентної допомоги армії" />
        </a>
      </li>
      <li>
        <a href="https://prytulafoundation.org/donation">
          <img src={fp} width="45" alt="благодійний фонд Сергія Притули" />
        </a>
      </li>
      <li>
        <a href="https://u24.gov.ua/uk/donate">
          <img src={u24} width="90" alt="United24 - офіційна фандрейзингова платформа України" />
        </a>
      </li>
    </ul>
    <div class={s.auth}>
      <time dateTime="2024">2024 </time>
      <a href="https://x.com/_shoonia" target="_blank" rel="me">
        @_shoonia
      </a>
    </div>
  </footer>;
