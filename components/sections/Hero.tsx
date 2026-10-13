"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useRef } from "react";

const CODE_SNIPPETS = [
  "<div>", "</div>", "<p>", "<span>", "<a>", "{}",
  "=>", "&&", "className=", "return", "const", "</>",
  "null", "flex", "px-4", "true", "import", "export",
  ":root", "display:", "width:", "href=",
];

function snippet() {
  return CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
}

type CursorChip = {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  text: string;
  rotate: number;
};

let pid = 0;

export default function Hero() {
  const [hovered, setHovered] = useState(false);
  const [cursorChips, setCursorChips] = useState<CursorChip[]>([]);
  const lastSpawn = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLHeadingElement>) => {
    const now = Date.now();
    if (now - lastSpawn.current < 50) return;
    lastSpawn.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newChips: CursorChip[] = Array.from({ length: 2 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 40 + 15;
      return {
        id: pid++,
        x,
        y,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        text: snippet(),
        rotate: (Math.random() - 0.5) * 30,
      };
    });

    setCursorChips(prev => [...prev.slice(-30), ...newChips]);
    newChips.forEach(c => {
      setTimeout(() => {
        setCursorChips(prev => prev.filter(cc => cc.id !== c.id));
      }, 700);
    });
  }, []);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setTimeout(() => setCursorChips([]), 700);
  }, []);

  const Tag = ({ children, delay = 0 }: { children: string; delay?: number }) => (
    <motion.span
      animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
      transition={{ duration: 0.25, delay }}
      className="font-mono text-[0.22em] text-[var(--color-accent)] align-baseline"
    >
      {children}
    </motion.span>
  );

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <Image
        src="/banner.jpg"
        alt="Banner Agustin Galeazzi"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/90 to-transparent" />

      <div className="relative z-10 w-full md:w-1/2 px-8 md:pl-16 md:pr-8 py-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[var(--color-muted)] text-sm tracking-widest uppercase mb-8"
        >
          La Plata, Argentina
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative text-6xl md:text-8xl lg:text-[10rem] font-semibold tracking-tight leading-none mb-8 text-[var(--color-text)] cursor-default select-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {/* línea 1: <h1 className="hero-title"> Agustin */}
          <span className="flex items-baseline gap-[0.08em]">
            <Tag>{'<h1'}</Tag>
            <Tag delay={0.05}>{' className="hero-title"'}</Tag>
            <Tag delay={0.08}>{'>'}</Tag>
            <span>Agustin</span>
          </span>

          {/* línea 2: Galeazzi </h1> */}
          <span className="flex items-baseline gap-[0.08em]">
            <span>Galeazzi</span>
            <Tag delay={0.1}>{'</h1>'}</Tag>
          </span>

          {/* estela de código */}
          <AnimatePresence>
            {cursorChips.map(c => (
              <motion.span
                key={c.id}
                className="absolute font-mono text-[10px] text-[var(--color-accent)] whitespace-nowrap pointer-events-none leading-none"
                style={{ left: c.x, top: c.y }}
                initial={{ x: 0, y: 0, opacity: 0.9, scale: 1, rotate: 0 }}
                animate={{ x: c.tx, y: c.ty, opacity: 0, scale: 0.6, rotate: c.rotate }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {c.text}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl text-[var(--color-muted)] mb-14"
        >
          Diseñador Multimedial
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-5"
        >
          <a
            href="#trabajos"
            className="bg-[var(--color-text)] text-[var(--color-bg)] px-8 py-4 text-base font-medium hover:opacity-75 transition-opacity"
          >
            Ver trabajos
          </a>
          <a
            href="#contacto"
            className="border border-[var(--color-border)] px-8 py-4 text-base font-medium hover:border-[var(--color-text)] transition-colors"
          >
            Contacto
          </a>
        </motion.div>
      </div>
    </section>
  );
}
