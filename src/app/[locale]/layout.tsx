import type { Metadata } from "next";
import { Fraunces, Be_Vietnam_Pro, Source_Serif_4 } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, isLocale, locales, site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";

const display = Fraunces({
  variable: "--ff-display",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const sans = Be_Vietnam_Pro({
  variable: "--ff-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--ff-serif",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s — ${site.name}` },
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: { vi: "/vi/", en: "/en/" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "vi" ? "vi_VN" : "en_US",
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html lang={locale} className={`no-js ${display.variable} ${sans.variable} ${serif.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          {locale === "vi" ? "Bỏ qua điều hướng" : "Skip to content"}
        </a>
        <Header locale={locale} nav={t.nav} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
        <RevealObserver />
      </body>
    </html>
  );
}
