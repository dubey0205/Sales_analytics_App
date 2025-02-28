const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  _id: { type: String }, 
  name: String,
  email: String,
  age: Number,
  location: String,
  gender: String,
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

module.exports = Customer;
