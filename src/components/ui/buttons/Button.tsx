import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "small" | "large";

type ButtonProps = {
  as?: "button" | "a";
  href?: string;
  children: ReactNode;
  icon?: "arrow" | "none";
  size?: ButtonSize;
  variant?: ButtonVariant;
} & Omit<ComponentPropsWithoutRef<"button">, "children"> &
  Omit<ComponentPropsWithoutRef<"a">, "children">;

const sizeClasses: Record<ButtonSize, string> = {
  small: "h-10 px-6 text-[16px]",
  large: "h-12 px-6 text-[16px]",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-bg-inverted)] text-[var(--color-text-inverted)] hover:rounded-[24px]",
  secondary:
    "bg-[rgba(230,230,242,0.07)] text-[var(--color-text-secondary)] hover:bg-[rgba(230,230,242,0.12)] hover:rounded-[24px]",
};

export function Button({
  as = "button",
  children,
  className,
  href,
  icon = "none",
  size = "large",
  variant = "primary",
  ...rest
}: ButtonProps) {
  const classes = [
    "group inline-flex items-center justify-center overflow-hidden rounded-[8px] transition-all duration-300 ease-out",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <span className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
      <span className="font-medium leading-none whitespace-nowrap">{children}</span>
      {icon === "arrow" ? (
        <span className="relative h-6 w-6 overflow-hidden">
          <ArrowRightIcon className="absolute left-0 top-0 h-6 w-6 transition-transform duration-300 ease-out group-hover:translate-x-6" />
          <ArrowRightIcon className="absolute left-[-24px] top-0 h-6 w-6 transition-transform duration-300 ease-out group-hover:translate-x-6" />
        </span>
      ) : null}
    </span>
  );

  if (as === "a") {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...rest}>
      {content}
    </button>
  );
}
