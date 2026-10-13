import React, { useState } from 'react';
import { Lock, Unlock, Heart, MessageSquare, Download, CheckCircle, ShieldAlert, Sparkles, Send } from 'lucide-react';
import { Language, ClientProofPhoto } from '../types';
import { SAMPLE_CLIENT_PROOFS } from '../data/studioData';

interface ClientPortalProps {
  lang: Language;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({ lang }) => {
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [photos, setPhotos] = useState<ClientProofPhoto[]>(SAMPLE_CLIENT_PROOFS);
  const [activeNoteEditId, setActiveNoteEditId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [submittedAlbum, setSubmittedAlbum] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = accessCode.trim().toUpperCase();
    if (clean === 'BARAKAT-VIP' || clean === 'WEDDING-2026' || clean === 'DEMO' || clean === 'BARAKAT') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg(
        lang === 'ar'
          ? 'رمز الجلسة غير صحيح. جرب الرمز التجريبي: BARAKAT-VIP'
          : 'Invalid passcode. Try demo code: BARAKAT-VIP'
      );
    }
  };

  const handleToggleFavorite = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, selectedForAlbum: !p.selectedForAlbum } : p
      )
    );
  };

  const handleSaveNote = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, notes: noteText } : p))
    );
    setActiveNoteEditId(null);
    setNoteText('');
  };

  const selectedCount = photos.filter((p) => p.selectedForAlbum).length;

  return (
    <section id="client-portal" className="py-20 bg-neutral-950 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Lock className="w-4 h-4" />
            <span>{lang === 'ar' ? 'بوابة العملاء الخاصة' : 'Private Client Proofing'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'ar' ? (
              <>
                معاينة واختيار صور <span className="gold-gradient-text font-serif">الألبوم الملكي</span>
              </>
            ) : (
              <>
                Private Client Portal & <span className="gold-gradient-text font-serif">Album Proofing</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'مساحة مشفرة وخاصة لعملاء استديو بركات لاستعراض صور جلستهم الخاصة، وتحديد الصور المفضلة لطباعة الألبوم الإيطالي، وإرسال ملاحظات الريتوش.'
              : 'Private portal for our esteemed clients to review uncompressed proofs, select images for leather album binding, and submit fine-retouching instructions.'}
          </p>
        </div>

        {!isAuthenticated ? (
          /* Login Card */
          <div className="max-w-md mx-auto bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              {lang === 'ar' ? 'تسجيل دخول إلى جلستك الخاصة' : 'Access Your Private Gallery'}
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              {lang === 'ar'
                ? 'أدخل رمز الجلسة السري المرفق في رسالة الاستديو أو العقد'
                : 'Enter the session passcode provided in your contract or SMS notification'}
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'أدخل رمز الجلسة (مثال: BARAKAT-VIP)' : 'Enter Code (e.g. BARAKAT-VIP)'}
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full text-center tracking-widest uppercase font-mono bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 placeholder:text-neutral-600"
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-400 font-medium">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>{lang === 'ar' ? 'فتح المعرض الخاص' : 'Enter Private Gallery'}</span>
              </button>

              {/* Demo Helper Button */}
              <button
                type="button"
                onClick={() => {
                  setAccessCode('BARAKAT-VIP');
                  setIsAuthenticated(true);
                  setErrorMsg('');
                }}
                className="text-xs text-amber-400/80 hover:text-amber-300 underline font-medium pt-2 block mx-auto cursor-pointer"
              >
                {lang === 'ar' ? 'تجربة الدخول برمز تجريبي: BARAKAT-VIP' : 'Try Demo Code: BARAKAT-VIP'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Proofing Dashboard */
          <div className="space-y-8 animate-fade-in">
            {/* Top Bar with Status and Progress */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-mono">
                    {lang === 'ar' ? 'جلسة العميل #BRK-9921' : 'Session #BRK-9921'}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {lang === 'ar' ? 'معرض الصور المبدئية للألبوم الإيطالي' : 'Master Album Selection Gallery'}
                  </h4>
                </div>
              </div>

              {/* Selection counter & submit */}
              <div className="flex items-center gap-3">
                <div className="text-right px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs text-neutral-400 block">
                    {lang === 'ar' ? 'الصور المحددة للألبوم:' : 'Selected for Album:'}
                  </span>
                  <span className="text-sm font-bold text-amber-400 font-mono">
                    {selectedCount} / {photos.length}
                  </span>
                </div>

                <button
                  onClick={() => setSubmittedAlbum(true)}
                  disabled={selectedCount === 0}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'اعتماد وإرسال للمطبعة' : 'Submit for Binding'}</span>
                </button>

                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="text-xs text-neutral-500 hover:text-neutral-300 px-2 py-1"
                >
                  {lang === 'ar' ? 'خروج' : 'Exit'}
                </button>
              </div>
            </div>

            {submittedAlbum && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'تم اعتماد اختيارك بنجاح! سيبدأ فريق الريتوش والتجليد الإيطالي بالعمل فوراً، وسيتم التواصل معكم عند جاهزية الألبوم.'
                      : 'Selection submitted successfully! Our Italian bindery & retouching artists are now preparing your physical album.'}
                  </span>
                </div>
                <button
                  onClick={() => setSubmittedAlbum(false)}
                  className="text-xs font-bold text-emerald-400 hover:underline"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Photos Proof Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`rounded-2xl overflow-hidden bg-neutral-900 border transition-all ${
                    photo.selectedForAlbum
                      ? 'border-amber-500 shadow-lg shadow-amber-500/10'
                      : 'border-neutral-800'
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-neutral-950">
                    <img
                      src={photo.thumbnail}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Heart button */}
                    <button
                      onClick={() => handleToggleFavorite(photo.id)}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md cursor-pointer transition-all ${
                        photo.selectedForAlbum
                          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-110'
                          : 'bg-neutral-950/70 text-neutral-400 hover:text-white'
                      }`}
                      title={lang === 'ar' ? 'إضافة إلى الألبوم' : 'Add to Album'}
                    >
                      <Heart className={`w-4 h-4 ${photo.selectedForAlbum ? 'fill-current' : ''}`} />
                    </button>

                    {/* Resolution badge */}
                    <div className="absolute bottom-2 left-2 bg-neutral-950/80 px-2 py-0.5 rounded text-[10px] text-neutral-400 font-mono">
                      {photo.dimensions}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white line-clamp-1">{photo.title}</span>
                    </div>

                    {/* Retouching Notes */}
                    <div className="text-xs bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80 text-neutral-300">
                      {activeNoteEditId === photo.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            rows={2}
                            placeholder={lang === 'ar' ? 'اكتب ملاحظة التعديل أو الريتوش...' : 'Add retouch note...'}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-xs text-white focus:outline-none"
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => setActiveNoteEditId(null)}
                              className="px-2 py-0.5 text-[11px] text-neutral-400 hover:text-white"
                            >
                              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                            </button>
                            <button
                              onClick={() => handleSaveNote(photo.id)}
                              className="px-2.5 py-0.5 text-[11px] bg-amber-500 text-neutral-950 font-bold rounded"
                            >
                              {lang === 'ar' ? 'حفظ' : 'Save'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-1">
                          <div className="text-[11px] text-neutral-400 italic line-clamp-2">
                            {photo.notes || (lang === 'ar' ? 'لا توجد ملاحظات ريتوش بعد' : 'No notes added')}
                          </div>
                          <button
                            onClick={() => {
                              setActiveNoteEditId(photo.id);
                              setNoteText(photo.notes || '');
                            }}
                            className="text-amber-400 hover:text-amber-300 p-1 text-[11px] font-bold shrink-0"
                            title="Edit notes"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
