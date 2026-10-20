"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <Image
        src="/banner.jpg"
        alt="Persona programando en una laptop con un editor de código abierto"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-[#f9f8f6]/85 lg:hidden" />

      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, var(--color-bg) 0%, var(--color-bg) 20%, rgba(249,248,246,0.75) 32%, transparent 45%)",
        }}
      />

      <div className="relative z-10 w-full lg:w-1/2 px-6 sm:px-8 md:px-16 lg:pr-8 pt-28 pb-16 md:pt-40 lg:py-0 flex flex-col justify-center min-h-screen">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[var(--color-muted)] text-sm tracking-widest uppercase mb-6 md:mb-8"
        >
          La Plata, Argentina
        </motion.p>

        <div className="relative mb-8">
          <motion.div
            className="absolute -inset-6 rounded-sm"
            style={{
              background:
                "radial-gradient(ellipse at 40% 50%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 55%, transparent 80%)",
              filter: "blur(18px)",
            }}
            animate={{
              x: [0, 10, -6, 4, 0],
              y: [0, -8, 5, -3, 0],
              scale: [1, 1.04, 0.97, 1.02, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ opacity: 0.75, transition: { duration: 0.2 } }}
            className="text-6xl sm:text-7xl md:text-8xl xl:text-[10rem] font-semibold tracking-tight leading-none text-[var(--color-text)] cursor-default select-none"
          >
            <span className="block">Agustin</span>{" "}
            <span className="block">Galeazzi</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl text-[var(--color-muted)] mb-10 md:mb-14"
        >
          Development
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3 sm:gap-5"
        >
          <a
            href="#trabajos"
            className="whitespace-nowrap bg-[var(--color-text)] text-[var(--color-bg)] px-6 py-3 sm:px-8 sm:py-4 text-base font-medium hover:opacity-75 transition-opacity"
          >
            Ver trabajos
          </a>
          <a
            href="#contacto"
            className="whitespace-nowrap border border-[#111111]/20 bg-[#f9f8f6]/60 px-6 py-3 sm:px-8 sm:py-4 text-base font-medium hover:border-[var(--color-text)] transition-colors"
          >
            Contacto
          </a>
        </motion.div>
      </div>
    </section>
  );
}
