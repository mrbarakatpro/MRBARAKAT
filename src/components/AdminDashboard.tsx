import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Camera,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  Phone,
  MessageCircle,
  Download,
  Printer,
  ChevronRight,
  Sliders,
  Sparkles,
  X,
  Eye,
  LogOut,
  Shield,
  Layers,
  HardDrive
} from 'lucide-react';
import { Language } from '../types';
import { STUDIO_CONTACT } from '../data/studioData';

interface AdminDashboardProps {
  lang: Language;
  onClose: () => void;
}

interface BookingRecord {
  id: string;
  clientName: string;
  phone: string;
  eventType: string;
  venue: string;
  date: string;
  time: string;
  crew: string;
  totalBHD: number;
  depositPaidBHD: number;
  status: 'confirmed' | 'pending' | 'in_progress' | 'completed' | 'album_ready';
  notes: string;
}

interface EquipmentItem {
  id: string;
  name: string;
  category: 'camera' | 'lens' | 'lighting' | 'drone' | 'audio';
  serialNumber: string;
  status: 'available' | 'in_use' | 'maintenance';
  assignedTo?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'albums' | 'gear' | 'invoices'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedBookingForInvoice, setSelectedBookingForInvoice] = useState<BookingRecord | null>(null);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);

  // Sample real-world bookings data for Barakat Studio Bahrain
  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'BRK-2026-101',
      clientName: 'عائلة آل خليفة الكريمة',
      phone: '+973 3944 1122',
      eventType: 'عرس ملكي كامل (قاعة نسائية + رجالية)',
      venue: 'فندق الفورسيزونز خليج البحرين',
      date: '2026-10-18',
      time: '6:00 PM - 2:00 AM',
      crew: 'طاقم نسائي كامل (هدى، فاطمة) + طاقم رجالي سينمائي (أحمد، محمود)',
      totalBHD: 850,
      depositPaidBHD: 400,
      status: 'confirmed',
      notes: 'مطلوب درون مرخص لقصر الزفاف + ألبوم إيطالي جلد طبيعي ملكي.',
    },
    {
      id: 'BRK-2026-102',
      clientName: 'د. خالد بوخماس',
      phone: '+973 3922 9988',
      eventType: 'جلسة بورتريه قيادي VIP',
      venue: 'استديو بركات - القاعة الملكية (السيف)',
      date: '2026-10-12',
      time: '11:00 AM - 1:00 PM',
      crew: 'الأستاذ بركات شخصياً',
      totalBHD: 140,
      depositPaidBHD: 140,
      status: 'in_progress',
      notes: 'إبراز الهيبة الخليجية بالغترة الحلبية والعقال الكلاسيكي.',
    },
    {
      id: 'BRK-2026-103',
      clientName: 'دار العود الملكي والمجوهرات',
      phone: '+973 3611 7744',
      eventType: 'إنتاج إعلاني تجاري وماكرو عطور',
      venue: 'استديو بركات - جناح الماكرو والإعلانات',
      date: '2026-10-22',
      time: '9:00 AM - 5:00 PM',
      crew: 'طاقم الإعلانات + خبير مؤثرات دخان ورذاذ',
      totalBHD: 520,
      depositPaidBHD: 260,
      status: 'confirmed',
      notes: 'تصوير Focus Stacking لـ 8 زجاجات عطور وعقود ألماس.',
    },
    {
      id: 'BRK-2026-104',
      clientName: 'مريم الدوسري',
      phone: '+973 3899 3322',
      eventType: 'حفل زواج واستقبال خاص',
      venue: 'فندق الريتز كارلتون - قاعة الغزال',
      date: '2026-10-05',
      time: '7:00 PM - 1:00 AM',
      crew: 'طاقم نسائي معتمد',
      totalBHD: 620,
      depositPaidBHD: 620,
      status: 'album_ready',
      notes: 'الصور تم اعتمادها من العروس وجاهزة للتسليم النهائي.',
    },
    {
      id: 'BRK-2026-105',
      clientName: 'هيئة السياحة والتطوير المعماري',
      phone: '+973 1788 4400',
      eventType: 'سينما جوية ودرونز مرخصة لمرفأ البحرين',
      venue: 'مرفأ البحرين المالي وخليج المنامة',
      date: '2026-10-29',
      time: '4:00 PM - 7:30 PM (Golden Hour)',
      crew: 'طيار درون مرخص من شؤون الطيران المدني BCAA',
      totalBHD: 350,
      depositPaidBHD: 175,
      status: 'pending',
      notes: 'بانتظار تصريح الأجواء النهائي من وزارة المواصلات.',
    },
  ]);

  // Equipment Inventory list
  const [equipmentList] = useState<EquipmentItem[]>([
    { id: 'EQ-01', name: 'Hasselblad H6D-100c (100MP Medium Format)', category: 'camera', serialNumber: 'HB-88319-BH', status: 'available' },
    { id: 'EQ-02', name: 'Sony FX6 Cinema Line Full-Frame 4K', category: 'camera', serialNumber: 'SN-FX6-4091', status: 'in_use', assignedTo: 'جلسة فندق الفورسيزونز' },
    { id: 'EQ-03', name: 'ARRI Alexa Mini LF Cinema Camera', category: 'camera', serialNumber: 'AR-LF-9920', status: 'available' },
    { id: 'EQ-04', name: 'DJI Inspire 3 Cinema Drone (8K ProRes RAW)', category: 'drone', serialNumber: 'DJ-INS-104', status: 'available' },
    { id: 'EQ-05', name: 'Profoto B10X Plus High-Speed OCF (Kit x4)', category: 'lighting', serialNumber: 'PF-B10-0082', status: 'in_use', assignedTo: 'استديو السيف - القاعة الملكية' },
    { id: 'EQ-06', name: 'Schneider Kreuznach 120mm f/4 Macro LS', category: 'lens', serialNumber: 'SK-120-MAC', status: 'available' },
    { id: 'EQ-07', name: 'Sony FE 85mm f/1.4 GM II Prime Lens', category: 'lens', serialNumber: 'SN-GM-85-02', status: 'available' },
    { id: 'EQ-08', name: 'Sennheiser MKH 416 & Wireless Mic Kit', category: 'audio', serialNumber: 'SN-MIC-416', status: 'available' },
  ]);

  // Form state for adding new booking
  const [newBooking, setNewBooking] = useState({
    clientName: '',
    phone: '',
    eventType: 'عرس ملكي كامل',
    venue: 'فندق الفورسيزونز خليج البحرين',
    date: '',
    time: '6:00 PM',
    crew: 'طاقم استديو بركات الميداني',
    totalBHD: 500,
    depositPaidBHD: 250,
    notes: '',
  });

  const handleAddNewBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const created: BookingRecord = {
      id: `BRK-2026-${Math.floor(100 + Math.random() * 900)}`,
      clientName: newBooking.clientName || 'عميل جديد',
      phone: newBooking.phone || '+973 3900 0000',
      eventType: newBooking.eventType,
      venue: newBooking.venue,
      date: newBooking.date || '2026-11-01',
      time: newBooking.time,
      crew: newBooking.crew,
      totalBHD: Number(newBooking.totalBHD),
      depositPaidBHD: Number(newBooking.depositPaidBHD),
      status: 'confirmed',
      notes: newBooking.notes,
    };
    setBookings([created, ...bookings]);
    setShowNewBookingModal(false);
  };

  const updateBookingStatus = (id: string, newStatus: BookingRecord['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  // Stats calculation
  const totalRevenueBHD = bookings.reduce((sum, b) => sum + b.totalBHD, 0);
  const collectedDepositBHD = bookings.reduce((sum, b) => sum + b.depositPaidBHD, 0);
  const pendingCollectionBHD = totalRevenueBHD - collectedDepositBHD;
  const activeBookingsCount = bookings.filter((b) => b.status === 'confirmed' || b.status === 'in_progress').length;

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: BookingRecord['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">مؤكد ومثبت</span>;
      case 'in_progress':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950 text-amber-400 border border-amber-800">قيد التنفيذ / تصوير</span>;
      case 'album_ready':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-950 text-purple-300 border border-purple-800">الألبوم جاهز للتسليم</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-950 text-blue-400 border border-blue-800">منجز ومسلّم</span>;
      case 'pending':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">بانتظار التأكيد</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 text-neutral-100 flex flex-col overflow-hidden animate-fade-in font-sans">
      {/* Top Admin Header */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base text-white tracking-tight">
                {lang === 'ar' ? 'لوحة تحكم استديو بركات' : 'Barakat Studio Operations Suite'}
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                PRO ADMIN
              </span>
            </div>
            <span className="text-xs text-neutral-400">
              {lang === 'ar' ? 'مملكة البحرين - ضاحية السيف | إدارة الحجوزات، المخرجات والمالية' : 'Kingdom of Bahrain - Seef HQ | Bookings, Fleet & Finance'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>CR: 104829-1 (البحرين)</span>
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'ar' ? 'العودة لموقع الزوار' : 'Exit to Public View'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-neutral-900/60 border-l rtl:border-l-0 rtl:border-r border-neutral-800 p-4 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-3 mb-2">
              {lang === 'ar' ? 'الأقسام التشغيلية' : 'Operations Menu'}
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الإحصائيات ونظرة عامة' : 'Overview & Stats'}</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>{lang === 'ar' ? 'جدول الحجوزات والمناسبات' : 'Shoots & Bookings'}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeTab === 'bookings' ? 'bg-neutral-950 text-amber-400' : 'bg-neutral-800 text-neutral-300'}`}>
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('albums')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'albums'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الألبومات الإيطالية ومعارض العملاء' : 'Client Albums Proofing'}</span>
            </button>

            <button
              onClick={() => setActiveTab('gear')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'gear'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{lang === 'ar' ? 'عتاد الكاميرات والدرونز' : 'Gear & Inventory'}</span>
            </button>

            <button
              onClick={() => setActiveTab('invoices')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'invoices'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الفواتير وعقود السجل التجاري' : 'Invoices & Agreements'}</span>
            </button>
          </div>

          {/* Quick contact box */}
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-2">
            <span className="text-[11px] font-bold text-amber-400 block">
              {lang === 'ar' ? 'الاستديو الميداني - البحرين' : 'Studio Helpline'}
            </span>
            <div className="text-neutral-400 text-[11px]">{STUDIO_CONTACT.locationAr}</div>
            <a
              href={`https://wa.me/97339228410`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:underline font-bold text-[11px]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب الأستاذ بركات (+973)</span>
            </a>
          </div>
        </aside>

        {/* Dynamic Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-neutral-950">
          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden gap-1 overflow-x-auto pb-2 border-b border-neutral-800">
            {(['overview', 'bookings', 'albums', 'gear', 'invoices'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                  activeTab === tab ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-900 text-neutral-400'
                }`}
              >
                {tab === 'overview' && 'نظرة عامة'}
                {tab === 'bookings' && 'الحجوزات'}
                {tab === 'albums' && 'الألبومات'}
                {tab === 'gear' && 'المعدات'}
                {tab === 'invoices' && 'الفواتير'}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW & KEY METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>{lang === 'ar' ? 'إجمالي الحجوزات الحالية' : 'Total Revenue'}</span>
                    <DollarSign className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white font-serif">
                    {totalRevenueBHD}{' '}
                    <span className="text-xs font-sans text-amber-400 font-bold">د.ب (BHD)</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+18% عن الشهر السابق بالبحرين</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>{lang === 'ar' ? 'العربونات المحصلة فعلياً' : 'Deposits Collected'}</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white font-serif">
                    {collectedDepositBHD}{' '}
                    <span className="text-xs font-sans text-emerald-400 font-bold">د.ب (BHD)</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    بنسبة تحصيل {Math.round((collectedDepositBHD / totalRevenueBHD) * 100)}%
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>{lang === 'ar' ? 'المتبقي للتحصيل عند التسليم' : 'Outstanding Balance'}</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-amber-300 font-serif">
                    {pendingCollectionBHD}{' '}
                    <span className="text-xs font-sans text-amber-400 font-bold">د.ب (BHD)</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    يستحق بعد تسليم الألبومات والفيديو
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>{lang === 'ar' ? 'المناسبات النشطة هذا الشهر' : 'Active Events'}</span>
                    <Calendar className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white font-serif">
                    {activeBookingsCount}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    موزعة بين قاعات الفنادق واستديو السيف
                  </div>
                </div>
              </div>

              {/* Quick actions & Upcoming agenda */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Upcoming Shoots Table (8 cols) */}
                <div className="lg:col-span-8 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {lang === 'ar' ? 'أقرب جلسات التصوير القادمة بالبحرين' : 'Upcoming Bookings Schedule'}
                      </h3>
                      <span className="text-xs text-neutral-400">
                        {lang === 'ar' ? 'متابعة طواقم التصوير الميدانية وتجهيزات المعدات' : 'Field crew assignments and venue prep'}
                      </span>
                    </div>

                    <button
                      onClick={() => setShowNewBookingModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'إضافة حجز جديد' : 'New Booking'}</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    {bookings.slice(0, 4).map((b) => (
                      <div
                        key={b.id}
                        className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-amber-500/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-amber-400 font-bold">{b.id}</span>
                            <span className="font-bold text-white text-sm">{b.clientName}</span>
                            {getStatusBadge(b.status)}
                          </div>
                          <div className="text-xs text-neutral-400 flex items-center gap-2">
                            <span>{b.eventType}</span>
                            <span>·</span>
                            <span className="text-amber-300">{b.venue}</span>
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            {lang === 'ar' ? 'الطاقم:' : 'Crew:'} {b.crew}
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-800">
                          <div className="font-bold text-sm text-white font-mono">
                            {b.totalBHD} د.ب
                          </div>
                          <div className="text-xs text-neutral-400 font-mono">
                            {b.date} · {b.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Studio Spaces Occupancy (4 cols) */}
                <div className="lg:col-span-4 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4">
                  <h3 className="font-bold text-white text-base">
                    {lang === 'ar' ? 'جاهزية قاعات استديو السيف' : 'Seef Studio Stages'}
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">قاعة السيكلو (Infinity Stage)</span>
                        <span className="text-emerald-400 text-[10px] font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">متاحة</span>
                      </div>
                      <div className="text-[11px] text-neutral-400">مجهزة لشبكة الإضاءة DMX ودخول المعدات</div>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">القاعة الملكية والتراثية</span>
                        <span className="text-amber-400 text-[10px] font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">حجز اليوم 11:00</span>
                      </div>
                      <div className="text-[11px] text-neutral-400">جلسة بورتريه شخصي كبار الشخصيات</div>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">جناح الماكرو والعطور</span>
                        <span className="text-emerald-400 text-[10px] font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">متاحة</span>
                      </div>
                      <div className="text-[11px] text-neutral-400">حجز قادم: دار العود الملكي</div>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">جناح المكياج والـ VIP</span>
                        <span className="text-emerald-400 text-[10px] font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">جاهزة للضيافة</span>
                      </div>
                      <div className="text-[11px] text-neutral-400">القهوة العربية والحلوى البحرينية مجهزة</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS LIST & SCHEDULING */}
          {activeTab === 'bookings' && (
            <div className="space-y-5">
              {/* Filter bar */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-neutral-400 absolute right-3 rtl:right-3 ltr:left-3 top-3" />
                  <input
                    type="text"
                    placeholder={lang === 'ar' ? 'بحث بالاسم، رقم الحجز أو الموقع...' : 'Search by client, ID or venue...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-9 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      filterStatus === 'all' ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-950 text-neutral-400'
                    }`}
                  >
                    الكل ({bookings.length})
                  </button>
                  <button
                    onClick={() => setFilterStatus('confirmed')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      filterStatus === 'confirmed' ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-950 text-neutral-400'
                    }`}
                  >
                    المؤكدة
                  </button>
                  <button
                    onClick={() => setFilterStatus('in_progress')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      filterStatus === 'in_progress' ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-950 text-neutral-400'
                    }`}
                  >
                    قيد التصوير
                  </button>
                  <button
                    onClick={() => setFilterStatus('album_ready')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      filterStatus === 'album_ready' ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-950 text-neutral-400'
                    }`}
                  >
                    الألبوم جاهز
                  </button>

                  <button
                    onClick={() => setShowNewBookingModal(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shrink-0 hover:bg-amber-400 cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة حجز</span>
                  </button>
                </div>
              </div>

              {/* Bookings Full Table */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 text-[11px] uppercase">
                      <tr>
                        <th className="p-4 font-bold">رقم الحجز والعميل</th>
                        <th className="p-4 font-bold">نوع المناسبة والموقع</th>
                        <th className="p-4 font-bold">الموعد والتوقيت</th>
                        <th className="p-4 font-bold">المبلغ والعربون (د.ب)</th>
                        <th className="p-4 font-bold">الحالة</th>
                        <th className="p-4 font-bold text-center">إجراءات وإصدار فاتورة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-neutral-850/60 transition-colors">
                          <td className="p-4">
                            <div className="font-mono text-amber-400 font-bold text-[11px]">{b.id}</div>
                            <div className="font-bold text-white text-sm">{b.clientName}</div>
                            <a
                              href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                              dir="ltr"
                            >
                              <Phone className="w-3 h-3" />
                              {b.phone}
                            </a>
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-white">{b.eventType}</div>
                            <div className="text-neutral-400 text-[11px] mt-0.5">{b.venue}</div>
                            <div className="text-[10px] text-amber-300/80 mt-1">{b.crew}</div>
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-white font-mono">{b.date}</div>
                            <div className="text-neutral-400 text-[11px]">{b.time}</div>
                          </td>

                          <td className="p-4 font-mono">
                            <div className="font-bold text-white text-sm">{b.totalBHD} د.ب</div>
                            <div className="text-emerald-400 text-[11px]">
                              العربون: {b.depositPaidBHD} د.ب
                            </div>
                            <div className="text-neutral-400 text-[10px]">
                              المتبقي: {b.totalBHD - b.depositPaidBHD} د.ب
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="space-y-1.5">
                              {getStatusBadge(b.status)}
                              <select
                                value={b.status}
                                onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                                className="block text-[10px] bg-neutral-950 border border-neutral-700 rounded px-1.5 py-1 text-neutral-300 cursor-pointer"
                              >
                                <option value="confirmed">تأكيد الحجز</option>
                                <option value="in_progress">قيد التصوير</option>
                                <option value="album_ready">الألبوم جاهز</option>
                                <option value="completed">منجز ومسلّم</option>
                                <option value="pending">معلق</option>
                              </select>
                            </div>
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedBookingForInvoice(b);
                                  setActiveTab('invoices');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-white font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                                title="عرض الفاتورة الرسمية"
                              >
                                <FileText className="w-3 h-3" />
                                <span>فاتورة</span>
                              </button>

                              <a
                                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `مرحباً ${b.clientName}، تحياتنا من استديو بركات في البحرين بخصوص حجزكم رقم ${b.id} لتاريخ ${b.date}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800"
                                title="تواصل عبر واتساب"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT ALBUMS & PROOFING */}
          {activeTab === 'albums' && (
            <div className="space-y-5">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white text-base">
                    {lang === 'ar' ? 'متابعة طباعة وتجليد الألبومات الإيطالية' : 'Handmade Italian Album Binding'}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {lang === 'ar'
                      ? 'مراقبة اختيارات العرائس والعملاء للصور وإرسالها لمطابع التجليد الفاخر في إيطاليا'
                      : 'Real-time tracking of client photo proofs and custom velvet preservation chests'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">كود الدخول الموحد للعملاء:</span>
                  <span className="font-mono text-sm font-bold text-amber-400 bg-neutral-950 px-3 py-1 rounded-lg border border-neutral-800">
                    BARAKAT-VIP
                  </span>
                </div>
              </div>

              {/* Album Orders Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400">طلب ألبوم #ALB-991</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800">
                      قيد الشحن من إيطاليا
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">ألبوم الزفاف الملكي - آل خليفة</h4>
                    <p className="text-xs text-neutral-400 mt-1">جلد طبيعي إيطالي بلون الكراميل الملكي مع حفر ذهبي بالاسم وصندوق مخملي</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">عدد الصفحات المختارة:</span>
                      <span className="font-mono text-white">40 ورقة سميكة (80 صفحة)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">نوع الورق:</span>
                      <span className="text-amber-300">Metallic Silk Archival Paper</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">تاريخ التسليم المتوقع:</span>
                      <span className="font-mono text-emerald-400">2026-10-25</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold">
                      عرض الصور المعتمدة
                    </button>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold">
                      إشعار العميل بالوصول
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400">طلب ألبوم #ALB-992</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                      بانتظار اعتماد العروس للريتوش
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">ألبوم زفاف مريم الدوسري</h4>
                    <p className="text-xs text-neutral-400 mt-1">ألبوم أبيض لؤلؤي مع صندوق خشب طبيعي محفور يدوياً</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">الصور المحددة من العميل:</span>
                      <span className="font-mono text-white">38 من أصل 40 صورة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">ملاحظات العروس:</span>
                      <span className="text-amber-300 italic">"تنعيم إضاءة الثريا وإبراز زري البشت"</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl text-xs font-bold">
                      فتح الصور في بوابة العميل
                    </button>
                    <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold">
                      إرسال تذكير
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GEAR & FLEET INVENTORY */}
          {activeTab === 'gear' && (
            <div className="space-y-5">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">
                    {lang === 'ar' ? 'سجل معدات استديو بركات والكاميرات الاحترافية' : 'Fleet & Production Gear Inventory'}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    كاميرات السينما، طائرات الدرون المرخصة، ومعدات الإضاءة المعتمدة
                  </p>
                </div>
                <div className="text-xs font-mono bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 text-emerald-400">
                  {equipmentList.filter((e) => e.status === 'available').length} معدة جاهزة للتشغيل
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {equipmentList.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-amber-400 font-bold">{item.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'available'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {item.status === 'available' ? 'جاهز للاستخدام' : 'قيد التصوير الميداني'}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                        سيريال: {item.serialNumber}
                      </div>
                    </div>

                    {item.assignedTo && (
                      <div className="text-[11px] p-2 rounded-lg bg-neutral-950 text-amber-300 border border-neutral-800">
                        مخصص حالياً لـ: {item.assignedTo}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INVOICE GENERATOR & TAX RECEIPT */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">
                    {lang === 'ar' ? 'إصدار الفواتير وعقود السجل التجاري الرسمي' : 'Official Bahrain Invoicing System'}
                  </h3>
                  <span className="text-xs text-neutral-400">
                    {lang === 'ar' ? 'فواتير معتمدة بالدينار البحريني (د.ب) مطابقة لمتطلبات وزارة الصناعة والتجارة' : 'Commercial Registry CR 104829-1 compliance'}
                  </span>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'طباعة / تصدير PDF' : 'Print / Export PDF'}</span>
                </button>
              </div>

              {/* Printable Invoice Sheet */}
              {(() => {
                const targetBooking = selectedBookingForInvoice || bookings[0];
                const vatAmount = Math.round(targetBooking.totalBHD * 0.1);
                const grandTotal = targetBooking.totalBHD;
                const remaining = grandTotal - targetBooking.depositPaidBHD;

                return (
                  <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6 text-neutral-200">
                    {/* Invoice Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-neutral-800 gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Camera className="w-6 h-6 text-amber-400" />
                          <h2 className="text-xl font-extrabold text-white font-serif">
                            {STUDIO_CONTACT.nameAr}
                          </h2>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1 font-mono">
                          {STUDIO_CONTACT.crNumber}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {STUDIO_CONTACT.locationAr}
                        </p>
                      </div>

                      <div className="text-left sm:text-right" dir="ltr">
                        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">
                          TAX INVOICE / فاتورة ضريبية
                        </span>
                        <div className="font-mono text-sm font-bold text-white mt-1">
                          INV-{targetBooking.id}
                        </div>
                        <div className="text-xs text-neutral-400 font-mono">
                          Date: {targetBooking.date}
                        </div>
                      </div>
                    </div>

                    {/* Bill To */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                      <div>
                        <span className="text-neutral-500 block mb-1">فاتورة موجهة إلى (العميل):</span>
                        <span className="font-bold text-white text-sm block">{targetBooking.clientName}</span>
                        <span className="text-neutral-400 font-mono" dir="ltr">{targetBooking.phone}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block mb-1">مكان المناسبة بالبحرين:</span>
                        <span className="font-bold text-amber-300 block">{targetBooking.venue}</span>
                        <span className="text-neutral-400">{targetBooking.eventType}</span>
                      </div>
                    </div>

                    {/* Items Table */}
                    <table className="w-full text-right text-xs">
                      <thead className="border-b border-neutral-800 text-neutral-400 pb-2">
                        <tr>
                          <th className="py-2.5">البند والخدمة</th>
                          <th className="py-2.5 text-center">المدة</th>
                          <th className="py-2.5 text-left">الإجمالي (د.ب)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/80">
                        <tr>
                          <td className="py-3">
                            <span className="font-bold text-white block">{targetBooking.eventType}</span>
                            <span className="text-neutral-400 text-[11px] block mt-0.5">{targetBooking.crew}</span>
                            <span className="text-neutral-400 text-[11px] block">{targetBooking.notes}</span>
                          </td>
                          <td className="py-3 text-center font-mono">{targetBooking.time}</td>
                          <td className="py-3 text-left font-mono font-bold text-white">{targetBooking.totalBHD} د.ب</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Totals Summary */}
                    <div className="pt-4 border-t border-neutral-800 flex justify-end">
                      <div className="w-64 space-y-2 text-xs">
                        <div className="flex justify-between text-neutral-400">
                          <span>المجموع الكلي:</span>
                          <span className="font-mono text-white">{targetBooking.totalBHD} د.ب</span>
                        </div>
                        <div className="flex justify-between text-emerald-400 font-bold">
                          <span>العربون المدفوع (مقبوض):</span>
                          <span className="font-mono">-{targetBooking.depositPaidBHD} د.ب</span>
                        </div>
                        <div className="flex justify-between text-amber-400 font-extrabold text-sm pt-2 border-t border-neutral-800">
                          <span>المتبقي عند التسليم:</span>
                          <span className="font-mono">{remaining} د.ب</span>
                        </div>
                      </div>
                    </div>

                    {/* Official Stamp & Sign */}
                    <div className="pt-8 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                      <div>
                        <span>البريد الإلكتروني: {STUDIO_CONTACT.email}</span>
                        <div className="mt-0.5">الهاتف: {STUDIO_CONTACT.phone}</div>
                      </div>

                      <div className="text-center">
                        <div className="w-24 h-12 border-2 border-dashed border-amber-500/40 rounded-lg flex items-center justify-center text-[10px] text-amber-400 font-bold uppercase rotate-[-3deg]">
                          BARAKAT STUDIO<br />SEEF - BAHRAIN
                        </div>
                        <span className="text-[10px] text-neutral-400 mt-1 block">ختم الاستديو المعتمد</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add New Booking */}
      {showNewBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-950">
              <h3 className="font-bold text-white text-sm">إضافة حجز جديد في استديو بركات</h3>
              <button onClick={() => setShowNewBookingModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewBooking} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-neutral-300 mb-1">اسم العميل / العائلة *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عبد العزيز - المنامة"
                  value={newBooking.clientName}
                  onChange={(e) => setNewBooking({ ...newBooking, clientName: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">رقم الهاتف / واتساب *</label>
                  <input
                    type="text"
                    required
                    placeholder="+973 39XX XXXX"
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-mono"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">الموقع في البحرين</label>
                  <input
                    type="text"
                    value={newBooking.venue}
                    onChange={(e) => setNewBooking({ ...newBooking, venue: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">تاريخ المناسبة</label>
                  <input
                    type="date"
                    required
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">التوقيت</label>
                  <input
                    type="text"
                    value={newBooking.time}
                    onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">المبلغ الإجمالي (د.ب)</label>
                  <input
                    type="number"
                    value={newBooking.totalBHD}
                    onChange={(e) => setNewBooking({ ...newBooking, totalBHD: Number(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">العربون المدفوع (د.ب)</label>
                  <input
                    type="number"
                    value={newBooking.depositPaidBHD}
                    onChange={(e) => setNewBooking({ ...newBooking, depositPaidBHD: Number(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-300 mb-1">ملاحظات والتجهيزات المطلوبة</label>
                <textarea
                  rows={2}
                  value={newBooking.notes}
                  onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs"
                >
                  حفظ وتثبيت الحجز
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewBookingModal(false)}
                  className="px-4 py-3 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-semibold"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
