import Link from "next/link";
import { getDictionary, site, type Locale } from "@/content/site";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const links = [
    { href: `/${locale}/about/`, label: t.nav.about },
    { href: `/${locale}/blog/`, label: t.nav.blog },
    { href: `/${locale}/contact/`, label: t.nav.contact },
  ];

  return (
    <footer className="mt-24 border-t border-rule">
      <div className="container-page flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl">{locale === "vi" ? site.name : "Nguyen Dinh Luyen"}</p>
          <p className="mt-1 text-sm text-mute">{t.footer.tagline}</p>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-underline inline-block py-2 text-soft hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline inline-block py-2 text-soft hover:text-ink">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <div className="container-page border-t border-rule py-5 text-xs text-mute">
        © {new Date().getFullYear()} {site.name}. {t.footer.rights}
      </div>
    </footer>
  );
}
