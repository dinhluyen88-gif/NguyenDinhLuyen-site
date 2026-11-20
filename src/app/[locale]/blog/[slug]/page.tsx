import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, site } from "@/content/site";
import { formatDate, getAllPosts, getPost, getPostsForLocale } from "@/lib/posts";
import { PostRow } from "@/components/ui";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post || !isLocale(locale)) return {};
  return {
    title: post.title,
    description: post.excerpt,
    // Bài chỉ có một ngôn ngữ thì canonical trỏ về đúng ngôn ngữ đó.
    alternates: { canonical: `/${post.lang}/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      ...(post.coverPath ? { images: [{ url: post.coverPath }] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPost(slug);
  if (!post) notFound();
  const t = getDictionary(locale);
  // "Đọc tiếp": ưu tiên bài cùng chủ đề, rồi đến các bài gần ngày nhất.
  const others = getPostsForLocale(locale).filter((p) => p.key !== post.key);
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: post.lang,
    author: { "@type": "Person", name: site.name, url: site.linkedin },
    ...(post.coverPath ? { image: new URL(post.coverPath.replace(/^\//, ""), site.url.replace(/\/?$/, "/")).toString() } : {}),
  };

  return (
    <article className="container-page pt-12 md:pt-20" lang={post.lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-[44rem]">
        <Link href={`/${locale}/blog/`} lang={locale} className="link-underline inline-flex items-center gap-2 py-2 text-sm font-semibold text-soft hover:text-ink">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M14 8H3M7 4L3 8l4 4" />
          </svg>
          {t.writing.back}
        </Link>

        <header className="mt-10 border-b border-rule pb-10">
          <p className="kicker rise">{t.categories[post.category] ?? post.category}</p>
          <h1 className="display rise mt-5 text-4xl md:text-6xl" style={{ "--delay": "80ms" } as React.CSSProperties}>
            {post.title}
          </h1>
          <p className="rise mt-7 flex flex-wrap gap-x-3 text-sm text-mute" style={{ "--delay": "160ms" } as React.CSSProperties} lang={locale}>
            <span>{site.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            <span aria-hidden="true">·</span>
            <span>
              {post.minutes} {t.writing.minutes}
            </span>
          </p>
          {post.translated ? (
            <p className="mt-3 text-sm italic text-mute" lang={locale}>
              {t.writing.translated}
            </p>
          ) : null}
        </header>

        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover} alt="" className="rise mt-10 aspect-[16/9] w-full object-cover" style={{ "--delay": "220ms" } as React.CSSProperties} />
        ) : null}

        <div className="prose-article mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

        <footer className="mt-16 border-t border-ink pt-8" lang={locale}>
          <p className="font-display text-2xl">{site.name}</p>
          <p className="mt-1 text-sm text-soft">{t.hero.now.map((n) => `${n.role}, ${n.org}`).join(" · ")}</p>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline mt-4 inline-block py-2 text-sm font-semibold text-accent">
            {t.contact.linkedin}
          </a>
        </footer>
      </div>

      {related.length ? (
        <section className="mx-auto mt-20 max-w-[60rem]" lang={locale}>
          <p className="kicker">{t.writing.related}</p>
          <ul className="mt-4 border-b border-rule">
            {related.map((p, i) => (
              <PostRow key={p.slug} post={p} locale={locale} index={i} />
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
