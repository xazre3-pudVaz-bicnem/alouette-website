import { store } from '@/data/store';

/** 店舗情報テーブル（NAP を data/store.ts から一元表示） */
export default function StoreInfoTable() {
  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: '店名',
      value: `${store.name}（${store.nameJa}）`,
    },
    { label: '業態', value: store.category },
    { label: '住所', value: store.address.full },
    {
      label: '電話番号',
      value: (
        <a
          href={`tel:${store.telHref}`}
          className="inline-block py-1 font-latin text-[1.05rem] tracking-wide text-rose underline underline-offset-4"
        >
          {store.tel}
        </a>
      ),
    },
    { label: '電話受付', value: `${store.telHours}（日曜定休）` },
    { label: '営業時間', value: store.businessHours },
    { label: '定休日', value: store.closedDays },
    { label: '最寄り駅', value: store.access.station },
    { label: '駅からの所要時間', value: store.access.walkText },
  ];

  return (
    <dl className="overflow-hidden rounded-lg border border-rose/15">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6 sm:px-7 ${
            i % 2 === 0 ? 'bg-ivory' : 'bg-shell/60'
          }`}
        >
          <dt className="shrink-0 text-[0.78rem] tracking-[0.08em] text-rose sm:w-40 sm:pt-1">
            {row.label}
          </dt>
          <dd className="text-[0.92rem] text-ink-soft">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
