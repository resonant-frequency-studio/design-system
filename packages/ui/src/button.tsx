// packages/ui/src/Button.tsx (published as @harmonic/ui)
import React from "react";

export type Variant = "primary" | "secondary" | "ghost";
export type Size = "sm" | "md";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center justify-center font-semibold leading-[120%] " +
  "rounded-button transition-colors focus:outline-none focus-visible:ring-2 " +
  "px-4 py-2";

const variants: Record<Variant, string> = {
  primary: "bg-brand-primary text-text-inverse",
  secondary: "bg-bg-surface text-brand-primary border border-border-default",
  ghost: "bg-transparent text-brand-primary"
};

const sizes: Record<Size, string> = {
  sm: "text-[14px] py-2 px-3",
  md: "text-[14px] py-2.5 px-4"
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button className={[base, variants[variant], sizes[size], className].filter(Boolean).join(" ")} {...props} />
  );
}
