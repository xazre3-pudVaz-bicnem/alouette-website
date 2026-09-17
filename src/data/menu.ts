/**
 * 料金・メニュー。
 *
 * ⚠️ 重要
 * ここに載っている金額は、現行サイト（alouette0405.com）と
 * 店舗から届いたメニューポスター（public/images/menu/、2026年9月）の表記だけです。
 * 金額の追加・変更は必ず店舗の指示に従ってください。こちらで金額を作らないこと。
 * 金額の記載がないメニュー（おつまみ類）には price を設定していません。
 */

export type PriceItem = {
  name: string;
  /** 金額（円・税込）。未設定のものは料金表記なしで表示されます */
  price?: number;
  note?: string;
};

/** セット料金（60分） */
export const setPlans: PriceItem[] = [
  { name: '男性', price: 3000, note: '60分' },
  { name: '女性', price: 2500, note: '60分' },
];

/** 料金に関する注意事項（現行サイトの表記そのまま） */
export const systemNotes: string[] = [
  '自動延長制となります。',
  '料金はすべて税込です。',
  'お会計はテーブル会計となります。',
];

/** 飲み放題ドリンク（アルコール）。「飲み放題メニュー」ポスターの表記どおり */
export const drinks: PriceItem[] = [
  { name: '生ビール', note: 'プラス200円' },
  { name: 'ハイボール' },
  { name: 'レモンサワー' },
  { name: '巨峰サワー' },
  { name: 'グレープフルーツサワー' },
  { name: '男梅サワー' },
  { name: '緑茶ハイ' },
  { name: 'ウーロンハイ' },
  { name: 'ジントニック' },
  { name: 'カシスオレンジ' },
  { name: 'コークハイ' },
  { name: '焼酎', note: '水割り・ロック' },
  { name: 'ウィスキー角', note: '水割り・ロック' },
  { name: '梅酒' },
];

/** 飲み放題ドリンク（ソフトドリンク） */
export const softDrinks: PriceItem[] = [
  { name: 'オレンジジュース' },
  { name: 'コーラ' },
  { name: 'アイスコーヒー' },
  { name: '緑茶' },
  { name: 'ウーロン茶' },
];

/** 飲み放題の補足（ポスターの表記） */
export const drinkNotes: string[] = [
  'ほかにもいろいろご用意しています。',
  'おかわりはグラス交換でお願いいたします。',
];

/** トップページ・初めての方ページで使う、飲み放題の短い紹介 */
export const drinkHighlights: string[] = [
  '生ビール',
  'ハイボール',
  '各種サワー',
  '緑茶ハイ',
  'ウーロンハイ',
  'ジントニック',
  'カシスオレンジ',
  '焼酎',
  'ウィスキー',
  '梅酒',
  'ソフトドリンク',
];

export type PosterItem = PriceItem & {
  /** 店舗から届いたメニューポスター */
  poster: { src: string; width: number; height: number };
};

/** おすすめフード（ポスターに記載の金額） */
export const featuredFoods: PosterItem[] = [
  {
    name: '愛のお絵かきオムライス',
    price: 1200,
    note: 'あなただけに心をこめて描きます',
    poster: {
      src: '/images/menu/poster-omurice.jpg',
      width: 1054,
      height: 1492,
    },
  },
  {
    name: 'ときめきピザ',
    price: 1200,
    note: 'チーズがトロ〜リ',
    poster: { src: '/images/menu/poster-pizza.jpg', width: 1086, height: 1448 },
  },
  {
    name: 'メイドがチンするたこ焼き',
    price: 880,
    note: 'あつあつをお届けします',
    poster: {
      src: '/images/menu/poster-takoyaki.jpg',
      width: 1024,
      height: 1536,
    },
  },
];

/**
 * おつまみ。
 * 現行サイトに金額の記載がないため、価格は設定していません（勝手に作らないこと）。
 */
export const foods: PriceItem[] = [
  { name: '持ち込みOK' },
  { name: 'ミックスナッツ' },
  { name: 'かきぴー' },
  { name: 'チーズ' },
  { name: 'お菓子盛り合わせ' },
  { name: 'チョコレート盛り合わせ' },
];

