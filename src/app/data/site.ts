/**
 * Datos del sitio y SEO.
 * IMPORTANTE: actualiza `siteUrl` con tu dominio real antes de publicar
 * (o define VITE_SITE_URL en .env).
 */
const envSiteUrl =
  (import.meta.env.PUBLIC_SITE_URL as string | undefined) ||
  (import.meta.env.VITE_SITE_URL as string | undefined) ||
  (import.meta.env.SITE as string | undefined);

export const siteInfo = {
  name: "Dr. Jaime Pinzón Odontología Especializada",
  shortName: "DR. JAIME PINZÓN",
  slogan:
    "Cada sonrisa tiene una historia y queremos ser parte de ella",
  description:
    "Consultorio odontológico en Barranquilla desde 2015. Ortodoncia, periodoncia, estética dental, implantes y rehabilitación oral con atención personalizada en Cra 41 #71-25, El Recreo.",
  keywords: [
    "odontólogo Barranquilla",
    "Dr Jaime Pinzón",
    "ortodoncia Barranquilla",
    "alineadores dentales",
    "implantes dentales Barranquilla",
    "periodoncia",
    "estética dental",
    "rehabilitación oral",
    "odontología El Recreo",
  ],
  /** Dominio canónico sin slash final */
  siteUrl: (envSiteUrl || "https://drjaime.netlify.app").replace(/\/$/, ""),
  locale: "es_CO",
  language: "es",
  city: "Barranquilla",
  region: "Atlántico",
  country: "CO",
  postalCode: "080002",
  address: "Cra 41 #71-25, El Recreo, Barranquilla",
  streetAddress: "Cra 41 #71-25",
  neighborhood: "El Recreo",
  phone: "3016448128",
  phoneE164: "+573016448128",
  whatsapp: "573016448128",
  whatsappUrl: "https://wa.me/573016448128",
  instagram: "drjaimepinzon.odontologia",
  instagramUrl: "https://www.instagram.com/drjaimepinzon.odontologia",
  sinceYear: 2015,
  successfulTreatments: "1.000+",
  /** Código de verificación de Google Search Console (solo el valor del content) */
  googleSiteVerification: "" as string,
  ogImagePath: "/og-image.webp",
  faviconPath: "/favicon.png",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Cra.+41+%2371-25,+El+Recreo,+Barranquilla,+Dr+Jaime+Pinzon+Odontologia",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Cra.+41+%2371-25,+El+Recreo,+Barranquilla&hl=es&z=16&output=embed",
  googleReviewUrl:
    "https://www.google.com/maps/search/?api=1&query=Cra.+41+%2371-25,+El+Recreo,+Barranquilla,+Dr+Jaime+Pinzon+Odontologia",
};

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteInfo.siteUrl}${normalized}`;
}
