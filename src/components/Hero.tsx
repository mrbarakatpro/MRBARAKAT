import React, { useState } from 'react';
import { Play, Sparkles, Award, Shield, ArrowLeft, ArrowRight, Video, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_IMAGES } from '../data/studioData';

interface HeroProps {
  lang: Language;
  onOpenBookingModal: () => void;
  onExplorePortfolio: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenBookingModal,
  onExplorePortfolio,
  onOpenCalculator,
}) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const stats = [
    { number: '+12', labelAr: 'سنة خبرة احترافية في البحرين', labelEn: 'Years Master Experience in Bahrain' },
    { number: '+1,800', labelAr: 'عرس ومناسبة ملكية موثقة', labelEn: 'Royal Weddings Documented' },
    { number: '450 م²', labelAr: 'مساحة استديو متكاملة في السيف', labelEn: 'Production Stages in Seef District' },
    { number: '100%', labelAr: 'خصوصية تامة بطواقم نسائية معتمدة', labelEn: 'Private Dedicated Ladies Crew' },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-neutral-950 film-grain pt-6 pb-16">
      {/* Background cinematic studio image with luxury vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={STUDIO_IMAGES.hero}
          alt="Barakat Studio Bahrain"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transform motion-safe:animate-pulse transition-opacity duration-1000"
          style={{ animationDuration: '8s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-neutral-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        {/* Subtle Bahrain Studio Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 shadow-lg shadow-amber-500/5 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {lang === 'ar'
              ? 'الاستديو السينمائي الأول للأعراس والإنتاج الفاخر في مملكة البحرين'
              : 'Bahrain’s Premier Luxury Wedding & Cinematic Studio'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-neutral-400 text-[11px]">
            {lang === 'ar' ? 'ضاحية السيف' : 'Seef District'}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-tight">
          {lang === 'ar' ? (
            <>
              نحوّل اللحظات إلى <span className="gold-gradient-text font-serif">تحف سينمائية</span> خالدة برؤية فنية راقية
            </>
          ) : (
            <>
              Crafting Your Moments into <span className="gold-gradient-text font-serif">Cinematic Masterpieces</span> of Timeless Elegance
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg lg:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
          {lang === 'ar'
            ? 'مرحباً بكم في استديو بركات بمملكة البحرين. نجمع بين أحدث تقنيات التصوير العالمية وعدسات السينما، وأصالة الضيافة والذوق الخليجي الرفيع لتوثيق أثمن ذكرياتكم وإعلانات علاماتكم التجارية.'
            : 'Welcome to Barakat Studio in the Kingdom of Bahrain. Combining cinema-grade optics, Hasselblad medium-format detail, and Gulf royal hospitality to immortalize your celebrations and elevate your brand visual identity.'}
        </p>

        {/* Key trust bullets */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-neutral-300">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ar' ? 'طاقم نسائي متكامل للأعراس' : 'Dedicated Ladies Production Team'}</span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ar' ? 'ألبومات إيطالية بضمان مدى الحياة' : 'Lifetime Handcrafted Italian Albums'}</span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ar' ? 'تصوير درونز مرخص في كافة مناطق البحرين' : 'Licensed BCAA Aerial Drone Operations'}</span>
          </div>
        </div>

        {/* Primary Interactive CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          <button
            onClick={onOpenBookingModal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
          >
            <span>{lang === 'ar' ? 'احجز جلستك الآن' : 'Book Studio Session'}</span>
            {lang === 'ar' ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </button>

          <button
            onClick={onOpenCalculator}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-900/90 border border-neutral-700 hover:border-amber-500/60 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-neutral-850"
          >
            <span>{lang === 'ar' ? 'حاسبة الباقات (د.ب)' : 'Estimate Quote (BHD)'}</span>
          </button>

          <button
            onClick={() => setShowVideoModal(true)}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-amber-400 text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
            <span>{lang === 'ar' ? 'شاهد Showreel الاستديو' : 'Watch Showreel'}</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/50">
              <span className="text-2xl sm:text-3xl font-extrabold gold-gradient-text font-serif">
                {stat.number}
              </span>
              <span className="mt-1 text-xs sm:text-sm text-neutral-400 font-medium text-center">
                {lang === 'ar' ? stat.labelAr : stat.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Showreel Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-950">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm text-white">
                  {lang === 'ar' ? 'Showreel استديو بركات - مملكة البحرين' : 'Barakat Studio Showreel - Bahrain Reel'}
                </span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-neutral-400 hover:text-white px-2 py-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Video Player Mockup with film playback */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={STUDIO_IMAGES.hero}
                alt="Studio Reel"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
              
              <div className="absolute text-center p-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/90 text-neutral-950 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {lang === 'ar' ? 'ملخص الأعمال السينمائية 2026' : 'Cinematography Master Reel 2026'}
                </h3>
                <p className="text-xs text-neutral-300 max-w-md">
                  {lang === 'ar'
                    ? 'أعراس قصر القضيبية، ريتز كارلتون، فورسيزونز، والإنتاج الإعلاني الفاخر في البحرين'
                    : 'Gudaibiya Palace, Ritz-Carlton, Four Seasons, and Commercial Films in Bahrain'}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-amber-400 font-mono bg-neutral-950/80 px-3 py-1 rounded-full border border-amber-500/30">
                  <span>4K 60FPS</span>
                  <span>·</span>
                  <span>ARRI LogC3</span>
                  <span>·</span>
                  <span>Master Retouch</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-950 flex items-center justify-between text-xs text-neutral-400">
              <span>{lang === 'ar' ? 'إخراج وإنتاج: استديو بركات' : 'Directed & Produced by: Barakat Studio'}</span>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  onOpenBookingModal();
                }}
                className="px-3 py-1.5 bg-amber-500 text-neutral-950 font-bold rounded-lg hover:bg-amber-400"
              >
                {lang === 'ar' ? 'حجز موعد عمل' : 'Inquire for Production'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
