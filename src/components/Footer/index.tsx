import { _footer } from './styles.css';
import { IconCBA } from '../IconCBA';
import { IconFP } from '../IconFP';

export const Footer: JSX.FC = () =>
  <footer class={_footer}>
    <a href="https://savelife.in.ua/donate/">
      <IconCBA />
    </a>
    <a href="https://prytulafoundation.org/donation">
      <IconFP />
    </a>
  </footer>;
