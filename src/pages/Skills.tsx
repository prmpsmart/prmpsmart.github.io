import { useState } from 'react';
import {
  FiCode,
  FiDatabase,
  FiServer,
  FiSmartphone,
  FiTool,
} from 'react-icons/fi';
import CONFIG, { SkillCategory } from '../../portfolio.config';
import { FilterChips, PageHeader } from '../Layout';
import { devicon, useReveal } from '../lib';

type Filter = 'All' | SkillCategory;

const ICONS: Record<SkillCategory, React.ReactNode> = {
  Languages: <FiCode />,
  Backend: <FiServer />,
  'Mobile & Desktop': <FiSmartphone />,
  Data: <FiDatabase />,
  'DevOps & Tools': <FiTool />,
};

export default function Skills() {
  const { skills, profile } = CONFIG;
  const categories = [...new Set(skills.map((s) => s.category))];
  const [filter, setFilter] = useState<Filter>('All');
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="max-w-full overflow-x-hidden px-5 pb-16 pt-6 md:px-10"
    >
      <PageHeader eyebrow="Skills" title="Technologies I use">
        The stack {profile.name} ships with: languages, frameworks, data, and
        tooling across client and product work. Filter by category.
      </PageHeader>

      <FilterChips<Filter>
        options={['All', ...categories]}
        value={filter}
        onChange={setFilter}
      />

      <div className="space-y-10">
        {categories
          .filter((c) => filter === 'All' || c === filter)
          .map((c) => (
            <section key={c}>
              <div className="mb-4 flex items-center gap-3 text-forest-muted">
                {ICONS[c]}
                <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-forest-text">
                  {c}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {skills
                  .filter((s) => s.category === c)
                  .map((s) => (
                    <div
                      key={s.name}
                      className="reveal glass flex flex-col items-center gap-3 rounded-xl p-4"
                    >
                      {s.icon ? (
                        <img
                          src={devicon(s.icon)}
                          alt=""
                          loading="lazy"
                          className="h-12 w-12 object-contain"
                        />
                      ) : (
                        <span className="flex h-12 w-12 items-center justify-center font-display text-xl text-forest-muted">
                          {s.name[0]}
                        </span>
                      )}
                      <span className="text-center text-xs font-semibold text-forest-text">
                        {s.name}
                      </span>
                    </div>
                  ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
