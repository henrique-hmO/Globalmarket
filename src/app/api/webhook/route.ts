import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/stripe';
import { supabase, getPlanLimits } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  try {
    const event = verifyWebhookSignature(payload, signature);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;

        if (userId && plan) {
          const limits = getPlanLimits(plan);

          // Update user profile with subscription
          await supabase.from('user_profiles').upsert({
            id: userId,
            email: session.customer_email,
            plan,
            subscription_status: 'active',
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            strategies_limit: limits.strategies_limit,
            clone_limit: limits.clone_limit,
            scale_limit: limits.scale_limit,
            strategies_used: 0,
            clone_uses: 0,
            scale_uses: 0,
          });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (userId) {
          const status = subscription.status === 'active' ? 'active' : 'canceled';

          await supabase
            .from('user_profiles')
            .update({ subscription_status: status })
            .eq('stripe_subscription_id', subscription.id);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        await supabase
          .from('user_profiles')
          .update({ 
            subscription_status: 'expired',
            plan: 'free'
          })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        // Reset monthly usage on successful payment
        if (subscriptionId) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('plan')
            .eq('stripe_subscription_id', subscriptionId)
            .single();

          if (profile) {
            const limits = getPlanLimits(profile.plan);

            await supabase
              .from('user_profiles')
              .update({
                strategies_used: 0,
                clone_uses: 0,
                scale_uses: 0,
                strategies_limit: limits.strategies_limit,
                clone_limit: limits.clone_limit,
                scale_limit: limits.scale_limit,
              })
              .eq('stripe_subscription_id', subscriptionId);
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
