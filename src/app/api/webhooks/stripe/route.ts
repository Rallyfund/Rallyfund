import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Use the service role key so this server-side webhook bypasses RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeSecret ? new Stripe(stripeSecret, {
  apiVersion: '2024-04-10' as any,
  httpClient: Stripe.createFetchHttpClient(),
}) : null;

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
  }

  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) {
      return NextResponse.json({ error: 'Missing signature or webhook secret. Have you added STRIPE_WEBHOOK_SECRET to .env.local?' }, { status: 400 });
    }
    event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const studentId = session.metadata?.studentId;
    const programCode = session.metadata?.programCode;
    const donorName = session.customer_details?.name || 'Anonymous';
    const amountInCents = session.amount_total || 0;
    const amountInDollars = amountInCents / 100;

    if (studentId && amountInDollars > 0) {
      console.log(`Processing donation of $${amountInDollars} for student ${studentId}`);

      // Prevent duplicate processing if webhook fires more than once
      const { data: existing } = await supabase
        .from('donations')
        .select('id')
        .eq('stripe_session_id', session.id)
        .maybeSingle();

      if (!existing) {
        // 1. Fetch current student raised amount
        const { data: student, error: studentErr } = await supabase
          .from('students')
          .select('raised')
          .eq('id', studentId)
          .single();
        
        if (!studentErr && student) {
          // 2. Update raised amount
          await supabase
            .from('students')
            .update({ raised: student.raised + amountInDollars })
            .eq('id', studentId);
        }

        // 3. Log to donations table with session ID to prevent future duplicates
        await supabase
          .from('donations')
          .insert({
            program_code: programCode,
            student_id: studentId,
            donor_name: donorName,
            amount: amountInDollars,
            stripe_session_id: session.id,
          });
      }
    }
  }

  return NextResponse.json({ received: true });
}
