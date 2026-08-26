import { useEffect, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Calendar,
} from "lucide-react";
import imgLogo from "@/imports/assets/e7e6e6e81c1d84b256dcdd0c0c907a708c46333a.avif?url";
import { ServiceImage } from "@/app/components/ServiceImage";
import { getServiceBySlug, services } from "@/app/data/services";
import { getServiceImage } from "@/app/data/serviceImages";
import { siteInfo } from "@/app/data/site";
import {
  Seo,
  buildServiceJsonLd,
  buildBreadcrumbJsonLd,
} from "@/app/seo/Seo";
import {
  activateServiceViewTransition,
  serviceImageTransitionName,
  serviceTitleTransitionName,
} from "@/app/lib/viewTransitions";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const viewport = { once: true, amount: 0.2 };

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const serviceDescription = useMemo(() => {
    if (!service) return siteInfo.description;
    return `${service.title} en Barranquilla. ${service.whatIs.slice(0, 155).trim()}…`;
  }, [service]);

  const serviceJsonLd = useMemo(() => {
    if (!service) return undefined;
    return [
      buildServiceJsonLd(service),
      buildBreadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Servicios", path: "/#servicios" },
        { name: service.title, path: `/servicios/${service.slug}` },
      ]),
    ];
  }, [service]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: easeOut };

  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  const { image: serviceImage, overlayImage: serviceOverlayImage } =
    getServiceImage(service.slug);

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif] text-foreground">
      <Seo
        title={`${service.title} — ${service.category}`}
        description={serviceDescription}
        path={`/servicios/${service.slug}`}
        jsonLd={serviceJsonLd}
      />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-6 py-3.5 lg:px-10">
          <Link
            to="/"
            viewTransition
            onClick={() => activateServiceViewTransition(service.slug)}
            className="flex min-w-0 items-center gap-2"
          >
            <img
              src={imgLogo}
              alt={siteInfo.shortName}
              className="h-8 w-auto object-contain sm:h-9"
            />
            <span className="truncate font-['Playfair_Display',serif] text-lg font-semibold tracking-tight text-primary sm:text-xl">
              {siteInfo.shortName}
            </span>
          </Link>
          <Link
            to={{ pathname: "/", hash: "servicios" }}
            viewTransition
            onClick={() => activateServiceViewTransition(service.slug)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Volver a servicios</span>
            <span className="sm:hidden">Volver</span>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-[72px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--page-hero)" }}
        />
        <div className="relative mx-auto grid max-w-[1320px] gap-10 px-6 pb-16 pt-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:pb-20 lg:pt-14">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-5"
          >
            <motion.span
              variants={fadeUp}
              transition={transition}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-brand bg-accent px-4 py-1.5 text-xs font-semibold tracking-widest text-brand"
            >
              {service.category.toUpperCase()}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              transition={transition}
              style={{
                viewTransitionName: serviceTitleTransitionName(service.slug),
              }}
              className="service-vt-title font-['Playfair_Display',serif] text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[52px]"
            >
              {service.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={transition}
              className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {service.categoryIntro}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={transition}
              className="flex flex-col gap-3 pt-2 sm:flex-row"
            >
              <a
                href={siteInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15"
              >
                <Calendar size={16} />
                Agendar valoración
              </a>
              <Link
                to={{ pathname: "/", hash: "servicios" }}
                viewTransition
                onClick={() => activateServiceViewTransition(service.slug)}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border px-7 py-3.5 text-sm font-semibold text-primary"
              >
                Ver más servicios
              </Link>
            </motion.div>
          </motion.div>

          <div className="relative overflow-hidden rounded-[28px]">
            <ServiceImage
              src={serviceImage}
              overlaySrc={serviceOverlayImage}
              alt={service.title}
              width={1280}
              height={853}
              priority
              style={{
                viewTransitionName: serviceImageTransitionName(service.slug),
              }}
              className="w-full"
              imageClassName="service-vt-image aspect-[4/3] w-full object-cover object-top lg:aspect-[5/4]"
              overlayClassName="h-24 w-24 sm:h-28 sm:w-28 lg:h-36 lg:w-36"
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeUp} transition={transition}>
              <h2 className="mb-4 font-['Playfair_Display',serif] text-2xl font-semibold text-foreground lg:text-3xl">
                ¿Qué es?
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {service.whatIs}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} transition={transition}>
              <h2 className="mb-4 font-['Playfair_Display',serif] text-2xl font-semibold text-foreground lg:text-3xl">
                ¿Para qué sirve?
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {service.whatFor}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} transition={transition}>
              <h2 className="mb-6 font-['Playfair_Display',serif] text-2xl font-semibold text-foreground lg:text-3xl">
                Características
              </h2>
              <ul className="flex flex-col gap-3.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand">
                      <Check size={11} strokeWidth={3} color="white" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={transition}
              className="rounded-2xl border border-primary/15 bg-page-soft p-6 sm:p-8"
            >
              <p className="mb-2 text-xs font-semibold tracking-widest text-brand">
                IDEAL PARA TI SI
              </p>
              <p className="font-['Playfair_Display',serif] text-lg font-semibold leading-snug text-foreground sm:text-xl">
                {service.idealFor}
              </p>
              <a
                href={siteInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 self-start rounded-full bg-brand-dark py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Consultar por WhatsApp
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <ArrowUpRight size={16} strokeWidth={2.25} />
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-muted/40 py-16 lg:py-20">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
            <h2 className="mb-8 font-['Playfair_Display',serif] text-2xl font-semibold text-foreground lg:text-3xl">
              Otros tratamientos de {service.category.toLowerCase()}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/servicios/${item.slug}`}
                  viewTransition
                  onClick={() => activateServiceViewTransition(item.slug)}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30 hover:bg-primary/[0.03]"
                >
                  <div>
                    <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground">
                      {item.category}
                    </p>
                    <p className="font-['Playfair_Display',serif] text-lg font-semibold text-foreground">
                      {item.title}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Ver detalle
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 px-6 text-center sm:flex-row sm:text-left lg:px-10">
          <div>
            <p className="font-['Playfair_Display',serif] text-lg font-semibold text-primary">
              {siteInfo.shortName}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {siteInfo.address} · {siteInfo.phone}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{siteInfo.slogan}</p>
        </div>
      </footer>
    </div>
  );
}
