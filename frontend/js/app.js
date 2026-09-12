// دالة نسخ بيانات الحساب البنكي
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("تم نسخ رقم الحساب بنجاح: " + text);
  }).catch(err => {
    console.error('حدث خطأ أثناء النسخ', err);
  });
}

// معالجة نموذج رفع إثبات الدفع
document.getElementById('uploadProofForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData();
  const fileInput = document.getElementById('proofInput');
  formData.append('proof', fileInput.files[0]);

  // استبدال ID بحسب الطلب الحالي
  const orderId = "CURRENT_ORDER_ID"; 

  const response = await fetch(`/api/orders/${orderId}/upload-proof`, {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  if (result.success) {
    alert(result.message);
    window.location.reload();
  } else {
    alert("فشل رفع الملف: " + result.message);
  }
});

// دالة التنقل بين الأقسام
function goToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// دالة تسجيل الخروج
function logoutUser() {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
}

// تحميل الإعدادات من الـ Backend
async function loadSettings() {
  try {
    const response = await fetch('/api/settings');
    const settings = await response.json();
    
    document.getElementById('bankName').textContent = settings.bankName || 'بنك الخرطوم (بنكك)';
    document.getElementById('accountHolder').textContent = settings.bankAccountName || 'محمد يوسف ابكر';
    document.getElementById('accountNumber').textContent = settings.bankAccountNumber || '9142766';
  } catch (error) {
    console.error('خطأ في تحميل الإعدادات:', error);
  }
}

// تحميل البيانات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', function() {
  loadSettings();
});
