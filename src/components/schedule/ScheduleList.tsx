import Image from 'next/image';
import Link from 'next/link';
import type { DaySchedule } from '@/lib/schedule';
import { formatDateJa, todayJst } from '@/lib/date';
import { activeSocialLinks } from '@/config/site';

/** 出勤が登録されていないときの案内文 */
export function NoScheduleNote({ isClosed }: { isClosed: boolean }) {
  const sns = activeSocialLinks[0];
  if (isClosed) {
    return (
      <p className="text-sm text-ink-soft">
        本日は定休日（日曜）です。次の営業日にお会いしましょう。
      </p>
    );
  }
  return (
    <p className="text-sm text-ink-soft">
      本日の出勤情報は
      {sns ? (
        <>
          <a
            href={sns.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-rose underline underline-offset-4"
          >
            SNS
          </a>
        </>
      ) : (
        'SNS'
      )}
      をご確認ください。
    </p>
  );
}

function CastRow({
  slug,
  name,
  image,
  start,
  end,
  note,
  isDummy,
}: {
  slug: string;
  name: string;
  image: string;
  start: string;
  end: string;
  note?: string;
  isDummy?: boolean;
}) {
  const body = (
    <>
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-shell">
        <Image
          src={image}
          alt=""
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="truncate font-display text-[1.05rem] text-bordeaux">
          {name}
        </p>
        <p className="font-latin text-[0.85rem] tracking-[0.08em] text-rose">
          {start} — {end}
        </p>
        {note ? (
          <p className="text-[0.75rem] text-ink-soft">{note}</p>
        ) : null}
      </div>
    </>
  );

  if (isDummy) {
    return <div className="flex items-center gap-4">{body}</div>;
  }

  return (
    <Link
      href={`/cast/${slug}/`}
      className="flex items-center gap-4 transition hover:opacity-80"
    >
      {body}
    </Link>
  );
}

/** 1日分の出勤ブロック */
export function ScheduleDay({
  day,
  highlightToday = true,
}: {
  day: DaySchedule;
  highlightToday?: boolean;
}) {
  const isToday = highlightToday && day.date === todayJst();

  return (
    <section
      className={`px-5 py-6 sm:px-7 ${isToday ? 'bg-shell' : 'bg-ivory'}`}
      aria-label={`${formatDateJa(day.date)}の出勤`}
    >
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-[1.05rem] text-bordeaux">
          {formatDateJa(day.date)}
        </h3>
        {isToday ? (
          <span className="rounded-full bg-bordeaux px-2.5 py-0.5 text-[0.65rem] tracking-[0.1em] text-ivory">
            TODAY
          </span>
        ) : null}
        {day.isClosed ? (
          <span className="text-[0.72rem] tracking-[0.08em] text-rose">
            定休日
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        {day.entries.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {day.entries.map((e) => (
              <li key={`${e.castSlug}-${e.start}`}>
                <CastRow
                  slug={e.cast.slug}
                  name={e.cast.name}
                  image={e.cast.mainImage}
                  start={e.start}
                  end={e.end}
                  note={e.note}
                  isDummy={e.cast.isDummy}
                />
              </li>
            ))}
          </ul>
        ) : day.isClosed ? (
          <p className="text-sm text-ink-soft">定休日のためお休みです。</p>
        ) : (
          <p className="text-sm text-ink-soft">
            出勤情報は準備でき次第、SNSでお知らせします。
          </p>
        )}
      </div>
    </section>
  );
}
