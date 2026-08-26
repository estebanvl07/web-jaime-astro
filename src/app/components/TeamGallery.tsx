import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";
import { LazyImage } from "@/app/components/LazyImage";
import { useMotionSettings } from "@/app/hooks/useMotionSettings";

export type TeamMember = {
  name: string;
  specialty: string;
  bio: string;
  img: string;
  linkedin?: string;
  instagram?: string;
};

type TeamGalleryProps = {
  members: TeamMember[];
  className?: string;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function TeamGallery({ members, className = "" }: TeamGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lightMotion } = useMotionSettings({ duration: 0.35 });
  const active = members[activeIndex];

  if (!active) return null;

  return (
    <div
      className={`flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-12 xl:gap-16 ${className}`}
    >
      {/* Detalle del miembro activo */}
      <div className="flex w-full flex-col justify-start lg:w-[34%] lg:max-w-sm lg:shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={lightMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={lightMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: lightMotion ? 0 : 0.35, ease: easeOut }}
          >
            <h3 className="font-['Playfair_Display',serif] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {active.name}
            </h3>
            <p className="mt-2 text-sm font-medium text-muted-foreground sm:text-base">
              {active.specialty}
            </p>

            <div className="mt-5 flex items-center gap-3">
              {active.linkedin && (
                <a
                  href={active.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 transition-colors hover:text-primary"
                  aria-label={`LinkedIn de ${active.name}`}
                >
                  <Linkedin size={18} strokeWidth={1.75} />
                </a>
              )}
              {active.instagram && (
                <a
                  href={active.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 transition-colors hover:text-primary"
                  aria-label={`Instagram de ${active.name}`}
                >
                  <Instagram size={18} strokeWidth={1.75} />
                </a>
              )}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {active.bio}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Galería accordion */}
      <div
        className="flex h-[340px] w-full gap-2 sm:h-[400px] sm:gap-2.5 lg:h-[460px] lg:min-w-0 lg:flex-1"
        role="listbox"
        aria-label="Equipo profesional"
      >
        {members.map((member, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.button
              key={member.name}
              type="button"
              role="option"
              aria-selected={isActive}
              aria-label={`Ver perfil de ${member.name}`}
              onClick={() => setActiveIndex(index)}
              layout={!lightMotion}
              initial={false}
              animate={{
                flexGrow: isActive ? 4.2 : 1,
                flexBasis: 0,
              }}
              transition={
                lightMotion
                  ? { duration: 0 }
                  : { duration: 0.55, ease: easeOut }
              }
              className="group relative min-w-0 overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              style={{ flexShrink: 1 }}
            >
              <LazyImage
                src={member.img}
                alt={member.name}
                width={640}
                height={800}
                priority={isActive}
                className={`absolute inset-0 h-full w-full object-cover object-top ${
                  lightMotion
                    ? ""
                    : "transition-[filter,transform] duration-500 ease-out"
                } ${
                  isActive
                    ? "scale-100 grayscale-0"
                    : "scale-105 grayscale group-hover:grayscale-[40%]"
                }`}
              />

              {/* Overlay sutil en inactivos */}
              <div
                className={`pointer-events-none absolute inset-0 transition-colors duration-400 ${
                  isActive ? "bg-transparent" : "bg-foreground/25"
                }`}
              />

              {/* Nombre en franja activa (móvil / refuerzo) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={lightMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={lightMotion ? undefined : { opacity: 0 }}
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/55 via-foreground/15 to-transparent px-3 pb-3 pt-10 lg:hidden"
                  >
                    <p className="truncate text-left text-sm font-semibold text-white">
                      {member.name}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
