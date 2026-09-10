/**
 * キャスト（女の子）情報。
 *
 * ▼ 追加のしかた
 *   1. public/images/cast/ に写真を置く（推奨 800×1000px / 4:5）
 *   2. 下の casts 配列に 1 件追加する
 *   3. isPublished を true にすると公開されます
 *   4. displayOrder の小さい順に並びます
 *
 * ▼ 写真を差し替える場合
 *   同じファイル名で上書きせず、新しいファイル名で置いて mainImage を書き換えてください
 *   （例: yui-main-202609.jpg → yui-main-202612.jpg）。同じ名前のままだと、
 *   ブラウザや配信サーバーのキャッシュに古い写真が残ることがあります。
 *   古い写真ファイルは削除して構いません。
 *
 * ▼ 退店した場合
 *   配列から該当の項目を削除し、public/images/cast/ の写真も削除してください。
 *
 * ⚠️ 掲載してよいのは、本人の同意が取れている情報だけです。
 *    本名・年齢・住所など、公開許可のない個人情報は入れないでください。
 *    キャッチコピーと本人からのメッセージは、本人が書いた文章をそのまま載せます。
 *    こちらで文章を作らないでください（本人の言葉として誤解されるため）。
 */

export type Cast = {
  /** URL に使う英数字のID（例: /cast/yui/ ） */
  slug: string;
  /** 源氏名 */
  name: string;
  /** 読み仮名・ニックネーム */
  nickname: string;
  /** 短いキャッチコピー（20文字程度）。未定なら空文字 */
  catchphrase: string;
  /** メイン写真（public/images/cast/ 配下のパス） */
  mainImage: string;
  /**
   * メイン写真の表示位置。人物が中央から外れている写真だけ指定します。
   * 例: 'top' / 'center' / '70% 30%'（CSS の object-position と同じ書式）
   */
  imagePosition?: string;
  /** サブ写真（0〜4枚程度） */
  gallery: string[];
  /** 誕生日（表示用テキスト。例: '12月25日'）。非公開・未確認なら空文字 */
  birthday: string;
  /** 好きなもの */
  favorites: string[];
  /** 趣味 */
  hobbies: string[];
  /** 好きなドリンク */
  favoriteDrink: string;
  /** 本人からのメッセージ */
  message: string;
  /** 個人SNS（未設定ならボタン非表示） */
  instagram: string;
  x: string;
  tiktok: string;
  /** 公開フラグ */
  isPublished: boolean;
  /** 並び順（小さいほど先） */
  displayOrder: number;
  /**
   * ダミーデータであることを示すフラグ。
   * true の間は「準備中」バッジが付き、個別ページも生成されません。
   * 実在のキャストには付けないでください。
   */
  isDummy?: boolean;
};

/** 写真がまだ届いていないキャストに使う仮画像 */
const PHOTO_PLACEHOLDER = '/images/cast/cast-photo-placeholder.svg';

