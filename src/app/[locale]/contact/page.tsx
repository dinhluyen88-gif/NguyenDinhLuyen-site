import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, site } from "@/content/site";
import { Arrow } from "@/components/ui";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.contact.kicker,
    description: t.contact.body,
    alternates: { canonical: `/${locale}/contact/`, languages: { vi: "/vi/contact/", en: "/en/contact/" } },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <div className="container-page pt-14 md:pt-24">
      <p className="kicker rise">{t.contact.kicker}</p>
      <h1 className="display rise mt-5 text-5xl md:text-8xl" style={{ "--delay": "80ms" } as React.CSSProperties}>
        {t.contact.title}
      </h1>
      <p className="rise mt-8 max-w-2xl text-lg text-soft md:text-xl" style={{ "--delay": "180ms" } as React.CSSProperties}>
        {t.contact.body}
      </p>

      <ul className="rise mt-14 border-t border-ink" style={{ "--delay": "260ms" } as React.CSSProperties}>
        <li className="border-b border-rule">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 py-8">
            <span>
              <span className="kicker block">LinkedIn</span>
              <span className="display mt-2 block text-2xl transition-colors duration-200 group-hover:text-accent md:text-4xl">
                linkedin.com/in/nguyendinhluyen
              </span>
            </span>
            <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
              <Arrow />
            </span>
          </a>
        </li>
        {site.email ? (
          <li className="border-b border-rule">
            <a href={`mailto:${site.email}`} className="group flex items-center justify-between gap-6 py-8">
              <span>
                <span className="kicker block">Email</span>
                <span className="display mt-2 block break-all text-2xl transition-colors duration-200 group-hover:text-accent md:text-4xl">
                  {site.email}
                </span>
              </span>
              <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
                <Arrow />
              </span>
            </a>
          </li>
        ) : null}
        <li className="border-b border-rule py-8">
          <span className="kicker block">{t.hero.basedLabel}</span>
          <span className="display mt-2 block text-2xl md:text-4xl">{t.hero.based}</span>
        </li>
      </ul>
    </div>
  );
}
