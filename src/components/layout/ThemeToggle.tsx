"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme() as {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
  };
  const [mounted, setMounted] = useState<boolean>(false);
  const dark = theme === "dark";

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-9 h-9 grid place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
