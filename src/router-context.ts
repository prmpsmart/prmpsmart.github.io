import { createContext, useContext } from 'react';

export const RouterContext = createContext<{
  path: string;
  navigate: (to: string) => void;
}>({ path: '/', navigate: () => {} });

export const useRouter = () => useContext(RouterContext);
