import Link from 'next/link';
import Image from 'next/image';
import { store } from '@/data/store';
import SocialLinks from '@/components/ui/SocialLinks';
import Reveal from '@/components/ui/Reveal';

/**
 * 各ページ末尾の予約・問い合わせ導線。
 * 求人応募とは分けて表示します（求人は /recruit/ 側の導線を使用）。
 */
export default function ContactCta({
  heading = '今夜、会いにきてください。',
  lead = 'ご予約はお電話またはWEBフォームから。当日のご来店も歓迎です。',
}: {
  heading?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <Image
        src="/images/store/store-interior-01.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
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

          <div className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <Link
              href="/contact/"
              className="flex-1 rounded-full bg-ivory px-7 py-4 text-[0.95rem] tracking-[0.06em] text-bordeaux transition hover:bg-blush"
            >
              WEBで予約・問い合わせ
            </Link>
            <a
              href={`tel:${store.telHref}`}
              className="flex-1 rounded-full border border-ivory/50 px-7 py-4 text-[0.95rem] tracking-[0.06em] transition hover:bg-ivory/10"
            >
              <span className="font-latin">{store.tel}</span>
            </a>
          </div>

          <p className="mt-4 text-[0.75rem] text-ivory/60">
            お電話の受付時間 {store.telHours}（日曜定休）／WEBフォームは24時間受付
          </p>

          <SocialLinks tone="light" className="mt-10 justify-center" />
        </Reveal>
      </div>
    </section>
  );
}
