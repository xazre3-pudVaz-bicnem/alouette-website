/**
 * 店内・ギャラリー写真。
 *
 * ▼ 追加のしかた
 *   public/images/gallery/ または public/images/store/ に画像を置き、
 *   下の配列に 1 件追加してください。
 *
 * ⚠️ 実在のキャストに見えるAI生成の人物写真は掲載しないでください。
 *    「イメージ」カテゴリのイラストは実店舗の写真ではないため、
 *    isIllustration: true を付けて画面上に「イメージ」と明示しています。
 */

export const galleryCategories = [
  'すべて',
  '店内',
  'カウンター',
  'キャスト',
  'イメージ',
  'ドリンク',
  'フード',
  'イベント',
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryImage = {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, 'すべて'>;
  width: number;
  height: number;
  /** 写真が未提供でプレースホルダーを表示している場合 true */
  isPlaceholder?: boolean;
  /**
   * 実際の店内写真ではなく、世界観を表すイメージイラストの場合 true。
   * 実店舗の様子と誤解されないよう、画面上に「イメージ」と表示します。
   */
  isIllustration?: boolean;
};

export const galleryImages: GalleryImage[] = [
  // ── 実際の店内写真 ──
  {
    src: '/images/store/store-counter.jpg',
    alt: 'alouette 店内のカウンター席。ブリックタイルの壁にキャラクターのタペストリーが並ぶ',
    category: 'カウンター',
    width: 1280,
    height: 1280,
  },
  {
    src: '/images/store/store-interior-01.jpg',
    alt: 'alouette 店内のテーブル席とカウンター。大型モニターとフィギュア棚のある空間',
    category: '店内',
    width: 1280,
    height: 1280,
  },
  {
    src: '/images/store/store-interior-02.jpg',
    alt: 'alouette 店内の入口側。ゆったりとした椅子とタペストリーが並ぶ落ち着いた空間',
    category: '店内',
    width: 1280,
    height: 1280,
  },
  {
    src: '/images/store/store-tables.jpg',
    alt: 'alouette 店内のテーブル席。ゆったり座れるチェアとモニターのある空間',
    category: '店内',
    width: 639,
    height: 426,
  },

  {
    src: '/images/store/store-exterior.jpg',
    alt: 'alouette の店舗外観。「あるえっと」と書かれた白い看板のある入口',
    category: '店内',
    width: 1280,
    height: 1280,
  },
  {
    src: '/images/store/store-counter-02.jpg',
    alt: 'alouette のカウンター内側から見た店内',
    category: 'カウンター',
    width: 1280,
    height: 1280,
  },

  // ── 2026年9月に店舗から届いた写真 ──
  {
    src: '/images/gallery/counter-seats-202609.jpg',
    alt: 'alouette のカウンター席。壁一面にイラストやポスターが飾られた店内',
    category: 'カウンター',
    width: 1280,
    height: 1280,
  },
  {
    src: '/images/gallery/counter-shelf-202609.jpg',
    alt: 'フィギュアやイラストが並ぶカウンター内の棚とグラス',
    category: 'カウンター',
    width: 1280,
    height: 1280,
  },
  {
    src: '/images/gallery/cast-omurice-202609.jpg',
    alt: 'オムライスを持って手を振るメイド衣装のキャストたち',
    category: 'キャスト',
    width: 1280,
    height: 1280,
  },
  {
    src: '/images/gallery/cast-counter-202609.jpg',
    alt: 'フィギュア棚の前で顔を隠してポーズをとるメイド衣装のキャスト',
    category: 'キャスト',
    width: 1190,
    height: 1376,
  },
  {
    src: '/images/gallery/cast-selfie-01-202609.jpg',
    alt: '白と黒のメイド衣装でピースをするキャスト',
    category: 'キャスト',
    width: 902,
    height: 1400,
  },
  {
    src: '/images/gallery/cast-selfie-02-202609.jpg',
    alt: '水色のメイド衣装のキャスト',
    category: 'キャスト',
    width: 1050,
    height: 1400,
  },
  {
    src: '/images/gallery/omurice-cat-202609.jpg',
    alt: 'ケチャップで猫の顔と「Thank you」を描いたオムライス',
    category: 'フード',
    width: 1050,
    height: 1400,
  },
  {
    src: '/images/gallery/omurice-love-202609.jpg',
    alt: 'ケチャップで「LOVE」と描いたオムライス',
    category: 'フード',
    width: 1280,
    height: 1280,
  },
  {
    src: '/images/gallery/cheki-202609.jpg',
    alt: 'キャストと撮影したチェキ3枚',
    category: 'キャスト',
    width: 1280,
    height: 1280,
  },

  // ── キャスト写真（店舗から提供されたもの） ──
  {
    src: '/images/cast/yui-main-202609.jpg',
    alt: 'alouette のキャスト ゆい。白と黒のメイド衣装',
    category: 'キャスト',
    width: 960,
    height: 1336,
  },
  {
    src: '/images/cast/piyu-main-202609.jpg',
    alt: 'alouette のキャスト ぴゆ。水色のフリル衣装',
    category: 'キャスト',
    width: 1108,
    height: 1477,
  },
  {
    src: '/images/cast/amai-main.jpg',
    alt: 'alouette のキャスト あまい',
    category: 'キャスト',
    width: 935,
    height: 1334,
  },
  {
    src: '/images/cast/eru-main-202609.jpg',
    alt: 'alouette のキャスト える。黒と赤のセーラー風メイド衣装',
    category: 'キャスト',
    width: 710,
    height: 1400,
  },
  {
    src: '/images/cast/yunya-main.jpg',
    alt: 'alouette のキャスト ゆにゃ。白いフリルの衣装',
    category: 'キャスト',
    width: 1477,
    height: 1108,
  },

  // ── イメージイラスト（実際の店内写真ではありません） ──
  {
    src: '/images/visual/counter-neon.jpg',
    alt: 'ネオンの灯るカウンターで過ごす夜のイメージイラスト',
    category: 'イメージ',
    width: 1672,
    height: 941,
    isIllustration: true,
  },
  {
    src: '/images/visual/interior-cafe.jpg',
    alt: 'ピンクを基調にした店内のイメージイラスト',
    category: 'イメージ',
    width: 1672,
    height: 941,
    isIllustration: true,
  },
  {
    src: '/images/visual/night-window.jpg',
    alt: '夜景の見える席で過ごすひとときのイメージイラスト',
    category: 'イメージ',
    width: 1672,
    height: 941,
    isIllustration: true,
  },
  {
    src: '/images/visual/cast-group.jpg',
    alt: 'キャストたちがお出迎えするイメージイラスト',
    category: 'イメージ',
    width: 1672,
    height: 941,
    isIllustration: true,
  },
  {
    src: '/images/visual/counter-day.jpg',
    alt: 'カウンター越しにお話しするイメージイラスト',
    category: 'イメージ',
    width: 1672,
    height: 941,
    isIllustration: true,
  },
  {
    src: '/images/visual/bar-drink.jpg',
    alt: 'カウンターでドリンクを楽しむイメージイラスト',
    category: 'ドリンク',
    width: 1672,
    height: 941,
    isIllustration: true,
  },
  {
    src: '/images/visual/food-tray.jpg',
    alt: 'ドリンクとスイーツをお持ちするイメージイラスト',
    category: 'フード',
    width: 1672,
    height: 941,
    isIllustration: true,
  },
  {
    src: '/images/visual/duo.jpg',
    alt: 'イベントの日のにぎやかな店内のイメージイラスト',
    category: 'イベント',
    width: 1672,
    height: 941,
    isIllustration: true,
  },
];

/** 実写のみ（トップページの抜粋などで使用） */
export const realPhotos = (): GalleryImage[] =>
  galleryImages.filter((i) => !i.isPlaceholder && !i.isIllustration);
