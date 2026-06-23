const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name:      String,
  price:     Number,
  qty:       Number,
  image:     String,
});

const OrderSchema = new mongoose.Schema({
  orderId:    { type: String, unique: true },
  user: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name:   { type: String, required: true },
    email:  { type: String, required: true },
    phone:  String,
  },
  items:    [OrderItemSchema],
  shipping: {
    line1:   String,
    line2:   String,
    city:    String,
    state:   String,
    pincode: String,
  },
  subtotal:     { type: Number, required: true },
  discount:     { type: Number, default: 0 },
  couponCode:   String,
  shippingCost: { type: Number, default: 0 },
  total:        { type: Number, required: true },

  paymentMethod:    { type: String, enum: ['online', 'cod'], required: true },
  paymentStatus:    { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  razorpayOrderId:  String,
  razorpayPaymentId: String,

  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'placed',
  },
  statusHistory: [{
    status:    String,
    note:      String,
    updatedAt: { type: Date, default: Date.now },
  }],
  trackingNumber: String,
  notes:          String,
}, { timestamps: true });

/* Auto-generate readable order ID */
OrderSchema.pre('save', async function (next) {
  if (!this.orderId) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderId = `MKY${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
