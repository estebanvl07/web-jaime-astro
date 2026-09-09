import type { ReactNode } from "react";

export const sectionBadgeClass =
  "inline-flex w-fit max-w-full items-center rounded-full border border-brand/25 bg-brand/10 px-3.5 py-1 text-xs font-medium tracking-wide text-brand";

type SectionBadgeProps = {
  children: ReactNode;
  className?: string;
};

export function SectionBadge({ children, className = "" }: SectionBadgeProps) {
  return (
    <span className={`${sectionBadgeClass} ${className}`.trim()}>
      {children}
    </span>
  );
}
