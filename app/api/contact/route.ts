import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { getClientIp, isRateLimited, isSameOriginRequest, jsonNoStore } from '../_lib/security';

// Security feature 1: Rate limiting (max 5 submissions per IP per minute)
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 1000;

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
    return jsonNoStore({ error: 'Request too large.' }, { status: 413 });
  }

  if (!isSameOriginRequest(request)) {
    return jsonNoStore({ error: 'Invalid request origin.' }, { status: 403 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW)) {
    return jsonNoStore({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return jsonNoStore({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const resend = new Resend(resendKey);

  try {
    const { name, businessName, email, service, message, honeypot } = await request.json();

    // Security feature 6: Honeypot trap — bots fill hidden fields, humans don't
    if (honeypot) {
      return jsonNoStore({ ok: true });
    }

    if (!name || !businessName || !email || !message) {
      return jsonNoStore({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(String(email))) {
      return jsonNoStore({ error: 'Invalid email address.' }, { status: 400 });
    }

    if (
      String(name).length > MAX_LENGTHS.name ||
      String(businessName).length > MAX_LENGTHS.businessName ||
      String(email).length > MAX_LENGTHS.email ||
      String(message).length > MAX_LENGTHS.message
    ) {
      return jsonNoStore({ error: 'One or more fields exceed the maximum allowed length.' }, { status: 400 });
    }

    const safeName = stripHtml(String(name));
    const safeBusinessName = stripHtml(String(businessName));
    const safeEmail = stripHtml(String(email));
    const safeService = stripHtml(String(service ?? ''));
    const safeMessage = stripHtml(String(message));

    await resend.emails.send({
      from: 'Pitt Growth Studio <hello@pittgrowthstudio.com>',
      to: 'hello@pittgrowthstudio.com',
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

    return jsonNoStore({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonNoStore({ error: 'Failed to send email.' }, { status: 500 });
  }
}
