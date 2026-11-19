"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/site";

type Nav = { home: string; about: string; blog: string; contact: string; menu: string; close: string; switchTo: string };

export function Header({ locale, nav }: { locale: Locale; nav: Nav }) {
  const pathname = usePathname() ?? `/${locale}/`;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const other: Locale = locale === "vi" ? "en" : "vi";
  // Bài blog có thể chỉ tồn tại ở một ngôn ngữ, nên khi đổi ngôn ngữ thì quay về danh sách blog.
  const isPost = /^\/(vi|en)\/blog\/[^/]+\/?$/.test(pathname);
  const switchHref = isPost ? `/${other}/blog/` : pathname.replace(/^\/(vi|en)(?=\/|$)/, `/${other}`);

  const links = [
    { href: `/${locale}/`, label: nav.home },
    { href: `/${locale}/about/`, label: nav.about },
    { href: `/${locale}/blog/`, label: nav.blog },
    { href: `/${locale}/contact/`, label: nav.contact },
  ];
  const isActive = (href: string) => (href === `/${locale}/` ? pathname === href : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href={`/${locale}/`} className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-xl font-semibold tracking-tight">Nguyễn Đình Luyện</span>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:inline">Louis</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`link-underline py-2 text-sm font-medium ${isActive(l.href) ? "text-accent" : "text-soft hover:text-ink"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            className="border border-rule px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-soft transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            {nav.switchTo}
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? nav.close : nav.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-rule bg-paper md:hidden">
          <ul className="container-page flex flex-col py-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center font-display text-2xl ${isActive(l.href) ? "text-accent" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 border-t border-rule pt-3">
              <Link
                href={switchHref}
                hrefLang={other}
                lang={other}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center text-sm font-semibold uppercase tracking-[0.12em] text-soft"
              >
                {nav.switchTo}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
