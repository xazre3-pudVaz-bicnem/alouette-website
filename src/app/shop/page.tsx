import Image from 'next/image';
import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactCta from '@/components/common/ContactCta';
import StoreInfoTable from '@/components/common/StoreInfoTable';
import MapEmbed from '@/components/common/MapEmbed';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ActionLink from '@/components/ui/ActionLink';
import SocialLinks from '@/components/ui/SocialLinks';
import { store } from '@/data/store';
import { accessSteps, areaNote } from '@/data/access';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'アクセス・店舗情報｜小田急相模原駅のコンカフェ alouette',
  description:
    '相模原のコンカフェ alouette（あるえっと）へのアクセスです。神奈川県相模原市南区南台4-15-8、小田急相模原駅の北口から徒歩4分。営業時間18:00〜23:00、日曜定休。駅からの道順とGoogleマップをご案内します。',
  path: '/shop/',
});

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Access"
        title={
          <>
            アクセス・店舗情報
            <span className="mt-3 block text-[1.05rem] leading-relaxed text-rose sm:text-[1.2rem]">
              小田急相模原駅 北口から徒歩4分
            </span>
          </>
        }
        lead="皆さまのご来店を心よりお待ちしております。道に迷われた場合は、お気軽にお電話ください。"
      />
      <Breadcrumbs items={[{ name: 'アクセス・店舗情報', path: '/shop/' }]} />

      {/* 店舗情報 + 地図 */}
      <section className="bg-ivory py-12 md:py-18">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Shop Information">店舗情報</SectionHeading>
            <div className="mt-7">
              <StoreInfoTable />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href={store.access.googleMapsUrl} external>
                Googleマップで開く
              </ActionLink>
              <ActionLink href={`tel:${store.telHref}`} variant="outline">
                電話をかける（{store.tel}）
              </ActionLink>
            </div>
            <p className="mt-3 text-[0.75rem] text-ink-soft/75">
              電話の受付時間は{store.telHours}（{store.closedDays}
              定休）です。営業時間外は公式XのDMからご連絡ください。
            </p>

            <SocialLinks className="mt-8" />
          </Reveal>

          <Reveal delay={100}>
            <MapEmbed
              src={store.access.googleMapsEmbedUrl}
              title={`${store.name}の地図（${store.address.full}）`}
              className="h-[360px] lg:h-[520px]"
            />
            <p className="mt-4 text-[0.85rem] leading-[1.95] text-ink-soft">
              {areaNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 駅からの道順 */}
      <section className="border-y border-rose/12 bg-shell py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Route">
              {store.access.stationShort}からの道順
            </SectionHeading>
            <p className="mt-5 text-[0.92rem] leading-[2] text-ink-soft">
              {store.access.station}の{store.access.exit}
              を出て、徒歩4分。「あるえっと」と書かれた白い看板が目印です。
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {accessSteps.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 60}>
                <div className="relative aspect-3/2 overflow-hidden rounded-lg bg-ivory">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                    style={{ objectPosition: step.imagePosition ?? 'center' }}
                    className="object-cover"
                  />
                  {step.isPlaceholder ? (
                    <span className="absolute top-2 left-2 rounded-full bg-ivory/90 px-2.5 py-0.5 text-[0.62rem] tracking-[0.08em] text-rose">
                      写真準備中
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 font-latin text-[0.7rem] tracking-[0.22em] text-rose">
                  {step.step}
                </p>
                <h3 className="mt-1.5 font-display text-[1.02rem] text-bordeaux">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-[1.9] text-ink-soft">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 未確認情報の案内 */}
      <section className="bg-ivory py-14 md:py-18">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl rounded-lg border border-rose/20 px-6 py-7 text-center">
            <h2 className="font-display text-[1.1rem] text-bordeaux">
              駐車場・お支払い方法などについて
            </h2>
            <p className="mt-3 text-[0.87rem] leading-[1.95] text-ink-soft">
              駐車場の有無、お支払い方法、喫煙可否、団体・貸切のご利用条件については、
              お手数ですが店舗までお問い合わせください。
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ActionLink href={`tel:${store.telHref}`} variant="outline">
                {store.tel}
              </ActionLink>
              <ActionLink href="/contact/" variant="outline">
                ご予約・お問い合わせ
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCta
        heading="ご来店、お待ちしています。"
        lead={`${store.address.full}／${store.access.walkText}`}
      />
    </>
  );
}
