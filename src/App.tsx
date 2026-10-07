import { useEffect } from 'react';
import CONFIG from '../portfolio.config';
import Layout from './Layout';
import { NAV } from './nav';
import { Link } from './router';
import { useRouter } from './router-context';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Publications from './pages/Publications';

const PAGES: Record<string, () => JSX.Element> = {
  '/': Home,
  '/about': About,
  '/portfolio': Portfolio,
  '/skills': Skills,
  '/experience': Experience,
  '/contact': Contact,
  '/publications': Publications,
};

function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-4xl font-semibold text-forest-text">
        Page not found
      </h1>
      <Link href="/" className="btn-primary">
        Back home
      </Link>
    </div>
  );
}

export default function App() {
  const { path } = useRouter();
  const Page = PAGES[path] ?? NotFound;
  const label = NAV.find((n) => n.href === path)?.label;
  useEffect(() => {
    document.title =
      label && path !== '/'
        ? `${label} · ${CONFIG.seo.title}`
        : CONFIG.seo.title;
  }, [path, label]);
  return (
    <Layout>
      <Page />
    </Layout>
  );
}
