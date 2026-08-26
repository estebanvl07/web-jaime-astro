# DR.Jaime-astro

Port a **Astro** del sitio [DR.Jaime-web](../DR.Jaime-web) (mismo diseño, assets, fuentes y layout).

El proyecto original en Vite+React **no se modifica**. Esta carpeta es independiente.

## Stack

- Astro 7 (SSG) + React islands
- Tailwind CSS 4
- Framer Motion + Swiper (mismas interacciones)
- Fuentes locales en `public/fonts/optimized/`
- Imágenes AVIF en `src/imports/assets/`

## Desarrollo

```bash
cd DR.Jaime-astro
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Estructura

| Ruta | Rol |
|------|-----|
| `src/layouts/BaseLayout.astro` | HTML base, SEO, preload de fuentes |
| `src/pages/index.astro` | Home |
| `src/pages/servicios/[slug].astro` | Detalle de servicio (estático) |
| `src/app/` | UI React (mismo layout que DR.Jaime-web) |
| `src/styles/` | globals + theme + Tailwind |
| `public/` | favicon, fonts, robots, sitemap, manifest |

## Variables

Opcional en `.env`:

```
PUBLIC_SITE_URL=https://tu-dominio.com
```
