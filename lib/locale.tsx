"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Locale } from "./strings";

const LocaleCtx = createContext<Locale>("ko");

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ko");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param === "en" || param === "ko") {
      setLocale(param);
    } else {
      setLocale(navigator.language.startsWith("ko") ? "ko" : "en");
    }
  }, []);

  return <LocaleCtx.Provider value={locale}>{children}</LocaleCtx.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleCtx);
}
