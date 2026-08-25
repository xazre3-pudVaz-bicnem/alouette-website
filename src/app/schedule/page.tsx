import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactCta from '@/components/common/ContactCta';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SocialLinks from '@/components/ui/SocialLinks';
import CastCard from '@/components/cast/CastCard';
import { ScheduleDay, NoScheduleNote } from '@/components/schedule/ScheduleList';
import { getTodaySchedule, getWeeklySchedule } from '@/lib/schedule';
import { formatDateJa } from '@/lib/date';
import { store } from '@/data/store';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '出勤情報｜相模原のコンカフェ alouette',
  description:
    '相模原のコンカフェ alouette（あるえっと）の本日の出勤キャストと週間出勤予定です。小田急相模原駅から徒歩4分。営業時間は18:00〜23:00、日曜定休。お目当ての女の子の出勤日をチェックしてご来店ください。',
  path: '/schedule/',
});

/** 日付が変わったら反映されるよう1時間ごとに再生成 */
export const revalidate = 3600;

export default function SchedulePage() {
  const today = getTodaySchedule();
  const week = getWeeklySchedule(7);
  const upcoming = week.slice(1);

  return (
    <>
      <PageHeader
        eyebrow="Schedule"
        title="出勤情報"
        lead={`本日の出勤キャストと、これから1週間の出勤予定です。営業時間は${store.businessHours}（${store.closedDays}定休）。`}
      />
      <Breadcrumbs items={[{ name: '出勤情報', path: '/schedule/' }]} />

      {/* 本日の出勤 */}
      <section className="bg-ivory py-12 md:py-16">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Today">
              本日の出勤
              <span className="ml-3 font-latin text-base tracking-[0.1em] text-rose">
                {formatDateJa(today.date)}
              </span>
            </SectionHeading>
          </Reveal>

          <Reveal className="mt-8" delay={60}>
            {today.entries.length > 0 ? (
              <ul className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
                {today.entries.map((e) => (
                  <li key={`${e.castSlug}-${e.start}`}>
                    <CastCard cast={e.cast} priority />
                    <p className="mt-2 font-latin text-[0.82rem] tracking-[0.08em] text-rose">
                      {e.start} — {e.end}
                    </p>
                    {e.note ? (
                      <p className="text-[0.75rem] text-ink-soft">{e.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-lg border border-dashed border-rose/30 bg-shell px-6 py-10 text-center">
                <NoScheduleNote isClosed={today.isClosed} />
                <SocialLinks className="mt-6 justify-center" size="sm" />
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* 週間出勤予定 */}
      <section className="border-t border-rose/12 bg-shell py-12 md:py-16">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="This Week">週間出勤予定</SectionHeading>
            <p className="mt-5 text-[0.9rem] leading-[1.95] text-ink-soft">
              明日以降の出勤予定です。急な変更が入る場合があるため、当日の最新情報はSNSもあわせてご確認ください。
            </p>
          </Reveal>

          <Reveal className="mt-8" delay={60}>
            <div className="divide-y divide-rose/12 overflow-hidden rounded-lg border border-rose/15">
              {upcoming.map((day) => (
                <ScheduleDay key={day.date} day={day} highlightToday={false} />
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-8 text-center" delay={100}>
            <p className="text-[0.85rem] text-ink-soft">
              出勤情報の最新版はSNSでも更新しています。
            </p>
            <SocialLinks className="mt-5 justify-center" size="sm" />
          </Reveal>
        </div>
      </section>

      <ContactCta
        heading="出勤日に合わせて、ご予約を。"
        lead="お目当ての女の子が決まっていれば、ご予約時にお知らせください。"
      />
    </>
  );
}
