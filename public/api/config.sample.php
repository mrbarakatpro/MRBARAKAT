<?php
/**
 * ====================================================================
 * ملف إعدادات قاعدة بيانات مطعم فريسكا البحرين | Frisca Restaurant
 * هذا الملف مخصص للاستضافة (Namecheap cPanel / Apache / LiteSpeed).
 *
 * تعليمات هامة للأمان:
 * 1. لا ترفع هذا الملف مع كلمات المرور الحقيقية في مستودعات عامة (GitHub).
 * 2. عند الرفع على Namecheap cPanel، قم بتعديل القيم أدناه بما يتطابق مع
 *    قاعدة البيانات واسم المستخدم وكلمة المرور التي أنشأتها في cPanel MySQL.
 * 3. قم بحفظ هذا الملف باسم config.php في نفس المجلد (public/api/config.php).
 * ====================================================================
 */

// إعدادات الاتصال بقاعدة بيانات MySQL
define('DB_HOST', getenv('DB_HOST') ?: 'localhost'); // عادة localhost في Namecheap cPanel
define('DB_NAME', getenv('DB_NAME') ?: 'cpaneluser_friscadb'); // اسم قاعدة البيانات (مثال: username_friscadb)
define('DB_USER', getenv('DB_USER') ?: 'cpaneluser_friscauser'); // اسم مستخدم قاعدة البيانات
define('DB_PASS', getenv('DB_PASS') ?: 'YOUR_STRONG_PASSWORD_HERE'); // كلمة مرور قاعدة البيانات
define('DB_CHARSET', 'utf8mb4');

// إعدادات الرفع والأمان
define('UPLOAD_DIR', __DIR__ . '/../uploads/'); // مجلد رفع الصور الفعلي
define('UPLOAD_URL_PREFIX', '/uploads/'); // رابط الوصول العام للصور
define('MAX_UPLOAD_BYTES', 10 * 1024 * 1024); // أقصى حجم للصورة: 10 ميغابايت

// مفتاح تشفير عشوائي للتوكن (يمكن تغييره لأي نص سري طويل)
define('JWT_SECRET_KEY', 'frisca_bahrain_secret_key_2026_luxury_dining_98741');

// الاتصال بقاعدة البيانات باستخدام PDO
function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // في بيئة الإنتاج لا نعرض تفاصيل الخطأ للعامة
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'success' => false,
            'message' => 'Database connection failed. Please check config.php credentials.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
