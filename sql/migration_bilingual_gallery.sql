-- =================================================================
-- ملف SQL اختياري لتحديث جدول معرض الصور في قاعدة بيانات MySQL الحية
-- Optional SQL migration to add bilingual columns to frisca_gallery
-- =================================================================

-- 1. إضافة عمودين للاسم العربي والاسم الإنجليزي في جدول معرض الصور
ALTER TABLE `frisca_gallery`
ADD COLUMN `title_ar` VARCHAR(255) NULL AFTER `title`,
ADD COLUMN `title_en` VARCHAR(255) NULL AFTER `title_ar`;

-- 2. نسخ العناوين الحالية لتكون القيمة الافتراضية للعمودين الجديدين
UPDATE `frisca_gallery`
SET `title_ar` = `title`, `title_en` = `title`
WHERE `title_ar` IS NULL OR `title_ar` = '';
