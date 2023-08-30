import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/modals/Order";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import {buffer} from 'micro'
export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, process.env.END_POINT_SECRET);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
            paid: true,
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok')
}

export const config = {
  api: {
    bodyParser: false,
  }
}


/*
HOLA=rapt-easier-enough-proven

acct_1NkEBLCZgwaruyWX

whsec_160e5ea6256b3823306fe9d2170d066ce2d56f1f5d2ac0406db89911a1d146ce

*/