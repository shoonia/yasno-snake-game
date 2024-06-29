import s from './style.css';

import { from } from '../../utils';
import { Size } from './consts';

export const Time: JSX.FC = () =>
  <div class={s.row}>
    {from(Size.X, (_, i) =>
      <div class={s.cellt}>
        <span class={s.label}>
          {i > 9 ? i : '0' + i}:00
        </span>
      </div>,
    )}
  </div>;
