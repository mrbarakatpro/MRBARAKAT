<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | API تسجيل دخول الأدمن وإدارة الجلسات
 * POST: تسجيل الدخول وتوليد التوكن
 * GET: التحقق من صحة التوكن الحالي
 * ====================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = getJsonInput();
    $username = trim($input['username'] ?? '');
    $password = trim($input['password'] ?? '');

    if (empty($username) || empty($password)) {
        sendJsonResponse([
            'success' => false,
            'message' => 'يرجى إدخال اسم المستخدم وكلمة المرور'
        ], 400);
    }

    $stmt = $pdo->prepare('SELECT id, username, password_hash, last_updated FROM frisca_admins WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    $admin = $stmt->fetch();

    $isValid = false;
    if ($admin) {
        if (password_verify($password, $admin['password_hash'])) {
            $isValid = true;
        } elseif ($admin['password_hash'] === $password) {
            // ترقية كلمات المرور القديمة غير المشفرة تلقائياً إلى BCRYPT
            $newHash = password_hash($password, PASSWORD_BCRYPT);
            $updateStmt = $pdo->prepare('UPDATE frisca_admins SET password_hash = ? WHERE id = ?');
            $updateStmt->execute([$newHash, $admin['id']]);
            $isValid = true;
        }
    }

    if (!$isValid) {
        sendJsonResponse([
            'success' => false,
            'message' => 'بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى'
        ], 401);
    }

    // توليد رمز توكن عشوائي آمن مشفر
    $token = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));

    $sessionStmt = $pdo->prepare('INSERT INTO frisca_sessions (admin_id, token, expires_at) VALUES (?, ?, ?)');
    $sessionStmt->execute([$admin['id'], $token, $expiresAt]);

    sendJsonResponse([
        'success' => true,
        'message' => 'تم تسجيل الدخول بنجاح',
        'token' => $token,
        'admin' => [
            'username' => $admin['username'],
            'lastUpdated' => $admin['last_updated']
        ]
    ]);
} elseif ($method === 'GET') {
    // التحقق من صحة التوكن
    $admin = requireAdminAuth($pdo);
    sendJsonResponse([
        'success' => true,
        'authenticated' => true,
        'admin' => [
            'username' => $admin['username']
        ]
    ]);
} else {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}
