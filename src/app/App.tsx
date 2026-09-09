import { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Check, ArrowUpRight, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import imgHero from "@/imports/assets/a8f2c0383b88021a11b45557934c6aacc3594e91.avif?url";
import imgClinica from "@/imports/assets/90ebfb78fbf8f207012f653657adadf619c96529.avif?url";
import svgPaths from "@/imports/svg-lnp12anmc4";
import { ImageCardsSwiper } from "@/app/components/ImageCardsSwiper";
import { ServicesCarousel } from "@/app/components/ServicesCarousel";
import { TeamGallery } from "@/app/components/TeamGallery";
import { BeforeAfterCompare } from "@/app/components/BeforeAfterCompare";
import { sectionBadgeClass } from "@/app/components/SectionBadge";
import { FaqList } from "@/app/components/FaqList";
import { LazyMount } from "@/app/components/LazyMount";
import { SiteHeader } from "@/app/components/SiteHeader";
import { WhatsAppFloat } from "@/app/components/WhatsAppFloat";
import { services as servicesData } from "@/app/data/services";
import { getServiceImage } from "@/app/data/serviceImages";
import { teamMembers } from "@/app/data/team";
import { homeFaqs } from "@/app/data/faqs";
import { siteInfo } from "@/app/data/site";
import {
  Seo,
  buildDentistJsonLd,
  buildWebsiteJsonLd,
  buildFaqJsonLd,
} from "@/app/seo/Seo";
// import { ThemeToggle } from "@/app/components/ThemeToggle"; // dark mode desactivado

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const viewport = { once: true, amount: 0.2, margin: "0px 0px -40px 0px" };

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={svgPaths.p27c98a00} fill="currentColor" />
    </svg>
  );
}

const services = servicesData.map((service) => {
  const { image, overlayImage } = getServiceImage(service.slug);

  return {
    title: service.title,
    description: service.whatIs,
    slug: service.slug,
    image,
    overlayImage,
  };
});

const SECTION_BADGE_CLASS = sectionBadgeClass;

const heroBadgePhrases = [
  "Odontología especializada",
  "Desde 2015 en Barranquilla",
  "Atención personalizada",
  "Salud oral integral",
];

function RotatingTypewriter({
  phrases,
  className = "",
  charMs = 70,
  holdMs = 2200,
  deleteMs = 40,
  disabled = false,
}: {
  phrases: string[];
  className?: string;
  charMs?: number;
  holdMs?: number;
  deleteMs?: number;
  disabled?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(disabled ? (phrases[0] ?? "") : "");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing",
  );

  const text = phrases[index] ?? "";

  useEffect(() => {
    if (disabled || phrases.length === 0) {
      setShown(phrases[0] ?? "");
      return;
    }

    if (phase === "typing") {
      if (shown.length >= text.length) {
        const t = window.setTimeout(() => setPhase("holding"), 0);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => {
        setShown(text.slice(0, shown.length + 1));
      }, charMs);
      return () => window.clearTimeout(t);
    }

    if (phase === "holding") {
      const t = window.setTimeout(() => setPhase("deleting"), holdMs);
      return () => window.clearTimeout(t);
    }

    // deleting
    if (shown.length === 0) {
      const t = window.setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setPhase("typing");
      }, 180);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setShown((s) => s.slice(0, -1));
    }, deleteMs);
    return () => window.clearTimeout(t);
  }, [phase, shown, text, phrases, charMs, holdMs, deleteMs, disabled]);

  const showCaret = !disabled && phase !== "holding";

  return (
    <span className={`whitespace-nowrap ${className}`.trim()}>
      {shown || "\u00A0"}
      <span
        aria-hidden
        className={`ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.08em] bg-brand align-baseline ${
          showCaret ? "animate-pulse" : "opacity-0"
        }`}
      />
    </span>
  );
}

function GoogleMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: easeOut };

  const homeJsonLd = useMemo(
    () => [buildDentistJsonLd(), buildWebsiteJsonLd(), buildFaqJsonLd(homeFaqs)],
    [],
  );

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif] text-foreground transition-colors duration-300">
      <Seo path="/" jsonLd={homeJsonLd} />
      <SiteHeader />

      {/* HERO + STATS */}
      <section className="relative overflow-x-clip pt-[var(--header-offset)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "var(--page-hero)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-[280px] w-[140%] max-w-none -translate-x-1/2 rounded-full opacity-80 blur-[70px] sm:h-[340px] sm:blur-[90px] lg:h-[420px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(232, 213, 163, 0.55) 0%, rgba(196, 160, 86, 0.18) 38%, transparent 70%)",
          }}
        />

        {/* Spotlights estáticos (sin animación infinita: mejor TBT / battery) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-0 h-[640px] w-[640px] rounded-full opacity-70 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, var(--spotlight-primary) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[18%] top-[28%] h-[280px] w-[280px] rounded-full opacity-55 blur-[70px]"
          style={{
            background:
              "radial-gradient(circle, var(--spotlight-teal) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 bottom-[18%] h-[420px] w-[420px] rounded-full opacity-45 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, var(--spotlight-mint) 0%, transparent 72%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[32%] top-[12%] h-[180px] w-[180px] rounded-full opacity-40 blur-[50px]"
          style={{
            background:
              "radial-gradient(circle, var(--spotlight-glow) 0%, transparent 75%)",
          }}
        />

        <div className="relative z-[1] mx-auto flex min-h-[calc(100dvh-var(--header-offset))] w-full max-w-[1320px] flex-col px-6 pt-1 sm:px-8 lg:block lg:min-h-[500px] lg:px-12 lg:pt-14 xl:px-16 2xl:min-h-[750px] 2xl:px-12 2xl:pt-16">
          {/* Foto médico — ~60% del viewport en mobile */}
          <motion.div
            className="relative z-[2] order-1 mx-auto mb-3 h-[60dvh] min-h-[280px] w-full shrink-0 lg:absolute lg:bottom-0 lg:right-6 lg:order-none lg:mx-0 lg:mb-0 lg:mt-0 lg:h-auto lg:min-h-0 lg:w-[48%] lg:max-w-[520px] xl:right-8 xl:max-w-[560px] 2xl:right-4 2xl:w-[58%] 2xl:max-w-[700px]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              ...transition,
              delay: reduceMotion ? 0 : 0.15,
              duration: reduceMotion ? 0 : 0.8,
            }}
          >
            {/* JAIME — solo mobile, detrás de la imagen */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...transition,
                delay: reduceMotion ? 0 : 0.25,
              }}
              className="pointer-events-none absolute left-1/2 top-[4%] z-0 -translate-x-1/2 lg:top-[-2%]"
            >
              <h4
                className="-mr-[0.28em] whitespace-nowrap font-['Playfair_Display',serif] text-[clamp(3.5rem,28vw,10rem)] font-black uppercase leading-none tracking-[0.22em]"
                style={{
                  background:
                    "linear-gradient(to bottom, #c4a056 0%, #c4a056 22%, rgba(196,160,86,0) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                JAIME
              </h4>
            </motion.div>

            <div className="fade-bottom relative z-[1] mx-auto h-full min-h-0 w-full overflow-hidden rounded-t-[28px] lg:min-h-0 lg:rounded-t-[32px]">
              <img
                src={imgHero}
                alt="Dr. Jaime Pinzón — Odontología Especializada en Barranquilla"
                width={1280}
                height={853}
                fetchpriority="high"
                decoding="async"
                className="mx-auto block h-full w-full object-cover object-[center_top] lg:h-[500px] 2xl:h-[760px]"
              />
            </div>

            <motion.div
              className="absolute bottom-28 right-2 z-[3] hidden items-center gap-3.5 rounded-2xl border border-white/60 bg-white/90 px-4 py-3.5 shadow-xl backdrop-blur-md dark:border-border/80 dark:bg-card/90 sm:right-6 sm:bottom-32 lg:flex"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...transition,
                delay: reduceMotion ? 0 : 0.55,
              }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-teal">
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                  <path
                    d={svgPaths.p3e30af00}
                    fill="#fffcf8"
                  />
                </svg>
              </div>
              <div>
                <p className="font-['Playfair_Display',serif] text-lg font-semibold leading-tight text-foreground">
                  {siteInfo.successfulTreatments}
                </p>
                <p className="text-xs text-muted-foreground">
                  Tratamientos exitosos
                </p>
              </div>
            </motion.div>

            <motion.div
              className="absolute left-2 top-[28%] z-[3] hidden items-center gap-3.5 rounded-2xl border border-white/60 bg-white/90 px-4 py-3.5 shadow-xl backdrop-blur-md dark:border-border/80 dark:bg-card/90 sm:-left-4 lg:left-0 lg:flex"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...transition,
                delay: reduceMotion ? 0 : 0.7,
              }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-teal">
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                  <path
                    d={svgPaths.p3e30af00}
                    fill="#fffcf8"
                  />
                </svg>
              </div>
              <div>
                <p className="font-['Playfair_Display',serif] text-lg font-semibold leading-tight text-foreground">
                  Desde {siteInfo.sinceYear}
                </p>
                <p className="text-xs text-muted-foreground">
                  Años de experiencia
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative z-[2] order-2 flex max-w-xl flex-col justify-center gap-3 pb-8 sm:gap-4 lg:order-none lg:min-h-[500px] lg:gap-6 lg:pb-16 2xl:min-h-[750px] 2xl:pb-24"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              transition={transition}
              className="inline-flex"
            >
              <span className={`${SECTION_BADGE_CLASS} w-fit max-w-full`}>
                <RotatingTypewriter
                  phrases={heroBadgePhrases}
                  disabled={!!reduceMotion}
                />
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={transition}
              className="font-['Playfair_Display',serif] text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[54px] 2xl:text-[64px]"
            >
              Cada sonrisa tiene
              <br />
              una historia
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={transition}
              className="text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-sm 2xl:text-lg"
            >
              {siteInfo.slogan}. Atención de alta calidad con experiencia,
              tecnología y un trato humano desde {siteInfo.sinceYear}.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={transition}
              className="flex flex-col gap-3 pt-2 sm:flex-row"
            >
              <motion.a
                href={siteInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="btn-gold flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold"
              >
                <WhatsAppIcon />
                Agenda tu cita
              </motion.a>
              <motion.a
                href="#servicios"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-8 py-4 text-sm font-semibold text-foreground"
              >
                Ver tratamientos
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats dentro del hero */}
        <motion.div
          className="relative z-[3] border-t border-primary/10 bg-page-soft"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-10 px-6 py-12 sm:px-8 lg:flex-row lg:items-center lg:gap-0 lg:px-12 xl:px-16 2xl:px-12">
            <motion.div
              className="shrink-0 lg:w-[40%]"
              variants={fadeUp}
              transition={transition}
            >
              <h2 className="font-['Playfair_Display',serif] text-2xl font-semibold lg:text-3xl text-primary">
                Dr. Jaime Pinzón
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Odontología especializada con
                <br className="hidden sm:block" />
                experiencia, tecnología y trato humano.
              </p>
            </motion.div>

            <div className="grid flex-1 grid-cols-2 gap-4 border-border lg:border-l lg:pl-16">
              {[
                {
                  value: `Desde ${siteInfo.sinceYear}`,
                  label: "Años de experiencia",
                },
                {
                  value: siteInfo.successfulTreatments,
                  label: "Tratamientos exitosos",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className={i > 0 ? "border-l border-border pl-4" : ""}
                  variants={fadeUp}
                  transition={transition}
                >
                  <p className="text-center font-['Playfair_Display',serif] text-3xl font-bold lg:text-4xl text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-center text-sm leading-snug text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicios" className="py-16 lg:py-24 overflow-hidden">
        <motion.div
          className="max-w-[1320px] mx-auto px-6 lg:px-10 mb-10 lg:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            transition={transition}
            className={`${SECTION_BADGE_CLASS} mb-5`}
          >
            Tratamientos
          </motion.span>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-xl">
              <motion.h2
                variants={fadeUp}
                transition={transition}
                className="font-['Playfair_Display',serif] font-semibold text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] tracking-tight text-foreground"
              >
                Nuestros servicios
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={transition}
                className="mt-3 font-['Playfair_Display',serif] text-xl font-medium leading-snug text-muted-foreground sm:text-2xl lg:text-3xl"
              >
                Lo que podemos hacer por ti
              </motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              transition={transition}
              className="max-w-sm flex flex-col gap-5 lg:pb-1"
            >
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                En Dr. Jaime Pinzón Odontología Especializada ofrecemos
                tratamientos enfocados en cuidar la salud oral, mejorar la
                función y transformar la estética de la sonrisa. Cada tratamiento
                comienza con una valoración personalizada.
              </p>
              <p className="text-sm text-muted-foreground">
                {services.length} tratamientos disponibles
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={transition}
        >
          <LazyMount minHeight={480}>
            <ServicesCarousel services={services} />
          </LazyMount>
        </motion.div>
      </section>

      {/* ABOUT US SECTION */}
      <section
        id="nosotros"
        className="overflow-hidden bg-background py-20 lg:py-28"
      >
        <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-12 px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
          <motion.div
            className="w-full max-w-2xl flex-1 lg:min-w-0 lg:basis-[52%]"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              transition={transition}
              className={`${SECTION_BADGE_CLASS} mb-6`}
            >
              Sobre nosotros
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={transition}
              className="mb-4 font-['Playfair_Display',serif] text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[52px]"
            >
              Más que cuidar tu sonrisa, cuidamos de ti
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="mb-6 leading-relaxed text-muted-foreground"
            >
              Desde {siteInfo.sinceYear}, somos un consultorio odontológico
              comprometido con brindar una atención de alta calidad, combinando
              experiencia, tecnología y un trato humano y personalizado. Sabemos
              que cada paciente es diferente y que acudir al odontólogo debe ser
              una experiencia basada en la confianza.
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="mb-8 leading-relaxed text-muted-foreground"
            >
              Por eso, nos tomamos el tiempo para escuchar tus necesidades,
              resolver tus inquietudes y acompañarte en cada etapa de tu
              tratamiento, buscando que te sientas cómodo, seguro y bien atendido
              desde el primer momento.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={transition}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#equipo"
                className="flex items-center justify-center rounded-full border border-foreground/15 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Conocer al equipo
              </a>
              <a
                href={siteInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold"
              >
                Agenda tu cita
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={transition}
              className="mt-10 flex gap-8 border-t border-border pt-8"
            >
              {[
                {
                  value: `Desde ${siteInfo.sinceYear}`,
                  label: "Años de experiencia",
                },
                {
                  value: siteInfo.successfulTreatments,
                  label: "Tratamientos exitosos",
                },
              ].map((s, i) => (
                <div key={i}>
                  <p className="font-['Playfair_Display',serif] text-4xl font-bold text-primary">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full min-w-0 flex-1 overflow-hidden py-2 lg:min-w-0 lg:basis-[48%] lg:py-6"
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ ...transition, duration: reduceMotion ? 0 : 0.75 }}
          >
            <LazyMount className="w-full" minHeight={480}>
              <div className="flex flex-col gap-3">
                <BeforeAfterCompare
                  beforeSrc="/images/casos/antes-tratamiento.png"
                  afterSrc="/images/casos/despues-tratamiento.png"
                  beforeAlt="Sonrisa antes del tratamiento odontológico"
                  afterAlt="Sonrisa después del tratamiento odontológico"
                />
                <p className="text-center text-sm text-muted-foreground">
                  Arrastra el control para comparar el antes y el después
                </p>
              </div>
            </LazyMount>
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="overflow-hidden bg-background py-20 lg:py-28">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-12 px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
          <motion.div
            className="order-2 w-full flex-1 py-2 lg:order-1 lg:min-w-0 lg:basis-[48%] lg:py-6"
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ ...transition, duration: reduceMotion ? 0 : 0.75 }}
          >
            <LazyMount className="w-full" minHeight={480}>
              <ImageCardsSwiper
                imageSrc={imgClinica}
                alt="Nuestra Experiencia — equipamiento de vanguardia"
                className="w-full"
              />
            </LazyMount>
          </motion.div>

          <motion.div
            className="order-1 w-full max-w-2xl flex-1 lg:order-2 lg:min-w-0 lg:basis-[52%]"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              transition={transition}
              className={`${SECTION_BADGE_CLASS} mb-6`}
            >
              Nuestro enfoque
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={transition}
              className="mb-4 font-['Playfair_Display',serif] text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[52px]"
            >
              Un equipo en el que puedes confiar
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              Contamos con un equipo profesional especializado y comprometido
              con tu salud oral, que trabaja de manera integral para ofrecer
              tratamientos planificados de acuerdo con las necesidades de cada
              paciente. Utilizamos recursos modernos, materiales de calidad y
              técnicas actualizadas, siempre con un enfoque responsable y
              cuidadoso.
            </motion.p>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                "Atención personalizada",
                "Equipo especializado",
                "Tecnología y materiales de calidad",
                "Tratamientos planificados",
                "Trato humano y cercano",
                "Acompañamiento en cada etapa",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={transition}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center justify-center rounded-full shrink-0 w-5 h-5 bg-brand-dark">
                    <Check size={11} strokeWidth={3} color="#fffcf8" />
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="equipo" className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <motion.div
            className="mb-20 mx-auto max-w-2xl lg:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              transition={transition}
              className={`${SECTION_BADGE_CLASS} mb-6`}
            >
              Equipo
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={transition}
              className="mb-4 font-['Playfair_Display',serif] text-3xl font-semibold text-foreground lg:text-4xl"
            >
              Los rostros detrás de
              <br className="hidden sm:block" /> tu mejor sonrisa
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="text-base leading-relaxed text-muted-foreground lg:text-lg"
            >
              Un equipo especializado en ortodoncia, periodoncia y
              odontología integral, con más de 18 años de experiencia
              profesional.
            </motion.p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <LazyMount minHeight={460}>
              <TeamGallery members={teamMembers} />
            </LazyMount>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonios" className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-6 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-16 lg:px-10">
          <motion.div
            className="flex flex-col gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <div>
              <motion.span
                variants={fadeUp}
                transition={transition}
                className={`${SECTION_BADGE_CLASS} mb-6`}
              >
                Reseñas
              </motion.span>
              <motion.h2
                variants={fadeUp}
                transition={transition}
                className="mb-4 font-['Playfair_Display',serif] text-4xl font-semibold text-foreground lg:text-5xl"
              >
                Lo que dicen
                <br className="hidden sm:block" /> nuestros pacientes
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={transition}
                className="max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg"
              >
                Cada tratamiento comienza con confianza. Si ya nos visitaste,
                tu reseña en Google ayuda a otras personas a dar el primer
                paso hacia una sonrisa más saludable.
              </motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              transition={transition}
              className="flex gap-10"
            >
              <div>
                <p className="font-['Playfair_Display',serif] text-5xl font-semibold text-foreground">
                  {siteInfo.successfulTreatments}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tratamientos exitosos
                </p>
              </div>
              <div>
                <p className="font-['Playfair_Display',serif] text-5xl font-semibold text-foreground">
                  Desde {siteInfo.sinceYear}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Años de experiencia
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={transition}
            className="rounded-[28px] border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <GoogleMark />
                <p className="text-sm font-semibold text-foreground">
                  Reseñas en Google
                </p>
              </div>
              <div className="flex gap-0.5 text-[var(--star)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
            </div>
            <h3 className="font-['Playfair_Display',serif] text-2xl font-semibold text-foreground">
              Comparte tu experiencia
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Las reseñas de Google son la forma más transparente de contar
              cómo fue tu atención. Si ya terminaste tu tratamiento o tu
              valoración, déjanos tu opinión y ayuda a más pacientes a
              encontrarnos.
            </p>
            <a
              href={siteInfo.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-6 inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold"
            >
              Escribir reseña en Google
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark/15">
                <ArrowUpRight size={16} strokeWidth={2.25} />
              </span>
            </a>
          </motion.article>
        </div>
      </section>

      {/* LOCATION / MAP SECTION */}
      <section
        id="ubicación"
        className="overflow-hidden bg-background py-20 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <motion.div
            className="mb-10 flex flex-col items-start gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <div className="max-w-xl">
              <motion.span
                variants={fadeUp}
                transition={transition}
                className={`${SECTION_BADGE_CLASS} mb-6`}
              >
                Visítanos
              </motion.span>
              <motion.h2
                variants={fadeUp}
                transition={transition}
                className="font-['Playfair_Display',serif] text-3xl font-semibold text-foreground lg:text-4xl"
              >
                Encuéntranos
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={transition}
                className="mt-4 flex items-start gap-2 text-muted-foreground"
              >
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                  strokeWidth={2.25}
                />
                <span>{siteInfo.address}</span>
              </motion.p>
            </div>

            <motion.a
              variants={fadeUp}
              transition={transition}
              href={siteInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              Abrir en Google Maps
              <ExternalLink size={15} strokeWidth={2.25} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={transition}
            className="overflow-hidden rounded-[28px] border border-border shadow-sm"
          >
            <iframe
              title={`Mapa — ${siteInfo.name}`}
              src={siteInfo.mapEmbedUrl}
              className="h-[320px] w-full border-0 sm:h-[420px] lg:h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col items-center gap-3 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="text-muted-foreground"
            >
              ¿Ya nos visitaste? Tu opinión nos ayuda a seguir mejorando.
            </motion.p>
            <motion.a
              variants={fadeUp}
              transition={transition}
              href={siteInfo.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold"
            >
              <span className="inline-flex items-center gap-2">
                <Star size={16} fill="currentColor" strokeWidth={0} />
                Déjanos tu reseña
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark/15">
                <ArrowUpRight size={16} strokeWidth={2.25} />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        id="preguntas-frecuentes"
        className="overflow-hidden bg-muted py-20 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <motion.div
            className="mb-12 flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              transition={transition}
              className={`${SECTION_BADGE_CLASS} mb-6`}
            >
              Preguntas frecuentes
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={transition}
              className="font-['Playfair_Display',serif] text-4xl font-semibold text-foreground lg:text-5xl"
            >
              Resolvemos tus dudas
            </motion.h2>
          </motion.div>

          <motion.div
            className="mx-auto mb-10 max-w-[900px]"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeIn}
            transition={transition}
          >
            <FaqList
              items={homeFaqs}
              openIndex={openFaq}
              onToggle={(index) =>
                setOpenFaq(openFaq === index ? null : index)
              }
            />
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-3 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeIn}
            transition={transition}
          >
            <Link
              to="/preguntas-frecuentes"
              className="btn-gold inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold"
            >
              Ver todas las preguntas
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark/15">
                <ArrowUpRight size={16} strokeWidth={2.25} />
              </span>
            </Link>
            <p className="text-muted-foreground">
              ¿Tienes otra pregunta?{" "}
              <a
                href={siteInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline underline-offset-4"
              >
                Contáctanos
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <footer className="bg-brand-dark pt-16 pb-10 text-white">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <p className="font-['Playfair_Display',serif] text-2xl font-semibold text-white">
                Dr. Jaime Pinzón
              </p>
              <p className="mt-2 text-sm text-white/65">{siteInfo.slogan}</p>
              <p className="mt-3 text-sm text-white/65">{siteInfo.address}</p>
              <p className="text-sm text-white/65">Tel: {siteInfo.phone}</p>
            </div>

            <div className="flex flex-wrap items-start gap-6 md:col-span-3 md:justify-end">
              <a
                href={siteInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/65 transition-colors hover:text-brand"
              >
                WhatsApp
              </a>
              <a
                href={siteInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/65 transition-colors hover:text-brand"
              >
                Instagram
              </a>
              <a
                href="#servicios"
                className="text-sm text-white/65 transition-colors hover:text-brand"
              >
                Servicios
              </a>
              <a
                href="#nosotros"
                className="text-sm text-white/65 transition-colors hover:text-brand"
              >
                Sobre nosotros
              </a>
              <Link
                to="/preguntas-frecuentes"
                className="text-sm text-white/65 transition-colors hover:text-brand"
              >
                Preguntas frecuentes
              </Link>
              <a
                href="#ubicación"
                className="text-sm text-white/65 transition-colors hover:text-brand"
              >
                Ubicación
              </a>
              <a
                href={siteInfo.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/65 transition-colors hover:text-brand"
              >
                Déjanos tu reseña
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} {siteInfo.name}. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
      <WhatsAppFloat />
    </div>
  );
}
