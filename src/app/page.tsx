import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import Hero from '@/components/home/Hero';
import TodayBar from '@/components/home/TodayBar';
import CastCard from '@/components/cast/CastCard';
import ContactCta from '@/components/common/ContactCta';
import MapEmbed from '@/components/common/MapEmbed';
import PriceBoard from '@/components/common/PriceBoard';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ActionLink from '@/components/ui/ActionLink';
import SocialLinks from '@/components/ui/SocialLinks';

import { siteConfig, activeSocialLinks } from '@/config/site';
import { charms, conceptLead, features } from '@/data/concept';
import { store } from '@/data/store';
import { publishedCasts } from '@/data/casts';
import { drinkHighlights, options } from '@/data/menu';
import { realPhotos } from '@/data/gallery';
import { recruit } from '@/data/recruit';
import { accessSteps } from '@/data/access';
import { getAllNews } from '@/lib/news';
import { focusOf } from '@/data/visuals';
import { formatDateDot } from '@/lib/date';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '相模原のコンカフェ alouette｜小田急相模原駅から徒歩4分',
  description:
    '相模原・小田急相模原駅から徒歩4分のコンカフェ「alouette（あるえっと）」。60分セット料金は男性3,000円・女性2,500円（税込）。かわいい女の子たちと過ごす、日常を忘れるとっておきの夜を。18:00〜23:00／日曜定休。',
  path: '/',
});

/** 出勤情報とニュースを反映するため1時間ごとに再生成 */
export const revalidate = 3600;

const yen = (n: number) => `${n.toLocaleString('ja-JP')}円`;

const CONCEPT_VISUAL = '/images/visual/counter-neon.jpg';

