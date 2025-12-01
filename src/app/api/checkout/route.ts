import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
    try {
        const { subdomain, ownerId } = await request.json();

        if (!subdomain) {
            return NextResponse.json({ error: 'Subdomain is required' }, { status: 400 });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Domain Registration: ${subdomain}.𓋹.ws`,
                            description: '1 Year Registration',
                            images: [`https://api.dicebear.com/7.x/initials/svg?seed=${subdomain}`], // Placeholder image
                        },
                        unit_amount: 2000, // $20.00
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/dashboard?success=true&subdomain=${subdomain}`,
            cancel_url: `${request.headers.get('origin')}/?canceled=true`,
            metadata: {
                subdomain,
                ownerId: ownerId || 'guest',
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
