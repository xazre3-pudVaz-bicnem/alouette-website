import Link from 'next/link';
import JsonLd from '@/components/ui/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';

export type Crumb = { name: string; path: string };

/**
 * パンくずリスト。表示と BreadcrumbList 構造化データを同時に出力します。
 * items の最後の要素が現在地です（先頭のトップは自動で付きます）。
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: 'トップ', path: '/' }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <nav aria-label="パンくずリスト" className="container-page py-4">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] text-ink-soft/75">
          {all.map((crumb, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-rose">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className="hover:text-rose">
                      {crumb.name}
                    </Link>
                    <span aria-hidden className="text-rose/40">
                      ／
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
