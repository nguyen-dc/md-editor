"use client";

import * as React from "react";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline: "bg-transparent text-primary border-border hover:bg-muted/50"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-base"
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type ?? "button"}
      className={clsx(base, variantClasses[variant], sizeClasses[size], className)}
    />
  );
}

