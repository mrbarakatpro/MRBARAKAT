import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { Language } from '../types';
import { TESTIMONIALS } from '../data/studioData';

interface TestimonialsProps {
  lang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  return (
    <section className="py-20 bg-neutral-950 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Award className="w-4 h-4" />
            <span>{lang === 'ar' ? 'ثقة عملائنا في البحرين' : 'Client Trust & Prestige'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'ar' ? (
              <>
                ماذا يقول عملاؤنا في <span className="gold-gradient-text font-serif">مملكة البحرين</span>
              </>
            ) : (
              <>
                What Our Clients Say Across <span className="gold-gradient-text font-serif">Bahrain</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'شهادات حقيقية من العائلات الكريمة، العرائس، والرؤساء التنفيذيين الذين وثقوا بعدسة استديو بركات.'
              : 'Real testimonials from prestigious families, brides, and corporate executives across the Kingdom of Bahrain.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-6">
                  "{t.comment[lang]}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-neutral-800/80">
                <div className="font-bold text-sm text-white">
                  {t.name[lang]}
                </div>
                <div className="text-[11px] text-amber-400/90 font-medium">
                  {t.title[lang]}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  {t.city[lang]} · مملكة البحرين
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
