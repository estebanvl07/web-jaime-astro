"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/components/ui/resizable";

type BeforeAfterCompareProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
};

export function BeforeAfterCompare({
  beforeSrc,
  afterSrc,
  beforeAlt = "Antes del tratamiento",
  afterAlt = "Después del tratamiento",
  className = "",
}: BeforeAfterCompareProps) {
  return (
    <div
      className={`@container relative isolate aspect-4/3 overflow-hidden rounded-[28px] bg-secondary ${className}`.trim()}
    >
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 size-full object-cover object-center"
      />
      <span className="pointer-events-none absolute top-4 right-4 z-10 rounded-full bg-brand-dark/80 px-3 py-1 text-xs font-medium text-white">
        Después
      </span>

      <ResizablePanelGroup
        direction="horizontal"
        className="absolute inset-0 min-h-0 min-w-0 overflow-hidden"
      >
        <ResizablePanel
          id="antes"
          defaultSize="50%"
          minSize="14%"
          maxSize="86%"
          className="relative min-w-0 overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={beforeSrc}
              alt={beforeAlt}
              className="absolute top-0 left-0 h-full w-[100cqw] max-w-none object-cover object-center"
            />
          </div>
          <span className="pointer-events-none absolute top-4 left-4 z-10 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
            Antes
          </span>
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className="w-px overflow-visible bg-white shadow-[0_0_0_1px_rgba(28,25,20,0.12)] after:w-1 after:bg-white/70"
        />

        <ResizablePanel
          id="despues"
          defaultSize="50%"
          minSize="14%"
          className="min-w-0 overflow-hidden"
        />
      </ResizablePanelGroup>
    </div>
  );
}
