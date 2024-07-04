import { useText } from 'jsx-dom-runtime';

import s from './styles.css';
import m from '../../../static/manifest.json';

const [text, setText] = useText('');

export const Share: JSX.FC = () => {
  const copy: JSX.EventListener = () => {
    if (navigator.share) {
      navigator.share({
        url: m.scope,
        text: m.description,
        title: m.name,
      });
    } else {
      navigator.clipboard?.writeText(m.scope);
      setText('скопійовано до буфера обміну');
      setTimeout(setText, 3000, '');
    }
  };

  return (
    <div class={s.box}>
      <button class={s.btn} on:click={copy} type="button" aria-label="поділитися">
        <svg width="1.4em" height="1.4em" viewBox="0 0 459 459" fill="currentcolor">
          <path d="M339.588 314.529a71.683 71.683 0 0 0-38.621 11.239l-112.682-78.67a72.036 72.036 0 0 0 2.798-19.871c0-6.896-.989-13.557-2.798-19.871l109.64-76.547c11.764 8.356 26.133 13.286 41.662 13.286 39.79 0 72.047-32.257 72.047-72.047S379.378 0 339.588 0c-39.79 0-72.047 32.257-72.047 72.047 0 5.255.578 10.373 1.646 15.308l-112.424 78.491c-10.974-6.759-23.892-10.666-37.727-10.666-39.79 0-72.047 32.257-72.047 72.047s32.256 72.047 72.047 72.047c13.834 0 26.753-3.907 37.727-10.666l113.292 79.097a72.108 72.108 0 0 0-2.514 18.872c0 39.79 32.257 72.047 72.047 72.047s72.047-32.257 72.047-72.047-32.257-72.048-72.047-72.048z"/>
        </svg>
      </button>
      <span class={s.popup} role="status">
        {text}
      </span>
    </div>
  );
};
