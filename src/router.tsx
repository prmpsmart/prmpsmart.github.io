import { AnchorHTMLAttributes, MouseEvent, useEffect, useState } from 'react';
import { RouterContext, useRouter } from './router-context';

// A tiny pushState router. GitHub Pages serves a copy of index.html at every
// route (see the `spaRoutes` plugin in vite.config.ts), so clean URLs work.

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
const currentHash = () => window.location.hash.slice(1);

export function Router({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(normalize(window.location.pathname));
  const [hash, setHash] = useState(currentHash());

  useEffect(() => {
    const onPop = () => {
      setPath(normalize(window.location.pathname));
      setHash(currentHash());
    };
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onPop);
    };
  }, []);

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin);
    const nextPath = normalize(url.pathname);
    const nextHash = url.hash.slice(1);
    if (nextPath === path && nextHash === hash) return;
    window.history.pushState({}, '', url.pathname + url.hash);
    setPath(nextPath);
    setHash(nextHash);
    if (nextPath !== path)
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <RouterContext.Provider value={{ path, hash, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Link({
  href,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { navigate } = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button)
      return;
    e.preventDefault();
    navigate(href);
  };
  return <a href={href} onClick={handle} {...rest} />;
}
