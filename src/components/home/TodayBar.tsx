import Link from 'next/link';
import { store } from '@/data/store';
import { formatDateJa } from '@/lib/date';
import { getTodaySchedule } from '@/lib/schedule';

/**
 * ヒーロー直下の「本日の営業情報」。
 * ここが最初の予約導線になります（ヒーロー上にはボタンを置かない方針）。
 */
export default function TodayBar() {
  const today = getTodaySchedule();

  return (
    <section
      aria-labelledby="today-heading"
      className="relative z-20 border-b border-rose/12 bg-ivory"
    >
      <div className="container-page py-6 md:py-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <h2
              id="today-heading"
              className="eyebrow flex items-center gap-2.5 text-rose"
            >
              <span
                aria-hidden
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  today.isClosed ? 'bg-ink-soft/40' : 'twinkle bg-petal'
                }`}
              />
              Today
            </h2>

            <p className="text-[0.9rem] text-ink-soft">
              <span className="text-bordeaux">{formatDateJa(today.date)}</span>
              <span className="mx-2 text-rose/40">|</span>
              {today.isClosed ? (
                <span className="text-ink-soft">
                  本日は定休日です（日曜定休）
                </span>
              ) : (
                <>
                  <span className="text-bordeaux">
                    {store.businessHours} 営業
                  </span>
                  <span className="mx-2 text-rose/40">|</span>
                  {today.entries.length > 0 ? (
                    <Link
                      href="/schedule/"
                      className="text-rose underline underline-offset-4"
                    >
                      本日の出勤キャスト {today.entries.length}名
                    </Link>
                  ) : (
                    <span>出勤情報はSNSをご確認ください</span>
                  )}
                </>
              )}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <a
              href={`tel:${store.telHref}`}
              className="group flex items-center justify-center gap-3 rounded-full border border-rose/30 px-6 py-3 transition hover:border-rose hover:bg-shell"
            >
              <span className="font-latin text-[1.05rem] tracking-[0.06em] text-bordeaux">
                {store.tel}
              </span>
              <span className="text-[0.68rem] text-ink-soft">
                {store.telHoursNote}
              </span>
            </a>
            <Link
              href="/contact/"
              className="rounded-full bg-bordeaux px-8 py-3.5 text-center text-[0.9rem] tracking-[0.08em] text-ivory transition hover:bg-rose"
            >
              WEBで予約する
              <span className="ml-2 text-[0.7rem] text-blush">24時間受付</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
