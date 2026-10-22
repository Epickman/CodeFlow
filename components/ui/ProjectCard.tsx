"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Project {
  id: string;
  title: string;
  category: string;
  category_en?: string;
  description: string;
  description_en?: string;
  url: string;
  appStore?: string;
  playStore?: string;
  tags: string[];
}

function screenshotUrl(siteUrl: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(siteUrl)}?w=800&h=500`;
}

function Thumbnail({ url, title, noPreview, isApp, appStore }: { url: string; title: string; noPreview: string; isApp?: boolean; appStore?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [appScreenshots, setAppScreenshots] = useState<string[]>([]);

  useEffect(() => {
    if (!isApp || !appStore) return;
    const match = appStore.match(/id(\d+)/);
    if (!match) return;
    fetch(`https://itunes.apple.com/lookup?id=${match[1]}`)
      .then((r) => r.json())
      .then((data) => {
        const srcs: string[] = data.results?.[0]?.screenshotUrls ?? [];
        if (srcs.length) setAppScreenshots(srcs);
      })
      .catch(() => {});
  }, [isApp, appStore]);

  if (isApp) {
    if (!appScreenshots.length) {
      return (
        <div className="w-full h-52 bg-gradient-to-br from-[var(--color-border)] to-[var(--color-bg)] animate-pulse" />
      );
    }
    return (
      <div className="w-full overflow-x-auto bg-[var(--color-bg)] scrollbar-hide">
        <div className="flex gap-2 p-3">
          {appScreenshots.map((src, i) => (
            <div key={i} className="relative flex-shrink-0 h-52 w-24 rounded overflow-hidden">
              <Image
                src={src}
                alt={`${title} screenshot ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="relative w-full aspect-video overflow-hidden bg-[var(--color-bg)] flex items-center justify-center">
        <span className="text-xs text-[var(--color-muted)] tracking-widest uppercase">
          {noPreview}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-[var(--color-bg)]">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-border)] to-[var(--color-bg)] animate-pulse" />
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]">
          <span className="text-xs text-[var(--color-muted)] tracking-widest uppercase">
            {noPreview}
          </span>
        </div>
      )}

      {!error && (
        <Image
          src={screenshotUrl(url)}
          alt={`Captura de ${title}`}
          fill
          className={`object-cover object-top transition-all duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          unoptimized
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}

      <div className="absolute inset-0 bg-[var(--color-text)]/0 group-hover:bg-[var(--color-text)]/10 transition-colors duration-300 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
          <ArrowUpRight size={16} className="text-[var(--color-text)]" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { lang, t } = useLanguage();
  const category = lang === "en" && project.category_en ? project.category_en : project.category;
  const description = lang === "en" && project.description_en ? project.description_en : project.description;
  const isApp = !!(project.appStore || project.playStore);

  const cardContent = (
    <>
      <Thumbnail url={project.url} title={project.title} noPreview={t.projects.noPreview} isApp={isApp} appStore={project.appStore} />

      <div className="p-6">
        <div className="mb-3">
          <span className="text-xs tracking-widest uppercase text-[var(--color-muted)]">
            {category}
          </span>
        </div>
        <h3 className={`text-lg font-semibold mb-2 leading-snug ${!isApp ? "group-hover:underline underline-offset-2" : ""}`}>
          {project.title}
        </h3>
        <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-5">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--color-muted)] bg-[var(--color-bg)] px-2.5 py-1 border border-[var(--color-border)]"
            >
              {tag}
            </span>
          ))}
        </div>
        {isApp && (
          <div className="flex flex-wrap gap-3 mt-5">
            {project.appStore && (
              <a
                href={project.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs border border-[var(--color-border)] px-3 py-1.5 hover:border-[var(--color-text)] transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                App Store <ArrowUpRight size={12} />
              </a>
            )}
            {project.playStore && (
              <a
                href={project.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs border border-[var(--color-border)] px-3 py-1.5 hover:border-[var(--color-text)] transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                Google Play <ArrowUpRight size={12} />
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );

  if (isApp) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 overflow-hidden"
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 block overflow-hidden"
    >
      {cardContent}
    </motion.a>
  );
}
