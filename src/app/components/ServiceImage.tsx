import type { CSSProperties } from "react";
import { LazyImage } from "@/app/components/LazyImage";

type ServiceImageProps = {
  src: string;
  alt: string;
  overlaySrc?: string;
  overlayAlt?: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  priority?: boolean;
  style?: CSSProperties;
  width?: number;
  height?: number;
};

export function ServiceImage({
  src,
  alt,
  overlaySrc,
  overlayAlt = "Alineadores dentales transparentes",
  className = "",
  imageClassName = "",
  overlayClassName = "h-[72px] w-[72px] sm:h-20 sm:w-20 lg:h-24 lg:w-24",
  priority = false,
  style,
  width,
  height,
}: ServiceImageProps) {
  return (
    <div className={`relative ${className}`}>
      <LazyImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        style={style}
        className={imageClassName}
      />

      {overlaySrc ? (
        <div
          aria-hidden={!overlayAlt}
          className={`absolute bottom-4 left-4 z-10 overflow-hidden rounded-full border-[3px] border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.25)] sm:bottom-5 sm:left-5 ${overlayClassName}`}
        >
          <LazyImage
            src={overlaySrc}
            alt={overlayAlt}
            className="h-full w-full object-cover object-center"
          />
        </div>
      ) : null}
    </div>
  );
}
