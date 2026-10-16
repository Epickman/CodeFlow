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
      className="py-28 px-8 md:px-16 bg-[#111111]"
    >
      <div className="w-full grid md:grid-cols-2 gap-6 items-start">

        {/* foto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative aspect-[3/4] w-3/4 overflow-hidden"
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
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-xs font-mono text-[var(--color-accent)]">02</span>
              <h2 className="text-xs tracking-widest uppercase text-white/50">
                Sobre mí
              </h2>
            </div>
            <p className="text-4xl font-semibold text-white mb-2">
              Agustin Galeazzi
            </p>
            <p className="text-base tracking-widest uppercase text-[var(--color-accent)] mb-8">
              Diseñador Multimedial
            </p>
            <p className="text-2xl leading-relaxed mb-5 text-white">
              Soy licenciado en diseño multimedial, me dedico a realizar experiencias
              digitales que parten desde el análisis hasta el diseño del producto final,
              poniendo especial atención a cada detalle.
            </p>
            <p className="text-lg text-white/60 leading-relaxed mb-10">
              Realizo trabajos de programación digital y desarrollo web que permiten
              fusionar distintas ramas del campo de la multimedia.
            </p>
            <div className="flex flex-col gap-3">

              <a
                href="https://www.linkedin.com/in/agustingaleazzi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-medium text-[var(--color-accent)] hover:underline"
              >
                Ver perfil en LinkedIn →
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs tracking-widest uppercase text-white/50 mb-6">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-base border border-white/20 px-4 py-2 text-white/70 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)] transition-colors duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs tracking-widest uppercase text-white/50 mb-6">
              Trabajo destacado
            </h2>
            <div className="border border-white/20 hover:border-[var(--color-accent)] transition-colors duration-200 group">
              <a
                href="https://apps.apple.com/mx/app/creative-events/id6753777660"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 pb-3"
              >
                <span className="text-xs tracking-widest uppercase text-white/40 group-hover:text-[var(--color-accent)] transition-colors">
                  App
                </span>
                <p className="text-lg font-semibold text-white mt-1 mb-2 group-hover:underline underline-offset-2">
                  Creative Events
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  Sitio para productora de eventos con identidad propia. Eventos corporativos y sociales, portfolio de trabajos y gestión de consultas.
                </p>
              </a>
              <div className="flex gap-3 flex-wrap px-5 pb-5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.creative.crve.creativeapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/30 px-3 py-1.5 text-xs text-white/70 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M3.18 23.76c.3.17.64.22.99.14l13.2-7.62-2.83-2.83-11.36 10.31zm-1.93-20.4A1.99 1.99 0 001 5v14c0 .47.16.9.43 1.24l.07.08 7.84-7.84v-.19L1.25 3.36zm17.43 8.96L16.1 9.97l-3.02 3.03 3.02 3.02 2.6-1.5c.74-.43.74-1.12-.02-1.2zM4.17.24L17.38 7.86 14.55 10.7 3.18.38A1.4 1.4 0 014.17.24z"/></svg>
                  Google Play
                </a>
                <a
                  href="https://apps.apple.com/mx/app/creative-events/id6753777660"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/30 px-3 py-1.5 text-xs text-white/70 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.27-2.16 3.8.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.78M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  App Store
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
