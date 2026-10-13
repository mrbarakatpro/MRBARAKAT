import React from 'react';
import {
  Utensils,
  Calendar,
  Compass,
  Globe,
  ShoppingBag,
} from 'lucide-react';
import { useFrisca } from '../context/FriscaContext';
import { FriscaLogo } from './FriscaLogo';

interface FriscaHeaderProps {
  currentPage: 'home' | 'menu';
  onNavigateToHome: () => void;
  onNavigateToMenu: () => void;
  onOpenBookingModal: () => void;
  onOpenDashboard?: () => void;
}

export const FriscaHeader: React.FC<FriscaHeaderProps> = ({
  currentPage,
  onNavigateToHome,
  onNavigateToMenu,
  onOpenBookingModal,
  onOpenDashboard,
}) => {
  const {
    lang,
    toggleLang,
    t,
    cartCount,
    setIsCartOpen,
  } = useFrisca();

  const isAr = lang === 'ar';

  return (
    <div className="w-full bg-[#1b0609] border-b border-[#3b0f15]/50 sticky top-0 z-50 shadow-xl">
      {/* Main Navbar */}
      <div className="py-2 sm:py-3 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToHome();
            }}
            className="flex items-center gap-1 sm:gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-extrabold text-base sm:text-2xl tracking-wider text-white font-serif leading-none">
                FRISCA
              </span>
              <FriscaLogo size={22} className="sm:hidden" />
              <FriscaLogo size={28} className="hidden sm:flex" />
            </div>
            <span className="text-[10px] text-[#e0b4b8] hidden xl:block border-r border-l border-[#3b0f15] px-2.5 mx-1">
              {t.tagline}
            </span>
          </a>

          {/* Navigation Links in Center */}
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold shrink-0">
            {/* Home Link - Hidden on Home page (مخفي في الصفحة الرئيسية) */}
            {currentPage !== 'home' && (
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToHome();
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors cursor-pointer text-xs sm:text-sm whitespace-nowrap text-[#e0b4b8] hover:text-white bg-[#26070c]/60 border border-[#481119]/80 hover:bg-[#330c12] hover:border-[#5c1620]"
              >
                <Compass className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                <span>{t.nav.home}</span>
              </a>
            )}

            {/* Food Menu Button - Hidden when on the Menu page (في المنيو) */}
            {currentPage !== 'menu' && (
              <a
                href="/Menu"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToMenu();
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors cursor-pointer text-xs sm:text-sm whitespace-nowrap text-[#e0b4b8] hover:text-white"
              >
                <Utensils className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                <span>{t.nav.menu}</span>
              </a>
            )}
          </nav>

          {/* Action Buttons: Cart Drawer + Book Table + Language Toggle */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#330c12] hover:bg-[#4a1017] border border-[#5c1620] hover:border-[#d4a373]/60 text-white flex items-center gap-1.5 cursor-pointer transition-all shadow-md active:scale-95"
              title={t.nav.cart}
            >
              <ShoppingBag className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4a373]" />
              <span className="text-xs font-bold hidden md:inline">{t.nav.cart}</span>
              {cartCount > 0 && (
                <span className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-[#782229] border border-[#9b2c35] text-white text-[10px] sm:text-[11px] font-black flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Table Button */}
            <button
              onClick={onOpenBookingModal}
              className="p-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white hover:bg-neutral-100 text-[#1a0508] font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              title={t.nav.bookTable}
            >
              <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#782229]" />
              <span className="hidden sm:inline">{t.nav.bookTable}</span>
            </button>

            {/* Language Switcher Toggle */}
            <button
              onClick={toggleLang}
              className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-[#2b0c10] border border-[#52131b] hover:border-[#d4a373] text-white hover:text-[#d4a373] text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
              title={isAr ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#d4a373]" />
              <span className="hidden sm:inline">{isAr ? 'English' : 'العربية'}</span>
              <span className="sm:hidden">{isAr ? 'EN' : 'عربي'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
