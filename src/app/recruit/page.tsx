import Image from 'next/image';
import type { Metadata } from 'next';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ActionLink from '@/components/ui/ActionLink';
import JsonLd from '@/components/ui/JsonLd';
import { recruit } from '@/data/recruit';
import { store } from '@/data/store';
import { socialLinks } from '@/config/site';
import { focusOf } from '@/data/visuals';
import { faqJsonLd, jobPostingJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'コンカフェキャスト求人・バイト｜相模原のalouette',
  description:
    '相模原・小田急相模原駅のコンカフェ alouette（あるえっと）のキャスト求人です。時給1,300円〜、各種バック20%〜、日払いOK（上限あり）、週1日〜の自由シフト制。未経験歓迎・履歴書不要・体験入店受付中。18歳以上（高校生不可）。',
  path: '/recruit/',
});

/**
 * JobPosting の datePosted。
 * 募集条件を更新したときは、この日付も更新してください。
 */
const JOB_POSTED_DATE = '2026-08-06';

export default function RecruitPage() {
  return (
    <>
      <JsonLd data={jobPostingJsonLd(JOB_POSTED_DATE)} />
      <JsonLd data={faqJsonLd([...recruit.faq])} />

      {/* ヒーロー */}
      <section className="relative overflow-hidden bg-ink">
        <Image
          src="/images/visual/cast-group.jpg"
          alt=""
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          style={{ objectPosition: focusOf('/images/visual/cast-group.jpg') }}
          className="object-cover opacity-45"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-bordeaux/85 via-ink/75 to-ink/90"
        />
        <div className="container-page relative py-20 md:py-28">
          <p className="eyebrow text-blush">Recruit</p>
          <h1 className="mt-5 max-w-3xl text-ivory">
            <span className="block text-[0.86rem] leading-relaxed tracking-[0.06em] text-blush sm:text-[0.95rem]">
              相模原・小田急相模原駅のコンカフェ alouette キャスト求人
            </span>
            <span className="mt-3 block font-display text-[1.85rem] leading-[1.5] sm:text-[2.6rem]">
              かわいい空間で、
              <br />
              楽しく一緒に働きませんか。
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-[0.94rem] leading-[2] text-ivory/85">
            小田急相模原駅から徒歩4分。未経験の方も大歓迎です。まずはお店の雰囲気を見にくるだけでも構いません。
          </p>

          <ul className="mt-9 flex flex-wrap gap-2.5">
            {[
              `時給${recruit.wage.hourlyFrom.toLocaleString('ja-JP')}円〜`,
              recruit.wage.backText,
              recruit.wage.payday,
              '週1日〜OK',
              '未経験歓迎',
              '履歴書不要',
            ].map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-ivory/40 px-4 py-1.5 text-[0.78rem] text-ivory"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ActionLink href="#apply" variant="light">
              応募方法を見る
            </ActionLink>
            <ActionLink href={`tel:${store.telHref}`} variant="light">
              電話で応募（{store.tel}）
            </ActionLink>
          </div>
          <p className="mt-3 text-[0.75rem] text-ivory/60">
            電話の受付時間 {store.telHours}（{store.closedNote}）
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ name: '求人情報', path: '/recruit/' }]} />

      {/* 働くメリット */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Merit">
              alouetteで働くメリット
            </SectionHeading>
          </Reveal>

          <ul className="mt-11 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {recruit.merits.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 50}>
                <p className="font-latin text-[0.7rem] tracking-[0.28em] text-rose/70">
                  0{i + 1}
                </p>
                <h3 className="mt-2.5 font-display text-[1.1rem] text-bordeaux">
                  {m.title}
                </h3>
                <p className="mt-2.5 text-[0.87rem] leading-[1.95] text-ink-soft">
                  {m.body}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10 text-[0.85rem] text-ink-soft">
            <p>※{recruit.costumeNote}</p>
          </Reveal>
        </div>
      </section>

      {/* 給与・勤務条件 */}
      <section className="border-y border-rose/12 bg-shell py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Salary">給与・バック</SectionHeading>
            <div className="mt-8 rounded-lg bg-ivory px-7 py-9 text-center">
              <p className="font-latin text-[0.72rem] tracking-[0.28em] text-rose">
                HOURLY WAGE
              </p>
              <p className="mt-3 font-display text-[2.6rem] leading-none text-bordeaux">
                {recruit.wage.hourlyFrom.toLocaleString('ja-JP')}
                <span className="ml-1 text-[1.2rem]">円〜</span>
              </p>
              <p className="mt-5 text-[0.95rem] text-ink-soft">
                {recruit.wage.backText}
              </p>
              <p className="mt-1.5 text-[0.88rem] text-ink-soft">
                {recruit.wage.payday}
              </p>
            </div>
            <p className="mt-4 text-[0.78rem] leading-[1.9] text-ink-soft/80">
              ※交通費・送迎の有無など、上記以外の待遇については面接時にご確認ください。
            </p>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading eyebrow="Requirements" as="h2">
              勤務条件・応募資格
            </SectionHeading>

            <div className="mt-8">
              <h3 className="text-[0.78rem] tracking-[0.12em] text-rose">
                勤務条件
              </h3>
              <ul className="mt-3 space-y-2">
                {[
                  '自由シフト制（週1日〜OK）',
                  '終電上がり・遅出勤務もOK',
                  '予定に合わせて働けます',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.9rem] text-ink-soft"
                  >
                    <span aria-hidden className="text-petal">
                      ◇
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-[0.78rem] tracking-[0.12em] text-rose">
                応募資格
              </h3>
              <ul className="mt-3 space-y-2">
                {recruit.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.9rem] text-ink-soft"
                  >
                    <span aria-hidden className="text-petal">
                      ◇
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-[0.78rem] tracking-[0.12em] text-rose">
                こんな女の子を募集しています
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {recruit.wanted.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-rose/30 bg-ivory px-4 py-1.5 text-[0.78rem] text-rose"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 仕事内容 */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Work">お仕事内容</SectionHeading>
          </Reveal>

          <ul className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {recruit.duties.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 50} className="hairline pt-6">
                <h3 className="font-display text-[1.05rem] text-bordeaux">
                  {d.title}
                </h3>
                <p className="mt-2.5 text-[0.87rem] leading-[1.95] text-ink-soft">
                  {d.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 1日の流れ */}
      <section className="border-y border-rose/12 bg-shell py-14 md:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="A Day">1日の流れ（例）</SectionHeading>
          </Reveal>

          <ol className="mt-10 space-y-px overflow-hidden rounded-lg bg-rose/15">
            {recruit.dayFlow.map((step, i) => (
              <Reveal
                as="li"
                key={step.time}
                delay={i * 50}
                className="flex gap-6 bg-ivory px-6 py-6 sm:px-9"
              >
                <span className="font-latin text-[1.4rem] leading-none text-blush">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[1.05rem] text-bordeaux">
                    {step.time}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-[1.95] text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-8 text-center text-[0.88rem] text-rose">
            終電上がり・遅出勤務もOK。あなたのペースで働けます。
          </Reveal>
        </div>
      </section>

      {/* 体験入店 */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Trial">
              {recruit.trial.title}
            </SectionHeading>
            <p className="mt-6 text-[0.94rem] leading-[2.1] text-ink-soft">
              {recruit.trial.body}
              まずはお店の雰囲気を見てから決めていただけますので、「働けるか不安」という方も安心してご連絡ください。
            </p>
            <p className="mt-4 text-[0.8rem] leading-[1.9] text-ink-soft/80">
              ※体験入店の時給や当日の持ち物については、ご連絡の際にご案内します。
            </p>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading eyebrow="Steps" as="h2">
              応募の流れ
            </SectionHeading>
            <ol className="mt-7 space-y-5">
              {recruit.applyFlow.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blush font-latin text-[0.8rem] text-bordeaux">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[1rem] text-bordeaux">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[0.86rem] leading-[1.9] text-ink-soft">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 応募 */}
      <section
        id="apply"
        className="scroll-mt-24 border-y border-rose/12 bg-shell py-14 md:py-20"
      >
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Apply">ご応募はこちら</SectionHeading>
            <p className="mt-5 text-[0.94rem] leading-[2] text-ink-soft">
              履歴書は不要、手ぶらでOKです。まずはお気軽にご連絡ください。
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal className="rounded-lg bg-ivory px-7 py-8">
              <p className="eyebrow text-rose">Tel</p>
              <h3 className="mt-3 font-display text-[1.15rem] text-bordeaux">
                お電話で応募する
              </h3>
              <a
                href={`tel:${store.telHref}`}
                className="mt-4 block font-latin text-[1.6rem] text-bordeaux underline underline-offset-[6px]"
              >
                {store.tel}
              </a>
              <p className="mt-2 text-[0.78rem] text-ink-soft">
                受付時間 {store.telHours}（{store.closedNote}）
              </p>
            </Reveal>

            {socialLinks.instagram ? (
              <Reveal className="rounded-lg bg-ivory px-7 py-8" delay={60}>
                <p className="eyebrow text-rose">Instagram</p>
                <h3 className="mt-3 font-display text-[1.15rem] text-bordeaux">
                  Instagramで応募する
                </h3>
                <p className="mt-3 text-[0.86rem] leading-[1.9] text-ink-soft">
                  DMからお気軽にご連絡ください。24時間受付中です。
                </p>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-full border border-rose/40 px-6 py-2.5 text-[0.85rem] text-rose transition hover:bg-shell"
                >
                  Instagramを開く
                </a>
              </Reveal>
            ) : null}

            {socialLinks.x ? (
              <Reveal className="rounded-lg bg-ivory px-7 py-8" delay={120}>
                <p className="eyebrow text-rose">X (Twitter)</p>
                <h3 className="mt-3 font-display text-[1.15rem] text-bordeaux">
                  XのDMで応募する
                </h3>
                <p className="mt-3 text-[0.86rem] leading-[1.9] text-ink-soft">
                  公式XのDMからご連絡ください。24時間受付、ご質問だけでもOKです。
                </p>
                <a
                  href={socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-full bg-bordeaux px-6 py-2.5 text-[0.85rem] text-ivory transition hover:bg-rose"
                >
                  公式Xを開く
                </a>
              </Reveal>
            ) : null}
          </div>

          {socialLinks.line ? (
            <Reveal className="mt-5 text-center text-[0.85rem] text-ink-soft">
              LINEからのご応募も受け付けています。
              <a
                href={socialLinks.line}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-rose underline underline-offset-4"
              >
                友だち追加はこちら
              </a>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* 求人FAQ */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page max-w-4xl">
          <Reveal>
            <SectionHeading eyebrow="FAQ">
              お仕事についてよくある質問
            </SectionHeading>
          </Reveal>

          <dl className="mt-8 divide-y divide-rose/12 border-y border-rose/12">
            {recruit.faq.map((f) => (
              <Reveal key={f.q} className="py-6">
                <dt className="flex gap-4">
                  <span
                    aria-hidden
                    className="font-latin text-[1.05rem] leading-none text-petal"
                  >
                    Q
                  </span>
                  <span className="font-display text-[1.02rem] leading-snug text-bordeaux">
                    {f.q}
                  </span>
                </dt>
                <dd className="mt-3 flex gap-4">
                  <span
                    aria-hidden
                    className="font-latin text-[1.05rem] leading-none text-rose/50"
                  >
                    A
                  </span>
                  <span className="text-[0.9rem] leading-[2] text-ink-soft">
                    {f.a}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* 求人専用の締めCTA（来店予約とは分ける） */}
      <section className="relative overflow-hidden bg-bordeaux py-16 text-ivory md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-petal/25 blur-3xl"
        />
        <div className="container-page relative text-center">
          <p className="eyebrow text-blush">Join us</p>
          <h2 className="mt-5 font-display text-[1.6rem] leading-[1.5] sm:text-[2.1rem]">
            気になったら、まずは一度お話しませんか。
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[0.9rem] leading-[2] text-ivory/80">
            面接のみのご参加もOKです。ご質問だけでもお気軽にどうぞ。
          </p>
          <div className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${store.telHref}`}
              className="flex-1 rounded-full bg-ivory px-7 py-4 text-[0.95rem] text-bordeaux transition hover:bg-blush"
            >
              <span className="font-latin">{store.tel}</span>
            </a>
            {socialLinks.x ? (
              <a
                href={socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-ivory/50 px-7 py-4 text-[0.95rem] transition hover:bg-ivory/10"
              >
                XのDMで応募する
              </a>
            ) : null}
          </div>
          <p className="mt-4 text-[0.75rem] text-ivory/60">
            18歳以上（高校生不可）／電話受付 {store.telHours}・
            {store.closedNote}
          </p>
        </div>
      </section>
    </>
  );
}
