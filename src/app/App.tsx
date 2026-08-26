import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Star,
  Check,
  Calendar,
  ArrowUpRight,
  Play,
  MapPin,
  ExternalLink,
} from "lucide-react";
import imgHero from "@/imports/assets/a8f2c0383b88021a11b45557934c6aacc3594e91.avif?url";
import imgLogo from "@/imports/assets/e7e6e6e81c1d84b256dcdd0c0c907a708c46333a.avif?url";
import imgClinica from "@/imports/assets/90ebfb78fbf8f207012f653657adadf619c96529.avif?url";
import imgDoctorFemale from "@/imports/assets/890ab96eccf5036670caa7b94b7722353ee0b062.avif?url";
import imgDoctorMale from "@/imports/assets/390a25e5fe1e5f9ca887d18144e9fa2e6aaaf821.avif?url";
import svgPaths from "@/imports/svg-lnp12anmc4";
import { ImageCardsSwiper } from "@/app/components/ImageCardsSwiper";
import { ServicesCarousel } from "@/app/components/ServicesCarousel";
import { TeamGallery } from "@/app/components/TeamGallery";
import { LazyMount } from "@/app/components/LazyMount";
import { LazyImage } from "@/app/components/LazyImage";
import { services as servicesData } from "@/app/data/services";
import { siteInfo } from "@/app/data/site";
import {
  Seo,
  buildDentistJsonLd,
  buildWebsiteJsonLd,
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
      <path d={svgPaths.p27c98a00} fill="white" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <Star
      size={16}
      fill={filled ? "var(--star)" : "none"}
      stroke={filled ? "var(--star)" : "var(--star-muted)"}
      strokeWidth={1.5}
    />
  );
}

const services = servicesData.map((service) => ({
  title: service.title,
  slug: service.slug,
  image: imgHero,
}));

const doctors = [
  {
    name: "Dra. Elena Gómez",
    specialty: "Ortodoncia Especialista",
    img: imgDoctorFemale,
    bio: "Especialista en ortodoncia con formación internacional. Diseña planes personalizados con alineadores y aparatología avanzada para resultados naturales y estables.",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Dr. Carlos Ruiz",
    specialty: "Implantología Avanzada",
    img: imgDoctorMale,
    bio: "Referente en implantología y rehabilitación oral. Combina planificación digital 3D con cirugía mínimamente invasiva para recuperar función y estética con precisión.",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Dra. Ana Torres",
    specialty: "Estética Dental",
    img: imgDoctorFemale,
    bio: "Enfocada en diseño de sonrisa y odontología cosmética. Trabaja con carillas, blanqueamiento y armonización facial para lograr sonrisas equilibradas y luminosas.",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Dr. Miguel Ángel",
    specialty: "Periodoncia Clínica",
    img: imgDoctorMale,
    bio: "Experto en salud gingival y tejidos periimplantarios. Prioriza prevención, tratamientos regenerativos y un acompañamiento cercano en cada etapa del cuidado.",
    linkedin: "#",
    instagram: "#",
  },
];

type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  /** Imagen opcional dentro de la card */
  image?: string;
  /** Video opcional (mp4/webm). Si existe, tiene prioridad sobre image como media principal */
  video?: string;
};

const testimonials: Testimonial[] = [
  {
    id: "maria",
    name: "María Fernández",
    role: "Paciente — Alineadores",
    text: "Increíble experiencia desde el primer momento. El equipo es muy profesional y los resultados superaron mis expectativas. Mi sonrisa nunca había lucido tan bien.",
    rating: 5,
    image: imgDoctorFemale,
  },
  {
    id: "juan",
    name: "Juan Sebastián",
    role: "Paciente — Implante Dental",
    text: "El Dr. Ruiz me explicó todo el proceso con mucha paciencia. El implante quedó perfecto y me siento mucho más seguro al sonreír. Lo recomiendo totalmente.",
    rating: 5,
    // video: "/videos/testimonio-juan.mp4",
    image: imgClinica,
  },
  {
    id: "catalina",
    name: "Catalina Morales",
    role: "Paciente — Diseño de Sonrisa",
    text: "Un ambiente completamente diferente a cualquier clínica dental que haya visitado. Lujoso, tranquilo y con tecnología de punta. Vale cada centavo.",
    rating: 5,
  },
  {
    id: "andres",
    name: "Andrés López",
    role: "Paciente — Blanqueamiento",
    text: "El resultado fue natural y sin sensibilidad. Me sentí acompañado en cada cita y salí con una sonrisa mucho más luminosa de lo que esperaba.",
    rating: 5,
    image: imgHero,
  },
  {
    id: "valentina",
    name: "Valentina Ríos",
    role: "Paciente — Ortodoncia",
    text: "Desde la primera valoración noté el nivel de detalle. El plan fue claro, el seguimiento impecable y hoy sonrío con total confianza.",
    rating: 5,
  },
  {
    id: "diego",
    name: "Diego Ramírez",
    role: "Paciente — Periodoncia",
    text: "Trato humano, puntualidad y tecnología de primer nivel. Resolvieron mi molestia gingival y me dieron recomendaciones fáciles de seguir.",
    rating: 5,
    image: imgDoctorMale,
  },
];

