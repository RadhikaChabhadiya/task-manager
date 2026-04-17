"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="glass sticky top-0 z-30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white">✦</span>
          TaskFlow
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4">
          <Link href="/" className="px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Home</Link>
          <Link href="/tasks" className="px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Tasks</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
