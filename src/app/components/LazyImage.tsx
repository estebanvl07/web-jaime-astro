import type { ImgHTMLAttributes } from "react";

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Imagen above-the-fold o activa: carga inmediata con alta prioridad. */
  priority?: boolean;
};

export function LazyImage({
  priority = false,
  loading,
  fetchPriority,
  decoding = "async",
  ...props
}: LazyImageProps) {
  return (
    <img
      loading={loading ?? (priority ? "eager" : "lazy")}
      fetchPriority={fetchPriority ?? (priority ? "high" : "low")}
      decoding={decoding}
      {...props}
    />
  );
}
