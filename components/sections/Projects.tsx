import projects from "@/data/projects.json";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  return (
    <section
      id="trabajos"
      className="py-28 px-8 md:px-16 border-t border-[var(--color-border)]"
    >
      <div className="w-full">
        <div className="flex items-baseline gap-4 mb-12">
          <span className="text-xs font-mono text-[var(--color-accent)]">01</span>
          <h2 className="text-xs tracking-widest uppercase text-[var(--color-muted)]">
            Trabajos
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
