import { useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/app/hooks/useIsMobile";

export const motionEaseOut = [0.22, 1, 0.36, 1] as const;

type MotionSettingsOptions = {
  duration?: number;
};

/**
 * Perfil de animación: en móvil y con prefers-reduced-motion se simplifica
 * o desactiva el movimiento para mejorar fluidez.
 */
export function useMotionSettings(options: MotionSettingsOptions = {}) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const lightMotion = reduceMotion || isMobile;
  const duration = options.duration ?? 0.65;

  const transition = lightMotion
    ? { duration: 0 }
    : { duration, ease: motionEaseOut };

  const fadeUp = lightMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

  const fadeIn = lightMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0 }, visible: { opacity: 1 } };

  const stagger = lightMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: 0.08 },
        },
      };

  return {
    reduceMotion,
    isMobile,
    lightMotion,
    transition,
    fadeUp,
    fadeIn,
    stagger,
    easeOut: motionEaseOut,
  };
}
