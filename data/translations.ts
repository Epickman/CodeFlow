export type Lang = "es" | "en";

const translations = {
  es: {
    nav: {
      works: "Trabajos",
      about: "Sobre mí",
      contact: "Contacto",
    },
    hero: {
      line2: ["Soluciones", "Digitales"],
      line3: ["Explorá mis", "trabajos"],
    },
    projects: {
      label: "Trabajos",
      noPreview: "Vista previa no disponible",
    },
    about: {
      label: "Sobre mí",
      role: "Diseñador Multimedial",
      bio1: "Soy licenciado en diseño multimedial, me dedico a realizar experiencias digitales que parten desde el análisis hasta el diseño del producto final, poniendo especial atención a cada detalle.",
      bio2: "Realizo trabajos de programación digital y desarrollo web que permiten fusionar distintas ramas del campo de la multimedia.",
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
      copy: "© 2025 Agustin Galeazzi — Diseñador Multimedial",
    },
  },
  en: {
    nav: {
      works: "Works",
      about: "About",
      contact: "Contact",
    },
    hero: {
      line2: ["Digital", "Solutions"],
      line3: ["Explore my", "work"],
    },
    projects: {
      label: "Works",
      noPreview: "Preview not available",
    },
    about: {
      label: "About me",
      role: "Multimedia Designer",
      bio1: "I hold a degree in Multimedia Design. I specialize in building digital experiences — from initial analysis through to the final product — paying close attention to every detail.",
      bio2: "I work in digital programming and web development, bridging different branches of the multimedia field.",
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
      copy: "© 2025 Agustin Galeazzi — Multimedia Designer",
    },
  },
} as const;

export default translations;
