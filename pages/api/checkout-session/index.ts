import { ItemType } from '@/typing';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { items } = req.body;

  const lineItems = items.map((item: ItemType) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity || 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${req.headers.origin}/success`,
    // cancel_url: `${req.headers.origin}/failed`,
  });

  res.status(200).json({ id: session.id });
};