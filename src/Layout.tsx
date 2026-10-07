import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMenu, FiX } from 'react-icons/fi';
import CONFIG from '../portfolio.config';
import { Link } from './router';
import { useRouter } from './router-context';
import { NAV } from './nav';
import { backgroundImage, photo } from './lib';
import NetworkBackground from './components/NetworkBackground';

function HeaderCta() {
  const { meetingUrl } = CONFIG.profile;
  const cls =
    'rounded-full bg-forest-warm px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#45474B] transition hover:brightness-105';
  return meetingUrl ? (
    <a href={meetingUrl} target="_blank" rel="noreferrer" className={cls}>
      Schedule a meeting
    </a>
  ) : (
    <Link href="/contact" className={cls}>
      Hire me
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { path } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMenuOpen(false), [path]);

  return (
    <section className="relative min-h-screen w-full bg-forest-bg">
      {/* Fixed photo background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-forest-bg/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#69847433,transparent_60%)]" />
        <NetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-bg/[0.02] via-transparent to-forest-bg/[0.04]" />
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-[1000] hidden h-[100dvh] w-[14rem] flex-col overflow-y-auto overflow-x-hidden border-r border-[#B6C7AA30] bg-forest-sidebar/90 backdrop-blur-md md:flex">
        <div className="flex min-h-full flex-col">
          <Link
            href="/"
            className="relative block shrink-0 overflow-hidden border-b border-forest-elevated"
          >
            <img
              src={photo}
              alt={CONFIG.profile.name}
              className="h-44 w-full object-cover"
            />
            <span className="block bg-forest-sidebar px-4 py-3 font-display text-sm font-semibold tracking-wide text-forest-text">
              {CONFIG.profile.name}
            </span>
          </Link>
          <nav className="flex w-full flex-col">
            {NAV.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`block p-4 py-6 font-display text-sm uppercase tracking-wider transition-all duration-300 ${
                    path === item.href
                      ? 'bg-forest-deep text-forest-warm hover:bg-[#405247]'
                      : 'bg-transparent text-forest-text hover:bg-forest-elevated'
                  }`}
                >
                  {item.label}
                </Link>
                <div className="h-px w-full bg-forest-elevated" />
              </div>
            ))}
          </nav>
          <div className="mt-auto grid h-16 shrink-0 grid-cols-[1fr_1px_1fr] border-t border-forest-elevated">
            <a
              href={CONFIG.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center text-forest-text transition hover:text-forest-warm"
            >
              <FiLinkedin size={20} />
            </a>
            <div className="h-full w-px bg-forest-elevated" />
            <a
              href={CONFIG.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center text-forest-text transition hover:text-forest-warm"
            >
              <FiGithub size={20} />
            </a>
          </div>
        </div>
      </aside>

      {/* Top bar */}
      <header className="fixed right-0 top-0 z-[60] w-full md:left-[14rem] md:w-auto">
        <nav className="relative flex w-full flex-col">
          <div className="flex h-16 w-full items-center justify-between gap-3 border-b border-[#F6E6CB33] bg-forest-bg/85 px-4 backdrop-blur-md md:justify-end">
            <Link
              href="/"
              className="font-display text-sm font-semibold tracking-wide text-forest-text md:hidden"
            >
              {CONFIG.profile.name}
            </Link>
            <div className="flex items-center gap-3">
              <HeaderCta />
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="flex h-11 w-11 items-center justify-center bg-forest-warm text-[#45474B] md:hidden"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
          <div
            className={`absolute left-0 top-16 z-20 w-full border-b border-[#F6E6CB33] bg-forest-bg/95 backdrop-blur-md transition-all duration-300 md:hidden ${
              menuOpen
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none -translate-y-full opacity-0'
            }`}
          >
            <ul className="flex w-full flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block w-full px-4 py-3 font-display text-sm tracking-wider transition ${
                      path === item.href
                        ? 'bg-forest-deep text-forest-warm'
                        : 'text-forest-text hover:bg-[#69847499]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <div className="relative z-10 flex min-h-screen w-full flex-col pt-16 md:pl-[14rem]">
        <main
          key={path}
          className="page-enter relative z-10 min-h-[70vh] w-full max-w-full overflow-x-hidden"
        >
          {children}
        </main>
        <footer className="relative z-10 border-t border-[#B6C7AA30] px-5 py-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-forest-muted/80 md:px-10">
          © {new Date().getFullYear()} {CONFIG.profile.name} · @
          {CONFIG.profile.handle}
        </footer>
      </div>
    </section>
  );
}

/** Shared page heading: eyebrow, title, and lede. */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-forest-text">
        {title}
      </h1>
      {children && (
        <p className="mt-3 max-w-2xl text-forest-muted">{children}</p>
      )}
    </div>
  );
}

/** Rounded filter chips used on Portfolio and Skills. */
export function FilterChips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            value === o
              ? 'bg-forest-muted text-forest-bg'
              : 'glass text-forest-text hover:bg-[var(--glass-strong)]'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
