import Image from 'next/image';
import { heroCopy } from '@/data/concept';
import { store } from '@/data/store';

/**
 * ヒーロー。
 * 実際の店内写真を全面に敷き、テキストは最小限（ブランド名・コピー・営業時間）に留めます。
 * 予約導線はヘッダー／ヒーロー直下／SP固定ナビに置くため、ここにはボタンを並べません。
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[86svh] items-end overflow-hidden bg-ink sm:min-h-[92svh]">
      <Image
        src="/images/hero/hero-main.jpg"
        alt="夜のピンクのネオンが灯る、コンカフェ alouette のイメージイラスト"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="ken-burns object-cover object-[70%_50%] md:object-center"
      />

      {/* 文字が乗る左下だけを沈ませ、イラストの色はできるだけ残す */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent md:via-ink/10"
      />

      {/* きらめき */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="twinkle absolute top-[22%] left-[14%] h-1.5 w-1.5 rounded-full bg-blush" />
        <span
          className="twinkle absolute top-[34%] right-[18%] h-1 w-1 rounded-full bg-ivory"
          style={{ animationDelay: '1.1s' }}
        />
        <span
          className="twinkle absolute top-[58%] left-[72%] h-1.5 w-1.5 rounded-full bg-petal"
          style={{ animationDelay: '2.2s' }}
        />
      </div>

      <div className="container-page relative z-10 pt-32 pb-16 sm:pb-24">
        <p
          className="eyebrow rise-in text-blush"
          style={{ animationDelay: '0.15s' }}
        >
          Concept Cafe &amp; Bar
        </p>

        {/* H1 はページに1つだけ。1行目に対策キーワード、2〜3行目がキャッチコピー */}
        <h1 className="mt-5 max-w-4xl text-ivory">
          <span
            className="rise-in block text-[0.86rem] leading-relaxed tracking-[0.06em] text-blush sm:text-[0.95rem]"
            style={{ animationDelay: '0.3s' }}
          >
            {heroCopy.lead}
          </span>
          <span className="mt-3 block font-display text-[2rem] leading-[1.45] sm:text-[3.1rem] sm:leading-[1.4]">
            {heroCopy.headline.map((line, i) => (
              <span
                key={line}
                className="rise-in block"
                style={{ animationDelay: `${0.44 + i * 0.14}s` }}
              >
                {line}
              </span>
            ))}
          </span>
        </h1>

        <p
          className="rise-in mt-6 max-w-xl text-[0.9rem] leading-[2] text-ivory/85 sm:text-[0.98rem]"
          style={{ animationDelay: '0.76s' }}
        >
          {heroCopy.sub}
        </p>

        <dl
          className="rise-in mt-9 flex flex-wrap items-center gap-x-7 gap-y-2 text-[0.8rem] text-ivory/75"
          style={{ animationDelay: '0.9s' }}
        >
          <div className="flex items-baseline gap-2">
            <dt className="font-latin tracking-[0.18em] text-petal">OPEN</dt>
            <dd className="font-latin text-[0.95rem] tracking-wide text-ivory">
              {store.businessHours}
            </dd>
          </div>
          <div className="flex items-baseline gap-2">
            <dt className="font-latin tracking-[0.18em] text-petal">CLOSED</dt>
            <dd className="text-ivory">{store.closedDays}</dd>
          </div>
          <div className="flex items-baseline gap-2">
            <dt className="font-latin tracking-[0.18em] text-petal">ACCESS</dt>
            <dd className="text-ivory">{store.access.walkText}</dd>
          </div>
        </dl>
      </div>

      {/* スクロールの合図 */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-latin text-[0.6rem] tracking-[0.3em] text-ivory/60">
          SCROLL
        </span>
        <span className="block h-10 w-px bg-gradient-to-b from-ivory/60 to-transparent" />
      </div>
    </section>
  );
}
