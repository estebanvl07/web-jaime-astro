import { useEffect, useRef, useState } from "react";

type UseInViewOnceOptions = {
  rootMargin?: string;
  threshold?: number | number[];
};

/**
 * Detecta visibilidad en viewport. `mounted` pasa a true la primera vez
 * que entra en pantalla y no vuelve a false (evita desmontar Swiper al scroll).
 */
export function useInViewOnce(options: UseInViewOnceOptions = {}) {
  const { rootMargin = "240px", threshold = 0.05 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);
        if (visible) setMounted(true);
      },
      { rootMargin, threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return { ref, inView, mounted };
}
