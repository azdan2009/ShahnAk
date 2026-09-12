const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  bankAccountName: { type: String, default: "محمد يوسف ابكر" },
  bankName: { type: String, default: "بنك الخرطوم / بنكك" },
  bankAccountNumber: { type: String, default: "9142766" },
  myCashiBank: { type: String, default: "" },
  myCashiNumber: { type: String, default: "" },
  whatsappNumber: { type: String, default: "+249284691445" }
});

module.exports = mongoose.model('Settings', settingsSchema);
