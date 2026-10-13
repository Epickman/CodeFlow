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
        <p className="text-xs text-[var(--color-muted)]">
          © 2025 Agustin Galeazzi
        </p>
      </footer>
    </main>
  );
}
