import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Building2, Shield, Calendar } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONTACT } from '../data/studioData';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'wedding',
    venue: '',
    date: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const bahrainVenues = [
    { ar: 'استديو بركات - ضاحية السيف', en: 'Barakat Studio - Seef District' },
    { ar: 'فندق الفورسيزونز خليج البحرين', en: 'Four Seasons Hotel Bahrain Bay' },
    { ar: 'فندق الريتز كارلتون - السيف', en: 'The Ritz-Carlton Bahrain' },
    { ar: 'فندق سوفيتل البحرين زلاق ثالاسا', en: 'Sofitel Bahrain Zallaq Thalassa' },
    { ar: 'قصر القضيبية / قاعة خاصة', en: 'Gudaibiya Palace / Private Ballroom' },
    { ar: 'قاعة أخرى في البحرين أو فيلا خاصة', en: 'Other Venue in Bahrain / Private Villa' },
  ];

  return (
    <section id="contact" className="py-20 bg-neutral-900/60 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <MapPin className="w-4 h-4" />
            <span>{lang === 'ar' ? 'موقعنا وتواصل معنا' : 'Visit & Inquire'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'ar' ? (
              <>
                يسعدنا لقاؤكم في <span className="gold-gradient-text font-serif">مقرنا بالبحرين</span>
              </>
            ) : (
              <>
                Visit Our Studio in <span className="gold-gradient-text font-serif">Seef, Bahrain</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'تفضلوا بزيارة الاستديو لاحتساء القهوة العربية والاطلاع على عينات الألبومات الإيطالية الطبيعية ومناقشة تفاصيل مناسبتكم.'
              : 'Join us at our Seef headquarters for Arabic Gahwa, view physical Italian album samples, and plan your special event.'}
          </p>
        </div>

        {/* Content Grid: Form (6 cols) & Studio Info / Map (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Booking Form (6 cols) */}
          <div className="lg:col-span-6 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>{lang === 'ar' ? 'طلب حجز موعد جلسة أو استشارة' : 'Book a Session / Consultation'}</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              {lang === 'ar'
                ? 'أرسل بياناتك وسيتم التواصل معك مباشرة لتأكيد الموعد وإرسال جدول التغطية'
                : 'Submit your inquiry and our team will get in touch directly to confirm schedule'}
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  {lang === 'ar' ? 'تم استلام طلبكم بنجاح' : 'Inquiry Received Successfully'}
                </h4>
                <p className="text-xs text-neutral-300">
                  {lang === 'ar'
                    ? `شكراً لك يا ${formData.name || 'عميلنا العزيز'}. سيقوم الأستاذ بركات وفريق الاستديو بالرد عليكم عبر الواتساب أو الهاتف خلال ساعات العمل.`
                    : `Thank you ${formData.name || 'valued client'}. Mr. Barakat and the team will contact you shortly via WhatsApp or call.`}
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/97339228410?text=${encodeURIComponent(
                      lang === 'ar'
                        ? `السلام عليكم، لقد قمت بتقديم طلب حجز باسم ${formData.name} لتاريخ ${formData.date} في ${formData.venue}`
                        : `Hello, I submitted an inquiry under ${formData.name} for date ${formData.date} at ${formData.venue}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'متابعة عبر واتساب مباشرة' : 'Follow up via WhatsApp'}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">
                    {lang === 'ar' ? 'الاسم الكامل أو اسم العائلة' : 'Full Name / Family Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'مثال: محمد عبد العزيز' : 'e.g. Mohammed Al Khalifa'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-300 mb-1">
                      {lang === 'ar' ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+973 39XX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-300 mb-1">
                      {lang === 'ar' ? 'نوع الخدمة المطلوبة' : 'Service Type'}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="wedding">{lang === 'ar' ? 'تصوير أعراس ملكية وفخمة' : 'Royal Wedding Coverage'}</option>
                      <option value="portrait">{lang === 'ar' ? 'جلسة بورتريه شخصي بالاستديو' : 'Studio Portrait Session'}</option>
                      <option value="commercial">{lang === 'ar' ? 'إنتاج إعلاني وتجاري للشركات' : 'Commercial Brand Campaign'}</option>
                      <option value="product">{lang === 'ar' ? 'تصوير عطور ومجوهرات وماكرو' : 'Oud & High Jewelry Macro'}</option>
                      <option value="drone">{lang === 'ar' ? 'تصوير جوي مرخص بالدرون' : 'Licensed Aerial Drone'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-300 mb-1">
                      {lang === 'ar' ? 'مكان المناسبة في البحرين' : 'Venue in Bahrain'}
                    </label>
                    <select
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="">{lang === 'ar' ? 'اختر المكان...' : 'Select venue...'}</option>
                      {bahrainVenues.map((v, i) => (
                        <option key={i} value={v.en}>
                          {lang === 'ar' ? v.ar : v.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-300 mb-1">
                      {lang === 'ar' ? 'التاريخ المفضل' : 'Preferred Date'}
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-300 mb-1">
                    {lang === 'ar' ? 'تفاصيل إضافية أو متطلبات خاصة' : 'Additional Notes / Requests'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={lang === 'ar' ? 'اذكر أي تفاصيل خاصة (طاقم نسائي، لقطات خاصة، ساعات محددة...)' : 'Any special requests (female crew, specific timings...)'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إرسال طلب الحجز' : 'Submit Reservation Request'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Studio Info & Bahrain Location Card (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Contact Details Card */}
            <div className="bg-neutral-950 p-6 sm:p-7 rounded-2xl border border-neutral-800 shadow-xl space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {lang === 'ar' ? STUDIO_CONTACT.nameAr : STUDIO_CONTACT.nameEn}
                  </h4>
                  <div className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'ar' ? STUDIO_CONTACT.crNumber : 'Licensed Commercial Entity (Bahrain CR)'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">
                      {lang === 'ar' ? 'العنوان والمقر' : 'Studio Address'}
                    </span>
                    <span className="text-neutral-400 leading-relaxed">
                      {lang === 'ar' ? STUDIO_CONTACT.locationAr : STUDIO_CONTACT.locationEn}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">
                      {lang === 'ar' ? 'البريد الإلكتروني الرسمي' : 'Official Email'}
                    </span>
                    <a
                      href={`mailto:${STUDIO_CONTACT.email}`}
                      className="text-amber-400 hover:underline"
                    >
                      {STUDIO_CONTACT.email}
                    </a>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">
                      {lang === 'ar' ? 'الهاتف والواتساب المباشر' : 'Phone & Direct WhatsApp'}
                    </span>
                    <div className="space-y-1 text-neutral-300 font-mono" dir="ltr">
                      <div>الهاتف: {STUDIO_CONTACT.phone}</div>
                      <div>واتساب: {STUDIO_CONTACT.whatsapp}</div>
                    </div>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">
                      {lang === 'ar' ? 'ساعات العمل واستقبال العملاء' : 'Studio Hours'}
                    </span>
                    <span className="text-neutral-400">
                      {lang === 'ar' ? STUDIO_CONTACT.workingHoursAr : STUDIO_CONTACT.workingHoursEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Bahrain Map Widget */}
            <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
              <div className="p-3.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'ar' ? 'خريطة مواقع التصوير المعتمدة - البحرين' : 'Authorized Bahrain Studio & Venues'}</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {lang === 'ar' ? 'مفتوح للحجوزات' : 'Open for bookings'}
                </span>
              </div>

              {/* Bahrain Stylized Map Graphic */}
              <div className="relative aspect-[16/9] bg-neutral-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ca8a04_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Visual landmark pin cards */}
                <div className="relative z-10 w-full h-full flex flex-col justify-around p-4 text-xs">
                  {/* Seef Studio Marker */}
                  <div className="self-start bg-neutral-950/95 border border-amber-500/60 rounded-xl p-2.5 shadow-xl flex items-center gap-2 max-w-xs animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="w-6 h-6 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-xs">
                      ★
                    </div>
                    <div>
                      <div className="font-bold text-white text-[11px]">
                        {lang === 'ar' ? 'استديو بركات (المقر الرئيسي)' : 'Barakat Studio HQ'}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {lang === 'ar' ? 'ضاحية السيف - برج السيف' : 'Seef District Tower'}
                      </div>
                    </div>
                  </div>

                  {/* Bahrain Bay Marker */}
                  <div className="self-end bg-neutral-950/90 border border-neutral-800 rounded-xl p-2 shadow-lg flex items-center gap-2 max-w-xs">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div>
                      <div className="font-bold text-white text-[10px]">
                        {lang === 'ar' ? 'فندق الفورسيزونز خليج البحرين' : 'Four Seasons Bahrain Bay'}
                      </div>
                      <div className="text-[9px] text-neutral-400">
                        {lang === 'ar' ? 'قاعة المنامة للاحتفالات' : 'Manama Ballroom'}
                      </div>
                    </div>
                  </div>

                  {/* Ritz Carlton Marker */}
                  <div className="self-center bg-neutral-950/90 border border-neutral-800 rounded-xl p-2 shadow-lg flex items-center gap-2 max-w-xs">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div>
                      <div className="font-bold text-white text-[10px]">
                        {lang === 'ar' ? 'فندق الريتز كارلتون' : 'The Ritz-Carlton Bahrain'}
                      </div>
                      <div className="text-[9px] text-neutral-400">
                        {lang === 'ar' ? 'قاعة الغزال للمناسبات الفاخرة' : 'Al Ghazal Ballroom'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
