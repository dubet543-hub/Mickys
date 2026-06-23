const crypto = require('crypto');
const express = require('express');
const Razorpay = require('razorpay');

const router = express.Router();

const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials are not configured');
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

router.post('/create-order', async (req, res, next) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const order = await getRazorpay().orders.create({
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt,
    });

    res.status(201).json({ success: true, order, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    next(err);
  }
});

router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(body)
    .digest('hex');

  res.json({
    success: expectedSignature === razorpay_signature,
    message: expectedSignature === razorpay_signature ? 'Payment verified' : 'Payment verification failed',
  });
});

module.exports = router;
