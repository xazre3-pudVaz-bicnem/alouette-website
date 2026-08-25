import { store } from '@/data/store';
import { socialLinks } from '@/config/site';

type Tone = 'dark' | 'light';

/**
 * ご予約・お問い合わせの導線。
 * 当店はWEBフォームを設けていないため、お電話とX（旧Twitter）のDMに集約しています。
 * 文言・電話番号は data/store.ts と config/site.ts から取得します。
 */
export default function ReserveActions({
  tone = 'dark',
  className = '',
  size = 'md',
}: {
  tone?: Tone;
  className?: string;
  size?: 'md' | 'lg';
}) {
  const isLight = tone === 'light';
  const pad = size === 'lg' ? 'px-8 py-4.5' : 'px-7 py-4';

  const telCls = isLight
    ? 'bg-ivory text-bordeaux hover:bg-blush'
    : 'bg-bordeaux text-ivory hover:bg-rose';
  const xCls = isLight
    ? 'border border-ivory/50 text-ivory hover:bg-ivory/10'
    : 'border border-rose/40 text-bordeaux hover:bg-shell';

  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={`tel:${store.telHref}`}
          className={`flex flex-1 items-center justify-center gap-3 rounded-full ${pad} transition ${telCls}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M5 4h3l2 5-2.4 1.4a12 12 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z" />
          </svg>
          <span className="font-latin text-[1.15rem] tracking-[0.04em]">
            {store.tel}
          </span>
        </a>

        {socialLinks.x ? (
          <a
            href={socialLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-1 items-center justify-center gap-3 rounded-full ${pad} text-[0.95rem] tracking-[0.04em] transition ${xCls}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[16px] w-[16px]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4 3.5h4l4.3 6 5-6H20l-6.6 7.9L20.5 20.5h-4l-4.6-6.4-5.4 6.4H4.4l7-8.3z" />
            </svg>
            XのDMで相談する
          </a>
        ) : null}
      </div>

      <p
        className={`mt-4 text-[0.78rem] leading-[1.85] ${
          isLight ? 'text-ivory/65' : 'text-ink-soft/80'
        }`}
      >
        お電話の受付時間は{store.telHours}（{store.closedDays}定休）です。
        {socialLinks.x
          ? '営業時間外や、電話が苦手な方はXのDMからお気軽にどうぞ（24時間受付）。'
          : ''}
      </p>
    </div>
  );
}
