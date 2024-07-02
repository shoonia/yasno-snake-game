import { useText } from 'jsx-dom-runtime';

const [scope, setScope] = useText<number>(0);

export { scope, setScope };
