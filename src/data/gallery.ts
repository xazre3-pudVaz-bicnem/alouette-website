/**
 * 店内・ギャラリー写真。
 *
 * ▼ 追加のしかた
 *   public/images/gallery/ または public/images/store/ に画像を置き、
 *   下の配列に 1 件追加してください。
 *
 * ⚠️ 実在のキャストに見えるAI生成の人物画像は掲載しないでください。
 *    写真が用意できるまでは placeholder のままにしておきます。
 */

export const galleryCategories = [
  'すべて',
  '店内',
  'カウンター',
  'ネオン',
  '衣装',
  'キャスト',
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
};

export const galleryImages: GalleryImage[] = [
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
    src: '/images/gallery/gallery-neon-placeholder.svg',
    alt: '店舗のピンクのネオンサイン（写真準備中）',
    category: 'ネオン',
    width: 1000,
    height: 1000,
    isPlaceholder: true,
  },
  // キャスト写真（店舗から提供されたもの）
  {
    src: '/images/cast/yui-main.jpg',
    alt: 'alouette のキャスト ゆい。ピンクのメイド衣装',
    category: 'キャスト',
    width: 960,
    height: 1488,
  },
  {
    src: '/images/cast/piyu-main.jpg',
    alt: 'alouette のキャスト ぴゆ',
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
    src: '/images/cast/eru-main.jpg',
    alt: 'alouette のキャスト える',
    category: 'キャスト',
    width: 940,
    height: 958,
  },
  {
    src: '/images/cast/yunya-main.jpg',
    alt: 'alouette のキャスト ゆにゃ。白いフリルの衣装',
    category: '衣装',
    width: 1477,
    height: 1108,
  },
  {
    src: '/images/gallery/gallery-drink-placeholder.svg',
    alt: 'ドリンクの写真（準備中）',
    category: 'ドリンク',
    width: 1000,
    height: 1000,
    isPlaceholder: true,
  },
  {
    src: '/images/gallery/gallery-food-placeholder.svg',
    alt: 'フードの写真（準備中）',
    category: 'フード',
    width: 1000,
    height: 1000,
    isPlaceholder: true,
  },
  {
    src: '/images/gallery/gallery-event-placeholder.svg',
    alt: 'イベントの写真（準備中）',
    category: 'イベント',
    width: 1000,
    height: 1000,
    isPlaceholder: true,
  },
];

/** 実写のみ（トップページの抜粋などで使用） */
export const realPhotos = (): GalleryImage[] =>
  galleryImages.filter((i) => !i.isPlaceholder);
