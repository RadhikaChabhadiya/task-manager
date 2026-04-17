import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={clsx(
        "w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700",
        "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition",
        "placeholder:text-slate-400",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
