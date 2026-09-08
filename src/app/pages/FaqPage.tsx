import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaqList } from "@/app/components/FaqList";
import { SiteHeader } from "@/app/components/SiteHeader";
import { WhatsAppFloat } from "@/app/components/WhatsAppFloat";
import { faqGroups, faqs } from "@/app/data/faqs";
import { siteInfo } from "@/app/data/site";
import { Seo, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/app/seo/Seo";

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

const viewport = { once: true, amount: 0.15 };

export default function FaqPage() {
  const reduceMotion = useReducedMotion();
  const [openByGroup, setOpenByGroup] = useState<Record<string, number | null>>(
    () => ({ [faqGroups[0]?.id ?? "citas"]: 0 }),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = useMemo(
    () => [
      buildFaqJsonLd(faqs),
      buildBreadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
      ]),
    ],
    [],
  );

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: easeOut };

  let runningNumber = 1;

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif] text-foreground">
      <Seo
        title="Preguntas frecuentes"
        description="Resuelve dudas sobre citas, ortodoncia, periodoncia, prótesis e implantes en Dr. Jaime Pinzón Odontología Especializada, Barranquilla."
        path="/preguntas-frecuentes"
        jsonLd={jsonLd}
      />

      <SiteHeader
        variant="inner"
        backLink={{ to: "/", label: "Volver al inicio", shortLabel: "Volver" }}
      />

      <section className="relative overflow-hidden pt-[var(--header-offset)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--page-hero)" }}
        />
        <div className="relative mx-auto max-w-[900px] px-6 pb-12 pt-12 lg:px-10 lg:pb-16 lg:pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-start gap-5"
          >
            <motion.span
              variants={fadeUp}
              transition={transition}
              className="text-sm font-medium text-brand"
            >
              Preguntas frecuentes
            </motion.span>
            <motion.h1
              variants={fadeUp}
              transition={transition}
              className="font-['Playfair_Display',serif] text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
            >
              Resolvemos tus dudas
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              Encuentra respuestas sobre citas, ortodoncia, periodoncia, prótesis
              e implantes. Si no ves tu pregunta, escríbenos por WhatsApp y te
              orientamos.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-muted py-12 lg:py-20">
        <div className="mx-auto flex max-w-[900px] flex-col gap-12 px-6 lg:px-10">
          {faqGroups.map((group) => {
            const startNumber = runningNumber;
            runningNumber += group.items.length;

            return (
              <motion.div
                key={group.id}
                id={group.id}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={stagger}
              >
                <motion.h2
                  variants={fadeUp}
                  transition={transition}
                  className="mb-5 font-['Playfair_Display',serif] text-2xl font-semibold text-foreground"
                >
                  {group.title}
                </motion.h2>
                <FaqList
                  items={group.items}
                  startNumber={startNumber}
                  openIndex={openByGroup[group.id] ?? null}
                  onToggle={(index) =>
                    setOpenByGroup((current) => ({
                      ...current,
                      [group.id]: current[group.id] === index ? null : index,
                    }))
                  }
                />
              </motion.div>
            );
          })}

          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              ¿Tienes otra pregunta?
            </p>
            <a
              href={siteInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 font-['Playfair_Display',serif] text-xl font-semibold text-primary"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-brand-dark py-10 text-white">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 px-6 text-center sm:flex-row sm:text-left lg:px-10">
          <div>
            <p className="font-['Playfair_Display',serif] text-lg font-semibold">
              Dr. Jaime Pinzón
            </p>
            <p className="mt-1 text-sm text-white/65">
              {siteInfo.address} · {siteInfo.phone}
            </p>
          </div>
          <p className="text-sm text-white/65">{siteInfo.slogan}</p>
        </div>
      </footer>
      <WhatsAppFloat />
    </div>
  );
}
