import Image from 'next/image';
import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactCta from '@/components/common/ContactCta';
import PriceBoard from '@/components/common/PriceBoard';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ActionLink from '@/components/ui/ActionLink';
import MenuPoster from '@/components/common/MenuPoster';
import {
  champagneMenuPoster,
  champagneSetPoster,
  champagneSets,
  champagnes,
  drinkMenuPoster,
  drinkNotes,
  drinks,
  extraCharges,
  featuredFoods,
  foods,
  options,
  orderFlow,
  softDrinks,
  tequila,
  usageNotes,
} from '@/data/menu';
import { faqs } from '@/data/faq';
import { focusOf } from '@/data/visuals';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '料金・メニュー｜相模原のコンカフェ alouette',
  description:
    '相模原のコンカフェ alouette（あるえっと）の料金システムとメニューです。60分セット料金は男性3,000円・女性2,500円（税込・自動延長制）。飲み放題ドリンク、オムライスなどのフード、シャンパン、キャストドリンクやチェキの料金もご案内します。',
  path: '/menu/',
});

const yen = (n: number) => `${n.toLocaleString('ja-JP')}円`;

/** 料金に関するFAQ（このページの内容と一致するものだけを構造化データに使う） */
const priceFaqs = faqs.filter((f) => f.category === '料金');

