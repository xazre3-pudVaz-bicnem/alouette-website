import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactCta from '@/components/common/ContactCta';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Reveal from '@/components/ui/Reveal';
import { galleryImages } from '@/data/gallery';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '店内・ギャラリー｜相模原のコンカフェ alouette',
  description:
    '相模原のコンカフェ alouette（あるえっと）の店内写真をご紹介します。カウンター席、テーブル席、ピンクのネオンなど、ご来店前に雰囲気をご確認ください。小田急相模原駅から徒歩4分。',
  path: '/gallery/',
});

export default function GalleryPage() {
  const illustrationCount = galleryImages.filter(
    (i) => i.isIllustration,
  ).length;

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="店内・ギャラリー"
        lead="ご来店前に、alouetteの雰囲気をご覧ください。写真をタップすると拡大表示されます。"
      />
      <Breadcrumbs items={[{ name: '店内・ギャラリー', path: '/gallery/' }]} />

      <section className="bg-ivory py-12 md:py-16">
        <div className="container-page">
          <Reveal>
            <GalleryGrid images={galleryImages} />
          </Reveal>

          {illustrationCount > 0 ? (
            <Reveal className="mt-12 rounded-lg border border-dashed border-rose/30 bg-shell px-6 py-6 text-center">
              <p className="text-[0.85rem] leading-[1.95] text-ink-soft">
                「イメージ」と表示されているものは、お店の世界観を表したイラストです（実際の店内写真ではありません）。
                最新の店内やイベントの様子は公式SNSでもご覧いただけます。
              </p>
            </Reveal>
          ) : null}
        </div>
      </section>

      <ContactCta
        heading="写真で気になったら、ぜひ実際に。"
        lead="ご予約はお電話またはWEBフォームから承っています。"
      />
    </>
  );
}
