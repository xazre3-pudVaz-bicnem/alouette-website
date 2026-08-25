import type { Metadata } from 'next';
import Link from 'next/link';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CastCard from '@/components/cast/CastCard';
import ContactCta from '@/components/common/ContactCta';
import Reveal from '@/components/ui/Reveal';
import ActionLink from '@/components/ui/ActionLink';
import SocialLinks from '@/components/ui/SocialLinks';
import { publishedCasts, hasRealCasts } from '@/data/casts';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'キャスト・女の子紹介｜相模原のコンカフェ alouette',
  description:
    '相模原のコンカフェ alouette（あるえっと）に在籍するキャストのご紹介です。プロフィールやメッセージ、次回の出勤予定をチェックして、お気に入りの女の子に会いにきてください。小田急相模原駅から徒歩4分。',
  path: '/cast/',
});

export const revalidate = 3600;

export default function CastIndexPage() {
  const casts = publishedCasts();
  const hasReal = hasRealCasts();

  return (
    <>
      <PageHeader
        eyebrow="Cast"
        title="alouetteの女の子たち"
        lead="明るくて話しやすい女の子たちが、楽しい時間を演出します。気になる子のプロフィールと出勤予定をチェックしてみてください。"
      />
      <Breadcrumbs items={[{ name: '女の子紹介', path: '/cast/' }]} />

      <section className="bg-ivory py-12 md:py-16">
        <div className="container-page">
          {!hasReal ? (
            <Reveal className="mb-12 rounded-lg border border-dashed border-rose/35 bg-shell px-6 py-8 text-center">
              <p className="font-display text-[1.15rem] text-bordeaux">
                キャスト情報は準備中です
              </p>
              <p className="mx-auto mt-3 max-w-lg text-[0.88rem] leading-[1.95] text-ink-soft">
                現在プロフィールの準備を進めています。公開までの間、最新の出勤情報や
                在籍キャストの様子はSNSでご覧いただけます。
              </p>
              <SocialLinks className="mt-6 justify-center" size="sm" />
            </Reveal>
          ) : null}

          <ul className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {casts.map((cast, i) => (
              <Reveal as="li" key={cast.slug} delay={(i % 4) * 60}>
                <CastCard cast={cast} priority={i < 4} />
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-16 hairline pt-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <p className="text-[0.9rem] leading-[1.95] text-ink-soft">
                今日どの子が出勤しているかは、
                <Link
                  href="/schedule/"
                  className="mx-1 text-rose underline underline-offset-4"
                >
                  出勤情報ページ
                </Link>
                でご確認いただけます。
              </p>
              <ActionLink href="/schedule/" variant="outline">
                出勤情報を見る
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCta
        heading="会いたい子がいたら、ご予約を。"
        lead="ご来店の日時が決まっていれば、お電話またはWEBフォームからご連絡ください。"
      />
    </>
  );
}
