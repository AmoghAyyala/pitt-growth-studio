import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { getClientIp, isRateLimited, isSameOriginRequest, jsonNoStore } from '../_lib/security';

const MAX_BODY_BYTES = 10 * 1024;
const MAX_AMOUNT_CENTS = 250000;
const CHECKOUT_ROUTE_LIMIT = 10;
const CHECKOUT_ROUTE_WINDOW = 10 * 60 * 1000;

export async function POST(request: NextRequest) {
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > MAX_BODY_BYTES) {
    return jsonNoStore({ error: 'Request too large.' }, { status: 413 });
  }

  if (process.env.ENABLE_PUBLIC_CHECKOUT !== 'true') {
    return jsonNoStore({ error: 'Checkout is not available.' }, { status: 404 });
  }

  if (!isSameOriginRequest(request)) {
    return jsonNoStore({ error: 'Invalid request origin.' }, { status: 403 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(`checkout:${ip}`, CHECKOUT_ROUTE_LIMIT, CHECKOUT_ROUTE_WINDOW)) {
    return jsonNoStore({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return jsonNoStore({ error: 'Stripe is not configured.' }, { status: 500 });
  }

  try {
    const { serviceName, amount, description } = await request.json();

    if (
      !serviceName ||
      typeof serviceName !== 'string' ||
      serviceName.length > 120 ||
      typeof amount !== 'number' ||
      !Number.isInteger(amount) ||
      amount <= 0 ||
      amount > MAX_AMOUNT_CENTS ||
      (description && (typeof description !== 'string' || description.length > 300))
    ) {
      return jsonNoStore({ error: 'Invalid checkout request.' }, { status: 400 });
    }

    const stripe = new Stripe(stripeKey);
    const origin = request.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: serviceName,
              ...(description ? { description } : {}),
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payment-success`,
      cancel_url: `${origin}/`,
    });

    return jsonNoStore({ url: session.url });
  } catch (error) {
    console.error(error);
    return jsonNoStore({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
