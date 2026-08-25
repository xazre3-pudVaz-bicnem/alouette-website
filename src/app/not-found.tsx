import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

import { navigation } from '@/config/site';
import { store } from '@/data/store';

export const metadata: Metadata = {
  title: 'ページが見つかりません｜相模原のコンカフェ alouette',
  description:
    'お探しのページは見つかりませんでした。URLが変更されたか、削除された可能性があります。',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-ink text-ivory">
      <Image
        src="/images/store/store-interior-02.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-ink/92 via-bordeaux/70 to-ink/95"
      />

      <div className="container-page relative py-24 text-center">
        <p className="font-latin text-[3.5rem] leading-none tracking-[0.1em] text-petal sm:text-[5rem]">
          404
        </p>
        <h1 className="mt-6 font-display text-[1.5rem] leading-snug sm:text-[2rem]">
          お探しのページが見つかりませんでした
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[0.9rem] leading-[2] text-ivory/80">
          URLが変更されたか、削除された可能性があります。
          下のメニューから、お目当てのページをお探しください。
        </p>

        <nav aria-label="主なページ" className="mx-auto mt-10 max-w-2xl">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block rounded-full border border-ivory/35 px-5 py-2 text-[0.82rem] transition hover:bg-ivory hover:text-bordeaux"
                >
                  {item.labelJa}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-10 text-[0.8rem] text-ivory/60">
          お急ぎの場合はお電話ください：
          <a
            href={`tel:${store.telHref}`}
            className="ml-1 font-latin text-ivory underline underline-offset-4"
          >
            {store.tel}
          </a>
          （受付 {store.telHours}・{store.closedDays}定休）
        </p>
      </div>
    </section>
  );
}
