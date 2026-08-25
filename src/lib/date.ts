/**
 * 日付ユーティリティ（すべて日本時間 JST 基準）。
 * サーバー側の実行環境が UTC でも正しく「今日」を判定できるようにしています。
 */

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

/** 日本時間の現在日時 */
export const nowJst = (): Date => new Date(Date.now() + JST_OFFSET_MS);

/** Date → 'YYYY-MM-DD'（UTC ゲッタを使うので JST 補正済みの Date を渡すこと） */
export const toIsoDate = (d: Date): string => d.toISOString().slice(0, 10);

/** 日本時間の今日（YYYY-MM-DD） */
export const todayJst = (): string => toIsoDate(nowJst());

/** 'YYYY-MM-DD' に日数を足す */
export const addDays = (isoDate: string, days: number): string => {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return toIsoDate(d);
};

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'] as const;

/** 曜日番号（0=日曜） */
export const weekdayIndex = (isoDate: string): number =>
  new Date(`${isoDate}T00:00:00Z`).getUTCDay();

/** 曜日の漢字1文字 */
export const weekdayLabel = (isoDate: string): string =>
  WEEKDAYS[weekdayIndex(isoDate)];

/** 'YYYY-MM-DD' → '8月6日(木)' */
export const formatDateJa = (isoDate: string): string => {
  const d = new Date(`${isoDate}T00:00:00Z`);
  return `${d.getUTCMonth() + 1}月${d.getUTCDate()}日(${weekdayLabel(isoDate)})`;
};

/** 'YYYY-MM-DD' → '2026.08.06' */
export const formatDateDot = (isoDate: string): string =>
  isoDate.replace(/-/g, '.');

/** 'YYYY-MM-DD' → '2026年8月6日' */
export const formatDateLong = (isoDate: string): string => {
  const d = new Date(`${isoDate}T00:00:00Z`);
  return `${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`;
};

/** 今日から n 日分の日付配列 */
export const upcomingDates = (days: number): string[] => {
  const start = todayJst();
  return Array.from({ length: days }, (_, i) => addDays(start, i));
};