export const casts: Cast[] = [
  {
    slug: 'yui',
    name: 'ゆい',
    nickname: 'ゆいちゃん',
    catchphrase: 'めちゃくちゃ飲めます',
    mainImage: '/images/cast/yui-main-202609.jpg',
    gallery: [],
    birthday: '9月8日',
    favorites: ['甘いもの'],
    hobbies: ['アニメ', 'コスプレ'],
    favoriteDrink: 'ウーロン',
    message: 'いっぱいお話ししよーねー',
    instagram: '',
    x: 'https://x.com/la__ru07',
    tiktok: '',
    isPublished: true,
    displayOrder: 1,
  },
  {
    slug: 'piyu',
    name: 'ぴゆ',
    nickname: 'ぴゆちゃん',
    catchphrase: 'お酒が飲める合法ロリ',
    mainImage: '/images/cast/piyu-main-202609.jpg',
    gallery: [],
    birthday: '10月8日',
    favorites: ['ちいかわのうさぎ'],
    hobbies: ['YouTube鑑賞'],
    favoriteDrink: 'カシオレ、レゲエパンチ',
    message: '沢山チェキお絵描きさせて下さい！楽しい思い出作りましょ！',
    instagram: 'https://www.instagram.com/piyu_10_08_/',
    x: 'https://x.com/pi_yu_1008',
    tiktok: '',
    isPublished: true,
    displayOrder: 2,
  },
  {
    slug: 'amai',
    name: 'あまい',
    nickname: 'あまいちゃん',
    catchphrase: 'あまいとあまーい時間過ごしてみない？',
    mainImage: '/images/cast/amai-main.jpg',
    gallery: [],
    birthday: '6月28日',
    favorites: ['ちいかわのうさぎ'],
    hobbies: ['エレキベース', 'うたを歌うこと'],
    favoriteDrink: 'おれんじじゅーす',
    message: 'あるえっとにてご帰宅お待ちしております',
    instagram: '',
    x: '',
    tiktok: '',
    isPublished: true,
    displayOrder: 3,
  },
  {
    slug: 'eru',
    name: 'える',
    nickname: 'えるちゃん',
    catchphrase: '',
    mainImage: '/images/cast/eru-main.jpg',
    gallery: [],
    birthday: '5月7日',
    favorites: ['甘いもの', 'フルーツ'],
    hobbies: ['アニメ', 'ご飯', 'パチンコ'],
    favoriteDrink: '果汁サワー',
    message: '沢山お話しましょー',
    instagram: '',
    x: 'https://x.com/w0r_4_4',
    tiktok: 'https://www.tiktok.com/@nyannyan28onyan',
    isPublished: true,
    displayOrder: 4,
  },
  {
    slug: 'yunya',
    name: 'ゆにゃ',
    nickname: 'ゆにゃちゃん',
    catchphrase: 'ちょっぴりクールなギャルメイド',
    mainImage: '/images/cast/yunya-main.jpg',
    // 横位置の写真のため、人物が中央に来るよう表示位置を調整
    imagePosition: '62% 30%',
    gallery: [],
    birthday: '5月13日',
    favorites: ['カルパス'],
    hobbies: ['カラオケ'],
    favoriteDrink: 'コーラ',
    message: 'ラフな感じで接してください',
    instagram: '',
    x: '',
    tiktok: '',
    isPublished: true,
    displayOrder: 5,
  },
  {
    slug: 'pome',
    name: 'ぽめ',
    nickname: 'ぽめちゃん',
    catchphrase: 'ふわふわお姫様',
    // TODO(店舗): 写真が届いたら public/images/cast/pome-main.jpg として置き、
    //             mainImage をそのパスに書き換えてください。
    mainImage: PHOTO_PLACEHOLDER,
    gallery: [],
    birthday: '3月22日',
    favorites: ['マイメロ', 'グルーミー'],
    hobbies: ['甘いスイーツをぱくぱくすること'],
    favoriteDrink: 'あまいお酒',
    message: '酔ったらめっちゃお話しちゃうので酔わせてください',
    instagram: '',
    x: '',
    tiktok: '',
    isPublished: true,
    displayOrder: 6,
  },

  /* ─────────────────────────────────────────────────────────────
   * ▼ キャストを追加するときは、下の形をコピーして貼り付けてください。
   *
   * {
   *   slug: 'xxxx',                                  // 英数字（URLになります）
   *   name: 'xxxx',
   *   nickname: 'xxxxちゃん',
   *   catchphrase: '',                               // 短いキャッチコピー
   *   mainImage: '/images/cast/xxxx-main.jpg',        // ファイル名も slug に合わせる
   *   gallery: ['/images/cast/xxxx-01.jpg'],          // サブ写真。無ければ []
   *   birthday: '',
   *   favorites: [],
   *   hobbies: [],
   *   favoriteDrink: '',
   *   message: '',
   *   instagram: '',
   *   x: '',
   *   tiktok: '',
   *   isPublished: true,
   *   displayOrder: 7,
   * },
   * ───────────────────────────────────────────────────────────── */
];

/** 公開中のキャストを表示順に取得 */
export const publishedCasts = (): Cast[] =>
  casts
    .filter((c) => c.isPublished)
    .sort((a, b) => a.displayOrder - b.displayOrder);

/** 個別ページを生成する対象（ダミーは生成しない） */
export const detailPageCasts = (): Cast[] =>
  publishedCasts().filter((c) => !c.isDummy);

export const findCast = (slug: string): Cast | undefined =>
  detailPageCasts().find((c) => c.slug === slug);

/** 実在キャストが1人でも登録されているか */
export const hasRealCasts = (): boolean => detailPageCasts().length > 0;

/** プロフィール（誕生日・趣味など）が1つでも入っているか */
export const hasProfile = (cast: Cast): boolean =>
  Boolean(
    cast.birthday ||
      cast.favoriteDrink ||
      cast.message ||
      cast.hobbies.length ||
      cast.favorites.length,
  );

/** 写真がまだ届いていない（仮画像を使っている）か */
export const isPhotoPending = (cast: Cast): boolean =>
  cast.mainImage.endsWith('.svg');

/** 個人SNSのリンク一覧（設定されているものだけ） */
export const castSocialLinks = (
  cast: Cast,
): { label: string; url: string }[] =>
  [
    { label: 'Instagram', url: cast.instagram },
    { label: 'X', url: cast.x },
    { label: 'TikTok', url: cast.tiktok },
  ].filter((s) => s.url.trim().length > 0);
