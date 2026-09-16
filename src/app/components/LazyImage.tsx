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
  // En móvil, `loading="lazy"` dentro de contenedores que montan tarde
  // (LazyMount / opacity:0) a menudo nunca dispara la descarga.
  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");
  const resolvedFetchPriority =
    fetchPriority ?? (priority ? "high" : resolvedLoading === "eager" ? "auto" : "low");

  return (
    <img
      loading={resolvedLoading}
      fetchPriority={resolvedFetchPriority}
      decoding={decoding}
      {...props}
    />
  );
}
