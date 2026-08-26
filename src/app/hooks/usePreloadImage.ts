import { useEffect, useState } from "react";

export type PreloadStatus = "idle" | "loading" | "loaded" | "error";

const statusCache = new Map<string, PreloadStatus>();
const inflight = new Map<string, Promise<void>>();

export function getCachedImageStatus(src: string | undefined): PreloadStatus {
  if (!src) return "idle";
  return statusCache.get(src) ?? "idle";
}

/** Precarga una URL y la guarda en memoria para reutilizarla al volver al scroll. */
export function preloadImage(src: string): Promise<void> {
  const cached = statusCache.get(src);
  if (cached === "loaded") return Promise.resolve();
  if (cached === "error") return Promise.reject();

  const pending = inflight.get(src);
  if (pending) return pending;

  statusCache.set(src, "loading");

  const promise = new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      statusCache.set(src, "loaded");
      inflight.delete(src);
      resolve();
    };
    img.onerror = () => {
      statusCache.set(src, "error");
      inflight.delete(src);
      reject();
    };
    img.src = src;
  });

  inflight.set(src, promise);
  return promise;
}

export function preloadImages(sources: string[]): Promise<void> {
  const unique = [...new Set(sources.filter(Boolean))];
  if (unique.length === 0) return Promise.resolve();
  return Promise.all(unique.map(preloadImage)).then(() => undefined);
}

/** Precarga una imagen en segundo plano (útil antes de montar Swiper). */
export function usePreloadImage(
  src: string | undefined,
  enabled = true,
): PreloadStatus {
  const [status, setStatus] = useState<PreloadStatus>(() =>
    getCachedImageStatus(src),
  );

  useEffect(() => {
    if (!src || !enabled) {
      setStatus("idle");
      return;
    }

    const cached = getCachedImageStatus(src);
    if (cached === "loaded" || cached === "error") {
      setStatus(cached);
      return;
    }

    let cancelled = false;
    setStatus("loading");

    preloadImage(src)
      .then(() => {
        if (!cancelled) setStatus("loaded");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

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
  const [status, setStatus] = useState<PreloadStatus>(() => {
    if (!uniqueKey) return "idle";
    const urls = uniqueKey.split("|");
    if (urls.every((url) => getCachedImageStatus(url) === "loaded")) {
      return "loaded";
    }
    if (urls.some((url) => getCachedImageStatus(url) === "error")) {
      return "error";
    }
    return "idle";
  });

  useEffect(() => {
    const unique = uniqueKey ? uniqueKey.split("|") : [];
    if (!enabled || unique.length === 0) {
      setStatus("idle");
      return;
    }

    if (unique.every((url) => getCachedImageStatus(url) === "loaded")) {
      setStatus("loaded");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    preloadImages(unique)
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
