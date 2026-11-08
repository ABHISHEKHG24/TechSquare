"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

export interface UseThemeProps {
  themes: string[];
  setTheme: (theme: string) => void;
  theme?: string;
  forcedTheme?: string;
  resolvedTheme?: string;
  systemTheme?: "dark" | "light";
}

export interface ThemeProviderProps {
  children?: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  storageKey?: string;
  themes?: string[];
  disableTransitionOnChange?: boolean;
  forcedTheme?: string;
}

const ThemeContext = createContext<UseThemeProps>({
  themes: ["light", "dark", "system"],
  setTheme: () => {},
  theme: "dark",
  resolvedTheme: "dark",
});

const getSystemTheme = (): "dark" | "light" => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
  storageKey = "theme",
  themes = ["light", "dark", "system"],
  disableTransitionOnChange = false,
  forcedTheme,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setThemeState(stored);
      }
    } catch {
      // storage disabled or unavailable
    }
    setSystemTheme(getSystemTheme());
  }, [storageKey]);

  const resolvedTheme = useMemo(() => {
    if (forcedTheme) return forcedTheme;
    if (theme === "system") return systemTheme;
    return theme;
  }, [theme, systemTheme, forcedTheme]);

  const applyTheme = useCallback(
    (targetTheme: string) => {
      const root = document.documentElement;
      const effective =
        targetTheme === "system" ? getSystemTheme() : targetTheme;

      if (disableTransitionOnChange) {
        const css = document.createElement("style");
        css.appendChild(
          document.createTextNode(
            "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
          )
        );
        document.head.appendChild(css);
        if (attribute === "class") {
          root.classList.remove("light", "dark");
          root.classList.add(effective);
        } else {
          root.setAttribute(attribute, effective);
        }
        window.getComputedStyle(root).opacity;
        document.head.removeChild(css);
      } else {
        if (attribute === "class") {
          root.classList.remove("light", "dark");
          root.classList.add(effective);
        } else {
          root.setAttribute(attribute, effective);
        }
      }
    },
    [attribute, disableTransitionOnChange]
  );

  const setTheme = useCallback(
    (newTheme: string) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // storage disabled or unavailable
      }
      applyTheme(newTheme);
    },
    [storageKey, applyTheme]
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const sys = media.matches ? "dark" : "light";
      setSystemTheme(sys);
      if (theme === "system") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme, applyTheme]);

  useEffect(() => {
    applyTheme(forcedTheme || theme);
  }, [forcedTheme, theme, applyTheme]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setThemeState(e.newValue);
        applyTheme(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey, applyTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme,
      themes,
      systemTheme,
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, themes, systemTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
