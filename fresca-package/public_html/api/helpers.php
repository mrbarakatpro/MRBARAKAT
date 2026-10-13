<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | مساعدات دوال الـ API والأمان
 * CORS + Token Authentication + JSON Helper
 * ====================================================================
 */

// إعداد ترويسات CORS للسماح بالطلبات بشكل آمن
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

// التعامل مع طلبات Preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// دالة إرسال الرد بصيغة JSON
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// دالة قراءة جسم الطلب بصيغة JSON
function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (empty($raw)) {
        return [];
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

// استخراج رمز المصادقة (Bearer Token) من الترويسة
function getBearerToken() {
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER['Authorization']);
    } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }

    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }
    return null;
}

// التحقق من صحة وصلاحية الأدمن عبر التوكن
function requireAdminAuth($pdo) {
    $token = getBearerToken();
    if (!$token) {
        sendJsonResponse([
            'success' => false,
            'message' => 'غير مصرح بالدخول: يرجى تسجيل الدخول كأدمن'
        ], 401);
    }

    $stmt = $pdo->prepare('SELECT s.id, s.admin_id, a.username FROM frisca_sessions s JOIN frisca_admins a ON s.admin_id = a.id WHERE s.token = ? AND s.expires_at > NOW() LIMIT 1');
    $stmt->execute([$token]);
    $admin = $stmt->fetch();

    if (!$admin) {
        sendJsonResponse([
            'success' => false,
            'message' => 'انتهت صلاحية جلسة الأدمن أو الرمز غير صحيح. يرجى تسجيل الدخول مجدداً'
        ], 403);
    }

    return $admin;
}
