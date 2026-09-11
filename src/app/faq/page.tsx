import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactCta from '@/components/common/ContactCta';
import Reveal from '@/components/ui/Reveal';
import ActionLink from '@/components/ui/ActionLink';
import JsonLd from '@/components/ui/JsonLd';
import { faqs, faqCategories, faqCategoryIds } from '@/data/faq';
import { store } from '@/data/store';
import { faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'よくある質問｜相模原のコンカフェ alouette',
  description:
    '相模原のコンカフェ alouette（あるえっと）によく寄せられるご質問をまとめました。料金システム、ひとりでの来店、女性の利用、予約の要否、アクセスなど、ご来店前の疑問を解消してください。',
  path: '/faq/',
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHeader
        eyebrow="FAQ"
        title="よくある質問"
        lead="ご来店前によくいただくご質問をまとめました。ここにない内容は、お気軽に店舗までお問い合わせください。"
      />
      <Breadcrumbs items={[{ name: 'よくある質問', path: '/faq/' }]} />

      {/* カテゴリ内リンク */}
      <section className="bg-ivory pt-6 pb-2">
        <div className="container-page">
          <ul className="flex flex-wrap gap-2">
            {faqCategories.map((c) => (
              <li key={c}>
                <a
                  href={`#${faqCategoryIds[c]}`}
                  className="inline-block rounded-full border border-rose/30 px-5 py-2 text-[0.8rem] text-rose transition hover:bg-shell"
                >
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ivory py-10 md:py-14">
        <div className="container-page max-w-4xl">
          {faqCategories.map((category) => {
            const items = faqs.filter((f) => f.category === category);
            if (items.length === 0) return null;

            return (
              <div
                key={category}
                id={faqCategoryIds[category]}
                className="mt-12 first:mt-0"
              >
                <h2 className="font-display text-[1.3rem] text-bordeaux">
                  <span className="mr-3 font-latin text-[0.72rem] tracking-[0.24em] text-rose">
                    {String(faqCategories.indexOf(category) + 1).padStart(2, '0')}
                  </span>
                  {category}
                </h2>

                <dl className="mt-6 divide-y divide-rose/12 border-y border-rose/12">
                  {items.map((f) => (
                    <Reveal key={f.q} className="py-6">
                      <dt className="flex gap-4">
                        <span
                          aria-hidden
                          className="font-latin text-[1.05rem] leading-none text-petal"
                        >
                          Q
                        </span>
                        <span className="font-display text-[1.02rem] leading-snug text-bordeaux">
                          {f.q}
                        </span>
                      </dt>
                      <dd className="mt-3 flex gap-4">
                        <span
                          aria-hidden
                          className="font-latin text-[1.05rem] leading-none text-rose/50"
                        >
                          A
                        </span>
                        <span className="text-[0.9rem] leading-[2] text-ink-soft">
                          {f.a}
                        </span>
                      </dd>
                    </Reveal>
                  ))}
                </dl>
              </div>
            );
          })}

          <Reveal className="mt-14 rounded-lg bg-shell px-6 py-8 text-center">
            <h2 className="font-display text-[1.15rem] text-bordeaux">
              解決しない場合は、お気軽にご連絡ください
            </h2>
            <p className="mt-3 text-[0.87rem] leading-[1.95] text-ink-soft">
              お電話の受付時間は{store.telHours}（{store.closedNote}）。営業時間外は公式XのDMからもご連絡いただけます。
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ActionLink href={`tel:${store.telHref}`} variant="outline">
                {store.tel}
              </ActionLink>
              <ActionLink href="/contact/">ご予約・お問い合わせ</ActionLink>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
