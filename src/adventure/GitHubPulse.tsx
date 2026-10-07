import { useEffect, useState } from 'react';
import { FiGitCommit, FiStar } from 'react-icons/fi';
import CONFIG from '../../portfolio.config';
import { useGitHubRepos } from '../lib';
import { useSettings } from '../settings-context';

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const LEVELS = ['#B6C7AA1f', '#69847499', '#698474', '#B6C7AA', '#F6E6CB'];
const LANG_COLORS = [
  '#F6E6CB',
  '#B6C7AA',
  '#698474',
  '#D2E3C8',
  '#405247',
  '#8FA88A',
];

function useContributions() {
  const [data, setData] = useState<{ total: number; days: Day[] } | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${CONFIG.profile.githubUsername}?y=last`,
    )
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) =>
        setData({
          total: Object.values(d.total as Record<string, number>).reduce(
            (a, b) => a + b,
            0,
          ),
          days: d.contributions,
        }),
      )
      .catch(() => setFailed(true));
  }, []);
  return { data, failed };
}

export default function GitHubPulse() {
  const { t, lang } = useSettings();
  const { data, failed } = useContributions();
  const repos = useGitHubRepos();
  const [hover, setHover] = useState<Day | null>(null);

  // Pad the first week so columns line up Sunday→Saturday.
  const weeks: (Day | null)[][] = [];
  if (data?.days.length) {
    const first = new Date(data.days[0].date).getDay();
    const cells: (Day | null)[] = [...Array(first).fill(null), ...data.days];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  }

  const own = repos?.filter((r) => !r.fork) ?? [];
  const langCounts = Object.entries(
    own.reduce<Record<string, number>>((acc, r) => {
      if (r.language) acc[r.language] = (acc[r.language] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const top = langCounts.slice(0, 5);
  const rest = langCounts.slice(5).reduce((n, [, c]) => n + c, 0);
  const langs = rest
    ? [...top, [t('Other', 'Otros'), rest] as [string, number]]
    : top;
  const langTotal = langs.reduce((n, [, c]) => n + c, 0);
  const recent = [...own]
    .sort((a, b) => (b.pushed_at ?? '').localeCompare(a.pushed_at ?? ''))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-lg font-semibold text-forest-text">
            {data
              ? t(
                  `${data.total.toLocaleString()} contributions in the last year`,
                  `${data.total.toLocaleString('es')} contribuciones en el último año`,
                )
              : failed
                ? t(
                    'Contribution graph unavailable right now',
                    'Gráfico de contribuciones no disponible ahora',
                  )
                : t('Loading contributions…', 'Cargando contribuciones…')}
          </p>
          <p className="font-mono text-[11px] text-forest-muted">
            {hover
              ? `${new Date(hover.date).toLocaleDateString(lang, { month: 'short', day: 'numeric', year: 'numeric' })} · ${hover.count}`
              : t('hover a day', 'pasa el cursor sobre un día')}
          </p>
        </div>
        <div className="overflow-x-auto pb-1">
          <div className="flex w-max gap-[3px]">
            {(weeks.length
              ? weeks
              : Array.from({ length: 53 }, () => Array(7).fill(null))
            ).map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }, (_, di) => {
                  const d = week[di];
                  return (
                    <span
                      key={di}
                      onMouseEnter={() => d && setHover(d)}
                      onMouseLeave={() => setHover(null)}
                      className="h-[11px] w-[11px] rounded-[3px] transition-transform hover:scale-150"
                      style={{
                        background: d ? LEVELS[d.level] : '#B6C7AA0a',
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-forest-muted">
          {t('less', 'menos')}
          {LEVELS.map((c) => (
            <span
              key={c}
              className="h-[10px] w-[10px] rounded-[2px]"
              style={{ background: c }}
            />
          ))}
          {t('more', 'más')}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <p className="eyebrow">
            {t('Languages across my repos', 'Lenguajes en mis repos')}
          </p>
          {langTotal > 0 ? (
            <>
              <div className="mt-4 flex h-3 overflow-hidden rounded-full">
                {langs.map(([name, n], i) => (
                  <span
                    key={name}
                    title={`${name}: ${n}`}
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${(n / langTotal) * 100}%`,
                      background: LANG_COLORS[i],
                    }}
                  />
                ))}
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {langs.map(([name, n], i) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 text-sm text-forest-text"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: LANG_COLORS[i] }}
                    />
                    {name}
                    <span className="ml-auto font-mono text-xs text-forest-muted">
                      {Math.round((n / langTotal) * 100)}%
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-4 text-sm text-forest-muted">
              {t('Loading…', 'Cargando…')}
            </p>
          )}
        </div>

        <div className="glass rounded-2xl p-5">
          <p className="eyebrow">
            {t('Recently pushed', 'Actualizados recientemente')}
          </p>
          <ul className="mt-3 divide-y divide-white/10">
            {recent.map((r) => (
              <li key={r.name}>
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 py-2.5 text-sm text-forest-text hover:text-forest-warm"
                >
                  <FiGitCommit className="shrink-0 text-forest-muted" />
                  <span className="truncate">{r.name}</span>
                  <span className="ml-auto flex shrink-0 items-center gap-3 font-mono text-[11px] text-forest-muted">
                    {r.language}
                    <span className="inline-flex items-center gap-1">
                      <FiStar size={11} /> {r.stargazers_count}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
