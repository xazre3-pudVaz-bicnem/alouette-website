import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { detailPageCasts } from '@/data/casts';
import { getAllNews } from '@/lib/news';

const url = (path: string) => new URL(path, siteConfig.url).toString();

/** 主要ページ（優先度・更新頻度は実運用に合わせて設定） */
const staticPages: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}[] = [
  { path: '/', priority: 1, changeFrequency: 'daily' },
  { path: '/concept/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/cast/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/schedule/', priority: 0.9, changeFrequency: 'daily' },
  { path: '/menu/', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/first-guide/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/gallery/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/news/', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/shop/', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/faq/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/recruit/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contact/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/privacy-policy/', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const news = await getAllNews();

  return [
    ...staticPages.map((page) => ({
      url: url(page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...detailPageCasts().map((cast) => ({
      url: url(`/cast/${cast.slug}/`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    // サンプル記事はサイトマップに含めない
    ...news
      .filter((post) => !post.isSample)
      .map((post) => ({
        url: url(`/news/${post.slug}/`),
        lastModified: new Date(`${post.updated ?? post.date}T00:00:00+09:00`),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })),
  ];
}
