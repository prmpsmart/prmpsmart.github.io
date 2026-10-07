import { useState } from 'react';
import { FiGithub, FiStar } from 'react-icons/fi';
import CONFIG, { ProjectCategory } from '../../portfolio.config';
import { FilterChips, PageHeader } from '../Layout';
import { useSettings } from '../settings-context';
import ProjectCard from '../components/ProjectCard';
import { useGitHubRepos, useReveal } from '../lib';

type Filter = 'All' | ProjectCategory;

export default function Portfolio() {
  const { projects, profile } = CONFIG;
  const categories = [...new Set(projects.map((p) => p.category))];
  const [filter, setFilter] = useState<Filter>('All');
  const shown =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  const listed = new Set(
    projects.map((p) => p.link.toLowerCase().replace(/\/$/, '')),
  );
  const repos = useGitHubRepos()
    ?.filter((r) => !r.fork && !listed.has(r.html_url.toLowerCase()))
    .filter(
      (r) => r.name.toLowerCase() !== profile.githubUsername.toLowerCase(),
    )
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9);

  const ref = useReveal<HTMLDivElement>();
  const { t } = useSettings();

  return (
    <div
      ref={ref}
      className="max-w-full overflow-x-hidden px-5 pb-16 pt-6 md:px-10"
    >
      <PageHeader
        eyebrow={t('Portfolio', 'Portafolio')}
        title={t('Selected projects', 'Proyectos seleccionados')}
      >
        {t(
          `Work by ${profile.name}: shipped mobile apps, production backends, desktop software, and open-source builds.`,
          `Trabajo de ${profile.name}: apps móviles lanzadas, backends en producción, software de escritorio y proyectos open source.`,
        )}
      </PageHeader>

      <FilterChips<Filter>
        options={['All', ...categories]}
        value={filter}
        onChange={setFilter}
        label={(o) => (o === 'All' ? t('All', 'Todos') : o)}
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((p) => (
          <div key={p.title} className="reveal">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {repos && repos.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">
                {t('Live from GitHub', 'En vivo desde GitHub')}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-forest-text">
                {t('More repositories', 'Más repositorios')}
              </h2>
            </div>
            <a
              href={CONFIG.social.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-forest-muted underline-offset-4 hover:text-forest-text hover:underline"
            >
              {t('All on GitHub →', 'Todo en GitHub →')}
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {repos.map((r) => (
              <a
                key={r.name}
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="reveal glass flex flex-col gap-2 rounded-2xl p-4 transition hover:bg-[var(--glass-strong)]"
              >
                <div className="flex items-center gap-2">
                  <FiGithub className="shrink-0 text-forest-muted" />
                  <h3 className="truncate font-display font-semibold text-forest-text">
                    {r.name}
                  </h3>
                </div>
                <p className="line-clamp-2 text-sm text-forest-muted">
                  {r.description ||
                    t('No description provided.', 'Sin descripción.')}
                </p>
                <div className="mt-auto flex items-center gap-4 pt-1 font-mono text-[11px] text-forest-muted">
                  {r.language && <span>{r.language}</span>}
                  <span className="inline-flex items-center gap-1">
                    <FiStar size={12} /> {r.stargazers_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
