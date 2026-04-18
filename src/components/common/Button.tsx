import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "px-4 py-2.5 rounded-xl font-medium text-sm transition disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && "bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-600/20",
        variant === "ghost" && "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
        variant === "danger" && "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300",
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
