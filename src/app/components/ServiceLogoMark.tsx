import type { CSSProperties } from "react";

const PLACEHOLDER = "/images/services/placeholder-doctor.png";

type ServiceLogoMarkProps = {
  className?: string;
  style?: CSSProperties;
};

/** Placeholder de servicio: foto del doctor con cover, top y fade-bottom. */
export function ServiceLogoMark({
  className = "",
  style,
}: ServiceLogoMarkProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-secondary ${className}`.trim()}
    >
      <img
        src={PLACEHOLDER}
        alt=""
        width={1086}
        height={1448}
        className="fade-bottom pointer-events-none absolute inset-0 size-full object-cover object-top"
        style={style}
      />
    </div>
  );
}
