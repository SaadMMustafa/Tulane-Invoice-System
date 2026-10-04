# TULANE • نظام الفواتير

نظام فواتير عربي (RTL) يعمل بالكامل في المتصفح — لا يحتاج خطوة بناء (Build). الواجهة مستضافة على **GitHub Pages**، وبيانات النظام (الدخول، الفواتير، المنتجات، العملاء، الإعدادات) على **Firebase** (Authentication + Firestore).

## الملفات

| الملف | الوظيفة |
|---|---|
| `index.html` | الواجهة الرئيسية |
| `app.js` | منطق التطبيق والاتصال بـ Firebase |
| `style.css` | التنسيقات |
| `firestore.rules` | قواعد أمان قاعدة البيانات |
| `firebase.json` + `.firebaserc` | إعداد Firebase CLI (نشر القواعد + استضافة بديلة) |
| `.nojekyll` | يمنع معالجة Jekyll على GitHub Pages |

## صلاحيات المستخدمين (مطبقة في قواعد Firestore)

- **المدير** (`amnytalmhdy@gmail.com`): صلاحيات كاملة على كل البيانات.
- **العضو المعتمد**: إنشاء فواتير ومنتجات وعملاء جدد، وقراءة البيانات المشتركة — ولا يستطيع تعديل أو حذف السجلات المحفوظة.
- **غير المعتمد**: يستطيع فقط إرسال طلب دخول (معلّق) — ولا يرى أي بيانات.
- موافقة الأعضاء تتم من داخل النظام: الإعدادات ← «إدارة طلبات الدخول».

---

## خطوات النشر

### 1) Firebase — تهيئة لمرة واحدة

المشروع موجود مسبقًا (`tulane-invoice-system`)، تأكد فقط من:

1. **Firestore**: أنشئ قاعدة بيانات بوضع **Native mode** (إن لم تكن موجودة).
2. **Authentication**: فعّل مزوّد **Google** من Sign-in method.
3. **Authorized domains**: من Authentication ← Settings ← Authorized domains أضف:
   - `USERNAME.github.io` (دومين GitHub Pages — استبدل `USERNAME` باسم مستخدمك)
   - `localhost` موجود افتراضيًا (للاختبار المحلي فقط)

### 2) نشر قواعد أمان Firestore

**الطريقة الأسهل (يدويًا):** من Firebase Console ← Firestore Database ← Rules، الصق محتوى ملف `firestore.rules` كاملًا ثم اضغط Publish.

**أو عبر سطر الأوامر:**

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

> ⚠️ مهم جدًا: بدون نشر هذه القواعد تكون قاعدة البيانات مفتوحة للجميع.

### 3) GitHub Pages

```bash
git init
git add .
git commit -m "TULANE invoice system"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

ثم من GitHub: **Settings ← Pages ← Source: Deploy from a branch ← Branch: main / (root) ← Save**.

بعد دقيقة ستكون الواجهة على: `https://USERNAME.github.io/REPO_NAME/`

لا تنسَ الخطوة 1.3 (إضافة دومين `USERNAME.github.io`) — وإلا سيفشل تسجيل الدخول بخطأ `auth/unauthorized-domain`.

---

## بديل: Firebase Hosting (اختياري)

الإعداد جاهز أيضًا للنشر على استضافة Firebase مباشرة، وميزتها أن دومين `web.app` معتمد تلقائيًا في المصادقة دون إضافته يدويًا:

```bash
firebase deploy --only firestore:rules,hosting
```

ستتاح الواجهة على: `https://tulane-invoice-system.web.app`

---

## ملاحظات

- **مفتاح إعداد Firebase الظاهر في `app.js` ليس سرًا** — هذا هو النمط المعياري لتطبيقات الويب، والحماية الفعلية تتم عبر قواعد Firestore أعلاه.
- **وضع المعاينة المحلي**: يُفعَّل تلقائيًا فقط إذا كانت بيانات Firebase ناقصة، ويخزن البيانات في المتصفح (localStorage) دون أي خادم.
- أول تسجيل دخول بحساب المدير يمنحه صلاحياته تلقائيًا؛ بقية الحسابات تنتظر موافقة المدير من صفحة الإعدادات.
- التحكم في شكل الفاتورة (الخطوط والألوان والتخطيط) موجود في: الإعدادات ← «تنسيق الفاتورة».