/** おすすめドリンク「心にドキュンテキーラ」（1杯） */
export const tequila = {
  name: '心にドキュンテキーラ',
  prices: [
    { name: 'お客様', price: 1000 },
    { name: 'キャスト', price: 1200 },
  ] as PriceItem[],
  poster: { src: '/images/menu/poster-tequila.jpg', width: 1054, height: 1492 },
};

/** シャンパン（ボトル） */
export const champagnes: PriceItem[] = [
  { name: 'カフェ・ド・パリ', price: 8800 },
  { name: '天使のアスティ', price: 10000 },
  { name: 'アヤラ', price: 18000 },
  { name: 'モエシャンドン', price: 20000 },
  { name: 'ノンアルシャンパン', price: 3500 },
];

export const champagneMenuPoster = {
  src: '/images/menu/poster-champagne.jpg',
  width: 1024,
  height: 1536,
};

/** ときめきシャンパンセット */
export const champagneSets: { name: string; price: number; items: string[] }[] =
  [
    {
      name: 'Aセット',
      price: 18000,
      items: [
        '2タイム（120分）飲み放題',
        'カフェ・ド・パリ',
        'シャンパン開封動画',
        'チェキ撮影',
        'お菓子盛り合わせ',
      ],
    },
    {
      name: 'Bセット',
      price: 9800,
      items: [
        '1タイム（60分）飲み放題',
        'ノンアルコールシャンパン',
        'シャンパン開封動画',
        'チェキ',
        'お菓子盛り合わせ',
      ],
    },
  ];

export const champagneSetPoster = {
  src: '/images/menu/poster-champagne-set.jpg',
  width: 1054,
  height: 1492,
};

export const drinkMenuPoster = {
  src: '/images/menu/poster-drinks.jpg',
  width: 1024,
  height: 1536,
};

/** オプション */
export const options: PriceItem[] = [
  { name: 'キャストドリンク', price: 1000 },
  { name: 'チェキ', price: 1000 },
];

/** ご利用にあたって（現行サイトの表記そのまま） */
export const usageNotes: string[] = [
  '当店は風俗営業法に基づき、18歳未満の方のご入店をお断りしております。',
  '迷惑行為、暴力行為、泥酔の方のご入店はお断りしております。',
  '料金システム・内容は予告なく変更する場合がございます。',
  '気になることやご要望がございましたら、お気軽にスタッフまでお声がけください。',
];

/** ご注文からお会計までの流れ（初めての方向け） */
export const orderFlow: { title: string; body: string }[] = [
  {
    title: 'ご来店・ご案内',
    body: 'スタッフがお席へご案内します。ご予約なしでもご来店いただけます（満席の場合はご案内できないこともあります）。',
  },
  {
    title: 'セット料金のご案内',
    body: '60分のセット料金（男性3,000円／女性2,500円・税込）でスタートします。時間は自動延長制です。',
  },
  {
    title: 'ドリンクをお選びください',
    body: 'セット料金内でお好きなドリンクをお楽しみいただけます。生ビールのみプラス200円です。',
  },
  {
    title: 'お好みでオプションを',
    body: 'キャストドリンク（1,000円）やチェキ（1,000円）はご希望の場合のみご注文ください。',
  },
  {
    title: 'お会計',
    body: 'お会計はテーブル会計です。分からないことがあれば、いつでもスタッフへお声がけください。',
  },
];

/** よく注文される追加料金（初めての方向けのまとめ。フード・シャンパン等は各メニューを参照） */
export const extraCharges: PriceItem[] = [
  { name: '生ビール', price: 200, note: 'ドリンク1杯につきプラス200円' },
  { name: 'キャストドリンク', price: 1000, note: 'ご希望の場合のみ' },
  { name: 'チェキ', price: 1000, note: 'ご希望の場合のみ' },
];

/** 構造化データの priceRange 用 */
export const priceRange = '¥2,500〜';
