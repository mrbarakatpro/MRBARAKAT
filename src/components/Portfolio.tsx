import React, { useState } from 'react';
import { Camera, MapPin, Eye, Sliders, Maximize2, X, ChevronRight, ChevronLeft, Sparkles, CheckCircle } from 'lucide-react';
import { PortfolioItem, Language } from '../types';
import { PORTFOLIO_ITEMS } from '../data/studioData';

interface PortfolioProps {
  lang: Language;
  onSelectSession: (categoryName: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ lang, onSelectSession }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [showColorGradeComparison, setShowColorGradeComparison] = useState(false);
  const [colorGradeSlider, setColorGradeSlider] = useState(50);

  const categories = [
    { id: 'all', labelAr: 'كافة الأعمال', labelEn: 'All Works' },
    { id: 'weddings', labelAr: 'أعراس ومناسبات ملكية', labelEn: 'Royal Weddings' },
    { id: 'portraits', labelAr: 'بورتريه وشخصيات VIP', labelEn: 'Fine Art Portraits' },
    { id: 'commercial', labelAr: 'إعلانات وعطور ومجوهرات', labelEn: 'Commercial & Jewelry' },
    { id: 'aerial', labelAr: 'سينما جوية ودرونز', labelEn: 'Aerial & Landscapes' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (item: PortfolioItem) => {
    setSelectedItem(item);
    setShowColorGradeComparison(false);
    setColorGradeSlider(50);
  };

  return (
    <section id="portfolio" className="py-20 bg-neutral-950 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Camera className="w-4 h-4" />
            <span>{lang === 'ar' ? 'معرض الأعمال المختار' : 'Curated Master Portfolio'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'ar' ? (
              <>
                إبداعات عدستنا في <span className="gold-gradient-text font-serif">مملكة البحرين</span>
              </>
            ) : (
              <>
                Visual Artistry Captured Across <span className="gold-gradient-text font-serif">Kingdom of Bahrain</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'تصفح نخبة من أعمالنا في تصوير الأعراس الفاخرة، البورتريه الراقي، الحملات الإعلانية لكبرى دور العود والمجوهرات، واللقطات الجوية المرخصة.'
              : 'Explore our signature works spanning grand Bahraini ballrooms, executive portraiture, commercial campaigns for high-end perfumers, and licensed aerial films.'}
          </p>

          {/* Interactive Filter Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-neutral-900/90 rounded-2xl border border-neutral-800 max-w-2xl mx-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  {lang === 'ar' ? cat.labelAr : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer flex flex-col"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
                <img
                  src={item.image}
                  alt={lang === 'ar' ? item.title.ar : item.title.en}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Badge: Category */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-neutral-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {lang === 'ar' ? item.categoryLabel.ar : item.categoryLabel.en}
                  </span>
                </div>

                {/* Inspect Overlay Trigger */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <span className="px-4 py-2 rounded-xl bg-neutral-950/90 text-amber-400 border border-amber-500/40 text-xs font-bold flex items-center gap-2 shadow-xl backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'عرض التفاصيل والعدسات' : 'Inspect Gear & Retouching'}</span>
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-500/90 mb-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? item.location.ar : item.location.en}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {lang === 'ar' ? item.title.ar : item.title.en}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {lang === 'ar' ? item.description.ar : item.description.en}
                  </p>
                </div>

                {/* Gear teaser */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="truncate max-w-[200px] font-mono text-neutral-400">
                    {item.gear.camera}
                  </span>
                  <span className="text-amber-400/80 font-medium hover:underline flex items-center gap-1">
                    <span>{lang === 'ar' ? 'التفاصيل' : 'Details'}</span>
                    <ChevronLeft className="w-3 h-3 rtl:rotate-0 ltr:rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox & Gear/Color Grade Inspector Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-950">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
                  {lang === 'ar' ? selectedItem.title.ar : selectedItem.title.en}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left/Center Visual Canvas */}
              <div className="lg:col-span-8 bg-neutral-950 relative flex flex-col items-center justify-center p-2 sm:p-4 min-h-[380px]">
                <div className="relative w-full max-h-[65vh] flex items-center justify-center overflow-hidden rounded-xl">
                  {/* Photo Display with optional Color Grade toggle */}
                  <img
                    src={selectedItem.image}
                    alt={lang === 'ar' ? selectedItem.title.ar : selectedItem.title.en}
                    className={`max-w-full max-h-[60vh] object-contain rounded-lg transition-all duration-300 ${
                      showColorGradeComparison
                        ? 'contrast-90 saturate-70 brightness-95 sepia-[0.15]' // Simulated flat RAW profile
                        : 'contrast-105 saturate-105' // Studio Master Grade
                    }`}
                  />

                  {/* Watermark badge */}
                  <div className="absolute bottom-3 right-3 bg-neutral-950/80 border border-neutral-800 rounded px-2 py-0.5 text-[10px] text-neutral-400 font-mono">
                    BARAKAT STUDIO © BAHRAIN
                  </div>
                </div>

                {/* Interactive Retouch / Color Grade Switcher */}
                <div className="mt-3 w-full flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span>
                      {lang === 'ar'
                        ? 'مقارنة تلوين الصورة (RAW مقابل النتيجة النهائية)'
                        : 'Color Grade & Retouch Toggle (RAW vs Studio Master)'}
                    </span>
                  </div>

                  <button
                    onClick={() => setShowColorGradeComparison(!showColorGradeComparison)}
                    className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                      showColorGradeComparison
                        ? 'bg-neutral-700 text-white'
                        : 'bg-amber-500 text-neutral-950 shadow'
                    }`}
                  >
                    {showColorGradeComparison
                      ? lang === 'ar' ? 'عرض النتيجة النهائية المعالجة' : 'View Master Grade'
                      : lang === 'ar' ? 'معاينة لقطة الكاميرا RAW' : 'Simulate RAW Capture'}
                  </button>
                </div>
              </div>

              {/* Right Sidebar: EXIF, Production Gear & Location */}
              <div className="lg:col-span-4 p-5 sm:p-6 bg-neutral-900/95 border-t lg:border-t-0 lg:border-r border-neutral-800 flex flex-col justify-between">
                <div className="space-y-5">
                  {/* Location & Client */}
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      {lang === 'ar' ? 'موقع التصوير والعميل' : 'Location & Client'}
                    </span>
                    <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-white">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{lang === 'ar' ? selectedItem.location.ar : selectedItem.location.en}</span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {lang === 'ar' ? selectedItem.client.ar : selectedItem.client.en}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
                    {lang === 'ar' ? selectedItem.description.ar : selectedItem.description.en}
                  </div>

                  {/* Gear Specifications Box */}
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-amber-500/20 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Camera className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'مواصفات الكاميرا والإضاءة' : 'Production Gear & EXIF'}</span>
                    </div>

                    <div className="text-xs space-y-1.5 text-neutral-300">
                      <div className="flex justify-between border-b border-neutral-800/80 pb-1">
                        <span className="text-neutral-500">{lang === 'ar' ? 'الكاميرا:' : 'Camera:'}</span>
                        <span className="font-mono text-white text-right">{selectedItem.gear.camera}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-800/80 pb-1">
                        <span className="text-neutral-500">{lang === 'ar' ? 'العدسة:' : 'Lens:'}</span>
                        <span className="font-mono text-white text-right">{selectedItem.gear.lens}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-800/80 pb-1">
                        <span className="text-neutral-500">{lang === 'ar' ? 'الإضاءة:' : 'Lighting:'}</span>
                        <span className="font-mono text-amber-300 text-right">{selectedItem.gear.lighting}</span>
                      </div>
                      <div className="flex justify-between pt-0.5">
                        <span className="text-neutral-500">{lang === 'ar' ? 'الإعدادات:' : 'Settings:'}</span>
                        <span className="font-mono text-neutral-400 text-right">{selectedItem.gear.settings}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inquire Action Button */}
                <div className="mt-6 pt-4 border-t border-neutral-800">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      onSelectSession(selectedItem.category);
                    }}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'طلب جلسة بنفس هذا الأسلوب' : 'Request Similar Session'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
