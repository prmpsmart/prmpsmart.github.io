// portfolio.config.ts
// All of the site's content lives here. Edit this file to change what the site says.

export type SkillCategory =
  | 'Languages'
  | 'Backend'
  | 'Mobile & Desktop'
  | 'Data'
  | 'DevOps & Tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Devicon slug, e.g. 'python/python-original'. See https://devicon.dev */
  icon?: string;
  /** Official website; the skill tile links here. */
  url?: string;
}

export type ProjectCategory = 'Mobile' | 'Backend' | 'Desktop' | 'Open source';

export interface Project {
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  /** Live site or repository link. */
  link: string;
  /** Optional preview image. GitHub repos get their social card automatically; live sites get a screenshot. */
  image?: string;
  featured?: boolean;
  /** Shown as a badge on the card, e.g. for work that is not yet released. */
  status?: string;
}

export interface Experience {
  company: string;
  companyLink?: string;
  location: string;
  roles: { title: string; from: string; to: string }[];
  highlights: string[];
}

/** Résumés live in this repo; the site links to them instead of hosting copies. */
const RESUME_REPO = 'https://github.com/prmpsmart/miracle-apata-resumes';

const CONFIG = {
  base: '/',
  siteUrl: 'https://prmpsmart.github.io',

  profile: {
    name: 'Miracle Apata',
    handle: 'prmpsmart',
    githubUsername: 'prmpsmart',
    location: 'Akure, Nigeria (remote)',
    availableForWork: true,
    /** First month of professional work, used for the "years" stat. */
    careerStart: '2023-08',
    /** Rotating lines typed out under the name on the home page. */
    roles: [
      'Software Engineer',
      'Backend Engineer',
      'Mobile Engineer',
      'Desktop Engineer',
    ],
    intro:
      'I design full platforms end to end: scalable APIs and real-time systems, Flutter mobile apps, and cross-platform desktop software used by schools, fintechs, and estates.',
    /** Shown on the About page. One string per paragraph. */
    about: [
      "I'm Miracle Apata, known online as prmpsmart. I'm a software engineer who moves fluidly across backend, mobile, and desktop development rather than staying boxed into one lane. I started programming with Python, teaching myself after a CSC 201 course in 2018/2019. At Jodna Technologies, a young software company founded by a friend, I joined early, started out owning the backend, and now also lead mobile (mostly Flutter) across client projects.",
      'My work spans FastAPI, Node.js, and NestJS for backend systems, Flutter for cross-platform mobile apps, and PySide6 and SwiftUI for native desktop experiences. I build production software used by educational institutions, fintech platforms, and estate communities.',
      'I care about software that solves the real problem, not just the ticket; stays readable as it grows; handles edge cases and failure without drama; and performs well on every platform it targets.',
    ],
    /** Defaults to your GitHub avatar. Drop a photo in /public and set e.g. '/me.jpg'. */
    photo: '',
    /** Full-screen background photo behind every page. Defaults to `photo`. */
    backgroundImage: '',
    /** e.g. a Calendly link. Leave empty to show "Hire me" pointing to the contact page. */
    meetingUrl: '',
    resumeUrl: `${RESUME_REPO}/raw/main/pdfs/Miracle-Apata-Software-Engineer.pdf`,
  },

  /** Role-specific résumés (PDF + Markdown) in the résumé repo. */
  resumes: [
    { role: 'Software Engineer', file: 'software-engineer' },
    { role: 'Mobile Engineer', file: 'mobile-engineer' },
    { role: 'Backend Engineer', file: 'backend-engineer' },
    { role: 'Python Engineer', file: 'python-engineer' },
    { role: 'Desktop Engineer', file: 'desktop-engineer' },
  ].map((r) => ({
    role: r.role,
    pdf: `${RESUME_REPO}/raw/main/pdfs/Miracle-Apata-${r.file
      .split('-')
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join('-')}.pdf`,
    markdown: `${RESUME_REPO}/blob/main/resumes/${r.file}.md`,
  })),

  social: {
    email: 'prmpsmart@gmail.com',
    phone: '+2348168524477',
    github: 'https://github.com/prmpsmart',
    linkedin: 'https://www.linkedin.com/in/prmpsmart',
  },

  focusAreas: [
    {
      title: 'Backend systems',
      body: 'Scalable APIs with authentication, RBAC, analytics, and event-driven services, built with FastAPI, Node.js, and NestJS.',
    },
    {
      title: 'Real-time mobile',
      body: 'Flutter apps with live location, Socket.IO chat, push notifications, payments, and one-tap emergency alerts.',
    },
    {
      title: 'Desktop software',
      body: 'Cross-platform PySide6 and native SwiftUI apps, packaged with PyInstaller and Inno Setup for Windows and macOS.',
    },
    {
      title: 'End-to-end ownership',
      body: 'From database schema and CI/CD to the client app: whole platforms designed, shipped, and maintained.',
    },
  ],

  whatIDo: [
    {
      title: 'Backend',
      body: 'FastAPI, Django, Flask, Node.js, Express, NestJS, ASP.NET; REST, WebSockets, microservices, and multi-tenant systems.',
    },
    {
      title: 'Mobile',
      body: 'Flutter (primary) with GetX, Socket.IO, Google Maps, Firebase Cloud Messaging, and Paystack, plus Kotlin, Swift, and React Native.',
    },
    {
      title: 'Desktop',
      body: 'PySide6 / Qt and SwiftUI apps, localized into five languages and used by academic institutions.',
    },
    {
      title: 'Infrastructure',
      body: 'Docker, GitHub Actions, AWS, Linux, Nginx, and PM2, with JWT, OAuth2, and RBAC security.',
    },
  ],

  skills: [
    {
      name: 'Python',
      url: 'https://www.python.org',
      category: 'Languages',
      icon: 'python/python-original',
    },
    {
      name: 'TypeScript',
      url: 'https://www.typescriptlang.org',
      category: 'Languages',
      icon: 'typescript/typescript-original',
    },
    {
      name: 'JavaScript',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      category: 'Languages',
      icon: 'javascript/javascript-original',
    },
    {
      name: 'Dart',
      url: 'https://dart.dev',
      category: 'Languages',
      icon: 'dart/dart-original',
    },
    {
      name: 'Swift',
      url: 'https://www.swift.org',
      category: 'Languages',
      icon: 'swift/swift-original',
    },
    {
      name: 'C#',
      url: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
      category: 'Languages',
      icon: 'csharp/csharp-original',
    },
    {
      name: 'Kotlin',
      url: 'https://kotlinlang.org',
      category: 'Languages',
      icon: 'kotlin/kotlin-original',
    },
    {
      name: 'C',
      url: 'https://en.cppreference.com/w/c',
      category: 'Languages',
      icon: 'c/c-original',
    },
    {
      name: 'C++',
      url: 'https://isocpp.org',
      category: 'Languages',
      icon: 'cplusplus/cplusplus-original',
    },
    {
      name: 'OCaml',
      url: 'https://ocaml.org',
      category: 'Languages',
      icon: 'ocaml/ocaml-original',
    },
    {
      name: 'FastAPI',
      url: 'https://fastapi.tiangolo.com',
      category: 'Backend',
      icon: 'fastapi/fastapi-original',
    },
    {
      name: 'Django',
      url: 'https://www.djangoproject.com',
      category: 'Backend',
      icon: 'django/django-plain',
    },
    {
      name: 'Flask',
      url: 'https://flask.palletsprojects.com',
      category: 'Backend',
      icon: 'flask/flask-original',
    },
    {
      name: 'Node.js',
      url: 'https://nodejs.org',
      category: 'Backend',
      icon: 'nodejs/nodejs-original',
    },
    {
      name: 'Express',
      url: 'https://expressjs.com',
      category: 'Backend',
      icon: 'express/express-original',
    },
    {
      name: 'NestJS',
      url: 'https://nestjs.com',
      category: 'Backend',
      icon: 'nestjs/nestjs-original',
    },
    {
      name: 'ASP.NET',
      url: 'https://dotnet.microsoft.com/en-us/apps/aspnet',
      category: 'Backend',
      icon: 'dotnetcore/dotnetcore-original',
    },
    {
      name: 'Socket.IO',
      url: 'https://socket.io',
      category: 'Backend',
      icon: 'socketio/socketio-original',
    },
    {
      name: 'Flutter',
      url: 'https://flutter.dev',
      category: 'Mobile & Desktop',
      icon: 'flutter/flutter-original',
    },
    {
      name: 'React Native',
      url: 'https://reactnative.dev',
      category: 'Mobile & Desktop',
      icon: 'react/react-original',
    },
    {
      name: 'PySide6 / Qt',
      url: 'https://doc.qt.io/qtforpython-6/',
      category: 'Mobile & Desktop',
      icon: 'qt/qt-original',
    },
    {
      name: 'SwiftUI',
      url: 'https://developer.apple.com/xcode/swiftui/',
      category: 'Mobile & Desktop',
      icon: 'swift/swift-original',
    },
    {
      name: 'Firebase',
      url: 'https://firebase.google.com',
      category: 'Mobile & Desktop',
      icon: 'firebase/firebase-original',
    },
    {
      name: 'PostgreSQL',
      url: 'https://www.postgresql.org',
      category: 'Data',
      icon: 'postgresql/postgresql-original',
    },
    {
      name: 'MongoDB',
      url: 'https://www.mongodb.com',
      category: 'Data',
      icon: 'mongodb/mongodb-original',
    },
    {
      name: 'MySQL',
      url: 'https://www.mysql.com',
      category: 'Data',
      icon: 'mysql/mysql-original',
    },
    {
      name: 'Redis',
      url: 'https://redis.io',
      category: 'Data',
      icon: 'redis/redis-original',
    },
    {
      name: 'Docker',
      url: 'https://www.docker.com',
      category: 'DevOps & Tools',
      icon: 'docker/docker-original',
    },
    {
      name: 'GitHub Actions',
      url: 'https://github.com/features/actions',
      category: 'DevOps & Tools',
      icon: 'githubactions/githubactions-original',
    },
    {
      name: 'AWS',
      url: 'https://aws.amazon.com',
      category: 'DevOps & Tools',
      icon: 'amazonwebservices/amazonwebservices-plain-wordmark',
    },
    {
      name: 'Linux',
      url: 'https://www.kernel.org',
      category: 'DevOps & Tools',
      icon: 'linux/linux-original',
    },
    {
      name: 'Nginx',
      url: 'https://nginx.org',
      category: 'DevOps & Tools',
      icon: 'nginx/nginx-original',
    },
    {
      name: 'Pytest',
      url: 'https://docs.pytest.org',
      category: 'DevOps & Tools',
      icon: 'pytest/pytest-original',
    },
    {
      name: 'Jest',
      url: 'https://jestjs.io',
      category: 'DevOps & Tools',
      icon: 'jest/jest-plain',
    },
    {
      name: 'Postman',
      url: 'https://www.postman.com',
      category: 'DevOps & Tools',
      icon: 'postman/postman-original',
    },
  ] as Skill[],

  projects: [
    {
      title: 'Vaultify',
      description:
        'Smart estate management app: pay dues, generate visitor access codes, send emergency alerts, top up wallets and pay bills via Paystack, and chat with estate security.',
      category: 'Mobile',
      tags: ['Flutter', 'GetX', 'Socket.IO', 'Paystack'],
      link: 'https://vaultify.africa',
      featured: true,
    },
    {
      title: 'Tywn (formerly TrackWeNg)',
      description:
        'Real-time safety and location-sharing app: live location with trusted contacts, group "Cliques" chat, one-tap emergency alerts, background geolocation, and a home-screen widget.',
      category: 'Mobile',
      tags: ['Flutter', 'Socket.IO', 'Google Maps', 'FCM'],
      link: 'https://home.twynapp.org/',
      featured: true,
    },
    {
      title: 'piXeval',
      description:
        'Desktop exam-correction suite used by academic institutions: automated scanning and grading up to 30 exams per minute, Word/Excel/Moodle import, and statistics. Localized into five languages, with a native macOS build. Click through the interactive web preview of the redesigned interface.',
      category: 'Desktop',
      tags: ['PySide6', 'SwiftUI', 'PyInstaller', 'Inno Setup'],
      link: 'https://prmpsmart.github.io/pixeval_web/',
      image:
        'https://raw.githubusercontent.com/prmpsmart/pixeval_web/HEAD/docs/screenshots/home.jpg',
      featured: true,
    },
    {
      title: 'Jorly Mobile',
      description:
        'Flutter app for a travel booking platform: flights, hotels and car rentals in one account, with Paystack and Flutterwave checkout, push notifications, and Google and Apple sign-in. Cubit state management, typed Either-based repositories.',
      category: 'Mobile',
      tags: ['Flutter', 'Cubit', 'Firebase', 'Paystack'],
      link: 'https://dev.flyjorly.com',
      image: '/apps/jorly-1.jpg',
      status: 'In development',
    },
    {
      title: 'Jorly API',
      description:
        'FastAPI backend for the Jorly travel platform: search and pricing through the Wakanow affiliate API, Paystack and Flutterwave payments, group travel, JWT auth, Celery jobs and Redis-backed search sessions.',
      category: 'Backend',
      tags: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery'],
      link: 'https://dev.flyjorly.com',
      image: '/apps/jorly-1.jpg',
      status: 'In development',
    },
    {
      title: 'OxyTrack',
      description:
        'Oxygen cylinder inventory and facility management app for HealthPort Africa: full cylinder lifecycle tracking, QR and NFC identification, role-based facility modules, and audit workflows.',
      category: 'Mobile',
      tags: ['Flutter', 'BLoC', 'NFC', 'QR'],
      link: 'https://healthportafrica.com',
    },
    {
      title: 'Sentinel',
      description:
        'Smart community access management: digital visitor registration and QR check-in/out for estates, offices, and schools, with scoped sub-profiles and real-time announcements.',
      category: 'Mobile',
      tags: ['Flutter', 'Socket.IO', 'FCM', 'QR'],
      link: 'https://sentinelsoftware.live',
    },
    {
      title: 'PDF Webpage',
      description:
        'Backend for a student document-sharing platform: PDF uploads, course categorization, and notifications.',
      category: 'Backend',
      tags: ['Node.js', 'MongoDB'],
      link: 'https://pdf-webpage-ashy.vercel.app',
    },
    {
      title: 'SnapGrade',
      description:
        'Desktop app for generating, scanning, and grading multiple-choice exam sheets via OMR, with Excel roster import and results export. PySide6 + OpenCV with a token-based theming system.',
      category: 'Open source',
      tags: ['PySide6', 'OpenCV', 'openpyxl'],
      link: 'https://github.com/prmpsmart/snapgrade',
      image:
        'https://raw.githubusercontent.com/prmpsmart/snapgrade/HEAD/docs/screenshots/generate-preview.png',
    },
    {
      title: 'AudioWave',
      description:
        'A Qt-free NumPy audio core (WAV/MP3 loading, BS.1770 loudness, spectra, editing) under Qt widgets and playback, plus AudioWave Studio for recording, comparing, editing, and streaming audio.',
      category: 'Open source',
      tags: ['Python', 'NumPy', 'PySide6'],
      link: 'https://github.com/prmpsmart/audiowave',
      image:
        'https://raw.githubusercontent.com/prmpsmart/audiowave/main/docs/media/audiowave-tour.gif',
    },
    {
      title: 'Price Grid',
      description:
        'FastAPI + PostgreSQL + Redis backend: repository pattern, decoupled pub/sub alert pipeline, write-through cache invalidation, append-only price records, and RBAC. Unit and integration tested.',
      category: 'Open source',
      tags: ['FastAPI', 'PostgreSQL', 'Redis', 'SQLModel'],
      link: 'https://github.com/prmpsmart/price-grid',
    },
    {
      title: 'Flutter Video Call',
      description:
        'Flutter WebRTC client with full peer-to-peer signaling over Socket.IO: offer/answer, ICE negotiation, and call state management via GetX.',
      category: 'Open source',
      tags: ['Flutter', 'WebRTC', 'Socket.IO'],
      link: 'https://github.com/prmpsmart/prmpsmart_videocall',
    },
    {
      title: 'Qt Material Widgets',
      description:
        'A Python port of qt-material-widgets: Material Design components for PySide/PyQt.',
      category: 'Open source',
      tags: ['Python', 'Qt'],
      link: 'https://github.com/prmpsmart/qt-material-widgets',
    },
  ] as Project[],

  experiences: [
    {
      company: 'Jorly',
      companyLink: 'https://dev.flyjorly.com',
      location: 'Remote',
      roles: [
        { title: 'Mobile Engineer (Contract)', from: 'May 2026', to: 'Present' },
        { title: 'Backend Engineer (Contract)', from: 'May 2026', to: 'Present' },
      ],
      highlights: [
        'Building the Jorly travel-booking platform (flights, hotels, car rentals): a Flutter app and a FastAPI backend, currently in development.',
        'Backend: provider search and pricing, Paystack and Flutterwave payments, group travel, JWT auth, and Celery background jobs on PostgreSQL and Redis.',
        'Mobile: Cubit state management, typed Either-based repositories, FCM push, and Google and Apple sign-in.',
      ],
    },
    {
      company: 'Jodna Technologies',
      companyLink: 'https://jodnatechnologies.com',
      location: 'Port Harcourt, Nigeria (Remote)',
      roles: [
        { title: 'Senior Mobile Engineer', from: 'Dec 2024', to: 'Present' },
        { title: 'Backend Engineer', from: 'Dec 2024', to: 'Present' },
      ],
      highlights: [
        'Joined as an early member of a young software company delivering client projects: started by owning all backend work, then took on mobile alongside it.',
        'Led mobile development of three production Flutter apps: Vaultify, Sentinel, and Tywn.',
        'Led backend architecture for mobile and web platforms using FastAPI and Node.js.',
        'Designed scalable APIs for authentication, role-based access control, and analytics.',
        'Implemented real-time notifications, push messaging, and event-driven services.',
        'Mentored junior developers and raised backend engineering standards.',
      ],
    },
    {
      company: 'Zent Technologies Limited',
      companyLink: 'https://joinzent.com',
      location: 'Lagos, Nigeria (Remote)',
      roles: [
        {
          title: 'Mobile Engineer (Contract)',
          from: 'Mar 2025',
          to: 'Jul 2025',
        },
      ],
      highlights: [
        'Developed and maintained the Zent mobile app in Flutter for Android and iOS.',
        'Integrated backend services for real-time order tracking, inventory management, and payment workflows.',
      ],
    },
    {
      company: 'Sofgo',
      companyLink: 'https://sofgo.io',
      location: 'Ondo, Nigeria (Remote)',
      roles: [
        { title: 'Mobile Engineer', from: 'Sep 2023', to: 'Sep 2024' },
        { title: 'Backend Engineer', from: 'Sep 2023', to: 'Sep 2024' },
      ],
      highlights: [
        'Developed REST APIs for logistics and e-commerce platforms using Django and Node.js.',
        'Implemented payment gateways, authentication, and backend services alongside the mobile team.',
        'Built and maintained production Flutter apps for Android and iOS.',
      ],
    },
    {
      company: 'DINATEN',
      companyLink: 'https://dinaten.com',
      location: 'Santa Cruz de Tenerife, Spain (Remote)',
      roles: [
        { title: 'Desktop Software Engineer', from: 'Aug 2023', to: 'Present' },
      ],
      highlights: [
        'Develop and maintain piXeval and pixEBAP, exam-correction apps used by academic institutions.',
        'Built cross-platform PySide6 apps and a native macOS version of piXeval in SwiftUI.',
        'Implemented OCR/OMR answer-sheet scanning and grading with OpenCV2 and TensorFlow.',
        'Localized the apps into Catalan, Spanish, English, Euskera, and French.',
        'Sole developer of the in-progress piXeval rebuild: a Qt-free Python engine, a FastAPI backend, a React + TypeScript UI, and Qt WebEngine / pywebview shells, including a modular rewrite of the sheet-generation scripts supplied by the product owner.',
      ],
    },
    {
      company: 'Freelance',
      location: 'Remote',
      roles: [
        { title: 'Freelance Software Developer', from: '2020', to: 'Present' },
      ],
      highlights: [
        'Delivered backend APIs, automation scripts, and data-processing tools for clients in Nigeria and internationally.',
      ],
    },
  ] as Experience[],

  educations: [
    {
      institution: 'Federal University of Technology, Akure',
      degree: 'B.Eng. in Electrical & Electronics Engineering',
      to: '2024',
    },
  ],

  certifications: [
    {
      name: 'Python Developer Certification',
      body: 'freeCodeCamp · ~300 hours',
      date: 'Jul 2026',
      link: 'https://www.freecodecamp.org/certification/prmpsmart/python-v9',
      image: '/recognition/python-certification.png',
    },
    {
      name: 'Outstanding Technical Contribution',
      body: 'TrackWeNg (now Tywn), Certificate of Recognition',
      date: 'Dec 2025',
      link: 'https://home.twynapp.org/',
      image: '/recognition/trackweng-award.jpg',
    },
  ],

  languages: [
    { name: 'English', level: 'Fluent (C1)' },
    { name: 'Spanish', level: 'Conversational (B1)' },
  ],

  publications: [
    {
      title:
        'Blast Design Using Artificial Neural Network Approach and Langefors-Kihlstrom Bench Blast Model',
      authors:
        'Prof. Saliu M. A., Ogunyemi O. B., Akinlosose V. J., Apata M. P.',
      link: 'https://www.academia.edu/104693441/BLAST_DESIGN_USING_ARTIFICIAL_NEURAL_NETWORK_APPROACH_AND_LANGEFORS_KIHLSTROM_BENCH_BLAST_MODEL',
      description:
        'Improves blast design efficiency by combining the Langefors-Kihlstrom model with artificial neural networks, accounting for rock strength and structural properties of a sedimentary limestone deposit at the Dangote Cement Ibese mine site.',
    },
  ],

  /** Phone showcase on the Adventure page, in display order. */
  mobileApps: [
    {
      name: 'Vaultify',
      tagline: 'Smart estate management',
      icon: '/apps/vaultify-1.jpg',
      screenshots: [
        '/apps/vaultify-2.jpg',
        '/apps/vaultify-3.jpg',
        '/apps/vaultify-4.jpg',
        '/apps/vaultify-5.jpg',
      ],
      highlights: [
        'Wallet and bill payments (airtime, data, cable, electricity) via Paystack',
        'QR virtual IDs and access codes verified by security at the gate',
        'Real-time private chat between residents and estate security',
        'Push notifications for announcements, alerts, and transactions',
      ],
      stack: ['Flutter', 'GetX', 'Socket.IO', 'Paystack', 'FCM'],
      appStore:
        'https://apps.apple.com/ng/app/vaultify-estate-app/id6751677794',
      website: 'https://vaultify.africa',
    },
    {
      name: 'Tywn',
      tagline: 'Real-time safety & location sharing',
      icon: '/apps/tywn-1.jpg',
      screenshots: [
        '/apps/tywn-2.jpg',
        '/apps/tywn-3.jpg',
        '/apps/tywn-4.jpg',
        '/apps/tywn-5.jpg',
      ],
      highlights: [
        'Live location sharing with trusted contacts',
        'Group "Cliques" chat over Socket.IO',
        'One-tap emergency alerts and a home-screen widget',
        'Background geolocation tracking',
      ],
      stack: ['Flutter', 'Socket.IO', 'Google Maps', 'FCM'],
      appStore:
        'https://apps.apple.com/us/app/tywn-formerly-trackweng/id6741412135',
      playStore: 'https://play.google.com/store/apps/details?id=com.wetrack.ng',
      website: 'https://home.twynapp.org/',
    },
    {
      name: 'Sentinel',
      tagline: 'Access management for gated communities',
      icon: '/apps/sentinel-1.jpg',
      screenshots: [
        '/apps/sentinel-2.jpg',
        '/apps/sentinel-3.jpg',
        '/apps/sentinel-4.jpg',
        '/apps/sentinel-5.jpg',
      ],
      highlights: [
        'Digital visitor registration and QR check-in/check-out',
        'Sub-profiles with scoped access for dependents',
        'Real-time announcements, broadcasts, and activity logs',
      ],
      stack: ['Flutter', 'Socket.IO', 'FCM', 'QR'],
      appStore:
        'https://apps.apple.com/us/app/sentinel-acess-management/id6758545811',
      website: 'https://sentinelsoftware.live',
    },
  ],

  /** Draggable windows on the Adventure page's desktop. */
  desktopApps: [
    {
      name: 'piXeval',
      caption: 'Exam correction for academic institutions · PySide6 + SwiftUI',
      image:
        'https://dinaten.com/wp-content/uploads/2024/09/inicioSesion01.png',
      link: 'https://dinaten.com/pixeval-v7/',
    },
    {
      name: 'AudioWave Studio',
      caption: 'Record, compare, edit, and stream audio · NumPy + PySide6',
      image:
        'https://raw.githubusercontent.com/prmpsmart/audiowave/main/docs/media/audiowave-tour.gif',
      link: 'https://github.com/prmpsmart/audiowave',
    },
    {
      name: 'SnapGrade',
      caption: 'Generate and grade OMR exam sheets · PySide6 + OpenCV',
      image:
        'https://raw.githubusercontent.com/prmpsmart/snapgrade/HEAD/docs/screenshots/grade.png',
      link: 'https://github.com/prmpsmart/snapgrade',
    },
    {
      name: 'Qt Material Widgets',
      caption: 'Material Design components for PySide/PyQt',
      image:
        'https://raw.githubusercontent.com/prmpsmart/qt-material-widgets/HEAD/qt_m.gif',
      link: 'https://github.com/prmpsmart/qt-material-widgets',
    },
  ],

  /** Long-form write-ups on the Adventure page. Facts only; edit freely. */
  caseStudies: [
    {
      title: 'Vaultify',
      role: 'Mobile engineer · Jodna Technologies',
      context:
        'Residential estates juggle gate passes, dues, emergencies, and service requests across paper, calls, and group chats.',
      challenge:
        'Put payments, access control, emergency alerts, and resident–security communication into one reliable app.',
      built: [
        'Wallet top-ups and bill payments integrated with Paystack',
        'QR virtual IDs and access codes that security verifies at the gate',
        'Real-time private chat between residents and estate security over Socket.IO',
        'Firebase Cloud Messaging for announcements, alerts, and transaction updates',
        'Leading a refactor from a legacy controller structure to per-feature repositories and controllers',
      ],
      stack: [
        'Flutter',
        'GetX',
        'Socket.IO',
        'Paystack',
        'FCM',
        'Secure Storage',
      ],
      link: 'https://vaultify.africa',
    },
    {
      title: 'piXeval',
      role: 'Desktop software engineer · DINATEN',
      context:
        'Universities and academies grade large volumes of multiple-choice exams and need results, statistics, and delivery to students.',
      challenge:
        'Deliver fast, accurate exam correction on Windows and macOS for institutions in several languages.',
      built: [
        'Automated scanning and grading of up to 30 exams per minute',
        'Bulk import from Word, Excel, and Moodle; randomized exam model generation',
        'Email delivery of results and advanced statistical analysis',
        'A native macOS version in SwiftUI alongside the PySide6 app',
        'Localization into Catalan, Spanish, English, Euskera, and French',
      ],
      stack: ['Python', 'PySide6', 'SwiftUI', 'PyInstaller', 'Inno Setup'],
      link: 'https://dinaten.com/pixeval-v7/',
      preview: 'https://prmpsmart.github.io/pixeval_web/',
    },
    {
      title: 'Price Grid',
      role: 'Personal project',
      context:
        'A price-tracking backend built to demonstrate deliberate architecture rather than just working endpoints.',
      challenge:
        'Keep price history trustworthy, alerts decoupled, and reads fast without stale data.',
      built: [
        'Repository pattern isolating persistence from business logic',
        'Append-only price records for an auditable history',
        'Decoupled pub/sub alert pipeline',
        'Write-through cache invalidation with Redis',
        'Role-based access control, with unit and integration tests',
        'Migrated mid-project from SQLAlchemy + Pydantic to SQLModel',
      ],
      stack: ['FastAPI', 'PostgreSQL', 'Redis', 'SQLModel', 'Pytest'],
      link: 'https://github.com/prmpsmart/price-grid',
    },
  ],

  /** Spanish versions of the profile text, used when a visitor switches to ES. */
  es: {
    roles: [
      'Ingeniero de Software',
      'Ingeniero Backend',
      'Ingeniero Móvil',
      'Ingeniero de Escritorio',
    ],
    intro:
      'Diseño plataformas completas de principio a fin: APIs escalables y sistemas en tiempo real, apps móviles con Flutter y software de escritorio multiplataforma usado por escuelas, fintechs y urbanizaciones.',
    about: [
      'Soy Miracle Apata, conocido en internet como prmpsmart. Soy ingeniero de software y me muevo con soltura entre backend, móvil y escritorio, sin encasillarme en un solo ámbito. Empecé a programar con Python, de forma autodidacta, tras el curso CSC 201 en 2018/2019. En Jodna Technologies, una joven empresa de software fundada por un amigo, me incorporé al principio, empecé a cargo del backend y ahora también lidero el móvil (sobre todo Flutter) en proyectos para clientes.',
      'Trabajo con FastAPI, Node.js y NestJS para sistemas backend, Flutter para apps móviles multiplataforma, y PySide6 y SwiftUI para experiencias de escritorio nativas. Construyo software en producción usado por instituciones educativas, plataformas fintech y comunidades residenciales.',
      'Me importa el software que resuelve el problema real, no solo el ticket; que sigue siendo legible al crecer; que maneja los casos límite y los fallos sin dramas; y que rinde bien en cada plataforma.',
    ],
    focusAreas: [
      {
        title: 'Sistemas backend',
        body: 'APIs escalables con autenticación, RBAC, analítica y servicios orientados a eventos, con FastAPI, Node.js y NestJS.',
      },
      {
        title: 'Móvil en tiempo real',
        body: 'Apps Flutter con ubicación en vivo, chat con Socket.IO, notificaciones push, pagos y alertas de emergencia con un toque.',
      },
      {
        title: 'Software de escritorio',
        body: 'Apps multiplataforma en PySide6 y nativas en SwiftUI, empaquetadas con PyInstaller e Inno Setup para Windows y macOS.',
      },
      {
        title: 'Responsabilidad de punta a punta',
        body: 'Del esquema de base de datos y el CI/CD a la app cliente: plataformas completas diseñadas, lanzadas y mantenidas.',
      },
    ],
    whatIDo: [
      {
        title: 'Backend',
        body: 'FastAPI, Django, Flask, Node.js, Express, NestJS, ASP.NET; REST, WebSockets, microservicios y sistemas multi-tenant.',
      },
      {
        title: 'Móvil',
        body: 'Flutter (principal) con GetX, Socket.IO, Google Maps, Firebase Cloud Messaging y Paystack, además de Kotlin, Swift y React Native.',
      },
      {
        title: 'Escritorio',
        body: 'Apps en PySide6 / Qt y SwiftUI, localizadas a cinco idiomas y usadas por instituciones académicas.',
      },
      {
        title: 'Infraestructura',
        body: 'Docker, GitHub Actions, AWS, Linux, Nginx y PM2, con seguridad JWT, OAuth2 y RBAC.',
      },
    ],
  },

  seo: {
    title: 'Miracle Apata: Software Engineer',
    description:
      'Miracle Apata (prmpsmart) is a software engineer building backend systems, Flutter mobile apps, and cross-platform desktop software with Python, TypeScript, FastAPI, Node.js, and PySide6.',
  },
};

export default CONFIG;
