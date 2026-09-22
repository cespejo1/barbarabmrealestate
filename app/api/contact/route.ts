import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const interests = new Set(['buying', 'selling', 'relocating', 'other']);
const interestLabels: Record<string, string> = {
  buying: 'Buying', selling: 'Selling', relocating: 'Relocating', other: 'Other',
};

function clean(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const result = value.trim();
  return result.length <= maxLength ? result : null;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  }

  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 415 });
  }

  if (Number(request.headers.get('content-length') ?? 0) > 8_000) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 8_000) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 413 });
    }
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const phone = clean(body.phone ?? '', 40);
  const interest = clean(body.interest, 20);
  const message = clean(body.message, 2_000);
  const language = body.language === 'es' ? 'Spanish' : 'English';

  if (!name || name.length < 2 || !email || !emailPattern.test(email) || phone === null ||
      !interest || !interests.has(interest) || !message || message.length < 10) {
    return NextResponse.json({ error: 'Please check the form fields.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Barbara B.M. Real Estate <inquiries@barbarabmrealestate.com>';
  if (!apiKey || !to || !emailPattern.test(to)) {
    console.error('Contact form email configuration is incomplete.');
    return NextResponse.json({ error: 'Contact is temporarily unavailable.' }, { status: 503 });
  }

  const text = [
    'New website inquiry', '',
    `Name: ${name}`, `Email: ${email}`, `Phone: ${phone || 'Not provided'}`,
    `Interest: ${interestLabels[interest]}`, `Form language: ${language}`, '',
    'Message:', message,
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New real estate inquiry: ${interestLabels[interest]}`,
        text,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Resend rejected a contact form request:', response.status);
      return NextResponse.json({ error: 'Message could not be sent.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form delivery failed:', error);
    return NextResponse.json({ error: 'Message could not be sent.' }, { status: 502 });
  }
}
