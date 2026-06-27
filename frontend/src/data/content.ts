import { Code2, Database, Globe, Network } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
  wordmark:   'NN.DEV',
  role:       'Certified Full-Stack Developer',
  roleDetail: 'Django & React',
  location:   'Bale Robe, Ethiopia',
  email:      'nabonsin@gmail.com',
  github:     'https://github.com/NabonsiNiguse',
  linkedin:   'https://www.linkedin.com/in/nabonsi-niguse-8144953a8/',
  cvPath:     '/cv-nabonsi-niguse.pdf',
  badges:     ['Computer Science Student', 'Remote Ready'],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE (About section)
// ─────────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name:          'Nabonsi Niguse',
  title:         'Full-Stack Software Engineer',
  is_available:  true,
  bio: [
    `I'm a dedicated Full-Stack Software Engineer and Computer Science student based in Bale Robe, Ethiopia. I specialise in architecting secure, high-performance web applications — from database schema design all the way to polished React interfaces.`,
    `My core expertise is backend development with Django and Django REST Framework: production-grade REST APIs, custom auth workflows, and robust PostgreSQL data models. On the frontend I reach for React and TypeScript to build fast, accessible SPAs.`,
    `Driven by clean architecture and continuous growth, I write production-ready code optimised for security, scalability, and international remote engineering roles.`,
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
    tags:      ['Python', 'Django', 'Django REST Framework'],
    skills:    [
      { id: 1, name: 'Python' },
      { id: 2, name: 'Django' },
      { id: 3, name: 'Django REST Framework' },
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
    tags:      ['SQL', 'PostgreSQL', 'MySQL'],
    skills:    [
      { id: 9,  name: 'SQL' },
      { id: 10, name: 'PostgreSQL' },
      { id: 11, name: 'MySQL' },
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
    githubUrl: 'https://github.com/NabonsiNiguse/elearning-platform',
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
    githubUrl: 'https://github.com/NabonsiNiguse/ecommerce-app',
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
    githubUrl: 'https://github.com/NabonsiNiguse/user-management-system',
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
    githubUrl: 'https://github.com/NabonsiNiguse',
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
    issuer:      'STEM Power',
    credential:  'Full-Stack Development Project Experience',
    year:        '2024',
    verifyUrl:   null,
    badge:       null,
    description:
      'Hands-on project work within the STEM Power program, contributing to real-world software development tasks across frontend, backend, and database layers.',
  },
  {
    id:          2,
    issuer:      'WabiSkills',
    credential:  'Certified Full-Stack Developer — Django & React',
    year:        '2024',
    verifyUrl:   null,
    badge:       null,
    description:
      'Industry-recognised certification validating proficiency in Django REST API development, React application architecture, and full-stack integration patterns.',
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
    title:       'STEM Power Project Work',
    company:     'STEM Power',
    description:
      'Joined STEM Power, contributing to real project deliverables — applying full-stack skills in a collaborative, goal-driven environment alongside professional peers.',
  },
  {
    id:          4,
    year:        '2024',
    title:       'WabiSkills Certification',
    company:     'WabiSkills',
    description:
      'Earned the WabiSkills Certified Full-Stack Developer credential, validating Django + React expertise and readiness for professional remote engagements.',
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
