import { SectionHeading } from './ui/SectionHeading';
import { ProjectCard } from './ProjectCard';
import { PROJECTS_DATA } from '../data/content';

export function Projects() {
  const projects = PROJECTS_DATA;

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_60%,rgba(16,185,129,0.04),transparent)]"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Featured Projects"
          title="Built to Ship"
          subtitle="Production-grade applications — each covering architecture, frontend, and database integration end-to-end."
          align="center"
        />

        <div
          className={[
            'reveal-children grid gap-6',
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
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-white/[0.06]" />
          <span className="text-xs text-slate-600 tracking-[0.18em] uppercase font-semibold px-4">
            More on GitHub
          </span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-white/[0.06]" />
        </div>
      </div>
    </section>
  );
}
