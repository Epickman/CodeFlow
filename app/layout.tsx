import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = "https://agustingaleazzidev.com.ar";
const DESCRIPTION =
  "Portfolio de Agustin Galeazzi Dev, Diseñador Multimedial y Desarrollador Web de La Plata, Argentina. Especializado en diseño web, UX/UI y experiencias interactivas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Agustin Galeazzi Dev — Diseñador Multimedial y Desarrollador Web",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  verification: { google: "9Bl9OnTVA3gckXl_8OOzEtXX2B56tMop9ix1Z_AdpeQ" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Agustin Galeazzi Dev",
    title: "Agustin Galeazzi Dev — Diseñador Multimedial y Desarrollador Web",
    description: DESCRIPTION,
    images: [{ url: "/banner.jpg", width: 2058, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agustin Galeazzi Dev",
    description: DESCRIPTION,
    images: ["/banner.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Agustin Galeazzi",
  jobTitle: "Diseñador Multimedial y Desarrollador Web",
  url: SITE_URL,
  image: `${SITE_URL}/yo.jpg`,
  email: "mailto:agustingaleazzidev@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "La Plata",
    addressCountry: "AR",
  },
  sameAs: [
    "https://www.linkedin.com/in/agustingaleazzi/",
    "https://www.behance.net/Tingaleazzi",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
