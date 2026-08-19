import { useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { translations, type Language } from "./translations";
import { LanguageContext, type LanguageContextValue, type TranslateValues } from "./i18nContext";

const STORAGE_KEY = "routewise-language";

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") return stored;

    return window.navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: (key, values) => translate(language, key, values),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function translate(language: Language, key: string, values?: TranslateValues) {
  const rawValue = key.split(".").reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === "object" && segment in acc) {
      return (acc as Record<string, unknown>)[segment];
    }

    return undefined;
  }, translations[language]);

  if (typeof rawValue !== "string") return key;
  if (!values) return rawValue;

  return rawValue.replace(/\{\{(\w+)\}\}/g, (_, token: string) => String(values[token] ?? ""));
}
