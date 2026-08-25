'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type NavItem = {
  href: string;
  label: string;
  sub: string;
  icon: ReactNode;
  /** 予約だけ配色を変えて主導線にする */
  accent?: boolean;
};

/**
 * スマートフォン下部の固定ナビゲーション。
 * 求人応募は来店予約と混同しないよう、ここには置かず /recruit/ 側に導線を用意しています。
 */
const items: NavItem[] = [
  {
    href: '/cast/',
    label: 'CAST',
    sub: '女の子',
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
      </>
    ),
  },
  {
    href: '/schedule/',
    label: '出勤',
    sub: '出勤情報',
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
      </>
    ),
  },
  {
    href: '/menu/',
    label: '料金',
    sub: 'メニュー',
    icon: (
      <>
        <path d="M5 3.5h14v17l-7-3.4L5 20.5z" />
        <path d="M9 9h6" />
      </>
    ),
  },
  {
    href: '/shop/',
    label: 'アクセス',
    sub: '店舗情報',
    icon: (
      <>
        <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
  },
  {
    href: '/contact/',
    label: '予約',
    sub: 'ご予約',
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="m3.8 7 8.2 6 8.2-6" />
      </>
    ),
    accent: true,
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
          const active = pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-1 flex-col items-center justify-center gap-1 text-[0.62rem] tracking-[0.08em] transition ${
                  item.accent
                    ? 'bg-bordeaux text-ivory'
                    : active
                      ? 'text-rose'
                      : 'text-ink-soft'
                }`}
              >
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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
