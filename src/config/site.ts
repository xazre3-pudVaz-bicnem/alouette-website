/**
 * サイト全体の基本設定。
 * ドメイン・SNS・OGPなど、サイト単位で変わる値はすべてここにまとめています。
 */

export const siteConfig = {
  /** 本番ドメイン（www なしに統一。変更する場合はここだけ書き換える） */
  url: 'https://alouette0405.com',
  /** サイト名（ブラウザタブ・OGP・構造化データで使用） */
  name: 'alouette',
  nameJa: 'あるえっと',
  /** タイトルのサフィックス */
  titleSuffix: '相模原のコンカフェ alouette',
  description:
    '相模原・小田急相模原駅から徒歩4分のコンカフェ「alouette（あるえっと）」。かわいい女の子たちと過ごす、日常を忘れるとっておきの夜。60分セット料金・飲み放題・チェキあり。',
  locale: 'ja_JP',
  ogImage: '/images/og/og-image.jpg',
  logo: '/images/brand/logo.png',
  logoSquare: '/images/brand/logo-square.png',
} as const;

/**
 * SNS 設定。
 * 公式アカウントが確認できたものだけ URL を入れてください。
 * 空文字のものはサイト上にボタンが表示されません。
 *
 * ・Instagram: 旧アカウント（alouette20260405）は BAN されたと店舗から連絡があったため空欄。
 *   新しいアカウントを開設したら URL を入れてください。
 * ・X: 旧サイトの @alouette_maid から @alouette0405 へ変更（2026年8月・店舗確認済み）。
 * ・LINE / TikTok: 旧サイトにボタンだけがあり、リンク先が未設定でした（href="#"）。
 *   公式アカウントがある場合のみ URL を入力してください。
 */
export const socialLinks = {
  instagram: '', // 例: 'https://www.instagram.com/xxxxxxx/'
  x: 'https://x.com/alouette0405',
  line: '', // 例: 'https://lin.ee/xxxxxxx'
  tiktok: '', // 例: 'https://www.tiktok.com/@xxxxxxx'
} as const;

export type SocialKey = keyof typeof socialLinks;

/** 実際に URL が設定されている SNS だけを返す */
export const activeSocialLinks = (
  Object.entries(socialLinks) as [SocialKey, string][]
)
  .filter(([, url]) => url.trim().length > 0)
  .map(([key, url]) => ({ key, url }));

/** グローバルナビゲーション（ヘッダー・フッター共通） */
export const navigation = [
  { href: '/', label: 'TOP', labelJa: 'トップ' },
  { href: '/concept/', label: 'CONCEPT', labelJa: 'お店について' },
  { href: '/cast/', label: 'CAST', labelJa: '女の子紹介' },
  { href: '/schedule/', label: 'SCHEDULE', labelJa: '出勤情報' },
  { href: '/menu/', label: 'MENU', labelJa: '料金・メニュー' },
  { href: '/first-guide/', label: 'GUIDE', labelJa: '初めての方へ' },
  { href: '/gallery/', label: 'GALLERY', labelJa: '店内ギャラリー' },
  { href: '/news/', label: 'NEWS', labelJa: 'イベント・新着' },
  { href: '/shop/', label: 'ACCESS', labelJa: 'アクセス' },
  { href: '/faq/', label: 'FAQ', labelJa: 'よくある質問' },
  { href: '/recruit/', label: 'RECRUIT', labelJa: '求人情報' },
  { href: '/contact/', label: 'CONTACT', labelJa: '予約・お問い合わせ' },
] as const;

/** フッターの補助リンク */
export const utilityNavigation = [
  { href: '/privacy-policy/', label: 'プライバシーポリシー' },
] as const;
