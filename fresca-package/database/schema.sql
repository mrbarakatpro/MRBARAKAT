-- =================================================================
-- قاعدة بيانات مطعم فريسكا البحرين | Fresca Restaurant Bahrain
-- متوافقة مع MySQL 5.7+ و MySQL 8.0+ و MariaDB على Namecheap cPanel
-- =================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. جدول مديري النظام وحسابات الأدمن
CREATE TABLE IF NOT EXISTS `frisca_admins` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. جدول جلسات ورموز مصادقة الأدمن (Tokens)
CREATE TABLE IF NOT EXISTS `frisca_sessions` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `admin_id` INT UNSIGNED NOT NULL,
  `token` VARCHAR(64) NOT NULL UNIQUE,
  `expires_at` DATETIME NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (`token`),
  CONSTRAINT `fk_admin_session` FOREIGN KEY (`admin_id`) REFERENCES `frisca_admins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. جدول تصنيفات المنيو
CREATE TABLE IF NOT EXISTS `frisca_categories` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name_ar` VARCHAR(150) NOT NULL,
  `name_en` VARCHAR(150) NOT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. جدول أطباق المنيو
CREATE TABLE IF NOT EXISTS `frisca_menu_items` (
  `id` VARCHAR(50) PRIMARY KEY,
  `category_id` VARCHAR(50) NOT NULL,
  `name_ar` VARCHAR(255) NOT NULL,
  `name_en` VARCHAR(255) NOT NULL,
  `description_ar` TEXT NOT NULL,
  `description_en` TEXT NULL,
  `price_bhd` DECIMAL(8, 3) NOT NULL DEFAULT 0.000,
  `image` TEXT NOT NULL,
  `tag` VARCHAR(100) NULL,
  `tag_en` VARCHAR(100) NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. جدول صور معرض فريسكا
CREATE TABLE IF NOT EXISTS `frisca_gallery` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `image` TEXT NOT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. جدول نصوص وإعدادات وهوية الموقع
CREATE TABLE IF NOT EXISTS `frisca_site_settings` (
  `setting_key` VARCHAR(50) PRIMARY KEY,
  `setting_value` LONGTEXT NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. جدول حجوزات الطاولات
CREATE TABLE IF NOT EXISTS `frisca_bookings` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `guests` VARCHAR(20) NOT NULL,
  `booking_date` VARCHAR(50) NOT NULL,
  `booking_time` VARCHAR(50) NOT NULL,
  `dish` VARCHAR(255) NULL,
  `status` ENUM('confirmed', 'pending', 'cancelled') NOT NULL DEFAULT 'confirmed',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. جدول إحصائيات زوار المنيو
CREATE TABLE IF NOT EXISTS `frisca_menu_stats` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `total_visits` INT UNSIGNED NOT NULL DEFAULT 0,
  `today_visits` INT UNSIGNED NOT NULL DEFAULT 0,
  `unique_visitors` INT UNSIGNED NOT NULL DEFAULT 0,
  `total_dish_views` INT UNSIGNED NOT NULL DEFAULT 0,
  `last_visit_date` DATE NOT NULL,
  `dish_views_json` LONGTEXT NULL,
  `category_views_json` LONGTEXT NULL,
  `recent_activities_json` LONGTEXT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =================================================================
-- البيانات الأولية الافتراضية (Seed Data)
-- =================================================================

-- حساب الأدمن الافتراضي (اسم المستخدم: admin | كلمة المرور: admin)
-- كلمة المرور مشفرة بواسطة خوارزمية BCRYPT القياسية الآمنة
INSERT INTO `frisca_admins` (`id`, `username`, `password_hash`) VALUES
(1, 'admin', '$2y$10$oX3h6m8cZ.H9yFh1m9mOceDq92gV5p6.1f6Yt3uYvYFzR2hWjYvqu')
ON DUPLICATE KEY UPDATE `username` = VALUES(`username`);

-- تصنيفات المنيو الافتراضية
INSERT INTO `frisca_categories` (`id`, `name_ar`, `name_en`, `display_order`) VALUES
('pastas', 'الباستا والريزوتو', 'Pastas & Risotto', 1),
('mains', 'الأطباق الرئيسية واللحوم', 'Main Courses & Steaks', 2),
('pizza', 'البيتزا النابولية', 'Neapolitan Pizza', 3),
('appetizers', 'المقبلات والشوربات', 'Appetizers & Starters', 4),
('desserts', 'الحلويات الفاخرة', 'Desserts & Sweets', 5),
('drinks', 'المشروبات والموكتيلات', 'Drinks & Mocktails', 6)
ON DUPLICATE KEY UPDATE `name_ar` = VALUES(`name_ar`), `name_en` = VALUES(`name_en`);

-- أطباق المنيو الافتراضية
INSERT INTO `frisca_menu_items` (`id`, `category_id`, `name_ar`, `name_en`, `description_ar`, `description_en`, `price_bhd`, `image`, `tag`, `tag_en`) VALUES
('1', 'pastas', 'تاغليوليني الكمأة السوداء والبارميزان', 'Black Truffle Tagliolini & Aged Parmesan', 'باستا طازجة محضرة يدوياً يومياً، تقدم مع شرائح الكمأة الإيطالية السوداء وصلصة البارميزان المعتق 24 شهراً وزبدة جبال الألب النقية.', 'Fresh handcrafted pasta daily with shaved Umbrian black truffle, 24-month aged Reggiano emulsion, and alpine cultured butter.', 8.500, '/src/assets/images/frisca_signature_pasta_1791674240410.jpg', 'الأكثر طلباً', 'Best Seller'),
('2', 'mains', 'واغيو ريب آي مشوي بدرجة A5', 'Grilled Wagyu Ribeye Steak A5', 'قطعة لحم واغيو استثنائية مشوية على فحم السنديان الطبيعي، تقدم مع هريس البطاطس بالكمأة وخضار موسمية مكرملة وصلصة التوت البري.', 'Prime Japanese A5 wagyu charcoal grilled, accompanied by smooth truffle purée, glazed heritage carrots, and wild blackberry reduction.', 14.500, '/src/assets/images/frisca_steak_mains_1791674258976.jpg', 'توصية الشيف', "Chef's Choice"),
('3', 'pizza', 'بيتزا تروفل وبوراتا دي بوفالا', 'Truffle & Burrata di Bufala Pizza', 'عجينة مخمرة طبيعياً لمدة 48 ساعة، جبن البوراتا الطازج المستورد من كامبانيا، زيت الكمأة الأبيض، وريحان عضوي مقرمش.', '48-hour slow fermented dough, creamy fresh buffalo burrata, white truffle aroma, San Marzano drizzle, and crispy organic basil.', 7.800, '/src/assets/images/frisca_hero_restaurant_1791674222406.jpg', 'حصري', 'Exclusive'),
('4', 'desserts', 'فوندان الشوكولاتة الداكنة وجيلاتو الفستق', 'Dark Chocolate Fondant & Pistachio Gelato', 'شوكولاتة بلجيكية داكنة 70% تذوب بحرارة القلب، تقدم مع جيلاتو الفستق الصقلي المحمص وتوت طازج.', 'Decadent 70% Belgian chocolate molten cake with roasted Sicilian pistachio gelato, golden feuilletine, and wild forest berries.', 4.500, '/src/assets/images/frisca_dessert_drink_1791674279035.jpg', 'حلوى مميزة', 'Signature'),
('5', 'appetizers', 'شوربة المأكولات البحرية الصقلية (Zuppa di Mare)', 'Sicilian Seafood Bouillabaisse', 'مرق زعفران غني مع روبيان الخليج الطازج، بلح البحر، وحبار مع كروستيني الثوم المحمص وزيت الزيتون البكر.', 'Rich saffron seafood broth brimming with Gulf prawns, mussels, baby calamari, and artisanal rustic garlic crostini.', 5.200, '/src/assets/images/frisca_signature_pasta_1791674240410.jpg', NULL, NULL),
('6', 'drinks', 'موكتيل فريسكا روبي الملكي', 'Fresca Ruby Royal Mocktail', 'مزيج فاخر من الرمان البري، ماء الورد البحريني المقطر، عصير التوت، ولمسة من الصودا الفوارة وبتلات الذهب.', 'Signature blend of cold-pressed wild pomegranate, Bahraini distilled rose water, muddled berries, and edible gold flakes.', 3.500, '/src/assets/images/frisca_dessert_drink_1791674279035.jpg', 'منعش', 'Refreshing')
ON DUPLICATE KEY UPDATE `name_ar` = VALUES(`name_ar`);

-- صور المعرض الافتراضية
INSERT INTO `frisca_gallery` (`id`, `title`, `image`, `display_order`) VALUES
('1', 'المجلس الرئيسي فرع السيف', '/src/assets/images/frisca_seef_hall_1791676569850.jpg', 1),
('2', 'تاغليوليني الكمأة السوداء', '/src/assets/images/frisca_signature_pasta_1791674240410.jpg', 2),
('3', 'واغيو ريب آي مشوي', '/src/assets/images/frisca_steak_mains_1791674258976.jpg', 3),
('4', 'فوندان الشوكولاتة والجيلاتو', '/src/assets/images/frisca_dessert_drink_1791674279035.jpg', 4),
('5', 'المقبلات والبوراتا الطازجة', '/src/assets/images/frisca_signature_pasta_1791674240410.jpg', 5),
('6', 'موكتيل فريسكا روبي المنعش', '/src/assets/images/frisca_dessert_drink_1791674279035.jpg', 6),
('7', 'الجلسات المسائية الراقية', '/src/assets/images/frisca_hero_restaurant_1791674222406.jpg', 7)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- إعدادات النصوص والهوية الافتراضية
INSERT INTO `frisca_site_settings` (`setting_key`, `setting_value`) VALUES
('site_texts', '{"logoUrl":"","topBar":{"location":"ضفاف ضاحية السيف, المنامة - مملكة البحرين","hours":"يومياً 12:00 م - 1:00 صباحاً","phone":"+973 1700 1122","email":"info@fresca.bh"},"hero":{"kicker":"الوجهة الأولى للطهي الفاخر في البحرين","titleLine1":"مطعم فريسكا","titleLine2":"الفخامة والرقي في قلب المنامة","subtitle":"نأخذكم في رحلة طهي استثنائية تجمع بين نكهات البحر الأبيض المتوسط الأصيلة واللمسات البحرينية الحديثة، وسط أجواء مخملية وديكورات نبيتية تبهر الحواس.","exploreMenuBtn":"استكشف قائمة الطعام","bookTableBtn":"حجز طاولة خاصة","image":"/src/assets/images/frisca_hero_restaurant_1791674222406.jpg","opacity":50},"stats":[{"value":"15+","label":"جائزة طهي عالمية"},{"value":"100K+","label":"ضيف سعيد سنوياً"},{"value":"100%","label":"مكونات طازجة وفاخرة"},{"value":"VIP","label":"قاعات جلسات خاصة"}],"identity":{"kicker":"هوية فريسكا","title":"حين يمتزج الشغف بالفخامة المطلقة","paragraph1":"تم تأسيس مطعم وشريكة فريسكا (Fresca) بمملكة البحرين لتكون المعيار الجديد للضيافة الفاخرة. استوحينا الهوية من اللون النبيتي الفاخر لتعكس نبل المذاق وأناقة المكان.","paragraph2":"نفتخر باستقطاب نخب الطهاة العالميين لتصميم أطباق متفردة ترتقي لأصحاب الذوق الرفيع، سواء في اجتماعات الأعمال الرسمية أو الأمسيات العائلية والخاصة.","card1":{"title":"إطلالة البحرية الساحرة","desc":"موقع استراتيجي في ضاحية السيف."},"card2":{"title":"خدمة ضيافة ملكية","desc":"اهتمام بأدق التفاصيل لراحتكم."},"imageCaptionTitle":"المجلس الرئيسي - فرع السيف","imageCaptionSub":"أجواء ساحرة وتصاميم مريحة","image":"/src/assets/images/frisca_seef_hall_1791676569850.jpg"},"gallery":{"kicker":"معرض فريسكا","title":"عالم من الفخامة بانتظاركم","speed":25,"autoPlay":true},"footer":{"brandDesc":"مطعم وشريكة فريسكا البحرين - العنوان المفضل لتجارب الإطعام الفاخرة والخدمة المتميزة.","copyright":"© 2026 مطعم فريسكا البحرين. جميع الحقوق محفوظة."}}')
ON DUPLICATE KEY UPDATE `setting_key` = VALUES(`setting_key`);

-- الحجوزات الافتراضية
INSERT INTO `frisca_bookings` (`id`, `name`, `phone`, `guests`, `booking_date`, `booking_time`, `dish`, `status`, `created_at`) VALUES
('FRS-101', 'عبد العزيز آل خليفة', '+973 3944 1122', '4', '2026-10-14', '08:30 PM', 'تاغليوليني فريسكا بالكمأة السوداء', 'confirmed', NOW()),
('FRS-102', 'سارة الدوسري', '+973 3811 9900', '2', '2026-10-15', '09:00 PM', 'المجلس الرئيسي - فرع السيف', 'confirmed', NOW())
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- إحصائيات زوار المنيو الافتراضية
INSERT INTO `frisca_menu_stats` (`id`, `total_visits`, `today_visits`, `unique_visitors`, `total_dish_views`, `last_visit_date`, `dish_views_json`, `category_views_json`, `recent_activities_json`) VALUES
(1, 3842, 168, 2690, 5240, CURRENT_DATE(), '{"1":1420,"2":1180,"4":980,"3":820,"5":740,"6":690}', '{"pastas":1640,"mains":1350,"pizza":1120,"appetizers":950,"desserts":810,"drinks":760}', '[{"id":"act-1","timestamp":"الآن","type":"pageview","label":"زيارة لصفحة المنيو الرئيسية"},{"id":"act-2","timestamp":"منذ 3 دقائق","type":"dish","label":"مشاهدة طبق: تاغليوليني الكمأة السوداء"},{"id":"act-3","timestamp":"منذ 7 دقائق","type":"dish","label":"مشاهدة طبق: واغيو ريب آي مشوي"},{"id":"act-4","timestamp":"منذ 15 دقيقة","type":"category","label":"تصفح قسم: الباستا والريزوتو"}]')
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`);

SET FOREIGN_KEY_CHECKS = 1;
