import React, { useState } from 'react';
import { X, Calendar, Phone, Check, Send, Sparkles, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONTACT, STUDIO_PACKAGES } from '../data/studioData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preselectedPackage?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  preselectedPackage,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedPkg, setSelectedPkg] = useState(preselectedPackage || 'pkg-royal-wedding');
  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('Seef Studio');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const pkgName = STUDIO_PACKAGES.find((p) => p.id === selectedPkg)?.name[lang] || selectedPkg;
    const msg =
      lang === 'ar'
        ? `السلام عليكم أستاذ بركات، أود حجز موعد جلسة تصوير في استديو بركات بالبحرين:
• الباقة: ${pkgName}
• الاسم: ${clientName}
• التاريخ: ${eventDate || 'قريباً'}
• المكان: ${venue}
• ملاحظات: ${specialRequests || 'لا توجد'}`
        : `Hello Mr. Barakat, I would like to book a session at Barakat Studio Bahrain:
• Package: ${pkgName}
• Client: ${clientName}
• Date: ${eventDate || 'Upcoming'}
• Venue: ${venue}
• Notes: ${specialRequests || 'None'}`;

    return `https://wa.me/97339228410?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {lang === 'ar' ? 'حجز موعد جلسة في استديو بركات' : 'Book a Session with Barakat Studio'}
              </h3>
              <span className="text-[11px] text-neutral-400">
                {lang === 'ar' ? 'مملكة البحرين - ضاحية السيف' : 'Kingdom of Bahrain - Seef District'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <h4 className="text-lg font-bold text-white">
                {lang === 'ar' ? 'تم تأكيد طلب الحجز بنجاح!' : 'Reservation Requested Successfully!'}
              </h4>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                {lang === 'ar'
                  ? `أهلاً بك يا ${clientName}. تم تسجيل حجزك برقم مرجعي #BRK-2026. سيتواصل معك فريق الاستديو مباشرة لتأكيد التفاصيل النهائية.`
                  : `Welcome ${clientName}. Your reservation request is logged under ref #BRK-2026. Our team will contact you directly.`}
              </p>

              <div className="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إرسال التفاصيل مباشرة عبر واتساب' : 'Send via WhatsApp Now'}</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-700 cursor-pointer"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Package selector */}
              <div>
                <label className="block font-bold text-neutral-300 mb-1.5">
                  {lang === 'ar' ? 'الباقة أو الخدمة المطلوبة' : 'Choose Package or Session'}
                </label>
                <select
                  value={selectedPkg}
                  onChange={(e) => setSelectedPkg(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 cursor-pointer text-xs"
                >
                  {STUDIO_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name[lang]} ({pkg.basePriceBHD} {lang === 'ar' ? 'د.ب' : 'BHD'})
                    </option>
                  ))}
                  <option value="custom">{lang === 'ar' ? 'باقة مخصصة أخرى / استشارة' : 'Custom Tailored Package'}</option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">
                    {lang === 'ar' ? 'الاسم الكريم' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'مثال: عبد العزيز' : 'e.g. Abdulaziz'}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">
                    {lang === 'ar' ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+973 39XX XXXX"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Date & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">
                    {lang === 'ar' ? 'تاريخ الجلسة أو المناسبة' : 'Session Date'} *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">
                    {lang === 'ar' ? 'الموقع المطلوب' : 'Location in Bahrain'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'ar' ? 'استديو السيف / فندق الفورسيزونز...' : 'Seef Studio / Hotel...'}
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-bold text-neutral-300 mb-1">
                  {lang === 'ar' ? 'ملاحظات أو رغبات خاصة (طاقم نسائي، لقطات خاصة...)' : 'Special Requests (Ladies crew, etc.)'}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === 'ar' ? 'نحتاج طاقماً نسائياً كاملاً، وألبومين إضافيين للوالدين...' : 'Need private ladies crew...'}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Security info */}
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800 text-[11px] text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'ar'
                    ? 'خصوصية تامة وسرية مطلقة لكافة الصور والمقاطع، وحفظها على خوادم مشفرة.'
                    : 'Absolute privacy and confidentiality for all private photographs and footage.'}
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  {lang === 'ar' ? 'تأكيد إرسال الطلب' : 'Confirm Reservation'}
                </button>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
