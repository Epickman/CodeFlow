"use client";
import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

type Particle = {
  x: number; y: number;
  ox: number; oy: number;    // Agustin Galeazzi
  tx1: number; ty1: number;  // Soluciones Digitales / Digital Solutions
  tx2: number; ty2: number;  // Explorá mis trabajos / Explore my work
  sx1: number; sy1: number;
  sx2: number; sy2: number;
  size: number;
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const { lang, t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(
    () => scrollYProgress.on("change", (v) => { progressRef.current = v; }),
    [scrollYProgress]
  );

  // DOM h1 inicial: transición larga antes de ceder al canvas
  const heroOpacity = useTransform(scrollYProgress, [0, 0.10, 0.22], [1, 1, 0]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.14, 0.24], [0, 0, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.30], [1, 0]);
  const darkOpacity = useTransform(scrollYProgress, [0.10, 0.30], [0, 1]);

  // Flecha DOM — aparece junto con "Explorá mis trabajos"
  const arrowOpacity = useTransform(scrollYProgress, [0.90, 0.97], [0, 1]);

  const setupParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const gap = W > 768 ? 4 : 5;
    const fs = Math.min(W * 0.115, 152);
    const dfs = Math.min(W * 0.09, 108);

    const sample = (drawFn: (ctx: CanvasRenderingContext2D) => void) => {
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const octx = off.getContext("2d")!;
      drawFn(octx);
      const d = octx.getImageData(0, 0, W, H).data;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < H; y += gap)
        for (let x = 0; x < W; x += gap)
          if (d[(y * W + x) * 4 + 3] > 128) pts.push({ x, y });
      return pts;
    };

    // Formación 1: nombre
    const src = sample((ctx) => {
      ctx.fillStyle = "white";
      ctx.font = `600 ${fs}px "DM Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Agustin", W / 2, H * 0.40);
      ctx.fillText("Galeazzi", W / 2, H * 0.40 + fs * 1.08);
    });

    // Formación 2: Soluciones Digitales / Digital Solutions
    const dst1 = sample((ctx) => {
      ctx.fillStyle = "white";
      ctx.font = `600 ${dfs}px "DM Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(t.hero.line2[0], W / 2, H * 0.43);
      ctx.fillText(t.hero.line2[1], W / 2, H * 0.43 + dfs * 1.08);
    });

    // Formación 3: Explorá mis trabajos / Explore my work
    const dst2 = sample((ctx) => {
      ctx.fillStyle = "white";
      ctx.font = `600 ${dfs}px "DM Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(t.hero.line3[0], W / 2, H * 0.43);
      ctx.fillText(t.hero.line3[1], W / 2, H * 0.43 + dfs * 1.08);
    });

    const maxCount = W > 768 ? 2800 : 1400;
    const count = Math.min(src.length, dst1.length, dst2.length, maxCount);
    const rnd = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

    const srcR = rnd(src).slice(0, count);
    const d1R  = rnd(dst1).slice(0, count);
    const d2R  = rnd(dst2).slice(0, count);

    particlesRef.current = srcR.map((s, i) => ({
      x: s.x, y: s.y,
      ox: s.x, oy: s.y,
      tx1: d1R[i].x, ty1: d1R[i].y,
      tx2: d2R[i].x, ty2: d2R[i].y,
      sx1: (Math.random() - 0.5) * W * 1.6 + W / 2,
      sy1: (Math.random() - 0.5) * H * 1.6 + H / 2,
      sx2: (Math.random() - 0.5) * W * 1.6 + W / 2,
      sy2: (Math.random() - 0.5) * H * 1.6 + H / 2,
      size: Math.random() * 1.4 + 0.7,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    document.fonts.ready.then(setupParticles);

    const eio = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) { rafRef.current = requestAnimationFrame(draw); return; }
      const ctx = canvas.getContext("2d")!;
      const pts = particlesRef.current;
      const p = progressRef.current;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      for (const pt of pts) {
        let x: number, y: number;

        if (p < 0.24) {
          // Hold largo: Agustin Galeazzi como partículas
          x = pt.ox; y = pt.oy;

        } else if (p < 0.44) {
          // Scatter 1: nombre se deshace
          const t = eio((p - 0.24) / 0.20);
          x = pt.ox + (pt.sx1 - pt.ox) * t;
          y = pt.oy + (pt.sy1 - pt.oy) * t;

        } else if (p < 0.58) {
          // Reform 1: Soluciones Digitales
          const t = eio((p - 0.44) / 0.14);
          x = pt.sx1 + (pt.tx1 - pt.sx1) * t;
          y = pt.sy1 + (pt.ty1 - pt.sy1) * t;

        } else if (p < 0.70) {
          // Hold: Soluciones Digitales
          x = pt.tx1; y = pt.ty1;

        } else if (p < 0.77) {
          // Scatter 2
          const t = eio((p - 0.70) / 0.07);
          x = pt.tx1 + (pt.sx2 - pt.tx1) * t;
          y = pt.ty1 + (pt.sy2 - pt.ty1) * t;

        } else if (p < 0.90) {
          // Reform 2: Explorá mis trabajos
          const t = eio((p - 0.77) / 0.13);
          x = pt.sx2 + (pt.tx2 - pt.sx2) * t;
          y = pt.sy2 + (pt.ty2 - pt.sy2) * t;

        } else {
          // Hold: Explorá mis trabajos
          x = pt.tx2; y = pt.ty2;
        }

        ctx.beginPath();
        ctx.arc(x, y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(249,248,246,0.88)";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [setupParticles]);

  useEffect(() => {
    const onResize = () => document.fonts.ready.then(setupParticles);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setupParticles]);

  return (
    <div ref={containerRef} style={{ height: "400vh" }}>
      <section
        id="inicio"
        className="sticky top-0 h-screen overflow-hidden"
      >
        {/* Background image */}
        <motion.div className="absolute inset-0 z-0" style={{ opacity: imgOpacity }}>
          <Image
            src="/banner.jpg"
            alt="Banner Agustin Galeazzi"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-white/30" />
        </motion.div>

        {/* Dark background */}
        <motion.div
          className="absolute inset-0 bg-[#111111] pointer-events-none"
          style={{ zIndex: 1, opacity: darkOpacity }}
        />

        {/* Particle canvas */}
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 20, opacity: canvasOpacity }}
        />

        {/* DOM h1 inicial — solo el nombre centrado en negro */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 30, opacity: heroOpacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center text-6xl md:text-8xl lg:text-[10rem] font-semibold tracking-tight leading-none text-[#111111] select-none cursor-default"
          >
            <span className="block">Agustin</span>
            <span className="block">Galeazzi</span>
          </motion.h1>
        </motion.div>

        {/* Flecha ↓ — aparece al final junto con "Explorá mis trabajos" */}
        <motion.div
          className="absolute inset-0 flex items-end justify-center pointer-events-none"
          style={{ zIndex: 21, opacity: arrowOpacity, paddingBottom: "8%" }}
        >
          <span className="text-3xl text-white/50 select-none">↓</span>
        </motion.div>
      </section>
    </div>
  );
}
