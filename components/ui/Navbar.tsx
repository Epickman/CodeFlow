"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, t, toggle } = useLanguage();

  const links = [
    { label: t.nav.works, href: "#trabajos" },
    { label: t.nav.about, href: "#sobre-mi" },
    { label: t.nav.contact, href: "#contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al hacer resize a desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
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
          <a href="#inicio" onClick={closeMenu}>
            <div className={`relative transition-all duration-300 overflow-hidden ${
              scrolled ? "w-[130px] h-[44px]" : "w-[180px] h-[60px] md:w-[360px] md:h-[120px]"
            }`}>
              <Image src="/logo.png" alt="Logo" fill className="object-contain object-left mix-blend-multiply" />
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
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

            <button
              onClick={toggle}
              className="text-xs font-mono tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors border border-[var(--color-border)] hover:border-[var(--color-text)] px-2.5 py-1 select-none"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggle}
              className="text-xs font-mono tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors border border-[var(--color-border)] px-2.5 py-1 select-none"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              aria-label="Menú"
            >
              <span className={`block w-5 h-[1.5px] bg-[var(--color-text)] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-[var(--color-text)] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-[var(--color-text)] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-[var(--color-bg)] flex flex-col items-center justify-center gap-10"
          >
            <ul className="flex flex-col items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="text-2xl font-light tracking-wide text-[var(--color-text)] hover:text-[var(--color-muted)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
