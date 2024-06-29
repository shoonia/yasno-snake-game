import s from './style.css';

import { from } from '../../utils';
import { X } from './consts';

export const Time: JSX.FC = () =>
  <div class={s.row}>
    {from(X, (_, i) =>
      <div class={s.time}>
        {i > 9 ? i : '0' + i}:00
      </div>,
    )}
  </div>;
