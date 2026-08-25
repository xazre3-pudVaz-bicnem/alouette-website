'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useId, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { submitContact } from '@/app/contact/actions';
import {
  initialContactState,
  inquiryTypes,
  partySizeOptions,
  visitTimeOptions,
} from '@/lib/contact-schema';
import { store } from '@/data/store';

const fieldBase =
  'w-full rounded-lg border bg-ivory px-4 py-3 text-[0.95rem] text-ink transition placeholder:text-ink-soft/40 focus:outline-none';

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-2 text-[0.85rem] text-bordeaux"
    >
      {children}
      {required ? (
        <span className="rounded-sm bg-rose px-1.5 py-0.5 text-[0.62rem] tracking-wide text-ivory">
          必須
        </span>
      ) : (
        <span className="rounded-sm border border-rose/30 px-1.5 py-0.5 text-[0.62rem] tracking-wide text-rose/70">
          任意
        </span>
      )}
    </label>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.78rem] text-bordeaux">
      {message}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-bordeaux px-8 py-4 text-[0.95rem] tracking-[0.08em] text-ivory transition hover:bg-rose disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[16rem]"
    >
      {pending ? '送信中…' : '同意して送信する'}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialContactState);
  const params = useSearchParams();
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  /** /contact/?type=recruit のように種別を初期選択できるようにする */
  const requested = params.get('type');
  const defaultType = inquiryTypes.some((t) => t.value === requested)
    ? (requested as string)
    : 'reserve';
  const [inquiryType, setInquiryType] = useState(defaultType);

  useEffect(() => {
    if (state.status === 'idle') return;
    statusRef.current?.focus();
  }, [state]);

  /**
   * React はフォームアクションの完了時に未制御の入力をリセットするため、
   * 送信エラーのときはサーバーから返ってきた値を defaultValue に戻し、
   * attempt を key にして確実に再描画させる（入力のやり直しを防ぐ）。
   */
  const prev = state.values ?? {};

  const err = (key: string) => state.errors[key];
  const inputCls = (key: string) =>
    `${fieldBase} ${
      err(key)
        ? 'border-bordeaux focus:border-bordeaux'
        : 'border-rose/25 focus:border-rose'
    }`;

  if (state.status === 'success') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-rose/25 bg-shell px-7 py-12 text-center focus:outline-none"
      >
        <p className="font-latin text-[0.72rem] tracking-[0.28em] text-rose">
          Thank you
        </p>
        <h2 className="mt-4 font-display text-[1.35rem] text-bordeaux">
          送信が完了しました
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[0.9rem] leading-[1.95] text-ink-soft">
          {state.message}
        </p>
        <p className="mt-5 text-[0.82rem] text-ink-soft">
          お急ぎの場合は、お電話（
          <a
            href={`tel:${store.telHref}`}
            className="text-rose underline underline-offset-4"
          >
            {store.tel}
          </a>
          ／受付 {store.telHours}）でもご連絡いただけます。
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-rose/35 px-7 py-3 text-[0.88rem] text-bordeaux transition hover:bg-ivory"
        >
          トップページへ戻る
        </Link>
      </div>
    );
  }

  return (
    <form
      key={state.attempt}
      action={formAction}
      noValidate
      className="space-y-7"
    >
      {state.status === 'error' ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-bordeaux/40 bg-shell px-5 py-4 text-[0.88rem] text-bordeaux focus:outline-none"
        >
          {state.message}
        </div>
      ) : null}

      {/* スパム対策（人間には見えない項目） */}
      <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={`${uid}-website`}>ウェブサイト</label>
        <input
          id={`${uid}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* お問い合わせ種別 */}
      <fieldset>
        <legend className="mb-3 flex items-center gap-2 text-[0.85rem] text-bordeaux">
          お問い合わせ種別
          <span className="rounded-sm bg-rose px-1.5 py-0.5 text-[0.62rem] text-ivory">
            必須
          </span>
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {inquiryTypes.map((type) => (
            <label
              key={type.value}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-[0.9rem] transition ${
                inquiryType === type.value
                  ? 'border-rose bg-shell text-bordeaux'
                  : 'border-rose/25 bg-ivory text-ink-soft hover:border-rose/50'
              }`}
            >
              <input
                type="radio"
                name="inquiryType"
                value={type.value}
                checked={inquiryType === type.value}
                onChange={(e) => setInquiryType(e.target.value)}
                className="h-4 w-4 accent-[#c2416b]"
              />
              {type.label}
            </label>
          ))}
        </div>
        <ErrorText id={`${uid}-inquiryType-error`} message={err('inquiryType')} />
        {inquiryType === 'recruit' ? (
          <p className="mt-3 rounded-lg bg-shell px-4 py-3 text-[0.8rem] leading-[1.85] text-ink-soft">
            求人応募の方へ：来店希望日・時間・人数の欄は、面接や体験入店のご希望日時としてご記入ください。
            18歳以上（高校生不可）の方が対象です。
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${uid}-name`} required>
            お名前
          </Label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!err('name')}
            aria-describedby={err('name') ? `${uid}-name-error` : undefined}
            className={inputCls('name')}
            placeholder="相模原 花子"
            defaultValue={prev.name ?? ''}
          />
          <ErrorText id={`${uid}-name-error`} message={err('name')} />
        </div>

        <div>
          <Label htmlFor={`${uid}-kana`}>フリガナ</Label>
          <input
            id={`${uid}-kana`}
            name="kana"
            type="text"
            aria-invalid={!!err('kana')}
            aria-describedby={err('kana') ? `${uid}-kana-error` : undefined}
            className={inputCls('kana')}
            placeholder="サガミハラ ハナコ"
            defaultValue={prev.kana ?? ''}
          />
          <ErrorText id={`${uid}-kana-error`} message={err('kana')} />
        </div>

        <div>
          <Label htmlFor={`${uid}-tel`} required>
            電話番号
          </Label>
          <input
            id={`${uid}-tel`}
            name="tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={!!err('tel')}
            aria-describedby={err('tel') ? `${uid}-tel-error` : undefined}
            className={inputCls('tel')}
            placeholder="090-1234-5678"
            defaultValue={prev.tel ?? ''}
          />
          <ErrorText id={`${uid}-tel-error`} message={err('tel')} />
        </div>

        <div>
          <Label htmlFor={`${uid}-email`} required>
            メールアドレス
          </Label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={!!err('email')}
            aria-describedby={err('email') ? `${uid}-email-error` : undefined}
            className={inputCls('email')}
            placeholder="example@example.com"
            defaultValue={prev.email ?? ''}
          />
          <ErrorText id={`${uid}-email-error`} message={err('email')} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <Label htmlFor={`${uid}-visitDate`}>来店希望日</Label>
          <input
            id={`${uid}-visitDate`}
            name="visitDate"
            type="date"
            aria-invalid={!!err('visitDate')}
            className={inputCls('visitDate')}
            defaultValue={prev.visitDate ?? ''}
          />
          <ErrorText id={`${uid}-visitDate-error`} message={err('visitDate')} />
        </div>

        <div>
          <Label htmlFor={`${uid}-visitTime`}>来店希望時間</Label>
          <select
            id={`${uid}-visitTime`}
            name="visitTime"
            defaultValue={prev.visitTime ?? ''}
            className={inputCls('visitTime')}
          >
            <option value="">選択してください</option>
            {visitTimeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor={`${uid}-partySize`}>人数</Label>
          <select
            id={`${uid}-partySize`}
            name="partySize"
            defaultValue={prev.partySize ?? ''}
            className={inputCls('partySize')}
          >
            <option value="">選択してください</option>
            {partySizeOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor={`${uid}-message`} required>
          お問い合わせ内容
        </Label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={7}
          required
          aria-invalid={!!err('message')}
          aria-describedby={err('message') ? `${uid}-message-error` : undefined}
          className={`${inputCls('message')} resize-y leading-[1.9]`}
          placeholder="ご要望やご質問をご記入ください。"
          defaultValue={prev.message ?? ''}
        />
        <ErrorText id={`${uid}-message-error`} message={err('message')} />
      </div>

      <div className="rounded-lg bg-shell px-5 py-5">
        <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] text-ink-soft">
          <input
            type="checkbox"
            name="privacy"
            value="agree"
            required
            aria-invalid={!!err('privacy')}
            defaultChecked={prev.privacy === 'agree'}
            className="mt-1 h-4 w-4 shrink-0 accent-[#c2416b]"
          />
          <span>
            <Link
              href="/privacy-policy/"
              className="text-rose underline underline-offset-4"
            >
              プライバシーポリシー
            </Link>
            に同意します。
          </span>
        </label>
        <ErrorText id={`${uid}-privacy-error`} message={err('privacy')} />
      </div>

      <div className="text-center sm:text-left">
        <SubmitButton />
        <p className="mt-3 text-[0.78rem] text-ink-soft/80">
          お返事にはお時間をいただく場合があります。お急ぎの場合はお電話ください。
        </p>
      </div>
    </form>
  );
}
