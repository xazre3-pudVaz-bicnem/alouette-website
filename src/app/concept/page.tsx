import Image from 'next/image';
import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactCta from '@/components/common/ContactCta';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ActionLink from '@/components/ui/ActionLink';
import { charms, conceptLead, features, tagline } from '@/data/concept';
import { store } from '@/data/store';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'コンセプト・お店について｜相模原のコンカフェ alouette',
  description:
    '相模原市南区のコンカフェ alouette（あるえっと）のコンセプトをご紹介します。小田急相模原駅から徒歩4分、かわいい女の子たちと気軽に話せるコンセプトカフェ＆バー。落ち着いた店内で、日常を忘れる夜をお過ごしください。',
  path: '/concept/',
});

export default function ConceptPage() {
  return (
    <>
      <PageHeader
        eyebrow="Concept"
        title={
          <>
            相模原のコンカフェ alouette について
            <span className="mt-3 block text-[1.15rem] leading-relaxed text-rose sm:text-[1.4rem]">
              日常を忘れる、とっておきの夜を。
            </span>
          </>
        }
        lead={tagline}
      />
      <Breadcrumbs items={[{ name: 'コンセプト', path: '/concept/' }]} />

      {/* ブランドストーリー */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Our Story">
              {conceptLead.title}
            </SectionHeading>
            <div className="mt-8 space-y-5 text-[0.94rem] leading-[2.15] text-ink-soft">
              {conceptLead.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                名前の「alouette（あるえっと）」は、フランス語でひばりを意味する言葉。
                夜の街でも、ふっと軽やかな気持ちになれる場所でありたい。
                そんな願いを込めて、この名前をつけました。
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src="/images/visual/interior-cafe.jpg"
                alt="ピンクを基調にした店内の雰囲気のイメージイラスト"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3つの特徴 */}
      <section className="border-y border-rose/12 bg-shell py-16 md:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Features">
              alouetteの3つの特徴
            </SectionHeading>
          </Reveal>

          <ul className="mt-12 grid gap-10 sm:grid-cols-3">
            {features.map((f, i) => (
              <Reveal as="li" key={f.no} delay={i * 80}>
                <p className="font-latin text-[2.2rem] leading-none text-blush">
                  {f.no}
                </p>
                <h2 className="mt-4 font-display text-[1.2rem] text-bordeaux">
                  {f.title}
                </h2>
                <p className="mt-3 text-[0.88rem] leading-[1.95] text-ink-soft">
                  {f.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 過ごし方 */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Scene">
              こんなシーンでご利用いただいています。
            </SectionHeading>
          </Reveal>

          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {[
              {
                t: 'お仕事帰りにひとりで',
                d: 'カウンター越しに気軽にお話しできるので、おひとりでも居心地よく過ごせます。',
              },
              {
                t: 'ご友人との二次会に',
                d: '飲み会のあとの一杯にも。テーブル席でゆっくりお過ごしいただけます。',
              },
              {
                t: '女性のお客様同士で',
                d: '女性のセット料金もご用意しています。かわいい店内で盛り上がってください。',
              },
              {
                t: '記念日やお祝いに',
                d: 'チェキで思い出を残せます。詳しいご相談はスタッフへお声がけください。',
              },
            ].map((scene, i) => (
              <Reveal as="li" key={scene.t} delay={i * 60} className="hairline pt-6">
                <h3 className="font-display text-[1.05rem] text-bordeaux">
                  {scene.t}
                </h3>
                <p className="mt-2 text-[0.88rem] leading-[1.95] text-ink-soft">
                  {scene.d}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 選ばれる理由 */}
      <section className="bg-ink py-16 text-ivory md:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionHeading eyebrow="Why alouette" tone="light">
              選ばれている、6つの理由。
            </SectionHeading>
          </Reveal>

          <ul className="mt-12 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {charms.map((charm, i) => (
              <Reveal as="li" key={charm.title} delay={i * 50}>
                <p className="font-latin text-[0.7rem] tracking-[0.28em] text-petal">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-[1.08rem] text-ivory">
                  {charm.title}
                </h3>
                <p className="mt-3 text-[0.86rem] leading-[1.95] text-ivory/75">
                  {charm.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 店舗の基本情報（内部リンク） */}
      <section className="bg-shell py-16 md:py-20">
        <div className="container-page">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <SectionHeading eyebrow="Information">
                お店の基本情報
              </SectionHeading>
              <p className="mt-6 text-[0.92rem] leading-[2] text-ink-soft">
                {store.name}（{store.nameJa}）／{store.category}
                <br />
                {store.address.full}
                <br />
                {store.businessHoursNote}／{store.access.walkText}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ActionLink href="/menu/" variant="outline">
                料金・メニュー
              </ActionLink>
              <ActionLink href="/first-guide/" variant="outline">
                初めての方へ
              </ActionLink>
              <ActionLink href="/shop/" variant="outline">
                アクセス
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
