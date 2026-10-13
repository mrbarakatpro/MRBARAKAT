<?php
/**
 * ====================================================================
 * مطعم فريسكا البحرين | API رفع الصور وحفظها في مجلد uploads
 * POST: يتطلب مصادقة الأدمن (Bearer Token)
 * يقوم بفحص امتداد الصورة ونوع MIME وحجمها، وحفظها باسم فريد، وإرجاع الرابط
 * ====================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$pdo = getDbConnection();
$admin = requireAdminAuth($pdo);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

// التأكد من وجود مجلد uploads وإنشائه في حال عدم وجوده
$uploadDir = realpath(UPLOAD_DIR) ?: UPLOAD_DIR;
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// 1. التعامل مع رفع ملف بصيغة multipart/form-data
if (isset($_FILES['image']) && is_uploaded_file($_FILES['image']['tmp_name'])) {
    $file = $_FILES['image'];

    if ($file['error'] !== UPLOAD_ERR_OK) {
        sendJsonResponse(['success' => false, 'message' => 'فشل في رفع الملف، رمز الخطأ: ' . $file['error']], 400);
    }

    if ($file['size'] > MAX_UPLOAD_BYTES) {
        sendJsonResponse(['success' => false, 'message' => 'حجم الصورة كبير جداً، الحد الأقصى 10 ميغابايت'], 400);
    }

    // التحقق من نوع الملف الحقيقي عبر finfo
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);

    $allowedMimes = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
        'image/gif'  => 'gif',
        'image/svg+xml' => 'svg'
    ];

    if (!isset($allowedMimes[$mime])) {
        sendJsonResponse(['success' => false, 'message' => 'نوع الملف غير مدعوم. يرجى رفع صورة بصيغة JPG, PNG, WEBP, أو SVG'], 400);
    }

    $ext = $allowedMimes[$mime];
    $filename = 'frisca_' . time() . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
    $targetPath = rtrim($uploadDir, '/') . '/' . $filename;

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        sendJsonResponse(['success' => false, 'message' => 'تعذر حفظ الصورة على السيرفر، يرجى فحص تصاريح مجلد uploads'], 500);
    }

    $fileUrl = rtrim(UPLOAD_URL_PREFIX, '/') . '/' . $filename;
    sendJsonResponse([
        'success' => true,
        'message' => 'تم رفع الصورة بنجاح وحفظها على السيرفر',
        'url' => $fileUrl,
        'filename' => $filename
    ]);
}

// 2. التعامل مع صور Base64 المرسلة في JSON (للأدمن عند الرغبة)
$input = getJsonInput();
if (!empty($input['imageBase64'])) {
    $base64Data = $input['imageBase64'];

    if (preg_match('/^data:image\/(\w+);base64,/', $base64Data, $type)) {
        $base64Data = substr($base64Data, strpos($base64Data, ',') + 1);
        $ext = strtolower($type[1]);
        if ($ext === 'jpeg') $ext = 'jpg';

        $decoded = base64_decode($base64Data);
        if ($decoded === false) {
            sendJsonResponse(['success' => false, 'message' => 'صيغة Base64 غير صالحة'], 400);
        }

        $filename = 'frisca_' . time() . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
        $targetPath = rtrim($uploadDir, '/') . '/' . $filename;

        if (file_put_contents($targetPath, $decoded) === false) {
            sendJsonResponse(['success' => false, 'message' => 'تعذر حفظ ملف الصورة Base64 على السيرفر'], 500);
        }

        $fileUrl = rtrim(UPLOAD_URL_PREFIX, '/') . '/' . $filename;
        sendJsonResponse([
            'success' => true,
            'message' => 'تم حفظ الصورة بنجاح على السيرفر',
            'url' => $fileUrl,
            'filename' => $filename
        ]);
    }
}

sendJsonResponse(['success' => false, 'message' => 'لم يتم إرسال أي صورة للرفع'], 400);
