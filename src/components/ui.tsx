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
    <li className="reveal border-t border-rule" style={{ "--delay": `${Math.min(index, 6) * 60}ms` } as React.CSSProperties}>
      <Link
        href={`/${locale}/blog/${post.slug}/`}
        className="group grid grid-cols-[6.5rem_1fr] items-start gap-4 py-6 sm:grid-cols-[13rem_1fr] sm:gap-7 md:grid-cols-[17rem_1fr] md:gap-10 md:py-8"
      >
        <div className="aspect-[4/3] overflow-hidden bg-raised">
          {post.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-display text-3xl text-mute md:text-5xl" aria-hidden="true">
              {post.title.trim().charAt(0)}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-2 text-xs text-mute">
            <span className="font-semibold uppercase tracking-[0.14em] text-accent">{t.categories[post.category] ?? post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </p>
          <h3
            className="display mt-2 text-lg leading-snug transition-colors duration-200 group-hover:text-accent sm:text-2xl md:text-[1.75rem]"
            lang={post.lang}
          >
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-soft sm:line-clamp-3 sm:text-base" lang={post.lang}>
            {post.excerpt}
          </p>
          <p className="mt-3 hidden items-center gap-2 text-xs text-mute sm:flex">
            {post.minutes} {t.writing.minutes}
            {post.lang !== locale && <span>· {t.writing.inVietnamese}</span>}
            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent">
              <Arrow />
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
}
