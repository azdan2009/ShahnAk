const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true }, // مثال: 100 جوهرة
  price: { type: Number, required: true },
  image: String
});

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'شحن ألعاب' },
  image: { type: String, required: true },
  description: String,
  requiresPlayerName: { type: Boolean, default: false },
  packages: [packageSchema],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
