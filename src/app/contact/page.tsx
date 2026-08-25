import Image from 'next/image';
import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ReserveActions from '@/components/common/ReserveActions';
import StoreInfoTable from '@/components/common/StoreInfoTable';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ActionLink from '@/components/ui/ActionLink';
import JsonLd from '@/components/ui/JsonLd';
import { store } from '@/data/store';
import { featuredFaqs } from '@/data/faq';
import { socialLinks } from '@/config/site';
import { faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '予約・お問い合わせ｜相模原のコンカフェ alouette',
  description:
    '相模原のコンカフェ alouette（あるえっと）へのご予約・お問い合わせはお電話（042-705-4454／受付17:00〜23:00・日曜定休）またはXのDMで承ります。求人のご応募も同じ窓口です。小田急相模原駅から徒歩4分。',
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
        lead="ご予約、店舗へのご質問、求人のご応募は、お電話またはXのDMで承っています。ご予約なしでのご来店も歓迎です。"
      />
      <Breadcrumbs items={[{ name: '予約・お問い合わせ', path: '/contact/' }]} />

      {/* 連絡方法 */}
      <section className="bg-ivory py-12 md:py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="How to contact">
              ご連絡は、このどちらかで。
            </SectionHeading>
            <p className="mt-6 text-[0.94rem] leading-[2.1] text-ink-soft">
              当店ではWEBの入力フォームはご用意していません。
              お電話いただければその場でお席の空き状況をお答えできますし、
              営業時間外や「まず雰囲気だけ聞きたい」という方はXのDMが便利です。
            </p>

            <ReserveActions className="mt-9" size="lg" />

            <div className="hairline mt-10 pt-8">
              <h2 className="font-display text-[1.05rem] text-bordeaux">
                お電話でお伝えいただけるとスムーズです
              </h2>
              <ul className="mt-4 space-y-2 text-[0.88rem] leading-[1.9] text-ink-soft">
                {[
                  'ご来店の日時',
                  'ご来店の人数',
                  'お名前（お呼びしやすいお名前で構いません）',
                  '会いたいキャストがいればそのお名前',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="text-petal">
                      ◇
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.8rem] leading-[1.9] text-ink-soft/80">
                ご予約なしでもご来店いただけますが、満席の場合はご案内できないことがあります。
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative aspect-4/3 overflow-hidden rounded-lg">
              <Image
                src="/images/visual/welcome.jpg"
                alt="お客様を迎えるメイドのイメージイラスト"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>

            <div className="mt-8">
              <h2 className="eyebrow text-rose">Shop Information</h2>
              <div className="mt-4">
                <StoreInfoTable />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 求人応募 */}
      <section className="border-y border-rose/12 bg-shell py-12 md:py-16">
        <div className="container-page">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <SectionHeading eyebrow="For Applicants" as="h2">
                求人のご応募について
              </SectionHeading>
              <p className="mt-5 max-w-2xl text-[0.92rem] leading-[2] text-ink-soft">
                キャストのご応募も、同じお電話番号
                {socialLinks.x ? '・XのDM' : ''}
                で受け付けています。履歴書は不要、面接のみのご参加もOKです。
                お問い合わせの際に「求人の件で」とお伝えください。
              </p>
            </div>
            <ActionLink href="/recruit/" variant="outline">
              求人情報を見る
            </ActionLink>
          </Reveal>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="bg-ivory py-14 md:py-18">
        <div className="container-page max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="FAQ">よくいただくご質問</SectionHeading>
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

          <Reveal className="mt-8 flex flex-wrap items-center gap-4">
            <ActionLink href="/faq/" variant="outline">
              よくある質問をすべて見る
            </ActionLink>
            <p className="text-[0.85rem] text-ink-soft">
              {store.name}（{store.nameJa}）／{store.address.full}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 締めの導線 */}
      <section className="relative overflow-hidden bg-ink py-16 text-ivory md:py-20">
        <Image
          src="/images/visual/night-window.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-ink/92 via-bordeaux/70 to-ink/95"
        />
        <div className="container-page relative text-center">
          <p className="eyebrow text-blush">Waiting for you</p>
          <h2 className="mt-5 font-display text-[1.5rem] leading-[1.5] sm:text-[2rem]">
            お電話1本で、今夜の席をご用意します。
          </h2>
          <ReserveActions
            tone="light"
            size="lg"
            className="mx-auto mt-9 max-w-lg text-left sm:text-center"
          />
        </div>
      </section>
    </>
  );
}
