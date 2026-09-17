import Image from 'next/image';

/**
 * 店舗から届いたメニューポスター。
 * タップすると原寸の画像を新しいタブで開きます（文字を読みやすくするため）。
 */
export default function MenuPoster({
  src,
  width,
  height,
  alt,
  sizes = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  className = '',
  uniform = false,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes?: string;
  className?: string;
  /**
   * 並べたときに高さをそろえる。縦横比の違うポスターも切らずに
   * 同じ大きさの枠へ収める（価格が切れないよう object-contain）。
   */
  uniform?: boolean;
}) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener"
      className={`group block overflow-hidden rounded-lg shadow-[0_18px_40px_-24px_rgba(90,20,50,0.45)] ${className}`}
    >
      {uniform ? (
        <span className="relative block aspect-[5/7] bg-blush/40">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-contain transition duration-500 group-hover:scale-[1.02]"
          />
        </span>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="h-auto w-full transition duration-500 group-hover:scale-[1.02]"
        />
      )}
      <span className="sr-only">（画像を拡大表示）</span>
    </a>
  );
}
