import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import CONFIG from '../../portfolio.config';
import { useTilt } from '../effects';
import { useSettings } from '../settings-context';

type App = (typeof CONFIG.mobileApps)[number];

function Phone({ app }: { app: App }) {
  const [shot, setShot] = useState(0);
  const tilt = useTilt<HTMLDivElement>(14);

  useEffect(() => {
    setShot(0);
    const id = setInterval(
      () => setShot((s) => (s + 1) % app.screenshots.length),
      3200,
    );
    return () => clearInterval(id);
  }, [app]);

  return (
    <div
      ref={tilt}
      className="tilt mx-auto w-[240px] rounded-[2.6rem] sm:w-[260px]"
    >
      <div className="relative rounded-[2.6rem] border border-white/25 bg-[#0b120d] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.55),inset_0_0_0_2px_rgba(255,255,255,0.06)]">
        <div className="absolute left-1/2 top-5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative aspect-[460/996] overflow-hidden rounded-[2rem] bg-black">
          {app.screenshots.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${app.name} screen ${i + 1}`}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                i === shot ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-1.5">
        {app.screenshots.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Screen ${i + 1}`}
            onClick={() => setShot(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === shot ? 'w-6 bg-forest-warm' : 'w-1.5 bg-forest-muted/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function MobileShowcase() {
  const { t } = useSettings();
  const apps = CONFIG.mobileApps;
  const [active, setActive] = useState(0);
  const app = apps[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {apps.map((a, i) => (
            <button
              key={a.name}
              type="button"
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm transition ${
                i === active
                  ? 'bg-forest-muted text-forest-bg'
                  : 'glass text-forest-text hover:bg-[var(--glass-strong)]'
              }`}
            >
              <img src={a.icon} alt="" className="h-7 w-7 rounded-lg" />
              {a.name}
            </button>
          ))}
        </div>

        <div key={app.name} className="page-enter space-y-4">
          <div>
            <h3 className="font-display text-3xl font-semibold text-forest-text">
              {app.name}
            </h3>
            <p className="mt-1 text-forest-muted">{app.tagline}</p>
          </div>
          <ul className="space-y-2">
            {app.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-forest-text/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-warm" />
                {h}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {app.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#B6C7AA40] px-2.5 py-0.5 text-[11px] text-forest-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={app.appStore}
              target="_blank"
              rel="noreferrer"
              className="chip"
            >
              <FaApple /> App Store
            </a>
            {'playStore' in app && (
              <a
                href={app.playStore}
                target="_blank"
                rel="noreferrer"
                className="chip"
              >
                <FaGooglePlay /> Google Play
              </a>
            )}
            <a
              href={app.website}
              target="_blank"
              rel="noreferrer"
              className="chip"
            >
              <FiExternalLink /> {t('Website', 'Sitio web')}
            </a>
          </div>
        </div>
      </div>

      <Phone app={app} />
    </div>
  );
}
