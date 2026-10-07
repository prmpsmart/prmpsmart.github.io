import { createContext, useContext } from 'react';

export type Lang = 'en' | 'es';

export interface Settings {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Pick the string for the current language. */
  t: (en: string, es: string) => string;
  /** Cursor glow, magnetic buttons, and tilting cards. */
  effects: boolean;
  setEffects: (on: boolean) => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
}

export const SettingsContext = createContext<Settings>({
  lang: 'en',
  setLang: () => {},
  t: (en) => en,
  effects: true,
  setEffects: () => {},
  paletteOpen: false,
  setPaletteOpen: () => {},
});

export const useSettings = () => useContext(SettingsContext);
