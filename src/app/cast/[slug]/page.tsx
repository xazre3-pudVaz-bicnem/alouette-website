import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactCta from '@/components/common/ContactCta';
import Reveal from '@/components/ui/Reveal';
import ActionLink from '@/components/ui/ActionLink';
import ReserveActions from '@/components/common/ReserveActions';
import SectionHeading from '@/components/ui/SectionHeading';
import {
  castSocialLinks,
  detailPageCasts,
  findCast,
  hasProfile,
} from '@/data/casts';
import { buildMetadata } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  return detailPageCasts().map((cast) => ({ slug: cast.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cast = findCast(slug);
  if (!cast) return buildMetadata({ title: 'キャスト', description: '', path: '/cast/', noindex: true });

  return buildMetadata({
    title: `${cast.name}｜キャスト紹介｜相模原のコンカフェ alouette`,
    description: [
      `相模原のコンカフェ alouette（あるえっと）のキャスト「${cast.name}」のページです。`,
      cast.catchphrase ? `${cast.catchphrase}。` : '',
      'メッセージやプロフィールをチェックして、ぜひ会いにきてください。小田急相模原駅から徒歩4分。',
    ].join(''),
    path: `/cast/${cast.slug}/`,
    image: cast.mainImage.endsWith('.svg') ? undefined : cast.mainImage,
  });
}

export default async function CastDetailPage({ params }: Params) {
  const { slug } = await params;
  const cast = findCast(slug);
  if (!cast) notFound();

  const socials = castSocialLinks(cast);
  const others = detailPageCasts()
    .filter((c) => c.slug !== cast.slug)
    .slice(0, 4);

  const profileRows: { label: string; value: string }[] = [
    { label: '誕生日', value: cast.birthday },
    { label: '趣味', value: cast.hobbies.join('／') },
    { label: '好きなもの', value: cast.favorites.join('／') },
    { label: '好きなドリンク', value: cast.favoriteDrink },
  ].filter((row) => row.value.trim().length > 0);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: '女の子紹介', path: '/cast/' },
          { name: cast.name, path: `/cast/${cast.slug}/` },
        ]}
      />

      <article>
        <section className="bg-ivory pb-14 md:pb-20">
          <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16">
            <div className="relative aspect-4/5 overflow-hidden bg-shell">
              <Image
                src={cast.mainImage}
                alt={`${cast.name}のプロフィール写真`}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                style={{ objectPosition: cast.imagePosition ?? 'center' }}
                className="object-cover"
              />
            </div>

            <Reveal>
              <p className="eyebrow text-rose">Cast</p>
              <h1 className="mt-4 font-display text-[2.1rem] leading-tight text-bordeaux sm:text-[2.6rem]">
                {cast.name}
              </h1>
              {cast.nickname ? (
                <p className="mt-1 text-[0.85rem] text-ink-soft">
                  {cast.nickname}
                </p>
              ) : null}
              {cast.catchphrase ? (
                <p className="mt-5 text-[0.95rem] leading-[2] text-rose">
                  {cast.catchphrase}
                </p>
              ) : null}

              {!hasProfile(cast) ? (
                <p className="mt-6 rounded-lg bg-shell px-5 py-4 text-[0.85rem] leading-[1.9] text-ink-soft">
                  プロフィールは準備中です。ご来店の際にぜひ直接お話しください。
                </p>
              ) : null}

              {profileRows.length > 0 ? (
                <dl className="mt-9 overflow-hidden rounded-lg border border-rose/15">
                  {profileRows.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex gap-6 px-5 py-3.5 sm:px-7 ${
                        i % 2 === 0 ? 'bg-ivory' : 'bg-shell/60'
                      }`}
                    >
                      <dt className="w-28 shrink-0 text-[0.76rem] tracking-[0.08em] text-rose">
                        {row.label}
                      </dt>
                      <dd className="text-[0.9rem] text-ink-soft">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {socials.length > 0 ? (
                <>
                  <p className="mt-7 text-[0.76rem] tracking-[0.08em] text-rose">
                    {cast.name}のSNS
                  </p>
                  <ul className="mt-2.5 flex flex-wrap gap-3">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block rounded-full border border-rose/30 px-5 py-2 text-[0.8rem] text-rose transition hover:bg-shell"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              <ActionLink href="/contact/" className="mt-9">
                WEBで予約する
              </ActionLink>
            </Reveal>
          </div>
        </section>

        {/* メッセージ */}
        {cast.message ? (
          <section className="border-y border-rose/12 bg-shell py-14 md:py-20">
            <div className="container-page">
              <Reveal className="mx-auto max-w-2xl text-center">
                <p className="eyebrow text-rose">Message</p>
                <p className="mt-6 font-display text-[1.05rem] leading-[2.1] text-bordeaux whitespace-pre-line sm:text-[1.2rem]">
                  {cast.message}
                </p>
                <p className="mt-6 text-[0.82rem] text-ink-soft">
                  — {cast.name}
                </p>
              </Reveal>
            </div>
          </section>
        ) : null}

        {/* サブ写真 */}
        {cast.gallery.length > 0 ? (
          <section className="bg-ivory py-14 md:py-20">
            <div className="container-page">
              <Reveal>
                <SectionHeading eyebrow="Photo" as="h2">
                  {cast.name}の写真
                </SectionHeading>
              </Reveal>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {cast.gallery.map((src) => (
                  <li
                    key={src}
                    className="relative aspect-4/5 overflow-hidden bg-shell"
                  >
                    <Image
                      src={src}
                      alt={`${cast.name}の写真`}
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* 会いに行く導線 */}
        <section className="border-t border-rose/12 bg-ivory py-14 md:py-20">
          <div className="container-page">
            <Reveal className="mx-auto max-w-2xl rounded-lg bg-shell px-6 py-9 text-center sm:px-10">
              <p className="eyebrow text-rose">Reservation</p>
              <h2 className="mt-4 font-display text-[1.2rem] leading-relaxed text-bordeaux sm:text-[1.4rem]">
                {cast.name}に会いにいく
              </h2>
              <p className="mt-4 text-[0.88rem] leading-[1.95] text-ink-soft">
                出勤日はお店にお問い合わせいただくのがいちばん確実です。
                ご予約の際に「{cast.name}に会いたい」とお伝えください。
              </p>
              <ReserveActions className="mt-7 text-left sm:text-center" />
            </Reveal>
          </div>
        </section>

        {/* 他のキャスト */}
        {others.length > 0 ? (
          <section className="border-t border-rose/12 bg-shell py-14 md:py-20">
            <div className="container-page">
              <Reveal>
                <SectionHeading eyebrow="Other Cast" as="h2">
                  ほかの女の子を見る
                </SectionHeading>
              </Reveal>
              <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
                {others.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/cast/${c.slug}/`}
                      className="group flex items-center gap-4"
                    >
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-ivory">
                        <Image
                          src={c.mainImage}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-display text-[1rem] text-bordeaux">
                          {c.name}
                        </span>
                        <span className="block truncate text-[0.75rem] text-ink-soft">
                          {c.catchphrase || c.nickname}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </article>

      <ContactCta />
    </>
  );
}
