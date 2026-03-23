import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe is not configured.' }, { status: 500 });
  }

  try {
    const { serviceName, amount, description } = await request.json();

    if (!serviceName || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
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

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
