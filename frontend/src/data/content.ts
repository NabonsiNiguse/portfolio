import { Code2, Database, Globe, Network } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ── Local asset imports ───────────────────────────────────────────────────
import certStem        from '../assets/stem.png';        // STEM Power certificate
import certWabiSkills  from '../assets/wabiskill.jpg';   // WabiSkills certificate
import certUdacity     from '../assets/Udacity.png';     // Udacity certificate
import portfolioPhoto  from '../assets/portfolio.png';   // profile photo

export { certStem, certWabiSkills, certUdacity, portfolioPhoto };

// ─────────────────────────────────────────────────────────────────────────────
// Primitive interfaces (used by static data below AND by legacy component props)
// ─────────────────────────────────────────────────────────────────────────────

export interface Skill {
  label: string;
  tags: string[];
  icon: LucideIcon;
}

export interface Project {
  title: string;
  summary: string;
  stack: string[];
  highlights: string[];
  githubUrl: string | null;
  demoUrl: string | null;
}

export interface Certification {
  issuer: string;
  credential: string;
  year: string;
  verifyUrl: string | null;
  description: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Extended interfaces — these match the shapes the components actually render
// (previously returned by the Django API, now hardcoded here)
// ─────────────────────────────────────────────────────────────────────────────

export interface SkillGroupData {
  id: number;
  label: string;
  icon_name: string;   // keys into ICON_MAP in Skills.tsx
  tags: string[];
  skills: { id: number; name: string }[];
}

export interface ProjectApiData {
  id: number;
  title: string;
  summary: string;
  stack: string[];
  highlights: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  image: string | null;
}

export interface CertificationData {
  id: number;
  issuer: string;
  credential: string;
  description: string;
  year: string;
  verifyUrl: string | null;
  badge: string | null;
}

export interface ExperienceData {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PERSONAL
// ─────────────────────────────────────────────────────────────────────────────

export const PERSONAL = {
  name:       'Nabonsi Niguse',
  wordmark:   'Portfolio',
  role:       'Certified Full-Stack Developer',
  roleDetail: 'Django & React',
  location:   'Bale Robe, Ethiopia',
  email:      'nabonsin@gmail.com',
  github:     'https://github.com/NabonsiNiguse',
  linkedin:   'https://www.linkedin.com/in/nabonsi-niguse-8144953a8/',
  cvPath:     '/Nabonsi_Niguse_Resume.pdf',
  badges:     ['Computer Science Student', 'Remote Ready'],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE (About section)
// ─────────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name:         'Nabonsi Niguse',
  title:        'Full-Stack Software Engineer',
  is_available: true,
  bio: [
    `I'm a self-driven Full-Stack Software Engineer and Computer Science student based in Bale Robe, Ethiopia. I specialise in building secure, high-performance web applications — from backend architecture to polished React interfaces.`,
    `My backend foundation was built through the STEM Power STEMpreneurship Program, where I studied Django and Python and collaborated on a real-world software project. I later earned my WabiSkills Full-Stack certification, mastering the MERN stack — MongoDB, Express.js, React, and Node.js — in 2025.`,
    `I write clean, production-ready code optimised for security, scalability, and international remote engineering roles. Whether it's a Django REST API or a React SPA, I build to ship.`,
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SKILL GROUPS (Skills section)
// ─────────────────────────────────────────────────────────────────────────────

export const SKILL_GROUPS: SkillGroupData[] = [
  {
    id:        1,
    label:     'Backend',
    icon_name: 'Code2',
    tags:      ['Python', 'Django', 'Node.js', 'Express.js', 'Django REST Framework'],
    skills:    [
      { id: 1, name: 'Python' },
      { id: 2, name: 'Django' },
      { id: 3, name: 'Django REST Framework' },
      { id: 4, name: 'Node.js' },
      { id: 5, name: 'Express.js' },
    ],
  },
  {
    id:        2,
    label:     'Frontend',
    icon_name: 'Globe',
    tags:      ['JavaScript (ES6+)', 'React.js', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3'],
    skills:    [
      { id: 4, name: 'JavaScript (ES6+)' },
      { id: 5, name: 'React.js' },
      { id: 6, name: 'TypeScript' },
      { id: 7, name: 'Tailwind CSS' },
      { id: 8, name: 'HTML5 / CSS3' },
    ],
  },
  {
    id:        3,
    label:     'Database',
    icon_name: 'Database',
    tags:      ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB'],
    skills:    [
      { id: 9,  name: 'SQL' },
      { id: 10, name: 'PostgreSQL' },
      { id: 11, name: 'MySQL' },
      { id: 12, name: 'MongoDB' },
    ],
  },
  {
    id:        4,
    label:     'Core & Networking',
    icon_name: 'Network',
    tags:      ['CS Foundations', 'Networking Protocols', 'Git & GitHub', 'Remote Collaboration'],
    skills:    [
      { id: 12, name: 'CS Foundations' },
      { id: 13, name: 'Networking Protocols' },
      { id: 14, name: 'Git & GitHub' },
      { id: 15, name: 'Remote Collaboration' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────────────────

export const PROJECTS_DATA: ProjectApiData[] = [
  {
    id:      1,
    title:   'E-Learning Platform',
    summary:
      'A full-stack LMS that lets instructors publish structured courses and learners track progress in real time across devices.',
    stack:   ['Django', 'React', 'PostgreSQL', 'Django REST Framework', 'Tailwind CSS'],
    highlights: [
      'Role-based access: instructor, student, and admin dashboards',
      'Course enrollment and progress-tracking with REST API',
      'Responsive video-lesson viewer and quiz module',
      'JWT authentication with token refresh flow',
    ],
    githubUrl: 'https://github.com/NabonsiNiguse/E-learning',
    demoUrl:   null,
    image:     null,
  },
  {
    id:      2,
    title:   'E-Commerce Application',
    summary:
      'A production-grade online store with product catalog, cart, checkout, and order management powered by Django REST + React/Redux.',
    stack:   ['Django', 'React', 'Redux', 'SQL', 'Django REST Framework'],
    highlights: [
      'Redux-managed cart and order state with optimistic UI updates',
      'Secure checkout flow with order confirmation and history',
      'Admin panel for inventory and order fulfillment management',
      'Paginated product listings with category filtering and search',
    ],
    githubUrl: 'https://github.com/NabonsiNiguse/ethio-ecommerce',
    demoUrl:   null,
    image:     null,
  },
  {
    id:      3,
    title:   'Advanced User Management System',
    summary:
      'An enterprise-ready authentication and authorization service with granular role-permission management for Django/React applications.',
    stack:   ['Django Auth', 'JWT', 'React', 'Django REST Framework', 'PostgreSQL'],
    highlights: [
      'Custom user model with profile, roles, and granular permissions',
      'JWT access/refresh token lifecycle with secure rotation',
      'React admin UI for user search, suspension, and role assignment',
      'Audit log of authentication events and permission changes',
    ],
    githubUrl: 'https://github.com/NabonsiNiguse/user_managment',
    demoUrl:   null,
    image:     null,
  },
  {
    id:      4,
    title:   'Portfolio Website',
    summary:
      'This portfolio — a React + TypeScript SPA with a premium dark design system, smooth scroll animations, and a standalone static data layer.',
    stack:   ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    highlights: [
      'Multi-phase design system with glassmorphism and ambient glow effects',
      'Fully standalone: no backend required, all data hardcoded in TypeScript',
      'Responsive layout with intersection-observer scroll reveals',
      'Accessible: skip links, ARIA labels, focus-visible states throughout',
    ],
    githubUrl: 'https://github.com/NabonsiNiguse/portfolio',
    demoUrl:   null,
    image:     null,
  },
];
// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const CERTIFICATIONS_DATA: CertificationData[] = [
  {
    id:          1,
    issuer:      'STEM Power & Case Western Reserve University',
    credential:  'STEMpreneurship Software Development Certificate',
    year:        '2025',
    verifyUrl:   'https://www.stempower.org',
    badge:       certStem,
    description:
      'Completed the STEMpreneurship Outreach Program (64 hours) in Software Development, in collaboration with STEM Power Ethiopia, Case Western Reserve University, and Madda Walabu University STEM Center. Studied Django, built a collaborative project, and presented a live demo.',
  },
  {
    id:          2,
    issuer:      'WabiSkills',
    credential:  'Certified Full-Stack Developer — MERN Stack & React',
    year:        '2025',
    verifyUrl:   'https://www.wabiskills.com',
    badge:       certWabiSkills,
    description:
      'Industry-recognised certification validating proficiency in the MERN stack (MongoDB, Express.js, React, Node.js) and modern React application architecture, including component design, state management, and REST API integration.',
  },
  {
    id:          3,
    issuer:      'Udacity',
    credential:  'Programming Concepts & Problem Solving',
    year:        '2024',
    verifyUrl:   'https://www.udacity.com',
    badge:       certUdacity,
    description:
      'Earned the Udacity certificate in Programming Concepts and Problem Solving — covering core computational thinking, algorithmic problem decomposition, data structures, and writing clean, logical code across real programming challenges.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE / TIMELINE
// ─────────────────────────────────────────────────────────────────────────────

export const EXPERIENCE_DATA: ExperienceData[] = [
  {
    id:          1,
    year:        '2021',
    title:       'Self-Taught Foundations',
    company:     'Self-Directed',
    description:
      'Started the self-directed journey into software development — mastering Python, core CS concepts, and networking fundamentals through structured independent study.',
  },
  {
    id:          2,
    year:        '2022',
    title:       'Backend & Database Depth',
    company:     'Self-Directed',
    description:
      'Built command of Django and relational databases (PostgreSQL, MySQL), shipping first full-stack applications and establishing solid REST API design instincts.',
  },
  {
    id:          3,
    year:        '2023',
    title:       'STEM Power — Django & Collaboration',
    company:     'STEM Power Ethiopia / Case Western Reserve University',
    description:
      'Joined the STEMpreneurship Outreach Program, studying Django and Python-based backend development through 64 hours of lectures, hands-on training, and collaborative project work — concluding with a live demo presentation.',
  },
  {
    id:          4,
    year:        '2025',
    title:       'WabiSkills — MERN Stack Certification',
    company:     'WabiSkills',
    description:
      'Earned the WabiSkills Full-Stack Developer certification, mastering the MERN stack: MongoDB, Express.js, React, and Node.js — validating modern JavaScript full-stack development skills for professional remote work.',
  },
  {
    id:          5,
    year:        'Now',
    title:       'Remote-Ready & Hiring',
    company:     'Open to Opportunities',
    description:
      'Actively seeking international remote roles and freelance projects where impact-driven engineering meets a global team — open to full-time and contract work.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Legacy exports — kept so any component that imports SKILLS / PROJECTS /
// CERTIFICATIONS / TIMELINE directly still compiles without changes.
// ─────────────────────────────────────────────────────────────────────────────

export const SKILLS: Skill[] = [
  { label: 'Backend',            icon: Code2,     tags: ['Python', 'Django', 'Django REST Framework'] },
  { label: 'Frontend',           icon: Globe,     tags: ['JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'HTML5 / CSS3'] },
  { label: 'Database',           icon: Database,  tags: ['SQL', 'PostgreSQL', 'MySQL'] },
  { label: 'Core & Networking',  icon: Network,   tags: ['CS Foundations', 'Networking Protocols', 'Git & GitHub', 'Remote Collaboration'] },
];

export const PROJECTS: Project[] = PROJECTS_DATA.map(
  ({ title, summary, stack, highlights, githubUrl, demoUrl }) =>
    ({ title, summary, stack, highlights, githubUrl, demoUrl })
);

export const CERTIFICATIONS: Certification[] = CERTIFICATIONS_DATA.map(
  ({ issuer, credential, year, verifyUrl, description }) =>
    ({ issuer, credential, year, verifyUrl, description })
);

export const TIMELINE: TimelineEntry[] = EXPERIENCE_DATA.map(
  ({ year, title, description }) => ({ year, title, description })
);
