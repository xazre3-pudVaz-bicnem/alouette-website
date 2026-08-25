import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** サイトルートからのパス（末尾スラッシュあり）例: '/menu/' */
  path: string;
  /** OGP 画像（未指定ならサイト共通画像） */
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
};

export const absoluteUrl = (path: string): string =>
  new URL(path, siteConfig.url).toString();

export const buildMetadata = ({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  noindex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: BuildMetadataArgs): Metadata => {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: `${siteConfig.name}（${siteConfig.nameJa}）`,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
};
