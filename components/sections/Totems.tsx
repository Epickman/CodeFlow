"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import totems from "@/data/totems.json";

interface Totem {
  id: string;
  title: string;
  category: string;
  category_en: string;
  description: string;
  description_en: string;
  behance: string;
  embed: string;
  tags: string[];
  accent: string;
}

function TotemCard({ totem, index, lang }: { totem: Totem; index: number; lang: string }) {
  const description = lang === "en" ? totem.description_en : totem.description;

  return (
    <motion.a
      href={totem.behance}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 block overflow-hidden"
    >
      {/* Embed Behance */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#111111]">
        <iframe
          src={totem.embed}
          className="absolute inset-0 w-[calc(100%+17px)] h-full"
          scrolling="no"
          allowFullScreen
          frameBorder="0"
          allow="clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
        />
        {/* Accent line top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] z-10 pointer-events-none" style={{ background: totem.accent }} />
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 leading-snug group-hover:underline underline-offset-2">
          {totem.title}
        </h3>
        <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-5">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {totem.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--color-muted)] bg-[var(--color-bg)] px-2.5 py-1 border border-[var(--color-border)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Totems() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="experiencias"
      className="py-28 px-8 md:px-16 border-t border-[var(--color-border)]"
    >
      <div className="w-full">
        <div className="flex items-baseline gap-4 mb-12">
          <span className="text-xs font-mono text-[var(--color-accent)]">02</span>
          <h2 className="text-xs tracking-widest uppercase text-[var(--color-muted)]">
            {t.totems.label}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {(totems as Totem[]).map((totem, index) => (
            <TotemCard
              key={totem.id}
              totem={totem}
              index={index}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
