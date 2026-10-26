import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Totems from "@/components/sections/Totems";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <Totems />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
