import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import type { Project } from '../../portfolio.config';
import { projectImage } from '../lib';

export default function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="glass group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl text-left"
    >
      <div className={`relative overflow-hidden ${compact ? 'h-40' : 'h-44'}`}>
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-forest-elevated font-display text-2xl font-semibold text-forest-muted">
            {project.title}
          </div>
        ) : (
          <img
            src={projectImage(project.link, project.image)}
            alt={project.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-bg/70 to-transparent opacity-80" />
        <FiArrowUpRight
          className="absolute right-3 top-3 text-forest-warm opacity-0 transition group-hover:opacity-100"
          size={20}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-forest-text">
            {project.title}
          </h3>
          {!compact && (
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-forest-muted">
              {project.category}
            </span>
          )}
        </div>
        <p className="line-clamp-3 text-sm text-forest-muted">
          {project.description}
        </p>
        {!compact && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#B6C7AA40] px-2 py-0.5 text-[10px] text-forest-muted"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
