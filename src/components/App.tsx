import { Header } from './Header';
import { Main } from './Main';
import { Game } from './Game';
import { Footer } from './Footer';

export const App: JSX.FC = () =>
  <>
    <Header />
    <Main>
      <Game />
    </Main>
    <Footer />
  </>;
