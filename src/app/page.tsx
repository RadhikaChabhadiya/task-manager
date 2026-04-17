import Link from "next/link";

export default function HomePage() {
  return (
    <section className="animate-fade-in flex flex-col items-center text-center gap-6 py-16">
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-100">
        Frontend Developer Practical Test
      </span>
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
        Build. Filter. <span className="text-brand-600 dark:text-brand-500">Ship.</span>
      </h1>
      <p className="max-w-xl text-slate-600 dark:text-slate-400">
        A senior-grade task manager built with Next.js 14, Redux Toolkit, TanStack Query, Axios,
        and Tailwind. Server-rendered, optimistically updated, fully responsive.
      </p>
      <Link
        href="/tasks"
        className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-lg shadow-brand-600/30 transition"
      >
        Open Tasks →
      </Link>
    </section>
  );
}
