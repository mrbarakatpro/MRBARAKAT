<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | API نصوص وهوية الموقع
 * GET: استعراض النصوص (عام)
 * POST: تحديث نصوص وهوية وشعار الموقع (يتطلب أدمن)
 * ====================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->prepare('SELECT setting_value FROM frisca_site_settings WHERE setting_key = ? LIMIT 1');
    $stmt->execute(['site_texts']);
    $row = $stmt->fetch();
    $data = $row && !empty($row['setting_value']) ? json_decode($row['setting_value'], true) : [];
    sendJsonResponse(['success' => true, 'data' => $data]);
}

$admin = requireAdminAuth($pdo);

if ($method === 'POST') {
    $input = getJsonInput();
    if (empty($input)) {
        sendJsonResponse(['success' => false, 'message' => 'البيانات المرسلة فارغة'], 400);
    }

    // جلب النصوص الحالية لدمج التعديلات الجزئية إن لزم
    $stmt = $pdo->prepare('SELECT setting_value FROM frisca_site_settings WHERE setting_key = ? LIMIT 1');
    $stmt->execute(['site_texts']);
    $row = $stmt->fetch();
    $current = $row && !empty($row['setting_value']) ? json_decode($row['setting_value'], true) : [];

    $merged = array_replace_recursive($current, $input);
    $jsonEncoded = json_encode($merged, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    $upsertStmt = $pdo->prepare('INSERT INTO frisca_site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_at = NOW()');
    $upsertStmt->execute(['site_texts', $jsonEncoded]);

    sendJsonResponse([
        'success' => true,
        'message' => 'تم حفظ نصوص وهوية الموقع بنجاح على السيرفر',
        'data' => $merged
    ]);
} else {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}
