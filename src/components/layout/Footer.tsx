import Image from 'next/image';
import Link from 'next/link';
import { navigation, siteConfig, utilityNavigation } from '@/config/site';
import { store } from '@/data/store';
import { tagline } from '@/data/concept';
import SocialLinks from '@/components/ui/SocialLinks';
import ReserveActions from '@/components/common/ReserveActions';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-petal/20 blur-3xl"
      />

      <div className="container-page relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <Image
              src={siteConfig.logoSquare}
              alt=""
              width={500}
              height={500}
              className="h-24 w-auto"
            />
            <p className="mt-5 font-display text-lg leading-relaxed text-blush">
              {tagline}
            </p>

            {/* NAP（全ページ共通の表記） */}
            <address className="mt-7 space-y-1.5 text-sm not-italic text-ivory/80">
              <p className="text-base text-ivory">
                {store.name}（{store.nameJa}）
              </p>
              <p>{store.address.full}</p>
              <p>
                <a
                  href={`tel:${store.telHref}`}
                  className="font-latin text-lg tracking-wide text-ivory hover:text-blush"
                >
                  TEL {store.tel}
                </a>
                <span className="ml-2 text-xs text-ivory/60">
                  {store.telHoursNote}
                </span>
              </p>
              <p>営業時間 {store.businessHours}／定休日 {store.closedDays}</p>
              <p>{store.access.walkText}</p>
            </address>

            <SocialLinks tone="light" className="mt-7" />
          </div>

          <div>
            <nav aria-label="フッターメニュー">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-sm">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-baseline gap-2.5 text-ivory/85 transition hover:text-blush"
                    >
                      <span className="font-latin text-[0.72rem] tracking-[0.18em] text-petal">
                        {item.label}
                      </span>
                      <span>{item.labelJa}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-10 rounded-lg border border-ivory/15 p-6">
              <p className="eyebrow text-blush">Reservation</p>
              <p className="mt-3 text-sm text-ivory/80">
                ご予約・お問い合わせはお電話またはXのDMで承っています。
              </p>
              <ReserveActions tone="light" className="mt-5" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/12 pt-7 text-xs text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {utilityNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-blush">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="font-latin tracking-[0.12em]">
            © {year} {siteConfig.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
