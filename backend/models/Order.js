const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderType: { type: String, enum: ['topup', 'account_purchase'], required: true },
  gameDetails: {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    packageName: String,
    playerId: String,
    playerName: String
  },
  accountDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'FreeFireAccount' },
  amount: { type: Number, required: true },
  paymentProof: { type: String }, // Path to stored proof image
  status: { 
    type: String, 
    enum: ['قيد المراجعة', 'جاري التنفيذ', 'تم التنفيذ', 'مرفوض'], 
    default: 'قيد المراجعة' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
