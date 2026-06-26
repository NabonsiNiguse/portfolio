import { Code2, Database, Globe, Network } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

export const PERSONAL = {
  name: 'Nabonsi Niguse',
  wordmark: 'NN.DEV',
  role: 'Certified Full-Stack Developer',
  roleDetail: 'Django & React',
  location: 'Bale Robe, Ethiopia',
  email: 'nabonsiniguse@gmail.com',
  github: 'https://github.com/nabonsi',
  linkedin: 'https://linkedin.com/in/nabonsiniguse',
  cvPath: '/cv-nabonsi-niguse.pdf',
  badges: ['Computer Science Student', 'Remote Ready'],
};

export const SKILLS: Skill[] = [
  {
    label: 'Backend',
    icon: Code2,
    tags: ['Python', 'Django', 'Django REST Framework'],
  },
  {
    label: 'Frontend',
    icon: Globe,
    tags: ['JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'HTML5 / CSS3'],
  },
  {
    label: 'Database',
    icon: Database,
    tags: ['SQL', 'PostgreSQL', 'MySQL'],
  },
  {
    label: 'Core & Networking',
    icon: Network,
    tags: [
      'CS Foundations',
      'Networking Protocols',
      'Git & GitHub',
      'Remote Collaboration',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'E-Learning Platform',
    summary:
      'A full-stack learning management system that lets instructors publish structured courses and learners track progress in real time across devices.',
    stack: ['Django', 'React', 'PostgreSQL', 'Django REST Framework', 'Tailwind CSS'],
    highlights: [
      'Role-based access: instructor, student, and admin dashboards',
      'Course enrollment and progress-tracking with REST API',
      'Responsive video-lesson viewer and quiz module',
      'JWT authentication with token refresh flow',
    ],
    githubUrl: 'https://github.com/nabonsi/elearning-platform',
    demoUrl: null,
  },
  {
    title: 'E-Commerce Application',
    summary:
      'A production-grade online store with product catalog, cart, checkout, and order management, powered by a Django REST backend and React/Redux frontend.',
    stack: ['Django', 'React', 'Redux', 'SQL', 'Django REST Framework'],
    highlights: [
      'Redux-managed cart and order state with optimistic UI updates',
      'Secure checkout flow with order confirmation and history',
      'Admin panel for inventory and order fulfillment management',
      'Paginated product listings with category filtering and search',
    ],
    githubUrl: 'https://github.com/nabonsi/ecommerce-app',
    demoUrl: null,
  },
  {
    title: 'Advanced User Management System',
    summary:
      'An enterprise-ready authentication and authorization service with granular role-permission management, built for integration into larger Django/React applications.',
    stack: ['Django Auth', 'JWT', 'React', 'Django REST Framework', 'PostgreSQL'],
    highlights: [
      'Custom user model with profile, roles, and granular permissions',
      'JWT access/refresh token lifecycle with secure rotation',
      'React admin UI for user search, suspension, and role assignment',
      'Audit log of authentication events and permission changes',
    ],
    githubUrl: 'https://github.com/nabonsi/user-management-system',
    demoUrl: null,
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    issuer: 'STEM Power',
    credential: 'Full-Stack Development Project Experience',
    year: '2024',
    verifyUrl: null,
    description:
      'Hands-on project work within the STEM Power program, contributing to real-world software development tasks across frontend, backend, and database layers.',
  },
  {
    issuer: 'WabiSkills',
    credential: 'Certified Full-Stack Developer — Django & React',
    year: '2024',
    verifyUrl: null,
    description:
      'Industry-recognised certification validating proficiency in Django REST API development, React application architecture, and full-stack integration patterns.',
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    year: '2021',
    title: 'Self-Taught Foundations',
    description:
      'Started the self-directed journey into software development — mastering Python, core CS concepts, and networking fundamentals through structured independent study.',
  },
  {
    year: '2022',
    title: 'Backend & Database Depth',
    description:
      'Built command of Django and relational databases (PostgreSQL, MySQL), shipping first full-stack applications and establishing solid REST API design instincts.',
  },
  {
    year: '2023',
    title: 'STEM Power Project Work',
    description:
      'Joined STEM Power, contributing to real project deliverables — applying full-stack skills in a collaborative, goal-driven environment alongside professional peers.',
  },
  {
    year: '2024',
    title: 'WabiSkills Certification',
    description:
      'Earned the WabiSkills Certified Full-Stack Developer credential, validating Django + React expertise and readiness for professional remote engagements.',
  },
  {
    year: 'Now',
    title: 'Remote-Ready & Hiring',
    description:
      'Actively seeking international remote roles and freelance projects where impact-driven engineering meets a global team — open to full-time and contract work.',
  },
];
