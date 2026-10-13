import React from 'react';
import { MapPin, Phone, Mail, Instagram, Twitter, Youtube, ArrowUp, MessageCircle } from 'lucide-react';
import { useFrisca } from '../context/FriscaContext';
import { FriscaLogo } from './FriscaLogo';

interface FriscaFooterProps {
  onNavigateToHome: () => void;
  onNavigateToMenu: () => void;
  onOpenBookingModal: () => void;
  onOpenDashboard?: () => void;
}

export const FriscaFooter: React.FC<FriscaFooterProps> = ({
  onNavigateToHome,
  onNavigateToMenu,
  onOpenBookingModal,
  onOpenDashboard,
}) => {
  const { lang, t, siteTexts } = useFrisca();
  const isAr = lang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const brandDesc = isAr ? siteTexts.footer.brandDesc : t.footer.brandDesc;
  const copyright = isAr ? siteTexts.footer.copyright : t.footer.copyright;
  const location = isAr ? siteTexts.topBar.location : t.footer.location;

  return (
    <footer id="contact" className="bg-[#170407] text-[#e0b4b8] border-t border-[#3b0f15]/50 text-xs py-14 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#3b0f15]/40">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-wider text-white font-serif">
                FRISCA
              </span>
              <FriscaLogo size={24} />
            </div>
            <p className="text-xs text-[#e0b4b8] leading-relaxed">
              {brandDesc}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateToHome();
                  }}
                  className="hover:text-white transition-colors cursor-pointer block"
                >
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="/Menu"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateToMenu();
                  }}
                  className="hover:text-white transition-colors cursor-pointer block"
                >
                  {t.nav.menu}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBookingModal}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.bookTable}
                </button>
              </li>
              {onOpenDashboard && (
                <li>
                  <a
                    href="/dashboard"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenDashboard();
                    }}
                    className="text-[#d4a373] hover:text-white transition-colors cursor-pointer font-bold block"
                  >
                    {t.topBar.dashboard} ↗
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs">{t.footer.contactInfo}</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 justify-start">
                <MapPin className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                <span>{location}</span>
              </li>
              <li className="flex items-center gap-2 justify-start">
                <Phone className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                <a href={`tel:${siteTexts.topBar.phone}`} className="hover:text-white font-mono" dir="ltr">
                  {siteTexts.topBar.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 justify-start">
                <Mail className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                <a href={`mailto:${siteTexts.topBar.email}`} className="hover:text-white">
                  {siteTexts.topBar.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs">
              {isAr ? 'وسائل التواصل' : 'Social Channels'}
            </h4>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#3d0d14] border border-[#5c1620] hover:bg-[#52131b] text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#3d0d14] border border-[#5c1620] hover:bg-[#52131b] text-white flex items-center justify-center transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#3d0d14] border border-[#5c1620] hover:bg-[#52131b] text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-center gap-3 text-[11px] text-white/50">
          <div>{copyright}</div>
          <div className="text-[#d4a373]/80">
            {isAr ? 'اللون النبيتي الفاخر · مملكة البحرين' : 'Luxury Imperial Burgundy · Kingdom of Bahrain'}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <aside aria-label="Floating Controls" className={`fixed bottom-4 sm:bottom-6 ${isAr ? 'left-3 sm:left-6' : 'right-3 sm:right-6'} z-30 flex flex-col gap-2`}>
        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-[#3d0d14] border border-[#6b1823] hover:bg-[#52131b] text-white flex items-center justify-center shadow-xl cursor-pointer transition-colors"
          title={isAr ? 'للأعلى' : 'Scroll to top'}
        >
          <ArrowUp className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        </button>

        {/* WhatsApp Green Button */}
        <a
          href={`https://wa.me/97339228410?text=${encodeURIComponent(
            isAr
              ? 'مرحباً مطعم فريسكا البحرين، أود حجز طاولة أو الاستفسار عن المنيو'
              : 'Hello Frisca Restaurant Bahrain, I would like to reserve a table or inquire about the menu'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl transition-transform hover:scale-105"
          title={isAr ? 'واتساب مباشر' : 'Direct WhatsApp'}
        >
          <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
        </a>
      </aside>
    </footer>
  );
};
