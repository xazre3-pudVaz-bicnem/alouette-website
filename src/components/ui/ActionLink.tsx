import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost' | 'light';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-medium tracking-[0.08em] transition duration-300 ease-out';

const variants: Record<Variant, string> = {
  primary:
    'bg-bordeaux text-ivory shadow-soft hover:bg-rose hover:shadow-lift focus-visible:bg-rose',
  outline:
    'border border-rose/45 text-bordeaux hover:border-rose hover:bg-shell',
  ghost: 'text-bordeaux underline underline-offset-[6px] hover:text-rose',
  light:
    'border border-ivory/60 bg-ivory/10 text-ivory backdrop-blur-sm hover:bg-ivory hover:text-bordeaux',
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** 外部リンク（新規タブ） */
  external?: boolean;
  ariaLabel?: string;
};

export default function ActionLink({
  href,
  children,
  variant = 'primary',
  className = '',
  external = false,
  ariaLabel,
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (external || href.startsWith('tel:') || href.startsWith('http')) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
