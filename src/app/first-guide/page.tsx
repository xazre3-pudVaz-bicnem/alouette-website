import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactCta from '@/components/common/ContactCta';
import PriceBoard from '@/components/common/PriceBoard';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ActionLink from '@/components/ui/ActionLink';
import JsonLd from '@/components/ui/JsonLd';
import { drinks, options, orderFlow, usageNotes } from '@/data/menu';
import { featuredFaqs } from '@/data/faq';
import { store } from '@/data/store';
import { accessSteps } from '@/data/access';
import { faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '初めての方へ｜相模原のコンカフェ alouette',
  description:
    'コンカフェが初めての方へ。相模原のコンカフェ alouette（あるえっと）の入店からお会計までの流れ、60分セット料金、飲み放題やチェキの仕組み、ひとり来店や服装の疑問をまとめてご説明します。小田急相模原駅から徒歩4分。',
  path: '/first-guide/',
});

const guideFaqs = featuredFaqs();

export default function FirstGuidePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(guideFaqs)} />

      <PageHeader
        eyebrow="First Guide"
        title="初めての方へ"
        lead="「コンカフェって、どんなところ？」という方へ。alouetteの過ごし方を、順を追ってご説明します。"
      />
      <Breadcrumbs items={[{ name: '初めての方へ', path: '/first-guide/' }]} />

      {/* どんなお店か */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="About">
              alouetteはどんなお店？
            </SectionHeading>
            <div className="mt-7 space-y-5 text-[0.94rem] leading-[2.1] text-ink-soft">
              <p>
                alouette（あるえっと）は、神奈川県相模原市南区南台にあるコンセプトカフェ＆バーです。
                かわいい女の子たちと、カウンターやテーブル席で気軽におしゃべりしながら過ごせます。
              </p>
              <p>
                難しいルールはありません。60分のセット料金でスタートして、
                お好きなドリンクを飲みながらお話しするだけ。
                お仕事帰りにふらっと立ち寄る方、ご友人との二次会に使う方など、
                楽しみ方はさまざまです。
              </p>
              <p>
                営業時間は{store.businessHours}、定休日は{store.closedDays}
                。小田急線 小田急相模原駅の北口から徒歩4分です。
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative aspect-4/3 overflow-hidden rounded-lg">
              <Image
                src="/images/store/store-counter.jpg"
                alt="alouette 店内のカウンター席"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 入店からお会計までの流れ */}
      <section className="border-y border-rose/12 bg-shell py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Flow">
              入店からお会計までの流れ
            </SectionHeading>
          </Reveal>

          <ol className="mt-10 space-y-px overflow-hidden rounded-lg bg-rose/15">
            {orderFlow.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 50}
                className="flex gap-6 bg-ivory px-6 py-6 sm:px-9"
              >
                <span className="font-latin text-[1.5rem] leading-none text-blush">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[1.05rem] text-bordeaux">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-[1.95] text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 料金・飲み放題・オプション */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Price">
              まずは60分セット料金から。
            </SectionHeading>
          </Reveal>

          <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <Reveal>
              <PriceBoard />
            </Reveal>

            <Reveal delay={80} className="space-y-8">
              <div className="hairline pt-7">
                <h3 className="font-display text-[1.05rem] text-bordeaux">
                  飲み放題の内容
                </h3>
                <p className="mt-3 text-[0.88rem] leading-[2] text-ink-soft">
                  {drinks.map((d) => d.name).join('／')}
                </p>
                <p className="mt-2 text-[0.78rem] text-ink-soft/80">
                  ※生ビールのみプラス200円です。お酒が苦手な方はソフトドリンクをどうぞ。
                </p>
              </div>

              <div className="hairline pt-7">
                <h3 className="font-display text-[1.05rem] text-bordeaux">
                  キャストドリンクとは
                </h3>
                <p className="mt-3 text-[0.88rem] leading-[1.95] text-ink-soft">
                  女の子に1杯ごちそうしていただけるドリンクです（
                  {options[0].price?.toLocaleString('ja-JP')}円）。
                  必須ではありませんので、「一緒に乾杯したいな」と思ったときにご注文ください。
                </p>
              </div>

              <div className="hairline pt-7">
                <h3 className="font-display text-[1.05rem] text-bordeaux">
                  チェキとは
                </h3>
                <p className="mt-3 text-[0.88rem] leading-[1.95] text-ink-soft">
                  その場でプリントされるインスタント写真です（1枚
                  {options[1].price?.toLocaleString('ja-JP')}円）。
                  女の子と一緒に写って、楽しかった夜をそのまま持ち帰れます。
                </p>
              </div>

              <div className="hairline pt-7">
                <h3 className="font-display text-[1.05rem] text-bordeaux">
                  自動延長制について
                </h3>
                <p className="mt-3 text-[0.88rem] leading-[1.95] text-ink-soft">
                  60分が過ぎると自動的に延長になります。お帰りの際はスタッフへお声がけください。
                  延長料金の詳細は、店内またはスタッフへご確認いただけます。
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-10">
            <ActionLink href="/menu/" variant="outline">
              料金・メニューの詳細を見る
            </ActionLink>
          </Reveal>
        </div>
      </section>

      {/* よくある不安 */}
      <section className="border-y border-rose/12 bg-shell py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Q &amp; A">
              こんなこと、心配していませんか？
            </SectionHeading>
          </Reveal>

          <ul className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {[
              {
                t: 'ひとりで行っても大丈夫？',
                d: 'おひとりでご来店される方も多くいらっしゃいます。カウンター越しに女の子がお相手しますので、会話に困ることはありません。',
              },
              {
                t: '女性でも入れる？',
                d: '女性のお客様も歓迎です。セット料金も女性は2,500円（60分・税込）とご用意しています。ご友人同士でのご利用もどうぞ。',
              },
              {
                t: '服装の決まりはある？',
                d: 'カジュアルな服装で大丈夫です。お仕事帰りのスーツでも、普段着でもお気軽にお越しください。',
              },
              {
                t: '予約は必要？',
                d: 'ご予約なしでもご来店いただけますが、満席の場合はご案内できないことがあります。確実にお席を確保されたい場合はご予約ください。',
              },
              {
                t: 'お酒が飲めないけど平気？',
                d: 'ソフトドリンクもご用意しています。お酒を飲まずにお楽しみいただけます。',
              },
              {
                t: '禁止事項は？',
                d: '18歳未満の方のご入店、迷惑行為・暴力行為、泥酔された方のご入店はお断りしております。',
              },
            ].map((item, i) => (
              <Reveal as="li" key={item.t} delay={i * 40} className="hairline pt-6">
                <h3 className="font-display text-[1.02rem] text-bordeaux">
                  {item.t}
                </h3>
                <p className="mt-2.5 text-[0.87rem] leading-[1.95] text-ink-soft">
                  {item.d}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10 rounded-lg border border-rose/20 bg-ivory px-6 py-6">
            <p className="text-[0.85rem] leading-[1.95] text-ink-soft">
              このページに書かれていないルールやご不明な点は、
              <a
                href={`tel:${store.telHref}`}
                className="mx-1 text-rose underline underline-offset-4"
              >
                店舗（{store.tel}）
              </a>
              までお問い合わせください。受付時間は{store.telHours}（
              {store.closedDays}定休）です。
            </p>
          </Reveal>
        </div>
      </section>

      {/* ご利用にあたって */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
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

          <Reveal delay={80}>
            <SectionHeading eyebrow="Access" as="h2">
              お店までの行き方
            </SectionHeading>
            <ol className="mt-7 space-y-4">
              {accessSteps.map((step) => (
                <li key={step.step} className="flex gap-4">
                  <span className="mt-1 shrink-0 font-latin text-[0.68rem] tracking-[0.16em] text-rose">
                    {step.step}
                  </span>
                  <span className="text-[0.88rem] leading-[1.9] text-ink-soft">
                    {step.body}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[0.85rem] text-ink-soft">
              {store.address.full}／{store.access.walkText}
            </p>
            <ActionLink href="/shop/" variant="outline" className="mt-7">
              アクセス・店舗情報
            </ActionLink>
          </Reveal>
        </div>
      </section>

      {/* FAQ抜粋 */}
      <section className="border-t border-rose/12 bg-shell py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="FAQ">よくある質問</SectionHeading>
          </Reveal>

          <dl className="mt-9 grid gap-x-12 gap-y-7 sm:grid-cols-2">
            {guideFaqs.map((f) => (
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

          <Reveal className="mt-9">
            <Link
              href="/faq/"
              className="text-[0.85rem] text-rose underline underline-offset-[6px]"
            >
              よくある質問をすべて見る
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactCta
        heading="準備はできましたか。"
        lead="ご予約はお電話またはWEBフォームから。当日のご来店も歓迎です。"
      />
    </>
  );
}
