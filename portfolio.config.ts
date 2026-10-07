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
}

export type ProjectCategory =
  | 'Mobile'
  | 'Backend'
  | 'Desktop'
  | 'Web3'
  | 'Open source';

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
}

export interface Experience {
  company: string;
  companyLink?: string;
  location: string;
  roles: { title: string; from: string; to: string }[];
  highlights: string[];
}

const CONFIG = {
  base: '/',
  siteUrl: 'https://prmpsmart.github.io',

  profile: {
    name: 'Miracle Apata',
    handle: 'prmpsmart',
    githubUsername: 'prmpsmart',
    location: 'Akure, Nigeria',
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
      "I'm Miracle Apata, known online as prmpsmart. I'm a software engineer who moves fluidly across backend, mobile, and desktop development rather than staying boxed into one lane.",
      'My work spans FastAPI, Node.js, and NestJS for backend systems, Flutter for cross-platform mobile apps, and PySide6 and SwiftUI for native desktop experiences. I build production software used by educational institutions, fintech platforms, and estate communities.',
      'I care about software that solves the real problem, not just the ticket; stays readable as it grows; handles edge cases and failure without drama; and performs well on every platform it targets.',
    ],
    /** Defaults to your GitHub avatar. Drop a photo in /public and set e.g. '/me.jpg'. */
    photo: '',
    /** Full-screen background photo behind every page. Defaults to `photo`. */
    backgroundImage: '',
    /** e.g. a Calendly link. Leave empty to show "Hire me" pointing to the contact page. */
    meetingUrl: '',
    resumeUrl: '/resume.pdf',
  },

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
      body: 'Flutter with GetX, Socket.IO, Google Maps, Firebase Cloud Messaging, and Paystack.',
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
    { name: 'Python', category: 'Languages', icon: 'python/python-original' },
    {
      name: 'TypeScript',
      category: 'Languages',
      icon: 'typescript/typescript-original',
    },
    {
      name: 'JavaScript',
      category: 'Languages',
      icon: 'javascript/javascript-original',
    },
    { name: 'Dart', category: 'Languages', icon: 'dart/dart-original' },
    { name: 'Swift', category: 'Languages', icon: 'swift/swift-original' },
    { name: 'C#', category: 'Languages', icon: 'csharp/csharp-original' },
    { name: 'FastAPI', category: 'Backend', icon: 'fastapi/fastapi-original' },
    { name: 'Django', category: 'Backend', icon: 'django/django-plain' },
    { name: 'Flask', category: 'Backend', icon: 'flask/flask-original' },
    { name: 'Node.js', category: 'Backend', icon: 'nodejs/nodejs-original' },
    { name: 'Express', category: 'Backend', icon: 'express/express-original' },
    { name: 'NestJS', category: 'Backend', icon: 'nestjs/nestjs-original' },
    {
      name: 'ASP.NET',
      category: 'Backend',
      icon: 'dotnetcore/dotnetcore-original',
    },
    {
      name: 'Socket.IO',
      category: 'Backend',
      icon: 'socketio/socketio-original',
    },
    {
      name: 'Flutter',
      category: 'Mobile & Desktop',
      icon: 'flutter/flutter-original',
    },
    {
      name: 'PySide6 / Qt',
      category: 'Mobile & Desktop',
      icon: 'qt/qt-original',
    },
    {
      name: 'SwiftUI',
      category: 'Mobile & Desktop',
      icon: 'swift/swift-original',
    },
    {
      name: 'Firebase',
      category: 'Mobile & Desktop',
      icon: 'firebase/firebase-original',
    },
    {
      name: 'PostgreSQL',
      category: 'Data',
      icon: 'postgresql/postgresql-original',
    },
    { name: 'MongoDB', category: 'Data', icon: 'mongodb/mongodb-original' },
    { name: 'MySQL', category: 'Data', icon: 'mysql/mysql-original' },
    { name: 'Redis', category: 'Data', icon: 'redis/redis-original' },
    {
      name: 'Docker',
      category: 'DevOps & Tools',
      icon: 'docker/docker-original',
    },
    {
      name: 'GitHub Actions',
      category: 'DevOps & Tools',
      icon: 'githubactions/githubactions-original',
    },
    {
      name: 'AWS',
      category: 'DevOps & Tools',
      icon: 'amazonwebservices/amazonwebservices-plain-wordmark',
    },
    { name: 'Linux', category: 'DevOps & Tools', icon: 'linux/linux-original' },
    { name: 'Nginx', category: 'DevOps & Tools', icon: 'nginx/nginx-original' },
    {
      name: 'Pytest',
      category: 'DevOps & Tools',
      icon: 'pytest/pytest-original',
    },
    { name: 'Jest', category: 'DevOps & Tools', icon: 'jest/jest-plain' },
    {
      name: 'Postman',
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
    },
    {
      title: 'piXeval',
      description:
        'Desktop exam-correction suite used by academic institutions: automated scanning and grading up to 30 exams per minute, Word/Excel/Moodle import, and statistics. Localized into five languages, with a native macOS build.',
      category: 'Desktop',
      tags: ['PySide6', 'SwiftUI', 'PyInstaller', 'Inno Setup'],
      link: 'https://dinaten.com/pixeval-v7/',
      image:
        'https://dinaten.com/wp-content/uploads/2024/09/inicioSesion01.png',
      featured: true,
    },
    {
      title: 'Token Realty Exchange',
      description:
        'Backend for a decentralized platform that tokenizes real-estate equity: multi-role auth, financial approval workflows, KYC/AML pipelines, token creation APIs, and DAO oversight logic.',
      category: 'Web3',
      tags: ['FastAPI', 'PostgreSQL', 'LoopBack', 'MongoDB', 'AWS'],
      link: 'https://tokenrealty.exchange',
      featured: true,
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
      title: 'Gamaliel Consult',
      description:
        'REST APIs for a mentorship and advisory platform: appointment scheduling, mentor matching, and role-based access control.',
      category: 'Backend',
      tags: ['Node.js', 'Express', 'MongoDB', 'TypeScript'],
      link: 'https://www.gamalielconsult.com',
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
      title: 'Price Grid',
      description:
        'FastAPI + PostgreSQL + Redis backend: repository pattern, decoupled pub/sub alert pipeline, write-through cache invalidation, append-only price records, and RBAC. Unit and integration tested.',
      category: 'Open source',
      tags: ['FastAPI', 'PostgreSQL', 'Redis', 'SQLModel'],
      link: 'https://github.com/prmpsmart/price-grid',
    },
    {
      title: 'SnapGrade',
      description:
        'Desktop app for generating, scanning, and grading multiple-choice exam sheets via OMR, with Excel roster import and results export. PySide6 + OpenCV with a token-based theming system.',
      category: 'Open source',
      tags: ['PySide6', 'OpenCV', 'openpyxl'],
      link: 'https://github.com/prmpsmart/snapgrade',
    },
    {
      title: 'AudioWave',
      description:
        'A Qt-free NumPy audio core (WAV/MP3 loading, BS.1770 loudness, spectra, editing) under Qt widgets and playback, plus AudioWave Studio for recording, comparing, editing, and streaming audio.',
      category: 'Open source',
      tags: ['Python', 'NumPy', 'PySide6'],
      link: 'https://github.com/prmpsmart/audiowave',
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
      company: 'Jodna Technologies',
      companyLink: 'https://jodnatechnologies.com',
      location: 'Port Harcourt, Nigeria',
      roles: [{ title: 'Software Engineer', from: 'Dec 2024', to: 'Present' }],
      highlights: [
        'Led backend architecture for mobile and web platforms using FastAPI and Node.js.',
        'Designed scalable APIs for authentication, role-based access control, and analytics.',
        'Implemented real-time notifications, push messaging, and event-driven services.',
        'Mentored junior developers and raised backend engineering standards.',
      ],
    },
    {
      company: 'ScanifyDev',
      companyLink: 'https://scanifydev.com',
      location: 'New Jersey, USA',
      roles: [
        {
          title: 'Backend Engineer (Contract)',
          from: 'Sep 2024',
          to: 'Dec 2024',
        },
      ],
      highlights: [
        'Built FastAPI and Express APIs for blockchain-integrated financial approvals and smart deals.',
        'Designed database schemas and automated CI/CD pipelines.',
      ],
    },
    {
      company: 'Sofgo',
      companyLink: 'https://sofgo.io',
      location: 'Ondo, Nigeria',
      roles: [
        {
          title: 'Backend Engineer (Internship)',
          from: 'Sep 2023',
          to: 'Sep 2024',
        },
      ],
      highlights: [
        'Developed REST APIs for logistics and e-commerce platforms using Django and Node.js.',
        'Implemented payment gateways, authentication, and backend services alongside the mobile team.',
      ],
    },
    {
      company: 'DINATEN',
      companyLink: 'https://dinaten.com',
      location: 'Santa Cruz de Tenerife, Spain',
      roles: [
        { title: 'Desktop Software Engineer', from: 'Aug 2023', to: 'Present' },
      ],
      highlights: [
        'Develop and maintain piXeval and pixEBAP, exam-correction apps used by academic institutions.',
        'Built cross-platform PySide6 apps and a native macOS version of piXeval in SwiftUI.',
        'Localized the apps into Catalan, Spanish, English, Euskera, and French.',
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
      icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/74/81/8b/74818b73-889e-7840-ead6-e26915d1c73d/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/256x256bb.jpg',
      screenshots: [
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/47/4b/24/474b24ce-6662-ff7e-88bd-d5b53a7c087b/1.png/460x996bb.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/4a/7b/c9/4a7bc957-cf5c-9511-cf1e-fd4ecae6f6d0/2.png/460x996bb.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/58/7b/a9/587ba962-5f40-fcb3-b780-feaaf146e704/3.png/460x996bb.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/d3/d9/7f/d3d97fd0-9aab-5a0f-14e9-ce3d02d12a19/6.png/460x996bb.jpg',
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
      icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/78/60/2e/78602e31-cc2e-6eaf-195d-e5a5a2d21a05/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/256x256bb.jpg',
      screenshots: [
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b3/56/b2/b356b2e9-fbd7-a0fd-ac95-99637a21dc8d/PHOTO-2025-08-28-13-43-04.jpg/460x996bb.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a2/9c/f2/a29cf20b-373a-395b-a396-cea2f8af4abf/IMG_1708.png/460x996bb.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/cd/46/8d/cd468df5-d55f-cfa4-3b60-096b6ccf64bb/IMG_1712.png/460x996bb.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/79/13/5d/79135d48-9c17-2e4a-2462-0da4d62c1adb/IMG_1713.png/460x996bb.jpg',
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
      icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ee/30/32/ee30323c-09cd-8024-6a39-09584bffd3e0/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/256x256bb.jpg',
      screenshots: [
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/64/6b/28/646b28a3-d280-11a5-255b-d86e94020b0c/01__U00283_U0029.jpeg/460x996bb.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/59/25/3e/59253eb3-080f-dc93-31f1-546fb182fa4b/02.jpeg/460x996bb.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/97/95/78/979578cf-a6c4-7e50-c3c9-f2967ebc8706/03-8.jpeg/460x996bb.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/dd/0d/ff/dd0dff45-c253-5331-e51a-d75739490680/05.jpeg/460x996bb.jpg',
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
        'https://raw.githubusercontent.com/prmpsmart/audiowave/HEAD/docs/screenshots/studio-player.png',
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
    },
    {
      title: 'Token Realty Exchange',
      role: 'Backend engineer',
      context:
        'A decentralized platform that tokenizes real-estate equity so it can be traded as a commodity.',
      challenge:
        'Model multi-party financial approvals, compliance, and on-chain assets in a secure backend.',
      built: [
        'Multi-role authentication and financial approval workflows',
        'KYC/AML verification pipelines',
        'Asset token creation APIs integrated with smart contracts',
        'DAO oversight logic',
      ],
      stack: [
        'FastAPI',
        'PostgreSQL',
        'TypeScript',
        'LoopBack',
        'MongoDB',
        'AWS',
      ],
      link: 'https://tokenrealty.exchange',
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
      'Soy Miracle Apata, conocido en internet como prmpsmart. Soy ingeniero de software y me muevo con soltura entre backend, móvil y escritorio, sin encasillarme en un solo ámbito.',
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
        body: 'Flutter con GetX, Socket.IO, Google Maps, Firebase Cloud Messaging y Paystack.',
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
