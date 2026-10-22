export type Lang = "es" | "en";

const translations = {
  es: {
    nav: {
      works: "Trabajos",
      about: "Sobre mí",
      contact: "Contacto",
    },
    hero: {
      line2: ["Desarrollo", "Web"],
      line3: ["Programación de apps"],
      line4: ["Explorá mis", "trabajos"],
    },
    projects: {
      label: "Trabajos",
      noPreview: "Vista previa no disponible",
      categoryWeb: "Páginas web",
      categoryApp: "Apps",
    },
    about: {
      label: "Sobre mí",
      role: "Diseñador Multimedial",
      bio1: "Soy Agustín Galeazzi, licenciado en Diseño Multimedial. Me especializo en crear experiencias digitales, partiendo desde el análisis conceptual hasta el desarrollo de un producto final.",
      bio2: "Trabajo en la intersección del diseño y la programación, combinando criterio visual con código para construir piezas que no solo se ven bien, sino que funcionan.",
      linkedin: "Ver perfil en LinkedIn →",
      skills: "Habilidades",
      featured: "Trabajo destacado",
      featuredDesc: "Sitio para productora de eventos con identidad propia. Eventos corporativos y sociales, portfolio de trabajos y gestión de consultas.",
      featuredType: "App",
    },
    contact: {
      label: "Contacto",
      heading1: "¿Tenés un proyecto",
      heading2: "en mente?",
      waMessage: "Hola%20Agustin%2C%20te%20contacto%20desde%20tu%20portfolio%20web.",
    },
    footer: {
      copy: "© 2025 Agustín Galeazzi — Diseñador Multimedial",
    },
  },
  en: {
    nav: {
      works: "Works",
      about: "About",
      contact: "Contact",
    },
    hero: {
      line2: ["Web", "Development"],
      line3: ["App Development"],
      line4: ["Explore my", "work"],
    },
    projects: {
      label: "Works",
      noPreview: "Preview not available",
      categoryWeb: "Web pages",
      categoryApp: "Apps",
    },
    about: {
      label: "About me",
      role: "Multimedia Designer",
      bio1: "I'm Agustín Galeazzi, a Multimedia Design graduate. I specialize in crafting digital experiences — from conceptual analysis through to the final product.",
      bio2: "I work at the intersection of design and programming, combining visual sensibility with code to build things that not only look good, but work.",
      linkedin: "View LinkedIn profile →",
      skills: "Skills",
      featured: "Featured work",
      featuredDesc: "Platform for an event production company with its own identity. Corporate and social events, project portfolio and inquiry management.",
      featuredType: "App",
    },
    contact: {
      label: "Contact",
      heading1: "Got a project",
      heading2: "in mind?",
      waMessage: "Hello%20Agustin%2C%20I%27m%20reaching%20out%20from%20your%20web%20portfolio.",
    },
    footer: {
      copy: "© 2025 Agustín Galeazzi — Multimedia Designer",
    },
  },
} as const;

export default translations;
