import { siteConfig, activeSocialLinks } from '@/config/site';
import { store } from '@/data/store';
import { priceRange } from '@/data/menu';
import { recruit } from '@/data/recruit';
import { absoluteUrl } from '@/lib/seo';

/**
 * 構造化データ（JSON-LD）の生成。
 *
 * ⚠️ ページ上に表示していない内容や、確認できていない情報（座席数・支払い方法・
 *    評価・口コミ件数など）は絶対に出力しないこと。
 */

type Json = Record<string, unknown>;

export const LOCAL_BUSINESS_ID = `${siteConfig.url}/#localbusiness`;

/** LocalBusiness（BarOrPub） */
export const localBusinessJsonLd = (): Json => {
  const sameAs = activeSocialLinks.map((s) => s.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    '@id': LOCAL_BUSINESS_ID,
    name: store.name,
    alternateName: store.nameJa,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: store.tel,
    image: [absoluteUrl(siteConfig.ogImage)],
    logo: absoluteUrl(siteConfig.logo),
    priceRange,
    currenciesAccepted: 'JPY',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: store.address.prefecture,
      addressLocality: store.address.city,
      streetAddress: store.address.street,
      ...(store.address.postalCode
        ? { postalCode: store.address.postalCode }
        : {}),
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: store.openDays.map((d) => `https://schema.org/${d}`),
        opens: store.openTime,
        closes: store.closeTime,
      },
    ],
    hasMap: store.access.googleMapsUrl,
    hasMenu: absoluteUrl('/menu/'),
    publicAccess: true,
    // 座席数・支払い方法・喫煙可否・評価は未確認のため出力しない
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
};

/** WebSite */
export const websiteJsonLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: `${siteConfig.name}（${siteConfig.nameJa}）`,
  inLanguage: 'ja',
  publisher: { '@id': LOCAL_BUSINESS_ID },
});

/** パンくず */
export const breadcrumbJsonLd = (
  items: { name: string; path: string }[],
): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

/** FAQPage */
export const faqJsonLd = (items: { q: string; a: string }[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

/** JobPosting（Googleしごと検索向け） */
export const jobPostingJsonLd = (datePosted: string): Json => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: recruit.jobTitle,
  description: [
    `<p>${store.name}（${store.nameJa}）は、神奈川県相模原市南区南台のコンセプトカフェ＆バーです。小田急線 小田急相模原駅の北口から徒歩4分。</p>`,
    '<p><strong>仕事内容</strong></p><ul>',
    ...recruit.duties.map((d) => `<li>${d.title}：${d.body}</li>`),
    '</ul><p><strong>待遇・働き方</strong></p><ul>',
    ...recruit.merits.map((m) => `<li>${m.title}：${m.body}</li>`),
    '</ul><p><strong>応募資格</strong></p><ul>',
    ...recruit.requirements.map((r) => `<li>${r}</li>`),
    '</ul>',
  ].join(''),
  identifier: {
    '@type': 'PropertyValue',
    name: store.name,
    value: 'alouette-cast',
  },
  datePosted,
  employmentType: recruit.employmentType,
  hiringOrganization: {
    '@type': 'Organization',
    name: store.name,
    sameAs: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: store.address.prefecture,
      addressLocality: store.address.city,
      streetAddress: store.address.street,
      ...(store.address.postalCode
        ? { postalCode: store.address.postalCode }
        : {}),
    },
  },
  baseSalary: {
    '@type': 'MonetaryAmount',
    currency: 'JPY',
    value: {
      '@type': 'QuantitativeValue',
      minValue: recruit.wage.hourlyFrom,
      unitText: 'HOUR',
    },
  },
  directApply: true,
  url: absoluteUrl('/recruit/'),
});

/**
 * Event（ニュースのカテゴリが「イベント」で、開催日 eventDate がある記事）。
 * startDate は記事の公開日ではなく開催日。時刻はポスターに無い限り付けない。
 */
export const eventJsonLd = (args: {
  name: string;
  description: string;
  /** 開催日（YYYY-MM-DD） */
  startDate: string;
  url: string;
  image: string;
  /** 料金（円）。本文に表示している金額と同じもの */
  price?: number;
}): Json => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: args.name,
  description: args.description,
  startDate: args.startDate,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  url: args.url,
  image: [args.image],
  location: {
    '@type': 'Place',
    name: store.name,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: store.address.prefecture,
      addressLocality: store.address.city,
      streetAddress: store.address.street,
    },
  },
  organizer: { '@type': 'Organization', name: store.name, url: siteConfig.url },
  ...(args.price !== undefined
    ? {
        offers: {
          '@type': 'Offer',
          price: args.price,
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          url: args.url,
        },
      }
    : {}),
});

/** Article（ニュース記事） */
export const articleJsonLd = (args: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image: string;
}): Json => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: args.headline,
  description: args.description,
  datePublished: args.datePublished,
  dateModified: args.dateModified ?? args.datePublished,
  mainEntityOfPage: { '@type': 'WebPage', '@id': args.url },
  image: [args.image],
  author: { '@type': 'Organization', name: store.name, url: siteConfig.url },
  publisher: {
    '@type': 'Organization',
    name: store.name,
    logo: { '@type': 'ImageObject', url: absoluteUrl(siteConfig.logo) },
  },
  inLanguage: 'ja',
});
