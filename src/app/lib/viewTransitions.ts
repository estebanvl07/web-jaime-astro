/** Coordina view-transition-name entre card y detalle de servicio. */
let activeServiceSlug: string | null = null;
let clearTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeServiceViewTransition(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getActiveServiceViewTransition() {
  return activeServiceSlug;
}

export function activateServiceViewTransition(slug: string) {
  activeServiceSlug = slug;
  emit();
  if (clearTimer) clearTimeout(clearTimer);
  clearTimer = setTimeout(() => {
    if (activeServiceSlug === slug) {
      activeServiceSlug = null;
      emit();
    }
  }, 1200);
}

export function serviceImageTransitionName(_slug?: string) {
  return "service-image";
}

export function serviceTitleTransitionName(_slug?: string) {
  return "service-title";
}
