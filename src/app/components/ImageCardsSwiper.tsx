import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";

type ImageCardsSwiperProps = {
  imageSrc: string;
  alt: string;
  className?: string;
};

const SLIDE_COUNT = 4;
const CENTER_SLIDE = Math.floor((SLIDE_COUNT - 1) / 2);

/**
 * Mismo lenguaje visual que ServicesCarousel (coverflow + flechas).
 * Desktop: fade-x y ancho del content. Móvil: slide simple.
 */
export function ImageCardsSwiper({
  imageSrc,
  alt,
  className = "",
}: ImageCardsSwiperProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!swiper?.autoplay) return;
    if (inView && !isMobile && !reduceMotion) swiper.autoplay.start();
    else swiper.autoplay.stop();
  }, [inView, isMobile, reduceMotion, swiper]);

  const useCoverflow = !isMobile && !reduceMotion;

  return (
    <div ref={rootRef} className={`w-full ${className}`}>
      <div
        className={`image-cards-swiper w-full ${useCoverflow ? "fade-x" : ""}`}
      >
        {inView ? (
          <Swiper
            key={useCoverflow ? "coverflow" : "slide"}
            modules={
              useCoverflow ? [Autoplay, EffectCoverflow] : [Autoplay]
            }
            effect={useCoverflow ? "coverflow" : "slide"}
            onSwiper={(instance) => {
              setSwiper(instance);
              if (!inView || isMobile || reduceMotion) {
                instance.autoplay?.stop();
              }
            }}
            grabCursor
            centeredSlides
            slidesPerView="auto"
            initialSlide={CENTER_SLIDE}
            rewind
            spaceBetween={isMobile ? 12 : 16}
            speed={isMobile ? 400 : 700}
            slideToClickedSlide
            watchSlidesProgress={useCoverflow}
            autoplay={{
              delay: 3600,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
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
            {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
              <SwiperSlide
                key={`${alt}-${index}`}
                className="!h-[420px] !w-[min(88vw,320px)] !overflow-hidden !rounded-2xl !bg-transparent sm:!h-[400px] sm:!w-[280px] lg:!h-[440px] lg:!w-[320px]"
              >
                <img
                  src={imageSrc}
                  alt={`${alt} ${index + 1}`}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-2xl object-cover"
                  draggable={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div
            className="h-[420px] sm:h-[400px] lg:h-[440px]"
            aria-hidden
          />
        )}

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => swiper?.slidePrev()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft size={22} strokeWidth={2.25} />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => swiper?.slideNext()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight size={22} strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </div>
  );
}
