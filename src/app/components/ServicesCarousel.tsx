import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ServiceImage } from "@/app/components/ServiceImage";
import { ServiceLogoMark } from "@/app/components/ServiceLogoMark";
import { LazyImage } from "@/app/components/LazyImage";
import { useServiceViewTransition } from "@/app/hooks/useServiceViewTransition";
import { activateServiceViewTransition } from "@/app/lib/viewTransitions";
import { isEmptyServiceImage } from "@/app/data/serviceImages";

const INITIAL_VISIBLE = 8;

export type ServiceCardItem = {
  title: string;
  description: string;
  image: string;
  overlayImage?: string;
  slug: string;
};

type ServicesCarouselProps = {
  services: ServiceCardItem[];
  className?: string;
};

function ServiceCard({
  service,
  priority = false,
}: {
  service: ServiceCardItem;
  priority?: boolean;
}) {
  const { to, imageName, titleName } = useServiceViewTransition(service.slug);
  const isEmpty = isEmptyServiceImage(service.image);

  return (
    <Link
      to={to}
      viewTransition
      onClick={() => activateServiceViewTransition(service.slug)}
      className="group relative block h-full w-full overflow-hidden rounded-2xl bg-secondary"
    >
      {isEmpty ? (
        <ServiceLogoMark
          className="absolute inset-0"
          style={{ viewTransitionName: imageName }}
        />
      ) : (
        <ServiceImage
          src={service.image}
          alt={service.title}
          width={800}
          height={533}
          priority={priority}
          className="absolute inset-0 h-full w-full"
          style={{ viewTransitionName: imageName }}
          imageClassName="service-vt-image absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div
        className={
          isEmpty
            ? "absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent"
            : "absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
        }
      />

      <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-colors group-hover:bg-white/40">
        <ArrowUpRight size={16} strokeWidth={2.25} />
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4">
        {service.overlayImage ? (
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-[3px] border-white/90 shadow-[0_6px_20px_rgba(0,0,0,0.3)] sm:h-[72px] sm:w-[72px]">
            <LazyImage
              src={service.overlayImage}
              alt="Alineadores dentales"
              priority
              className="h-full w-full object-cover object-center"
            />
          </div>
        ) : null}

        <div className="min-w-0 flex-1 pb-0.5">
          <p
            style={{ viewTransitionName: titleName }}
            className="service-vt-title truncate text-sm font-semibold leading-snug text-white sm:text-[15px]"
          >
            {service.title}
          </p>
          <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/80 sm:text-[13px]">
            {service.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function ServicesCarousel({
  services,
  className = "",
}: ServicesCarouselProps) {
  const [showAll, setShowAll] = useState(false);
  const hiddenCount = Math.max(0, services.length - INITIAL_VISIBLE);
  const visibleServices = showAll
    ? services
    : services.slice(0, INITIAL_VISIBLE);

  const toggleShowAll = () => {
    const next = !showAll;
    setShowAll(next);
    if (!next) {
      document.getElementById("servicios")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-10 xl:grid-cols-4">
        {visibleServices.map((service, index) => (
          <div
            key={service.slug}
            className="aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <ServiceCard
              service={service}
              priority={index < INITIAL_VISIBLE}
            />
          </div>
        ))}
      </div>

      {hiddenCount > 0 ? (
        <div className="mt-10 flex flex-col items-center gap-2 px-6">
          <button
            type="button"
            aria-expanded={showAll}
            onClick={toggleShowAll}
            className="inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-card py-1.5 pl-5 pr-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
          >
            {showAll ? "Mostrar menos" : "Mostrar todos"}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark text-white">
              <ChevronDown
                size={16}
                strokeWidth={2.25}
                className={`transition-transform ${showAll ? "rotate-180" : ""}`}
              />
            </span>
          </button>
          <p className="text-sm text-muted-foreground">
            {showAll
              ? `${services.length} tratamientos`
              : `${hiddenCount} tratamientos más`}
          </p>
        </div>
      ) : null}
    </div>
  );
}

/*
 * Swiper + toggle carrusel/cuadrícula (comentado a petición).
 * Restaurar imports: swiper, EffectCoverflow, lucide (ChevronLeft/Right,
 * LayoutGrid, GalleryHorizontal), framer-motion, ImageSkeleton, usePreloadImages.
 *
export function ServicesCarouselSwiper({ services, className = "" }: ServicesCarouselProps) {
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  // toggle GalleryHorizontal / LayoutGrid
  // Swiper effect="coverflow" con ServiceCard por slide
  // flechas anterior / siguiente
}
*/
