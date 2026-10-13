import React, { useState, useEffect } from 'react';
import { useFrisca } from '../context/FriscaContext';
import { ChevronRight, ChevronLeft, Pause, Play, Sparkles, Image as ImageIcon } from 'lucide-react';

export const FriscaGallery: React.FC = () => {
  const { lang, t, siteTexts, galleryImages } = useFrisca();
  const isAr = lang === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const totalImages = galleryImages.length;

  const kicker = isAr ? siteTexts.gallery.kicker : t.gallery.kicker;
  const title = isAr ? siteTexts.gallery.title : t.gallery.title;
  const sub = isAr
    ? 'سلايد شو متحرك يوثق أرقى زوايا مطعم فريسكا وقاعاته وأطباقه الحصرية'
    : t.gallery.dragHint;

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [cardStep, setCardStep] = useState(252);

  // Measure card width + gap responsively
  useEffect(() => {
    const updateStep = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      if (w < 640) {
        setCardStep(240 + 12); // w-60 (240px) + gap-3 (12px)
      } else if (w < 1024) {
        setCardStep(288 + 16); // w-72 (288px) + gap-4 (16px)
      } else {
        setCardStep(320 + 16); // w-80 (320px) + gap-4 (16px)
      }
    };
    updateStep();
    window.addEventListener('resize', updateStep);
    return () => window.removeEventListener('resize', updateStep);
  }, []);

  // Auto-slide effect for the moving slideshow (صف واحد والصور متحرك)
  useEffect(() => {
    if (!isPlaying || isHovered || totalImages <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, totalImages]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    if (!touchStartX || !touchEndX) return;
    const diff = touchStartX - touchEndX;
    const threshold = 40;
    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const duplicatedImages = [...galleryImages, ...galleryImages, ...galleryImages];

  return (
    <section id="gallery" className="py-14 sm:py-20 bg-[#1a0508] text-white border-b border-[#3b0f15]/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#d4a373] font-bold mb-1">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{kicker}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              {title}
            </h2>
            <p className="text-xs text-[#e0b4b8] mt-1">
              {sub}
            </p>
          </div>

          {/* Slideshow Controls (Previous, Next, Pause/Play) */}
          <div className="flex items-center gap-2 self-start sm:self-auto" dir="ltr">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-[#28080e] border border-[#481119] hover:bg-[#3d0d14] text-[#e0b4b8] hover:text-white transition-colors cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-[#28080e] border border-[#481119] hover:bg-[#3d0d14] text-white transition-colors cursor-pointer"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-[#28080e] border border-[#481119] hover:bg-[#3d0d14] text-white transition-colors cursor-pointer"
              title="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Single Row Animated Slideshow Strip (صف واحد والصور متحرك) with Touch Swipe */}
      <div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        dir="ltr"
      >
        <div
          className="flex gap-3 sm:gap-4 px-4 transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `translateX(-${(currentIndex % totalImages) * cardStep}px)`,
          }}
        >
          {duplicatedImages.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-60 sm:w-72 lg:w-80 shrink-0 rounded-2xl overflow-hidden border border-[#481119] bg-[#26070c] aspect-[4/3] group relative shadow-xl transition-all duration-300 hover:border-[#d4a373] hover:scale-[1.02]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity flex items-end p-3.5 sm:p-4">
                <div>
                  <span className="text-[10px] text-[#d4a373] font-bold block mb-0.5">
                    {isAr ? 'مطعم فريسكا · البحرين' : 'Frisca Restaurant · Bahrain'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block truncate">
                    {isAr ? (item.titleAr || item.title) : (item.titleEn || item.title)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ambient Gradient edge fades */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#1a0508] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#1a0508] to-transparent z-10" />
      </div>

      {/* Navigation Indicators Dots */}
      <div className="flex justify-center items-center gap-1.5 mt-5 sm:mt-6">
        {galleryImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              currentIndex % totalImages === idx
                ? 'w-6 bg-[#d4a373]'
                : 'w-2 bg-[#481119] hover:bg-[#6e1a26]'
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
