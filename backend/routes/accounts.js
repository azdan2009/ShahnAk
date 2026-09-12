const express = require('express');
const router = express.Router();
const FreeFireAccount = require('../models/FreeFireAccount');

// جلب حسابات فري فاير المتاحة
router.get('/', async (req, res) => {
  try {
    const accounts = await FreeFireAccount.find({ isSold: false });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الحسابات' });
  }
});

// جلب تفاصيل حساب محدد
router.get('/:id', async (req, res) => {
  try {
    const account = await FreeFireAccount.findById(req.params.id);
    if (!account) return res.status(404).json({ message: 'الحساب غير موجود' });
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: 'خطأ في النظام' });
  }
});

module.exports = router;
