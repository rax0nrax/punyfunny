import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key_for_build';

export const stripe = new Stripe(key, {
    apiVersion: '2024-10-28.acacia' as any,
    typescript: true,
});
