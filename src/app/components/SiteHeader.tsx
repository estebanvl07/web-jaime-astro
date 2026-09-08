import { useEffect, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Menu, Phone, X } from "lucide-react";
import imgLogo from "@/imports/assets/e7e6e6e81c1d84b256dcdd0c0c907a708c46333a.avif?url";
import { siteInfo } from "@/app/data/site";
import { LazyImage } from "@/app/components/LazyImage";

const easeOut = [0.22, 1, 0.36, 1] as const;

export const homeNavLinks = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Equipo", href: "/#equipo" },
  { label: "Testimonios", href: "/#testimonios" },
  { label: "Preguntas", href: "/#preguntas-frecuentes" },
  { label: "Ubicación", href: "/#ubicación" },
] as const;

type BackLink = {
  to: string | { pathname: string; hash?: string };
  label: string;
  shortLabel?: string;
  onClick?: () => void;
};

type SiteHeaderProps = {
  variant?: "home" | "inner";
  backLink?: BackLink;
};

function BrandLockup({ href = "/" }: { href?: string }) {
  const content = (
    <>
      <LazyImage
        src={imgLogo}
        alt=""
        priority
        className="h-9 w-auto object-contain sm:h-10"
      />
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-['Playfair_Display',serif] text-[17px] font-semibold tracking-tight text-foreground sm:text-xl">
          Dr. Jaime Pinzón
        </span>
        <span className="hidden text-[11px] text-muted-foreground sm:block">
          Odontología especializada
        </span>
      </span>
    </>
  );

  if (href.startsWith("/#") || href === "/") {
    return (
      <a href={href === "/" ? "#" : href} className="flex min-w-0 items-center gap-2.5">
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className="flex min-w-0 items-center gap-2.5">
      {content}
    </Link>
  );
}

export function SiteHeader({ variant = "home", backLink }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-brand-dark text-[11px] text-white/75 sm:text-xs">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-12">
          <p className="flex min-w-0 items-center gap-1.5">
            <MapPin size={12} className="shrink-0 text-brand" aria-hidden />
            <span className="truncate">
              {siteInfo.neighborhood}, {siteInfo.city}
            </span>
          </p>
          <a
            href={`tel:${siteInfo.phoneE164}`}
            className="inline-flex shrink-0 items-center gap-1.5 text-white/90 transition-colors hover:text-white"
          >
            <Phone size={12} className="text-brand" aria-hidden />
            {siteInfo.phone}
          </a>
        </div>
      </div>

      <div
        className={`border-b bg-background/95 backdrop-blur-md transition-[box-shadow,border-color] ${
          scrolled
            ? "border-border shadow-[var(--header-shadow)]"
            : "border-border/70"
        }`}
      >
        <div className="relative mx-auto flex h-[68px] max-w-[1320px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[72px] lg:px-12">
          <BrandLockup href={variant === "inner" ? "/" : "#"} />

          {variant === "home" ? (
            <nav
              aria-label="Principal"
              className="hidden items-center gap-7 lg:flex"
            >
              {homeNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href.replace("/#", "#")}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ) : null}

          <div className="flex items-center gap-2">
            {backLink ? (
              <Link
                to={backLink.to}
                viewTransition
                onClick={backLink.onClick}
                className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary sm:inline-flex"
              >
                {backLink.label}
              </Link>
            ) : null}

            <a
              href={siteInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold sm:px-5"
            >
              <Calendar size={15} aria-hidden />
              <span className="hidden min-[400px]:inline">Agenda tu cita</span>
              <span className="min-[400px]:hidden">Agendar</span>
            </a>

            {variant === "home" ? (
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            ) : null}
          </div>

          <AnimatePresence>
            {menuOpen && variant === "home" ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.2,
                  ease: easeOut,
                }}
                className="absolute inset-x-3 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl lg:hidden"
              >
                {homeNavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href.replace("/#", "#")}
                    className="block rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
