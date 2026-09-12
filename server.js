const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
}).catch(err => {
  console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err);
  process.exit(1);
});

// Routes
app.use('/api/games', require('./routes/games'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/orders', require('./routes/orders'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ الخادم يعمل بكفاءة' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'حدث خطأ في الخادم' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
});
