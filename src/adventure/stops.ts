// The nine stops of the Adventure page, in order. `id` is the URL fragment
// (/explore#terminal). Components live in src/pages/Adventure.tsx.

export const STOPS = [
  {
    id: 'mobile',
    title: 'In your pocket',
    titleEs: 'En tu bolsillo',
    kicker: 'Mobile apps',
    kickerEs: 'Apps móviles',
    intro:
      'Three Flutter apps in production on the App Store. Pick one and tilt the phone with your cursor.',
    introEs:
      'Tres apps Flutter en producción en la App Store. Elige una e inclina el teléfono con el cursor.',
  },
  {
    id: 'desktop',
    title: 'On the desktop',
    titleEs: 'En el escritorio',
    kicker: 'Desktop software',
    kickerEs: 'Software de escritorio',
    intro:
      'Desktop tools I have built, as real windows. Drag them, stack them, maximize them, reopen them from the dock.',
    introEs:
      'Herramientas de escritorio que he creado, como ventanas reales. Arrástralas, apílalas, maximízalas y reábrelas desde el dock.',
  },
  {
    id: 'architecture',
    title: 'Under the hood',
    titleEs: 'Bajo el capó',
    kicker: 'System design',
    kickerEs: 'Diseño de sistemas',
    intro:
      'How the backends fit together. Packets move along each connection; click a box to see what it does.',
    introEs:
      'Cómo encajan los backends. Los paquetes viajan por cada conexión; haz clic en una caja para ver qué hace.',
  },
  {
    id: 'terminal',
    title: 'Talk to the shell',
    titleEs: 'Habla con la terminal',
    kicker: 'Interactive terminal',
    kickerEs: 'Terminal interactiva',
    intro:
      'My résumé as a command line. Start with help, or go straight to sudo hire-me.',
    introEs:
      'Mi currículum como línea de comandos. Empieza con help, o ve directo a sudo hire-me.',
  },
  {
    id: 'shortcuts',
    title: 'The shortcut',
    titleEs: 'El atajo',
    kicker: 'Command menu',
    kickerEs: 'Menú de comandos',
    intro:
      'Press ⌘K (Ctrl+K on Windows) anywhere on this site to jump to any page, project, or action.',
    introEs:
      'Pulsa ⌘K (Ctrl+K en Windows) en cualquier parte del sitio para saltar a cualquier página, proyecto o acción.',
  },
  {
    id: 'bilingual',
    title: 'Two languages',
    titleEs: 'Dos idiomas',
    kicker: 'English · Español',
    kickerEs: 'English · Español',
    intro:
      'I work in English and Spanish, and I have shipped software localized into five languages. Switch the whole site here.',
    introEs:
      'Trabajo en inglés y español, y he lanzado software localizado en cinco idiomas. Cambia todo el sitio aquí.',
  },
  {
    id: 'case-studies',
    title: 'Case files',
    titleEs: 'Expedientes',
    kicker: 'Case studies',
    kickerEs: 'Casos de estudio',
    intro:
      'The context, the challenge, and what I built, for four projects I am proud of.',
    introEs:
      'El contexto, el reto y lo que construí, en cuatro proyectos de los que estoy orgulloso.',
  },
  {
    id: 'pulse',
    title: 'The pulse',
    titleEs: 'El pulso',
    kicker: 'Live from GitHub',
    kickerEs: 'En vivo desde GitHub',
    intro:
      'A year of commits, the languages I write most, and what I pushed recently, fetched live.',
    introEs:
      'Un año de commits, los lenguajes que más uso y lo último que he subido, en vivo.',
  },
  {
    id: 'feel',
    title: 'The feel',
    titleEs: 'La sensación',
    kicker: 'Micro-interactions',
    kickerEs: 'Microinteracciones',
    intro:
      'The small details running across this site: a cursor glow, magnetic buttons, and cards that tilt toward you.',
    introEs:
      'Los pequeños detalles de todo el sitio: un brillo que sigue al cursor, botones magnéticos y tarjetas que se inclinan hacia ti.',
  },
] as const;

export type StopId = (typeof STOPS)[number]['id'];
