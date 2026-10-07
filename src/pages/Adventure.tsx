import { useEffect, useState } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiAward,
  FiCheck,
  FiCode,
} from 'react-icons/fi';
import CONFIG from '../../portfolio.config';
import { STOPS, StopId } from '../adventure/stops';
import StopIcon from '../adventure/StopIcon';
import MobileShowcase from '../adventure/MobileShowcase';
import DesktopShowcase from '../adventure/DesktopShowcase';
import ArchitectureDiagrams from '../adventure/ArchitectureDiagrams';
import Terminal from '../adventure/Terminal';
import CaseStudies from '../adventure/CaseStudies';
import GitHubPulse from '../adventure/GitHubPulse';
import { useMagnetic, useTilt } from '../effects';
import { Link } from '../router';
import { useRouter } from '../router-context';
import { useSettings } from '../settings-context';
import { load, save } from '../storage';

function ShortcutsStop() {
  const { setPaletteOpen, t } = useSettings();
  const isMac = /mac|iphone|ipad/i.test(
    navigator.platform || navigator.userAgent,
  );
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="group mx-auto flex items-center gap-4"
        aria-label={t('Open the command menu', 'Abrir el menú de comandos')}
      >
        {[isMac ? '⌘' : 'Ctrl', 'K'].map((k) => (
          <span
            key={k}
            className="flex h-24 min-w-24 items-center justify-center rounded-2xl border border-white/25 bg-gradient-to-b from-white/15 to-white/5 px-5 font-display text-4xl font-semibold text-forest-text shadow-[0_8px_0_#0b170f,0_14px_30px_rgba(0,0,0,0.4)] transition group-hover:translate-y-1 group-hover:shadow-[0_4px_0_#0b170f,0_8px_20px_rgba(0,0,0,0.4)] group-active:translate-y-2 group-active:shadow-none"
          >
            {k}
          </span>
        ))}
      </button>
      <div className="space-y-3 text-sm text-forest-text/90">
        <p>
          {t(
            'From anywhere on this site, the command menu lets you:',
            'Desde cualquier parte del sitio, el menú de comandos te permite:',
          )}
        </p>
        <ul className="space-y-2 text-forest-muted">
          <li>
            →{' '}
            {t(
              'jump to any page or Adventure stop',
              'saltar a cualquier página o parada de la Aventura',
            )}
          </li>
          <li>
            →{' '}
            {t(
              'open any project by name',
              'abrir cualquier proyecto por su nombre',
            )}
          </li>
          <li>
            →{' '}
            {t(
              'switch language, toggle effects, copy my email, get my résumé',
              'cambiar idioma, activar efectos, copiar mi correo, obtener mi currículum',
            )}
          </li>
        </ul>
        <p className="text-forest-muted">
          {t('Fully keyboard-driven:', 'Totalmente con teclado:')}{' '}
          <span className="kbd">↑</span> <span className="kbd">↓</span>{' '}
          <span className="kbd">↵</span> <span className="kbd">esc</span>
        </p>
      </div>
    </div>
  );
}

