<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | API إحصائيات زوار المنيو
 * GET: استعراض الإحصائيات (عام أو للأدمن)
 * POST: تسجيل زيارة / تصفح طبق / تصفح تصنيف (عام)
 * DELETE: إعادة تعيين الإحصائيات (يتطلب أدمن)
 * ====================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// التأكد من وجود سجل الإحصائيات في الجدول
function getOrCreateStatsRow($pdo) {
    $stmt = $pdo->query('SELECT * FROM frisca_menu_stats ORDER BY id ASC LIMIT 1');
    $row = $stmt->fetch();
    if (!$row) {
        $today = date('Y-m-d');
        $pdo->prepare('INSERT INTO frisca_menu_stats (id, total_visits, today_visits, unique_visitors, total_dish_views, last_visit_date, dish_views_json, category_views_json, recent_activities_json) VALUES (1, 0, 0, 0, 0, ?, "{}", "{}", "[]")')->execute([$today]);
        $stmt = $pdo->query('SELECT * FROM frisca_menu_stats ORDER BY id ASC LIMIT 1');
        $row = $stmt->fetch();
    }
    return $row;
}

if ($method === 'GET') {
    $row = getOrCreateStatsRow($pdo);
    sendJsonResponse([
        'success' => true,
        'data' => [
            'totalVisits' => (int)$row['total_visits'],
            'todayVisits' => (int)$row['today_visits'],
            'uniqueVisitors' => (int)$row['unique_visitors'],
            'totalDishViews' => (int)$row['total_dish_views'],
            'lastVisitDate' => $row['last_visit_date'],
            'dishViews' => !empty($row['dish_views_json']) ? json_decode($row['dish_views_json'], true) : new stdClass(),
            'categoryViews' => !empty($row['category_views_json']) ? json_decode($row['category_views_json'], true) : new stdClass(),
            'recentActivities' => !empty($row['recent_activities_json']) ? json_decode($row['recent_activities_json'], true) : []
        ]
    ]);
} elseif ($method === 'POST') {
    $input = getJsonInput();
    $action = $input['action'] ?? 'visit'; // 'visit' | 'dish' | 'category'
    $row = getOrCreateStatsRow($pdo);

    $todayStr = date('Y-m-d');
    $isSameDay = ($row['last_visit_date'] === $todayStr);

    $totalVisits = (int)$row['total_visits'];
    $todayVisits = $isSameDay ? (int)$row['today_visits'] : 0;
    $uniqueVisitors = (int)$row['unique_visitors'];
    $totalDishViews = (int)$row['total_dish_views'];

    $dishViews = !empty($row['dish_views_json']) ? json_decode($row['dish_views_json'], true) : [];
    if (!is_array($dishViews)) $dishViews = [];

    $catViews = !empty($row['category_views_json']) ? json_decode($row['category_views_json'], true) : [];
    if (!is_array($catViews)) $catViews = [];

    $activities = !empty($row['recent_activities_json']) ? json_decode($row['recent_activities_json'], true) : [];
    if (!is_array($activities)) $activities = [];

    $timestamp = date('H:i');

    if ($action === 'visit') {
        $isNewUnique = !empty($input['isNewUnique']);
        $totalVisits++;
        $todayVisits++;
        if ($isNewUnique) {
            $uniqueVisitors++;
        }
        $newAct = [
            'id' => 'act-' . time() . '-' . rand(10, 99),
            'timestamp' => $timestamp,
            'type' => 'pageview',
            'label' => $input['label'] ?? 'زيارة لصفحة قائمة الطعام'
        ];
        array_unshift($activities, $newAct);
    } elseif ($action === 'dish') {
        $dishId = (string)($input['dishId'] ?? '');
        $dishTitle = $input['dishTitle'] ?? 'طبق';
        if ($dishId) {
            $dishViews[$dishId] = ($dishViews[$dishId] ?? 0) + 1;
            $totalDishViews++;
            $newAct = [
                'id' => 'act-' . time() . '-' . rand(10, 99),
                'timestamp' => $timestamp,
                'type' => 'dish',
                'label' => 'مشاهدة طبق: ' . $dishTitle
            ];
            array_unshift($activities, $newAct);
        }
    } elseif ($action === 'category') {
        $catId = (string)($input['categoryId'] ?? '');
        $catTitle = $input['categoryTitle'] ?? 'قسم';
        if ($catId) {
            $catViews[$catId] = ($catViews[$catId] ?? 0) + 1;
            $newAct = [
                'id' => 'act-' . time() . '-' . rand(10, 99),
                'timestamp' => $timestamp,
                'type' => 'category',
                'label' => 'تصفح قسم: ' . $catTitle
            ];
            array_unshift($activities, $newAct);
        }
    }

    $activities = array_slice($activities, 0, 25);

    $updateStmt = $pdo->prepare('UPDATE frisca_menu_stats SET total_visits = ?, today_visits = ?, unique_visitors = ?, total_dish_views = ?, last_visit_date = ?, dish_views_json = ?, category_views_json = ?, recent_activities_json = ? WHERE id = ?');
    $updateStmt->execute([
        $totalVisits,
        $todayVisits,
        $uniqueVisitors,
        $totalDishViews,
        $todayStr,
        json_encode($dishViews, JSON_UNESCAPED_UNICODE),
        json_encode($catViews, JSON_UNESCAPED_UNICODE),
        json_encode($activities, JSON_UNESCAPED_UNICODE),
        $row['id']
    ]);

    sendJsonResponse(['success' => true]);
} elseif ($method === 'DELETE') {
    // تصفير الإحصائيات (يتطلب صلاحية الأدمن)
    $admin = requireAdminAuth($pdo);
    $row = getOrCreateStatsRow($pdo);

    $todayStr = date('Y-m-d');
    $updateStmt = $pdo->prepare('UPDATE frisca_menu_stats SET total_visits = 0, today_visits = 0, unique_visitors = 0, total_dish_views = 0, last_visit_date = ?, dish_views_json = "{}", category_views_json = "{}", recent_activities_json = "[]" WHERE id = ?');
    $updateStmt->execute([$todayStr, $row['id']]);

    sendJsonResponse([
        'success' => true,
        'message' => 'تمت إعادة تعيين إحصائيات المنيو بنجاح في قاعدة البيانات'
    ]);
} else {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}
