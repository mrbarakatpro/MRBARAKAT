import React, { useState, useEffect } from 'react';
import { Camera, Phone, Calendar, Globe, Menu, X, ShieldCheck, MapPin, LayoutDashboard } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONTACT } from '../data/studioData';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenBookingModal: (preselectedPackage?: string) => void;
  onOpenDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenBookingModal,
  onOpenDashboard,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#portfolio', labelAr: 'معرض الأعمال', labelEn: 'Portfolio' },
    { href: '#services', labelAr: 'خدماتنا', labelEn: 'Services' },
    { href: '#calculator', labelAr: 'حاسبة الباقات', labelEn: 'Pricing Calculator' },
    { href: '#studio-tour', labelAr: 'مرافق الاستديو', labelEn: 'Studio Tour' },
    { href: '#client-portal', labelAr: 'بوابة العملاء', labelEn: 'Client Portal' },
    { href: '#contact', labelAr: 'الموقع والتواصل', labelEn: 'Contact' },
  ];

  return (
    <>
      {/* Top micro bar with Bahrain location and official email */}
      <div className="bg-neutral-900/90 border-b border-neutral-800 text-xs text-neutral-400 py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'ar' ? 'ضاحية السيف، المنامة - مملكة البحرين' : 'Seef District, Manama - Kingdom of Bahrain'}</span>
            </span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'ar' ? STUDIO_CONTACT.crNumber : 'Licensed Commercial Entity (CR: 104829-1)'}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Direct Admin Dashboard link in top bar */}
            <button
              onClick={onOpenDashboard}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'لوحة تحكم الاستديو' : 'Studio Dashboard'}</span>
            </button>
            <span className="text-neutral-600">|</span>
            <a
              href={`mailto:${STUDIO_CONTACT.email}`}
              className="hover:text-amber-400 transition-colors"
            >
              {STUDIO_CONTACT.email}
            </a>
            <span className="text-neutral-600">|</span>
            <a
              href={`tel:${STUDIO_CONTACT.phone}`}
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
              dir="ltr"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              {STUDIO_CONTACT.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-3'
            : 'bg-neutral-950/70 backdrop-blur-sm border-b border-neutral-800/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 p-0.5 shadow-lg shadow-amber-500/10 flex items-center justify-center">
              <div className="w-full h-full bg-neutral-950 rounded-[7px] flex items-center justify-center">
                <Camera className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-serif">
                  {lang === 'ar' ? 'استديو بركات' : 'BARAKAT STUDIO'}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {lang === 'ar' ? 'البحرين' : 'BAHRAIN'}
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 font-medium">
                {lang === 'ar' ? 'للتصوير والإنتاج السينمائي الفاخر' : 'Luxury Cinematography & Fine Photography'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-neutral-300 hover:text-amber-400 transition-colors py-1 relative group"
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-200" />
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dashboard shortcut button */}
            <button
              onClick={onOpenDashboard}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900 border border-amber-500/30 hover:border-amber-400 text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-amber-500/10"
              title={lang === 'ar' ? 'فتح لوحة تحكم الاستديو' : 'Open Admin Dashboard'}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title={lang === 'ar' ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Direct WhatsApp Button */}
            <a
              href={`https://wa.me/97339228410?text=${encodeURIComponent(
                lang === 'ar'
                  ? 'السلام عليكم، أود الاستفسار عن باقات وحجوزات استديو بركات في البحرين'
                  : 'Hello, I would like to inquire about Barakat Studio bookings in Bahrain'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 hover:bg-emerald-900/60 text-xs font-semibold transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}</span>
            </a>

            {/* Book Now Button */}
            <button
              onClick={() => onOpenBookingModal()}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'احجز جلستك' : 'Book Session'}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-950/98 border-b border-neutral-800 px-4 py-4 mt-2 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-850 text-neutral-200 hover:text-amber-400 transition-colors"
                >
                  {lang === 'ar' ? link.labelAr : link.labelEn}
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{lang === 'ar' ? 'فتح لوحة تحكم الاستديو' : 'Open Admin Dashboard'}</span>
            </button>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between gap-2">
              <a
                href={`https://wa.me/97339228410`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-semibold text-center"
              >
                {lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Us'}
              </a>
              <a
                href={`tel:${STUDIO_CONTACT.phone}`}
                className="flex-1 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold text-center"
              >
                {STUDIO_CONTACT.phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
