# alouette 公式サイト — 作業ルール

相模原市南区南台のコンセプトカフェ＆バー「alouette（あるえっと）」の公式サイト。
ルートの `c:/projects/CLAUDE.md`（Elite Web Agency Master System）に加えて、
このプロジェクトでは以下を必ず守ること。

## 掲載内容の絶対ルール

- **料金を勝手に作らない・変えない。** セット料金（男性3,000円／女性2,500円・60分・税込）、
  キャストドリンク1,000円、チェキ1,000円、生ビール+200円 が現行サイトの全料金。
  フードには金額の記載がないため、金額を付けない。
- **求人条件を変えない。** 時給1,300円〜／各種バック20%〜／日払いOK（上限あり）／
  週1日〜の自由シフト制／18歳以上（高校生不可）／履歴書不要。
- **確認できない情報を書かない。** 座席数・支払い方法・喫煙可否・延長料金・予約条件・
  団体/貸切条件・在籍人数・交通費・送迎・ノルマなどは現行サイトに記載がない。
  断定せず「店舗へお問い合わせください」とし、`unverified` に空欄で用意する。
- **架空の口コミ・評価を作らない。** 構造化データにも `aggregateRating` を入れない。
- **AI生成の人物画像を実在キャストとして掲載しない。** 旧サイトの `img01/img02/img09` は
  AI生成とみられるため移行していない。現在のキャスト写真はすべて店舗から提供された実写。
- **キャッチコピー・本人からのメッセージを創作しない。** 本人が書いた文章だけを載せる。
  未入稿なら空欄のままにする（空欄の項目は画面に出ない）。
- **退店したキャストは即座に削除する。** `casts.ts` の項目と `public/images/cast/` の写真の両方。
- **コンカフェをキャバクラ・ガールズバーと断定する表現を使わない。**
  「コンセプトカフェ＆バー」と表記する。
- 確認できない SNS リンクを入れない（`socialLinks` が空ならボタンごと非表示になる）。
  店舗Instagramは旧アカウントがBANされたため空欄、Xは `@alouette0405`（2026年8月時点）。

## データの置き場所

コンポーネントに値を直書きしないこと。すべて以下から読む。

| 内容 | ファイル |
| --- | --- |
| ドメイン・SNS・ナビ | `src/config/site.ts` |
| 店舗情報（NAP・営業時間） | `src/data/store.ts` |
| 料金・メニュー | `src/data/menu.ts` |
| キャスト | `src/data/casts.ts` |
| 求人 | `src/data/recruit.ts` |
| FAQ | `src/data/faq.ts` |
| ギャラリー | `src/data/gallery.ts` |
| 道順 | `src/data/access.ts` |
| コンセプト文 | `src/data/concept.ts` |
| ニュース記事 | `src/content/news/*.md` |

住所・電話番号は `store.ts` の1か所だけを変更すれば全ページに反映される（NAP統一）。

## 予約導線

**入力フォームは作らない。** ご予約・お問い合わせ・求人応募はすべて
**電話（`store.tel`）と公式XのDM（`socialLinks.x`）**に集約する。
ボタンは `components/common/ReserveActions.tsx` の1か所で管理する。
出勤情報（スケジュール）機能も持たない。

## URL

`/menu/` `/recruit/` `/shop/` `/contact/` は旧WordPressから引き継ぐURL。**変更しない。**
`trailingSlash: true`。URLを変える場合は `next.config.ts` の `redirects()` に301を追加する。

## SEO

- 対策キーワードは「相模原 コンカフェ」。関連: 小田急相模原 コンカフェ／相模原市 コンカフェ／
  相模原 コンカフェ 求人 など。**不自然に連呼しない。**
- 各ページに固有の title / description（90〜130文字）/ canonical / OGP を `buildMetadata()` で設定する。
- H1 はページに1つだけ。キーワードは自然な文中に置く。
- 構造化データは `src/lib/jsonld.ts` から生成する。ページに表示していない内容は出力しない。
- 最寄り駅の徒歩分数は**「徒歩4分」に統一**（旧サイトは4分と5分が混在していた）。

## デザイン

- メインはピンク。ただし安っぽくしない。`globals.css` の `@theme` にある
  ink / bordeaux / rose / petal / blush / shell / ivory / champagne を使う。
- 同じ角丸カードの連続、意味のないグラデーション、全セクションのピンクグラデーションは禁止。
  セクションごとに背景（ivory / shell / bordeaux / ink）とレイアウトを変える。
- アニメーションは控えめに。`Reveal`（IntersectionObserver）、`ken-burns`、`twinkle`、`rise-in` のみ。
  外部アニメーションライブラリは入れない。
- ヒーローに CTA ボタンを並べない。予約導線はヘッダー／ヒーロー直下の TodayBar／SP固定ナビに置く。
- ヒーローと `public/images/visual/` はイメージイラスト。**実店舗の写真として説明しない**
  （ギャラリーでは「イメージ」バッジを付ける）。
- Tailwind v4 のため、素のクラスは `@layer components` に書く（ユーティリティを打ち消さないように）。

## 実装の約束

- 既定は Server Component。`'use client'` は Header / MobileNav / Reveal / GalleryGrid のみ。
- 画像は `next/image`。ヒーローだけ `priority`。
- ニュースを扱うページは `export const revalidate = 3600`。
- 日付は必ず `src/lib/date.ts` の JST ユーティリティを使う（サーバーがUTCでもズレないように）。
- 個人情報を `console.log` に出さない。
- 変更後は `npm run build` と `npm run lint` を通すこと。
