import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FiArrowRight,
  FiCompass,
  FiCopy,
  FiDownload,
  FiExternalLink,
  FiGlobe,
  FiSearch,
  FiZap,
} from 'react-icons/fi';
import CONFIG from '../../portfolio.config';
import { NAV } from '../nav';
import { STOPS } from '../adventure/stops';
import { useRouter } from '../router-context';
import { useSettings } from '../settings-context';

interface Action {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
}

export default function CommandPalette() {
  const { navigate } = useRouter();
  const { paletteOpen, setPaletteOpen, lang, setLang, effects, setEffects, t } =
    useSettings();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = () => setPaletteOpen(false);
  const go = (to: string) => () => {
    navigate(to);
    close();
  };

  const actions = useMemo<Action[]>(
    () => [
      ...NAV.map((n) => ({
        id: `page-${n.href}`,
        group: t('Pages', 'Páginas'),
        label: n.label,
        hint: n.href,
        icon: <FiArrowRight />,
        run: go(n.href),
      })),
      ...STOPS.map((s, i) => ({
        id: `stop-${s.id}`,
        group: t('Adventure', 'Aventura'),
        label: `${String(i + 1).padStart(2, '0')} · ${t(s.title, s.titleEs)}`,
        hint: `/explore#${s.id}`,
        icon: <FiCompass />,
        run: go(`/explore#${s.id}`),
      })),
      ...CONFIG.projects.map((p) => ({
        id: `project-${p.title}`,
        group: t('Projects', 'Proyectos'),
        label: p.title,
        hint: p.category,
        icon: <FiExternalLink />,
        run: () => {
          window.open(p.link, '_blank', 'noopener');
          close();
        },
      })),
      {
        id: 'lang',
        group: t('Actions', 'Acciones'),
        label: lang === 'en' ? 'Cambiar a español' : 'Switch to English',
        icon: <FiGlobe />,
        run: () => setLang(lang === 'en' ? 'es' : 'en'),
      },
      {
        id: 'effects',
        group: t('Actions', 'Acciones'),
        label: effects
          ? t('Turn off cursor effects', 'Desactivar efectos del cursor')
          : t('Turn on cursor effects', 'Activar efectos del cursor'),
        icon: <FiZap />,
        run: () => setEffects(!effects),
      },
      {
        id: 'copy-email',
        group: t('Actions', 'Acciones'),
        label: t('Copy email address', 'Copiar correo electrónico'),
        hint: CONFIG.social.email,
        icon: <FiCopy />,
        run: () => {
          navigator.clipboard?.writeText(CONFIG.social.email);
          setToast(t('Email copied', 'Correo copiado'));
        },
      },
      {
        id: 'resume',
        group: t('Actions', 'Acciones'),
        label: t('Download résumé', 'Descargar currículum'),
        icon: <FiDownload />,
        run: () => {
          window.open(CONFIG.profile.resumeUrl, '_blank', 'noopener');
          close();
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, effects],
  );

  const q = query.trim().toLowerCase();
  const results = q
    ? actions.filter((a) =>
        `${a.label} ${a.hint ?? ''} ${a.group}`.toLowerCase().includes(q),
      )
    : actions;

  useEffect(() => {
    if (paletteOpen) {
      setQuery('');
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [paletteOpen]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 1600);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  if (!paletteOpen)
    return toast ? (
      <div className="fixed bottom-6 left-1/2 z-[3000] -translate-x-1/2 rounded-full bg-forest-warm px-4 py-2 text-sm text-forest-bg shadow-lg">
        {toast}
      </div>
    ) : null;

  let lastGroup = '';

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
      role="dialog"
      aria-modal="true"
      aria-label={t('Command menu', 'Menú de comandos')}
    >
      <div className="page-enter w-full max-w-xl overflow-hidden rounded-2xl border border-white/20 bg-[#0f1f14]/95 shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <FiSearch className="text-forest-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') close();
              else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setIndex((i) => Math.min(results.length - 1, i + 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setIndex((i) => Math.max(0, i - 1));
              } else if (e.key === 'Enter') results[index]?.run();
            }}
            placeholder={t(
              'Search pages, projects, actions…',
              'Busca páginas, proyectos, acciones…',
            )}
            className="h-14 flex-1 bg-transparent text-forest-text placeholder:text-forest-muted/60 outline-none"
          />
          <span className="kbd">esc</span>
        </div>
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-forest-muted">
              {t('No matches.', 'Sin resultados.')}
            </p>
          )}
          {results.map((a, i) => {
            const header = a.group !== lastGroup;
            lastGroup = a.group;
            return (
              <div key={a.id}>
                {header && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-forest-muted/70">
                    {a.group}
                  </p>
                )}
                <button
                  type="button"
                  data-index={i}
                  onMouseMove={() => setIndex(i)}
                  onClick={a.run}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    i === index
                      ? 'bg-forest-deep text-forest-warm'
                      : 'text-forest-text'
                  }`}
                >
                  <span className="text-forest-muted">{a.icon}</span>
                  <span className="flex-1 truncate">{a.label}</span>
                  {a.hint && (
                    <span className="truncate font-mono text-[11px] text-forest-muted">
                      {a.hint}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2 text-[11px] text-forest-muted">
          <span>
            <span className="kbd">↑</span> <span className="kbd">↓</span>{' '}
            {t('move', 'mover')}
          </span>
          <span>
            <span className="kbd">↵</span> {t('open', 'abrir')}
          </span>
          <span className="ml-auto">
            <span className="kbd">⌘</span> <span className="kbd">K</span>
          </span>
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-forest-warm px-4 py-2 text-sm text-forest-bg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
