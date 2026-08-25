'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { store } from '@/data/store';

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  /** 電話だけ配色を変えて主導線にする */
  accent?: boolean;
  /** 外部リンク（tel: など） */
  external?: boolean;
};

/**
 * スマートフォン下部の固定ナビゲーション。
 * 一番右は電話（来店予約の主導線）。求人応募と混同しないよう、求人はここに置きません。
 */
const items: NavItem[] = [
  {
    href: '/cast/',
    label: 'CAST',
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
      </>
    ),
  },
  {
    href: '/menu/',
    label: '料金',
    icon: (
      <>
        <path d="M5 3.5h14v17l-7-3.4L5 20.5z" />
        <path d="M9 9h6" />
      </>
    ),
  },
  {
    href: '/gallery/',
    label: '店内',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <circle cx="8.5" cy="10" r="1.6" />
        <path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" />
      </>
    ),
  },
  {
    href: '/shop/',
    label: 'アクセス',
    icon: (
      <>
        <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
  },
  {
    href: `tel:${store.telHref}`,
    label: '電話予約',
    external: true,
    accent: true,
    icon: (
      <path d="M5 4h3l2 5-2.4 1.4a12 12 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z" />
    ),
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="主要メニュー"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rose/15 bg-ivory/97 backdrop-blur-md lg:hidden"
      style={{ height: 'var(--mobile-nav-h)' }}
    >
      <ul className="grid h-full grid-cols-5">
        {items.map((item) => {
          const active = !item.external && pathname.startsWith(item.href);
          const cls = `flex flex-1 flex-col items-center justify-center gap-1 text-[0.62rem] tracking-[0.08em] transition ${
            item.accent
              ? 'bg-bordeaux text-ivory'
              : active
                ? 'text-rose'
                : 'text-ink-soft'
          }`;
          const inner = (
            <>
              <svg
                viewBox="0 0 24 24"
                className="h-[19px] w-[19px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
              <span>{item.label}</span>
            </>
          );

          return (
            <li key={item.href} className="flex">
              {item.external ? (
                <a href={item.href} className={cls}>
                  {inner}
                </a>
              ) : (
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cls}
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
