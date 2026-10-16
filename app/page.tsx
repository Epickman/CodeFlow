import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <footer className="py-8 px-8 md:px-16 border-t border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-[var(--color-muted)]">
            © 2025 Agustin Galeazzi — Diseñador Multimedial
          </p>
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
    </main>
  );
}
