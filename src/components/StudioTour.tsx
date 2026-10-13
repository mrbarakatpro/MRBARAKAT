import React, { useState } from 'react';
import { Maximize2, Crown, Gem, Sparkles, Check, MapPin, Building, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, StudioSpace } from '../types';
import { STUDIO_SPACES, STUDIO_IMAGES, STUDIO_CONTACT } from '../data/studioData';

interface StudioTourProps {
  lang: Language;
  onRequestStudioVisit: (spaceName: string) => void;
}

export const StudioTour: React.FC<StudioTourProps> = ({ lang, onRequestStudioVisit }) => {
  const [activeSpaceId, setActiveSpaceId] = useState<string>(STUDIO_SPACES[0].id);

  const activeSpace = STUDIO_SPACES.find((s) => s.id === activeSpaceId) || STUDIO_SPACES[0];

  const getSpaceIcon = (icon: string) => {
    switch (icon) {
      case 'Maximize2':
        return <Maximize2 className="w-5 h-5 text-amber-400" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-amber-400" />;
      case 'Gem':
        return <Gem className="w-5 h-5 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      default:
        return <Building className="w-5 h-5 text-amber-400" />;
    }
  };

  const spaceImages: Record<string, string> = {
    cyclorama: STUDIO_IMAGES.hero,
    'royal-majlis': STUDIO_IMAGES.portrait,
    'macro-bay': STUDIO_IMAGES.commercial,
    'vip-glamour': STUDIO_IMAGES.wedding,
  };

  return (
    <section id="studio-tour" className="py-20 bg-neutral-900/40 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Building className="w-4 h-4" />
            <span>{lang === 'ar' ? 'مقرنا في ضاحية السيف' : 'Studio Facilities'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'ar' ? (
              <>
                جولة في مرافق <span className="gold-gradient-text font-serif">استديو بركات</span>
              </>
            ) : (
              <>
                Explore <span className="gold-gradient-text font-serif">Barakat Production Stages</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'مساحة تصوير متكاملة 450 م² مصممة بأعلى المواصفات الصوتية والهندسية لتلبية متطلبات كبار المخرجين وعملاء الـ VIP في مملكة البحرين.'
              : 'A 450 sqm state-of-the-art production complex designed with sound insulation and cinema trusses for premier filmmakers and VIP clients in Bahrain.'}
          </p>
        </div>

        {/* Studio Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {STUDIO_SPACES.map((space) => {
            const isSelected = space.id === activeSpaceId;
            return (
              <button
                key={space.id}
                onClick={() => setActiveSpaceId(space.id)}
                className={`p-3.5 rounded-2xl border transition-all text-center flex flex-col items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-900 text-amber-400'}`}>
                  {getSpaceIcon(space.icon)}
                </div>
                <span className="text-xs font-bold leading-tight">{space.name[lang]}</span>
                <span className="text-[10px] text-amber-400 font-mono">{space.area}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Showcase */}
        <div className="bg-neutral-950 rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-[480px] bg-neutral-900">
            <img
              src={spaceImages[activeSpace.id] || STUDIO_IMAGES.hero}
              alt={activeSpace.name[lang]}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30" />
            
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-white bg-neutral-950/85 backdrop-blur-md p-3 rounded-xl border border-neutral-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="font-medium">{STUDIO_CONTACT.locationAr.split('،')[1] || 'ضاحية السيف'}</span>
              </div>
              <span className="text-amber-400 font-mono font-bold">{activeSpace.area}</span>
            </div>
          </div>

          {/* Details & Specs (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  {lang === 'ar' ? 'المساحة والمرافق' : 'Stage Specifications'}
                </span>
                <h3 className="text-2xl font-bold text-white font-serif">
                  {activeSpace.name[lang]}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {activeSpace.description[lang]}
                </p>
              </div>

              {/* Technical features checklist */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-800/80">
                <span className="text-xs font-bold text-neutral-300 block mb-2">
                  {lang === 'ar' ? 'التجهيزات التقنية المتاحة:' : 'Technical Highlights:'}
                </span>
                {activeSpace.specs[lang].map((spec, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="leading-snug">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action booking visit */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <button
                onClick={() => onRequestStudioVisit(activeSpace.name[lang])}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/15 transition-all"
              >
                <span>{lang === 'ar' ? 'حجز موعد زيارة أو تأجير القاعة' : 'Inquire for Studio Rental / Visit'}</span>
                {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
