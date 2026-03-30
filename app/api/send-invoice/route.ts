import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { getClientIp, isRateLimited, isSameOriginRequest, jsonNoStore, verifySecret } from '../_lib/security';

const MAX_BODY_BYTES = 10 * 1024;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADMIN_ROUTE_LIMIT = 5;
const ADMIN_ROUTE_WINDOW = 15 * 60 * 1000;

export async function POST(request: NextRequest) {
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > MAX_BODY_BYTES) {
    return jsonNoStore({ error: 'Request too large.' }, { status: 413 });
  }

  if (!isSameOriginRequest(request)) {
    return jsonNoStore({ error: 'Invalid request origin.' }, { status: 403 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(`send-invoice:${ip}`, ADMIN_ROUTE_LIMIT, ADMIN_ROUTE_WINDOW)) {
    return jsonNoStore({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!stripeKey || !resendKey) {
    return jsonNoStore({ error: 'Payment or email service not configured.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { clientName, clientEmail, serviceDescription, upfrontAmount, monthlyAmount, password, checkOnly } = body;

    // Admin password gate
    if (!adminPassword || typeof password !== 'string' || !verifySecret(password, adminPassword)) {
      return jsonNoStore({ error: 'Invalid password.' }, { status: 401 });
    }

    // Password-only validation check (used by the unlock flow — no Stripe calls)
    if (checkOnly === true) {
      return jsonNoStore({ ok: true });
    }

    if (!clientName || !clientEmail) {
      return jsonNoStore({ error: 'Client name and email are required.' }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(String(clientEmail))) {
      return jsonNoStore({ error: 'Invalid client email address.' }, { status: 400 });
    }

    const upfront = parseFloat(upfrontAmount) || 0;
    const monthly = parseFloat(monthlyAmount) || 0;

    if (upfront <= 0 && monthly <= 0) {
      return jsonNoStore({ error: 'Please enter a valid upfront or monthly amount.' }, { status: 400 });
    }

    const stripe = new Stripe(stripeKey);
    const resend = new Resend(resendKey);

    const baseName = String(serviceDescription || 'Pittsburgh Growth Studio Services').slice(0, 190);

    // Create separate payment links so the client pays each clearly
    let upfrontUrl: string | undefined;
    let monthlyUrl: string | undefined;

    if (upfront > 0) {
      const upfrontProduct = await stripe.products.create({ name: `${baseName} — Initial Deposit` });
      const upfrontPrice = await stripe.prices.create({
        product: upfrontProduct.id,
        unit_amount: Math.round(upfront * 100),
        currency: 'usd',
      });
      const upfrontLink = await stripe.paymentLinks.create({
        line_items: [{ price: upfrontPrice.id, quantity: 1 }],
      });
      upfrontUrl = upfrontLink.url;
    }

    if (monthly > 0) {
      const monthlyProduct = await stripe.products.create({ name: `${baseName} — Monthly Retainer` });
      const monthlyPrice = await stripe.prices.create({
        product: monthlyProduct.id,
        unit_amount: Math.round(monthly * 100),
        currency: 'usd',
        recurring: { interval: 'month' },
      });
      const monthlyLink = await stripe.paymentLinks.create({
        line_items: [{ price: monthlyPrice.id, quantity: 1 }],
      });
      monthlyUrl = monthlyLink.url;
    }

    // Build email body
    const lines: string[] = [
      `Hi ${String(clientName)},`,
      '',
      'Thank you for choosing Pittsburgh Growth Studio! Here are your secure payment links:',
      '',
    ];

    if (upfrontUrl) {
      lines.push(`Initial Deposit ($${upfront.toFixed(2)} — charged once):`);
      lines.push(upfrontUrl);
      lines.push('');
    }

    if (monthlyUrl) {
      lines.push(`Monthly Retainer ($${monthly.toFixed(2)}/mo — billed automatically each month):`);
      lines.push(monthlyUrl);
      lines.push('');
    }

    if (serviceDescription) {
      lines.push(`Service: ${serviceDescription}`);
      lines.push('');
    }

    lines.push(
      '✅ 2-Week Money-Back Guarantee',
      'If you are not fully satisfied within the first 2 weeks, contact us and we will issue a full refund — no questions asked.',
      '',
      'If you have any questions, feel free to reply to this email.',
      '',
      'Thank you,',
      'Pittsburgh Growth Studio',
      'pittgrowthstudio.com',
    );

    await resend.emails.send({
      from: 'Pittsburgh Growth Studio <hello@pittgrowthstudio.com>',
      to: String(clientEmail),
      replyTo: 'pittgrowthstudio@gmail.com',
      subject: 'Your Payment Link from Pittsburgh Growth Studio',
      text: lines.join('\n'),
    });

    return jsonNoStore({ ok: true, upfrontUrl, monthlyUrl });
  } catch (error) {
    console.error('[send-invoice]', error);
    return jsonNoStore({ error: 'Failed to send invoice.' }, { status: 500 });
  }
}
