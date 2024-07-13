import s from './style.css';

import { from } from '../../utils';
import { board } from './board';

export const Time: JSX.FC = () =>
  <div class={s.row} role="presentation">
    {from(board.x, (i) =>
      <div class={s.cellt}>
        <span class={s.label}>
          {i > 9 ? i : '0' + i}:00
        </span>
      </div>,
    )}
  </div>;
