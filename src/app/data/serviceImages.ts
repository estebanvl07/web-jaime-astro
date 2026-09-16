const ORTODONCIA_MAIN = "/images/services/ortodoncia.avif";
const ORTODONCIA_OVERLAY = "/images/services/alineadores_transparentes.avif";

const AUTOLIGADO_MAIN = "/images/services/autoligado.avif";
const AUTOLIGADO_OVERLAY = "/images/services/autoligado_elem.avif";

export const EMPTY_SERVICE = "/images/services/empty-logo.png";

export function isEmptyServiceImage(src: string) {
  return src === EMPTY_SERVICE;
}

export type ServiceImageConfig = {
  image: string;
  overlayImage?: string;
};

const SERVICE_IMAGES: Record<string, ServiceImageConfig> = {
  "alineadores-dentales": {
    image: ORTODONCIA_MAIN,
    overlayImage: ORTODONCIA_OVERLAY,
  },
  "ortodoncia-de-autoligado": {
    image: AUTOLIGADO_MAIN,
    overlayImage: AUTOLIGADO_OVERLAY,
  },
  "ortodoncia-convencional": {
    image: "/images/services/ortodoncia-convencional.avif",
  },
  "ortopedia-maxilar": {
    image: "/images/services/ortopedia-maxilar.avif",
  },
  "raspaje-y-alisado-radicular": {
    image: "/images/services/raspaje-y-alisado-radicular.avif",
  },
  gingivoplastia: {
    image: "/images/services/gingivoplastia.avif",
  },
  "alargamiento-de-corona-clinica": {
    image: "/images/services/alargamiento-de-corona-clinica.avif",
  },
  "implantes-dentales": {
    image: "/images/services/implantes-dentales.avif",
  },
  "higiene-dental-profesional": {
    image: "/images/services/higiene-dental-profesional.avif",
  },
  "resinas-dentales": {
    image: "/images/services/resinas-dentales.avif",
  },
  "carillas-dentales": {
    image: "/images/services/carillas-dentales.avif",
  },
  "incrustaciones-dentales": {
    image: "/images/services/incrustaciones-dentales.avif",
  },
  "extracciones-dentales": {
    image: "/images/services/extracciones-dentales.avif",
  },
  "coronas-dentales": {
    image: "/images/services/coronas-dentales.avif",
  },
  "protesis-parciales-removibles": {
    image: "/images/services/protesis-parciales-removibles.avif",
  },
  "protesis-totales": {
    image: "/images/services/protesis-totales.avif",
  },
};

export function getServiceImage(slug: string): ServiceImageConfig {
  return SERVICE_IMAGES[slug] ?? { image: EMPTY_SERVICE };
}
