"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const skills = [
  "UI Design",
  "UX Research",
  "Web Design",
  "Next.js",
  "Diseño Interactivo",
  "Instalaciones Multimedia",
  "Figma",
  "After Effects",
  "Experiencias Digitales",
  "Motion Design",
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className="py-28 px-8 md:px-16 border-t border-[var(--color-border)]"
    >
      <div className="w-full grid md:grid-cols-2 gap-16 items-start">

        {/* foto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative aspect-[3/4] w-full overflow-hidden"
        >
          <Image
            src="/yo.jpg"
            alt="Agustin Galeazzi"
            fill
            className="object-cover object-center"
          />
        </motion.div>

        {/* texto + skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-12"
        >
          <div>
            <h2 className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-8">
              Sobre mí
            </h2>
            <p className="text-xl leading-relaxed mb-5">
              Diseñador Multimedial con base en La Plata, Argentina. Me especializo
              en crear experiencias digitales que combinan diseño visual sólido con
              funcionalidad clara.
            </p>
            <p className="text-[var(--color-muted)] leading-relaxed mb-10">
              Trabajo en proyectos web, identidad visual e instalaciones interactivas,
              buscando siempre que el diseño tenga un propósito y comunique con
              precisión.
            </p>
            <a
              href="https://www.behance.net/Tingaleazzi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Ver perfil en Behance →
            </a>
          </div>

          <div>
            <h2 className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-6">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm border border-[var(--color-border)] px-3 py-1.5 text-[var(--color-text)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
