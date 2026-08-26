import { useEffect } from "react";
import { siteInfo, absoluteUrl } from "@/app/data/site";

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  jsonLd?: JsonLd;
};

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string,
) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: JsonLd) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Actualiza title, meta tags, canonical y JSON-LD en el cliente.
 * Complementa las meta estáticas de index.html (críticas para el primer crawl).
 */
export function Seo({
  title,
  description = siteInfo.description,
  path = "/",
  image = siteInfo.ogImagePath,
  type = "website",
  noIndex = false,
  jsonLd,
}: SeoProps) {
  const fullTitle = title
    ? `${title} | ${siteInfo.shortName}`
    : `${siteInfo.name} | Odontología en Barranquilla`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = siteInfo.language;

    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", siteInfo.keywords.join(", "));
    upsertMeta(
      "name",
      "robots",
      noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    upsertMeta("name", "author", siteInfo.name);
    upsertMeta("name", "geo.region", "CO-ATL");
    upsertMeta("name", "geo.placename", siteInfo.city);
    upsertMeta("name", "theme-color", "#0f766e");

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", siteInfo.name);
    upsertMeta("property", "og:locale", siteInfo.locale);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:alt", siteInfo.name);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

    upsertLink("canonical", url);

    if (siteInfo.googleSiteVerification) {
      upsertMeta(
        "name",
        "google-site-verification",
        siteInfo.googleSiteVerification,
      );
    }

    if (jsonLd) {
      upsertJsonLd("seo-jsonld", Array.isArray(jsonLd) ? jsonLd : jsonLd);
    }
  }, [fullTitle, description, url, imageUrl, type, noIndex, jsonLd]);

  return null;
}

export function buildDentistJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
    "@id": `${siteInfo.siteUrl}/#dentist`,
    name: siteInfo.name,
    alternateName: siteInfo.shortName,
    description: siteInfo.description,
    url: siteInfo.siteUrl,
    image: absoluteUrl(siteInfo.ogImagePath),
    logo: absoluteUrl(siteInfo.faviconPath),
    telephone: siteInfo.phoneE164,
    foundingDate: String(siteInfo.sinceYear),
    slogan: siteInfo.slogan,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteInfo.streetAddress,
      addressLocality: siteInfo.city,
      addressRegion: siteInfo.region,
      postalCode: siteInfo.postalCode,
      addressCountry: siteInfo.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.988,
      longitude: -74.807,
    },
    sameAs: [siteInfo.instagramUrl],
    areaServed: {
      "@type": "City",
      name: siteInfo.city,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteInfo.phoneE164,
      contactType: "customer service",
      availableLanguage: ["Spanish"],
    },
    hasMap: siteInfo.mapsUrl,
  };
}

export function buildServiceJsonLd(service: {
  title: string;
  slug: string;
  category: string;
  whatIs: string;
}) {
  const url = absoluteUrl(`/servicios/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    description: service.whatIs.slice(0, 300),
    url,
    procedureType: service.category,
    provider: {
      "@type": "Dentist",
      name: siteInfo.name,
      url: siteInfo.siteUrl,
      telephone: siteInfo.phoneE164,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteInfo.streetAddress,
        addressLocality: siteInfo.city,
        addressRegion: siteInfo.region,
        addressCountry: siteInfo.country,
      },
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteInfo.siteUrl}/#website`,
    name: siteInfo.name,
    url: siteInfo.siteUrl,
    description: siteInfo.description,
    inLanguage: "es-CO",
    publisher: {
      "@id": `${siteInfo.siteUrl}/#dentist`,
    },
  };
}
