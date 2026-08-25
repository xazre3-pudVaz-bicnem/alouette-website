import Image from 'next/image';
import ReserveActions from '@/components/common/ReserveActions';
import Reveal from '@/components/ui/Reveal';
import { focusOf } from '@/data/visuals';

/**
 * 各ページ末尾のご予約導線。
 * 連絡手段はお電話とXのDMの2つに集約しています（WEBフォームは用意していません）。
 */
export default function ContactCta({
  heading = '今夜、会いにきてください。',
  lead = 'ご予約はお電話またはXのDMから。当日のご来店も歓迎です。',
  image = '/images/visual/counter-neon.jpg',
}: {
  heading?: string;
  lead?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        style={{ objectPosition: focusOf(image) }}
        className="object-cover opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-ink/90 via-bordeaux/70 to-ink/95"
      />

      <div className="container-page relative py-20 text-center md:py-28">
        <Reveal>
          <p className="eyebrow text-blush">Reservation &amp; Contact</p>
          <h2 className="mt-5 font-display text-[1.7rem] leading-[1.5] sm:text-[2.3rem]">
            {heading}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[0.9rem] leading-[2] text-ivory/80">
            {lead}
          </p>

          <ReserveActions
            tone="light"
            size="lg"
            className="mx-auto mt-10 max-w-lg text-left sm:text-center"
          />
        </Reveal>
      </div>
    </section>
  );
}
