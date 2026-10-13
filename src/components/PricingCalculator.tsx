import React, { useState } from 'react';
import { Calculator, Check, Plus, Minus, Send, Sparkles, FileText, Calendar, Clock, Users, Camera, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONTACT } from '../data/studioData';

interface PricingCalculatorProps {
  lang: Language;
  onOpenBookingWithDetails: (details: string) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  lang,
  onOpenBookingWithDetails,
}) => {
  // Config state
  const [sessionType, setSessionType] = useState<'wedding' | 'portrait' | 'commercial' | 'event'>('wedding');
  const [hours, setHours] = useState<number>(8);
  const [photographers, setPhotographers] = useState<number>(2);
  const [videographers, setVideographers] = useState<number>(1);
  const [includeDrone, setIncludeDrone] = useState<boolean>(true);
  const [includeAlbum, setIncludeAlbum] = useState<boolean>(true);
  const [includeSameDayEdit, setIncludeSameDayEdit] = useState<boolean>(false);
  const [includePrintBooth, setIncludePrintBooth] = useState<boolean>(false);
  const [eventDate, setEventDate] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // Pricing formula in BHD (Bahraini Dinar):
  // Base rates:
  const baseRatePerHour = sessionType === 'wedding' ? 35 : sessionType === 'commercial' ? 40 : sessionType === 'portrait' ? 25 : 30;
  const photographerRatePerHour = 15;
  const videographerRatePerHour = 22;
  const droneCost = includeDrone ? 80 : 0;
  const albumCost = includeAlbum ? 110 : 0;
  const sameDayEditCost = includeSameDayEdit ? 65 : 0;
  const printBoothCost = includePrintBooth ? 95 : 0;

  const totalCalculatedBHD = Math.round(
    baseRatePerHour * hours +
      photographers * photographerRatePerHour * hours +
      videographers * videographerRatePerHour * hours +
      droneCost +
      albumCost +
      sameDayEditCost +
      printBoothCost
  );

  // Conversion for GCC clients (SAR is roughly 10x BHD)
  const totalCalculatedSAR = Math.round(totalCalculatedBHD * 9.95);

  const sessionTypeLabels = {
    wedding: { ar: 'حفل زفاف أو ملكة ملكي', en: 'Royal Wedding / Reception' },
    portrait: { ar: 'جلسة بورتريه استديو VIP', en: 'Fine Art Studio Portrait' },
    commercial: { ar: 'إنتاج إعلاني وتجاري للشركات', en: 'Commercial Brand Campaign' },
    event: { ar: 'تغطية فعالية أو مؤتمر رسمي', en: 'Official Corporate Event' },
  };

  const generateWhatsAppMessage = () => {
    const summary =
      lang === 'ar'
        ? `السلام عليكم أستاذ بركات، أرغب بحجز باقة تصوير استديو بركات في البحرين:
• نوع الجلسة: ${sessionTypeLabels[sessionType].ar}
• ساعات التغطية: ${hours} ساعات
• طاقم العمل: ${photographers} مصور فوتوغرافي + ${videographers} مخرج فيديو سينمائي
• إضافات: ${includeDrone ? 'تصوير درونز مرخص، ' : ''}${includeAlbum ? 'ألبوم إيطالي فاخر، ' : ''}${includeSameDayEdit ? 'مونتاج فوري نفس الليلة، ' : ''}${includePrintBooth ? 'استديو طباعة فورية، ' : ''}
• التكلفة التقديرية: ${totalCalculatedBHD} دينار بحريني (د.ب)
• الاسم: ${clientName || 'عميل كريم'}
• التاريخ المطلوب: ${eventDate || 'قريباً'}`
        : `Hello Barakat Studio Bahrain, I would like to book a photography session:
• Type: ${sessionTypeLabels[sessionType].en}
• Duration: ${hours} hours
• Crew: ${photographers} Photographers + ${videographers} Videographers
• Inclusions: ${includeDrone ? 'Licensed Drone, ' : ''}${includeAlbum ? 'Italian Leather Album, ' : ''}${includeSameDayEdit ? 'Same-day Edit, ' : ''}${includePrintBooth ? 'Print Booth, ' : ''}
• Estimated Total: ${totalCalculatedBHD} BHD
• Name: ${clientName || 'Client'}
• Preferred Date: ${eventDate || 'Upcoming'}`;

    return `https://wa.me/97339228410?text=${encodeURIComponent(summary)}`;
  };

  return (
    <section id="calculator" className="py-20 bg-neutral-900/60 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Calculator className="w-4 h-4" />
            <span>{lang === 'ar' ? 'شفافية الأسعار' : 'Instant Estimate'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'ar' ? (
              <>
                حاسبة الباقات التقديرية <span className="gold-gradient-text font-serif">بالدينار البحريني (د.ب)</span>
              </>
            ) : (
              <>
                Interactive Pricing Calculator <span className="gold-gradient-text font-serif">(BHD)</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'صمّم باقتك حسب متطلبات مناسبتك واحصل على تسعير فوري ومباشر مع كافة التفاصيل والإضافات الفاخرة.'
              : 'Customize your coverage requirements, crew size, and luxury add-ons to obtain an instant transparent quotation.'}
          </p>
        </div>

        {/* Interactive Grid: Controls on Left, Live Quotation Voucher on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Configuration Controls (8 cols) */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl space-y-6">
            {/* Step 1: Session Type Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                {lang === 'ar' ? '1. نوع الجلسة أو المناسبة' : '1. Select Event / Session Type'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['wedding', 'portrait', 'commercial', 'event'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setSessionType(type);
                      if (type === 'portrait') {
                        setHours(2);
                        setPhotographers(1);
                        setVideographers(0);
                        setIncludeDrone(false);
                      } else if (type === 'wedding') {
                        setHours(8);
                        setPhotographers(2);
                        setVideographers(1);
                        setIncludeDrone(true);
                      }
                    }}
                    className={`p-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                      sessionType === type
                        ? 'bg-amber-500/15 border-amber-400 text-amber-300 shadow-md'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    {sessionTypeLabels[type][lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Coverage Duration (Hours) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {lang === 'ar' ? '2. مدة التغطية والتصوير' : '2. Coverage Duration'}
                </label>
                <span className="text-sm font-bold text-white font-mono bg-neutral-900 px-2.5 py-0.5 rounded-lg border border-neutral-800">
                  {hours} {lang === 'ar' ? 'ساعات' : 'Hours'}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="14"
                step="1"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                <span>{lang === 'ar' ? 'ساعتان (جلسة سريعة)' : '2 Hours (Studio Session)'}</span>
                <span>{lang === 'ar' ? '8 ساعات (حفل كامل)' : '8 Hours (Full Wedding)'}</span>
                <span>{lang === 'ar' ? '14 ساعة (تغطية شاملة)' : '14 Hours (All-Day)'}</span>
              </div>
            </div>

            {/* Step 3: Production Crew Team Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Photographers */}
              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'ar' ? 'المصورون الفوتوغرافيون' : 'Still Photographers'}</span>
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    {lang === 'ar' ? 'كاميرات هاسلبلاد وسوني 61MP' : 'Hasselblad / Sony FX'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPhotographers(Math.max(1, photographers - 1))}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-5 text-center font-bold text-white text-sm font-mono">{photographers}</span>
                  <button
                    onClick={() => setPhotographers(Math.min(5, photographers + 1))}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Videographers */}
              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'ar' ? 'مخرجو الفيديو السينمائي' : 'Cinema Videographers'}</span>
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    {lang === 'ar' ? 'كاميرات سينما 4K مع مثبت جيمبال' : '4K Cinema Lines + Gimbals'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVideographers(Math.max(0, videographers - 1))}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-5 text-center font-bold text-white text-sm font-mono">{videographers}</span>
                  <button
                    onClick={() => setVideographers(Math.min(4, videographers + 1))}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Luxury Add-ons (Checkboxes) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                {lang === 'ar' ? '3. الإضافات الفاخرة المتاحة' : '3. Optional Luxury Add-ons'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Drone */}
                <div
                  onClick={() => setIncludeDrone(!includeDrone)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    includeDrone
                      ? 'bg-amber-500/10 border-amber-500/40 text-white'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center ${includeDrone ? 'bg-amber-500 text-neutral-950' : 'border border-neutral-700'}`}>
                      {includeDrone && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{lang === 'ar' ? 'تصوير درونز جوي مرخص (+80 د.ب)' : 'Licensed Aerial Drone (+80 BHD)'}</div>
                      <div className="text-[10px] text-neutral-400">{lang === 'ar' ? 'ترخيص الطيران المدني بالبحرين' : 'Authorized by BCAA'}</div>
                    </div>
                  </div>
                </div>

                {/* Italian Leather Album */}
                <div
                  onClick={() => setIncludeAlbum(!includeAlbum)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    includeAlbum
                      ? 'bg-amber-500/10 border-amber-500/40 text-white'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center ${includeAlbum ? 'bg-amber-500 text-neutral-950' : 'border border-neutral-700'}`}>
                      {includeAlbum && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{lang === 'ar' ? 'ألبوم إيطالي جلد وصندوق ملكي (+110 د.ب)' : 'Italian Leather Album (+110 BHD)'}</div>
                      <div className="text-[10px] text-neutral-400">{lang === 'ar' ? 'طباعة حرارية بضمان مدى الحياة' : 'Archival metallic print'}</div>
                    </div>
                  </div>
                </div>

                {/* Same-day highlight reel */}
                <div
                  onClick={() => setIncludeSameDayEdit(!includeSameDayEdit)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    includeSameDayEdit
                      ? 'bg-amber-500/10 border-amber-500/40 text-white'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center ${includeSameDayEdit ? 'bg-amber-500 text-neutral-950' : 'border border-neutral-700'}`}>
                      {includeSameDayEdit && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{lang === 'ar' ? 'مونتاج فوري نفس الليلة (+65 د.ب)' : 'Same-Day Video Edit (+65 BHD)'}</div>
                      <div className="text-[10px] text-neutral-400">{lang === 'ar' ? 'ريلز تشويقي يسلم فجر المناسبة' : 'Express Instagram reel on site'}</div>
                    </div>
                  </div>
                </div>

                {/* Instant Print Booth */}
                <div
                  onClick={() => setIncludePrintBooth(!includePrintBooth)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    includePrintBooth
                      ? 'bg-amber-500/10 border-amber-500/40 text-white'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center ${includePrintBooth ? 'bg-amber-500 text-neutral-950' : 'border border-neutral-700'}`}>
                      {includePrintBooth && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{lang === 'ar' ? 'استديو طباعة فورية للضيوف (+95 د.ب)' : 'Instant Photo Booth (+95 BHD)'}</div>
                      <div className="text-[10px] text-neutral-400">{lang === 'ar' ? 'توزيع هدايا تذكارية مصورة' : 'Live photo cards for guests'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick date & client input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                  {lang === 'ar' ? 'تاريخ المناسبة المتوقع' : 'Target Event Date'}
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                  {lang === 'ar' ? 'اسم العميل / العائلة' : 'Client Name'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'مثال: عبد العزيز - المنامة' : 'e.g., Al Khalifa - Manama'}
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Quotation Voucher Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 sm:p-7 rounded-2xl border border-amber-500/40 shadow-2xl sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span className="font-extrabold text-white text-base">
                  {lang === 'ar' ? 'عرض السعر التقديري الرسمي' : 'Official Quotation Estimate'}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                BHD ESTIMATE
              </span>
            </div>

            {/* Selected Breakdown */}
            <div className="py-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400">{lang === 'ar' ? 'نوع التغطية:' : 'Package:'}</span>
                <span className="font-bold text-white">{sessionTypeLabels[sessionType][lang]}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400">{lang === 'ar' ? 'ساعات العمل المعتمدة:' : 'Hours:'}</span>
                <span className="font-mono text-white">{hours} {lang === 'ar' ? 'ساعات' : 'Hours'}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400">{lang === 'ar' ? 'طاقم الاستديو الميداني:' : 'Field Crew:'}</span>
                <span className="text-white">
                  {photographers} {lang === 'ar' ? 'مصور فوتوغرافي' : 'Photo'} + {videographers} {lang === 'ar' ? 'فيديو سينما' : 'Video'}
                </span>
              </div>

              {/* Inclusions tags */}
              <div className="pt-2 border-t border-neutral-800/80">
                <div className="text-[11px] text-neutral-400 mb-1.5">{lang === 'ar' ? 'الإضافات المشمولة:' : 'Included Add-ons:'}</div>
                <div className="flex flex-wrap gap-1.5">
                  {includeDrone && (
                    <span className="text-[10px] bg-neutral-800 text-amber-300 px-2 py-0.5 rounded">
                      {lang === 'ar' ? '✓ تصوير جوي بالدرون' : '✓ Drone'}
                    </span>
                  )}
                  {includeAlbum && (
                    <span className="text-[10px] bg-neutral-800 text-amber-300 px-2 py-0.5 rounded">
                      {lang === 'ar' ? '✓ ألبوم إيطالي فاخر' : '✓ Italian Album'}
                    </span>
                  )}
                  {includeSameDayEdit && (
                    <span className="text-[10px] bg-neutral-800 text-amber-300 px-2 py-0.5 rounded">
                      {lang === 'ar' ? '✓ مونتاج فوري' : '✓ Same-Day Edit'}
                    </span>
                  )}
                  {includePrintBooth && (
                    <span className="text-[10px] bg-neutral-800 text-amber-300 px-2 py-0.5 rounded">
                      {lang === 'ar' ? '✓ استديو طباعة فورية' : '✓ Photo Booth'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Price Total Hero */}
            <div className="py-4 my-2 border-y border-neutral-800 bg-neutral-950/60 rounded-xl p-4 text-center">
              <span className="text-[11px] text-neutral-400 block mb-1">
                {lang === 'ar' ? 'التكلفة الإجمالية التقديرية' : 'Estimated Total Investment'}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold gold-gradient-text font-serif">
                {totalCalculatedBHD}{' '}
                <span className="text-base font-sans font-bold text-amber-400">
                  {lang === 'ar' ? 'دينار بحريني (د.ب)' : 'BHD'}
                </span>
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                {lang === 'ar' ? `يعادل تقريباً ${totalCalculatedSAR} ريال سعودي (SAR)` : `Approx. ${totalCalculatedSAR} SAR`}
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5 mt-4">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إرسال العرض وحجز الموعد عبر واتساب' : 'Send Quote via WhatsApp'}</span>
              </a>

              <button
                onClick={() => {
                  setBookingConfirmed(true);
                  setTimeout(() => setBookingConfirmed(false), 5000);
                }}
                className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'ar' ? 'حفظ مسوّدة العرض في ملفك' : 'Save Quote Draft'}</span>
              </button>
            </div>

            {bookingConfirmed && (
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs text-center flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>
                  {lang === 'ar'
                    ? 'تم حفظ عرض السعر بنجاح! رقم المرجع: BRK-2026-918'
                    : 'Quote saved successfully! Reference: BRK-2026-918'}
                </span>
              </div>
            )}

            <div className="mt-4 pt-3 text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'ar' ? 'عقد موثق رسمي وضمان استرجاع العربون في حال الإلغاء' : 'Official contractual agreement & refundable deposit terms'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
