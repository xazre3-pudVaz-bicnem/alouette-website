import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

/**
 * ニュース／イベント記事の読み込み。
 * 記事は src/content/news/ に Markdown（.md）で置きます。
 * ファイル名がそのまま URL になります（例: summer-event.md → /news/summer-event/）
 */

export const newsCategories = [
  'イベント',
  'お知らせ',
  'キャスト',
  '求人情報',
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export type NewsLink = { label: string; url: string };

export type NewsPost = {
  slug: string;
  title: string;
  /** 公開日（YYYY-MM-DD） */
  date: string;
  /** 更新日（任意） */
  updated?: string;
  category: NewsCategory;
  /** アイキャッチ画像 */
  thumbnail: string;
  /** 一覧に出る要約 */
  excerpt: string;
  /** SEO 用タイトル（未設定なら title を使用） */
  seoTitle?: string;
  /** meta description（未設定なら excerpt を使用） */
  metaDescription?: string;
  /** 関連リンク */
  links: NewsLink[];
  /** 本文（HTML） */
  contentHtml: string;
  /** サンプル記事フラグ（公開前に削除してください） */
  isSample?: boolean;
};

const NEWS_DIR = path.join(process.cwd(), 'src', 'content', 'news');
const DEFAULT_THUMBNAIL = '/images/visual/night-window.jpg';

type RawFrontmatter = {
  title?: string;
  date?: string | Date;
  updated?: string | Date;
  category?: string;
  thumbnail?: string;
  excerpt?: string;
  seoTitle?: string;
  metaDescription?: string;
  links?: NewsLink[];
  published?: boolean;
  isSample?: boolean;
};

const toDateString = (value: string | Date | undefined): string => {
  if (!value) return '';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
};

const markdownToHtml = async (markdown: string): Promise<string> => {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return String(file);
};

const isCategory = (value: string | undefined): value is NewsCategory =>
  !!value && (newsCategories as readonly string[]).includes(value);

/** 公開中の記事を新しい順に取得 */
export const getAllNews = async (): Promise<NewsPost[]> => {
  if (!fs.existsSync(NEWS_DIR)) return [];

  const files = fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith('.md'));

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(path.join(NEWS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const fm = data as RawFrontmatter;

      if (fm.published === false) return null;

      const contentHtml = await markdownToHtml(content);

      const post: NewsPost = {
        slug: file.replace(/\.md$/, ''),
        title: fm.title ?? '（タイトル未設定）',
        date: toDateString(fm.date),
        updated: fm.updated ? toDateString(fm.updated) : undefined,
        category: isCategory(fm.category) ? fm.category : 'お知らせ',
        thumbnail: fm.thumbnail || DEFAULT_THUMBNAIL,
        excerpt: fm.excerpt ?? '',
        seoTitle: fm.seoTitle,
        metaDescription: fm.metaDescription,
        links: Array.isArray(fm.links) ? fm.links : [],
        contentHtml,
        isSample: fm.isSample === true,
      };
      return post;
    }),
  );

  return posts
    .filter((p): p is NewsPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getNewsBySlug = async (
  slug: string,
): Promise<NewsPost | undefined> => {
  const all = await getAllNews();
  return all.find((p) => p.slug === slug);
};

export const getNewsSlugs = async (): Promise<string[]> => {
  const all = await getAllNews();
  return all.map((p) => p.slug);
};
