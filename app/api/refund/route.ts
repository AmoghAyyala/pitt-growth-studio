import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const MAX_BODY_BYTES = 10 * 1024;
const PAYMENT_INTENT_REGEX = /^pi_[a-zA-Z0-9_]+$/;

export async function POST(request: NextRequest) {
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe not configured.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { password, paymentIntentId } = body;

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    if (!paymentIntentId || typeof paymentIntentId !== 'string' || !PAYMENT_INTENT_REGEX.test(paymentIntentId.trim())) {
      return NextResponse.json({ error: 'Invalid Payment Intent ID. It should start with pi_' }, { status: 400 });
    }

    const stripe = new Stripe(stripeKey);
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId.trim(),
      reason: 'requested_by_customer',
    });

    return NextResponse.json({ ok: true, refundId: refund.id, status: refund.status });
  } catch (error) {
    console.error('[refund]', error);
    const message = error instanceof Error ? error.message : 'Failed to process refund.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
