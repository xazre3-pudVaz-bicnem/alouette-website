import type { Metadata } from 'next';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { store } from '@/data/store';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'プライバシーポリシー｜相模原のコンカフェ alouette',
  description:
    'コンカフェ alouette（あるえっと）のプライバシーポリシーです。お電話やSNSでお預かりする個人情報の利用目的、管理方法、第三者提供、アクセス解析の取り扱いについてご説明します。',
  path: '/privacy-policy/',
});

const sections: { title: string; body: string[] }[] = [
  {
    title: '1. 個人情報の定義',
    body: [
      '本ポリシーにおける「個人情報」とは、個人情報の保護に関する法律に定める個人情報を指し、氏名、フリガナ、電話番号、メールアドレスなど、特定の個人を識別できる情報をいいます。',
    ],
  },
  {
    title: '2. 取得する情報',
    body: [
      '当サイトには入力フォームを設置していません。お電話またはSNSのダイレクトメッセージでご予約・お問い合わせをいただく際に、お名前、電話番号、ご来店希望日時、人数、お問い合わせ内容などをお伺いすることがあります。',
      'また、サイトの利用状況を把握するため、アクセス日時やブラウザの種類などの情報を取得する場合があります。',
    ],
  },
  {
    title: '3. 利用目的',
    body: [
      'お預かりした個人情報は、次の目的でのみ利用します。',
      '・ご予約およびお問い合わせへの回答、ご連絡のため',
      '・求人へのご応募に関するご連絡および選考のため',
      '・当店のサービス改善、サイトの利便性向上のため',
    ],
  },
  {
    title: '4. 第三者への提供',
    body: [
      '当店は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者へ提供することはありません。',
    ],
  },
  {
    title: '5. 個人情報の管理',
    body: [
      '当店は、お預かりした個人情報の漏えい、滅失、毀損を防止するため、必要かつ適切な安全管理措置を講じます。',
      '当サイトの通信は暗号化（HTTPS）されています。',
    ],
  },
  {
    title: '6. アクセス解析について',
    body: [
      '当サイトでは、サイトの利用状況を把握するためにアクセス解析ツールを利用する場合があります。これらのツールは Cookie を使用してデータを収集することがありますが、個人を特定する情報は含まれません。',
      'Cookie の利用は、ブラウザの設定により無効にすることができます。',
    ],
  },
  {
    title: '7. 開示・訂正・削除のご請求',
    body: [
      'ご本人からお預かりした個人情報の開示、訂正、利用停止、削除をご希望の場合は、下記の連絡先までご連絡ください。ご本人であることを確認のうえ、速やかに対応いたします。',
    ],
  },
  {
    title: '8. 本ポリシーの変更',
    body: [
      '当店は、法令の改正やサービス内容の変更に応じて、本ポリシーを変更することがあります。変更後の内容は、当サイトに掲載した時点から適用されます。',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy Policy"
        title="プライバシーポリシー"
        lead={`${siteConfig.name}（${siteConfig.nameJa}）は、お客様の個人情報を適切に取り扱い、保護することが重要な責務であると考えています。`}
      />
      <Breadcrumbs
        items={[{ name: 'プライバシーポリシー', path: '/privacy-policy/' }]}
      />

      <section className="bg-ivory py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-[1.1rem] text-bordeaux">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-2.5 text-[0.9rem] leading-[2] text-ink-soft">
                  {section.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-lg bg-shell px-6 py-7">
              <h2 className="font-display text-[1.1rem] text-bordeaux">
                9. お問い合わせ窓口
              </h2>
              <address className="mt-3 space-y-1 text-[0.9rem] leading-[1.9] not-italic text-ink-soft">
                <p>
                  {store.name}（{store.nameJa}）
                </p>
                <p>{store.address.full}</p>
                <p>
                  TEL{' '}
                  <a
                    href={`tel:${store.telHref}`}
                    className="text-rose underline underline-offset-4"
                  >
                    {store.tel}
                  </a>
                  （受付時間 {store.telHours}／{store.closedNote}）
                </p>
              </address>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
