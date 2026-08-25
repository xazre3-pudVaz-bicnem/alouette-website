import type { ReactNode } from 'react';

type Props = {
  /** 英字ラベル（例: CONCEPT） */
  eyebrow?: string;
  /** 見出し本文 */
  children: ReactNode;
  /** 見出しレベル */
  as?: 'h2' | 'h3';
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  children,
  as: Tag = 'h2',
  align = 'left',
  tone = 'dark',
  className = '',
}: Props) {
  const isCenter = align === 'center';
  const isLight = tone === 'light';

  return (
    <div
      className={`${isCenter ? 'text-center' : ''} ${className}`}
    >
      {eyebrow ? (
        <p
          className={`eyebrow mb-4 ${
            isLight ? 'text-blush' : 'text-rose'
          } ${isCenter ? '' : 'flex items-center gap-3'}`}
        >
          {!isCenter ? (
            <span
              aria-hidden
              className={`inline-block h-px w-8 ${
                isLight ? 'bg-blush/70' : 'bg-rose/50'
              }`}
            />
          ) : null}
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={`font-display text-[1.65rem] leading-[1.55] tracking-[0.02em] sm:text-[2.05rem] ${
          isLight ? 'text-ivory' : 'text-bordeaux'
        }`}
      >
        {children}
      </Tag>
    </div>
  );
}
