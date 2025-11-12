import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { supabase, hasLifetimeAccess } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { planId, email, userId } = await req.json();

    // Validate input
    if (!planId || !email || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user has lifetime access
    if (hasLifetimeAccess(email)) {
      return NextResponse.json(
        { error: 'You already have lifetime access' },
        { status: 400 }
      );
    }

    // Validate plan
    if (!['start', 'growth', 'pro'].includes(planId)) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession(planId, email, userId);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
