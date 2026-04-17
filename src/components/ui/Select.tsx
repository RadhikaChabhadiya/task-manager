import { SelectHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={clsx(
        "px-4 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700",
        "focus:outline-none focus:ring-2 focus:ring-brand-500 transition cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";
