/**
 * 出勤情報。
 *
 * ▼ 更新のしかた
 *   下の schedules 配列に「日付ごと」に 1 件ずつ追加します。
 *   date は 'YYYY-MM-DD' 形式（日本時間）で書いてください。
 *   castSlug は casts.ts の slug と一致させます。
 *
 *   例）
 *   { date: '2026-08-10', castSlug: 'mai', start: '18:00', end: '23:00' },
 *
 *   過ぎた日付の情報は自動的に「本日の出勤」「週間出勤」から除外されるので、
 *   古い行は残しておいても問題ありません（見やすさのため定期的な整理は推奨）。
 */

export type ScheduleEntry = {
  /** 出勤日（YYYY-MM-DD・日本時間） */
  date: string;
  /** casts.ts の slug */
  castSlug: string;
  /** 出勤開始時間（HH:mm） */
  start: string;
  /** 出勤終了時間（HH:mm） */
  end: string;
  /** 任意の備考（例: '20時から合流'） */
  note?: string;
};

export const schedules: ScheduleEntry[] = [
  // TODO(店舗): 出勤情報をここに追加してください。
  // 登録がない日は「本日の出勤情報はSNSをご確認ください」と表示されます。
];

/** 店休日（曜日番号：0=日曜） */
export const CLOSED_WEEKDAY = 0;