export default function MenuPage() {
  return (
    <>
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
            <SectionHeading eyebrow="Set Charge">60分セット料金</SectionHeading>
            <p className="mt-6 text-[0.92rem] leading-[2] text-ink-soft">
              ご来店いただいたら、まずは60分のセット料金からスタートします。この料金のなかで、お好きなドリンクをお楽しみいただけます（生ビールのみプラス200円）。
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
                style={{
                  objectPosition: focusOf('/images/visual/bar-drink.jpg'),
                }}
                className="object-cover"
              />
            </div>
            <div className="mt-6 rounded-lg bg-shell px-6 py-6">
              <h2 className="font-display text-[1.05rem] text-bordeaux">
                自動延長制について
              </h2>
              <p className="mt-3 text-[0.88rem] leading-[1.95] text-ink-soft">
                60分のセット時間が過ぎると、自動的に延長となります。お帰りの際はスタッフへお声がけください。延長料金の詳細は、店内またはスタッフにご確認いただけます。
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

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-16">
            <Reveal delay={60}>
              <div className="grid gap-10 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <div>
                  <h3 className="eyebrow text-rose">Alcohol</h3>
                  <ul className="mt-3">
                    {drinks.map((d) => (
                      <li
                        key={d.name}
                        className="flex items-baseline justify-between gap-4 border-b border-dotted border-rose/30 py-3"
                      >
                        <span className="text-[0.95rem] text-ink-soft">
                          {d.name}
                        </span>
                        {d.note ? (
                          <span className="shrink-0 text-[0.76rem] text-rose">
                            {d.note}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow text-rose">Soft Drink</h3>
                  <ul className="mt-3">
                    {softDrinks.map((d) => (
                      <li
                        key={d.name}
                        className="border-b border-dotted border-rose/30 py-3 text-[0.95rem] text-ink-soft"
                      >
                        {d.name}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 space-y-1.5 text-[0.8rem] leading-[1.8] text-ink-soft/85">
                    {drinkNotes.map((n) => (
                      <li key={n}>※{n}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="mx-auto w-full max-w-[17rem]">
              <MenuPoster
                {...drinkMenuPoster}
                alt="飲み放題メニューのポスター。アルコールとソフトドリンクの一覧"
                sizes="(min-width: 1024px) 17rem, 70vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* フード */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Food">フードメニュー</SectionHeading>
            <p className="mt-5 text-[0.92rem] leading-[2] text-ink-soft">
              メイドが心をこめてお届けする、おすすめのフードです。ポスターをタップすると大きく表示されます。
            </p>
          </Reveal>

          <ul className="mx-auto mt-10 grid max-w-[22rem] gap-10 sm:max-w-none sm:grid-cols-3 sm:gap-6 lg:gap-10">
            {featuredFoods.map((f, i) => (
              <Reveal as="li" key={f.name} delay={i * 70}>
                <MenuPoster
                  {...f.poster}
                  alt={`${f.name}のメニューポスター`}
                  uniform
                  sizes="(min-width: 640px) 30vw, 90vw"
                />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[1.05rem] text-bordeaux">
                    {f.name}
                  </h3>
                  <p className="shrink-0 font-latin text-[1.25rem] text-bordeaux">
                    {f.price ? yen(f.price) : ''}
                  </p>
                </div>
                {f.note ? (
                  <p className="mt-1 text-[0.8rem] text-ink-soft/85">
                    {f.note}
                  </p>
                ) : null}
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="container-page mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <Reveal>
            <h3 className="font-display text-[1.2rem] text-bordeaux">
              おつまみ
            </h3>
            <p className="mt-3 text-[0.9rem] leading-[2] text-ink-soft">
              おつまみもご用意しています。お好きなフードの持ち込みもOKです。
            </p>

            <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
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
              ※おつまみの料金については、店内またはスタッフへご確認ください。
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h3 className="font-display text-[1.2rem] text-bordeaux">
              オプション
            </h3>
            <ul className="mt-4">
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
              キャストドリンクは女の子に1杯ごちそうしていただけるドリンク、チェキはその場でプリントされる記念写真です。どちらもご希望の場合のみのご注文です。
            </p>
          </Reveal>
        </div>
      </section>

      {/* シャンパン・テキーラ */}
      <section className="bg-bordeaux py-14 text-ivory md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Champagne &amp; Tequila" tone="light">
              シャンパン・テキーラ
            </SectionHeading>
            <p className="mt-5 text-[0.92rem] leading-[2] text-ivory/80">
              特別な時間を、推しと一緒に。お祝いや記念日にどうぞ。
            </p>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* シャンパンメニュー */}
            <Reveal className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_11rem] sm:items-start">
              <div>
                <h3 className="font-display text-[1.2rem]">
                  シャンパンメニュー
                </h3>
                <ul className="mt-4">
                  {champagnes.map((c) => (
                    <li
                      key={c.name}
                      className="flex items-baseline justify-between gap-4 border-b border-dotted border-ivory/25 py-3"
                    >
                      <span className="text-[0.95rem] text-ivory/90">
                        {c.name}
                      </span>
                      <span className="shrink-0 font-latin text-[1.15rem] text-petal">
                        {c.price ? yen(c.price) : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <MenuPoster
                {...champagneMenuPoster}
                alt="シャンパンメニューのポスター"
                sizes="(min-width: 640px) 11rem, 60vw"
                className="mx-auto w-full max-w-[14rem] sm:max-w-none"
              />
            </Reveal>

            {/* 心にドキュンテキーラ */}
            <Reveal
              delay={80}
              className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_11rem] sm:items-start"
            >
              <div>
                <p className="eyebrow text-blush">Recommend</p>
                <h3 className="mt-2 font-display text-[1.2rem]">
                  {tequila.name}
                </h3>
                <ul className="mt-4">
                  {tequila.prices.map((p) => (
                    <li
                      key={p.name}
                      className="flex items-baseline justify-between gap-4 border-b border-dotted border-ivory/25 py-3"
                    >
                      <span className="text-[0.95rem] text-ivory/90">
                        {p.name}
                      </span>
                      <span className="shrink-0 font-latin text-[1.15rem] text-petal">
                        {p.price ? yen(p.price) : ''}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.8rem] leading-[1.9] text-ivory/70">
                  一緒に乾杯して、もっと仲良くなっちゃおう。
                </p>
              </div>
              <MenuPoster
                {...tequila.poster}
                alt="心にドキュンテキーラのメニューポスター"
                sizes="(min-width: 640px) 11rem, 60vw"
                className="mx-auto w-full max-w-[14rem] sm:max-w-none"
              />
            </Reveal>
          </div>

          {/* ときめきシャンパンセット */}
          <Reveal className="mt-16 border-t border-ivory/15 pt-12">
            <h3 className="font-display text-[1.3rem]">
              ときめきシャンパンセット
            </h3>
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
              <ul className="grid gap-6 sm:grid-cols-2">
                {champagneSets.map((set) => (
                  <li
                    key={set.name}
                    className="rounded-lg border border-ivory/20 bg-ivory/5 px-6 py-7"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-display text-[1.15rem]">{set.name}</p>
                      <p className="font-latin text-[1.6rem] leading-none text-petal">
                        {yen(set.price)}
                      </p>
                    </div>
                    <ul className="mt-5 space-y-2 text-[0.88rem] text-ivory/85">
                      {set.items.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span aria-hidden className="text-blush">
                            ♡
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <MenuPoster
                {...champagneSetPoster}
                alt="ときめきシャンパンセット（Aセット・Bセット）のポスター"
                sizes="(min-width: 1024px) 17rem, 70vw"
                className="mx-auto w-full max-w-[17rem]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 追加料金のまとめ */}
      <section className="border-y border-rose/12 bg-shell py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Extra">
              主な追加料金
            </SectionHeading>
            <p className="mt-5 text-[0.92rem] leading-[2] text-ink-soft">
              セット料金のほかに、よくご注文いただくものです。フード・シャンパン・テキーラの料金は上のメニューをご覧ください。いずれもご希望の場合のみのご注文です。
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
