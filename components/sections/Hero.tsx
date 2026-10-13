"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <Image
        src="/banner.jpg"
        alt="Banner Agustin Galeazzi"
        fill
        className="object-cover object-center"
        priority
      />

      {/* difuminado blanco desde la izquierda, no llega al otro lado */}
      <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/90 to-transparent" />

      <div className="relative z-10 w-full md:w-1/2 px-8 md:pl-16 md:pr-8 py-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[var(--color-muted)] text-xs tracking-widest uppercase mb-6"
        >
          La Plata, Argentina
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-none mb-6 text-[var(--color-text)]"
        >
          Agustin
          <br />
          Galeazzi
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-[var(--color-muted)] mb-12"
        >
          Diseñador Multimedial
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-4"
        >
          <a
            href="#trabajos"
            className="bg-[var(--color-text)] text-[var(--color-bg)] px-6 py-3 text-sm font-medium hover:opacity-75 transition-opacity"
          >
            Ver trabajos
          </a>
          <a
            href="#contacto"
            className="border border-[var(--color-border)] px-6 py-3 text-sm font-medium hover:border-[var(--color-text)] transition-colors"
          >
            Contacto
          </a>
        </motion.div>
      </div>
    </section>
  );
}
