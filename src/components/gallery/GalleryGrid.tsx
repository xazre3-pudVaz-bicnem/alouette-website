'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  galleryCategories,
  type GalleryCategory,
  type GalleryImage,
} from '@/data/gallery';

/**
 * カテゴリ絞り込み＋ライトボックス付きのギャラリー。
 * 追加のライブラリは使わず、ダイアログ相当のマークアップを自前で組んでいます。
 */
export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [category, setCategory] = useState<GalleryCategory>('すべて');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      category === 'すべて'
        ? images
        : images.filter((img) => img.category === category),
    [images, category],
  );

  /** 実際に写真があるカテゴリだけタブに出す */
  const availableCategories = useMemo(
    () =>
      galleryCategories.filter(
        (c) => c === 'すべて' || images.some((img) => img.category === c),
      ),
    [images],
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const move = useCallback(
    (delta: number) =>
      setOpenIndex((i) =>
        i === null ? null : (i + delta + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, close, move]);

  const current = openIndex === null ? null : visible[openIndex];

  return (
    <>
      {availableCategories.length > 2 ? (
        <div
          role="tablist"
          aria-label="ギャラリーのカテゴリ"
          className="flex flex-wrap gap-2"
        >
          {availableCategories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => {
                setCategory(c);
                setOpenIndex(null);
              }}
              className={`rounded-full border px-5 py-2 text-[0.8rem] tracking-[0.06em] transition ${
                category === c
                  ? 'border-bordeaux bg-bordeaux text-ivory'
                  : 'border-rose/30 text-rose hover:bg-shell'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((img, i) => (
          <li key={img.src} className="relative">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-lg bg-shell"
              aria-label={`${img.alt} を拡大表示`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                loading={i < 4 ? 'eager' : 'lazy'}
                className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
              />
              {img.isPlaceholder || img.isIllustration ? (
                <span className="absolute top-2 left-2 rounded-full bg-ivory/90 px-2.5 py-0.5 text-[0.62rem] tracking-[0.08em] text-rose">
                  {img.isPlaceholder ? '準備中' : 'イメージ'}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="mt-8 text-center text-sm text-ink-soft">
          このカテゴリの写真は準備中です。
        </p>
      ) : null}

      {/* ライトボックス */}
      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="閉じる"
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/40 text-ivory transition hover:bg-ivory/10"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {visible.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  move(-1);
                }}
                aria-label="前の写真"
                className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/40 text-ivory transition hover:bg-ivory/10 sm:left-6"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  move(1);
                }}
                aria-label="次の写真"
                className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/40 text-ivory transition hover:bg-ivory/10 sm:right-6"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          ) : null}

          <figure
            className="max-h-full w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto aspect-square max-h-[74svh] w-full">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 768px) 720px, 92vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 text-center text-[0.82rem] text-ivory/75">
              {current.alt}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
