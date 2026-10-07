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
      title: 'Vaultify',
      description:
        'Smart estate management app: pay dues, generate visitor access codes, send emergency alerts, top up wallets and pay bills via Paystack, and chat with estate security.',
      category: 'Mobile',
      tags: ['Flutter', 'GetX', 'Socket.IO', 'Paystack'],
      link: 'https://vaultify.africa',
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

  seo: {
    title: 'Miracle Apata: Software Engineer',
    description:
      'Miracle Apata (prmpsmart) is a software engineer building backend systems, Flutter mobile apps, and cross-platform desktop software with Python, TypeScript, FastAPI, Node.js, and PySide6.',
  },
};

export default CONFIG;
