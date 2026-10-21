"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-8 px-8 md:px-16 border-t border-[var(--color-border)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-xs text-[var(--color-muted)]">{t.footer.copy}</p>
        <div className="flex gap-6">
          <a
            href="mailto:agustingaleazzidev@gmail.com"
            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.behance.net/Tingaleazzi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            Behance
          </a>
        </div>
      </div>
    </footer>
  );
}
