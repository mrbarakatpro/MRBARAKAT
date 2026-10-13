import React from 'react';
import { Waves, Crown, MapPin, Sparkles, Calendar, Utensils } from 'lucide-react';
import { useFrisca } from '../context/FriscaContext';
import { FRISCA_IMAGES } from '../data/friscaData';

interface FriscaIdentityProps {
  onOpenBookingModal?: (dishOrHall?: string) => void;
}

export const FriscaIdentity: React.FC<FriscaIdentityProps> = ({ onOpenBookingModal }) => {
  const { lang, t, siteTexts } = useFrisca();
  const isAr = lang === 'ar';
  const identityImageSrc = siteTexts.identity.image || FRISCA_IMAGES.seefHall || FRISCA_IMAGES.hero;

  const kicker = isAr ? siteTexts.identity.kicker : t.identity.kicker;
  const title = isAr ? siteTexts.identity.title : t.identity.title;
  const locationBadge = isAr ? 'مملكة البحرين · ضاحية السيف' : t.identity.locationBadge;
  const paragraph1 = isAr ? siteTexts.identity.paragraph1 : t.identity.paragraph1;
  const paragraph2 = isAr ? siteTexts.identity.paragraph2 : t.identity.paragraph2;

  const card1Title = isAr ? siteTexts.identity.card1.title : t.identity.coastalViewTitle;
  const card1Desc = isAr ? siteTexts.identity.card1.desc : t.identity.coastalViewDesc;
  const card2Title = isAr ? siteTexts.identity.card2.title : t.identity.royalServiceTitle;
  const card2Desc = isAr ? siteTexts.identity.card2.desc : t.identity.royalServiceDesc;

  const seefHallTitle = isAr
    ? siteTexts.identity.imageCaptionTitle || 'المجلس الرئيسي - فرع السيف'
    : t.identity.seefHallTitle;
  const seefHallSub = isAr
    ? siteTexts.identity.imageCaptionSub || 'أجواء ساحرة وتصاميم مريحة'
    : t.identity.seefHallSub;

  return (
    <section id="identity" className="py-16 sm:py-20 bg-[#1b0609] text-white border-b border-[#3b0f15]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* 1. هوية فريسكا (The Frisca Identity Header & Story) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3b0f15]/50 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a080e] border border-[#52131b] text-[#e0b4b8] text-xs font-bold mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373]" />
                <span>{kicker}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug font-serif">
                {title}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#d4a373] bg-[#26070c] px-3.5 py-1.5 rounded-xl border border-[#481119] self-start sm:self-auto">
              <Sparkles className="w-4 h-4 text-[#d4a373]" />
              <span>{locationBadge}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#e0b4b8] leading-relaxed">
            <p className="bg-[#22060b]/60 p-4 rounded-xl border border-[#3b0f15]/40">
              {paragraph1}
            </p>
            <p className="bg-[#22060b]/60 p-4 rounded-xl border border-[#3b0f15]/40">
              {paragraph2}
            </p>
          </div>

          {/* The two identity highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Card 1: إطلالة البحرية الساحرة */}
            <div className="p-4 rounded-xl bg-[#28080e] border border-[#481119] flex items-center justify-between gap-3 shadow-md hover:border-[#6e1a26] transition-colors">
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {card1Title}
                </h4>
                <p className="text-[11px] text-[#e0b4b8]">
                  {card1Desc}
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#3d0d14] flex items-center justify-center shrink-0 border border-[#5c1620]">
                <Waves className="w-4 h-4 text-[#d4a373]" />
              </div>
            </div>

            {/* Card 2: خدمة ضيافة ملكية */}
            <div className="p-4 rounded-xl bg-[#28080e] border border-[#481119] flex items-center justify-between gap-3 shadow-md hover:border-[#6e1a26] transition-colors">
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {card2Title}
                </h4>
                <p className="text-[11px] text-[#e0b4b8]">
                  {card2Desc}
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#3d0d14] flex items-center justify-center shrink-0 border border-[#5c1620]">
                <Crown className="w-4 h-4 text-[#d4a373]" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. المجلس الرئيسي - فرع السيف (المعرض المصغر الأنيق المتناسق) */}
        <div className="pt-2">
          <div className="bg-[#24070c] rounded-3xl border border-[#481119] p-5 sm:p-7 shadow-2xl relative overflow-hidden">
            {/* Top Bar of the Showcase */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-[#3b0f15] pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-[#d4a373] font-bold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t.identity.seefHallLocation}</span>
                </div>
                {/* Title */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-serif tracking-tight">
                  {seefHallTitle}
                </h3>
                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#e0b4b8] mt-1 font-medium">
                  {seefHallSub}
                </p>
              </div>

              {/* Quick Table Reservation Trigger */}
              {onOpenBookingModal && (
                <button
                  onClick={() => onOpenBookingModal(seefHallTitle)}
                  className="px-4 py-2 rounded-full bg-[#4a1017] hover:bg-[#60151e] text-white border border-[#782229] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all self-start sm:self-auto active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span>{t.identity.bookSeefHallBtn}</span>
                </button>
              )}
            </div>

            {/* Showcase Image Frame: Compact & elegant */}
            <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#481119] bg-[#1a0508] shadow-xl relative group">
              <div className="h-60 sm:h-72 md:h-80 w-full overflow-hidden relative">
                <img
                  src={identityImageSrc}
                  alt={seefHallTitle}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-75 group-hover:opacity-65 transition-opacity" />

                {/* Floating Overlay Badge in the bottom corner */}
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 left-2 sm:left-3 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl bg-[#1b0609]/95 backdrop-blur-md border border-[#3b0f15]/80 text-white">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-white truncate">
                        {seefHallTitle}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-[#e0b4b8] truncate">
                        {seefHallSub}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#d4a373] bg-[#2a080e] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-[#481119] shrink-0">
                    <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    <span>{t.identity.vipBadge}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 3 Features strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-4xl mx-auto mt-3 sm:mt-4 pt-2">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#1a0508]/60 border border-[#3b0f15]/50">
                <div className="w-7 h-7 rounded-lg bg-[#3d0d14] flex items-center justify-center shrink-0 text-[#d4a373]">
                  <Utensils className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">{t.identity.featureMenu}</span>
                  <span className="block text-[10px] text-[#e0b4b8]">{t.identity.featureMenuSub}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#1a0508]/60 border border-[#3b0f15]/50">
                <div className="w-7 h-7 rounded-lg bg-[#3d0d14] flex items-center justify-center shrink-0 text-[#d4a373]">
                  <Waves className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">{t.identity.featureView}</span>
                  <span className="block text-[10px] text-[#e0b4b8]">{t.identity.featureViewSub}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#1a0508]/60 border border-[#3b0f15]/50">
                <div className="w-7 h-7 rounded-lg bg-[#3d0d14] flex items-center justify-center shrink-0 text-[#d4a373]">
                  <Crown className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">{t.identity.featureService}</span>
                  <span className="block text-[10px] text-[#e0b4b8]">{t.identity.featureServiceSub}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
