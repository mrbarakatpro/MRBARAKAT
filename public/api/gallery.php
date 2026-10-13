<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | API صور معرض فريسكا
 * GET: استعراض صور المعرض (عام)
 * POST: إضافة صورة للمعرض باللغتين العربية والإنجليزية (يتطلب أدمن)
 * PUT: تعديل أسماء صورة المعرض بالعربية والإنجليزية (يتطلب أدمن)
 * DELETE: حذف صورة من المعرض (يتطلب أدمن)
 * ====================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// فحص وجود عمودي title_ar و title_en في جدول frisca_gallery لدعم قواعد البيانات القديمة والجديدة
function getGalleryHasBilingualCols($pdo) {
    static $hasBilingual = null;
    if ($hasBilingual !== null) {
        return $hasBilingual;
    }
    try {
        $stmt = $pdo->query("SHOW COLUMNS FROM frisca_gallery LIKE 'title_ar'");
        $hasBilingual = ($stmt->fetch() !== false);
    } catch (Exception $e) {
        $hasBilingual = false;
    }
    return $hasBilingual;
}

if ($method === 'GET') {
    $hasBilingual = getGalleryHasBilingualCols($pdo);
    if ($hasBilingual) {
        $stmt = $pdo->query('SELECT id, title, COALESCE(NULLIF(title_ar, ""), title) AS titleAr, COALESCE(NULLIF(title_en, ""), title) AS titleEn, image FROM frisca_gallery ORDER BY display_order ASC, created_at ASC');
    } else {
        $stmt = $pdo->query('SELECT id, title, title AS titleAr, title AS titleEn, image FROM frisca_gallery ORDER BY display_order ASC, created_at ASC');
    }
    sendJsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
}

$admin = requireAdminAuth($pdo);

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? trim($input['id']) : 'gal-' . time();
    $titleAr = trim($input['titleAr'] ?? '');
    $titleEn = trim($input['titleEn'] ?? '');
    $title = trim($input['title'] ?? '');

    if (empty($titleAr) && empty($titleEn) && empty($title)) {
        sendJsonResponse(['success' => false, 'message' => 'يرجى إدخال اسم الصورة'], 400);
    }

    $mainTitle = !empty($titleAr) ? $titleAr : (!empty($title) ? $title : $titleEn);
    $finalTitleAr = !empty($titleAr) ? $titleAr : $mainTitle;
    $finalTitleEn = !empty($titleEn) ? $titleEn : $mainTitle;

    $image = trim($input['image'] ?? '');
    if (empty($image)) {
        sendJsonResponse(['success' => false, 'message' => 'رابط الصورة مطلوب'], 400);
    }

    $hasBilingual = getGalleryHasBilingualCols($pdo);
    if ($hasBilingual) {
        $stmt = $pdo->prepare('INSERT INTO frisca_gallery (id, title, title_ar, title_en, image) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$id, $mainTitle, $finalTitleAr, $finalTitleEn, $image]);
    } else {
        $stmt = $pdo->prepare('INSERT INTO frisca_gallery (id, title, image) VALUES (?, ?, ?)');
        $stmt->execute([$id, $mainTitle, $image]);
    }

    sendJsonResponse([
        'success' => true,
        'message' => 'تمت إضافة الصورة إلى معرض فريسكا بنجاح',
        'item' => [
            'id' => $id,
            'title' => $mainTitle,
            'titleAr' => $finalTitleAr,
            'titleEn' => $finalTitleEn,
            'image' => $image
        ]
    ], 201);
} elseif ($method === 'PUT') {
    // تعديل بيانات الصورة (الاسم العربي والإنجليزي)
    $input = getJsonInput();
    $id = trim($input['id'] ?? '');
    if (empty($id)) {
        sendJsonResponse(['success' => false, 'message' => 'معرف الصورة مطلوب للتعديل'], 400);
    }

    $titleAr = trim($input['titleAr'] ?? '');
    $titleEn = trim($input['titleEn'] ?? '');
    $title = trim($input['title'] ?? '');
    $image = trim($input['image'] ?? '');

    $mainTitle = !empty($titleAr) ? $titleAr : (!empty($title) ? $title : $titleEn);

    $hasBilingual = getGalleryHasBilingualCols($pdo);
    if ($hasBilingual) {
        $fields = ['title = ?', 'title_ar = ?', 'title_en = ?'];
        $params = [$mainTitle, $titleAr ?: $mainTitle, $titleEn ?: $mainTitle];
        if (!empty($image)) {
            $fields[] = 'image = ?';
            $params[] = $image;
        }
        $params[] = $id;
        $stmt = $pdo->prepare('UPDATE frisca_gallery SET ' . implode(', ', $fields) . ' WHERE id = ?');
        $stmt->execute($params);
    } else {
        $fields = ['title = ?'];
        $params = [$mainTitle];
        if (!empty($image)) {
            $fields[] = 'image = ?';
            $params[] = $image;
        }
        $params[] = $id;
        $stmt = $pdo->prepare('UPDATE frisca_gallery SET ' . implode(', ', $fields) . ' WHERE id = ?');
        $stmt->execute($params);
    }

    sendJsonResponse([
        'success' => true,
        'message' => 'تم تحديث بيانات صورة المعرض بنجاح',
        'item' => [
            'id' => $id,
            'title' => $mainTitle,
            'titleAr' => $titleAr ?: $mainTitle,
            'titleEn' => $titleEn ?: $mainTitle,
            'image' => $image
        ]
    ]);
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
