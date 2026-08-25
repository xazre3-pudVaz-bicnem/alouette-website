import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /** 親ディレクトリの lockfile を誤検知しないようルートを固定 */
  turbopack: { root: path.resolve(import.meta.dirname) },

  /**
   * 既存URL（/menu/ /recruit/ /shop/ /contact/）を維持するため、
   * すべてのURLを末尾スラッシュありに統一します。
   */
  trailingSlash: true,

  images: {
    // AVIF / WebP を自動で配信
    formats: ['image/avif', 'image/webp'],
    // プレースホルダーに SVG を使っているため（自サイト配信のみ・外部SVGは不許可）
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1600, 1920],
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  /**
   * 旧WordPressサイトのURLからの301リダイレクト。
   * 引き継ぐURL（/ /menu/ /recruit/ /shop/ /contact/）はそのまま使うため対象外です。
   */
  async redirects() {
    return [
      // 出勤情報ページは廃止したためトップへ（既にインデックスされている場合の受け皿）
      { source: '/schedule', destination: '/', permanent: true },
      // 旧「Hello world!」投稿と、日付アーカイブ配下の投稿
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*',
        destination: '/news/',
        permanent: true,
      },
      // WordPress の初期固定ページ
      { source: '/sample-page', destination: '/', permanent: true },
      // 旧キャストページ（日本語スラッグ）はキャスト一覧へ
      { source: '/cast/%e3%81%be%e3%81%84', destination: '/cast/', permanent: true },
      // 旧サイトマップ・フィード
      {
        source: '/:file(wp-sitemap.*\\.xml)',
        destination: '/sitemap.xml',
        permanent: true,
      },
      { source: '/feed', destination: '/news/', permanent: true },
      { source: '/comments/feed', destination: '/news/', permanent: true },
      // 旧カテゴリ／タグ／作成者アーカイブ
      { source: '/category/:slug*', destination: '/news/', permanent: true },
      { source: '/tag/:slug*', destination: '/news/', permanent: true },
      { source: '/author/:slug*', destination: '/', permanent: true },
      // 旧管理画面系（誤って被リンクが残っている場合の受け皿）
      { source: '/wp-content/:path*', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
