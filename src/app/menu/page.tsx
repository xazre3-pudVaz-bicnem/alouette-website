import Image from 'next/image';
import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactCta from '@/components/common/ContactCta';
import PriceBoard from '@/components/common/PriceBoard';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ActionLink from '@/components/ui/ActionLink';
import JsonLd from '@/components/ui/JsonLd';
import {
  drinks,
  extraCharges,
  foods,
  options,
  orderFlow,
  usageNotes,
} from '@/data/menu';
import { faqs } from '@/data/faq';
import { focusOf } from '@/data/visuals';
import { faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '料金・メニュー｜相模原のコンカフェ alouette',
  description:
    '相模原のコンカフェ alouette（あるえっと）の料金システムとメニューです。60分セット料金は男性3,000円・女性2,500円（税込・自動延長制）。飲み放題ドリンク、フード、キャストドリンクやチェキのオプション料金もご案内します。',
  path: '/menu/',
});

const yen = (n: number) => `${n.toLocaleString('ja-JP')}円`;

/** 料金に関するFAQ（このページの内容と一致するものだけを構造化データに使う） */
const priceFaqs = faqs.filter((f) => f.category === '料金');

export default function MenuPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(priceFaqs)} />

      <PageHeader
        eyebrow="System &amp; Menu"
        title="料金・メニュー"
        lead="alouetteの料金システムと各種メニューのご案内です。表示はすべて税込価格、お会計はテーブル会計となります。"
      />
      <Breadcrumbs items={[{ name: '料金・メニュー', path: '/menu/' }]} />

      {/* セット料金 */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Set Charge">
              60分セット料金
            </SectionHeading>
            <p className="mt-6 text-[0.92rem] leading-[2] text-ink-soft">
              ご来店いただいたら、まずは60分のセット料金からスタートします。
              この料金のなかで、お好きなドリンクをお楽しみいただけます（生ビールのみプラス200円）。
            </p>
            <div className="mt-8">
              <PriceBoard />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/images/visual/bar-drink.jpg"
                alt="カウンターでドリンクを楽しむイメージイラスト"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                style={{ objectPosition: focusOf('/images/visual/bar-drink.jpg') }}
                className="object-cover"
              />
            </div>
            <div className="mt-6 rounded-lg bg-shell px-6 py-6">
              <h2 className="font-display text-[1.05rem] text-bordeaux">
                自動延長制について
              </h2>
              <p className="mt-3 text-[0.88rem] leading-[1.95] text-ink-soft">
                60分のセット時間が過ぎると、自動的に延長となります。
                お帰りの際はスタッフへお声がけください。
                延長料金の詳細は、店内またはスタッフにご確認いただけます。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ドリンク */}
      <section className="border-y border-rose/12 bg-shell py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Drink">飲み放題ドリンク</SectionHeading>
            <p className="mt-5 text-[0.92rem] leading-[2] text-ink-soft">
              セット料金内でお楽しみいただけるドリンクです。お酒が苦手な方にはソフトドリンクもご用意しています。
            </p>
          </Reveal>

          <Reveal className="mt-10" delay={60}>
            <ul className="grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
              {drinks.map((d) => (
                <li
                  key={d.name}
                  className="flex items-baseline justify-between gap-4 border-b border-dotted border-rose/30 py-3.5"
                >
                  <span className="text-[0.95rem] text-ink-soft">{d.name}</span>
                  {d.note ? (
                    <span className="shrink-0 text-[0.78rem] text-rose">
                      {d.note}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* フード */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Food">フードメニュー</SectionHeading>
            <p className="mt-5 text-[0.92rem] leading-[2] text-ink-soft">
              おつまみをご用意しています。お好きなフードの持ち込みもOKです。
            </p>

            <ul className="mt-9 grid gap-x-10 sm:grid-cols-2">
              {foods.map((f) => (
                <li
                  key={f.name}
                  className="flex items-baseline justify-between gap-4 border-b border-dotted border-rose/30 py-3.5"
                >
                  <span className="text-[0.95rem] text-ink-soft">{f.name}</span>
                  {f.price ? (
                    <span className="font-latin text-[0.95rem] text-bordeaux">
                      {yen(f.price)}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.78rem] text-ink-soft/80">
              ※フードの料金については、店内またはスタッフへご確認ください。
            </p>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading eyebrow="Option">オプション</SectionHeading>
            <ul className="mt-9">
              {options.map((o) => (
                <li
                  key={o.name}
                  className="flex items-baseline justify-between gap-4 border-b border-dotted border-rose/30 py-4"
                >
                  <span className="text-[0.95rem] text-ink-soft">{o.name}</span>
                  <span className="font-latin text-[1.15rem] text-bordeaux">
                    {o.price ? yen(o.price) : ''}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.8rem] leading-[1.9] text-ink-soft">
              キャストドリンクは女の子に1杯ごちそうしていただけるドリンク、
              チェキはその場でプリントされる記念写真です。どちらもご希望の場合のみのご注文です。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 追加料金のまとめ */}
      <section className="border-y border-rose/12 bg-shell py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Extra">
              追加料金が発生するメニュー
            </SectionHeading>
            <p className="mt-5 text-[0.92rem] leading-[2] text-ink-soft">
              セット料金のほかに料金がかかるのは、次の3つだけです。
            </p>
          </Reveal>

          <Reveal className="mt-9" delay={60}>
            <ul className="grid gap-px overflow-hidden rounded-lg bg-rose/15 sm:grid-cols-3">
              {extraCharges.map((item) => (
                <li key={item.name} className="bg-ivory px-6 py-7 text-center">
                  <p className="text-[0.92rem] text-ink-soft">{item.name}</p>
                  <p className="mt-2 font-display text-[1.6rem] text-bordeaux">
                    {item.price ? `+${yen(item.price)}` : ''}
                  </p>
                  {item.note ? (
                    <p className="mt-2 text-[0.75rem] text-ink-soft/80">
                      {item.note}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 注文の流れ */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Order Flow">
              ご注文からお会計までの流れ
            </SectionHeading>
          </Reveal>

          <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {orderFlow.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 50}>
                <p className="font-latin text-[0.72rem] tracking-[0.24em] text-rose">
                  STEP {i + 1}
                </p>
                <h3 className="mt-2.5 font-display text-[1.02rem] text-bordeaux">
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

      {/* ご利用にあたって */}
      <section className="border-t border-rose/12 bg-shell py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Notice">ご利用にあたって</SectionHeading>
            <ul className="mt-7 space-y-3">
              {usageNotes.map((note) => (
                <li
                  key={note}
                  className="flex gap-3 text-[0.88rem] leading-[1.95] text-ink-soft"
                >
                  <span aria-hidden className="shrink-0 text-rose">
                    ※
                  </span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading eyebrow="FAQ" as="h2">
              料金についてよくある質問
            </SectionHeading>
            <dl className="mt-7 space-y-6">
              {priceFaqs.slice(0, 4).map((f) => (
                <div key={f.q} className="hairline pt-5">
                  <dt className="font-display text-[1rem] text-bordeaux">
                    {f.q}
                  </dt>
                  <dd className="mt-2 text-[0.87rem] leading-[1.95] text-ink-soft">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
            <ActionLink href="/faq/" variant="outline" className="mt-8">
              よくある質問をすべて見る
            </ActionLink>
          </Reveal>
        </div>
      </section>

      <ContactCta
        heading="料金が分かったら、あとは会いにくるだけ。"
        lead="初めての方には、スタッフがシステムをご説明します。安心してお越しください。"
      />
    </>
  );
}
