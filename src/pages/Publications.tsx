import { FiArrowUpRight, FiBookOpen } from 'react-icons/fi';
import CONFIG from '../../portfolio.config';
import { Link } from '../router';
import { photo, useReveal } from '../lib';

export default function Publications() {
  const { profile, publications, social } = CONFIG;
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="relative w-full max-w-full overflow-x-hidden px-4 pb-20 pt-4 md:px-10"
    >
      <section className="relative mb-12 overflow-hidden rounded-3xl border border-emerald-500/20">
        <div className="absolute inset-0">
          <img
            src={photo}
            alt=""
            className="h-full w-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a140e] via-forest-bg/90 to-forest-bg/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-bg via-transparent to-forest-bg/40" />
        </div>
        <div className="relative grid gap-10 p-4 md:grid-cols-[1.2fr_0.8fr] md:p-6 lg:p-8">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-200/70">
              {profile.name} · Research · Writing
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-emerald-50 md:text-5xl lg:text-6xl">
              Publications by {profile.name}.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-emerald-100/75 md:text-lg">
              Research and writing from engineering school and beyond: applied
              machine learning meets real-world engineering problems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-forest-text px-5 py-2.5 text-sm font-medium text-forest-bg transition hover:bg-white"
              >
                Work with me
              </Link>
              <Link href="/portfolio" className="chip">
                See portfolio
              </Link>
            </div>
          </div>
          <aside className="glass flex flex-col justify-between rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-4">
              <img
                src={photo}
                alt={profile.name}
                className="h-16 w-16 rounded-2xl border border-white/20 object-cover"
              />
              <div>
                <p className="font-display text-lg font-semibold text-emerald-50">
                  {profile.name}
                </p>
                <p className="text-sm text-emerald-100/65">
                  @{profile.handle} · Software Engineer
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
              {[
                [publications.length, 'Papers'],
                [CONFIG.projects.length, 'Projects'],
                [CONFIG.certifications.length, 'Awards'],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl text-emerald-50">{n}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-200/50">
                    {l}
                  </p>
                </div>
              ))}
            </div>
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              className="mt-4 text-sm text-emerald-100/70 hover:text-emerald-50"
            >
              More on GitHub →
            </a>
          </aside>
        </div>
      </section>

      <div className="grid gap-5">
        {publications.map((p) => (
          <a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="reveal group rounded-2xl border border-white/10 bg-[#14281c]/70 p-5 backdrop-blur-sm transition hover:border-white/25 md:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <FiBookOpen className="mt-1 shrink-0 text-forest-warm" />
                <h2 className="font-display text-xl font-semibold text-emerald-50">
                  {p.title}
                </h2>
              </div>
              <FiArrowUpRight className="shrink-0 text-forest-muted transition group-hover:text-forest-warm" />
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-emerald-200/55">
              {p.authors}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-emerald-100/70">
              {p.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
