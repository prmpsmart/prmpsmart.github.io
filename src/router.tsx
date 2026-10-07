import { AnchorHTMLAttributes, MouseEvent, useEffect, useState } from 'react';
import { RouterContext, useRouter } from './router-context';

// A tiny pushState router. GitHub Pages serves a copy of index.html at every
// route (see the `spaRoutes` plugin in vite.config.ts), so clean URLs work.

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

export function Router({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(normalize(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to: string) => {
    if (to === path) return;
    window.history.pushState({}, '', to);
    setPath(normalize(to));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
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
