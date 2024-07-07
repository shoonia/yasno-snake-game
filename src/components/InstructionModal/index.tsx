import { useRef } from 'jsx-dom-runtime';

import s from './styles.css';
import { LightningIcon } from './LightningIcon';

const ref = useRef<HTMLDialogElement>();

export const openInstructionModal = () =>
  ref.current.showModal();

export const InstructionModal: JSX.FC = () =>
  <dialog ref={ref} class={s.modal}>
    <h1>Опис</h1>
    <p>Гра змійка “Графік неймовірних відключень” - це як змійка у тетрісі була, тіки актуальніша.</p>
    <p>
      Збирай найдовшу змійку часу відключень  з <LightningIcon /> з надією, що реальна для твоєї хати буде коротшою.
    </p>
    <h2>Інструксьйон</h2>
    <h3>Коли:</h3>
    <ul>
      <li>Під час відключення</li>
      <li>В очікуванні відключення</li>
      <li>Коли промайнула будь-яка згадка чи думка про відключення</li>
      <li>Та будь-коли, про шо ми взагалі…</li>
    </ul>
    <h3>Як грати (це для зумерів та бумерів)</h3>
    <p>
      <strong>На компі:</strong> тицяй стрілочки для керування рухомим <LightningIcon />, щоб приєднатись до статичного <LightningIcon /> та зібрати найдовшу зміючку.
    </p>
    <p><strong>
      З мобілочки:</strong> по суті сейм, але замість стрілочок свайпай пальчиком в необхідний момент в необхідному напрямку.
    </p>
    <h3>Як не програти</h3>
    <p>Головне не врізатись в себе ж. Все, грай та не програвай на здоровля.</p>
    <form method="dialog">
      <button type="submit" class={s.close}>
        Закрити
      </button>
    </form>
  </dialog>;