export default async function HomePage() {
  const casts = publishedCasts().slice(0, 4);
  const news = (await getAllNews()).slice(0, 3);
  const photos = realPhotos().slice(0, 4);

  return (
    <>
      <Hero />
      <TodayBar />

      {/* ── コンセプト ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-ivory py-20 md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <SectionHeading eyebrow={conceptLead.label}>
              {conceptLead.title}
            </SectionHeading>
            <div className="mt-7 space-y-5 text-[0.94rem] leading-[2.1] text-ink-soft">
              {conceptLead.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ActionLink href="/concept/" variant="outline" className="mt-9">
              お店について詳しく
            </ActionLink>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={120}>
            <figure>
              {/* イラストは 16:9。枠も同じ比率にして切り取られないようにする */}
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={CONCEPT_VISUAL}
                  alt="ネオンの灯るカウンターで過ごす夜のイメージイラスト"
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  style={{ objectPosition: focusOf(CONCEPT_VISUAL) }}
                  className="object-cover"
                />
              </div>

              {/* 実際の店内写真を右下に重ねる */}
              <div className="relative -mt-12 ml-auto w-36 sm:-mt-16 sm:w-52 lg:w-60">
                <div className="relative aspect-square overflow-hidden rounded-lg border-[6px] border-ivory shadow-lift">
                  <Image
                    src="/images/store/store-counter.jpg"
                    alt="alouette 店内のカウンター席"
                    fill
                    sizes="(min-width: 640px) 240px, 144px"
                    className="object-cover"
                  />
                </div>
              </div>

              <figcaption className="mt-3 text-right text-[0.7rem] leading-relaxed text-ink-soft/70">
                上：イメージイラスト／下：実際の店内
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── キャスト紹介 ───────────────────────────── */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Cast">alouetteの女の子たち</SectionHeading>
            <p className="mt-6 text-[0.94rem] leading-[2.1] text-ink-soft">
              明るく話しやすい女の子たちが待っています。プロフィールはキャストページからご覧いただけます。
            </p>
          </Reveal>

          <Reveal className="mt-12" delay={80}>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
              {casts.map((cast) => (
                <li key={cast.slug}>
                  <CastCard cast={cast} />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12 text-center" delay={120}>
            <ActionLink href="/cast/" variant="outline">
              キャスト一覧を見る
            </ActionLink>
          </Reveal>
        </div>
      </section>

      {/* ── 初めての方へ ───────────────────────────── */}
      <section className="relative overflow-hidden bg-bordeaux py-20 text-ivory md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-petal/25 blur-3xl"
        />
        <div className="container-page relative grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="First Guide" tone="light">
              コンカフェ、はじめてでも大丈夫。
            </SectionHeading>
            <p className="mt-7 text-[0.94rem] leading-[2.1] text-ivory/85">
              難しいルールはありません。60分のセット料金でスタートして、好きなドリンクを飲みながらお話しするだけ。おひとりでのご来店も、女性のお客様も歓迎しています。
            </p>
            <ActionLink href="/first-guide/" variant="light" className="mt-9">
              初めての方へ
            </ActionLink>
          </Reveal>

          <Reveal delay={100}>
            <ol className="space-y-px overflow-hidden rounded-lg bg-ivory/15">
              {[
                {
                  t: 'ご来店',
                  d: 'ご予約なしでもOK。スタッフがお席へご案内します。',
                },
                {
                  t: '60分セットでスタート',
                  d: '男性3,000円／女性2,500円（税込）。自動延長制です。',
                },
                {
                  t: 'ドリンクを楽しむ',
                  d: 'セット料金内でお好きなドリンクを（生ビールのみ+200円）。',
                },
                {
                  t: 'お会計',
                  d: 'テーブル会計。分からないことはスタッフへお声がけください。',
                },
              ].map((step, i) => (
                <li
                  key={step.t}
                  className="flex gap-5 bg-bordeaux px-6 py-6 sm:px-8"
                >
                  <span className="font-latin text-[1.4rem] leading-none text-petal">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-display text-[1.05rem]">{step.t}</p>
                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ivory/75">
                      {step.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── 料金システム ───────────────────────────── */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="System & Menu">
              分かりやすい60分セット料金。
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <PriceBoard />
            </Reveal>

            <Reveal delay={100}>
              <div className="hairline pt-8">
                <h3 className="eyebrow text-rose">Drink</h3>
                <p className="mt-4 text-[0.9rem] leading-[2] text-ink-soft">
                  {drinkHighlights.join('／')}
                </p>
                <p className="mt-2 text-[0.78rem] text-ink-soft/80">
                  ※生ビールはプラス200円です。
                </p>
              </div>

              <div className="hairline mt-8 pt-8">
                <h3 className="eyebrow text-rose">Option</h3>
                <ul className="mt-4 space-y-2.5">
                  {options.map((o) => (
                    <li
                      key={o.name}
                      className="flex items-baseline justify-between gap-4 border-b border-dotted border-rose/25 pb-2.5"
                    >
                      <span className="text-[0.92rem] text-ink-soft">
                        {o.name}
                      </span>
                      <span className="font-latin text-[1rem] text-bordeaux">
                        {o.price ? yen(o.price) : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <ActionLink href="/menu/" variant="outline" className="mt-9">
                料金・メニューをすべて見る
              </ActionLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── alouetteの魅力 ─────────────────────────── */}
      <section className="border-y border-rose/12 bg-shell py-20 md:py-28">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Why alouette">
              選ばれている、6つの理由。
            </SectionHeading>
          </Reveal>

          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {charms.map((charm, i) => (
              <Reveal as="li" key={charm.title} delay={i * 60}>
                <p className="font-latin text-[0.7rem] tracking-[0.28em] text-rose/70">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-[1.12rem] text-bordeaux">
                  {charm.title}
                </h3>
                <p className="mt-3 text-[0.88rem] leading-[1.95] text-ink-soft">
                  {charm.body}
                </p>
              </Reveal>
            ))}
          </ul>

          <div className="hairline mt-14 grid gap-8 pt-12 sm:grid-cols-3">
            {features.map((f) => (
              <Reveal key={f.no}>
                <h3 className="flex items-baseline gap-3 font-display text-[1.02rem] text-bordeaux">
                  <span aria-hidden className="text-petal">
                    ◇
                  </span>
                  {f.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-[1.9] text-ink-soft">
                  {f.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── イベント・ニュース ─────────────────────── */}
      <section className="bg-ivory py-20 md:py-24">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="News & Event">
              イベント・新着情報
            </SectionHeading>
            <Link
              href="/news/"
              className="inline-block py-1.5 text-[0.82rem] text-rose underline underline-offset-[6px] hover:text-bordeaux"
            >
              すべて見る
            </Link>
          </Reveal>

          <Reveal className="mt-9" delay={80}>
            {news.length > 0 ? (
              <ul className="hairline">
                {news.map((post) => (
                  <li key={post.slug} className="border-b border-rose/12">
                    <Link
                      href={`/news/${post.slug}/`}
                      className="flex flex-col gap-1.5 py-5 transition hover:opacity-70 sm:flex-row sm:items-center sm:gap-7"
                    >
                      <time
                        dateTime={post.date}
                        className="font-latin text-[0.85rem] tracking-[0.1em] text-rose"
                      >
                        {formatDateDot(post.date)}
                      </time>
                      <span className="w-fit rounded-full border border-rose/30 px-3 py-0.5 text-[0.7rem] text-rose">
                        {post.category}
                      </span>
                      <span className="text-[0.94rem] text-ink-soft">
                        {post.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-soft">
                新着情報は準備中です。最新情報はSNSでもお知らせしています。
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── 店内ギャラリー ─────────────────────────── */}
      <section className="bg-ink py-20 text-ivory md:py-24">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Gallery" tone="light">
              ピンクのネオンが灯る店内。
            </SectionHeading>
            <Link
              href="/gallery/"
              className="inline-block py-1.5 text-[0.82rem] text-blush underline underline-offset-[6px] hover:text-ivory"
            >
              ギャラリーを見る
            </Link>
          </Reveal>
        </div>

        <Reveal className="mt-10" delay={80}>
          <ul className="grid grid-cols-2 gap-1.5 px-1.5 md:grid-cols-4">
            {photos.map((photo) => (
              <li
                key={photo.src}
                className="relative aspect-square overflow-hidden"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] hover:scale-105"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── アクセス ──────────────────────────────── */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Access">
              小田急相模原駅から、徒歩4分。
            </SectionHeading>
            <p className="mt-7 text-[0.94rem] leading-[2.1] text-ink-soft">
              神奈川県相模原市南区南台。小田急相模原駅の北口を出て直進し、駅前の信号を右折。南大野交番前を左折して進むと、1つ目の角にピンクのネオンが見えてきます。
            </p>

            <dl className="mt-9 space-y-3 text-[0.9rem]">
              <div className="flex gap-5">
                <dt className="w-24 shrink-0 text-[0.78rem] text-rose">住所</dt>
                <dd className="text-ink-soft">{store.address.full}</dd>
              </div>
              <div className="flex gap-5">
                <dt className="w-24 shrink-0 text-[0.78rem] text-rose">電話</dt>
                <dd>
                  <a
                    href={`tel:${store.telHref}`}
                    className="inline-block py-1 font-latin text-[1.05rem] text-bordeaux underline underline-offset-4"
                  >
                    {store.tel}
                  </a>
                </dd>
              </div>
              <div className="flex gap-5">
                <dt className="w-24 shrink-0 text-[0.78rem] text-rose">
                  営業時間
                </dt>
                <dd className="text-ink-soft">{store.businessHoursNote}</dd>
              </div>
              <div className="flex gap-5">
                <dt className="w-24 shrink-0 text-[0.78rem] text-rose">
                  最寄り駅
                </dt>
                <dd className="text-ink-soft">{store.access.walkText}</dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink href="/shop/" variant="outline">
                アクセス詳細を見る
              </ActionLink>
              <ActionLink
                href={store.access.googleMapsUrl}
                variant="ghost"
                external
              >
                Googleマップで開く
              </ActionLink>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <MapEmbed
              src={store.access.googleMapsEmbedUrl}
              title={`${store.name}の地図（${store.address.full}）`}
              className="h-[320px] sm:h-[420px]"
            />
            <p className="mt-3 text-[0.75rem] text-ink-soft/75">
              {accessSteps[accessSteps.length - 1].body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 求人募集 ──────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-rose/12 bg-shell py-20 md:py-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Reveal>
            <SectionHeading eyebrow="Recruit">
              一緒に働く女の子を募集しています。
            </SectionHeading>
            <p className="mt-6 text-[0.94rem] leading-[2.1] text-ink-soft">
              時給{recruit.wage.hourlyFrom.toLocaleString('ja-JP')}円〜、
              {recruit.wage.backText}
              。自由シフト制で週1日〜OK、未経験の方も歓迎です。履歴書は不要、面接のみのご参加もできます。
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {[
                `時給${recruit.wage.hourlyFrom.toLocaleString('ja-JP')}円〜`,
                recruit.wage.backText,
                recruit.wage.payday,
                '週1日〜OK',
                '未経験歓迎',
                '18歳以上（高校生不可）',
              ].map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-rose/30 bg-ivory px-4 py-1.5 text-[0.78rem] text-rose"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <ActionLink href="/recruit/" className="mt-9">
              求人情報を詳しく見る
            </ActionLink>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-lg border border-rose/20 bg-ivory px-7 py-8">
              <p className="eyebrow text-rose">Trial</p>
              <h3 className="mt-3 font-display text-[1.25rem] text-bordeaux">
                {recruit.trial.title}
              </h3>
              <p className="mt-3 text-[0.88rem] leading-[1.95] text-ink-soft">
                {recruit.trial.body}
              </p>
              <a
                href={`tel:${store.telHref}`}
                className="mt-6 flex items-baseline gap-3"
              >
                <span className="font-latin text-[1.5rem] text-bordeaux">
                  {store.tel}
                </span>
                <span className="text-[0.72rem] text-ink-soft">
                  受付 {store.telHours}
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SNS ───────────────────────────────────── */}
      {activeSocialLinks.length > 0 ? (
        <section className="bg-ivory py-16 md:py-20">
          <div className="container-page text-center">
            <Reveal>
              <p className="eyebrow text-rose">Follow us</p>
              <h2 className="mt-4 font-display text-[1.4rem] text-bordeaux sm:text-[1.8rem]">
                最新情報と出勤予定はSNSで。
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[0.88rem] leading-[1.95] text-ink-soft">
                当日の出勤キャストやイベントのお知らせは、SNSで随時更新しています。
              </p>
              <SocialLinks className="mt-8 justify-center" />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ── 予約・問い合わせ ──────────────────────── */}
      <ContactCta />

      <section className="bg-shell/50 py-12">
        <div className="container-page">
          <p className="mx-auto max-w-3xl text-center text-[0.8rem] leading-[2] text-ink-soft/80">
            {siteConfig.name}（{siteConfig.nameJa}
            ）は、神奈川県相模原市南区南台にあるコンセプトカフェ＆バーです。小田急線 小田急相模原駅の北口から徒歩4分。相模原市内はもちろん、座間市・大和市方面からもお立ち寄りいただけます。
          </p>
        </div>
      </section>
    </>
  );
}
