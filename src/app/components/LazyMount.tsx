import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyMountProps = {
  children: ReactNode;
  /** Cuánto antes del viewport montar (px) */
  rootMargin?: string;
  className?: string;
  /** Altura mínima del placeholder para evitar CLS */
  minHeight?: number | string;
};

/** Monta children solo al acercarse al viewport (ahorra JS/GPU inicial en móvil). */
export function LazyMount({
  children,
  rootMargin = "280px",
  className = "",
  minHeight,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setReady(true);
      return;
    }

    // Si ya está cerca al montar (p. ej. scroll a #servicios), montar ya.
    const rect = el.getBoundingClientRect();
    const margin = Number.parseInt(rootMargin, 10) || 0;
    if (rect.top < window.innerHeight + margin) {
      setReady(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={minHeight != null ? { minHeight } : undefined}
    >
      {ready ? children : null}
    </div>
  );
}
