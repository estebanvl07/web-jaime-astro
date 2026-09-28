import { Clock, MapPin, Phone } from "lucide-react";
import { siteInfo } from "@/app/data/site";

export function InfoBar() {
  return (
    <div
      id="info-bar"
      className="relative z-50 flex h-[var(--info-bar-height)] items-center bg-brand-dark text-[11px] text-white/75 sm:text-xs"
    >
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-12">
        <p className="flex min-w-0 items-center gap-1.5">
          <MapPin size={12} className="shrink-0 text-brand-soft" aria-hidden />
          <span className="truncate">
            {siteInfo.neighborhood}, {siteInfo.city}
          </span>
        </p>
        <p className="hidden min-w-0 items-center gap-1.5 md:flex">
          <Clock size={12} className="shrink-0 text-brand-soft" aria-hidden />
          <span className="truncate">{siteInfo.hours.compact}</span>
        </p>
        <a
          href={`tel:${siteInfo.phoneE164}`}
          className="inline-flex shrink-0 items-center gap-1.5 text-white/90 transition-colors hover:text-white"
        >
          <Phone size={12} className="text-brand-soft" aria-hidden />
          {siteInfo.phone}
        </a>
      </div>
    </div>
  );
}
