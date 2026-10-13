import React from 'react';
import { Utensils, Calendar } from 'lucide-react';
import { useFrisca } from '../context/FriscaContext';
import { FRISCA_IMAGES } from '../data/friscaData';

interface FriscaHeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const FriscaHero: React.FC<FriscaHeroProps> = ({ onExploreMenu, onBookTable }) => {
  const { lang, t, siteTexts } = useFrisca();
  const isAr = lang === 'ar';

  const heroImageSrc = siteTexts.hero.image || FRISCA_IMAGES.hero;
  const heroOpacity = typeof siteTexts.hero.opacity === 'number' ? siteTexts.hero.opacity : 50;

  const kicker = isAr ? siteTexts.hero.kicker : t.hero.kicker;
  const titleLine1 = isAr ? siteTexts.hero.titleLine1 : t.hero.titleLine1;
  const titleLine2 = isAr ? siteTexts.hero.titleLine2 : t.hero.titleLine2;
  const subtitle = isAr ? siteTexts.hero.subtitle : t.hero.subtitle;
  const exploreMenuBtn = isAr ? siteTexts.hero.exploreMenuBtn : t.hero.exploreMenuBtn;
  const bookTableBtn = isAr ? siteTexts.hero.bookTableBtn : t.hero.bookTableBtn;

  const stats = isAr
    ? siteTexts.stats
    : [
        { value: '15+', label: t.hero.stats.awards },
        { value: '100K+', label: t.hero.stats.guests },
        { value: '100%', label: t.hero.stats.ingredients },
        { value: 'VIP', label: t.hero.stats.vip },
      ];

  return (
    <section className="relative bg-[#1a0508] text-white pt-16 pb-12 overflow-hidden border-b border-[#3b0f15]/40">
      {/* Background image at exactly 50% opacity (as requested) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={heroImageSrc}
          alt="Frisca Dining Background"
          className="w-full h-full object-cover object-center"
          style={{ opacity: heroOpacity / 100 }}
        />
        {/* Soft atmospheric overlay preserving 50% image transparency while ensuring crisp typography */}
        <div className="absolute inset-0 bg-[#1a0508]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0508] via-transparent to-[#1a0508]/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Kicker Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2a080e]/90 border border-[#52131b] text-[#e0b4b8] text-xs font-bold mb-6 backdrop-blur-sm shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373]" />
          <span>{kicker}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif drop-shadow-md break-words px-2">
          <div>{titleLine1}</div>
          <div className="mt-1.5 sm:mt-2 text-white">{titleLine2}</div>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm lg:text-base text-[#e0b4b8] max-w-2xl mx-auto leading-relaxed drop-shadow px-2">
          {subtitle}
        </p>

        {/* The Two Hero Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-sm sm:max-w-none mx-auto px-2">
          {/* Button 1: استكشف قائمة الطعام / Explore Menu (White Pill with icon) */}
          <a
            href="/Menu"
            onClick={(e) => {
              e.preventDefault();
              onExploreMenu();
            }}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-neutral-100 text-[#1a0508] font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
          >
            <Utensils className="w-4 h-4 text-[#782229] shrink-0" />
            <span>{exploreMenuBtn}</span>
          </a>

          {/* Button 2: حجز طاولة خاصة / Book Table (Burgundy Pill with icon) */}
          <button
            onClick={onBookTable}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#4a1017] hover:bg-[#5e141d] text-white border border-[#782229] font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
          >
            <Calendar className="w-4 h-4 text-[#d4a373] shrink-0" />
            <span>{bookTableBtn}</span>
          </button>
        </div>

        {/* 4 Stat Cards in a row */}
        <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#26070c]/90 border border-[#481119] flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-sm"
            >
              <span className="text-xl sm:text-3xl font-extrabold text-white font-serif">
                {stat.value}
              </span>
              <span className="mt-1 text-[10px] sm:text-[11px] text-[#e0b4b8] font-medium leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
