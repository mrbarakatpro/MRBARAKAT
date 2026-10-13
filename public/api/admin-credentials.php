<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | API تحديث بيانات الأدمن
 * PUT: تغيير اسم المستخدم وكلمة المرور المشفرة (يتطلب أدمن)
 * ====================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$pdo = getDbConnection();
$admin = requireAdminAuth($pdo);

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

$input = getJsonInput();
$newUsername = trim($input['username'] ?? '');
$newPassword = trim($input['password'] ?? '');

if (empty($newUsername)) {
    sendJsonResponse(['success' => false, 'message' => 'يرجى إدخال اسم المستخدم'], 400);
}

if (empty($newPassword) || strlen($newPassword) < 4) {
    sendJsonResponse(['success' => false, 'message' => 'يجب أن لا تقل كلمة المرور عن 4 خانات'], 400);
}

// تشفير كلمة المرور بواسطة BCRYPT القياسي الآمن
$hash = password_hash($newPassword, PASSWORD_BCRYPT);

$stmt = $pdo->prepare('UPDATE frisca_admins SET username = ?, password_hash = ?, last_updated = NOW() WHERE id = ?');
$stmt->execute([$newUsername, $hash, $admin['admin_id']]);

sendJsonResponse([
    'success' => true,
    'message' => 'تم تحديث بيانات الدخول وحفظها بأمان في قاعدة البيانات',
    'admin' => [
        'username' => $newUsername,
        'lastUpdated' => date('Y-m-d H:i:s')
    ]
]);
