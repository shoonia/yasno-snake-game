import { _footer } from './styles.css';
import cba from './images/cba.svg';
import fp from './images/fp.svg';
import u24 from './images/u24.svg';

export const Footer: JSX.FC = () =>
  <footer class={_footer}>
    <a href="https://savelife.in.ua/donate/">
      <img src={cba} width="200" alt="Повернись Живим — фонд компетентної допомоги армії" />
    </a>
    <a href="https://prytulafoundation.org/donation">
      <img src={fp} height="100" alt="благодійний фонд Сергія Притули" />
    </a>
    <a href="https://u24.gov.ua/uk/donate">
      <img src={u24} width="200" alt="United24 - офіційна фандрейзингова платформа України" />
    </a>
  </footer>;
