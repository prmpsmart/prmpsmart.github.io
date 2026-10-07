import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import CONFIG from '../../portfolio.config';
import { NAV } from '../nav';
import { useRouter } from '../router-context';
import { useSettings } from '../settings-context';
import { yearsSince } from '../lib';

type Line = { kind: 'in' | 'out' | 'err' | 'accent'; text: string };

const PAGES = NAV.map((n) => n.href.replace('/', '') || 'home');
const COMMANDS = [
  'help',
  'whoami',
  'about',
  'skills',
  'projects',
  'open',
  'experience',
  'education',
  'contact',
  'resume',
  'cd',
  'ls',
  'neofetch',
  'lang',
  'sudo',
  'history',
  'date',
  'echo',
  'clear',
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export default function Terminal() {
  const { navigate } = useRouter();
  const { lang, setLang, t } = useSettings();
  const { profile, social } = CONFIG;
  const user = profile.handle;
  const prompt = `${user}@portfolio:~$`;

  const [lines, setLines] = useState<Line[]>(() => [
    { kind: 'accent', text: `${profile.name} — interactive résumé shell` },
    {
      kind: 'out',
      text: "Type 'help' to see what I can do. Tab completes, ↑/↓ recall history.",
    },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  const run = (raw: string): Line[] => {
    const [cmd = '', ...args] = raw.trim().split(/\s+/);
    const arg = args.join(' ');
    const out = (text: string): Line => ({ kind: 'out', text });
    switch (cmd.toLowerCase()) {
      case '':
        return [];
      case 'help':
        return [
          out('whoami            who I am'),
          out('about             a short bio'),
          out('skills [group]    my stack, optionally one group'),
          out('projects          everything I have shipped'),
          out('open <project>    open a project in a new tab'),
          out('experience        where I have worked'),
          out('education         degree and certifications'),
          out('contact           ways to reach me'),
          out('resume            download my résumé'),
          out('ls / cd <page>    list and visit pages of this site'),
          out('neofetch          system info, résumé edition'),
          out('lang en|es        switch the site language'),
          out('clear             clear the screen'),
        ];
      case 'whoami':
        return [
          out(
            `${profile.name} (@${user}) — ${profile.roles[0]}, ${profile.location}`,
          ),
        ];
      case 'about':
        return (lang === 'es' ? CONFIG.es.about : profile.about).map(out);
      case 'skills': {
        const groups = [...new Set(CONFIG.skills.map((s) => s.category))];
        const pick = groups.filter(
          (g) => !arg || g.toLowerCase().startsWith(arg.toLowerCase()),
        );
        if (!pick.length)
          return [
            {
              kind: 'err',
              text: `no skill group '${arg}'. try: ${groups.join(', ')}`,
            },
          ];
        return pick.map((g) =>
          out(
            `${g.padEnd(18)} ${CONFIG.skills
              .filter((s) => s.category === g)
              .map((s) => s.name)
              .join(', ')}`,
          ),
        );
      }
      case 'projects':
        return [
          ...CONFIG.projects.map((p) =>
            out(`${slug(p.title).padEnd(30)} ${p.category}`),
          ),
          out("→ 'open <name>' to visit one"),
        ];
      case 'open': {
        const p = CONFIG.projects.find(
          (p) => slug(p.title).startsWith(slug(arg)) && arg,
        );
        if (!p)
          return [
            { kind: 'err', text: `usage: open <project>. try 'projects'` },
          ];
        window.open(p.link, '_blank', 'noopener');
        return [out(`opening ${p.link} …`)];
      }
      case 'experience':
        return CONFIG.experiences.flatMap((e) =>
          e.roles.map((r) =>
            out(
              `${`${r.from} – ${r.to}`.padEnd(22)} ${r.title} @ ${e.company}`,
            ),
          ),
        );
      case 'education':
        return [
          ...CONFIG.educations.map((e) =>
            out(`${e.degree}, ${e.institution} (${e.to})`),
          ),
          ...CONFIG.certifications.map((c) =>
            out(`★ ${c.name} — ${c.body}, ${c.date}`),
          ),
        ];
      case 'contact':
        return [
          out(`email     ${social.email}`),
          out(`phone     ${social.phone}`),
          out(`github    ${social.github}`),
          out(`linkedin  ${social.linkedin}`),
        ];
      case 'resume':
        window.open(profile.resumeUrl, '_blank', 'noopener');
        return [out('downloading résumé …')];
      case 'ls':
        return [out(PAGES.map((p) => `${p}/`).join('  '))];
      case 'cd': {
        const target = arg.replace(/^\/|\/$/g, '') || 'home';
        if (!PAGES.includes(target))
          return [{ kind: 'err', text: `cd: no such page: ${arg}` }];
        setTimeout(() => navigate(target === 'home' ? '/' : `/${target}`), 350);
        return [out(`→ /${target === 'home' ? '' : target}`)];
      }
      case 'neofetch':
        return [
          { kind: 'accent', text: `${user}@portfolio` },
          out('-----------------'),
          out(`Name:      ${profile.name}`),
          out(`Role:      ${profile.roles.join(' / ')}`),
          out(`Location:  ${profile.location}`),
          out(
            `Uptime:    ${yearsSince(profile.careerStart)}+ years shipping software`,
          ),
          out(`Projects:  ${CONFIG.projects.length}`),
          out(`Languages: ${CONFIG.languages.map((l) => l.name).join(', ')}`),
          out(`Shell:     react + vite + tailwind`),
        ];
      case 'lang':
        if (arg !== 'en' && arg !== 'es')
          return [{ kind: 'err', text: 'usage: lang en|es' }];
        setLang(arg);
        return [
          out(arg === 'es' ? 'idioma: español ✓' : 'language: english ✓'),
        ];
      case 'sudo':
        if (arg.replace(/\s/g, '') === 'hire-me' || arg === 'hire me') {
          setTimeout(() => navigate('/contact'), 600);
          return [
            {
              kind: 'accent',
              text: 'permission granted. redirecting to /contact …',
            },
          ];
        }
        return [
          {
            kind: 'err',
            text: `${user} is not in the sudoers file. try 'sudo hire-me'`,
          },
        ];
      case 'history':
        return history.map((h, i) => out(`${String(i + 1).padStart(3)}  ${h}`));
      case 'date':
        return [out(new Date().toString())];
      case 'echo':
        return [out(arg)];
      default:
        return [
          { kind: 'err', text: `command not found: ${cmd}. type 'help'` },
        ];
    }
  };

  const submit = () => {
    const value = input;
    if (value.trim().toLowerCase() === 'clear') {
      setLines([]);
    } else {
      setLines((ls) => [...ls, { kind: 'in', text: value }, ...run(value)]);
    }
    if (value.trim()) setHistory((h) => [...h, value]);
    setInput('');
    setCursor(-1);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
    else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown' && cursor >= 0) {
      e.preventDefault();
      const next = cursor + 1;
      setCursor(next >= history.length ? -1 : next);
      setInput(next >= history.length ? '' : history[next]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const [cmd, ...rest] = input.split(' ');
      if (!rest.length) {
        const match = COMMANDS.filter((c) => c.startsWith(cmd));
        if (match.length === 1) setInput(`${match[0]} `);
      } else {
        const pool =
          cmd === 'cd'
            ? PAGES
            : cmd === 'open'
              ? CONFIG.projects.map((p) => slug(p.title))
              : [];
        const match = pool.filter((p) => p.startsWith(rest.join(' ')));
        if (match.length === 1) setInput(`${cmd} ${match[0]}`);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const suggestions = [
    'help',
    'neofetch',
    'projects',
    'skills',
    'sudo hire-me',
  ];

  return (
    <div className="space-y-3">
      <div
        onClick={() => inputRef.current?.focus()}
        className="overflow-hidden rounded-2xl border border-white/15 bg-[#07100a]/95 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] text-forest-muted">
            {user} — zsh
          </span>
        </div>
        <div
          ref={scroller}
          className="h-[380px] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
        >
          {lines.map((l, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap break-words ${
                l.kind === 'err'
                  ? 'text-[#ff8a80]'
                  : l.kind === 'accent'
                    ? 'text-forest-warm'
                    : l.kind === 'in'
                      ? 'text-forest-text'
                      : 'text-forest-muted'
              }`}
            >
              {l.kind === 'in' && (
                <span className="text-[#7fd18b]">{prompt} </span>
              )}
              {l.text}
            </div>
          ))}
          <div className="flex items-center">
            <span className="shrink-0 text-[#7fd18b]">{prompt}&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label={t('Terminal input', 'Entrada de terminal')}
              className="min-w-0 flex-1 bg-transparent text-forest-text caret-forest-warm outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs text-forest-muted">
        {t('Try:', 'Prueba:')}
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setLines((ls) => [...ls, { kind: 'in', text: s }, ...run(s)]);
              setHistory((h) => [...h, s]);
            }}
            className="kbd hover:border-forest-muted"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
