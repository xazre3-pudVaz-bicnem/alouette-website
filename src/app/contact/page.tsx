import { Suspense } from 'react';
import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactForm from '@/components/contact/ContactForm';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SocialLinks from '@/components/ui/SocialLinks';
import JsonLd from '@/components/ui/JsonLd';
import { store } from '@/data/store';
import { featuredFaqs } from '@/data/faq';
import { activeSocialLinks } from '@/config/site';
import { faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '予約・お問い合わせ｜相模原のコンカフェ alouette',
  description:
    '相模原のコンカフェ alouette（あるえっと）へのご予約・お問い合わせはこちら。WEBフォームは24時間受付、お電話は17:00〜23:00（日曜定休）で承ります。求人応募もこのフォームからご連絡いただけます。',
  path: '/contact/',
});

const contactFaqs = featuredFaqs().slice(0, 4);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(contactFaqs)} />

      <PageHeader
        eyebrow="Reservation &amp; Contact"
        title="予約・お問い合わせ"
        lead="ご予約、店舗へのご質問、求人応募はこちらから。WEBフォームは24時間受け付けています。"
      />
      <Breadcrumbs items={[{ name: '予約・お問い合わせ', path: '/contact/' }]} />

      {/* 連絡手段 */}
      <section className="bg-ivory pt-10 pb-4">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal className="rounded-lg border border-rose/20 px-6 py-7">
              <p className="eyebrow text-rose">By Phone</p>
              <h2 className="mt-3 font-display text-[1.15rem] text-bordeaux">
                お電話でのご予約
              </h2>
              <a
                href={`tel:${store.telHref}`}
                className="mt-4 block font-latin text-[1.7rem] tracking-[0.03em] text-bordeaux underline underline-offset-[6px]"
              >
                {store.tel}
              </a>
              <p className="mt-2 text-[0.8rem] text-ink-soft">
                受付時間 {store.telHours}（{store.closedDays}定休）
              </p>
              <p className="mt-1 text-[0.78rem] text-ink-soft/75">
                ※営業時間外は、下のフォームからご連絡ください。
              </p>
            </Reveal>

            <Reveal className="rounded-lg border border-rose/20 px-6 py-7" delay={60}>
              <p className="eyebrow text-rose">By Web</p>
              <h2 className="mt-3 font-display text-[1.15rem] text-bordeaux">
                WEBフォーム
              </h2>
              <p className="mt-4 text-[0.9rem] leading-[1.95] text-ink-soft">
                24時間受付。ご予約・ご質問・求人応募のいずれもこのフォームから承ります。
                内容を確認のうえ、担当者よりご連絡いたします。
              </p>
              {activeSocialLinks.length > 0 ? (
                <>
                  <p className="mt-5 text-[0.8rem] text-ink-soft">
                    SNSのDMからもご連絡いただけます。
                  </p>
                  <SocialLinks className="mt-3" size="sm" />
                </>
              ) : null}
            </Reveal>
          </div>
        </div>
      </section>

      {/* フォーム */}
      <section className="bg-ivory py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="Form">お問い合わせフォーム</SectionHeading>
            <p className="mt-5 text-[0.9rem] leading-[1.95] text-ink-soft">
              下記フォームに必要事項をご入力のうえ、送信してください。
              <span className="text-rose">必須</span>
              の項目は必ずご入力をお願いします。
            </p>
          </Reveal>

          <div className="mt-9">
            <Suspense
              fallback={
                <p className="text-sm text-ink-soft">フォームを読み込んでいます…</p>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="border-t border-rose/12 bg-shell py-14 md:py-18">
        <div className="container-page max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="FAQ">
              よくいただくご質問
            </SectionHeading>
          </Reveal>

          <dl className="mt-8 divide-y divide-rose/12 border-y border-rose/12">
            {contactFaqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-[1rem] text-bordeaux">
                  {f.q}
                </dt>
                <dd className="mt-2 text-[0.88rem] leading-[1.95] text-ink-soft">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>

          <Reveal className="mt-8 text-[0.85rem] text-ink-soft">
            <p>
              {store.name}（{store.nameJa}）／{store.address.full}
              <br />
              {store.businessHoursNote}／{store.access.walkText}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
