import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Actualizar con el dominio real una vez deployado con dominio propio
const SITE_URL = "https://agustingaleazzidev.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Agustín Galeazzi — Diseñador Web & Multimedial | La Plata, Argentina",
    template: "%s | Agustín Galeazzi",
  },
  description:
    "Portfolio de Agustín Galeazzi, Licenciado en Diseño Multimedial y Desarrollador Web de La Plata, Argentina. Especializado en diseño UX/UI, experiencias digitales y desarrollo con Next.js.",
  keywords: [
    "diseñador web La Plata",
    "desarrollador web Argentina",
    "diseño UX UI",
    "Agustín Galeazzi",
    "diseñador multimedial",
    "portfolio diseñador web",
    "Next.js developer Argentina",
    "diseño web freelance",
    "experiencias digitales",
    "frontend developer Argentina",
  ],
  authors: [{ name: "Agustín Galeazzi", url: SITE_URL }],
  creator: "Agustín Galeazzi",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Agustín Galeazzi Dev",
    title: "Agustín Galeazzi — Diseñador Web & Multimedial",
    description:
      "Licenciado en Diseño Multimedial y Desarrollador Web de La Plata, Argentina. Especializado en diseño UX/UI, experiencias digitales y Next.js.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agustín Galeazzi — Diseñador Web & Multimedial",
    description:
      "Licenciado en Diseño Multimedial y Desarrollador Web de La Plata, Argentina.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Agustín Galeazzi",
      url: SITE_URL,
      image: `${SITE_URL}/yo.jpg`,
      jobTitle: "Diseñador Web y Desarrollador Frontend",
      description:
        "Licenciado en Diseño Multimedial especializado en experiencias digitales, diseño UX/UI y desarrollo web con Next.js.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "La Plata",
        addressRegion: "Buenos Aires",
        addressCountry: "AR",
      },
      sameAs: [
        "https://www.linkedin.com/in/agustingaleazzi/",
        "https://www.behance.net/Tingaleazzi",
      ],
      email: "agustingaleazzidev@gmail.com",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Agustín Galeazzi Dev",
      description:
        "Portfolio de Agustín Galeazzi, Diseñador Web y Desarrollador Multimedial.",
      author: { "@id": `${SITE_URL}/#person` },
      inLanguage: "es-AR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
