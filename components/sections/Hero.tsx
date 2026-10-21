"use client";
import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

type Particle = {
  x: number; y: number;
  ox: number; oy: number;
  tx1: number; ty1: number;
  tx2: number; ty2: number;
  tx3: number; ty3: number;
  sx1: number; sy1: number;
  sx2: number; sy2: number;
  sx3: number; sy3: number;
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

  const heroOpacity  = useTransform(scrollYProgress, [0, 0.10, 0.22], [1, 1, 0]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.14, 0.24], [0, 0, 1]);
  const imgOpacity   = useTransform(scrollYProgress, [0, 0.30], [1, 0]);
  const darkOpacity  = useTransform(scrollYProgress, [0.10, 0.30], [0, 1]);
  const arrowOpacity = useTransform(scrollYProgress, [0.93, 1.00], [0, 1]);

  const setupParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const isMobile = W < 768;
    const gap = 3; // gap menor = más píxeles muestreados = más partículas
    // Nombre: coincide con DOM — font-size = min(11.5vw, 152px)
    const fs  = Math.min(W * 0.115, 152);
    // Desarrollo Web / Explorá: grande en desktop, relativo en mobile
    const dfs = isMobile ? Math.max(W * 0.13, 44) : Math.min(W * 0.09, 108);
    // Frase larga: más chica, mínimo legible en mobile
    const lfs = isMobile ? Math.max(W * 0.065, 28) : Math.min(W * 0.042, 54);
    // Scatter: más contenido en mobile para no perder partículas off-screen
    const scatterW = isMobile ? W * 0.9 : W * 1.6;
    const scatterH = isMobile ? H * 0.9 : H * 1.6;

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

    // Formación 1: nombre — coincide con DOM h1 centrado en viewport
    const src = sample((ctx) => {
      ctx.fillStyle = "white";
      ctx.font = `600 ${fs}px "DM Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Agustin", W / 2, H / 2 - fs * 0.54);
      ctx.fillText("Galeazzi", W / 2, H / 2 + fs * 0.54);
    });

    // Formación 2: Desarrollo Web
    const dst1 = sample((ctx) => {
      ctx.fillStyle = "white";
      ctx.font = `600 ${dfs}px "DM Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(t.hero.line2[0], W / 2, H * 0.43);
      ctx.fillText(t.hero.line2[1], W / 2, H * 0.43 + dfs * 1.08);
    });

    // Formación 3: frase larga (2 líneas, fuente más chica)
    const dst2 = sample((ctx) => {
      ctx.fillStyle = "white";
      ctx.font = `400 ${lfs}px "DM Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(t.hero.line3[0], W / 2, H * 0.45);
      ctx.fillText(t.hero.line3[1], W / 2, H * 0.45 + lfs * 1.4);
    });

    // Formación 4: Explorá mis trabajos
    const dst3 = sample((ctx) => {
      ctx.fillStyle = "white";
      ctx.font = `600 ${dfs}px "DM Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(t.hero.line4[0], W / 2, H * 0.43);
      ctx.fillText(t.hero.line4[1], W / 2, H * 0.43 + dfs * 1.08);
    });

    const maxCount = isMobile ? 1400 : 3500;
    // Count desde formaciones 1/2/4; la frase (dst2) usa wrapping
    const count = Math.min(src.length, dst1.length, dst3.length, maxCount);
    const rnd = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

    const srcR = rnd(src).slice(0, count);
    const d1R  = rnd(dst1).slice(0, count);
    const d3R  = rnd(dst3).slice(0, count);
    const d2all = rnd(dst2);
    const d2safe = d2all.length > 0 ? d2all : [{ x: W / 2, y: H / 2 }];

    particlesRef.current = srcR.map((s, i) => ({
      x: s.x, y: s.y,
      ox: s.x, oy: s.y,
      tx1: d1R[i].x, ty1: d1R[i].y,
      tx2: d2safe[i % d2safe.length].x, ty2: d2safe[i % d2safe.length].y,
      tx3: d3R[i].x, ty3: d3R[i].y,
      sx1: (Math.random() - 0.5) * scatterW + W / 2,
      sy1: (Math.random() - 0.5) * scatterH + H / 2,
      sx2: (Math.random() - 0.5) * scatterW + W / 2,
      sy2: (Math.random() - 0.5) * scatterH + H / 2,
      sx3: (Math.random() - 0.5) * scatterW + W / 2,
      sy3: (Math.random() - 0.5) * scatterH + H / 2,
      size: isMobile ? Math.random() * 1.6 + 1.2 : Math.random() * 1.4 + 0.7,
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
      const p   = progressRef.current;
      const W   = canvas.width;
      const H   = canvas.height;

      ctx.clearRect(0, 0, W, H);

      for (const pt of pts) {
        let x: number, y: number;

        if (p < 0.24) {
          x = pt.ox; y = pt.oy;

        } else if (p < 0.36) {
          const t = eio((p - 0.24) / 0.12);
          x = pt.ox + (pt.sx1 - pt.ox) * t;
          y = pt.oy + (pt.sy1 - pt.oy) * t;

        } else if (p < 0.47) {
          const t = eio((p - 0.36) / 0.11);
          x = pt.sx1 + (pt.tx1 - pt.sx1) * t;
          y = pt.sy1 + (pt.ty1 - pt.sy1) * t;

        } else if (p < 0.57) {
          x = pt.tx1; y = pt.ty1;

        } else if (p < 0.63) {
          const t = eio((p - 0.57) / 0.06);
          x = pt.tx1 + (pt.sx2 - pt.tx1) * t;
          y = pt.ty1 + (pt.sy2 - pt.ty1) * t;

        } else if (p < 0.73) {
          const t = eio((p - 0.63) / 0.10);
          x = pt.sx2 + (pt.tx2 - pt.sx2) * t;
          y = pt.sy2 + (pt.ty2 - pt.sy2) * t;

        } else if (p < 0.82) {
          x = pt.tx2; y = pt.ty2;

        } else if (p < 0.87) {
          const t = eio((p - 0.82) / 0.05);
          x = pt.tx2 + (pt.sx3 - pt.tx2) * t;
          y = pt.ty2 + (pt.sy3 - pt.ty2) * t;

        } else if (p < 0.96) {
          const t = eio((p - 0.87) / 0.09);
          x = pt.sx3 + (pt.tx3 - pt.sx3) * t;
          y = pt.sy3 + (pt.ty3 - pt.sy3) * t;

        } else {
          x = pt.tx3; y = pt.ty3;
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

        {/* Dark overlay */}
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

        {/* DOM h1 — centrado en viewport, font-size coincide con canvas */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 30, opacity: heroOpacity }}
        >
          <div className="text-center select-none cursor-default">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-semibold tracking-tight leading-[1.08] text-[#111111]"
              style={{ fontSize: "min(11.5vw, 152px)" }}
            >
              <span className="block">Agustin</span>
              <span className="block">Galeazzi</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="tracking-[0.25em] uppercase text-[#111111]/50 font-normal"
              style={{ fontSize: "min(2.2vw, 28px)", marginTop: "1rem" }}
            >
              developer
            </motion.p>
          </div>
        </motion.div>

        {/* Flecha ↓ */}
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
