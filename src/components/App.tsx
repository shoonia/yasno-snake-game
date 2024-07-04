import s from './App.css';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { Analytics } from './Analytics';

export const App: JSX.FC = () =>
  <>
    <div class={s.app}>
      <Header />
      <Main />
      <Footer />
    </div>
    <Analytics />
  </>;
