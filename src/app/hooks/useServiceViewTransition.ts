import { useSyncExternalStore } from "react";
import { useViewTransitionState } from "react-router";
import {
  getActiveServiceViewTransition,
  serviceImageTransitionName,
  serviceTitleTransitionName,
  subscribeServiceViewTransition,
} from "@/app/lib/viewTransitions";

/**
 * Indica si este servicio debe compartir view-transition-name
 * (navegación hacia el detalle o retorno al card).
 */
export function useServiceViewTransition(slug: string) {
  const to = `/servicios/${slug}`;
  const isTransitioning = useViewTransitionState(to);
  const activeSlug = useSyncExternalStore(
    subscribeServiceViewTransition,
    getActiveServiceViewTransition,
    () => null,
  );
  const active = isTransitioning || activeSlug === slug;

  return {
    to,
    active,
    imageName: active ? serviceImageTransitionName(slug) : "none",
    titleName: active ? serviceTitleTransitionName(slug) : "none",
  };
}
