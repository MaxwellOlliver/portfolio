import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

const SITE_URL = "https://maxwellmacedo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale === "pt" ? "pt-BR" : locale,
      `${SITE_URL}/${locale}`,
    ]),
  );

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
