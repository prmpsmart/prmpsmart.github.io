import { FiAward, FiDownload } from 'react-icons/fi';
import CONFIG from '../../portfolio.config';
import { PageHeader } from '../Layout';
import { useSettings } from '../settings-context';
import { photo, useReveal } from '../lib';

export default function About() {
  const { profile, certifications, languages } = CONFIG;
  const { t, lang } = useSettings();
  const es = lang === 'es';
  const about = es ? CONFIG.es.about : profile.about;
  const focusAreas = es ? CONFIG.es.focusAreas : CONFIG.focusAreas;
  const whatIDo = es ? CONFIG.es.whatIDo : CONFIG.whatIDo;
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="max-w-full overflow-x-hidden px-5 pb-16 pt-6 md:px-10"
    >
      <PageHeader eyebrow={t('About', 'Sobre mí')} title={profile.name}>
        @{profile.handle} ·{' '}
        {t(
          'Engineer, collaborator, shipper',
          'Ingeniero, colaborador, hacedor',
        )}
      </PageHeader>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="reveal glass rounded-2xl p-5 md:p-6">
          <div className="space-y-5">
            {about.map((p) => (
              <p
                key={p}
                className="text-base leading-relaxed text-forest-text/95 md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-6"
            >
              <FiDownload /> {t('Download résumé', 'Descargar currículum')}
            </a>
          )}
        </div>
        <div className="reveal glass overflow-hidden rounded-2xl">
          <img
            src={photo}
            alt={profile.name}
            className="h-72 w-full object-cover md:h-[28rem]"
          />
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-6 font-display text-2xl font-semibold text-forest-text">
          {t('Focus areas', 'Áreas de enfoque')}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {focusAreas.map((f, i) => (
            <div
              key={f.title}
              className="reveal glass rounded-2xl p-5"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="font-display text-lg font-semibold text-forest-text">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-muted">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-2">
        <div className="reveal glass rounded-2xl p-5 md:p-6">
          <h2 className="font-display text-2xl font-semibold text-forest-text">
            {t('What I do', 'Lo que hago')}
          </h2>
          <div className="mt-4 space-y-4">
            {whatIDo.map((w) => (
              <div
                key={w.title}
                className="border-l-2 border-forest-muted pl-4"
              >
                <h3 className="font-display font-semibold text-forest-text">
                  {w.title}
                </h3>
                <p className="mt-1 text-sm text-forest-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal glass rounded-2xl p-5 md:p-6">
          <h2 className="font-display text-2xl font-semibold text-forest-text">
            {t('Education & languages', 'Formación e idiomas')}
          </h2>
          <div className="mt-4 space-y-4">
            {CONFIG.educations.map((e) => (
              <div
                key={e.institution}
                className="border-l-2 border-forest-muted pl-4"
              >
                <h3 className="font-display font-semibold text-forest-text">
                  {e.degree}
                </h3>
                <p className="mt-1 text-sm text-forest-muted">
                  {e.institution} · {t('Graduated', 'Graduado en')} {e.to}
                </p>
              </div>
            ))}
            {languages.map((l) => (
              <div key={l.name} className="border-l-2 border-forest-muted pl-4">
                <h3 className="font-display font-semibold text-forest-text">
                  {l.name}
                </h3>
                <p className="mt-1 text-sm text-forest-muted">{l.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {certifications.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-semibold text-forest-text">
            {t(
              'Recognition & certifications',
              'Reconocimientos y certificaciones',
            )}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {certifications.map((c) => (
              <a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="reveal glass group block overflow-hidden rounded-2xl"
              >
                {c.image && (
                  <div className="h-56 overflow-hidden bg-white/5">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-3 transition duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex items-start gap-3 p-4">
                  <FiAward
                    className="mt-1 shrink-0 text-forest-warm"
                    size={18}
                  />
                  <div>
                    <h3 className="font-display font-semibold text-forest-text">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-sm text-forest-muted">
                      {c.body} · {c.date}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
