import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, site } from "@/content/site";
import { getPostsForLocale } from "@/lib/posts";
import { Arrow, PostRow, SectionHead } from "@/components/ui";

type Props = { params: Promise<{ locale: string }> };

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const posts = getPostsForLocale(locale).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-14 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <p className="kicker rise">{t.hero.eyebrow}</p>
            <h1 className="display mt-6 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              {t.hero.headline.map((line, i) => (
                <span key={line} className="rise block sm:whitespace-nowrap" style={delay(80 + i * 90)}>
                  {i === t.hero.headline.length - 1 ? <em className="font-normal italic text-accent">{line}</em> : line}
                </span>
              ))}
            </h1>
            <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-soft md:text-xl" style={delay(380)}>
              {t.hero.lede}
            </p>
            <div className="rise mt-10 flex flex-wrap gap-3" style={delay(460)}>
              <Link href={`/${locale}/blog/`} className="btn btn-solid">
                {t.hero.primary} <Arrow />
              </Link>
              <Link href={`/${locale}/about/`} className="btn btn-ghost">
                {t.hero.secondary}
              </Link>
            </div>
          </div>

          <aside className="rise self-end" style={delay(520)}>
            {site.portrait ? (
              <Image
                src={site.portrait}
                alt={t.portraitAlt}
                width={640}
                height={800}
                priority
                className="mb-6 aspect-[4/5] w-full object-cover object-[42%_20%] grayscale"
              />
            ) : null}
            <dl className="border-t border-ink text-sm">
              <div className="border-b border-rule py-4">
                <dt className="kicker">{t.hero.nowLabel}</dt>
                {t.hero.now.map((n) => (
                  <dd key={n.org} className="mt-3">
                    <span className="block font-semibold">{n.role}</span>
                    <span className="text-soft">{n.org}</span>
                  </dd>
                ))}
              </div>
              <div className="border-b border-rule py-4">
                <dt className="kicker">{t.hero.basedLabel}</dt>
                <dd className="mt-3 text-soft">{t.hero.based}</dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* Stats */}
        <dl className="mt-16 grid grid-cols-2 border-t border-ink md:mt-24 lg:grid-cols-4">
          {t.stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal border-b border-rule py-7 pr-6 lg:border-b-0 ${i % 2 === 1 ? "pl-6 lg:pl-0" : ""} ${i > 0 ? "lg:border-l lg:border-rule lg:pl-8" : ""} ${i % 2 === 1 ? "border-l border-rule" : ""}`}
              style={delay(i * 70)}
            >
              <dd className="display text-4xl md:text-6xl">{s.value}</dd>
              <dt className="mt-3 max-w-[16rem] text-sm text-soft">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Focus */}
      <section className="container-page mt-24 md:mt-36">
        <SectionHead kicker={t.focus.kicker} title={t.focus.title} />
        <ol className="grid border-t border-rule md:grid-cols-2">
          {t.focus.items.map((item, i) => (
            <li
              key={item.title}
              className={`reveal border-b border-rule py-9 md:py-11 ${i % 2 === 0 ? "md:border-r md:pr-12" : "md:pl-12"}`}
              style={delay((i % 2) * 80)}
            >
              <span className="font-display text-sm italic text-accent">0{i + 1}</span>
              <h3 className="display mt-3 text-2xl md:text-3xl">{item.title}</h3>
              <p className="mt-4 max-w-md text-soft">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Journey */}
      <section className="container-page mt-24 md:mt-36">
        <SectionHead kicker={t.journey.kicker} title={t.journey.title}>
          <Link href={`/${locale}/about/`} className="link-underline inline-flex items-center gap-2 self-start py-2 text-sm font-semibold md:self-auto">
            {t.journey.more} <Arrow />
          </Link>
        </SectionHead>
        <ol>
          {t.about.roles.slice(0, 7).map((r, i) => (
            <li
              key={r.period + r.company}
              className="reveal grid gap-1 border-t border-rule py-5 md:grid-cols-[13rem_1fr_1fr] md:items-baseline md:gap-10"
              style={delay(i * 40)}
            >
              <span className="text-sm tabular-nums text-mute">{r.period}</span>
              <span className="font-display text-xl">{r.company}</span>
              <span className="text-soft">{r.title}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Quote */}
      <section className="mt-24 border-y border-rule bg-raised md:mt-36">
        <figure className="container-page reveal py-20 md:py-28">
          <blockquote className="display max-w-5xl text-3xl italic leading-[1.2] md:text-5xl">“{t.quote.text}”</blockquote>
          <figcaption className="kicker mt-8">{t.quote.source}</figcaption>
        </figure>
      </section>

      {/* Writing */}
      <section className="container-page mt-24 md:mt-36">
        <SectionHead kicker={t.writing.kicker} title={t.writing.title}>
          <Link href={`/${locale}/blog/`} className="link-underline inline-flex items-center gap-2 self-start py-2 text-sm font-semibold md:self-auto">
            {t.writing.all} <Arrow />
          </Link>
        </SectionHead>
        {posts.length ? (
          <ul className="border-b border-rule">
            {posts.map((p, i) => (
              <PostRow key={p.slug} post={p} locale={locale} index={i} />
            ))}
          </ul>
        ) : (
          <p className="text-soft">{t.writing.empty}</p>
        )}
      </section>

      {/* Press */}
      <section className="container-page mt-24 md:mt-36">
        <SectionHead kicker={t.press.kicker} title={t.press.title} />
        <ul className="grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
          {t.press.items.map((p, i) => (
            <li key={p.href} className="reveal bg-paper" style={delay((i % 3) * 70)}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col p-7 transition-colors duration-200 hover:bg-raised"
              >
                <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-mute">
                  <span>{p.outlet}</span>
                  <span className="tabular-nums">{p.date}</span>
                </p>
                <h3 className="display mt-5 text-xl transition-colors duration-200 group-hover:text-accent">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm text-soft">{p.note}</p>
                <span className="mt-6 text-accent">
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="container-page mt-24 md:mt-36">
        <div className="reveal grid gap-8 border-t border-ink pt-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="kicker">{t.contact.kicker}</p>
            <h2 className="display mt-3 text-4xl md:text-6xl">{t.contact.title}</h2>
            <p className="mt-5 max-w-xl text-lg text-soft">{t.contact.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              {t.contact.linkedin} <Arrow />
            </a>
            {site.email ? (
              <a href={`mailto:${site.email}`} className="btn btn-ghost">
                {t.contact.email}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
