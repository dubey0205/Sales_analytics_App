const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  products: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true },
  }],
  totalAmount: Number,
  orderDate: Date,
  status: { type: String, enum: ['completed', 'pending', 'canceled'], required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

