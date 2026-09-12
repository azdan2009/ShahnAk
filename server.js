const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// قاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ تم الاتصال بقاعدة بيانات شحنك بنجاح'))
  .catch(err => console.error('❌ خطأ اتصال قاعدة البيانات:', err));

// المسارات API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/games', require('./routes/games'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/admin', require('./routes/admin'));

// توجيه جميع الصفحات لـ public
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 خادم شحنك يعمل على المنفذ: ${PORT}`);
});
