const ORTODONCIA_MAIN = "/images/services/ortodoncia.png";
const ORTODONCIA_OVERLAY = "/images/services/alineadores_transparentes.png";

const AUTOLIGADO_MAIN = "/images/services/autoligado.jpg";
const AUTOLIGADO_OVERLAY = "/images/services/autoligado_elem.jpeg";

export const EMPTY_SERVICE = "/images/services/empty-logo.png";

export function isEmptyServiceImage(src: string) {
  return src === EMPTY_SERVICE;
}

const ORTODONCIA_SLUGS = new Set([
  "alineadores-dentales",
  "ortodoncia-convencional",
  "ortopedia-maxilar",
]);

export type ServiceImageConfig = {
  image: string;
  overlayImage?: string;
};

export function getServiceImage(slug: string): ServiceImageConfig {
  if (slug === "ortodoncia-de-autoligado") {
    return {
      image: AUTOLIGADO_MAIN,
      overlayImage: AUTOLIGADO_OVERLAY,
    };
  }

  if (ORTODONCIA_SLUGS.has(slug)) {
    return {
      image: ORTODONCIA_MAIN,
      overlayImage: ORTODONCIA_OVERLAY,
    };
  }

  return { image: EMPTY_SERVICE };
}
