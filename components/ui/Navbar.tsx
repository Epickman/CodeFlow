"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const links = [
  { label: "Trabajos", href: "#trabajos" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-bg)]/85 backdrop-blur-md border-[var(--color-border)] shadow-sm"
          : "bg-[var(--color-bg)] border-transparent"
      }`}
    >
      <div className={`w-full px-8 md:px-16 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}>
        <a href="#inicio">
          <div className={`relative transition-all duration-300 overflow-hidden ${
            scrolled ? "w-[130px] h-[44px]" : "w-[360px] h-[120px]"
          }`}>
            <Image src="/logo.png" alt="Logo" fill className="object-contain object-left" />
          </div>
        </a>
        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
