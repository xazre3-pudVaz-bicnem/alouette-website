---
title: '【サンプル記事】公開前に削除してください'
date: 2026-08-01
updated: 2026-08-01
category: 'お知らせ'
thumbnail: '/images/visual/night-window.jpg'
excerpt: 'これはニュース機能の表示確認用サンプル記事です。本番公開前に src/content/news/sample-open-info.md を削除してください。'
seoTitle: '【サンプル記事】ニュース機能の使い方'
metaDescription: 'ニュース機能の表示確認用サンプル記事です。公開前に削除してください。'
published: true
isSample: true
links:
  - label: '料金・メニューを見る'
    url: '/menu/'
  - label: 'アクセス・店舗情報'
    url: '/shop/'
---

**これはサンプル記事です。公開前に削除してください。**

このファイル（`src/content/news/sample-open-info.md`）を削除すると、この記事はサイトから消えます。

## 記事の追加方法

1. `src/content/news/` に `.md` ファイルを新規作成します
2. ファイル名がそのまま URL になります（`summer-event.md` → `/news/summer-event/`）
3. ファイル冒頭の `---` で囲まれた部分（フロントマター）に、タイトルや公開日を書きます
4. `---` より下に本文を Markdown で書きます

## フロントマターの項目

| 項目 | 必須 | 内容 |
| --- | --- | --- |
| `title` | ○ | 記事タイトル |
| `date` | ○ | 公開日（`YYYY-MM-DD`） |
| `updated` | | 更新日 |
| `category` | ○ | `イベント` / `お知らせ` / `キャスト` / `求人情報` |
| `thumbnail` | | アイキャッチ画像のパス |
| `excerpt` | ○ | 一覧に出る要約 |
| `seoTitle` | | 検索結果用タイトル（未設定なら `title`） |
| `metaDescription` | | 検索結果用の説明文（未設定なら `excerpt`） |
| `published` | | `false` にすると非公開になります |
| `links` | | 関連リンク（`label` と `url`） |

## 本文で使える書き方

見出しは `##`、箇条書きは `-`、**太字** は `**` で囲みます。リンクは `[表示文字](URL)` と書きます。
