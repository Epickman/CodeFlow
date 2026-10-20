"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Trabajos", href: "#trabajos" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        scrolled || open
          ? "bg-[#f9f8f6]/85 backdrop-blur-md border-[var(--color-border)] shadow-sm"
          : "bg-[var(--color-bg)] border-transparent"
      }`}
    >
      <div className={`w-full px-6 sm:px-8 md:px-16 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "py-2" : "py-3 md:py-4"
      }`}>
        <a href="#inicio" onClick={() => setOpen(false)}>
          <div className={`relative transition-all duration-300 overflow-hidden ${
            scrolled
              ? "w-[110px] h-[38px] md:w-[130px] md:h-[44px]"
              : "w-[170px] h-[56px] md:w-[360px] md:h-[120px]"
          }`}>
            <Image src="/logo.png" alt="Logo de Agustin Galeazzi Dev" fill className="object-contain object-left mix-blend-multiply" />
          </div>
        </a>
        <ul className="hidden md:flex gap-8">
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
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="md:hidden -mr-2 p-2 text-[var(--color-text)]"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden px-6 sm:px-8"
          >
            {links.map((link) => (
              <li key={link.href} className="border-t border-[var(--color-border)]">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-lg text-[var(--color-text)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
