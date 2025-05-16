import s from './App.css';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PauseModal } from './PauseModal';
import { InstructionModal } from './InstructionModal';

export const App: JSX.FC = () =>
  <div class={s.app}>
    <Header />
    <Main />
    <Footer />
    <InstructionModal />
    <PauseModal />
  </div>;