function BilingualStop() {
  const { lang, setLang, t } = useSettings();
  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-full border border-white/20 bg-black/20 p-1">
        {(['en', 'es'] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
              lang === l
                ? 'bg-forest-muted text-forest-bg'
                : 'text-forest-text hover:text-forest-warm'
            }`}
          >
            {l === 'en' ? 'English' : 'Español'}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {(['en', 'es'] as const).map((l) => (
          <div
            key={l}
            className={`rounded-2xl border p-5 transition ${
              lang === l
                ? 'border-forest-muted bg-[#B6C7AA14]'
                : 'border-white/10 opacity-60'
            }`}
          >
            <p className="eyebrow">{l === 'en' ? 'English' : 'Español'}</p>
            <p className="mt-2 text-sm leading-relaxed text-forest-text/90">
              {l === 'en' ? CONFIG.profile.intro : CONFIG.es.intro}
            </p>
          </div>
        ))}
      </div>
      <p className="text-sm text-forest-muted">
        {t(
          'Navigation, headings, the home page, About, Contact, and this whole Adventure switch languages. Your choice is remembered.',
          'La navegación, los títulos, el inicio, Sobre mí, Contacto y toda esta Aventura cambian de idioma. Tu elección se recuerda.',
        )}
      </p>
    </div>
  );
}

function FeelStop() {
  const { effects, setEffects, t } = useSettings();
  const magnet = useMagnetic<HTMLButtonElement>(0.45);
  const tilt = useTilt<HTMLDivElement>(16);
  return (
    <div className="space-y-6">
      <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-forest-text">
        <button
          type="button"
          role="switch"
          aria-checked={effects}
          onClick={() => setEffects(!effects)}
          className={`relative h-7 w-12 rounded-full transition ${effects ? 'bg-forest-muted' : 'bg-white/15'}`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-forest-bg transition-all ${effects ? 'left-6' : 'left-1'}`}
          />
        </button>
        {effects
          ? t('Effects on', 'Efectos activados')
          : t('Effects off', 'Efectos desactivados')}
      </label>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="glass flex flex-col items-center justify-center gap-4 rounded-2xl p-6 text-center">
          <p className="eyebrow">{t('Magnetic', 'Magnético')}</p>
          <button ref={magnet} type="button" className="btn-primary">
            {t('Catch me', 'Atrápame')} <FiArrowRight />
          </button>
          <p className="text-xs text-forest-muted">
            {t('Hover near it.', 'Pasa el cursor cerca.')}
          </p>
        </div>
        <div
          ref={tilt}
          className="tilt glass flex flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center"
        >
          <p className="eyebrow">{t('Tilt', 'Inclinación')}</p>
          <FiAward className="text-forest-warm" size={36} />
          <p className="text-xs text-forest-muted">
            {t(
              'Move across the card. Project cards do this too.',
              'Muévete por la tarjeta. Las de proyectos también lo hacen.',
            )}
          </p>
        </div>
        <div className="glass flex flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center">
          <p className="eyebrow">{t('Glow', 'Brillo')}</p>
          <FiCode className="text-forest-warm" size={36} />
          <p className="text-xs text-forest-muted">
            {t(
              'A soft light follows your cursor across every page.',
              'Una luz suave sigue tu cursor en todas las páginas.',
            )}
          </p>
        </div>
      </div>
      <p className="text-xs text-forest-muted">
        {t(
          'Effects switch off automatically on touch screens and for visitors who prefer reduced motion.',
          'Los efectos se desactivan solos en pantallas táctiles y para quien prefiere menos movimiento.',
        )}
      </p>
    </div>
  );
}

const BODIES: Record<StopId, () => JSX.Element> = {
  mobile: MobileShowcase,
  desktop: DesktopShowcase,
  architecture: ArchitectureDiagrams,
  terminal: Terminal,
  shortcuts: ShortcutsStop,
  bilingual: BilingualStop,
  'case-studies': CaseStudies,
  pulse: GitHubPulse,
  feel: FeelStop,
};

