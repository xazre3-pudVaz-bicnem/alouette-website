import { publishedCasts, type Cast } from '@/data/casts';
import { schedules, CLOSED_WEEKDAY, type ScheduleEntry } from '@/data/schedules';
import { todayJst, upcomingDates, weekdayIndex } from '@/lib/date';

export type ScheduleWithCast = ScheduleEntry & { cast: Cast };

export type DaySchedule = {
  date: string;
  isClosed: boolean;
  entries: ScheduleWithCast[];
};

const castMap = (): Map<string, Cast> =>
  new Map(publishedCasts().map((c) => [c.slug, c]));

/** 指定日の出勤（キャスト情報を結合。未登録キャストの行は除外） */
export const getScheduleFor = (isoDate: string): ScheduleWithCast[] => {
  const map = castMap();
  return schedules
    .filter((s) => s.date === isoDate)
    .map((s) => {
      const cast = map.get(s.castSlug);
      return cast ? { ...s, cast } : null;
    })
    .filter((s): s is ScheduleWithCast => s !== null)
    .sort((a, b) => a.start.localeCompare(b.start));
};

/** 本日（JST）の出勤 */
export const getTodaySchedule = (): DaySchedule => {
  const date = todayJst();
  return {
    date,
    isClosed: weekdayIndex(date) === CLOSED_WEEKDAY,
    entries: getScheduleFor(date),
  };
};

/** 今日から days 日分の出勤予定（過去の日付は含まない） */
export const getWeeklySchedule = (days = 7): DaySchedule[] =>
  upcomingDates(days).map((date) => ({
    date,
    isClosed: weekdayIndex(date) === CLOSED_WEEKDAY,
    entries: getScheduleFor(date),
  }));

/** 特定キャストの今後の出勤予定 */
export const getUpcomingForCast = (
  slug: string,
  days = 14,
): ScheduleEntry[] => {
  const dates = new Set(upcomingDates(days));
  return schedules
    .filter((s) => s.castSlug === slug && dates.has(s.date))
    .sort((a, b) => a.date.localeCompare(b.date));
};

/** 次回出勤日（一覧カード用）。なければ undefined */
export const getNextShift = (slug: string): ScheduleEntry | undefined =>
  getUpcomingForCast(slug, 30)[0];
