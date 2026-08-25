import { setPlans, systemNotes } from '@/data/menu';

const yen = (n: number) => `${n.toLocaleString('ja-JP')}円`;

/**
 * 60分セット料金の表示。
 * 金額は data/menu.ts の値のみを使用します（ハードコード禁止）。
 */
export default function PriceBoard({
  tone = 'dark',
}: {
  tone?: 'dark' | 'light';
}) {
  const isLight = tone === 'light';

  return (
    <div>
      <dl className="grid gap-px overflow-hidden rounded-lg bg-rose/20 sm:grid-cols-2">
        {setPlans.map((plan) => (
          <div
            key={plan.name}
            className={`px-7 py-8 text-center ${
              isLight ? 'bg-ink/40' : 'bg-ivory'
            }`}
          >
            <dt
              className={`font-latin text-[0.72rem] tracking-[0.28em] ${
                isLight ? 'text-blush' : 'text-rose'
              }`}
            >
              SET / {plan.note}
            </dt>
            <dd className="mt-3">
              <span
                className={`block text-[0.9rem] ${
                  isLight ? 'text-ivory/80' : 'text-ink-soft'
                }`}
              >
                {plan.name}
              </span>
              <span
                className={`mt-1 block font-display text-[2.1rem] leading-none ${
                  isLight ? 'text-ivory' : 'text-bordeaux'
                }`}
              >
                {plan.price ? yen(plan.price) : '—'}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <ul
        className={`mt-5 space-y-1.5 text-[0.8rem] ${
          isLight ? 'text-ivory/70' : 'text-ink-soft'
        }`}
      >
        {systemNotes.map((note) => (
          <li key={note} className="flex gap-2">
            <span aria-hidden className="text-rose">
              ※
            </span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
