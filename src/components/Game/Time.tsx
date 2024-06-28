import { _row, _time } from './style.css';

import { from } from '../../utils';
import { X } from './consts';

export const Time: JSX.FC = () =>
  <div class={_row}>
    {from(X, (_, i) =>
      <div class={_time}>
        {i > 9 ? i : '0' + i}:00
      </div>,
    )}
  </div>;
