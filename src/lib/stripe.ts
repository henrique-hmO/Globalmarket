import Stripe from 'stripe';

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Price IDs - Replace with your actual Stripe Price IDs
export const STRIPE_PRICES = {
  start: process.env.NEXT_PUBLIC_STRIPE_PRICE_START!,
  growth: process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH!,
  pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO!,
};

// Plan details
export const PLANS = {
  start: {
    name: 'Start',
    price: 97,
    priceId: STRIPE_PRICES.start,
    features: [
      '5 estratégias completas por mês',
      'Análise de marketing básica',
      'Acesso a copys e funis',
      'Suporte por email',
      'Atualizações semanais'
    ],
    limits: {
      strategies: 5,
      clone: 0,
      scale: 0
    }
  },
  growth: {
    name: 'Growth',
    price: 350,
    priceId: STRIPE_PRICES.growth,
    features: [
      '10 estratégias completas por mês',
      'Ferramenta de Clonagem (10 usos/mês)',
      'Ferramenta de Escala (10 usos/mês)',
      'Automação de campanhas',
      'Análise de neuromarketing',
      'Suporte prioritário'
    ],
    limits: {
      strategies: 10,
      clone: 10,
      scale: 10
    }
  },
  pro: {
    name: 'Pro',
    price: 500,
    priceId: STRIPE_PRICES.pro,
    features: [
      'Estratégias ilimitadas',
      'Clonagem ilimitada',
      'AI Scale Gen ilimitado',
      'Insights avançados de IA',
      'Análise de qualquer mercado global',
      'Consultoria estratégica mensal',
      'Suporte VIP 24/7'
    ],
    limits: {
      strategies: -1, // unlimited
      clone: -1,
      scale: -1
    }
  }
};

// Create checkout session
export const createCheckoutSession = async (
  planId: 'start' | 'growth' | 'pro',
  customerEmail: string,
  userId: string
) => {
  const plan = PLANS[planId];

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: plan.priceId,
        quantity: 1,
      },
    ],
    customer_email: customerEmail,
    metadata: {
      userId,
      plan: planId,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
    subscription_data: {
      metadata: {
        userId,
        plan: planId,
      },
    },
  });

  return session;
};

// Create customer portal session
export const createPortalSession = async (customerId: string) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return session;
};

// Verify webhook signature
export const verifyWebhookSignature = (
  payload: string | Buffer,
  signature: string
): Stripe.Event => {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
};
