const express = require('express');
const multer  = require('multer');
const path = require('path');
const Order = require('../models/Order');
const Notification = require('../models/Notification');

const router = express.Router();

// إعداد رفوعات الصور بشكل آمن
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/proofs/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('يرجى رفع صورة فقط'), false);
  }
});

// رفع إثبات الدفع وربطه بالطلب
router.post('/:id/upload-proof', upload.single('proof'), async (req, res) => {
  try {
    const orderId = req.params.id;
    const proofPath = req.file.path;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId, 
      { paymentProof: proofPath, status: 'قيد المراجعة' },
      { new: true }
    );

    res.status(200).json({ 
      success: true, 
      message: "تم رفع إثبات الدفع بنجاح. طلبك قيد المراجعة الان.",
      order: updatedOrder 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// لوحة التحكم: تحديث حالة الطلب من قبل Admin
router.patch('/admin/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // ['قيد المراجعة', 'جاري التنفيذ', 'تم التنفيذ', 'مرفوض']
    
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    // إرسال إشعار داخلي للمستخدم
    await Notification.create({
      user: order.user,
      message: `حالة طلبك رقم ${order.orderNumber} أصبحت الان: ${status}`
    });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
