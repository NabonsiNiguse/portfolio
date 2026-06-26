import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { ProjectCard, type ProjectApiData } from './ProjectCard';
import { apiFetch } from '../lib/api';

export function Projects() {
  const [projects, setProjects] = useState<ProjectApiData[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    apiFetch<ProjectApiData[]>('/api/projects/')
      .then((data) => { setProjects(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_60%,rgba(16,185,129,0.04),transparent)]" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Featured Projects"
          title="Built to Ship"
          subtitle="Production-grade applications — each covering architecture, frontend, and database integration end-to-end."
          align="center"
        />

        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="text-slate-400 text-sm animate-pulse">Loading projects…</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8 border border-emerald-500/10 rounded-2xl bg-emerald-500/[0.01] max-w-md mx-auto">
            <p className="text-sm font-medium text-emerald-400/80">Could not load projects.</p>
            <p className="text-xs text-slate-500 mt-1">Check that Django is running on port 8000.</p>
          </div>
        )}

        {!loading && !error && (
          <div
            className={[
              'reveal-children grid gap-6',
              // ≤1 project: single centered column
              // 2 projects:  2 columns at md+
              // 3 projects:  3 columns at lg+
              // 4+ projects: 2 columns at md, 4 columns at xl (fills the row cleanly)
              projects.length === 1
                ? 'grid-cols-1 max-w-lg mx-auto'
                : projects.length === 2
                ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
                : projects.length === 3
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
            ].join(' ')}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id != null ? project.id : `project-${index}`}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}

        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-white/[0.06]" />
          <span className="text-xs text-slate-600 tracking-[0.18em] uppercase font-semibold px-4">More on GitHub</span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-white/[0.06]" />
        </div>
      </div>
    </section>
  );
}
