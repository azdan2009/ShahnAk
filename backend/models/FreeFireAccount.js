const mongoose = require('mongoose');

const ffAccountSchema = new mongoose.Schema({
  title: String,
  level: Number,
  rank: String,
  skinsCount: Number,
  price: Number,
  images: [String],
  isSold: { type: Boolean, default: false },
  credentials: { type: String, select: false } // Encrypted info, released only after approval
});

module.exports = mongoose.model('FreeFireAccount', ffAccountSchema);
