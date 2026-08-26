import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCoverflow } from "swiper/modules";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  GalleryHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LazyImage } from "@/app/components/LazyImage";
import { ImageSkeleton } from "@/app/components/ImageSkeleton";
import { usePreloadImages } from "@/app/hooks/usePreloadImage";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { useMotionSettings } from "@/app/hooks/useMotionSettings";
import { useServiceViewTransition } from "@/app/hooks/useServiceViewTransition";
import { activateServiceViewTransition } from "@/app/lib/viewTransitions";
import "swiper/css";
import "swiper/css/effect-coverflow";

export type ServiceCardItem = {
  title: string;
  image: string;
  slug: string;
};

type ServicesViewMode = "carousel" | "grid";

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

  return (
    <Link
      to={to}
      viewTransition
      onClick={() => activateServiceViewTransition(service.slug)}
      className="group relative block h-full w-full overflow-hidden rounded-2xl"
    >
      <LazyImage
        src={service.image}
        alt={service.title}
        width={800}
        height={533}
        priority={priority}
        style={{ viewTransitionName: imageName }}
        className="service-vt-image absolute inset-0 h-full w-full object-cover group-hover:scale-105 sm:transition-transform sm:duration-500"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

      <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-colors group-hover:bg-white/40">
        <ArrowUpRight size={16} strokeWidth={2.25} />
      </span>

      <p
        style={{ viewTransitionName: titleName }}
        className="service-vt-title absolute bottom-0 left-0 right-0 p-4 text-sm font-medium leading-snug text-white sm:text-[15px]"
      >
        {service.title}
      </p>
    </Link>
  );
}

export function ServicesCarousel({
  services,
  className = "",
}: ServicesCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ServicesViewMode>("carousel");
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [inView, setInView] = useState(false);
  const isMobile = useIsMobile();
  const { lightMotion } = useMotionSettings();

  const serviceImages = useMemo(
    () => services.map((service) => service.image),
    [services],
  );
  const preloadStatus = usePreloadImages(serviceImages, true);
  const imagesReady =
    preloadStatus === "loaded" || preloadStatus === "error";

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "240px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const syncEdges = (instance: SwiperType) => {
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
    setActiveIndex(instance.activeIndex);
  };

  const useCoverflow = !isMobile && !lightMotion;
  const showCarousel = inView && imagesReady;

  const isPrioritySlide = (index: number) =>
    Math.abs(index - activeIndex) <= 1;

  return (
    <div ref={rootRef} className={`w-full ${className}`}>
      <div className="mb-6 flex justify-center px-6 lg:px-10">
        <div
          role="group"
          aria-label="Modo de vista de servicios"
          className="inline-flex items-center rounded-full border border-primary/20 bg-card p-1 shadow-sm"
        >
          <button
            type="button"
            aria-label="Vista carrusel"
            aria-pressed={viewMode === "carousel"}
            onClick={() => setViewMode("carousel")}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              viewMode === "carousel"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <GalleryHorizontal size={18} strokeWidth={2.25} />
          </button>
          <button
            type="button"
            aria-label="Vista cuadrícula"
            aria-pressed={viewMode === "grid"}
            onClick={() => setViewMode("grid")}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              viewMode === "grid"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <LayoutGrid size={18} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {viewMode === "carousel" ? (
          <motion.div
            key="carousel"
            initial={lightMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={lightMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: lightMotion ? 0 : 0.28 }}
            className="services-carousel w-full"
          >
            {!showCarousel ? (
              <ImageSkeleton className="h-[420px] sm:h-[400px] lg:h-[440px]" />
            ) : (
              <Swiper
                key={useCoverflow ? "coverflow" : "slide"}
                modules={useCoverflow ? [EffectCoverflow] : []}
                effect={useCoverflow ? "coverflow" : "slide"}
                onSwiper={(instance) => {
                  setSwiper(instance);
                  syncEdges(instance);
                }}
                onSlideChange={syncEdges}
                onReachBeginning={syncEdges}
                onReachEnd={syncEdges}
                grabCursor
                centeredSlides
                slidesPerView="auto"
                spaceBetween={isMobile ? 12 : 16}
                speed={isMobile ? 400 : 700}
                preventClicks={false}
                preventClicksPropagation={false}
                slideToClickedSlide
                watchSlidesProgress={useCoverflow}
                coverflowEffect={
                  useCoverflow
                    ? {
                        rotate: 22,
                        stretch: 0,
                        depth: 16,
                        modifier: 1,
                        scale: 1,
                        slideShadows: false,
                      }
                    : undefined
                }
                className="w-full !overflow-visible !py-6 sm:!py-8"
              >
                {services.map((service, index) => (
                  <SwiperSlide
                    key={`${service.slug}-${index}`}
                    className="services-carousel-slide !h-[420px] !w-[min(88vw,320px)] !overflow-hidden !rounded-2xl !bg-transparent sm:!h-[400px] sm:!w-[280px] lg:!h-[440px] lg:!w-[320px]"
                  >
                    <ServiceCard
                      service={service}
                      priority={isPrioritySlide(index)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Anterior"
                disabled={isBeginning}
                onClick={() => swiper?.slidePrev()}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronLeft size={22} strokeWidth={2.25} />
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                disabled={isEnd}
                onClick={() => swiper?.slideNext()}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronRight size={22} strokeWidth={2.25} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={lightMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={lightMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: lightMotion ? 0 : 0.28 }}
            className="mx-auto grid max-w-[1320px] grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-10 xl:grid-cols-4"
          >
            {services.map((service, index) => (
              <div
                key={service.slug}
                className="aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <ServiceCard service={service} priority={index < 4} />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
