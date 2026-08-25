/**
 * 駅からの道順。
 * 写真は public/images/access/ に置き、image のパスを差し替えてください。
 * （現在は道順写真が未提供のためプレースホルダーです）
 */

export type AccessStep = {
  step: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  /** 枠の比率と写真の比率が違うときの表示位置（CSS object-position と同じ書式） */
  imagePosition?: string;
  isPlaceholder?: boolean;
};

export const accessSteps: AccessStep[] = [
  {
    step: 'STEP 1',
    title: '小田急相模原駅 北口を出ます',
    body: '小田急線 小田急相模原駅の北口を出て、そのまま直進します。',
    image: '/images/access/access-step-01-placeholder.svg',
    alt: '小田急相模原駅 北口の様子（写真準備中）',
    isPlaceholder: true,
  },
  {
    step: 'STEP 2',
    title: '駅前の信号を右折',
    body: '小田急相模原駅前の信号を右に曲がります。',
    image: '/images/access/access-step-02-placeholder.svg',
    alt: '小田急相模原駅前の信号（写真準備中）',
    isPlaceholder: true,
  },
  {
    step: 'STEP 3',
    title: '南大野交番前を左折',
    body: '南大野交番前を左に曲がり、そのまま直進します。',
    image: '/images/access/access-step-03-placeholder.svg',
    alt: '南大野交番前の交差点（写真準備中）',
    isPlaceholder: true,
  },
  {
    step: 'GOAL',
    title: '「あるえっと」の看板が目印',
    body: '1つ目の角、白い看板に「あるえっと」と書かれた入口が目印です。alouetteに到着です。',
    image: '/images/store/store-exterior.jpg',
    alt: 'alouette の店舗外観。「あるえっと」と書かれた白い看板のある入口',
    // 看板が上部にあるため、中央ではなく上寄せで表示する
    imagePosition: 'center top',
  },
];

/** 周辺エリアの説明（ローカルSEO用の自然文） */
export const areaNote =
  'alouette は神奈川県相模原市南区南台にあります。小田急線 小田急相模原駅の北口から徒歩4分、駅前の通りを進んで南大野交番を曲がったところにあるので、相模原市南区はもちろん、座間市・大和市方面からもお立ち寄りいただきやすい立地です。';
