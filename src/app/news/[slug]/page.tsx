import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactCta from '@/components/common/ContactCta';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';
import { getAllNews, getNewsBySlug, isEventEnded } from '@/lib/news';
import { formatDateDot, formatDateJa, formatDateLong } from '@/lib/date';
import { articleJsonLd, eventJsonLd } from '@/lib/jsonld';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllNews();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) {
    return buildMetadata({
      title: '記事が見つかりません',
      description: '',
      path: '/news/',
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${post.seoTitle ?? post.title}｜相模原のコンカフェ alouette`,
    description:
      post.metaDescription ??
      post.excerpt ??
      `相模原のコンカフェ alouette（あるえっと）からのお知らせです。`,
    path: `/news/${post.slug}/`,
    image: post.thumbnail.endsWith('.svg') ? undefined : post.thumbnail,
    imageSize: post.thumbnailSize,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    // サンプル記事は検索結果に出さない
    noindex: post.isSample === true,
  });
}

export default async function NewsDetailPage({ params }: Params) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();

  const all = await getAllNews();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  const url = absoluteUrl(`/news/${post.slug}/`);
  const image = absoluteUrl(post.thumbnail);
  const ended = isEventEnded(post);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: post.title,
          description: post.metaDescription ?? post.excerpt,
          datePublished: post.date,
          dateModified: post.updated,
          url,
          image,
        })}
      />
      {/* 開催日が指定されたイベント記事だけ Event を出す（startDate は公開日ではなく開催日） */}
      {post.category === 'イベント' && post.eventDate && !post.isSample ? (
        <JsonLd
          data={eventJsonLd({
            name: post.eventName ?? post.title,
            description: post.metaDescription ?? post.excerpt,
            startDate: post.eventDate,
            url,
            image,
            price: post.eventPrice,
          })}
        />
      ) : null}

      <Breadcrumbs
        items={[
          { name: 'イベント・新着情報', path: '/news/' },
          { name: post.title, path: `/news/${post.slug}/` },
        ]}
      />

      <article className="bg-ivory pb-16">
        <header className="container-page max-w-3xl">
          <div className="flex flex-wrap items-center gap-4">
            <time
              dateTime={post.date}
              className="font-latin text-[0.82rem] tracking-[0.14em] text-rose"
            >
              {formatDateDot(post.date)}
            </time>
            <span className="rounded-full border border-rose/30 px-3 py-0.5 text-[0.7rem] text-rose">
              {post.category}
            </span>
          </div>

          <h1 className="mt-5 font-display text-[1.65rem] leading-[1.55] text-balance text-bordeaux sm:text-[2.1rem]">
            {post.title}
          </h1>

          {post.updated && post.updated !== post.date ? (
            <p className="mt-3 text-[0.75rem] text-ink-soft/70">
              最終更新：{formatDateLong(post.updated)}
            </p>
          ) : null}

          {post.eventDate ? (
            <dl className="mt-7 grid gap-px overflow-hidden rounded-lg bg-rose/15 sm:grid-cols-2">
              <div className="bg-shell px-5 py-4">
                <dt className="font-latin text-[0.7rem] tracking-[0.22em] text-rose">
                  DATE
                </dt>
                <dd className="mt-1 font-display text-[1.15rem] text-bordeaux">
                  {formatDateJa(post.eventDate)}
                  {ended ? (
                    <span className="ml-3 rounded-full bg-ink-soft/80 px-2.5 py-0.5 align-middle font-sans text-[0.68rem] tracking-[0.08em] text-ivory">
                      終了しました
                    </span>
                  ) : null}
                </dd>
              </div>
              {post.eventPrice !== undefined ? (
                <div className="bg-shell px-5 py-4">
                  <dt className="font-latin text-[0.7rem] tracking-[0.22em] text-rose">
                    PRICE
                  </dt>
                  <dd className="mt-1 font-display text-[1.15rem] text-bordeaux">
                    {post.eventPrice.toLocaleString('ja-JP')}円
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          {post.isSample ? (
            <p className="mt-6 rounded-lg border border-dashed border-rose/40 bg-shell px-5 py-4 text-[0.85rem] text-bordeaux">
              これはサンプル記事です。公開前に
              <code className="mx-1 rounded bg-ivory px-1.5 py-0.5 text-[0.8rem]">
                src/content/news/{post.slug}.md
              </code>
              を削除してください。
            </p>
          ) : null}
        </header>

        <div className="container-page mt-8 max-w-3xl">
          {post.isPoster && post.thumbnailSize ? (
            // 縦長のポスターは文字が切れないよう、切り取らずに全体を表示する
            <Image
              src={post.thumbnail}
              alt={`${post.title}の告知ポスター`}
              width={post.thumbnailSize.width}
              height={post.thumbnailSize.height}
              preload
              fetchPriority="high"
              sizes="(min-width: 640px) 480px, 100vw"
              className="mx-auto h-auto w-full max-w-[480px] rounded-lg shadow-soft"
            />
          ) : (
            <div className="relative aspect-video overflow-hidden rounded-lg bg-shell">
              <Image
                src={post.thumbnail}
                alt=""
                fill
                preload
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div
          className="prose-alouette container-page mt-10 max-w-3xl text-[0.94rem] leading-[2.05] text-ink-soft"
          // 記事本文は自分たちが管理する Markdown から生成しています
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {post.links.length > 0 ? (
          <aside className="container-page mt-12 max-w-3xl">
            <h2 className="eyebrow text-rose">Related Links</h2>
            <ul className="mt-4 space-y-2.5">
              {post.links.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="inline-block py-1 text-[0.9rem] text-bordeaux underline underline-offset-[6px] hover:text-rose"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <div className="container-page mt-14 max-w-3xl">
          <Link
            href="/news/"
            className="inline-block py-1.5 text-[0.85rem] text-rose underline underline-offset-[6px]"
          >
            ← イベント・新着情報の一覧へ
          </Link>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-rose/12 bg-shell py-14">
          <div className="container-page">
            <h2 className="eyebrow text-rose">Other News</h2>
            <ul className="mt-7 grid gap-x-8 gap-y-9 sm:grid-cols-3">
              {related.map((p) => (
                <Reveal as="li" key={p.slug}>
                  <Link href={`/news/${p.slug}/`} className="group block">
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-ivory">
                      <Image
                        src={p.thumbnail}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 30vw, 90vw"
                        style={{ objectPosition: p.isPoster ? 'center top' : 'center' }}
                        className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                      />
                    </div>
                    <time
                      dateTime={p.date}
                      className="mt-3 block font-latin text-[0.75rem] tracking-[0.14em] text-rose"
                    >
                      {formatDateDot(p.date)}
                    </time>
                    <p className="mt-1.5 font-display text-[0.98rem] leading-snug text-bordeaux">
                      {p.title}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ContactCta />
    </>
  );
}
