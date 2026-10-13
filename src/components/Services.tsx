import React from 'react';
import { Camera, Film, Sparkles, UserCheck, Compass, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_SERVICES } from '../data/studioData';

interface ServicesProps {
  lang: Language;
  onBookService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ lang, onBookService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-6 h-6 text-amber-400" />;
      case 'Film':
        return <Film className="w-6 h-6 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-amber-400" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-400" />;
      default:
        return <Camera className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-neutral-950 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Film className="w-4 h-4" />
            <span>{lang === 'ar' ? 'مجالات التميز والإنتاج' : 'Studio Capabilities'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'ar' ? (
              <>
                خدمات استديو بركات <span className="gold-gradient-text font-serif">الاحترافية</span>
              </>
            ) : (
              <>
                Comprehensive <span className="gold-gradient-text font-serif">Production Services</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'نقدم حلولاً تصويرية وإخراجية متكاملة تدمج الرؤية الفنية والعتاد التقني المتطور لضمان أعلى معايير الجودة العالمية في البحرين.'
              : 'End-to-end visual solutions bridging cinematic storytelling with high-end camera technology for Bahrain and the Arabian Gulf.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STUDIO_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 group"
            >
              <div>
                {/* Header Icon + Starting Price */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700/80 flex items-center justify-center group-hover:scale-105 group-hover:border-amber-500/50 transition-all">
                    {getIcon(service.iconName)}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 block uppercase">
                      {lang === 'ar' ? 'تبدأ الباقات من' : 'Starting From'}
                    </span>
                    <span className="text-sm font-bold font-mono text-amber-400">
                      {service.startingPriceBHD} {lang === 'ar' ? 'د.ب' : 'BHD'}
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {lang === 'ar' ? service.title.ar : service.title.en}
                </h3>
                <p className="mt-1.5 text-xs text-amber-400/90 font-medium">
                  {lang === 'ar' ? service.tagline.ar : service.tagline.en}
                </p>
                <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                  {lang === 'ar' ? service.description.ar : service.description.en}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-5 pt-4 border-t border-neutral-800/80 space-y-2">
                  <span className="text-[11px] font-bold text-neutral-300 block mb-2 uppercase tracking-wider">
                    {lang === 'ar' ? 'أبرز المخرجات والمميزات:' : 'Key Deliverables:'}
                  </span>
                  {service.deliverables[lang].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => onBookService(service.id)}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:shadow-md"
                >
                  <span>{lang === 'ar' ? 'احجز هذه الخدمة' : 'Book This Service'}</span>
                  {lang === 'ar' ? (
                    <ArrowLeft className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
