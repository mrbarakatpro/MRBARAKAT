import React, { useState } from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';
import { useFrisca } from '../context/FriscaContext';

interface FriscaBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDish?: string;
}

export const FriscaBookingModal: React.FC<FriscaBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedDish,
}) => {
  const { lang, t, addBooking } = useFrisca();
  const isAr = lang === 'ar';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('08:00 PM');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking({
      name,
      phone,
      guests,
      date: date || (isAr ? 'اليوم' : 'Today'),
      time,
      dish: preselectedDish,
    });
    setConfirmed(true);
  };

  const getWhatsAppBookingLink = () => {
    const msg = isAr
      ? `مرحباً مطعم فريسكا البحرين، أود حجز طاولة:
• الاسم: ${name}
• الهاتف: ${phone}
• عدد الضيوف: ${guests} أشخاص
• التاريخ: ${date || 'اليوم'}
• الوقت: ${time}
${preselectedDish ? `• الطبق/المجلس: ${preselectedDish}` : ''}`
      : `Hello Frisca Restaurant Bahrain, I would like to reserve a table:
• Name: ${name}
• Phone: ${phone}
• Guests: ${guests} persons
• Date: ${date || 'Today'}
• Time: ${time}
${preselectedDish ? `• Preferred Dish/Lounge: ${preselectedDish}` : ''}`;

    return `https://wa.me/97339228410?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="bg-[#1b0609] border border-[#481119] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-[#3b0f15] bg-[#22070c] shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-white font-serif">FRISCA</span>
            <span className="text-xs text-[#e0b4b8]">· {t.bookingModal.title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#e0b4b8] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto">
          {confirmed ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#481119] text-[#d4a373] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">{t.bookingModal.successTitle}</h4>
              <p className="text-xs text-[#e0b4b8]">
                {t.bookingModal.successMessage}
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.bookingModal.whatsappBtn}</span>
                </a>
                <button
                  onClick={onClose}
                  className="text-xs text-[#e0b4b8] hover:text-white pt-1 cursor-pointer"
                >
                  {t.bookingModal.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-white mb-1">
                  {t.bookingModal.nameLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'الاسم الكامل...' : 'Full name...'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#26070c] border border-[#481119] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4a373] text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-white mb-1">
                  {t.bookingModal.phoneLabel} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+973 39XX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#26070c] border border-[#481119] rounded-xl px-3 py-2 text-white font-mono text-sm"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-white mb-1">
                    {t.bookingModal.guestsLabel}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#26070c] border border-[#481119] rounded-xl px-2.5 py-2 text-white"
                  >
                    <option value="1">{isAr ? 'شخص 1' : '1 Guest'}</option>
                    <option value="2">{isAr ? 'شخصان (2)' : '2 Guests'}</option>
                    <option value="3">{isAr ? '3 أشخاص' : '3 Guests'}</option>
                    <option value="4">{isAr ? '4 أشخاص' : '4 Guests'}</option>
                    <option value="6">{isAr ? '6 أشخاص' : '6 Guests'}</option>
                    <option value="8">{isAr ? '8 أشخاص أو أكثر' : '8+ Guests'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-white mb-1">
                    {t.bookingModal.dateLabel} *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#26070c] border border-[#481119] rounded-xl px-2.5 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-white mb-1">
                  {t.bookingModal.timeLabel}
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#26070c] border border-[#481119] rounded-xl px-2.5 py-2 text-white"
                >
                  <option value="01:00 PM">01:00 PM {isAr ? '(غداء)' : '(Lunch)'}</option>
                  <option value="07:00 PM">07:00 PM {isAr ? '(عشاء)' : '(Dinner)'}</option>
                  <option value="08:30 PM">08:30 PM {isAr ? '(عشاء رئيسي)' : '(Main Dinner)'}</option>
                  <option value="10:00 PM">10:00 PM {isAr ? '(أمسية)' : '(Late Dining)'}</option>
                  <option value="11:30 PM">11:30 PM {isAr ? '(سهرة)' : '(Midnight Lounge)'}</option>
                </select>
              </div>

              {preselectedDish && (
                <div className="p-2.5 rounded-lg bg-[#28080e] border border-[#481119] text-[11px] text-[#d4a373]">
                  {t.bookingModal.selectedDishLabel}: {preselectedDish}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#1b0609] font-extrabold text-xs shadow-md transition-all cursor-pointer"
                >
                  {t.bookingModal.submitBtn}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
