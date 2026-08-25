import { activeSocialLinks, type SocialKey } from '@/config/site';

const LABEL: Record<SocialKey, string> = {
  instagram: 'Instagram',
  x: 'X（旧Twitter）',
  line: 'LINE',
  tiktok: 'TikTok',
};

const ICON: Record<SocialKey, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  x: <path d="M4 3.5h4l4.3 6 5-6H20l-6.6 7.9L20.5 20.5h-4l-4.6-6.4-5.4 6.4H4.4l7-8.3z" />,
  line: (
    <>
      <path d="M21 10.4c0-4-4-7.2-9-7.2S3 6.4 3 10.4c0 3.6 3.2 6.6 7.5 7.1.3.1.7.2.8.5.1.3 0 .7 0 .9l-.1.8c0 .3-.2 1 .9.6s5.9-3.5 8-6c1.4-1.5 1.9-3 1.9-3.9z" />
    </>
  ),
  tiktok: (
    <path d="M15 3.5v9.6a3.4 3.4 0 1 1-2.8-3.3v2.6a1 1 0 1 0 .8 1V3.5H15c.3 1.9 1.6 3.2 3.6 3.4v2.4A6.2 6.2 0 0 1 15 8z" />
  ),
};

type Props = {
  tone?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md';
};

/**
 * SNS ボタン。
 * config/site.ts の socialLinks に URL が入っているものだけを表示します。
 */
export default function SocialLinks({
  tone = 'dark',
  className = '',
  size = 'md',
}: Props) {
  if (activeSocialLinks.length === 0) return null;

  const dim = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const toneCls =
    tone === 'light'
      ? 'border-ivory/40 text-ivory hover:bg-ivory hover:text-bordeaux'
      : 'border-rose/30 text-rose hover:bg-rose hover:text-ivory';

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {activeSocialLinks.map(({ key, url }) => (
        <li key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${LABEL[key]}（外部サイトが開きます）`}
            className={`flex ${dim} items-center justify-center rounded-full border transition duration-300 ${toneCls}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill={key === 'instagram' ? 'none' : 'currentColor'}
              stroke={key === 'instagram' ? 'currentColor' : 'none'}
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {ICON[key]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
