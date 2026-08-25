# alouette（あるえっと）公式サイト

神奈川県相模原市南区南台のコンセプトカフェ＆バー **alouette** の公式サイトです。
WordPress から Next.js（App Router）へ全面リニューアルしたものです。

- 本番URL（切り替え後）: https://alouette0405.com
- 技術構成: Next.js 16 (App Router) / TypeScript / Tailwind CSS v4 / Resend
- ホスティング: Vercel

---

## 目次

1. [開発をはじめる](#1-開発をはじめる)
2. [ディレクトリ構成](#2-ディレクトリ構成)
3. [お問い合わせフォームの設定](#3-お問い合わせフォームの設定)
4. [運用マニュアル（更新のしかた）](#4-運用マニュアル更新のしかた)
5. [必要な写真の一覧](#5-必要な写真の一覧)
6. [Vercelへのデプロイ手順](#6-vercelへのデプロイ手順)
7. [独自ドメインの切り替え手順](#7-独自ドメインの切り替え手順)
8. [旧WordPressを停止してよいタイミング](#8-旧wordpressを停止してよいタイミング)
9. [オーナー確認が必要な項目](#9-オーナー確認が必要な項目)

---

## 1. 開発をはじめる

```bash
npm install
cp .env.example .env.local   # Windowsは copy .env.example .env.local
npm run dev                  # http://localhost:3000
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番ビルド（型チェックも実行されます） |
| `npm run start` | ビルド結果をローカルで起動 |
| `npm run lint` | ESLint |

---

## 2. ディレクトリ構成

```
src/
├── app/                     ページ（App Router）
│   ├── page.tsx                 トップ                    /
│   ├── concept/                 コンセプト                /concept/
│   ├── cast/                    キャスト一覧              /cast/
│   │   └── [slug]/              キャスト個別              /cast/xxx/
│   ├── schedule/                出勤情報                  /schedule/
│   ├── menu/                    料金・メニュー            /menu/
│   ├── first-guide/             初めての方へ              /first-guide/
│   ├── news/                    ニュース一覧              /news/
│   │   └── [slug]/              ニュース詳細              /news/xxx/
│   ├── gallery/                 ギャラリー                /gallery/
│   ├── shop/                    アクセス・店舗情報        /shop/
│   ├── faq/                     よくある質問              /faq/
│   ├── recruit/                 求人情報                  /recruit/
│   ├── contact/                 予約・お問い合わせ        /contact/
│   │   └── actions.ts           フォーム送信のServer Action
│   ├── privacy-policy/          プライバシーポリシー      /privacy-policy/
│   ├── not-found.tsx            404ページ
│   ├── sitemap.ts               sitemap.xml
│   └── robots.ts                robots.txt
│
├── config/
│   └── site.ts              ★ ドメイン・SNS・ナビゲーション
│
├── data/                    ★ ここを編集すればサイトが更新できます
│   ├── store.ts                 店舗情報（住所・電話・営業時間）
│   ├── menu.ts                  料金・ドリンク・フード・オプション
│   ├── casts.ts                 キャスト
│   ├── schedules.ts             出勤情報
│   ├── recruit.ts               求人条件
│   ├── faq.ts                   よくある質問
│   ├── gallery.ts               ギャラリー写真
│   ├── access.ts                駅からの道順
│   └── concept.ts               コンセプト文・キャッチコピー
│
├── content/news/            ★ ニュース記事（Markdown）
├── components/              UIコンポーネント
└── lib/                     日付・SEO・構造化データなどの共通処理

public/images/               画像
├── brand/  hero/  cast/  store/  menu/  gallery/  recruit/  access/  news/  og/
```

**★ が付いているファイル・フォルダだけを編集すれば、サイトの内容は更新できます。**

---

## 3. お問い合わせフォームの設定

フォームは Server Action から [Resend](https://resend.com) 経由でメールを送信します。
以下の3つの環境変数が必要です。

| 環境変数 | 内容 | 例 |
| --- | --- | --- |
| `RESEND_API_KEY` | Resend の API キー | `re_xxxxxxxx...` |
| `CONTACT_TO_EMAIL` | 問い合わせの受信先（カンマ区切りで複数可） | `owner@example.com` |
| `CONTACT_FROM_EMAIL` | 送信元アドレス（Resendで認証済みドメイン） | `alouette <noreply@alouette0405.com>` |

### 設定手順

1. https://resend.com にアカウントを作成する
2. **Domains** で `alouette0405.com` を追加し、表示された DNS レコード（SPF / DKIM）を
   ドメインの DNS に登録して認証を完了する
3. **API Keys** で API キーを発行する
4. ローカルは `.env.local`、本番は Vercel の
   **Project → Settings → Environment Variables** に上記3つを登録する
   （Production・Preview の両方に登録してください）
5. 登録後に再デプロイすると反映されます

> 環境変数が未設定のあいだは、フォーム送信時に
> 「送信に失敗しました。お手数ですが、お電話でご連絡ください」と表示され、
> 電話番号が案内されます（画面が壊れることはありません）。

### 実装されているスパム・不正対策

- **honeypot**: 人間には見えない `website` 項目。入力があれば送信を破棄します
- **レート制限**: 同一IPから10分間に5件まで
- **入力チェック**: zod によるサーバー側バリデーション（必須項目・メール形式・電話番号形式・文字数）
- 個人情報はブラウザのコンソールにもサーバーログにも出力しません
- 送信エラー時も入力内容は消えません（入力し直しが不要）

---

## 4. 運用マニュアル（更新のしかた）

### 4.1 キャストを追加する

1. 写真を `public/images/cast/` に置きます（推奨 **800×1000px / 4:5**）
2. `src/data/casts.ts` の `casts` 配列に1件追加します

```ts
{
  slug: 'mai',                                  // URLになる英数字（/cast/mai/）
  name: 'まい',
  nickname: 'まいちゃん',
  catchphrase: 'お話しするのが大好きです',
  mainImage: '/images/cast/mai-main.jpg',
  gallery: ['/images/cast/mai-01.jpg'],         // サブ写真。無ければ []
  birthday: '12月25日',                          // 非公開なら ''
  favorites: ['甘いもの', '猫'],
  hobbies: ['映画鑑賞'],
  favoriteDrink: 'レモンサワー',
  message: 'ぜひ気軽に話しかけてくださいね。',
  instagram: '',                                 // 無ければ '' でボタン非表示
  x: '',
  tiktok: '',
  isPublished: true,                             // false で非公開
  displayOrder: 10,                              // 小さいほど先に表示
},
```

- 現在は **ゆい / ぴゆ / あまい / える / ゆにゃ / ぽめ の6名**を登録しています。
- プロフィールは **6名全員**が入稿済みです（本人が書いた文章をそのまま掲載しています）。
- **ぽめ** は写真がまだ届いていないため仮画像です。届いたら
  `public/images/cast/pome-main.jpg` として置き、`mainImage` を書き換えてください。
- 空欄の項目は画面に表示されず、個別ページには「プロフィールは準備中です」と出ます。
  **本人の言葉として誤解されるため、こちらでキャッチコピーやメッセージを創作していません。**
- 退店した場合は `casts.ts` から項目を削除し、`public/images/cast/` の写真も削除してください。
- `isDummy: true` を付けると「準備中」バッジが付き個別ページも作られません（実在のキャストには付けないこと）。
- 横位置の写真で顔が中央から外れる場合は `imagePosition: '62% 30%'` のように表示位置を調整できます。
- **本人の同意がない写真・情報、本名・年齢・住所などは掲載しないでください。**

### 4.2 出勤情報を更新する

`src/data/schedules.ts` の `schedules` 配列に、日付ごとに1行ずつ追加します。

```ts
export const schedules: ScheduleEntry[] = [
  { date: '2026-08-10', castSlug: 'mai',  start: '18:00', end: '23:00' },
  { date: '2026-08-10', castSlug: 'yuka', start: '20:00', end: '23:00', note: '20時から合流' },
  { date: '2026-08-11', castSlug: 'mai',  start: '18:00', end: '22:00' },
];
```

- `date` は `YYYY-MM-DD`（日本時間）
- `castSlug` は `casts.ts` の `slug` と一致させてください
- **過ぎた日付は自動的にトップページ・出勤情報ページから消えます**ので、古い行は残しても構いません
- 出勤が登録されていない日は「本日の出勤情報はSNSをご確認ください」と表示されます
- 日曜日は自動的に「定休日」と表示されます
- 表示は1時間ごとに更新されます（ISR）。すぐ反映したい場合は Vercel で再デプロイしてください

### 4.3 ニュース・イベントを投稿する

`src/content/news/` に Markdown ファイル（`.md`）を追加します。
**ファイル名がそのまま URL になります**（`summer-event.md` → `/news/summer-event/`）。

```markdown
---
title: '夏の特別イベントを開催します'
date: 2026-08-10
updated: 2026-08-10
category: 'イベント'          # イベント / お知らせ / キャスト / 求人情報
thumbnail: '/images/news/summer-event.jpg'
excerpt: '一覧に表示される要約を90文字程度で書きます。'
seoTitle: '夏の特別イベント｜相模原のコンカフェ alouette'   # 省略可
metaDescription: '検索結果に出る説明文（90〜130文字）'        # 省略可
published: true               # false にすると非公開
links:
  - label: '料金・メニューを見る'
    url: '/menu/'
---

ここから本文を Markdown で書きます。

## 見出し

- 箇条書き
- **太字**
```

- カテゴリが `イベント` の記事には、自動的に `Event` の構造化データが出力されます
- すべての記事に `Article` の構造化データが出力されます
- **`sample-open-info.md` はサンプル記事です。公開前に削除してください。**

### 4.4 料金・店舗情報を変更する

| 変更したいもの | ファイル |
| --- | --- |
| セット料金・ドリンク・フード・オプション | `src/data/menu.ts` |
| 住所・電話番号・営業時間・定休日・最寄り駅 | `src/data/store.ts` |
| 求人の時給・バック・条件・FAQ | `src/data/recruit.ts` |
| よくある質問 | `src/data/faq.ts` |
| 駅からの道順 | `src/data/access.ts` |
| コンセプト文・キャッチコピー | `src/data/concept.ts` |

住所・電話番号は `store.ts` の1か所を直せば、ヘッダー・フッター・各ページ・構造化データの
すべてに反映されます（NAP統一）。

### 4.5 SNSリンクを設定する

`src/config/site.ts` の `socialLinks` を編集します。

```ts
export const socialLinks = {
  instagram: '',                        // ← 新アカウント開設後に URL を入れてください
  x: 'https://x.com/alouette0405',
  line: '',                             // ← URLを入れるとボタンが表示されます
  tiktok: '',                           // ← 空のあいだはボタン自体が出ません
};
```

現在の状況（2026年8月時点・店舗確認済み）

| SNS | 状態 |
| --- | --- |
| Instagram | 旧アカウント `alouette20260405` が **BANされたため空欄**。新アカウント開設後に設定してください |
| X | `@alouette_maid` から **`@alouette0405` へ変更済み** |
| LINE | 旧サイトはボタンのみでリンク未設定（`href="#"`）のため空欄 |
| TikTok | 同上 |

> 空欄の SNS はボタン自体が表示されません。架空の URL は入れないでください。

キャスト個人の SNS は `src/data/casts.ts` の `instagram` / `x` / `tiktok` に設定します
（店舗の SNS とは別管理です）。

---

## 5. 必要な写真の一覧

現在サイトに入っている写真は、旧サイトから引き継いだ **実際の店内写真4点** と **ロゴ** のみです。
以下は「プレースホルダー（仮画像）」になっている箇所です。撮影後、同じパスに置き換えるか、
データファイルのパスを差し替えてください。

### 掲載済み（旧サイトから移行）

| ファイル | 用途 |
| --- | --- |
| `public/images/brand/logo.png` | ロゴ（ヘッダー） |
| `public/images/brand/logo-square.png` | ロゴ（フッター・アプリアイコン） |
| `public/images/hero/hero-main.jpg` | トップのヒーロー（カウンター） |
| `public/images/store/store-counter.jpg` | カウンター席 |
| `public/images/store/store-interior-01.jpg` | 店内（カウンター＋テーブル） |
| `public/images/store/store-interior-02.jpg` | 店内（入口側） |
| `public/images/store/store-tables.jpg` | テーブル席 |
| `public/images/og/og-image.jpg` | OGP画像（1200×630・店内写真＋ロゴで自動生成済み） |

### 掲載済み（店舗から提供されたキャスト写真）

| ファイル | キャスト |
| --- | --- |
| `public/images/cast/yui-main.jpg` | ゆい |
| `public/images/cast/piyu-main.jpg` | ぴゆ |
| `public/images/cast/amai-main.jpg` | あまい |
| `public/images/cast/eru-main.jpg` | える |
| `public/images/cast/yunya-main.jpg` | ゆにゃ |
| `public/images/cast/cast-photo-placeholder.svg` | **ぽめ（写真未着のため仮画像）** |

サブ写真は `casts.ts` の `gallery` 配列に追加すると、個別ページの「◯◯の写真」欄に並びます。

> うたちゃんは退店されたため、データと写真（`uta-main.jpg` / `uta-01.jpg`）を削除しました。

### 追加で必要な写真

| 推奨ファイル名 | 用途 | 推奨サイズ | 比率 | 枚数 |
| --- | --- | --- | --- | --- |
| `cast/<slug>-main.jpg` | 未登録キャストのメイン写真 | 800×1000 | 4:5 | 不足分 |
| `cast/<slug>-01.jpg` 〜 | キャストのサブ写真 | 800×1000 | 4:5 | 各1〜4枚 |
| `access/access-step-01.jpg` | 小田急相模原駅 北口 | 1200×800 | 3:2 | 1 |
| `access/access-step-02.jpg` | 駅前の信号（右折地点） | 1200×800 | 3:2 | 1 |
| `access/access-step-03.jpg` | 南大野交番前（左折地点） | 1200×800 | 3:2 | 1 |
| `access/access-step-04.jpg` | 店舗外観・ピンクのネオン | 1200×800 | 3:2 | 1 |
| `store/store-exterior.jpg` | 外観（昼／夜） | 1200×900 | 4:3 | 1〜2 |
| `gallery/gallery-neon.jpg` | ネオンサイン | 1000×1000 | 1:1 | 1〜2 |
| `gallery/gallery-costume.jpg` | 衣装 | 1000×1000 | 1:1 | 1〜3 |
| `gallery/gallery-drink.jpg` | ドリンク | 1000×1000 | 1:1 | 2〜4 |
| `gallery/gallery-food.jpg` | フード（おつまみ） | 1000×1000 | 1:1 | 2〜4 |
| `gallery/gallery-event.jpg` | イベントの様子 | 1000×1000 | 1:1 | 2〜4 |
| `menu/menu-drink.jpg` | ドリンクのイメージ | 1200×900 | 4:3 | 1 |
| `menu/menu-cheki.jpg` | チェキのイメージ | 1200×900 | 4:3 | 1 |
| `recruit/recruit-hero.jpg` | 求人ページのメイン | 1600×900 | 16:9 | 1 |
| `news/<記事名>.jpg` | ニュースのアイキャッチ | 1200×630 | 1.91:1 | 記事ごと |

**撮影時のお願い**

- 上の比率に近い構図だと、トリミングされずに綺麗に収まります
- キャストの写真は、**必ずご本人の掲載同意を得たもの**をお使いください
- 生成AIで作った人物画像を、実在のキャストとして掲載しないでください

> **注意**: 旧WordPressサイトにあった人物写真（`img01.jpg` / `img02.jpg` / `img09.png`）は
> AI生成とみられる画像だったため、新サイトには移行していません。
> 現在キャストページに使用しているのは、店舗から提供された実際のキャスト写真のみです。

---

## 6. Vercelへのデプロイ手順

1. **GitHub にリポジトリを作成し、このプロジェクトを push する**

   ```bash
   git init
   git add .
   git commit -m "alouette 公式サイト 新規構築"
   git branch -M main
   git remote add origin https://github.com/<ユーザー名>/alouette.git
   git push -u origin main
   ```

2. **Vercel でプロジェクトを作成**
   - https://vercel.com にログイン → **Add New… → Project**
   - GitHub リポジトリを選択して **Import**
   - Framework Preset は自動で **Next.js** が選ばれます（そのままでOK）
   - Build Command / Output Directory も変更不要です

3. **環境変数を登録**（[3. お問い合わせフォームの設定](#3-お問い合わせフォームの設定) 参照）
   - `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`
   - Production と Preview の両方にチェックを入れてください

4. **Deploy** を押す
   - `xxxxx.vercel.app` の Preview URL が発行されます

5. **公開前チェック（Preview URL で実施）**
   - [ ] 全15ページが表示される
   - [ ] スマートフォン・タブレット・PCで横スクロールが発生しない
   - [ ] ヘッダーと下部固定ナビが本文と重なっていない
   - [ ] 料金が現行サイトと一致している（男性3,000円／女性2,500円／キャストドリンク1,000円／チェキ1,000円）
   - [ ] 求人の時給が現行サイトと一致している（1,300円〜／バック20%〜）
   - [ ] 住所・電話番号・営業時間が全ページで統一されている
   - [ ] **お問い合わせフォームから実際に送信し、メールが届くことを確認する**
   - [ ] `/menu/` `/recruit/` `/shop/` `/contact/` が404にならない
   - [ ] `/sitemap.xml` `/robots.txt` が表示される
   - [ ] [リッチリザルトテスト](https://search.google.com/test/rich-results)で構造化データにエラーがない
   - [ ] サンプル記事（`src/content/news/sample-open-info.md`）を削除した

---

## 7. 独自ドメインの切り替え手順

> **DNSレコードの値は推測せず、必ず Vercel の画面に表示された最新の指定値を使ってください。**
> 以下は手順の流れです。

1. **旧WordPressのバックアップを取る**
   - サーバーのファイル一式（`wp-content` を含む）
   - データベース（phpMyAdmin などから SQL をエクスポート）
   - 念のため各ページの HTML も保存しておくと安心です

2. **Vercel にドメインを追加**
   - Vercel の **Project → Settings → Domains**
   - `alouette0405.com` を追加
   - 続けて `www.alouette0405.com` も追加し、
     **`www` → `alouette0405.com` へリダイレクト**する設定にする
     （このサイトは `www` なしを正規URLとして canonical / sitemap を出力しています）

3. **表示された DNS レコードを、現在のドメイン管理会社の DNS に登録**
   - Vercel の画面に「このレコードを設定してください」と表示されます
   - 一般的には
     - ルートドメイン（`alouette0405.com`）→ **A レコード**
     - `www` → **CNAME レコード**
   - **画面に表示された値をそのままコピーしてください**（値は変わることがあります）
   - 旧サーバーを向いている既存の A / CNAME レコードは、この時に置き換えます

4. **反映を待つ**
   - DNS の反映には数分〜48時間かかります（多くは1時間以内）
   - Vercel の Domains 画面が **Valid Configuration** になれば完了です

5. **SSL（HTTPS）の確認**
   - Vercel が自動で証明書を発行します
   - `https://alouette0405.com` にアクセスして鍵マークが出ることを確認
   - `http://` でアクセスすると `https://` に自動転送されることを確認

6. **URL の引き継ぎを確認**

   | 旧URL | 新URL | 状態 |
   | --- | --- | --- |
   | `/` | `/` | そのまま |
   | `/menu/` | `/menu/` | そのまま |
   | `/recruit/` | `/recruit/` | そのまま |
   | `/shop/` | `/shop/` | そのまま |
   | `/contact/` | `/contact/` | そのまま |
   | `/2026/05/14/hello-world/` | `/news/` | 301 |
   | `/sample-page/` | `/` | 301 |
   | `/cast/まい/` | `/cast/` | 301 |
   | `/wp-sitemap*.xml` | `/sitemap.xml` | 301 |
   | `/feed/` `/category/*` `/tag/*` | `/news/` | 301 |
   | `/author/*` `/wp-content/*` | `/` | 301 |

   リダイレクトは `next.config.ts` の `redirects()` に定義しています。

7. **Google Search Console の作業**
   - プロパティ `https://alouette0405.com` を確認（未登録なら追加）
   - **サイトマップ** に `sitemap.xml` を送信
   - **URL検査** から主要ページのインデックス登録をリクエスト
     （`/` `/menu/` `/cast/` `/schedule/` `/recruit/` `/shop/` `/first-guide/`）
   - 1〜2週間後に **ページ（インデックス作成）** レポートで 404 が出ていないか確認

8. **Googleビジネスプロフィールの確認**
   - ウェブサイトのURLが `https://alouette0405.com` になっているか
   - 住所・電話番号・営業時間がサイトと一致しているか（NAP統一）

---

## 8. 旧WordPressを停止してよいタイミング

以下がすべて完了してから停止・解約してください。

- [ ] 独自ドメインが Vercel を向き、`https://alouette0405.com` で新サイトが表示されている
- [ ] SSL（HTTPS）が有効になっている
- [ ] `www` あり・なしのどちらでアクセスしても新サイトが表示される
- [ ] お問い合わせフォームから送信したメールが届くことを確認した
- [ ] `/menu/` `/recruit/` `/shop/` `/contact/` が新サイトで正しく表示される
- [ ] Search Console にサイトマップを送信し、主要ページのインデックスを申請した
- [ ] **WordPress のバックアップ（ファイル＋データベース）をローカルに保存した**
- [ ] 切り替えから **最低2週間** 経過し、Search Console に大きなエラーが出ていない

上記を満たしたら、WordPress の停止・サーバー契約の解約を行って問題ありません。
**ドメインの契約だけは絶対に解約しないでください。**

---

## 9. オーナー確認が必要な項目

現行サイトに記載がなく、こちらで判断できなかった項目です。
分かり次第、対応するファイルに追記してください（空欄のあいだはサイトにも構造化データにも出力されません）。

| 項目 | 追記先 | 備考 |
| --- | --- | --- |
| 座席数 | `src/data/store.ts` → `unverified.seats` | |
| お支払い方法（現金／カード／電子マネー） | `src/data/store.ts` → `unverified.payment` | FAQでは「店舗へお問い合わせください」としています |
| 喫煙可否 | `src/data/store.ts` → `unverified.smoking` | 同上 |
| 予約の要否・条件 | `src/data/store.ts` → `unverified.reservationPolicy` | |
| 団体・貸切の条件 | `src/data/store.ts` → `unverified.groupPolicy` / `privateHirePolicy` | |
| 駐車場の有無 | `src/data/store.ts` → `unverified.parking` | |
| 延長料金 | `src/data/menu.ts` | 「自動延長制」とだけ記載しています |
| フードの金額 | `src/data/menu.ts` | 現行サイトに記載がないため未掲載 |
| 求人：交通費・送迎・衣装代・ノルマ・罰金・勤務時間帯 | `src/data/recruit.ts` → `unverified` | |
| 求人：体験入店の時給・持ち物 | `src/data/recruit.ts` → `unverified.trialWage` | |
| 「かわいい衣装支給」の可否 | `src/data/recruit.ts` → `costumeNote` | 旧サイトのトップページに記載があったため掲載中。誤りなら削除してください |
| **ゆい・ゆにゃ のプロフィールの割り当て** | `src/data/casts.ts` | 2件とも「ゆにゃちゃん」名義で届いたため、9月8日の方を ゆい、5月13日の方を ゆにゃ として登録しました。逆であればお知らせください |
| **ぽめ の写真** | `public/images/cast/pome-main.jpg` | 未着のため現在は仮画像です |
| 公式 Instagram（新アカウント） | `src/config/site.ts` → `socialLinks.instagram` | 旧アカウントがBANされたため空欄。開設後に設定してください |
| 公式 LINE の URL | `src/config/site.ts` → `socialLinks.line` | 旧サイトはボタンのみでリンク未設定でした |
| 公式 TikTok の URL | `src/config/site.ts` → `socialLinks.tiktok` | 同上 |
| キャスト個人SNSのアカウント名 | `src/data/casts.ts` | LINEの文面から転記しました。誤りがないかご確認ください |
| キャスト写真・プロフィールの掲載同意 | — | 6名分を公開しています。同意が取れていない方がいれば `isPublished: false` にしてください |
| 駅からの道順の写真4点 | `public/images/access/` | 現在はプレースホルダー |

### 表記を統一した箇所

旧サイトではトップページが「徒歩5分」、アクセスページが「徒歩4分」と混在していました。
ご指示に従い、**「徒歩4分」に統一**しています（`src/data/store.ts` の `access.walkMinutes`）。

---

## 掲載内容についての方針

- 料金・求人条件は現行サイトの内容と完全に一致させています。金額の追加・変更は行っていません。
- 現行サイトに記載のない情報（座席数・支払い方法・喫煙可否・延長料金など）は、
  推測で書かず「店舗へお問い合わせください」と案内しています。
- 口コミ・評価は掲載していません（構造化データにも出力していません）。
- 他店のテキスト・デザイン・写真は使用していません。
