import Image from 'next/image';
import Link from 'next/link';
import { isPhotoPending, type Cast } from '@/data/casts';
import { getNextShift } from '@/lib/schedule';
import { formatDateJa } from '@/lib/date';

type Props = { cast: Cast; priority?: boolean };

export default function CastCard({ cast, priority = false }: Props) {
  const nextShift = cast.isDummy ? undefined : getNextShift(cast.slug);
  const photoPending = isPhotoPending(cast);

  const inner = (
    <>
      <div className="relative aspect-4/5 overflow-hidden bg-shell">
        <Image
          src={cast.mainImage}
          alt={
            photoPending
              ? `${cast.name}の写真は準備中です`
              : `${cast.name}のプロフィール写真`
          }
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          priority={priority}
          style={{ objectPosition: cast.imagePosition ?? 'center' }}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        {cast.isDummy || photoPending ? (
          <span className="absolute top-3 left-3 rounded-full bg-ivory/90 px-3 py-1 text-[0.68rem] tracking-[0.12em] text-rose">
            写真準備中
          </span>
        ) : null}
        {nextShift ? (
          <span className="absolute right-0 bottom-0 bg-bordeaux/90 px-3 py-1.5 text-[0.7rem] tracking-[0.06em] text-ivory">
            次回 {formatDateJa(nextShift.date)} {nextShift.start}〜
          </span>
        ) : null}
      </div>

      <div className="px-1 pt-4 pb-1">
        <p className="font-display text-lg text-bordeaux">{cast.name}</p>
        {cast.catchphrase ? (
          <p className="mt-1 line-clamp-2 text-[0.8rem] leading-relaxed text-ink-soft">
            {cast.catchphrase}
          </p>
        ) : null}
        {!cast.isDummy && cast.birthday ? (
          <p className="mt-2 font-latin text-[0.72rem] tracking-[0.14em] text-rose">
            BIRTHDAY {cast.birthday}
          </p>
        ) : null}
      </div>
    </>
  );

  if (cast.isDummy) {
    return (
      <article className="group block" aria-label="キャスト情報準備中">
        {inner}
      </article>
    );
  }

  return (
    <article>
      <Link href={`/cast/${cast.slug}/`} className="group block">
        {inner}
      </Link>
    </article>
  );
}
