import "../globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

const SITE_URL = "https://maxwellmacedo.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const url = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Maxwell Macedo", url: SITE_URL }],
    creator: "Maxwell Macedo",
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en`,
        "pt-BR": `${SITE_URL}/pt`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
      url,
      siteName: "Maxwell Macedo",
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@maxll_e",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Maxwell Macedo",
    url: SITE_URL,
    jobTitle: "Senior Full-Stack Engineer",
    email: "mailto:maxwellmacedo2015@gmail.com",
    sameAs: [
      "https://github.com/MaxwellOlliver",
      "https://linkedin.com/in/maxwell-macedo",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "React Native",
      "TypeScript",
      "Software Architecture",
      "Web Performance",
    ],
  };

  return (
    <html lang={locale === "pt" ? "pt-BR" : locale}>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
