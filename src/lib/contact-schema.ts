import { z } from 'zod';

/** お問い合わせ種別 */
export const inquiryTypes = [
  { value: 'reserve', label: '来店予約' },
  { value: 'question', label: '店舗への問い合わせ' },
  { value: 'recruit', label: '求人応募' },
  { value: 'other', label: 'その他' },
] as const;

export type InquiryTypeValue = (typeof inquiryTypes)[number]['value'];

export const inquiryTypeLabel = (value: string): string =>
  inquiryTypes.find((t) => t.value === value)?.label ?? 'その他';

/** 来店希望時間の選択肢（旧サイトの選択肢を踏襲） */
export const visitTimeOptions = [
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00以降',
] as const;

/** 人数の選択肢 */
export const partySizeOptions = ['1名', '2名', '3名', '4名以上'] as const;

const optional = (schema: z.ZodString) =>
  z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === '' ? undefined : v))
    .pipe(schema.optional());

export const contactSchema = z.object({
  inquiryType: z.enum(['reserve', 'question', 'recruit', 'other'], {
    message: 'お問い合わせ種別を選択してください。',
  }),
  name: z
    .string()
    .trim()
    .min(1, 'お名前を入力してください。')
    .max(60, 'お名前は60文字以内で入力してください。'),
  kana: optional(
    z
      .string()
      .max(60, 'フリガナは60文字以内で入力してください。')
      .regex(
        /^[ァ-ヶーァ-ヴｦ-ﾟ぀-ゟ\s]+$/,
        'フリガナはカタカナまたはひらがなで入力してください。',
      ),
  ),
  tel: z
    .string()
    .trim()
    .min(1, '電話番号を入力してください。')
    .regex(
      /^[0-9+\-() ]{9,20}$/,
      '電話番号は数字とハイフンで入力してください。',
    ),
  email: z
    .string()
    .trim()
    .min(1, 'メールアドレスを入力してください。')
    .email('メールアドレスの形式が正しくありません。')
    .max(254),
  visitDate: optional(
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '来店希望日の形式が正しくありません。'),
  ),
  visitTime: optional(z.string().max(20)),
  partySize: optional(z.string().max(20)),
  message: z
    .string()
    .trim()
    .min(1, 'お問い合わせ内容を入力してください。')
    .max(2000, 'お問い合わせ内容は2,000文字以内で入力してください。'),
  privacy: z.literal('agree', {
    message: 'プライバシーポリシーへの同意が必要です。',
  }),
  /** スパム対策：人間には見えない項目。入力されていたら送信を破棄する */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** 入力値の再表示に使う項目（送信エラー時に入力を消さないため） */
export type ContactValues = Partial<
  Record<
    | 'inquiryType'
    | 'name'
    | 'kana'
    | 'tel'
    | 'email'
    | 'visitDate'
    | 'visitTime'
    | 'partySize'
    | 'message'
    | 'privacy',
    string
  >
>;

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  /** 項目名 → エラーメッセージ */
  errors: Record<string, string>;
  /**
   * 直前の入力値。React はフォームアクション完了時に未制御の入力をリセットするため、
   * エラー時はここに入れて画面側で復元します。
   */
  values?: ContactValues;
  /** 再描画のためのカウンタ（フォームの key に使用） */
  attempt: number;
};

export const initialContactState: ContactState = {
  status: 'idle',
  message: '',
  errors: {},
  attempt: 0,
};

/** FormData から再表示用の値だけを取り出す */
export const pickValues = (formData: FormData): ContactValues => {
  const keys = [
    'inquiryType',
    'name',
    'kana',
    'tel',
    'email',
    'visitDate',
    'visitTime',
    'partySize',
    'message',
    'privacy',
  ] as const;

  const values: ContactValues = {};
  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value === 'string') values[key] = value;
  }
  return values;
};
