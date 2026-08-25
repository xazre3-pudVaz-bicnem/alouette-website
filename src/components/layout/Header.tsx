'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navigation, siteConfig, utilityNavigation } from '@/config/site';
import { store } from '@/data/store';
import SocialLinks from '@/components/ui/SocialLinks';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /** トップの最上部だけ透過、それ以外は白背景 */
  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-ivory/95 shadow-[0_1px_0_rgba(194,65,107,0.14)] backdrop-blur-md'
      }`}
      style={{ height: 'var(--header-h)' }}
    >
      <div className="container-page flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${siteConfig.name}（${siteConfig.nameJa}）トップページ`}
        >
          <Image
            src={siteConfig.logo}
            alt=""
            width={478}
            height={364}
            priority
            className="h-9 w-auto sm:h-10"
          />
          <span className="sr-only">
            {siteConfig.name}（{siteConfig.nameJa}）
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${store.telHref}`}
            className={`hidden items-center gap-2 text-sm tracking-wide transition sm:flex ${
              transparent ? 'text-ivory hover:text-blush' : 'text-bordeaux hover:text-rose'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M5 4h3l2 5-2.4 1.4a12 12 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z" />
            </svg>
            <span className="font-latin text-[0.95rem]">{store.tel}</span>
          </a>

          <Link
            href="/contact/"
            className="rounded-full bg-bordeaux px-4 py-2 text-[0.8rem] font-medium tracking-[0.08em] text-ivory transition hover:bg-rose sm:px-5 sm:text-[0.85rem]"
          >
            WEB予約
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="global-menu"
            aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
            className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border transition ${
              transparent
                ? 'border-ivory/50 text-ivory'
                : 'border-rose/30 text-bordeaux'
            }`}
          >
            <span
              className={`block h-px w-4 bg-current transition-transform duration-300 ${
                open ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-4 bg-current transition-transform duration-300 ${
                open ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* ドロワーメニュー */}
      <div
        id="global-menu"
        hidden={!open}
        className="fixed inset-0 top-[var(--header-h)] overflow-y-auto bg-ivory"
      >
        {/* リンクを押したらドロワーを閉じる（クリックを親でまとめて受ける） */}
        <nav
          aria-label="サイト内メニュー"
          onClick={() => setOpen(false)}
          className="container-page pt-8 pb-[calc(var(--mobile-nav-h)+3rem)]"
        >
          <ul className="grid gap-px overflow-hidden rounded-lg border border-rose/15 bg-rose/15 sm:grid-cols-2">
            {navigation.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-baseline gap-4 bg-ivory px-5 py-4 transition hover:bg-shell ${
                      active ? 'bg-shell' : ''
                    }`}
                  >
                    <span className="font-latin text-[0.95rem] tracking-[0.2em] text-rose">
                      {item.label}
                    </span>
                    <span className="text-[0.9rem] text-ink-soft">
                      {item.labelJa}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 rounded-lg bg-shell px-6 py-6">
            <p className="font-display text-lg text-bordeaux">
              {store.name}（{store.nameJa}）
            </p>
            <p className="mt-2 text-sm text-ink-soft">{store.address.full}</p>
            <p className="text-sm text-ink-soft">
              {store.businessHoursNote}／{store.access.walkText}
            </p>
            <a
              href={`tel:${store.telHref}`}
              className="mt-4 inline-flex items-baseline gap-3 text-bordeaux"
            >
              <span className="font-latin text-2xl tracking-wide">
                {store.tel}
              </span>
              <span className="text-xs text-ink-soft">{store.telHoursNote}</span>
            </a>
            <SocialLinks className="mt-5" size="sm" />
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-soft">
            {utilityNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-rose">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
