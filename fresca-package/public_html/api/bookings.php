<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | API حجوزات الطاولات
 * GET: استعراض الحجوزات (يتطلب أدمن)
 * POST: حجز طاولة جديدة (متاح للزوار)
 * PUT: تحديث حالة الحجز (يتطلب أدمن)
 * ====================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // حجز طاولة من الواجهة العامة
    $input = getJsonInput();
    $name = trim($input['name'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $guests = trim($input['guests'] ?? '2');
    $date = trim($input['date'] ?? '');
    $time = trim($input['time'] ?? '');
    $dish = trim($input['dish'] ?? '');

    if (empty($name) || empty($phone) || empty($date) || empty($time)) {
        sendJsonResponse(['success' => false, 'message' => 'يرجى استكمال جميع بيانات الحجز المطلوبة'], 400);
    }

    $id = 'FRS-' . rand(100, 999);
    $status = 'confirmed';

    $stmt = $pdo->prepare('INSERT INTO frisca_bookings (id, name, phone, guests, booking_date, booking_time, dish, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$id, $name, $phone, $guests, $date, $time, $dish, $status]);

    sendJsonResponse([
        'success' => true,
        'message' => 'تم تأكيد حجز الطاولة بنجاح! ننتظر تشريفكم لنا في فريسكا البحرين.',
        'booking' => [
            'id' => $id,
            'name' => $name,
            'phone' => $phone,
            'guests' => $guests,
            'date' => $date,
            'time' => $time,
            'dish' => $dish,
            'status' => $status
        ]
    ], 201);
}

// العمليات التالية (عرض وتحديث الحالة) تتطلب صلاحية الأدمن
$admin = requireAdminAuth($pdo);

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT id, name, phone, guests, booking_date AS date, booking_time AS time, dish, status, created_at AS createdAt FROM frisca_bookings ORDER BY created_at DESC');
    sendJsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
} elseif ($method === 'PUT') {
    $input = getJsonInput();
    $id = trim($input['id'] ?? '');
    $status = trim($input['status'] ?? 'confirmed');

    if (!in_array($status, ['confirmed', 'pending', 'cancelled'])) {
        sendJsonResponse(['success' => false, 'message' => 'حالة الحجز غير صالحة'], 400);
    }

    $stmt = $pdo->prepare('UPDATE frisca_bookings SET status = ? WHERE id = ?');
    $stmt->execute([$status, $id]);

    sendJsonResponse(['success' => true, 'message' => 'تم تحديث حالة الحجز بنجاح']);
} else {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}
