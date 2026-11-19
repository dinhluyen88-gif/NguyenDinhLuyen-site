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
    title: t.about.kicker,
    description: t.about.intro[0],
    alternates: { canonical: `/${locale}/about/`, languages: { vi: "/vi/about/", en: "/en/about/" } },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="reveal grid gap-6 border-t border-ink pt-8 md:grid-cols-[14rem_1fr] md:gap-12">
      <h2 className="kicker">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { about, contact } = getDictionary(locale);

  return (
    <div className="container-page pt-14 md:pt-24">
      <header className="max-w-4xl">
        <p className="kicker rise">{about.kicker}</p>
        <h1 className="display rise mt-5 text-4xl md:text-7xl" style={{ "--delay": "80ms" } as React.CSSProperties}>
          {about.title}
        </h1>
      </header>

      <div className="rise mt-12 grid gap-6 md:mt-16 md:grid-cols-[14rem_1fr] md:gap-12" style={{ "--delay": "200ms" } as React.CSSProperties}>
        <div aria-hidden="true" />
        <div className="max-w-3xl space-y-6">
          {about.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "font-serif text-2xl leading-relaxed md:text-[1.7rem]" : "text-lg leading-relaxed text-soft"}>
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-20 space-y-16 md:mt-28 md:space-y-24">
        <Block title={about.experienceTitle}>
          <ol>
            {about.roles.map((r, i) => (
              <li key={r.period + r.company} className={`grid gap-2 py-8 md:grid-cols-[11rem_1fr] md:gap-8 ${i > 0 ? "border-t border-rule" : "pt-0"}`}>
                <p className="text-sm tabular-nums text-mute">{r.period}</p>
                <div>
                  <h3 className="display text-2xl md:text-3xl">{r.title}</h3>
                  <p className="mt-1 font-semibold text-accent">{r.company}</p>
                  <p className="mt-4 max-w-2xl text-soft">{r.summary}</p>
                  {r.points ? (
                    <ul className="mt-4 max-w-2xl space-y-2 text-soft">
                      {r.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Block>

        <Block title={about.educationTitle}>
          <ul>
            {about.education.map((e, i) => (
              <li key={e.title + e.school} className={`grid gap-1 py-6 md:grid-cols-[11rem_1fr] md:gap-8 ${i > 0 ? "border-t border-rule" : "pt-0"}`}>
                <p className="text-sm tabular-nums text-mute">{e.period}</p>
                <div>
                  <h3 className="display text-xl md:text-2xl">{e.title}</h3>
                  <p className="mt-1 text-soft">{e.school}</p>
                  {e.note ? <p className="mt-1 text-sm font-semibold text-accent">{e.note}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={about.certTitle}>
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {about.certs.map((c) => (
              <li key={c.title} className="border-b border-rule py-5">
                <p className="text-sm tabular-nums text-mute">{c.year}</p>
                <p className="mt-1 font-semibold">{c.title}</p>
                <p className="text-sm text-soft">{c.issuer}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={about.languagesTitle}>
          <ul className="flex flex-wrap gap-x-14 gap-y-6">
            {about.languages.map((l) => (
              <li key={l.name}>
                <p className="display text-2xl">{l.name}</p>
                <p className="text-sm text-soft">{l.level}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={about.beyondTitle}>
          <div className="max-w-3xl space-y-5 font-serif text-xl leading-relaxed">
            {about.beyond.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-10">
            {contact.linkedin} <Arrow />
          </a>
        </Block>
      </div>
    </div>
  );
}