export default function Adventure() {
  const { hash, navigate } = useRouter();
  const { t } = useSettings();
  const index = Math.max(
    0,
    STOPS.findIndex((s) => s.id === hash),
  );
  const stop = STOPS[index];
  const Body = BODIES[stop.id];
  const [visited, setVisited] = useState<string[]>(() =>
    load('adventure-visited', []),
  );

  useEffect(() => {
    setVisited((v) => {
      if (v.includes(stop.id)) return v;
      const next = [...v, stop.id];
      save('adventure-visited', next);
      return next;
    });
  }, [stop.id]);

  const goTo = (i: number) => {
    navigate(`/explore#${STOPS[i].id}`);
    document
      .getElementById('stop')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const done = visited.length >= STOPS.length;
  const progress = Math.round((visited.length / STOPS.length) * 100);

  return (
    <div className="max-w-full overflow-x-hidden px-5 pb-16 pt-6 md:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{t('The Adventure', 'La Aventura')}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-text">
            {t('Nine stops through my work', 'Nueve paradas por mi trabajo')}
          </h1>
          <p className="mt-3 max-w-2xl text-forest-muted">
            {t(
              'Each stop shows a different side of how I build: mobile, desktop, backend, and the craft in between. Explore in order or jump around.',
              'Cada parada muestra una faceta distinta de cómo construyo: móvil, escritorio, backend y el oficio entre medias. Explora en orden o salta libremente.',
            )}
          </p>
        </div>
        <div className="w-full max-w-xs">
          <div className="mb-2 flex justify-between font-mono text-[11px] uppercase tracking-widest text-forest-muted">
            <span>{t('Explored', 'Explorado')}</span>
            <span>
              {visited.length}/{STOPS.length}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-forest-deep to-forest-warm transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="-mx-5 mb-8 overflow-x-auto px-5 md:mx-0 md:px-0"
        role="tablist"
      >
        <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
          {STOPS.map((s, i) => {
            const active = i === index;
            const seen = visited.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => goTo(i)}
                className={`group flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-sm transition ${
                  active
                    ? 'bg-forest-muted text-forest-bg'
                    : 'glass text-forest-text hover:bg-[var(--glass-strong)]'
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                    active
                      ? 'bg-forest-bg text-forest-warm'
                      : seen
                        ? 'bg-forest-deep text-forest-warm'
                        : 'bg-white/10'
                  }`}
                >
                  {seen && !active ? <FiCheck /> : <StopIcon id={s.id} />}
                </span>
                <span className="font-mono text-[10px] opacity-70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t(s.title, s.titleEs)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current stop */}
      <section id="stop" key={stop.id} className="page-enter scroll-mt-24">
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-forest-warm">
            {t('Stop', 'Parada')} {String(index + 1).padStart(2, '0')} ·{' '}
            {t(stop.kicker, stop.kickerEs)}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-forest-text md:text-4xl">
            {t(stop.title, stop.titleEs)}
          </h2>
          <p className="mt-2 max-w-2xl text-forest-muted">
            {t(stop.intro, stop.introEs)}
          </p>
        </div>
        <Body />
      </section>

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
          className="inline-flex items-center gap-2 text-sm text-forest-muted transition hover:text-forest-text disabled:opacity-30"
        >
          <FiArrowLeft />{' '}
          {index > 0 && t(STOPS[index - 1].title, STOPS[index - 1].titleEs)}
        </button>
        {index < STOPS.length - 1 ? (
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="btn-primary"
          >
            {t('Next stop', 'Siguiente parada')}:{' '}
            {t(STOPS[index + 1].title, STOPS[index + 1].titleEs)}{' '}
            <FiArrowRight />
          </button>
        ) : (
          <Link href="/contact" className="btn-primary">
            {t('Finish: say hello', 'Terminar: escríbeme')} <FiArrowRight />
          </Link>
        )}
      </div>

      {done && (
        <div className="page-enter relative mt-10 overflow-hidden rounded-3xl border border-forest-warm/40 bg-[#F6E6CB10] px-6 py-8 text-center md:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-forest-warm/20 blur-3xl"
          />
          <FiAward className="mx-auto text-forest-warm" size={40} />
          <h3 className="mt-3 font-display text-2xl font-semibold text-forest-text">
            {t('Adventure complete', 'Aventura completada')}
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-forest-muted">
            {t(
              `You've seen all nine stops. If you liked the journey, ${CONFIG.profile.name.split(' ')[0]} would love to hear from you.`,
              `Has visto las nueve paradas. Si te gustó el recorrido, a ${CONFIG.profile.name.split(' ')[0]} le encantaría saber de ti.`,
            )}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              {t('Get in touch', 'Contáctame')} <FiArrowRight />
            </Link>
            <a
              href={CONFIG.profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              {t('Download résumé', 'Descargar currículum')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
