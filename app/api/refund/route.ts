import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { getClientIp, isRateLimited, isSameOriginRequest, jsonNoStore, verifySecret } from '../_lib/security';

const MAX_BODY_BYTES = 10 * 1024;
const PAYMENT_INTENT_REGEX = /^pi_[a-zA-Z0-9_]+$/;
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
  if (isRateLimited(`refund:${ip}`, ADMIN_ROUTE_LIMIT, ADMIN_ROUTE_WINDOW)) {
    return jsonNoStore({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!stripeKey) {
    return jsonNoStore({ error: 'Stripe not configured.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { password, paymentIntentId } = body;

    if (!adminPassword || typeof password !== 'string' || !verifySecret(password, adminPassword)) {
      return jsonNoStore({ error: 'Invalid password.' }, { status: 401 });
    }

    if (!paymentIntentId || typeof paymentIntentId !== 'string' || !PAYMENT_INTENT_REGEX.test(paymentIntentId.trim())) {
      return jsonNoStore({ error: 'Invalid Payment Intent ID. It should start with pi_' }, { status: 400 });
    }

    const stripe = new Stripe(stripeKey);
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId.trim(),
      reason: 'requested_by_customer',
    });

    return jsonNoStore({ ok: true, refundId: refund.id, status: refund.status });
  } catch (error) {
    console.error('[refund]', error);
    return jsonNoStore({ error: 'Failed to process refund.' }, { status: 500 });
  }
}
