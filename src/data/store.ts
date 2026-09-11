/**
 * 店舗情報（NAP）。
 * ここが全ページ・構造化データ・フッターの唯一の情報源です。
 * 住所や電話番号を変更するときは必ずこのファイルだけを編集してください。
 */

export const store = {
  name: 'alouette',
  nameJa: 'あるえっと',
  nameReading: 'アルエット',
  /** 店舗形態（キャバクラ・ガールズバーとは異なる、コンセプトカフェ＆バー） */
  category: 'コンセプトカフェ＆バー',

  tel: '042-705-4454',
  /** tel: リンク用（ハイフンなし） */
  telHref: '+81427054454',
  /** 電話受付時間（旧サイト記載） */
  telHours: '17:00〜23:00',
  telHoursNote: '受付時間 17:00〜23:00・日曜定休',

  address: {
    /** 日本郵便の郵便番号データ（相模原市南区南台 = 252-0314）より */
    postalCode: '252-0314',
    prefecture: '神奈川県',
    city: '相模原市南区',
    street: '南台4-15-8',
    /** 表示用のフル住所 */
    full: '神奈川県相模原市南区南台4-15-8',
  },

  /** 営業時間（旧サイト記載） */
  openTime: '18:00',
  closeTime: '23:00',
  businessHours: '18:00〜23:00',
  closedDays: '日曜日',
  /** 「〜定休」と続けるときの表記（「日曜日定休」ではなく「日曜定休」） */
  closedNote: '日曜定休',
  businessHoursNote: '18:00〜23:00（日曜定休）',

  /** schema.org openingHoursSpecification 用（日曜のみ定休） */
  openDays: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ] as const,

  access: {
    station: '小田急線 小田急相模原駅',
    stationShort: '小田急相模原駅',
    exit: '北口',
    /** 徒歩分数は詳細アクセスページの表記に統一 */
    walkMinutes: 4,
    walkText: '小田急相模原駅 北口から徒歩4分',
    /** 地図リンク（住所検索。埋め込みは iframe を使用） */
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C%E7%9B%B8%E6%A8%A1%E5%8E%9F%E5%B8%82%E5%8D%97%E5%8C%BA%E5%8D%97%E5%8F%B04-15-8',
    googleMapsEmbedUrl:
      'https://maps.google.com/maps?q=%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C%E7%9B%B8%E6%A8%A1%E5%8E%9F%E5%B8%82%E5%8D%97%E5%8C%BA%E5%8D%97%E5%8F%B04-15-8&output=embed',
  },

  /**
   * 以下は旧サイトに記載がなく、未確認のためすべて空欄にしています。
   * TODO(オーナー確認): 判明したら値を入れてください。空欄の項目は
   * サイト上にも構造化データにも出力されません。
   */
  unverified: {
    seats: '', // 座席数
    payment: '', // 支払い方法（現金／カード／電子マネー等）
    smoking: '', // 喫煙可否
    reservationPolicy: '', // 予約の要否・条件
    groupPolicy: '', // 団体利用の条件
    privateHirePolicy: '', // 貸切の条件
    castCount: '', // 在籍キャスト数
    parking: '', // 駐車場
  },
} as const;

/** 全ページ共通の NAP テキスト */
export const nap = {
  name: store.name,
  address: store.address.full,
  tel: store.tel,
} as const;
