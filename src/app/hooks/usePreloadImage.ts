import { useEffect, useState } from "react";

export type PreloadStatus = "idle" | "loading" | "loaded" | "error";

/** Precarga una imagen en segundo plano (útil antes de montar Swiper). */
export function usePreloadImage(
  src: string | undefined,
  enabled = true,
): PreloadStatus {
  const [status, setStatus] = useState<PreloadStatus>("idle");

  useEffect(() => {
    if (!src || !enabled) {
      setStatus("idle");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (!cancelled) setStatus("loaded");
    };
    img.onerror = () => {
      if (!cancelled) setStatus("error");
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, enabled]);

  return status;
}

/** Precarga un conjunto de URLs únicas. */
export function usePreloadImages(
  sources: string[],
  enabled = true,
): PreloadStatus {
  const uniqueKey = [...new Set(sources.filter(Boolean))].sort().join("|");
  const [status, setStatus] = useState<PreloadStatus>("idle");

  useEffect(() => {
    const unique = uniqueKey ? uniqueKey.split("|") : [];
    if (!enabled || unique.length === 0) {
      setStatus("idle");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    Promise.all(
      unique.map(
        (src) =>
          new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.decoding = "async";
            img.onload = () => resolve();
            img.onerror = () => reject();
            img.src = src;
          }),
      ),
    )
      .then(() => {
        if (!cancelled) setStatus("loaded");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [uniqueKey, enabled]);

  return status;
}
