<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | API إدارة تصنيفات المنيو
 * GET: استعراض التصنيفات (عام)
 * POST: إضافة تصنيف جديد (يتطلب أدمن)
 * PUT: تعديل اسم تصنيف (يتطلب أدمن)
 * DELETE: حذف تصنيف (يتطلب أدمن، ويمنع الحذف لو توجد أطباق مرتبطة)
 * ====================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT id, name_ar AS nameAr, name_en AS nameEn FROM frisca_categories ORDER BY display_order ASC, created_at ASC');
    sendJsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
}

$admin = requireAdminAuth($pdo);

if ($method === 'POST') {
    $input = getJsonInput();
    $id = trim($input['id'] ?? '');
    $nameAr = trim($input['nameAr'] ?? '');
    $nameEn = trim($input['nameEn'] ?? '');

    if (empty($nameAr) || empty($nameEn)) {
        sendJsonResponse(['success' => false, 'message' => 'يرجى إدخال اسم التصنيف باللغتين العربية والإنجليزية'], 400);
    }

    if (empty($id)) {
        // توليد معرف من الاسم الإنجليزي
        $id = strtolower(preg_replace('/[^a-zA-Z0-9_-]/', '', str_replace(' ', '-', $nameEn)));
        if (empty($id)) $id = 'cat-' . time();
    }

    // التحقق من تكرار المعرف
    $check = $pdo->prepare('SELECT id FROM frisca_categories WHERE id = ?');
    $check->execute([$id]);
    if ($check->fetch()) {
        sendJsonResponse(['success' => false, 'message' => 'معرف التصنيف موجود مسبقاً، يرجى اختيار معرف فريد'], 400);
    }

    $stmt = $pdo->prepare('INSERT INTO frisca_categories (id, name_ar, name_en) VALUES (?, ?, ?)');
    $stmt->execute([$id, $nameAr, $nameEn]);

    sendJsonResponse([
        'success' => true,
        'message' => 'تمت إضافة التصنيف بنجاح',
        'category' => ['id' => $id, 'nameAr' => $nameAr, 'nameEn' => $nameEn]
    ], 201);
} elseif ($method === 'PUT') {
    $input = getJsonInput();
    $id = trim($input['id'] ?? '');
    $nameAr = trim($input['nameAr'] ?? '');
    $nameEn = trim($input['nameEn'] ?? '');

    if (empty($id) || empty($nameAr) || empty($nameEn)) {
        sendJsonResponse(['success' => false, 'message' => 'معرف التصنيف واسمائه مطلوبة للتعديل'], 400);
    }

    $stmt = $pdo->prepare('UPDATE frisca_categories SET name_ar = ?, name_en = ? WHERE id = ?');
    $stmt->execute([$nameAr, $nameEn, $id]);

    sendJsonResponse([
        'success' => true,
        'message' => 'تم تعديل التصنيف بنجاح'
    ]);
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        $input = getJsonInput();
        $id = $input['id'] ?? null;
    }

    if (!$id) {
        sendJsonResponse(['success' => false, 'message' => 'معرف التصنيف مطلوب للحذف'], 400);
    }

    // فحص الأطباق المرتبطة
    $checkLinked = $pdo->prepare('SELECT COUNT(*) AS total FROM frisca_menu_items WHERE category_id = ?');
    $checkLinked->execute([$id]);
    $linkedCount = (int)$checkLinked->fetch()['total'];

    if ($linkedCount > 0) {
        sendJsonResponse([
            'success' => false,
            'message' => "لا يمكن حذف هذا التصنيف لوجود {$linkedCount} أطباق مرتبطة به. يرجى تعديل تصنيف الأطباق أولاً."
        ], 400);
    }

    $stmt = $pdo->prepare('DELETE FROM frisca_categories WHERE id = ?');
    $stmt->execute([$id]);

    sendJsonResponse([
        'success' => true,
        'message' => 'تم حذف التصنيف بنجاح'
    ]);
} else {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}
