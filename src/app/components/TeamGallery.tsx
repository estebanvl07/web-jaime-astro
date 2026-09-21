import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";
import { LazyImage } from "@/app/components/LazyImage";
import type { TeamMember } from "@/app/data/team";

export type { TeamMember };

type TeamGalleryProps = {
  members: TeamMember[];
  className?: string;
};

const easeOut = [0.22, 1, 0.36, 1] as const;
const ROTATE_MS = 5000;

export function TeamGallery({ members, className = "" }: TeamGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = members[activeIndex];

  useEffect(() => {
    if (reduceMotion || paused || members.length < 2) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % members.length);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion, paused, members.length, activeIndex]);

  if (!active) return null;

  return (
    <div className={className}>
      <div className="flex flex-col gap-14 lg:hidden">
        {members.map((member, index) => {
          const alignRight = index % 2 === 1;

          return (
            <article key={member.name} className="flex flex-col gap-5">
              <div className={alignRight ? "text-right" : "text-left"}>
                <h3 className="font-['Playfair_Display',serif] text-3xl font-semibold leading-[1.15] tracking-tight text-foreground">
                  {member.name}
                </h3>
                <p className="mt-2 font-['Playfair_Display',serif] text-lg font-medium leading-snug text-muted-foreground">
                  {member.specialty}
                </p>
                {(member.linkedin || member.instagram) && (
                  <div
                    className={`mt-4 flex items-center gap-3 ${alignRight ? "justify-end" : ""}`}
                  >
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <Linkedin size={18} strokeWidth={1.75} />
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80"
                        aria-label={`Instagram de ${member.name}`}
                      >
                        <Instagram size={18} strokeWidth={1.75} />
                      </a>
                    )}
                  </div>
                )}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
              <LazyImage
                src={member.img}
                alt={member.name}
                width={1100}
                height={1314}
                className="h-auto w-full"
              />
            </article>
          );
        })}
      </div>

      <div
        className="hidden flex-col gap-14 lg:flex"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
      <AnimatePresence mode="wait">
        <motion.div
          key={active.name}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: easeOut }}
        >
          <div className="max-w-xl">
            <h3 className="font-['Playfair_Display',serif] text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
              {active.name}
            </h3>
            <p className="mt-2 font-['Playfair_Display',serif] text-lg font-medium leading-snug text-muted-foreground sm:text-xl">
              {active.specialty}
            </p>

            {(active.linkedin || active.instagram) && (
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
            )}
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base lg:pb-1">
            {active.bio}
          </p>
        </motion.div>
      </AnimatePresence>

      <div
        className="grid grid-cols-3 gap-3 sm:gap-5"
        role="listbox"
        aria-label="Equipo profesional"
      >
        {members.map((member, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={member.name}
              type="button"
              role="option"
              aria-selected={isActive}
              aria-label={`Ver perfil de ${member.name}`}
              onClick={() => setActiveIndex(index)}
              className="group relative aspect-[1100/1314] min-w-0 overflow-hidden rounded-xl bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <LazyImage
                src={member.img}
                alt={member.name}
                width={1100}
                height={1314}
                priority={isActive}
                className={`absolute inset-0 h-full w-full object-contain object-center transition-[filter] duration-500 ease-out ${
                  isActive
                    ? "grayscale-0"
                    : "grayscale group-hover:grayscale-0"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
    </div>
  );
}
