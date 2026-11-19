import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import readingTime from "reading-time";
import type { Locale } from "@/content/site";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  // Hai bản dịch của cùng một bài dùng chung `key`.
  key: string;
  lang: Locale;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  translated: boolean;
  minutes: number;
  html: string;
};

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  return {
    slug,
    key: data.key ?? slug,
    lang: data.lang === "en" ? "en" : "vi",
    title: String(data.title ?? slug),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    category: String(data.category ?? ""),
    excerpt: String(data.excerpt ?? ""),
    translated: Boolean(data.translated),
    minutes: Math.max(1, Math.round(readingTime(content).minutes)),
    html: marked.parse(content, { async: false }) as string,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Mỗi bài chỉ hiện một lần: ưu tiên bản đúng ngôn ngữ, nếu chưa có thì dùng bản còn lại.
export function getPostsForLocale(locale: Locale): Post[] {
  const byKey = new Map<string, Post>();
  for (const post of getAllPosts()) {
    const current = byKey.get(post.key);
    if (!current || (current.lang !== locale && post.lang === locale)) byKey.set(post.key, post);
  }
  return [...byKey.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(date: string, locale: Locale): string {
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
