import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/modals/Order";
import { Product } from "@/modals/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.json('should be a POST request');
        return;
      }
      const {
        name,email,city,
        postalCode,streetAddress,country,
        cartProducts,
      } = req.body;
      await mongooseConnect();
      const productsIds = cartProducts;
      const uniqueIds = [...new Set(productsIds)];
      const productsInfos = await Product.find({_id:uniqueIds});
    
      let line_items = [];
      for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
          line_items.push({
            quantity,
            price_data: {
              currency: 'USD',
              product_data: {name:productInfo.title},
              unit_amount: quantity * productInfo.price * 100,
            },
          });
        }
      }

      const session = await getServerSession(req,res, authOptions)
      if (!session) {
        res.json({error:'You need to be logged in to checkout'})
        return;
      }

  const orderDoc = await Order.create({
    userEmail: session?.user?.email,
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + `/cart?success=1`,
    cancel_url: process.env.PUBLIC_URL + `/cart?canceled=1`,
    metadata: {orderId:orderDoc._id.toString(), test:'ok'},
    payment_method_types: ['card'],
  });

  res.json({
    url: stripeSession.url
  })
}
