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
  // Ảnh bìa: tên file trong public/images/blog/ (hoặc đường dẫn bắt đầu bằng "/"). Có thể để trống.
  cover?: string;
  // Đường dẫn ảnh bìa không kèm basePath (dùng cho thẻ chia sẻ mạng xã hội).
  coverPath?: string;
  html: string;
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Đường dẫn ảnh: "abc.jpg" → /images/blog/abc.jpg ; "/x/y.jpg" giữ nguyên; luôn thêm basePath.
export function imagePath(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  return src.startsWith("/") ? src : `/images/blog/${src}`;
}

export function imageUrl(src: string): string {
  const path = imagePath(src);
  return path.startsWith("/") ? `${BASE}${path}` : path;
}

// Ảnh trong bài viết bằng Markdown: ![chú thích](ten-anh.jpg) → hiện ảnh kèm chú thích bên dưới.
function renderMarkdown(content: string): string {
  const html = marked.parse(content, { async: false }) as string;
  return html
    .replace(/<p>\s*<img src="([^"]+)" alt="([^"]*)"\s*\/?>\s*<\/p>/g, (_m, src: string, alt: string) =>
      `<figure><img src="${imageUrl(src)}" alt="${alt}" loading="lazy" />${alt ? `<figcaption>${alt}</figcaption>` : ""}</figure>`,
    )
    .replace(/<img src="([^"]+)"/g, (m, src: string) => (src.startsWith(BASE + "/") && BASE ? m : `<img src="${imageUrl(src)}"`));
}

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
    cover: data.cover ? imageUrl(String(data.cover)) : undefined,
    coverPath: data.cover ? imagePath(String(data.cover)) : undefined,
    html: renderMarkdown(content),
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
