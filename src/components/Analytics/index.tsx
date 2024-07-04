declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

window.dataLayer = [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(a: string, b: unknown) {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'G-C4M3GLCBKT');

export const Analytics: JSX.FC = () =>
  process.env.NODE_ENV === 'production'
    ? <script async src="https://www.googletagmanager.com/gtag/js?id=G-C4M3GLCBKT" />
    : null;
