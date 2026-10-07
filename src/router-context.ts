import { createContext, useContext } from 'react';

export const RouterContext = createContext<{
  path: string;
  /** Fragment without the leading '#', e.g. 'terminal' for /explore#terminal. */
  hash: string;
  navigate: (to: string) => void;
}>({ path: '/', hash: '', navigate: () => {} });

export const useRouter = () => useContext(RouterContext);
