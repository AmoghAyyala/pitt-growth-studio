import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Security feature 1: Rate limiting (max 5 submissions per IP per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// Security feature 2: HTML sanitization (strip tags to prevent XSS)
function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

// Security feature 3: Email format validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Security feature 4: Field length limits (prevent oversized payloads)
const MAX_LENGTHS = { name: 100, businessName: 150, email: 254, service: 100, message: 2000 };

// Security feature 5: Body size limit (reject payloads over 10KB)
const MAX_BODY_BYTES = 10 * 1024;

export async function POST(request: NextRequest) {
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const resend = new Resend(resendKey);

  try {
    const { name, businessName, email, service, message, honeypot } = await request.json();

    // Security feature 6: Honeypot trap — bots fill hidden fields, humans don't
    if (honeypot) {
      return NextResponse.json({ ok: true }); // Silently discard bot submissions
    }

    if (!name || !businessName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(String(email))) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    if (
      String(name).length > MAX_LENGTHS.name ||
      String(businessName).length > MAX_LENGTHS.businessName ||
      String(email).length > MAX_LENGTHS.email ||
      String(message).length > MAX_LENGTHS.message
    ) {
      return NextResponse.json({ error: 'One or more fields exceed the maximum allowed length.' }, { status: 400 });
    }

    const safeName = stripHtml(String(name));
    const safeBusinessName = stripHtml(String(businessName));
    const safeEmail = stripHtml(String(email));
    const safeService = stripHtml(String(service ?? ''));
    const safeMessage = stripHtml(String(message));

    await resend.emails.send({
      from: 'Pitt Growth Studio <hello@pittgrowthstudio.com>',
      to: 'pittgrowthstudio@gmail.com',
      replyTo: safeEmail,
      subject: `New website lead from ${safeBusinessName}`,
      text: `
Name: ${safeName}
Business: ${safeBusinessName}
Email: ${safeEmail}
Service: ${safeService}
Message:
${safeMessage}
      `.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
