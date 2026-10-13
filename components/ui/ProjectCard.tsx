"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  tags: string[];
}

function screenshotUrl(siteUrl: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(siteUrl)}?w=800&h=500`;
}

function Thumbnail({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-[var(--color-bg)]">
      {/* skeleton mientras carga */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-border)] to-[var(--color-bg)] animate-pulse" />
      )}

      {/* fallback si falla la carga */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]">
          <span className="text-xs text-[var(--color-muted)] tracking-widest uppercase">
            Vista previa no disponible
          </span>
        </div>
      )}

      {!error && (
        <Image
          src={screenshotUrl(url)}
          alt={`Captura de ${title}`}
          fill
          className={`object-cover object-top transition-all duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          unoptimized
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text)] transition-colors duration-200 block overflow-hidden"
    >
      <Thumbnail url={project.url} title={project.title} />

      <div className="p-6">
        <div className="mb-3">
          <span className="text-xs tracking-widest uppercase text-[var(--color-muted)]">
            {project.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2 leading-snug group-hover:underline underline-offset-2">
          {project.title}
        </h3>
        <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-5">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--color-muted)] bg-[var(--color-bg)] px-2.5 py-1 border border-[var(--color-border)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
