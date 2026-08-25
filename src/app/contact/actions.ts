'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';

import {
  contactSchema,
  inquiryTypeLabel,
  pickValues,
  type ContactState,
} from '@/lib/contact-schema';
import { store } from '@/data/store';
import { siteConfig } from '@/config/site';

/**
 * 簡易レート制限（同一IPから10分間に5件まで）。
 * サーバーレス環境ではインスタンスごとのメモリになるため万全ではありませんが、
 * 単純な連投を抑える一次防御として機能します。
 * 本格的な制限が必要になったら Upstash Redis などの外部ストアに置き換えてください。
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

const isRateLimited = (key: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // 古いエントリを掃除（メモリ肥大の防止）
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function submitContact(
  prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const attempt = prev.attempt + 1;
  const values = pickValues(formData);
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  /** 送信失敗時は入力値を返して画面に復元させる */
  const fail = (message: string, errors: Record<string, string> = {}) => ({
    status: 'error' as const,
    message,
    errors,
    values,
    attempt,
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!errors[key]) errors[key] = issue.message;
    }
    return fail('入力内容をご確認ください。', errors);
  }

  const data = parsed.data;

  // honeypot に入力があった場合は、送信されたように見せて破棄する
  if (data.website && data.website.length > 0) {
    return {
      status: 'success',
      message: 'お問い合わせを受け付けました。',
      errors: {},
      attempt,
    };
  }

  const headerList = await headers();
  const ip =
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headerList.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return fail(
      '送信回数の上限に達しました。しばらく時間をおいてからお試しください。お急ぎの場合はお電話ください。',
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // 設定漏れの内容は画面に出さず、運用者向けにサーバーログだけ残す
    console.error(
      '[contact] メール送信の環境変数が未設定です（RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL）',
    );
    return fail(
      `申し訳ありません。送信に失敗しました。お手数ですが、お電話（${store.tel}）でご連絡ください。`,
    );
  }

  const typeLabel = inquiryTypeLabel(data.inquiryType);
  const rows: [string, string][] = [
    ['お問い合わせ種別', typeLabel],
    ['お名前', data.name],
    ['フリガナ', data.kana ?? '（未入力）'],
    ['電話番号', data.tel],
    ['メールアドレス', data.email],
    ['来店希望日', data.visitDate ?? '（未入力）'],
    ['来店希望時間', data.visitTime ?? '（未入力）'],
    ['人数', data.partySize ?? '（未入力）'],
  ];

  const html = `
    <div style="font-family:sans-serif;line-height:1.8;color:#1c0d14">
      <h2 style="color:#6d1b36;font-size:16px">${escapeHtml(siteConfig.name)} サイトからのお問い合わせ</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><th align="left" style="padding:6px 16px 6px 0;color:#c2416b;white-space:nowrap">${escapeHtml(k)}</th><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <h3 style="color:#6d1b36;font-size:14px;margin-top:20px">お問い合わせ内容</h3>
      <p style="font-size:14px;white-space:pre-wrap">${escapeHtml(data.message)}</p>
      <hr style="border:none;border-top:1px solid #f7d9e3;margin:20px 0">
      <p style="font-size:12px;color:#3a2029">送信元: ${escapeHtml(siteConfig.url)}/contact/</p>
    </div>
  `;

  const text = [
    `${siteConfig.name} サイトからのお問い合わせ`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    '【お問い合わせ内容】',
    data.message,
  ].join('\n');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(',').map((s) => s.trim()),
      replyTo: data.email,
      subject: `【${typeLabel}】${data.name} 様よりお問い合わせ`,
      html,
      text,
    });

    if (error) {
      // 個人情報はログに出さない
      console.error('[contact] Resend error:', error.name, error.message);
      return fail(
        `申し訳ありません。送信に失敗しました。お手数ですが、お電話（${store.tel}）でご連絡ください。`,
      );
    }
  } catch (e) {
    console.error(
      '[contact] 送信時に例外が発生しました:',
      e instanceof Error ? e.message : 'unknown error',
    );
    return fail(
      `申し訳ありません。送信に失敗しました。お手数ですが、お電話（${store.tel}）でご連絡ください。`,
    );
  }

  return {
    status: 'success',
    message:
      'お問い合わせを受け付けました。担当者より折り返しご連絡いたしますので、少々お待ちください。',
    errors: {},
    attempt,
  };
}
