import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import CONFIG from '../../portfolio.config';
import { useSettings } from '../settings-context';

export default function CaseStudies() {
  const { t } = useSettings();
  const studies = CONFIG.caseStudies;
  const [active, setActive] = useState(0);
  const s = studies[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <div className="flex gap-2 overflow-x-auto lg:flex-col">
        {studies.map((c, i) => (
          <button
            key={c.title}
            type="button"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-xl border px-4 py-3 text-left transition ${
              i === active
                ? 'border-forest-muted bg-[#B6C7AA18]'
                : 'border-white/10 hover:border-white/25'
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">
              {t('Case', 'Caso')} {String(i + 1).padStart(2, '0')}
            </p>
            <p className="mt-0.5 font-display font-semibold text-forest-text">
              {c.title}
            </p>
          </button>
        ))}
      </div>

      <article
        key={s.title}
        className="page-enter rounded-2xl border border-white/10 bg-[#14281c]/70 p-6 backdrop-blur-sm md:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-3xl font-semibold text-forest-text">
              {s.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-forest-warm">{s.role}</p>
          </div>
          <a href={s.link} target="_blank" rel="noreferrer" className="chip">
            {t('Visit', 'Visitar')} <FiArrowUpRight />
          </a>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section>
            <p className="eyebrow">{t('Context', 'Contexto')}</p>
            <p className="mt-2 text-sm leading-relaxed text-forest-text/90">
              {s.context}
            </p>
          </section>
          <section>
            <p className="eyebrow">{t('Challenge', 'Reto')}</p>
            <p className="mt-2 text-sm leading-relaxed text-forest-text/90">
              {s.challenge}
            </p>
          </section>
        </div>

        <section className="mt-6">
          <p className="eyebrow">{t('What I built', 'Lo que construí')}</p>
          <ol className="mt-3 space-y-2">
            {s.built.map((b, i) => (
              <li key={b} className="flex gap-3 text-sm text-forest-text/90">
                <span className="font-mono text-xs text-forest-warm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {b}
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-5">
          {s.stack.map((x) => (
            <span
              key={x}
              className="rounded-full border border-[#B6C7AA40] px-2.5 py-0.5 text-[11px] text-forest-muted"
            >
              {x}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
