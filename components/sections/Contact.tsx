"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ExternalLink, MessageCircle } from "lucide-react";

const WA_LINK =
  "https://wa.me/542215762430?text=Hola%20Agustin%2C%20te%20contacto%20desde%20tu%20portfolio%20web.";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contacto"
      ref={ref}
      className="py-28 px-8 md:px-16 border-t border-[var(--color-border)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <h2 className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-8">
          Contacto
        </h2>
        <p className="text-4xl md:text-5xl font-semibold leading-tight mb-12">
          ¿Tenés un proyecto
          <br />
          en mente?
        </p>
        <div className="space-y-5 w-full max-w-sm">
          <a
            href="mailto:agustingaleazzidev@gmail.com"
            className="flex items-center gap-4 group"
          >
            <span className="flex items-center justify-center w-10 h-10 border border-[var(--color-border)] text-[var(--color-muted)] group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] transition-colors">
              <Mail size={16} />
            </span>
            <span className="text-sm group-hover:text-[var(--color-accent)] transition-colors">
              agustingaleazzidev@gmail.com
            </span>
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
          >
            <span className="flex items-center justify-center w-10 h-10 border border-[var(--color-border)] text-[var(--color-muted)] group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] transition-colors">
              <MessageCircle size={16} />
            </span>
            <span className="text-sm group-hover:text-[var(--color-accent)] transition-colors">
              +54 221 576-2430
            </span>
          </a>
          <a
            href="https://www.behance.net/Tingaleazzi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
          >
            <span className="flex items-center justify-center w-10 h-10 border border-[var(--color-border)] text-[var(--color-muted)] group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] transition-colors">
              <ExternalLink size={16} />
            </span>
            <span className="text-sm group-hover:text-[var(--color-accent)] transition-colors">
              behance.net/Tingaleazzi
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
