"use client";
import projects from "@/data/projects.json";
import ProjectCard from "@/components/ui/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section
      id="trabajos"
      className="py-28 px-8 md:px-16 border-t border-[var(--color-border)]"
    >
      <div className="w-full">
        <div className="flex items-baseline gap-4 mb-12">
          <span className="text-xs font-mono text-[var(--color-accent)]">01</span>
          <h2 className="text-xs tracking-widest uppercase text-[var(--color-muted)]">
            {t.projects.label}
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
