"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import translations, { Lang } from "@/data/translations";

type T = (typeof translations)[Lang];

type Ctx = {
  lang: Lang;
  t: T;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx>({
  lang: "es",
  t: translations.es as T,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  return (
    <LanguageContext.Provider
      value={{
        lang,
        t: translations[lang] as T,
        toggle: () => setLang((l) => (l === "es" ? "en" : "es")),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
