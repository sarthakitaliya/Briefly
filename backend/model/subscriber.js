const mongoose = require('mongoose');

// Subscriber Schema
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

// Subscriber Model
module.exports = mongoose.model('subscriber', subscriberSchema);


