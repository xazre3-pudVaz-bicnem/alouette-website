import type { ReactNode } from 'react';

type Props = {
  /** 英字ラベル */
  eyebrow: string;
  /** H1 */
  title: ReactNode;
  /** リード文 */
  lead?: ReactNode;
};

/**
 * 下層ページ共通の見出しブロック。
 * 装飾は罫線と淡いグラデーションのみに抑え、写真は各ページ側で扱います。
 */
export default function PageHeader({ eyebrow, title, lead }: Props) {
  return (
    <header className="relative overflow-hidden border-b border-rose/12 bg-shell">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blush/60 blur-3xl"
      />
      <div className="container-page relative py-14 md:py-20">
        <p className="eyebrow text-rose">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-[1.75rem] leading-[1.5] text-bordeaux sm:text-[2.3rem]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-[0.95rem] leading-[2] text-ink-soft">
            {lead}
          </p>
        ) : null}
      </div>
    </header>
  );
}