const faqs = [
  {
    question: "¿Qué tipos de implantes dentales utilizan?",
    answer:
      "Trabajamos exclusivamente con implantes de titanio de grado médico de marcas certificadas internacionalmente como Nobel Biocare y Straumann. Cada implante es seleccionado según las necesidades individuales del paciente para garantizar la mejor integración osea y durabilidad a largo plazo.",
  },
  {
    question: "¿Cuánto tiempo dura el tratamiento de alineadores invisibles?",
    answer:
      "El tiempo varía según la complejidad del caso, generalmente entre 6 a 18 meses. Durante tu primera consulta realizamos un escáner 3D para proyectar tu sonrisa final y estimar la duración exacta de tu tratamiento personalizado.",
  },
  {
    question: "¿Los tratamientos son dolorosos?",
    answer:
      "Utilizamos técnicas de anestesia avanzadas y materiales modernos que minimizan significativamente las molestias. La mayoría de nuestros pacientes reportan muy poca incomodidad durante y después de los procedimientos gracias a nuestro enfoque en odontología sin dolor.",
  },
  {
    question: "¿Tienen financiamiento disponible?",
    answer:
      "Sí, ofrecemos planes de pago flexibles y financiamiento sin intereses hasta 12 meses. Trabajamos con las principales aseguradoras y tarjetas de crédito para hacer que tu tratamiento sea accesible sin comprometer la calidad.",
  },
];

const navLinks = ["Servicios", "Equipo", "Testimonios", "Ubicación", "Contacto"];

const SECTION_BADGE_CLASS =
  "inline-flex items-center rounded-full border border-brand bg-accent px-4 py-1.5 text-xs font-semibold tracking-widest text-brand";

