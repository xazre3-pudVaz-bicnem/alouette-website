import { store } from '@/data/store';
import { socialLinks } from '@/config/site';
import { formatDateJa, todayJst, weekdayIndex } from '@/lib/date';

/** 日曜定休 */
const CLOSED_WEEKDAY = 0;

/**
 * ヒーロー直下の「本日の営業情報」。
 * ここが最初の予約導線になります（ヒーロー上にはボタンを置かない方針）。
 */
export default function TodayBar() {
  const today = todayJst();
  const isClosed = weekdayIndex(today) === CLOSED_WEEKDAY;

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
                  isClosed ? 'bg-ink-soft/40' : 'twinkle bg-petal'
                }`}
              />
              Today
            </h2>

            <p className="text-[0.9rem] text-ink-soft">
              <span className="text-bordeaux">{formatDateJa(today)}</span>
              <span className="mx-2 text-rose/40">|</span>
              {isClosed ? (
                <span>本日は定休日です（日曜定休）</span>
              ) : (
                <>
                  <span className="text-bordeaux">
                    {store.businessHours} 営業
                  </span>
                  <span className="mx-2 text-rose/40">|</span>
                  <span>ご予約はお電話で承ります</span>
                </>
              )}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <a
              href={`tel:${store.telHref}`}
              className="flex items-center justify-center gap-3 rounded-full bg-bordeaux px-7 py-3.5 text-ivory transition hover:bg-rose"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M5 4h3l2 5-2.4 1.4a12 12 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z" />
              </svg>
              <span className="font-latin text-[1.05rem] tracking-[0.04em]">
                {store.tel}
              </span>
              <span className="text-[0.68rem] text-blush">
                受付 {store.telHours}
              </span>
            </a>

            {socialLinks.x ? (
              <a
                href={socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-full border border-rose/35 px-6 py-3.5 text-[0.88rem] text-bordeaux transition hover:bg-shell"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[15px] w-[15px]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4 3.5h4l4.3 6 5-6H20l-6.6 7.9L20.5 20.5h-4l-4.6-6.4-5.4 6.4H4.4l7-8.3z" />
                </svg>
                XのDMで相談
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
