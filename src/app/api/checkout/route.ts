import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, {
  httpClient: Stripe.createFetchHttpClient(),
}) : null;

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe is not configured on the server.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { studentId, studentName, programCode, programName, amount } = body;

    if (!amount || typeof amount !== 'number' || amount < 5 || amount > 25000) {
      return NextResponse.json({ error: 'Donation must be between $5 and $25,000' }, { status: 400 });
    }

    // Use the configured site URL — never trust the Host header for redirect URLs
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const origin = siteUrl.replace(/\/$/, '');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Donation to ${programName}`,
              description: `Supporting ${studentName}`,
            },
            unit_amount: Math.round(amount * 100), // convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/donate/${studentId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate/${studentId}`,
      metadata: {
        studentId,
        programCode,
        amount: amount.toString(),
      },
      submit_type: 'donate',
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