const heroBadgePhrases = [
  "ODONTOLOGÍA ESPECIALIZADA",
  "DESDE 2015",
  "TU MEJOR SONRISA",
  "ATENCIÓN PERSONALIZADA",
  "SALUD ORAL INTEGRAL",
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

function TestimonialCard({
  t,
  isClone = false,
  isPlaying = false,
  onPlay,
  className = "",
}: {
  t: Testimonial;
  isClone?: boolean;
  isPlaying?: boolean;
  onPlay?: () => void;
  className?: string;
}) {
  const hasMedia = Boolean(t.image || t.video);

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-border bg-card shadow-sm ${className}`}
      aria-hidden={isClone}
    >
      {hasMedia && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          {isPlaying ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={t.video}
              poster={t.image}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <>
              {t.image ? (
                <LazyImage
                  src={t.image}
                  alt=""
                  fetchPriority={isClone ? "low" : "auto"}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
              ) : t.video ? (
                <div className="absolute inset-0 bg-muted" />
              ) : null}
              {t.video && !isClone && onPlay ? (
                <button
                  type="button"
                  onClick={onPlay}
                  className="absolute inset-0 flex items-center justify-center bg-foreground/15 transition-colors hover:bg-foreground/25"
                  aria-label={`Reproducir video de ${t.name}`}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-primary shadow-md transition-transform hover:scale-105">
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                  </span>
                </button>
              ) : null}
            </>
          )}
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="font-['Playfair_Display',serif] text-base font-bold text-foreground">
              {t.name}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground/70">{t.role}</p>
          </div>
          <div className="flex shrink-0 gap-0.5">
            {Array.from({ length: 5 }).map((_, j) => (
              <StarIcon key={j} filled={j < t.rating} />
            ))}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t.text}
        </p>
      </div>
    </article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [playingCardId, setPlayingCardId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    () => [buildDentistJsonLd(), buildWebsiteJsonLd()],
    [],
  );

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif] text-foreground transition-colors duration-300">
      <Seo path="/" jsonLd={homeJsonLd} />
      {/* HEADER */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto mx-auto max-w-[1320px] px-4 pt-3 sm:px-6 sm:pt-4 lg:px-12 xl:px-16 2xl:px-12">
          <motion.div
            initial={false}
            animate={{
              backgroundColor: scrolled
                ? "var(--surface-glass)"
                : "transparent",
              boxShadow: scrolled
                ? "var(--header-shadow)"
                : "0 0 0 transparent",
              borderColor: scrolled
                ? "var(--surface-glass-border)"
                : "transparent",
            }}
            transition={{ duration: 0.28, ease: easeOut }}
            className={`relative flex items-center justify-between gap-3 border transition-[padding,border-radius,backdrop-filter] duration-300 ${
              scrolled
                ? "rounded-full px-4 py-2.5 backdrop-blur-md sm:px-5"
                : "rounded-none bg-transparent px-1 py-2 backdrop-blur-0"
            }`}
          >
            <a href="#" className="flex min-w-0 items-center gap-2">
              <LazyImage
                src={imgLogo}
                alt="Dr. Jaime Pinzon logo"
                priority
                className="h-8 w-auto object-contain sm:h-9"
              />
              <span className="truncate font-['Playfair_Display',serif] text-lg font-semibold tracking-tight sm:text-xl text-primary">
                {siteInfo.shortName}
              </span>
            </a>

            {/* Top: links + CTA visibles */}
            {!scrolled && (
              <>
                <nav className="hidden items-center gap-8 md:flex">
                  {navLinks.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {link}
                    </a>
                  ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                  {/* <ThemeToggle scrolled={false} /> */}
                  <motion.a
                    href="#contacto"
                    whileHover={
                      reduceMotion ? undefined : { y: -1, scale: 1.02 }
                    }
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-5 py-2.5 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm dark:border-brand/30 dark:bg-card/80 dark:text-brand"
                  >
                    <Calendar size={15} />
                    Agendar Cita
                  </motion.a>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                  {/* <ThemeToggle scrolled={false} /> */}
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 text-foreground shadow-sm backdrop-blur-sm hover:bg-white dark:bg-secondary dark:text-foreground dark:hover:bg-border"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={menuOpen}
                  >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              </>
            )}

            {/* Scroll: burger */}
            {scrolled && (
              <div className="flex items-center gap-2">
                {/* <ThemeToggle scrolled /> */}
                <button
                  type="button"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/15 dark:bg-primary/15 dark:text-brand dark:hover:bg-primary/20"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            )}

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.22,
                    ease: easeOut,
                  }}
                  className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(100%,280px)] origin-top-right overflow-hidden rounded-2xl border border-primary/12 bg-white/95 shadow-xl backdrop-blur-md dark:border-brand/20 dark:bg-card/95"
                >
                  <div className="flex flex-col p-2">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduceMotion ? 0 : 0.03 * i }}
                        className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary dark:hover:bg-primary/15 dark:hover:text-brand"
                        onClick={() => setMenuOpen(false)}
                      >
                        {link}
                      </motion.a>
                    ))}
                    <div className="mt-1 border-t border-border px-1 pb-1 pt-2">
                      <a
                        href="#contacto"
                        className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Calendar size={15} />
                        Agendar Cita
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </header>

      {/* HERO + STATS (una sola sección, sin overflow que genere segundo scroll) */}
      <section className="relative overflow-x-clip pt-[72px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "var(--page-hero)",
          }}
        />

        {/* Spotlight superior — azul claro para resaltar JAIME */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-[280px] w-[140%] max-w-none -translate-x-1/2 rounded-full opacity-90 blur-[70px] sm:h-[340px] sm:blur-[90px] lg:h-[420px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(125, 211, 252, 0.75) 0%, rgba(56, 189, 248, 0.35) 35%, transparent 70%)",
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

        <div className="relative z-[1] mx-auto flex min-h-[calc(100dvh-72px)] w-full max-w-[1320px] flex-col px-6 pt-1 sm:px-8 lg:block lg:min-h-[500px] lg:px-12 lg:pt-14 xl:px-16 2xl:min-h-[750px] 2xl:px-12 2xl:pt-16">
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
              className="pointer-events-none absolute left-1/2 top-[4%] z-0 -translate-x-1/2 lg:hidden"
            >
              <h4
                className="-mr-[0.28em] whitespace-nowrap font-['Playfair_Display',serif] text-[clamp(3.5rem,28vw,10rem)] font-black uppercase leading-none tracking-[0.28em]"
                style={{
                  background:
                    "linear-gradient(to bottom, #ffffff 0%, #ffffff 28%, rgba(255,255,255,0) 100%)",
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
                    fill="var(--primary-foreground)"
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
                    fill="var(--primary-foreground)"
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
              una{" "}
              <span className="italic font-bold text-primary">historia</span>
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
                className="flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/15 bg-primary text-primary-foreground"
              >
                <WhatsAppIcon />
                Contactar por WhatsApp
              </motion.a>
              <motion.a
                href="#servicios"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-full border-2 px-8 py-4 text-sm font-semibold border-border text-primary"
              >
                Nuestros Servicios
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
            TRATAMIENTOS
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
              <a
                href="#servicios"
                className="inline-flex items-center gap-3 self-start rounded-full pl-5 pr-1.5 py-1.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-90 bg-page-soft"
              >
                Explorar tratamientos
                <span className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-brand-dark">
                  <ArrowUpRight size={16} strokeWidth={2.25} />
                </span>
              </a>
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
              SOBRE NOSOTROS
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={transition}
              className="mb-4 font-['Playfair_Display',serif] text-3xl font-semibold text-foreground lg:text-4xl"
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
                href="#contacto"
                className="flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground text-white transition-all hover:opacity-90"
              >
                Saber más →
              </a>
              <a
                href="#contacto"
                className="flex items-center justify-center rounded-full border-2 border-border px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary/5"
              >
                Agendar ahora
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
            className="w-full flex-1 py-2 lg:min-w-0 lg:basis-[48%] lg:py-6"
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ ...transition, duration: reduceMotion ? 0 : 0.75 }}
          >
            <LazyMount className="w-full" minHeight={480}>
              <ImageCardsSwiper
                imageSrc={imgClinica}
                alt="Nuestra Clínica — Dr. Jaime Pinzon"
                className="w-full"
              />
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
              NUESTRO ENFOQUE
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={transition}
              className="font-['Playfair_Display',serif] font-semibold text-3xl lg:text-4xl text-foreground mb-4"
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
                  <div className="flex items-center justify-center rounded-full shrink-0 w-5 h-5 bg-brand">
                    <Check size={11} strokeWidth={3} color="white" />
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
            {/* <motion.div
              variants={fadeUp}
              transition={transition}
              className="mb-5 h-0.5 w-10 bg-primary"
              aria-hidden
            /> */}
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
              Especialistas con formación internacional. Conoce a cada
              profesional y el enfoque que aporta a tu tratamiento.
            </motion.p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <LazyMount minHeight={460}>
              <TeamGallery members={doctors} />
            </LazyMount>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section
        id="testimonios"
        className="flex min-h-0 flex-col bg-background py-16 lg:h-[90dvh] lg:max-h-[860px] lg:py-20"
      >
        <div className="mx-auto flex h-full w-full max-w-[1320px] flex-col gap-10 px-6 lg:flex-row lg:items-stretch lg:gap-16 lg:px-10">
          <motion.div
            className="z-10 flex w-full shrink-0 flex-col justify-center gap-8 self-start lg:sticky lg:top-28 lg:w-[38%] lg:max-w-md"
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
                CLÍNICA BOUTIQUE
              </motion.span>
              <motion.h2
                variants={fadeUp}
                transition={transition}
                className="mb-4 font-['Playfair_Display',serif] text-4xl font-semibold text-foreground lg:text-5xl"
              >
                Testimonios
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={transition}
                className="text-base leading-relaxed text-muted-foreground lg:text-lg"
              >
                Ofrecemos una gama completa de tratamientos dentales
                personalizados con las últimas tecnologías para garantizar
                resultados óptimos y una experiencia confortable.
              </motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              transition={transition}
              className="flex gap-10"
            >
              <div>
                <p className="font-['Playfair_Display',serif] text-5xl font-semibold text-foreground">
                  52+
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Testimonios
                </p>
              </div>
              <div>
                <p className="font-['Playfair_Display',serif] text-5xl font-semibold text-foreground">
                  1M+
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Clientes satisfechos
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile: scroll nativo (sin marquee infinito = menos jank) */}
          <div className="relative w-full lg:hidden">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hidden">
              {testimonials.map((t) => (
                <TestimonialCard
                  key={`mobile-${t.id}`}
                  t={t}
                  isPlaying={Boolean(t.video) && playingCardId === t.id}
                  onPlay={() => setPlayingCardId(t.id)}
                  className="w-[min(82vw,300px)] shrink-0 snap-start"
                />
              ))}
            </div>
          </div>

          {/* Desktop: columnas verticales */}
          <div className="fade-y-sm relative hidden h-full min-h-0 w-full flex-1 self-stretch overflow-hidden lg:block">
            <div className="grid h-full w-full grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  items: testimonials.filter((_, i) => i % 2 === 0),
                  direction: "up" as const,
                },
                {
                  items: testimonials.filter((_, i) => i % 2 === 1),
                  direction: "down" as const,
                },
              ].map((column) => {
                const loop = reduceMotion
                  ? column.items
                  : [...column.items, ...column.items];
                return (
                  <div
                    key={column.direction}
                    className={
                      reduceMotion
                        ? "relative h-full min-h-0 overflow-y-auto scrollbar-hidden"
                        : "relative h-full min-h-0 overflow-hidden"
                    }
                  >
                    <div
                      className={`flex flex-col gap-3 sm:gap-4 ${
                        reduceMotion
                          ? ""
                          : column.direction === "up"
                            ? "testimonials-marquee-up"
                            : "testimonials-marquee-down"
                      }`}
                    >
                      {loop.map((t, i) => {
                        const isClone =
                          !reduceMotion && i >= column.items.length;
                        return (
                          <TestimonialCard
                            key={`${column.direction}-${t.id}-${i}`}
                            t={t}
                            isClone={isClone}
                            isPlaying={
                              Boolean(t.video) &&
                              playingCardId === t.id &&
                              !isClone
                            }
                            onPlay={() => setPlayingCardId(t.id)}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
                VISÍTANOS
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
              className="inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-opacity hover:opacity-90"
            >
              <span className="inline-flex items-center gap-2">
                <Star size={16} fill="currentColor" strokeWidth={0} />
                Déjanos tu reseña
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <ArrowUpRight size={16} strokeWidth={2.25} />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        id="contacto"
        className="py-20 lg:py-28 overflow-hidden bg-muted"
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <motion.div
            className="flex flex-col items-center mb-12 text-center"
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
              CLÍNICA BOUTIQUE
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={transition}
              className="font-['Playfair_Display',serif] font-semibold text-4xl lg:text-5xl text-foreground"
            >
              Preguntas Frecuentes
            </motion.h2>
          </motion.div>

          <motion.div
            className="max-w-[900px] mx-auto flex flex-col gap-3 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={transition}
                className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-8 py-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-['Playfair_Display',serif] font-bold text-base text-foreground">
                    {i + 1}. {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                    className="shrink-0 text-primary"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        ease: easeOut,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <div className="w-full h-px bg-muted mb-5" />
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeIn}
            transition={transition}
          >
            <p className="text-muted-foreground text-lg">
              ¿Tienes otra pregunta?
            </p>
            <a
              href={siteInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-['Playfair_Display',serif] font-semibold text-xl mt-1 text-primary"
            >
              C<span className="underline underline-offset-4">ontactanos</span>{" "}
              →
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border pt-16 pb-10">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <p className="font-['Playfair_Display',serif] font-semibold text-2xl text-primary">
                {siteInfo.shortName}
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                {siteInfo.slogan}
              </p>
              <p className="text-muted-foreground text-sm mt-3">
                {siteInfo.address}
              </p>
              <p className="text-muted-foreground text-sm">
                Tel: {siteInfo.phone}
              </p>
            </div>

            <div className="md:col-span-3 flex flex-wrap gap-6 md:justify-end items-start">
              <a
                href={siteInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-sm hover:text-primary transition-colors duration-150"
              >
                WhatsApp
              </a>
              <a
                href={siteInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-sm hover:text-primary transition-colors duration-150"
              >
                Instagram
              </a>
              <a
                href="#servicios"
                className="text-muted-foreground text-sm hover:text-primary transition-colors duration-150"
              >
                Servicios
              </a>
              <a
                href="#nosotros"
                className="text-muted-foreground text-sm hover:text-primary transition-colors duration-150"
              >
                Sobre nosotros
              </a>
              <a
                href="#ubicación"
                className="text-muted-foreground text-sm hover:text-primary transition-colors duration-150"
              >
                Ubicación
              </a>
              <a
                href={siteInfo.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-sm hover:text-primary transition-colors duration-150"
              >
                Déjanos tu reseña
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {siteInfo.name}. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
