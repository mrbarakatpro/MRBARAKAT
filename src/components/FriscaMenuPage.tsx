import React, { useState, useEffect } from 'react';
import { useFrisca } from '../context/FriscaContext';
import { FriscaMenuItem } from '../data/friscaData';
import {
  Search,
  ShoppingCart,
  Check,
  Eye,
  X,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { FriscaHeader } from './FriscaHeader';
import { FriscaFooter } from './FriscaFooter';

interface FriscaMenuPageProps {
  onBackToHome: () => void;
  onOpenBookingModal: (dishName?: string) => void;
  onOpenDashboard?: () => void;
}

export const FriscaMenuPage: React.FC<FriscaMenuPageProps> = ({
  onBackToHome,
  onOpenBookingModal,
  onOpenDashboard,
}) => {
  const {
    lang,
    t,
    categories: dynamicCategories,
    menuItems,
    addToCart,
    cartCount,
    cartTotal,
    setIsCartOpen,
    recordMenuVisit,
    recordDishView,
    recordCategoryView,
  } = useFrisca();

  const isAr = lang === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDishForModal, setSelectedDishForModal] = useState<FriscaMenuItem | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // Record menu pageview when menu page is viewed
  useEffect(() => {
    recordMenuVisit();
  }, []);

  // Listen for Escape key to close modal easily
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDishForModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dynamic category pills with 'all' prepended
  const categoriesList = [
    { id: 'all', label: t.menuPage.categories.all },
    ...dynamicCategories.map((cat) => ({
      id: cat.id,
      label: isAr ? cat.nameAr : cat.nameEn || cat.nameAr,
    })),
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const nameMatch = isAr
      ? item.nameAr.toLowerCase().includes(searchQuery.toLowerCase())
      : item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameAr.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch =
      item.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.descriptionEn && item.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && (nameMatch || descMatch);
  });

  const handleAddToCart = (dish: FriscaMenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(dish, 1);
    setAddedItemIds((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [dish.id]: false }));
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#1a0508] text-white flex flex-col font-sans">
      {/* Header */}
      <FriscaHeader
        currentPage="menu"
        onNavigateToHome={onBackToHome}
        onNavigateToMenu={() => {}}
        onOpenBookingModal={() => onOpenBookingModal()}
        onOpenDashboard={onOpenDashboard}
      />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            {t.menuPage.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#e0b4b8] max-w-xl mx-auto">
            {t.menuPage.subtitle}
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-md mx-auto">
            <div className="relative">
              <Search
                className={`w-4 h-4 text-neutral-400 absolute ${
                  isAr ? 'right-3.5' : 'left-3.5'
                } top-3`}
              />
              <input
                type="text"
                placeholder={t.menuPage.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-[#26070c] border border-[#481119] rounded-full ${
                  isAr ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                } py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a373] placeholder-neutral-500`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute ${isAr ? 'left-3' : 'right-3'} top-2.5 text-neutral-400 hover:text-white text-xs`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 justify-start sm:justify-center scrollbar-none px-1">
          {categoriesList.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id !== 'all') {
                    recordCategoryView(cat.id, cat.label);
                  }
                }}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#1a0508] shadow-md font-extrabold scale-105'
                    : 'bg-[#26070c] border border-[#481119] text-[#e0b4b8] hover:text-white hover:border-[#6b1823]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-[#24070c] rounded-2xl border border-[#481119] max-w-md mx-auto p-4">
            <Sparkles className="w-8 h-8 text-[#d4a373] mx-auto opacity-70" />
            <p className="text-sm font-bold text-white">{t.menuPage.noResults}</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-1.5 rounded-full bg-[#3d0e15] text-[#d4a373] hover:text-white text-xs font-bold"
            >
              {t.menuPage.allCategories}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((dish) => {
              const isAdded = !!addedItemIds[dish.id];
              const displayName = isAr ? dish.nameAr : dish.nameEn;
              const tagLabel = isAr ? dish.tag : (dish.tagEn || dish.tag);

              return (
                <div
                  key={dish.id}
                  className="rounded-2xl overflow-hidden bg-[#24070c] border border-[#481119] flex flex-col justify-between hover:border-[#782229] transition-all shadow-lg group hover:shadow-2xl"
                >
                  <div>
                    {/* 1. Dish Image: CLICKING THE IMAGE OPENS DESCRIPTION & DETAILS */}
                    <div
                      onClick={() => {
                        recordDishView(dish.id, isAr ? dish.nameAr : dish.nameEn);
                        setSelectedDishForModal(dish);
                      }}
                      className="relative aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer group/img"
                      title={t.menuPage.clickImageForDesc}
                    >
                      <img
                        src={dish.image}
                        alt={displayName}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Tag pill if present */}
                      {tagLabel && (
                        <div className={`absolute top-2.5 sm:top-3 ${isAr ? 'right-2.5 sm:right-3' : 'left-2.5 sm:left-3'}`}>
                          <span className="px-2.5 py-0.5 sm:py-1 text-[10px] font-bold rounded-full bg-[#782229]/95 text-white border border-[#9b2c35] shadow">
                            {tagLabel}
                          </span>
                        </div>
                      )}

                      {/* Click indicator on hover: "اضغط على الصورة لعرض الوصف" */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <span className="px-3 py-1.5 rounded-full bg-[#1b0609]/90 border border-[#d4a373]/60 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg transform -translate-y-1 group-hover/img:translate-y-0 transition-transform">
                          <Eye className="w-3.5 h-3.5 text-[#d4a373]" />
                          <span>{t.menuPage.clickImageForDesc}</span>
                        </span>
                      </div>
                    </div>

                    {/* 2. Dish Name & Price beside each other */}
                    <div className="p-3.5 sm:p-4 pb-2">
                      <div className="flex items-center justify-between gap-2.5 sm:gap-3">
                        {/* Dish Name: Medium font in current language */}
                        <h3 className="text-sm sm:text-base font-medium text-white truncate group-hover:text-[#d4a373] transition-colors min-w-0">
                          {displayName}
                        </h3>

                        {/* Dish Price: Bold, prominent, and clean white */}
                        <div className="text-sm sm:text-lg font-bold text-white tracking-wide shrink-0 whitespace-nowrap drop-shadow-sm font-mono">
                          {dish.priceBHD.toFixed(1)} {t.currency}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Action Button: "إضافة إلى السلة" / "Add to Cart" */}
                  <div className="p-3.5 sm:p-4 pt-1">
                    <button
                      onClick={(e) => handleAddToCart(dish, e)}
                      className={`w-full py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-md ${
                        isAdded
                          ? 'bg-emerald-700 border-emerald-500 text-white'
                          : 'bg-[#3d0d14] hover:bg-[#58141d] border-[#782229] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-200" />
                          <span>{t.menuPage.addedToCart}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5 text-[#d4a373]" />
                          <span>{t.menuPage.addToCart}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Cart Button on Menu Page when items are added */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#782229] to-[#9b2c35] text-white border border-[#d4a373]/60 shadow-2xl flex items-center gap-2.5 sm:gap-3 cursor-pointer hover:brightness-110 active:scale-95 max-w-[92vw]"
          >
            <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-white text-[#782229] flex items-center justify-center text-[11px] sm:text-xs font-black">
              {cartCount}
            </div>
            <span className="text-xs sm:text-sm font-bold truncate">
              {t.cart.title} · {cartTotal.toFixed(1)} {t.currency}
            </span>
            <ShoppingBag className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4a373] shrink-0" />
          </button>
        </div>
      )}

      {/* 4. DISH DETAILS MODAL: Displays full description when image is clicked */}
      {selectedDishForModal && (
        <div
          onClick={() => setSelectedDishForModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1b0609] border border-[#481119] rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col cursor-default"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDishForModal(null)}
              className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              title={t.menuPage.close}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Enlarged Photo */}
            <div className="relative aspect-[16/10] max-h-56 sm:max-h-64 overflow-hidden bg-black/40 shrink-0">
              <img
                src={selectedDishForModal.image}
                alt={isAr ? selectedDishForModal.nameAr : selectedDishForModal.nameEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0609] via-transparent to-transparent opacity-80" />
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
              {/* Name and Price side-by-side */}
              <div className="flex items-baseline justify-between gap-3 border-b border-[#3b0f15] pb-3">
                <h3 className="text-base sm:text-xl font-bold text-white font-serif">
                  {isAr ? selectedDishForModal.nameAr : selectedDishForModal.nameEn}
                </h3>
                <div className="text-base sm:text-xl font-bold text-white whitespace-nowrap font-mono">
                  {selectedDishForModal.priceBHD.toFixed(1)} {t.currency}
                </div>
              </div>

              {/* REVEALED DESCRIPTION */}
              <div className="space-y-1.5 bg-[#24070c] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#3b0f15]">
                <div className="text-[11px] font-bold text-[#d4a373] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.menuPage.dishDescription}</span>
                </div>
                <p
                  className={`text-xs sm:text-sm text-[#e0b4b8] leading-relaxed ${
                    isAr ? 'text-right' : 'text-left'
                  }`}
                  dir={isAr ? 'rtl' : 'ltr'}
                >
                  {isAr
                    ? selectedDishForModal.descriptionAr
                    : selectedDishForModal.descriptionEn || selectedDishForModal.descriptionAr}
                </p>
              </div>

              {/* Action: Add to Cart */}
              <div className="pt-2 flex items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => {
                    handleAddToCart(selectedDishForModal);
                    setSelectedDishForModal(null);
                  }}
                  className="flex-1 py-2.5 sm:py-3 rounded-xl bg-[#782229] hover:bg-[#912b34] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4 text-[#d4a373]" />
                  <span>{t.menuPage.addToCart}</span>
                </button>

                <button
                  onClick={() => setSelectedDishForModal(null)}
                  className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#26070c] hover:bg-[#3d0e15] border border-[#481119] text-[#e0b4b8] text-xs font-bold transition-colors cursor-pointer"
                >
                  {t.menuPage.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Matching Footer */}
      <FriscaFooter
        onNavigateToHome={onBackToHome}
        onNavigateToMenu={() => {}}
        onOpenBookingModal={() => onOpenBookingModal()}
        onOpenDashboard={onOpenDashboard}
      />
    </div>
  );
};
