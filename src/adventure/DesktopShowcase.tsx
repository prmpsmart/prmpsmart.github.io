import { PointerEvent, useEffect, useRef, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import CONFIG from '../../portfolio.config';
import { useSettings } from '../settings-context';

interface Win {
  x: number;
  y: number;
  z: number;
  open: boolean;
  max: boolean;
}

const START: Pick<Win, 'x' | 'y'>[] = [
  { x: 2, y: 4 },
  { x: 54, y: 6 },
  { x: 16, y: 34 },
  { x: 44, y: 30 },
];

export default function DesktopShowcase() {
  const { t } = useSettings();
  const apps = CONFIG.desktopApps;
  const outer = useRef<HTMLDivElement>(null);
  const area = useRef<HTMLDivElement>(null);
  const drag = useRef<{ i: number; dx: number; dy: number } | null>(null);
  const [wins, setWins] = useState<Win[]>(() =>
    apps.map((_, i) => ({
      ...START[i % START.length],
      z: i + 1,
      open: true,
      max: false,
    })),
  );
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setNarrow(e.contentRect.width < 720),
    );
    ro.observe(el);
    return () => ro.disconnect();
    // The wrapper element changes when the layout switches, so re-observe.
  }, [narrow]);

  const top = Math.max(...wins.map((w) => w.z));
  const update = (i: number, patch: Partial<Win>) =>
    setWins((ws) => ws.map((w, j) => (j === i ? { ...w, ...patch } : w)));
  const focus = (i: number) => update(i, { z: top + 1, open: true });

  const onDown = (i: number, e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    const rect = area.current!.getBoundingClientRect();
    const w = wins[i];
    drag.current = {
      i,
      dx: e.clientX - (rect.left + (w.x / 100) * rect.width),
      dy: e.clientY - (rect.top + (w.y / 100) * rect.height),
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    focus(i);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const rect = area.current!.getBoundingClientRect();
    const x = ((e.clientX - d.dx - rect.left) / rect.width) * 100;
    const y = ((e.clientY - d.dy - rect.top) / rect.height) * 100;
    update(d.i, {
      x: Math.min(70, Math.max(-10, x)),
      y: Math.min(75, Math.max(0, y)),
    });
  };
  const onUp = () => (drag.current = null);

  const frame = (i: number, body: React.ReactNode, draggable: boolean) => {
    const app = apps[i];
    const w = wins[i];
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/20 bg-[#101c14]/95 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div
          onPointerDown={draggable ? (e) => onDown(i, e) : undefined}
          onPointerMove={draggable ? onMove : undefined}
          onPointerUp={draggable ? onUp : undefined}
          onDoubleClick={
            draggable ? () => update(i, { max: !w.max }) : undefined
          }
          className={`flex shrink-0 items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2 ${
            draggable
              ? 'cursor-grab touch-none select-none active:cursor-grabbing'
              : ''
          }`}
        >
          <button
            type="button"
            aria-label={t('Close', 'Cerrar')}
            onClick={() => update(i, { open: false, max: false })}
            className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-110"
          />
          <button
            type="button"
            aria-label={t('Minimize', 'Minimizar')}
            onClick={() => update(i, { open: false, max: false })}
            className="h-3 w-3 rounded-full bg-[#febc2e] hover:brightness-110"
          />
          <button
            type="button"
            aria-label={t('Maximize', 'Maximizar')}
            onClick={() => (draggable ? update(i, { max: !w.max }) : undefined)}
            className="h-3 w-3 rounded-full bg-[#28c840] hover:brightness-110"
          />
          <span className="ml-2 truncate font-mono text-[11px] text-forest-muted">
            {app.name}
          </span>
          <a
            href={app.link}
            target="_blank"
            rel="noreferrer"
            aria-label={t('Open project', 'Abrir proyecto')}
            className="ml-auto text-forest-muted hover:text-forest-warm"
          >
            <FiExternalLink size={13} />
          </a>
        </div>
        {body}
        <p className="shrink-0 border-t border-white/10 px-3 py-2 text-[11px] text-forest-muted">
          {app.caption}
        </p>
      </div>
    );
  };

  if (narrow)
    return (
      <div ref={outer} className="grid gap-4">
        {apps.map((app, i) => (
          <div key={app.name} className="h-72">
            {frame(
              i,
              <img
                src={app.image}
                alt={app.name}
                loading="lazy"
                className="min-h-0 flex-1 bg-white/5 object-contain"
              />,
              false,
            )}
          </div>
        ))}
      </div>
    );

  return (
    <div ref={outer}>
      <div
        ref={area}
        className="relative h-[560px] overflow-hidden rounded-2xl border border-white/15 bg-[radial-gradient(ellipse_at_30%_20%,#2a4a35,#0b170f_70%)]"
      >
        <p className="pointer-events-none absolute right-5 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-forest-muted/50">
          {t(
            'drag · double-click to maximize',
            'arrastra · doble clic para maximizar',
          )}
        </p>
        {apps.map((app, i) => {
          const w = wins[i];
          if (!w.open) return null;
          return (
            <div
              key={app.name}
              onPointerDown={() => focus(i)}
              className="absolute transition-[width,height] duration-300"
              style={
                w.max
                  ? {
                      left: '2%',
                      top: '3%',
                      width: '96%',
                      height: '82%',
                      zIndex: 100,
                    }
                  : {
                      left: `${w.x}%`,
                      top: `${w.y}%`,
                      width: '42%',
                      height: '54%',
                      zIndex: w.z,
                    }
              }
            >
              {frame(
                i,
                <img
                  src={app.image}
                  alt={app.name}
                  loading="lazy"
                  draggable={false}
                  className="min-h-0 flex-1 bg-white/5 object-contain"
                />,
                true,
              )}
            </div>
          );
        })}

        {/* Dock */}
        <div className="absolute bottom-3 left-1/2 z-[200] flex -translate-x-1/2 gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md">
          {apps.map((app, i) => (
            <button
              key={app.name}
              type="button"
              title={app.name}
              onClick={() => focus(i)}
              className="group relative flex h-11 w-11 items-center justify-center rounded-xl bg-forest-elevated font-display text-sm font-bold text-forest-warm transition hover:-translate-y-1.5"
            >
              {app.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
              {wins[i].open && (
                <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-forest-warm" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
