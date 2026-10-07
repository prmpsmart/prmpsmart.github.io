import CONFIG from '../../portfolio.config';
import { PageHeader } from '../Layout';
import { useSettings } from '../settings-context';
import { useReveal } from '../lib';

export default function Experience() {
  const { experiences, profile } = CONFIG;
  const ref = useReveal<HTMLDivElement>();
  const { t } = useSettings();

  return (
    <div
      ref={ref}
      className="max-w-full overflow-x-hidden px-5 pb-16 pt-6 md:px-10"
    >
      <PageHeader
        eyebrow={t('Experience', 'Experiencia')}
        title={t('Work timeline', 'Trayectoria')}
      >
        {t(
          `${profile.name} (@${profile.handle}): roles across product teams in Nigeria, the USA, and Spain, spanning backend leadership, contract delivery, and desktop software.`,
          `${profile.name} (@${profile.handle}): puestos en equipos de producto en Nigeria, EE. UU. y España, desde liderazgo backend hasta contratos y software de escritorio.`,
        )}
      </PageHeader>

      <div className="relative mx-auto max-w-5xl">
        <div className="absolute bottom-0 left-[11px] top-2 w-px bg-[var(--glass-border)] md:left-1/2 md:-translate-x-px" />
        <ul className="space-y-10">
          {experiences.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={e.company}
                className="relative md:grid md:grid-cols-2 md:gap-10"
              >
                <div className="absolute left-0 top-3 z-10 h-6 w-6 rounded-full border-2 border-forest-muted bg-forest-bg md:left-1/2 md:-translate-x-1/2" />
                <div
                  className={`reveal ml-10 md:ml-0 ${
                    left
                      ? 'md:col-start-1 md:pr-8 md:text-right'
                      : 'md:col-start-2 md:pl-8'
                  }`}
                >
                  <div className="glass rounded-2xl p-5 text-left">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-display text-xl font-semibold text-forest-text">
                        {e.companyLink ? (
                          <a
                            href={e.companyLink}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-forest-warm"
                          >
                            {e.company}
                          </a>
                        ) : (
                          e.company
                        )}
                      </h2>
                      <span className="font-mono text-[11px] text-forest-muted">
                        {e.location}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {e.roles.map((r) => (
                        <div
                          key={r.title}
                          className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
                        >
                          <span className="font-medium text-forest-text">
                            {r.title}
                          </span>
                          <span className="font-mono text-xs uppercase text-forest-muted">
                            {r.from} {t('to', 'a')} {r.to}
                          </span>
                        </div>
                      ))}
                    </div>
                    <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-forest-muted marker:text-forest-deep">
                      {e.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
