import imgHero from "@/imports/assets/a8f2c0383b88021a11b45557934c6aacc3594e91.avif?url";

const ORTODONCIA_MAIN = "/images/services/ortodoncia.png";
const ORTODONCIA_OVERLAY = "/images/services/alineadores_transparentes.png";

const AUTOLIGADO_MAIN = "/images/services/autoligado.jpg";
const AUTOLIGADO_OVERLAY = "/images/services/autoligado_elem.jpeg";

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

  return { image: imgHero };
}
