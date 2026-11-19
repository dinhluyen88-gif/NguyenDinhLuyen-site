import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";
import { getDictionary, type Locale } from "@/content/site";

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export function SectionHead({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="reveal mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 className="display mt-3 max-w-3xl text-3xl md:text-5xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function PostRow({ post, locale, index = 0 }: { post: Post; locale: Locale; index?: number }) {
  const t = getDictionary(locale);
  return (
    <li className="reveal border-t border-rule" style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}>
      <Link href={`/${locale}/blog/${post.slug}/`} className="group grid gap-3 py-8 md:grid-cols-[11rem_1fr_auto] md:gap-10">
        <div className="text-sm text-mute">
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {t.categories[post.category] ?? post.category}
          </p>
        </div>
        <div>
          <h3 className="display text-2xl transition-colors duration-200 group-hover:text-accent md:text-3xl" lang={post.lang}>
            {post.title}
          </h3>
          <p className="mt-3 max-w-2xl text-soft" lang={post.lang}>
            {post.excerpt}
          </p>
          <p className="mt-3 text-xs text-mute">
            {post.minutes} {t.writing.minutes}
            {post.lang !== locale && <span> · {t.writing.inVietnamese}</span>}
          </p>
        </div>
        <span className="hidden self-center text-mute transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent md:block">
          <Arrow />
        </span>
      </Link>
    </li>
  );
}
