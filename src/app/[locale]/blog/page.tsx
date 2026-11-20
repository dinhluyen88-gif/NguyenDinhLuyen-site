import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content/site";
import { getPostsForLocale } from "@/lib/posts";
import { PostRow } from "@/components/ui";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.blog.kicker,
    description: t.blog.lede,
    alternates: { canonical: `/${locale}/blog/`, languages: { vi: "/vi/blog/", en: "/en/blog/" } },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const posts = getPostsForLocale(locale);
  const used = [...new Set(posts.map((p) => p.category))];
  // Nhóm theo năm, mới nhất ở trên.
  const byYear: Record<string, typeof posts> = {};
  for (const p of posts) (byYear[p.date.slice(0, 4)] ??= []).push(p);
  const years = Object.keys(byYear).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div className="container-page pt-14 md:pt-24">
      <header className="max-w-4xl">
        <p className="kicker rise">{t.blog.kicker}</p>
        <h1 className="display rise mt-5 text-4xl md:text-7xl" style={{ "--delay": "80ms" } as React.CSSProperties}>
          {t.blog.title}
        </h1>
        <p className="rise mt-6 max-w-2xl text-lg text-soft md:text-xl" style={{ "--delay": "180ms" } as React.CSSProperties}>
          {t.blog.lede}
        </p>
      </header>

      {used.length > 0 && (
        <p className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mute">
          <span className="kicker">{t.writing.topics}</span>
          {used.map((c) => (
            <span key={c}>
              {t.categories[c] ?? c} ({posts.filter((p) => p.category === c).length})
            </span>
          ))}
        </p>
      )}

      {posts.length ? (
        <div className="mt-6">
          {years.map((year) => (
            <section key={year} className="mt-10 first:mt-4" aria-labelledby={`y-${year}`}>
              <h2 id={`y-${year}`} className="flex items-baseline gap-3 border-b border-ink pb-3">
                <span className="font-display text-3xl md:text-4xl">{year}</span>
                <span className="text-sm text-mute">
                  {byYear[year].length} {t.writing.postsCount}
                </span>
              </h2>
              <ul className="border-b border-rule [&>li:first-child]:border-t-0">
                {byYear[year].map((p, i) => (
                  <PostRow key={p.slug} post={p} locale={locale} index={i} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-soft">{t.writing.empty}</p>
      )}
    </div>
  );
}
