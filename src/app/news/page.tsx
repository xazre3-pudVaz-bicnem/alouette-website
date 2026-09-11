import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactCta from '@/components/common/ContactCta';
import Reveal from '@/components/ui/Reveal';
import SocialLinks from '@/components/ui/SocialLinks';
import { getAllNews, isEventEnded } from '@/lib/news';
import { formatDateDot } from '@/lib/date';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'イベント・新着情報｜相模原のコンカフェ alouette',
  description:
    '相模原のコンカフェ alouette（あるえっと）のイベント情報・お知らせ・新人キャストのご紹介です。営業時間の変更や臨時休業のご案内もこちらでお伝えします。小田急相模原駅から徒歩4分。',
  path: '/news/',
});

export const revalidate = 3600;

export default async function NewsIndexPage() {
  const posts = await getAllNews();

  return (
    <>
      <PageHeader
        eyebrow="News &amp; Event"
        title="イベント・新着情報"
        lead="イベントのお知らせ、新人キャストのご紹介、営業時間の変更など、alouetteからのお知らせをお届けします。"
      />
      <Breadcrumbs items={[{ name: 'イベント・新着情報', path: '/news/' }]} />

      <section className="bg-ivory py-12 md:py-16">
        <div className="container-page">
          {posts.length > 0 ? (
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal as="li" key={post.slug} delay={(i % 3) * 60}>
                  <Link href={`/news/${post.slug}/`} className="group block">
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-shell">
                      <Image
                        src={post.thumbnail}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                        preload={i === 0}
                        // 縦長ポスターはタイトルのある上部を見せる
                        style={{ objectPosition: post.isPoster ? 'center top' : 'center' }}
                        className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-ivory/92 px-3 py-1 text-[0.68rem] tracking-[0.1em] text-rose">
                        {post.category}
                      </span>
                      {isEventEnded(post) ? (
                        <span className="absolute top-3 right-3 rounded-full bg-ink-soft/85 px-3 py-1 text-[0.68rem] tracking-[0.1em] text-ivory">
                          終了
                        </span>
                      ) : null}
                    </div>
                    <time
                      dateTime={post.date}
                      className="mt-4 block font-latin text-[0.78rem] tracking-[0.14em] text-rose"
                    >
                      {formatDateDot(post.date)}
                    </time>
                    <h2 className="mt-2 font-display text-[1.08rem] leading-snug text-balance text-bordeaux">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="mt-2.5 line-clamp-3 text-[0.85rem] leading-[1.9] text-ink-soft">
                        {post.excerpt}
                      </p>
                    ) : null}
                  </Link>
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-rose/30 bg-shell px-6 py-14 text-center">
              <p className="font-display text-[1.1rem] text-bordeaux">
                新着情報は準備中です
              </p>
              <p className="mx-auto mt-3 max-w-md text-[0.88rem] leading-[1.95] text-ink-soft">
                最新のお知らせはSNSでも発信しています。ぜひフォローしてください。
              </p>
              <SocialLinks className="mt-6 justify-center" size="sm" />
            </div>
          )}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
