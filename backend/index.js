const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(express.json());

app.post('/api/overtime', (req, res) => {
  const { hours } = req.body;
  res.json({ hours });
});

app.post('/create-checkout-session', async (req, res) => {
  console.log('Request received for checkout session');
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.SUCCESS_URL}/success`,
      cancel_url: `${process.env.CANCEL_URL}/cancel`,
    });
    console.log('Session created:', session.id);
    res.json({ url: session.url }); // URL返す
  } catch (error) {
    console.log('Stripe Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/success', (req, res) => res.send('決済成功！'));
app.get('/cancel', (req, res) => res.send('キャンセルしました'));

app.listen(3000, () => console.log('サーバー起動 at port 3000'));