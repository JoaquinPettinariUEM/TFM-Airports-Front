import { createContext, useContext } from "react";
import type { Language } from "./translations";

export type TranslateValues = Record<string, string | number>;

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, values?: TranslateValues) => string;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useI18n() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider");
  }

  return context;
}
