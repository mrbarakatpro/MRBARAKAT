import React from 'react';
import { Camera, ShieldCheck, Heart, MapPin, Phone, Mail, Instagram, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONTACT } from '../data/studioData';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <Camera className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="font-extrabold text-base text-white font-serif block">
                  {lang === 'ar' ? 'استديو بركات للتصوير والإنتاج السينمائي' : 'Barakat Studio & Film Production'}
                </span>
                <span className="text-[11px] text-amber-400 font-bold">
                  {lang === 'ar' ? 'مملكة البحرين - ضاحية السيف' : 'Kingdom of Bahrain - Seef District'}
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              {lang === 'ar'
                ? 'الوجهة الرائدة لتوثيق أرقى مناسبات وأعراس البحرين، وإنتاج الإعلانات السينمائية لكبرى الشركات والعلامات التجارية الخليجية.'
                : 'Bahrain’s signature production house for royal weddings, executive portraits, and high-impact commercial campaigns.'}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{STUDIO_CONTACT.crNumber}</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              {lang === 'ar' ? 'أقسام الموقع' : 'Navigation'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#portfolio" className="hover:text-amber-400 transition-colors">
                  {lang === 'ar' ? 'معرض الأعمال' : 'Master Portfolio'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  {lang === 'ar' ? 'خدمات التصوير' : 'Studio Services'}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  {lang === 'ar' ? 'حاسبة الباقات (د.ب)' : 'Estimate Calculator'}
                </a>
              </li>
              <li>
                <a href="#studio-tour" className="hover:text-amber-400 transition-colors">
                  {lang === 'ar' ? 'مرافق الاستديو' : 'Studio Spaces'}
                </a>
              </li>
              <li>
                <a href="#client-portal" className="hover:text-amber-400 transition-colors">
                  {lang === 'ar' ? 'بوابة العملاء' : 'Client Portal'}
                </a>
              </li>
            </ul>
          </div>

          {/* Services quick links */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              {lang === 'ar' ? 'التخصصات' : 'Specialties'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-amber-400 transition-colors">
                {lang === 'ar' ? 'تصوير الأعراس الملكية' : 'Royal Weddings'}
              </li>
              <li className="hover:text-amber-400 transition-colors">
                {lang === 'ar' ? 'البورتريه الشخصي VIP' : 'Executive Portraits'}
              </li>
              <li className="hover:text-amber-400 transition-colors">
                {lang === 'ar' ? 'إعلانات العطور والمجوهرات' : 'Oud & High Jewelry'}
              </li>
              <li className="hover:text-amber-400 transition-colors">
                {lang === 'ar' ? 'سينما الدرونز المرخصة' : 'Licensed Aerial Cinematography'}
              </li>
              <li className="hover:text-amber-400 transition-colors">
                {lang === 'ar' ? 'الألبومات الإيطالية الفاخرة' : 'Handmade Italian Albums'}
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              {lang === 'ar' ? 'التواصل المباشر' : 'Direct Contact'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <a href={`mailto:${STUDIO_CONTACT.email}`} className="hover:text-amber-400 truncate">
                  {STUDIO_CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span dir="ltr">{STUDIO_CONTACT.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{lang === 'ar' ? 'ضاحية السيف، المنامة' : 'Seef District, Manama'}</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-neutral-900">
              <a
                href="https://wa.me/97339228410"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-700/50 text-emerald-300 font-semibold text-[11px] hover:bg-emerald-900/60 transition-colors"
              >
                <span>{lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 {lang === 'ar' ? 'استديو بركات للتصوير والإنتاج السينمائي - مملكة البحرين. جميع الحقوق محفوظة.' : 'Barakat Studio & Film Production - Bahrain. All rights reserved.'}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-500">
              {lang === 'ar' ? 'بإشراف وإدارة الأستاذ بركات' : 'Managed & Directed by Mr. Barakat'}
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-white transition-colors cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
