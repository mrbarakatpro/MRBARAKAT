<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | API إدارة أطباق المنيو
 * GET: استعراض الأطباق (عام)
 * POST: إضافة طبق جديد (يتطلب أدمن)
 * PUT: تعديل طبق موجود (يتطلب أدمن)
 * DELETE: حذف طبق (يتطلب أدمن)
 * ====================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// تعديل أو حذف الأطباق
if ($method === 'GET') {
    $stmt = $pdo->query('SELECT id, category_id AS category, name_ar AS nameAr, name_en AS nameEn, description_ar AS descriptionAr, description_en AS descriptionEn, price_bhd AS priceBHD, image, tag, tag_en AS tagEn FROM frisca_menu_items ORDER BY created_at DESC');
    $items = $stmt->fetchAll();
    foreach ($items as &$i) {
        $i['priceBHD'] = (float)$i['priceBHD'];
    }
    sendJsonResponse(['success' => true, 'data' => $items]);
}

// كل العمليات التالية تتطلب صلاحية أدمن
$admin = requireAdminAuth($pdo);

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? trim($input['id']) : 'dish-' . time();
    $categoryId = trim($input['category'] ?? 'pastas');
    $nameAr = trim($input['nameAr'] ?? '');
    $nameEn = trim($input['nameEn'] ?? '');
    $descAr = trim($input['descriptionAr'] ?? '');
    $descEn = trim($input['descriptionEn'] ?? '');
    $price = (float)($input['priceBHD'] ?? 0);
    $image = trim($input['image'] ?? '');
    $tag = trim($input['tag'] ?? '');
    $tagEn = trim($input['tagEn'] ?? '');

    if (empty($nameAr) || empty($nameEn)) {
        sendJsonResponse(['success' => false, 'message' => 'يرجى إدخال اسم الصنف باللغتين العربية والإنجليزية'], 400);
    }

    $stmt = $pdo->prepare('INSERT INTO frisca_menu_items (id, category_id, name_ar, name_en, description_ar, description_en, price_bhd, image, tag, tag_en) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$id, $categoryId, $nameAr, $nameEn, $descAr, $descEn, $price, $image, $tag, $tagEn]);

    sendJsonResponse([
        'success' => true,
        'message' => 'تمت إضافة الطبق بنجاح إلى المنيو',
        'item' => [
            'id' => $id,
            'category' => $categoryId,
            'nameAr' => $nameAr,
            'nameEn' => $nameEn,
            'descriptionAr' => $descAr,
            'descriptionEn' => $descEn,
            'priceBHD' => $price,
            'image' => $image,
            'tag' => $tag,
            'tagEn' => $tagEn
        ]
    ], 201);
} elseif ($method === 'PUT') {
    $input = getJsonInput();
    $id = trim($input['id'] ?? '');

    if (empty($id)) {
        sendJsonResponse(['success' => false, 'message' => 'معرف الطبق مطلوب للتعديل'], 400);
    }

    $fields = [];
    $params = [];

    if (isset($input['category'])) { $fields[] = 'category_id = ?'; $params[] = $input['category']; }
    if (isset($input['nameAr'])) { $fields[] = 'name_ar = ?'; $params[] = $input['nameAr']; }
    if (isset($input['nameEn'])) { $fields[] = 'name_en = ?'; $params[] = $input['nameEn']; }
    if (isset($input['descriptionAr'])) { $fields[] = 'description_ar = ?'; $params[] = $input['descriptionAr']; }
    if (isset($input['descriptionEn'])) { $fields[] = 'description_en = ?'; $params[] = $input['descriptionEn']; }
    if (isset($input['priceBHD'])) { $fields[] = 'price_bhd = ?'; $params[] = (float)$input['priceBHD']; }
    if (isset($input['image'])) { $fields[] = 'image = ?'; $params[] = $input['image']; }
    if (isset($input['tag'])) { $fields[] = 'tag = ?'; $params[] = $input['tag']; }
    if (isset($input['tagEn'])) { $fields[] = 'tag_en = ?'; $params[] = $input['tagEn']; }

    if (empty($fields)) {
        sendJsonResponse(['success' => false, 'message' => 'لا توجد بيانات لتحديثها'], 400);
    }

    $params[] = $id;
    $sql = 'UPDATE frisca_menu_items SET ' . implode(', ', $fields) . ' WHERE id = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    sendJsonResponse([
        'success' => true,
        'message' => 'تم تحديث بيانات الطبق بنجاح في قاعدة البيانات'
    ]);
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        $input = getJsonInput();
        $id = $input['id'] ?? null;
    }

    if (!$id) {
        sendJsonResponse(['success' => false, 'message' => 'معرف الطبق مطلوب للحذف'], 400);
    }

    $stmt = $pdo->prepare('DELETE FROM frisca_menu_items WHERE id = ?');
    $stmt->execute([$id]);

    sendJsonResponse([
        'success' => true,
        'message' => 'تم حذف الطبق من قائمة الطعام بنجاح'
    ]);
} else {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}
