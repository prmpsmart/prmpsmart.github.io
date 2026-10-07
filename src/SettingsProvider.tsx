import { useEffect, useState } from 'react';
import { Lang, SettingsContext } from './settings-context';
import { load, save } from './storage';

const browserLang = (): Lang =>
  navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(() =>
    load<Lang>('lang', browserLang()),
  );
  const [effects, setEffectsState] = useState<boolean>(() =>
    load('effects', true),
  );
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // ⌘K / Ctrl+K opens the command palette anywhere on the site.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    save('lang', l);
  };
  const setEffects = (on: boolean) => {
    setEffectsState(on);
    save('effects', on);
  };

  return (
    <SettingsContext.Provider
      value={{
        lang,
        setLang,
        t: (en, es) => (lang === 'es' ? es : en),
        effects,
        setEffects,
        paletteOpen,
        setPaletteOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
