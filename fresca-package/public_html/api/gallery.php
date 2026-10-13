<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | API صور معرض فريسكا
 * GET: استعراض صور المعرض (عام)
 * POST: إضافة صورة للمعرض (يتطلب أدمن)
 * DELETE: حذف صورة من المعرض (يتطلب أدمن)
 * ====================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT id, title, image FROM frisca_gallery ORDER BY display_order ASC, created_at ASC');
    sendJsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
}

$admin = requireAdminAuth($pdo);

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? trim($input['id']) : 'gal-' . time();
    $title = trim($input['title'] ?? '');
    $image = trim($input['image'] ?? '');

    if (empty($title) || empty($image)) {
        sendJsonResponse(['success' => false, 'message' => 'عنوان الصورة ورابطها مطلوبان'], 400);
    }

    $stmt = $pdo->prepare('INSERT INTO frisca_gallery (id, title, image) VALUES (?, ?, ?)');
    $stmt->execute([$id, $title, $image]);

    sendJsonResponse([
        'success' => true,
        'message' => 'تمت إضافة الصورة إلى معرض فريسكا بنجاح',
        'item' => ['id' => $id, 'title' => $title, 'image' => $image]
    ], 201);
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        $input = getJsonInput();
        $id = $input['id'] ?? null;
    }

    if (!$id) {
        sendJsonResponse(['success' => false, 'message' => 'معرف الصورة مطلوب للحذف'], 400);
    }

    $stmt = $pdo->prepare('DELETE FROM frisca_gallery WHERE id = ?');
    $stmt->execute([$id]);

    sendJsonResponse([
        'success' => true,
        'message' => 'تم حذف الصورة من المعرض بنجاح'
    ]);
} else {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}
