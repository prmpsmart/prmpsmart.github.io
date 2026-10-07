import { useEffect, useState } from 'react';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import CONFIG from '../../portfolio.config';
import { Link } from '../router';
import { devicon, useGitHubStats, useReveal, yearsSince } from '../lib';
import ProjectCard from '../components/ProjectCard';
import Magnetic from '../components/Magnetic';
import { STOPS } from '../adventure/stops';
import StopIcon from '../adventure/StopIcon';
import { useSettings } from '../settings-context';

function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === '';
    const t = setTimeout(
      () => {
        if (done) setDeleting(true);
        else if (empty) {
          setDeleting(false);
          setI((n) => n + 1);
        } else
          setText(
            deleting
              ? word.slice(0, text.length - 1)
              : word.slice(0, text.length + 1),
          );
      },
      done ? 1600 : deleting ? 40 : 85,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <div className="flex h-11 items-center font-mono text-xl text-forest-muted md:text-2xl">
      <span className="mr-2 text-forest-deep">&gt;</span>
      {text}
      <span className="caret ml-1">|</span>
    </div>
  );
}

function StatCard({
  value,
  label,
  className,
  delay,
}: {
  value: string;
  label: string;
  className: string;
  delay: number;
}) {
  return (
    <div
      className={`glass pop-in pointer-events-auto absolute min-w-[110px] rounded-xl p-4 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="float" style={{ animationDelay: `${delay * 2}ms` }}>
        <div className="font-display text-3xl font-bold text-forest-text">
          {value}
        </div>
        <div className="text-sm text-forest-muted">{label}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const { profile, social, skills, projects } = CONFIG;
  const stats = useGitHubStats();
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const ref = useReveal<HTMLDivElement>();
  const firstName = profile.name.split(' ')[0];
  const { t, lang } = useSettings();
  const es = lang === 'es';

  return (
    <div ref={ref} className="relative w-full max-w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[calc(100dvh-4rem)] w-full max-w-full flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-bg/65 via-forest-bg/15 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-bg/35 via-transparent to-transparent" />
        {[
          'left-[12%] top-[22%] h-1.5 w-1.5',
          'right-[18%] top-[30%] h-2 w-2',
          'left-[40%] bottom-[28%] h-1 w-1',
          'right-[8%] bottom-[36%] h-1.5 w-1.5',
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={`float pointer-events-none absolute rounded-full bg-forest-text/70 ${pos}`}
          />
        ))}

        <div className="relative z-10 grid w-full flex-1 items-center gap-8 px-5 py-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hero-enter space-y-7">
            {profile.availableForWork && (
              <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-sm text-forest-text">
                  {t(
                    'Available for opportunities',
                    'Disponible para oportunidades',
                  )}
                </span>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-lg text-forest-muted">
                {t("Hi, I'm", 'Hola, soy')}
              </p>
              <h1 className="font-display text-5xl font-bold leading-tight text-forest-text md:text-7xl">
                {profile.name}
              </h1>
              <p className="text-sm uppercase tracking-[0.18em] text-forest-muted">
                @{profile.handle}
              </p>
              <Typewriter
                key={lang}
                words={es ? CONFIG.es.roles : profile.roles}
              />
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-forest-text/90">
              {t('Software engineer in', 'Ingeniero de software en')}{' '}
              <span className="font-semibold text-forest-warm">
                {profile.location}
              </span>
              . {es ? CONFIG.es.intro : profile.intro}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link href="/portfolio" className="btn-primary">
                  {t('View My Work', 'Ver mi trabajo')} <FiArrowRight />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/contact" className="btn-outline">
                  {t('Get In Touch', 'Contáctame')}
                </Link>
              </Magnetic>
              <Link
                href="/explore"
                className="text-sm font-semibold text-forest-warm underline-offset-4 hover:underline"
              >
                {t(
                  'or take the 9-stop tour →',
                  'o haz el recorrido de 9 paradas →',
                )}
              </Link>
            </div>

            <div className="flex gap-3 pt-2">
              {[
                {
                  href: social.github,
                  icon: <FiGithub size={18} />,
                  label: 'GitHub',
                },
                {
                  href: social.linkedin,
                  icon: <FiLinkedin size={18} />,
                  label: 'LinkedIn',
                },
                {
                  href: `mailto:${social.email}`,
                  icon: <FiMail size={18} />,
                  label: 'Email',
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-forest-text transition hover:text-forest-warm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="pointer-events-none relative hidden h-[420px] lg:block">
            <StatCard
              value={`${yearsSince(profile.careerStart)}+`}
              label={t('Years', 'Años')}
              className="right-4 top-8"
              delay={300}
            />
            <StatCard
              value={`${CONFIG.projects.length}+`}
              label={t('Projects', 'Proyectos')}
              className="left-2 top-[42%]"
              delay={450}
            />
            <StatCard
              value={stats ? `${stats.repos}` : `${CONFIG.experiences.length}`}
              label={
                stats
                  ? t('Public repos', 'Repos públicos')
                  : t('Companies', 'Empresas')
              }
              className="bottom-16 right-12"
              delay={600}
            />
          </div>
        </div>

        <div className="pointer-events-none relative z-10 flex shrink-0 flex-col items-center gap-1 pb-4 pt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-forest-muted">
          <span>{t('Scroll', 'Desliza')}</span>
          <span className="float text-base leading-none">↓</span>
        </div>
      </section>

      {/* Skills marquee */}
      <div className="reveal relative z-10 w-full max-w-full overflow-hidden border-y border-[#B6C7AA30] bg-forest-bg/45 py-4 backdrop-blur-[2px]">
        <div className="marquee flex w-max items-center gap-6 whitespace-nowrap">
          {[...skills, ...skills].map((s, i) => (
            <div
              key={i}
              className="glass flex shrink-0 items-center gap-3 rounded-full px-5 py-2.5"
              aria-hidden={i >= skills.length}
            >
              {s.icon && (
                <img
                  src={devicon(s.icon)}
                  alt=""
                  className="h-5 w-5 opacity-85"
                  loading="lazy"
                />
              )}
              <span className="text-sm font-medium text-forest-text">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured projects */}
      <section className="relative z-10 w-full max-w-full px-5 py-16 md:px-10">
        <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t('Selected work', 'Trabajo destacado')}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-forest-text">
              {t('Featured projects', 'Proyectos destacados')}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-forest-muted underline-offset-4 hover:text-forest-text hover:underline"
          >
            {t('See all →', 'Ver todo →')}
          </Link>
        </div>
        <div className="grid max-w-full gap-5 md:grid-cols-3">
          {featured.map((p, i) => (
            <div
              key={p.title}
              className="reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <ProjectCard project={p} compact />
            </div>
          ))}
        </div>
      </section>

      {/* Adventure invitation */}
      <section className="relative z-10 w-full max-w-full px-5 pb-16 md:px-10">
        <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t('The Adventure', 'La Aventura')}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-forest-text">
              {t('Nine stops through my work', 'Nueve paradas por mi trabajo')}
            </h2>
            <p className="mt-2 max-w-xl text-forest-muted">
              {t(
                'Hold a phone, drag desktop windows, trace a backend, type into my shell. Pick any stop.',
                'Sostén un teléfono, arrastra ventanas, sigue un backend, escribe en mi terminal. Elige cualquier parada.',
              )}
            </p>
          </div>
          <Magnetic>
            <Link href="/explore" className="btn-primary">
              {t('Start the adventure', 'Empezar la aventura')} <FiArrowRight />
            </Link>
          </Magnetic>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {STOPS.map((s, i) => (
            <Link
              key={s.id}
              href={`/explore#${s.id}`}
              className="reveal glass group flex items-center gap-3 rounded-2xl p-4 transition hover:bg-[var(--glass-strong)]"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-elevated text-forest-warm transition group-hover:scale-110">
                <StopIcon id={s.id} />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10px] text-forest-muted">
                  {String(i + 1).padStart(2, '0')} · {t(s.kicker, s.kickerEs)}
                </span>
                <span className="block truncate font-display text-sm font-semibold text-forest-text">
                  {t(s.title, s.titleEs)}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="reveal relative z-10 mx-5 mb-16 overflow-hidden rounded-3xl border border-[#B6C7AA35] bg-[#B6C7AA12] px-6 py-10 backdrop-blur-sm md:mx-10 md:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-forest-deep/30 blur-3xl"
        />
        <p className="eyebrow">{t('Next step', 'Siguiente paso')}</p>
        <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold text-forest-text">
          {t(
            "Let's build something that works beautifully.",
            'Construyamos algo que funcione de maravilla.',
          )}
        </h2>
        <p className="mt-3 max-w-lg text-forest-muted">
          {t(
            `A role, a product, or a focused build. Reach out and ${firstName} will get back to you.`,
            `Un puesto, un producto o un desarrollo concreto. Escribe y ${firstName} te responderá.`,
          )}
        </p>
        <div className="mt-6">
          <Magnetic>
            <Link href="/contact" className="btn-primary">
              {t('Start a conversation', 'Iniciar una conversación')}{' '}
              <FiArrowRight />
            </Link>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
