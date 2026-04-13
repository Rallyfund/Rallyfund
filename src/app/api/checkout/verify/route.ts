import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

export async function POST(req: Request) {
  if (!stripe) return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });

  try {
    const { sessionId } = await req.json();
    if (!sessionId) return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // If it's already paid, we process it
    if (session.payment_status === 'paid') {
      const studentId = session.metadata?.studentId;
      const programCode = session.metadata?.programCode;
      const donorName = session.customer_details?.name || 'Anonymous';
      const amountInDollars = (session.amount_total || 0) / 100;

      if (studentId && amountInDollars > 0) {
        // Prevent double-counting: check if this Stripe session was already processed
        const { data: existing } = await supabase
          .from('donations')
          .select('id')
          .eq('stripe_session_id', sessionId)
          .maybeSingle();

        if (existing) {
          return NextResponse.json({ success: true, status: 'already_processed' });
        }

        // Fetch current student raised amount
        const { data: student, error: studentErr } = await supabase
          .from('students')
          .select('raised')
          .eq('id', studentId)
          .single();
        
        if (!studentErr && student) {
          // Increment Supabase
          await supabase
            .from('students')
            .update({ raised: student.raised + amountInDollars })
            .eq('id', studentId);

          // Log donation with session ID to prevent future duplicates
          await supabase
            .from('donations')
            .insert({
              program_code: programCode,
              student_id: studentId,
              donor_name: donorName,
              amount: amountInDollars,
              stripe_session_id: sessionId,
            });
        }
      }
    }
    
    return NextResponse.json({ success: true, status: session.payment_status });
  } catch (error: any) {
    console.error('Verify checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
