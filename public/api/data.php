<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | API جلب كافة بيانات الموقع العامة
 * GET: يرجع التصنيفات، أطباق المنيو، المعرض، النصوص، والإحصائيات
 * متاح لجميع الزوار ومن أي متصفح
 * ====================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$pdo = getDbConnection();

try {
    // 1. جلب التصنيفات
    $catStmt = $pdo->query('SELECT id, name_ar AS nameAr, name_en AS nameEn FROM frisca_categories ORDER BY display_order ASC, created_at ASC');
    $categories = $catStmt->fetchAll();

    // 2. جلب أطباق المنيو
    $menuStmt = $pdo->query('SELECT id, category_id AS category, name_ar AS nameAr, name_en AS nameEn, description_ar AS descriptionAr, description_en AS descriptionEn, price_bhd AS priceBHD, image, tag, tag_en AS tagEn FROM frisca_menu_items ORDER BY created_at DESC');
    $menuItems = $menuStmt->fetchAll();
    // تحويل السعر لرقم عشري
    foreach ($menuItems as &$item) {
        $item['priceBHD'] = (float)$item['priceBHD'];
    }

    // 3. جلب صور المعرض (بدعم الأسماء ثنائية اللغة العربية والإنجليزية)
    $hasBilingualGal = false;
    try {
        $checkCol = $pdo->query("SHOW COLUMNS FROM frisca_gallery LIKE 'title_ar'");
        $hasBilingualGal = ($checkCol->fetch() !== false);
    } catch (Exception $e) {
        $hasBilingualGal = false;
    }

    if ($hasBilingualGal) {
        $galStmt = $pdo->query('SELECT id, title, COALESCE(NULLIF(title_ar, ""), title) AS titleAr, COALESCE(NULLIF(title_en, ""), title) AS titleEn, image FROM frisca_gallery ORDER BY display_order ASC, created_at ASC');
    } else {
        $galStmt = $pdo->query('SELECT id, title, title AS titleAr, title AS titleEn, image FROM frisca_gallery ORDER BY display_order ASC, created_at ASC');
    }
    $gallery = $galStmt->fetchAll();

    // 4. جلب نصوص الموقع
    $textsStmt = $pdo->prepare('SELECT setting_value FROM frisca_site_settings WHERE setting_key = ? LIMIT 1');
    $textsStmt->execute(['site_texts']);
    $textsRow = $textsStmt->fetch();
    $siteTexts = null;
    if ($textsRow && !empty($textsRow['setting_value'])) {
        $siteTexts = json_decode($textsRow['setting_value'], true);
    }

    // 5. جلب إحصائيات المنيو
    $statsStmt = $pdo->query('SELECT total_visits AS totalVisits, today_visits AS todayVisits, unique_visitors AS uniqueVisitors, total_dish_views AS totalDishViews, last_visit_date AS lastVisitDate, dish_views_json, category_views_json, recent_activities_json FROM frisca_menu_stats ORDER BY id ASC LIMIT 1');
    $statsRow = $statsStmt->fetch();
    $menuStats = null;
    if ($statsRow) {
        $menuStats = [
            'totalVisits' => (int)$statsRow['totalVisits'],
            'todayVisits' => (int)$statsRow['todayVisits'],
            'uniqueVisitors' => (int)$statsRow['uniqueVisitors'],
            'totalDishViews' => (int)$statsRow['totalDishViews'],
            'lastVisitDate' => $statsRow['lastVisitDate'],
            'dishViews' => !empty($statsRow['dish_views_json']) ? json_decode($statsRow['dish_views_json'], true) : new stdClass(),
            'categoryViews' => !empty($statsRow['category_views_json']) ? json_decode($statsRow['category_views_json'], true) : new stdClass(),
            'recentActivities' => !empty($statsRow['recent_activities_json']) ? json_decode($statsRow['recent_activities_json'], true) : []
        ];
    }

    // 6. جلب بيانات الأدمن الحالية (بدون كلمة المرور)
    $adminStmt = $pdo->query('SELECT username, last_updated AS lastUpdated FROM frisca_admins ORDER BY id ASC LIMIT 1');
    $adminRow = $adminStmt->fetch();

    sendJsonResponse([
        'success' => true,
        'data' => [
            'categories' => $categories,
            'menuItems' => $menuItems,
            'gallery' => $gallery,
            'siteTexts' => $siteTexts,
            'menuStats' => $menuStats,
            'adminInfo' => $adminRow ? ['username' => $adminRow['username'], 'lastUpdated' => $adminRow['lastUpdated']] : null
        ]
    ]);
} catch (Exception $e) {
    sendJsonResponse([
        'success' => false,
        'message' => 'حدث خطأ أثناء جلب بيانات الموقع: ' . $e->getMessage()
    ], 500);
}
