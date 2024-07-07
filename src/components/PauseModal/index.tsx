import { useRef } from 'jsx-dom-runtime';

import s from './styles.css';

const ref = useRef<HTMLDialogElement>();

export const tooglePauseModal = (open: boolean) => {
  if (open) {
    ref.current?.close();
  } else {
    ref.current?.showModal();
  }
};

export const PauseModal: JSX.FC = () =>
  <dialog ref={ref} class={s.modal}>
    <p>
      Пауза. Натисніть клавішу <kbd>пробіл</kbd> для продовження ігри
    </p>
  </dialog>;
