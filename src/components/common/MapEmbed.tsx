'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  title: string;
  /** 高さを含むクラス（例: 'h-[320px] sm:h-[420px]'）。読み込み前後で高さが変わらないようにする */
  className?: string;
};

/**
 * Google マップの埋め込み。
 * iframe を最初から置くと、画面外でも Google マップのスクリプト（数百KB）が読み込まれ、
 * ページ表示が重くなる（loading="lazy" はかなり手前から読み込みを始めてしまう）。
 * そのため、地図の近くまでスクロールしたときに初めて iframe を差し込む。
 */
export default function MapEmbed({ src, title, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-lg border border-rose/15 bg-shell ${className}`}
    >
      {visible ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <p className="flex h-full items-center justify-center text-[0.8rem] text-ink-soft/70">
          地図を読み込んでいます…
        </p>
      )}
    </div>
  );
}
