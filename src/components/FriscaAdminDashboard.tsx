import React, { useState } from 'react';
import { useFrisca } from '../context/FriscaContext';
import { FriscaMenuItem, FriscaCategory, FRISCA_PRESET_LOGOS } from '../data/friscaData';
import { uploadImageApi } from '../services/friscaApi';
import { FriscaLogo } from './FriscaLogo';
import {
  Utensils,
  Type,
  Image as ImageIcon,
  Calendar,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Check,
  X,
  Eye,
  Save,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  Camera,
  Layers,
  MessageCircle,
  KeyRound,
  Shield,
  ShieldCheck,
  LogOut,
  Lock,
  Stamp,
  AlertCircle,
  Globe,
  FolderTree,
  Tag,
  Hash,
  TrendingUp,
  BarChart3,
  Users,
  Activity,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

interface FriscaAdminDashboardProps {
  onExit: () => void;
}

export const FriscaAdminDashboard: React.FC<FriscaAdminDashboardProps> = ({ onExit }) => {
  const {
    adminLang,
    toggleAdminLang,
    adminT,
    siteTexts,
    updateSiteTexts,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    menuStats,
    resetMenuStats,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    galleryImages,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    bookings,
    updateBookingStatus,
    resetToDefaults,
    adminCredentials,
    updateAdminCredentials,
    logoutAdmin,
  } = useFrisca();

  const isAr = adminLang === 'ar';

  const [activeTab, setActiveTab] = useState<
    | 'visuals'
    | 'logo'
    | 'menu'
    | 'categories'
    | 'analytics'
    | 'texts'
    | 'gallery'
    | 'bookings'
    | 'security'
  >('visuals');

  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [uploadErrorMsg, setUploadErrorMsg] = useState('');

  // Security Credentials form state
  const [credUsername, setCredUsername] = useState(adminCredentials.username || 'admin');
  const [credPassword, setCredPassword] = useState(adminCredentials.password || '');
  const [credConfirmPassword, setCredConfirmPassword] = useState('');
  const [showCredPassword, setShowCredPassword] = useState(false);
  const [credErrorMsg, setCredErrorMsg] = useState('');

  // Form states for New / Edit Menu Item (with bilingual descriptions)
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  const [dishForm, setDishForm] = useState<Omit<FriscaMenuItem, 'id'>>({
    nameAr: '',
    nameEn: '',
    category: categories[0]?.id || 'pastas',
    descriptionAr: '',
    descriptionEn: '',
    priceBHD: 6.5,
    image: '',
    tag: '',
  });

  // Form states for New / Edit Category
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState<Omit<FriscaCategory, 'id'> & { id?: string }>({
    id: '',
    nameAr: '',
    nameEn: '',
  });

  // State for Texts editing
  const [textsForm, setTextsForm] = useState(siteTexts);

  // State for Gallery Upload & Editing (Bilingual Arabic & English)
  const [newGalleryTitleAr, setNewGalleryTitleAr] = useState('');
  const [newGalleryTitleEn, setNewGalleryTitleEn] = useState('');
  const [newGalleryImage, setNewGalleryImage] = useState('');
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [editGalleryTitleAr, setEditGalleryTitleAr] = useState('');
  const [editGalleryTitleEn, setEditGalleryTitleEn] = useState('');

  const triggerNotify = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const triggerError = (msg: string) => {
    setUploadErrorMsg(msg);
    setTimeout(() => setUploadErrorMsg(''), 5000);
  };

  // Helper: Compress image to avoid browser storage quota overflow while preserving crispness
  const processAndCompressImage = (
    file: File,
    maxDimension: number,
    quality: number,
    callback: (dataUrl: string) => void
  ) => {
    if (!file.type.startsWith('image/')) {
      triggerError(adminT.errFileNotImage);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      triggerError(adminT.errFileSizeLarge);
      return;
    }

    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => callback(reader.result as string);
      reader.onerror = () => triggerError(adminT.errSelectImage);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          callback(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const outputMime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(outputMime, quality);
        callback(dataUrl);
      };
      img.onerror = () => triggerError(adminT.errSelectImage);
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => triggerError(adminT.errSelectImage);
    reader.readAsDataURL(file);
  };

  // Handle image upload from computer (saves physically on server in /uploads/)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'dish' | 'gallery' | 'hero' | 'identity' | 'logo'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadErrorMsg('');

    const maxDim = target === 'logo' ? 600 : target === 'dish' ? 800 : 1280;
    const qual = target === 'logo' ? 0.95 : 0.85;

    processAndCompressImage(file, maxDim, qual, async (base64) => {
      // 1. عرض فوري للمستخدم
      let finalImageUrl = base64;

      // 2. رفع فعلي إلى السيرفر وحفظ الرابط الدائم في قاعدة البيانات
      try {
        const uploadRes = await uploadImageApi(base64);
        if (uploadRes.success && uploadRes.url) {
          finalImageUrl = uploadRes.url;
        }
      } catch (err) {
        console.warn('Fallback to base64 if server upload endpoint unavailable:', err);
      }

      if (target === 'logo') {
        setTextsForm((prev) => ({ ...prev, logoUrl: finalImageUrl }));
        await updateSiteTexts({ logoUrl: finalImageUrl });
        triggerNotify(adminT.logoSavedSuccess);
      } else if (target === 'dish') {
        setDishForm((prev) => ({ ...prev, image: finalImageUrl }));
        triggerNotify(adminT.dishImageUpdatedSuccess);
      } else if (target === 'gallery') {
        setNewGalleryImage(finalImageUrl);
        triggerNotify(adminT.galleryAddedSuccess);
      } else if (target === 'hero') {
        setTextsForm((prev) => ({
          ...prev,
          hero: { ...prev.hero, image: finalImageUrl },
        }));
        await updateSiteTexts({ hero: { ...siteTexts.hero, image: finalImageUrl } });
        triggerNotify(adminT.visualsSavedSuccess);
      } else if (target === 'identity') {
        setTextsForm((prev) => ({
          ...prev,
          identity: { ...prev.identity, image: finalImageUrl },
        }));
        await updateSiteTexts({ identity: { ...siteTexts.identity, image: finalImageUrl } });
        triggerNotify(adminT.visualsSavedSuccess);
      }
    });
  };

  // Menu Dish Submit
  const handleDishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishForm.nameAr.trim() || !dishForm.nameEn.trim()) {
      triggerError(adminT.errFillRequiredFields);
      return;
    }

    if (editingDishId) {
      await updateMenuItem(editingDishId, dishForm);
      triggerNotify(adminT.dishUpdatedSuccess);
      setEditingDishId(null);
    } else {
      await addMenuItem({
        ...dishForm,
        image: dishForm.image || '/src/assets/images/frisca_signature_pasta_1791674240410.jpg',
      });
      triggerNotify(adminT.dishAddedSuccess);
    }

    setIsAddDishOpen(false);
    setDishForm({
      nameAr: '',
      nameEn: '',
      category: categories[0]?.id || 'pastas',
      descriptionAr: '',
      descriptionEn: '',
      priceBHD: 6.5,
      image: '',
      tag: '',
    });
  };

  const handleEditDish = (dish: FriscaMenuItem) => {
    setEditingDishId(dish.id);
    setDishForm({
      nameAr: dish.nameAr,
      nameEn: dish.nameEn,
      category: dish.category,
      descriptionAr: dish.descriptionAr || '',
      descriptionEn: dish.descriptionEn || '',
      priceBHD: dish.priceBHD,
      image: dish.image,
      tag: dish.tag || '',
    });
    setIsAddDishOpen(true);
  };

  // Category Submit
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.nameAr.trim() || !categoryForm.nameEn.trim()) {
      triggerError(adminT.errFillCategoryFields);
      return;
    }

    if (editingCategoryId) {
      await updateCategory(editingCategoryId, {
        nameAr: categoryForm.nameAr.trim(),
        nameEn: categoryForm.nameEn.trim(),
      });
      triggerNotify(adminT.catUpdatedSuccess);
      setEditingCategoryId(null);
    } else {
      const result = await addCategory({
        id: categoryForm.id?.trim() || undefined,
        nameAr: categoryForm.nameAr.trim(),
        nameEn: categoryForm.nameEn.trim(),
      });
      if (!result.success) {
        triggerError(result.message || adminT.errFillCategoryFields);
        return;
      }
      triggerNotify(adminT.catAddedSuccess);
    }

    setIsAddCategoryOpen(false);
    setCategoryForm({ id: '', nameAr: '', nameEn: '' });
  };

  const handleEditCategory = (cat: FriscaCategory) => {
    setEditingCategoryId(cat.id);
    setCategoryForm({
      id: cat.id,
      nameAr: cat.nameAr,
      nameEn: cat.nameEn,
    });
    setIsAddCategoryOpen(true);
  };

  const handleDeleteCategory = async (cat: FriscaCategory) => {
    const linkedCount = menuItems.filter((d) => d.category === cat.id).length;
    if (linkedCount > 0) {
      triggerError(adminT.cannotDeleteCategoryWithDishes.replace('أطباق مرتبطة', `${linkedCount} ${adminT.catDishesCount}`));
      return;
    }
    const res = await deleteCategory(cat.id);
    if (res.success) {
      triggerNotify(adminT.catDeletedSuccess);
    } else {
      triggerError(res.message || adminT.cannotDeleteCategoryWithDishes);
    }
  };

  // Save visual controls
  const handleSaveVisuals = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteTexts({
      hero: textsForm.hero,
      identity: textsForm.identity,
      gallery: textsForm.gallery,
    });
    triggerNotify(adminT.visualsSavedSuccess);
  };

  // Texts Submit
  const handleSaveTexts = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteTexts(textsForm);
    triggerNotify(adminT.textsSavedSuccess);
  };

  // Gallery Submit (Bilingual)
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryImage) return;

    const titleAr = newGalleryTitleAr.trim();
    const titleEn = newGalleryTitleEn.trim();

    if (!titleAr && !titleEn) {
      triggerError(adminT.errFillRequiredFields);
      return;
    }

    const mainTitle = titleAr || titleEn;
    await addGalleryImage({
      title: mainTitle,
      titleAr: titleAr || mainTitle,
      titleEn: titleEn || mainTitle,
      image: newGalleryImage,
    });
    triggerNotify(adminT.galleryAddedSuccess);
    setNewGalleryTitleAr('');
    setNewGalleryTitleEn('');
    setNewGalleryImage('');
  };

  const handleSaveEditGallery = async (id: string) => {
    const titleAr = editGalleryTitleAr.trim();
    const titleEn = editGalleryTitleEn.trim();

    if (!titleAr && !titleEn) {
      triggerError(adminT.errFillRequiredFields);
      return;
    }

    await updateGalleryImage(id, {
      titleAr: titleAr || titleEn,
      titleEn: titleEn || titleAr,
      title: titleAr || titleEn,
    });
    triggerNotify(adminT.visualsSavedSuccess);
    setEditingGalleryId(null);
    setEditGalleryTitleAr('');
    setEditGalleryTitleEn('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#120407] text-[#f7f3f1] flex flex-col font-sans overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Top Bar of Dashboard */}
      <header className="bg-[#1b0609] border-b border-[#3b0f15] px-3 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between shrink-0 shadow-xl gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <FriscaLogo size={26} className="sm:hidden" />
          <FriscaLogo size={36} className="hidden sm:flex" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-wide font-serif leading-none">
                {adminT.title}
              </h1>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#e0b4b8] hidden sm:block mt-0.5">
              {adminT.subtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {uploadErrorMsg && (
            <span className="text-[11px] sm:text-xs font-bold text-rose-300 bg-rose-950/90 px-2 sm:px-3 py-1 rounded-lg border border-rose-700/60 flex items-center gap-1.5 animate-shake max-w-[130px] sm:max-w-none truncate">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate">{uploadErrorMsg}</span>
            </span>
          )}
          {saveSuccessMsg && (
            <span className="text-[11px] sm:text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 sm:px-3 py-1 rounded-lg border border-emerald-700/50 flex items-center gap-1.5 animate-pulse max-w-[130px] sm:max-w-none truncate">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{saveSuccessMsg}</span>
            </span>
          )}

          {/* Language Switcher Button (English / العربية) */}
          <button
            onClick={toggleAdminLang}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#2b0c10] border border-[#52131b] hover:border-[#d4a373] text-white hover:text-[#d4a373] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
            title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#d4a373]" />
            <span className="hidden sm:inline">{isAr ? 'English' : 'العربية'}</span>
            <span className="sm:hidden">{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* View site */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onExit();
            }}
            className="p-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-[#1a0508] text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
            title={adminT.previewSite}
          >
            <Eye className="w-3.5 h-3.5 text-[#782229]" />
            <span className="hidden sm:inline">{adminT.previewSite}</span>
          </a>

          {/* Logout */}
          <button
            onClick={() => {
              logoutAdmin();
              onExit();
            }}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-red-950/70 border border-red-800/60 hover:bg-red-900 text-red-200 hover:text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
            title={adminT.logout}
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">{adminT.logout}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Tabs */}
        <aside
          className={`w-64 bg-[#170407] ${
            isAr ? 'border-l' : 'border-r'
          } border-[#3b0f15]/50 p-4 shrink-0 flex flex-col justify-between hidden md:flex`}
        >
          <div className="space-y-1.5 text-xs font-bold">
            <span className="text-[10px] font-bold text-[#e0b4b8]/70 uppercase tracking-wider block px-3 mb-2">
              {adminT.sidebarTitle}
            </span>

            {/* TAB: VISUALS */}
            <button
              onClick={() => setActiveTab('visuals')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'visuals'
                  ? 'bg-[#782229] text-white shadow-md'
                  : 'text-[#e0b4b8] hover:text-white hover:bg-[#25080d]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="w-4 h-4 text-[#d4a373]" />
                <span>{adminT.tabVisuals}</span>
              </div>
            </button>

            {/* TAB: RESTAURANT LOGO */}
            <button
              onClick={() => setActiveTab('logo')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'logo'
                  ? 'bg-[#782229] text-white shadow-md'
                  : 'text-[#e0b4b8] hover:text-white hover:bg-[#25080d]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Stamp className="w-4 h-4 text-[#d4a373]" />
                <span>{adminT.tabLogo}</span>
              </div>
              <span className="text-[9px] bg-amber-500/20 text-[#d4a373] px-1.5 py-0.5 rounded font-bold">
                {adminT.tabLogoBadge}
              </span>
            </button>

            {/* TAB: MENU DISHES */}
            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-[#782229] text-white shadow-md'
                  : 'text-[#e0b4b8] hover:text-white hover:bg-[#25080d]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Utensils className="w-4 h-4 text-[#d4a373]" />
                <span>{adminT.tabMenu}</span>
              </div>
              <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-mono">
                {menuItems.length}
              </span>
            </button>

            {/* TAB: CATEGORIES MANAGEMENT (New Independent Tab) */}
            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-[#782229] text-white shadow-md'
                  : 'text-[#e0b4b8] hover:text-white hover:bg-[#25080d]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderTree className="w-4 h-4 text-[#d4a373]" />
                <span>{adminT.tabCategories}</span>
              </div>
              <span className="text-[10px] bg-[#d4a373]/20 text-[#d4a373] px-1.5 py-0.5 rounded font-mono font-bold">
                {categories.length}
              </span>
            </button>

            {/* TAB: MENU VISITOR ANALYTICS & STATS */}
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#782229] text-white shadow-md'
                  : 'text-[#e0b4b8] hover:text-white hover:bg-[#25080d]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-[#d4a373]" />
                <span>{adminT.tabAnalytics}</span>
              </div>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                {adminT.tabAnalyticsBadge}
              </span>
            </button>

            {/* TAB: GALLERY */}
            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#782229] text-white shadow-md'
                  : 'text-[#e0b4b8] hover:text-white hover:bg-[#25080d]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4 text-[#d4a373]" />
                <span>{adminT.tabGallery}</span>
              </div>
              <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-mono">
                {galleryImages.length}
              </span>
            </button>

            {/* TAB: TEXTS */}
            <button
              onClick={() => setActiveTab('texts')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'texts'
                  ? 'bg-[#782229] text-white shadow-md'
                  : 'text-[#e0b4b8] hover:text-white hover:bg-[#25080d]'
              }`}
            >
              <Type className="w-4 h-4 text-[#d4a373]" />
              <span>{adminT.tabTexts}</span>
            </button>

            {/* TAB: BOOKINGS */}
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#782229] text-white shadow-md'
                  : 'text-[#e0b4b8] hover:text-white hover:bg-[#25080d]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#d4a373]" />
                <span>{adminT.tabBookings}</span>
              </div>
              <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-mono">
                {bookings.length}
              </span>
            </button>

            {/* TAB: SECURITY */}
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#782229] text-white shadow-md'
                  : 'text-[#e0b4b8] hover:text-white hover:bg-[#25080d]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-4 h-4 text-[#d4a373]" />
                <span>{adminT.tabSecurity}</span>
              </div>
              <span className="text-[9px] bg-amber-500/20 text-[#d4a373] px-1.5 py-0.5 rounded font-mono">
                {adminCredentials.username}
              </span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[#22070c] border border-[#3b0f15] text-[11px] space-y-1 text-[#e0b4b8]">
            <span className="text-white font-bold block">{adminT.securityHintTitle}</span>
            <p>{adminT.securityHintDesc}</p>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#140407]">
          {/* Mobile Tab Selector */}
          <div className="flex md:hidden gap-1.5 pb-2.5 mb-4 overflow-x-auto border-b border-[#3b0f15] scrollbar-none px-0.5">
            {[
              { id: 'visuals', label: adminT.tabVisuals.split(' ')[0], icon: SlidersHorizontal },
              { id: 'logo', label: adminT.tabLogo.split(' ')[0], icon: Stamp },
              { id: 'menu', label: adminT.tabMenu.split(' ')[0], count: menuItems.length, icon: Utensils },
              { id: 'categories', label: adminT.tabCategories, count: categories.length, icon: FolderTree },
              { id: 'analytics', label: adminT.tabAnalytics.split(' ')[0], icon: TrendingUp },
              { id: 'gallery', label: adminT.tabGallery.split(' ')[0], count: galleryImages.length, icon: ImageIcon },
              { id: 'texts', label: adminT.tabTexts.split(' ')[0], icon: Type },
              { id: 'bookings', label: adminT.tabBookings, count: bookings.length, icon: Calendar },
              { id: 'security', label: adminT.tabSecurity.split(' ')[0], icon: KeyRound },
            ].map(({ id, label, icon: TabIcon, count }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-[#782229] text-white shadow-md font-extrabold'
                      : 'bg-[#22070c] text-[#e0b4b8] border border-[#3b0f15]/80 hover:text-white'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                  <span>{label}</span>
                  {typeof count === 'number' && (
                    <span className="text-[10px] font-mono opacity-80">({count})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB 1: VISUAL CONTROLS */}
          {activeTab === 'visuals' && (
            <form onSubmit={handleSaveVisuals} className="space-y-6 max-w-4xl animate-fade-in">
              <div className="flex items-center justify-between bg-[#1e070c] p-4 rounded-2xl border border-[#3b0f15]">
                <div>
                  <h2 className="text-lg font-extrabold text-white">{adminT.visualsHeaderTitle}</h2>
                  <p className="text-xs text-[#e0b4b8]">{adminT.visualsHeaderSub}</p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-[#1a0508] font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#782229]" />
                  <span>{adminT.saveChanges}</span>
                </button>
              </div>

              {/* Hero Image & Opacity Slider */}
              <div className="bg-[#1e070c] p-5 rounded-2xl border border-[#3b0f15] space-y-4">
                <div className="flex items-center justify-between border-b border-[#3b0f15] pb-3">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#d4a373]" />
                    <span>{adminT.heroSectionTitle}</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#d4a373] bg-[#120407] px-2.5 py-1 rounded-lg border border-[#3b0f15]">
                    {adminT.heroCurrentOpacity} {textsForm.hero.opacity ?? 50}%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-5 space-y-2">
                    <div className="h-32 rounded-xl overflow-hidden border border-[#481119] bg-[#120407] relative">
                      <img
                        src={textsForm.hero.image || siteTexts.hero.image}
                        alt="Hero Preview"
                        className="w-full h-full object-cover"
                        style={{ opacity: (textsForm.hero.opacity ?? 50) / 100 }}
                      />
                      <div className="absolute inset-0 bg-[#1a0508]/40" />
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white">
                        {adminT.previewOpacity} {textsForm.hero.opacity ?? 50}%
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#e0b4b8] font-bold mb-1">
                        {adminT.changeHeroImage}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'hero')}
                        className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2 text-xs text-[#e0b4b8] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#782229] file:text-white file:font-bold cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-3 bg-[#150407] p-4 rounded-xl border border-[#3b0f15]">
                    <div>
                      <div className="flex items-center justify-between text-xs text-white font-bold mb-1.5">
                        <span>{adminT.opacitySliderLabel}</span>
                        <span className="font-mono text-[#d4a373] font-extrabold text-sm">
                          {textsForm.hero.opacity ?? 50}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={textsForm.hero.opacity ?? 50}
                        onChange={(e) =>
                          setTextsForm({
                            ...textsForm,
                            hero: { ...textsForm.hero, opacity: parseInt(e.target.value) },
                          })
                        }
                        className="w-full accent-[#782229] cursor-pointer h-2 bg-[#2d0a11] rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity Lounge Image */}
              <div className="bg-[#1e070c] p-5 rounded-2xl border border-[#3b0f15] space-y-4">
                <div className="border-b border-[#3b0f15] pb-3">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#d4a373]" />
                    <span>{adminT.identitySectionTitle}</span>
                  </h3>
                  <p className="text-[11px] text-[#e0b4b8] mt-0.5">{adminT.identitySectionSub}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4 flex justify-center">
                    <div className="w-48 h-36 rounded-xl overflow-hidden border border-[#481119] bg-[#120407] relative shadow-md">
                      <img
                        src={textsForm.identity.image || siteTexts.identity.image}
                        alt="Identity Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        {adminT.changeIdentityImage}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'identity')}
                        className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2 text-xs text-[#e0b4b8] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#782229] file:text-white file:font-bold cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white hover:bg-neutral-100 text-[#1a0508] font-extrabold text-sm shadow-md cursor-pointer transition-all"
              >
                {adminT.saveAllVisualsBtn}
              </button>
            </form>
          )}

          {/* TAB: RESTAURANT LOGO & BRANDING */}
          {activeTab === 'logo' && (
            <div className="space-y-6 max-w-4xl animate-fade-in">
              <div className="bg-[#1e070c] p-5 rounded-2xl border border-[#3b0f15] space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3d0e15] border border-[#782229] text-[#d4a373] text-[11px] font-bold">
                  <Stamp className="w-3.5 h-3.5" />
                  <span>{adminT.logoBadge}</span>
                </div>
                <h2 className="text-xl font-black text-white font-serif">{adminT.logoHeaderTitle}</h2>
                <p className="text-xs text-[#e0b4b8] leading-relaxed">{adminT.logoHeaderSub}</p>
              </div>

              {/* Live Preview */}
              <div className="bg-[#1e070c] p-6 rounded-2xl border border-[#3b0f15] space-y-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2 pb-2 border-b border-[#3b0f15]">
                  <Eye className="w-4 h-4 text-[#d4a373]" />
                  <span>{adminT.logoLivePreviewTitle}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#120407] rounded-2xl border border-[#481119] space-y-3">
                    <div className="p-4 bg-[#1b0609] border border-[#782229]/60 rounded-2xl shadow-xl flex items-center justify-center min-w-[120px] min-h-[120px]">
                      <FriscaLogo size={90} />
                    </div>
                    <div className="text-center">
                      <span className="font-extrabold text-lg text-white font-serif block">FRISCA</span>
                      <span className="text-[11px] text-[#e0b4b8]">
                        {siteTexts.logoUrl ? adminT.logoActiveNotice : adminT.logoDefaultNotice}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <span className="text-xs text-[#e0b4b8] font-bold block">
                      {adminT.logoNavbarSimLabel}
                    </span>
                    <div className="p-3 bg-[#1b0609] rounded-xl border border-[#3b0f15] flex items-center justify-between shadow-inner">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-white font-serif">FRISCA</span>
                        <FriscaLogo size={28} />
                      </div>
                      <div className="flex gap-1.5 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-[#330c12] text-white">
                          {adminT.logoNavHome}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#330c12] text-white">
                          {adminT.logoNavMenu}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white text-[#1a0508] font-bold">
                          {adminT.logoNavBook}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#150407] rounded-xl border border-[#3b0f15] text-[11px] text-[#e0b4b8] space-y-1">
                      <span className="text-emerald-400 font-bold block">
                        {adminT.logoAspectTitle}
                      </span>
                      <p>{adminT.logoAspectDesc}</p>
                    </div>

                    {siteTexts.logoUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setTextsForm((prev) => ({ ...prev, logoUrl: '' }));
                          updateSiteTexts({ logoUrl: '' });
                          triggerNotify(adminT.logoRestoredSuccess);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#2b0c10] hover:bg-[#3d1117] text-[#e0b4b8] hover:text-white text-xs font-bold border border-[#481119] flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-[#d4a373]" />
                        <span>{adminT.logoRestoreDefaultBtn}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Upload Custom Logo */}
              <div className="bg-[#1e070c] p-6 rounded-2xl border border-[#3b0f15] space-y-4">
                <div className="border-b border-[#3b0f15] pb-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#d4a373]" />
                    <span>{adminT.logoUploadTitle}</span>
                  </h3>
                  <p className="text-[11px] text-[#e0b4b8] mt-0.5">{adminT.logoUploadSub}</p>
                </div>

                <div className="p-4 rounded-xl border-2 border-dashed border-[#5c1620] hover:border-[#d4a373] bg-[#120407] transition-colors text-center">
                  <input
                    type="file"
                    id="custom-logo-upload"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'logo')}
                    className="hidden"
                  />
                  <label
                    htmlFor="custom-logo-upload"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2 py-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#2b0c10] border border-[#52131b] flex items-center justify-center text-[#d4a373]">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      {adminT.logoUploadClickLabel}
                    </span>
                    <span className="text-[10px] text-[#e0b4b8]">{adminT.logoUploadFormats}</span>
                  </label>
                </div>
              </div>

              {/* 3 Presets */}
              <div className="bg-[#1e070c] p-6 rounded-2xl border border-[#3b0f15] space-y-4">
                <div className="border-b border-[#3b0f15] pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#d4a373]" />
                      <span>{adminT.logoPresetsTitle}</span>
                    </h3>
                    <span className="text-[10px] text-[#d4a373] font-bold bg-[#2b0c10] px-2 py-0.5 rounded border border-[#52131b]">
                      {adminT.logoPresetsReady}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#e0b4b8] mt-0.5">{adminT.logoPresetsSub}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Preset 1 */}
                  <div
                    onClick={() => {
                      setTextsForm((prev) => ({ ...prev, logoUrl: 'preset:badge-crest' }));
                      updateSiteTexts({ logoUrl: 'preset:badge-crest' });
                      triggerNotify(adminT.logoPresetAppliedSuccess);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center justify-between space-y-3 ${
                      siteTexts.logoUrl === 'preset:badge-crest' || !siteTexts.logoUrl
                        ? 'bg-[#330c12] border-[#d4a373] shadow-lg ring-1 ring-[#d4a373]'
                        : 'bg-[#150407] border-[#3b0f15] hover:border-[#782229]'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-[#782229] border border-[#9b2c35] flex items-center justify-center shadow">
                      <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12">
                        <circle cx="50" cy="50" r="46" stroke="#d4a373" strokeWidth="2" strokeDasharray="4 2" />
                        <path d="M 32 26 L 68 26 C 71 26, 73 28, 73 31 C 73 34, 71 36, 68 36 L 42 36 L 42 46 L 62 46 C 65 46, 67 48, 67 51 C 67 54, 65 56, 62 56 L 42 56 L 42 74 C 42 77, 40 79, 37 79 C 34 79, 32 77, 32 74 Z" fill="#FFFFFF" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{adminT.logoPreset1Title}</h4>
                      <p className="text-[10px] text-[#e0b4b8] mt-1 leading-snug">{adminT.logoPreset1Desc}</p>
                    </div>
                    <button
                      type="button"
                      className={`w-full py-1.5 rounded-lg text-[11px] font-bold ${
                        siteTexts.logoUrl === 'preset:badge-crest' || !siteTexts.logoUrl
                          ? 'bg-[#d4a373] text-[#1a0508]'
                          : 'bg-[#2b0c10] text-[#e0b4b8] hover:text-white'
                      }`}
                    >
                      {siteTexts.logoUrl === 'preset:badge-crest' || !siteTexts.logoUrl
                        ? adminT.logoActiveBtn
                        : adminT.logoSelectApplyBtn}
                    </button>
                  </div>

                  {/* Preset 2 */}
                  <div
                    onClick={() => {
                      setTextsForm((prev) => ({ ...prev, logoUrl: 'preset:modern-monogram' }));
                      updateSiteTexts({ logoUrl: 'preset:modern-monogram' });
                      triggerNotify(adminT.logoPresetAppliedSuccess);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center justify-between space-y-3 ${
                      siteTexts.logoUrl === 'preset:modern-monogram'
                        ? 'bg-[#330c12] border-[#d4a373] shadow-lg ring-1 ring-[#d4a373]'
                        : 'bg-[#150407] border-[#3b0f15] hover:border-[#782229]'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#64161f] border-2 border-[#d4a373] flex items-center justify-center shadow">
                      <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12">
                        <path d="M32 30 L40 37 L50 25 L60 37 L68 30 L64 42 L36 42 Z" fill="#d4a373" />
                        <path d="M38 48 H62 M38 60 H54 M38 48 V76" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{adminT.logoPreset2Title}</h4>
                      <p className="text-[10px] text-[#e0b4b8] mt-1 leading-snug">{adminT.logoPreset2Desc}</p>
                    </div>
                    <button
                      type="button"
                      className={`w-full py-1.5 rounded-lg text-[11px] font-bold ${
                        siteTexts.logoUrl === 'preset:modern-monogram'
                          ? 'bg-[#d4a373] text-[#1a0508]'
                          : 'bg-[#2b0c10] text-[#e0b4b8] hover:text-white'
                      }`}
                    >
                      {siteTexts.logoUrl === 'preset:modern-monogram'
                        ? adminT.logoActiveBtn
                        : adminT.logoSelectApplyBtn}
                    </button>
                  </div>

                  {/* Preset 3 */}
                  <div
                    onClick={() => {
                      setTextsForm((prev) => ({ ...prev, logoUrl: 'preset:chef-culinary' }));
                      updateSiteTexts({ logoUrl: 'preset:chef-culinary' });
                      triggerNotify(adminT.logoPresetAppliedSuccess);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center justify-between space-y-3 ${
                      siteTexts.logoUrl === 'preset:chef-culinary'
                        ? 'bg-[#330c12] border-[#d4a373] shadow-lg ring-1 ring-[#d4a373]'
                        : 'bg-[#150407] border-[#3b0f15] hover:border-[#782229]'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-[#1e0508] border-2 border-[#782229] flex items-center justify-center shadow">
                      <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12">
                        <circle cx="50" cy="50" r="40" fill="#782229" stroke="#d4a373" strokeWidth="1.5" strokeDasharray="3 2" />
                        <path d="M40 38 C35 38 34 32 39 30 C41 24 48 24 50 27 C53 23 60 24 61 30 C66 31 65 38 60 38 Z" fill="#FFFFFF" />
                        <rect x="41" y="39" width="18" height="4" rx="1" fill="#d4a373" />
                        <text x="50" y="68" fill="#FFFFFF" fontSize="26" fontWeight="900" fontFamily="serif" textAnchor="middle">F</text>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{adminT.logoPreset3Title}</h4>
                      <p className="text-[10px] text-[#e0b4b8] mt-1 leading-snug">{adminT.logoPreset3Desc}</p>
                    </div>
                    <button
                      type="button"
                      className={`w-full py-1.5 rounded-lg text-[11px] font-bold ${
                        siteTexts.logoUrl === 'preset:chef-culinary'
                          ? 'bg-[#d4a373] text-[#1a0508]'
                          : 'bg-[#2b0c10] text-[#e0b4b8] hover:text-white'
                      }`}
                    >
                      {siteTexts.logoUrl === 'preset:chef-culinary'
                        ? adminT.logoActiveBtn
                        : adminT.logoSelectApplyBtn}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MENU DISHES */}
          {activeTab === 'menu' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e070c] p-4 rounded-2xl border border-[#3b0f15]">
                <div>
                  <h2 className="text-lg font-extrabold text-white">{adminT.menuHeaderTitle}</h2>
                  <p className="text-xs text-[#e0b4b8]">{adminT.menuHeaderSub}</p>
                </div>
                <button
                  onClick={() => {
                    setEditingDishId(null);
                    setDishForm({
                      nameAr: '',
                      nameEn: '',
                      category: categories[0]?.id || 'pastas',
                      descriptionAr: '',
                      descriptionEn: '',
                      priceBHD: 6.5,
                      image: '',
                      tag: '',
                    });
                    setIsAddDishOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-100 text-[#1a0508] font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4 text-[#782229]" />
                  <span>{adminT.addNewDishBtn}</span>
                </button>
              </div>

              {/* Menu Visitors Analytics Mini-Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#1e070c] p-4 rounded-2xl border border-[#3b0f15]">
                <div className="p-3 bg-[#120407] rounded-xl border border-[#2b080f] flex flex-col justify-between">
                  <span className="text-[10px] text-[#e0b4b8] flex items-center gap-1 font-bold">
                    <TrendingUp className="w-3 h-3 text-[#d4a373]" />
                    <span>{adminT.statTotalVisits}</span>
                  </span>
                  <span className="text-base sm:text-lg font-black text-white font-mono mt-1">
                    {menuStats.totalVisits.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-[#120407] rounded-xl border border-[#2b080f] flex flex-col justify-between">
                  <span className="text-[10px] text-[#e0b4b8] flex items-center gap-1 font-bold">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{adminT.statTodayVisits}</span>
                  </span>
                  <span className="text-base sm:text-lg font-black text-emerald-400 font-mono mt-1">
                    {menuStats.todayVisits.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-[#120407] rounded-xl border border-[#2b080f] flex flex-col justify-between">
                  <span className="text-[10px] text-[#e0b4b8] flex items-center gap-1 font-bold">
                    <Users className="w-3 h-3 text-sky-400" />
                    <span>{adminT.statUniqueVisitors}</span>
                  </span>
                  <span className="text-base sm:text-lg font-black text-white font-mono mt-1">
                    {menuStats.uniqueVisitors.toLocaleString()}
                  </span>
                </div>
                <div
                  onClick={() => setActiveTab('analytics')}
                  className="p-3 bg-[#26080f] hover:bg-[#380c16] rounded-xl border border-[#52131b] flex flex-col justify-between cursor-pointer transition-colors group"
                >
                  <span className="text-[10px] text-[#d4a373] flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{adminT.statTotalDishViews}</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <span className="text-base sm:text-lg font-black text-white font-mono mt-1">
                    {menuStats.totalDishViews.toLocaleString()}
                  </span>
                </div>
              </div>

              {menuItems.length === 0 ? (
                <div className="text-center py-16 bg-[#1e070c] rounded-2xl border border-[#3b0f15] space-y-3">
                  <Utensils className="w-10 h-10 text-[#d4a373] mx-auto opacity-70" />
                  <p className="text-sm font-bold text-white">{adminT.noDishesNotice}</p>
                  <p className="text-xs text-[#e0b4b8]">{adminT.noDishesSub}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                  {menuItems.map((dish) => {
                    const matchedCat = categories.find((c) => c.id === dish.category);
                    const categoryLabel = matchedCat
                      ? isAr
                        ? matchedCat.nameAr
                        : matchedCat.nameEn || matchedCat.nameAr
                      : dish.category;

                    return (
                      <div
                        key={dish.id}
                        className="p-4 rounded-2xl bg-[#1e070c] border border-[#3b0f15] hover:border-[#782229] transition-all flex flex-col justify-between shadow-lg"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <img
                              src={dish.image}
                              alt={dish.nameAr}
                              className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#481119]"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-white text-sm leading-snug truncate">
                                {isAr ? dish.nameAr : dish.nameEn || dish.nameAr}
                              </h3>
                              <span className="text-[11px] text-[#d4a373] font-mono block truncate" dir="ltr">
                                {isAr ? dish.nameEn : dish.nameAr}
                              </span>
                              <span className="text-xs font-extrabold text-white font-mono mt-1 block">
                                {dish.priceBHD.toFixed(1)} {adminT.currency}
                              </span>
                            </div>
                          </div>

                          {/* Bilingual Description Snippets */}
                          <div className="space-y-1 bg-[#120407] p-2.5 rounded-xl border border-[#2b080f] text-xs">
                            {dish.descriptionAr && (
                              <div className="flex items-start gap-1.5" dir="rtl">
                                <span className="text-[10px] font-bold text-[#d4a373] shrink-0">عربي:</span>
                                <p className="text-[#e0b4b8] line-clamp-2 text-[11px] leading-relaxed">
                                  {dish.descriptionAr}
                                </p>
                              </div>
                            )}
                            {dish.descriptionEn && (
                              <div className="flex items-start gap-1.5" dir="ltr">
                                <span className="text-[10px] font-bold text-[#d4a373] shrink-0 font-mono">EN:</span>
                                <p className="text-[#e0b4b8] line-clamp-2 text-[11px] leading-relaxed font-sans">
                                  {dish.descriptionEn}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 pt-1 text-[11px]">
                            <span className="px-2 py-0.5 rounded bg-[#2c0a10] text-[#e0b4b8] border border-[#481119]">
                              {categoryLabel}
                            </span>
                            {dish.tag && (
                              <span className="px-2 py-0.5 rounded bg-[#782229] text-white font-bold">
                                {dish.tag}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-[#3b0f15]/50">
                          <label
                            className="px-2.5 py-1.5 rounded-lg bg-[#24080e] hover:bg-[#3d0e15] border border-[#52131b] text-[#d4a373] hover:text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            title={adminT.changeImageBtn}
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{adminT.changeImageBtn}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                processAndCompressImage(file, 800, 0.85, (base64) => {
                                  updateMenuItem(dish.id, { image: base64 });
                                  triggerNotify(adminT.dishImageUpdatedSuccess);
                                });
                              }}
                              className="hidden"
                            />
                          </label>
                          <button
                            onClick={() => handleEditDish(dish)}
                            className="px-3 py-1.5 rounded-lg bg-[#2d0b11] hover:bg-[#3f1019] text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-[#d4a373]" />
                            <span>{adminT.editBtn}</span>
                          </button>
                          <button
                            onClick={() => {
                              deleteMenuItem(dish.id);
                              triggerNotify(adminT.dishDeletedSuccess);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#2d0b11] hover:bg-rose-950 text-rose-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{adminT.deleteBtn}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB: CATEGORIES MANAGEMENT (NEW SECTION) */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e070c] p-4 rounded-2xl border border-[#3b0f15]">
                <div>
                  <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <FolderTree className="w-5 h-5 text-[#d4a373]" />
                    <span>{adminT.categoriesHeaderTitle}</span>
                  </h2>
                  <p className="text-xs text-[#e0b4b8] mt-0.5">{adminT.categoriesHeaderSub}</p>
                </div>
                <button
                  onClick={() => {
                    setEditingCategoryId(null);
                    setCategoryForm({ id: '', nameAr: '', nameEn: '' });
                    setIsAddCategoryOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-100 text-[#1a0508] font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4 text-[#782229]" />
                  <span>{adminT.addNewCategoryBtn}</span>
                </button>
              </div>

              {categories.length === 0 ? (
                <div className="text-center py-16 bg-[#1e070c] rounded-2xl border border-[#3b0f15] space-y-3">
                  <FolderTree className="w-10 h-10 text-[#d4a373] mx-auto opacity-70" />
                  <p className="text-sm font-bold text-white">{adminT.noCategoriesNotice}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                  {categories.map((cat) => {
                    const linkedDishes = menuItems.filter((d) => d.category === cat.id);
                    return (
                      <div
                        key={cat.id}
                        className="p-5 rounded-2xl bg-[#1e070c] border border-[#3b0f15] hover:border-[#782229] transition-all flex flex-col justify-between shadow-lg space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-bold text-white text-base leading-snug">
                                {cat.nameAr}
                              </h3>
                              <span className="text-xs text-[#d4a373] font-sans font-medium block mt-0.5" dir="ltr">
                                {cat.nameEn}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold bg-[#120407] text-[#e0b4b8] px-2 py-1 rounded-lg border border-[#3b0f15] shrink-0">
                              ID: {cat.id}
                            </span>
                          </div>

                          <div className="p-3 bg-[#120407] rounded-xl border border-[#2b080f] flex items-center justify-between text-xs">
                            <span className="text-[#e0b4b8] flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5 text-[#d4a373]" />
                              <span>{adminT.catDishesCount}:</span>
                            </span>
                            <span
                              className={`font-mono font-extrabold px-2.5 py-0.5 rounded-full ${
                                linkedDishes.length > 0
                                  ? 'bg-[#782229] text-white'
                                  : 'bg-[#22070c] text-neutral-400'
                              }`}
                            >
                              {linkedDishes.length}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#3b0f15]/50">
                          <button
                            onClick={() => handleEditCategory(cat)}
                            className="px-3 py-1.5 rounded-lg bg-[#2d0b11] hover:bg-[#3f1019] text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-[#d4a373]" />
                            <span>{adminT.editBtn}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat)}
                            className="px-3 py-1.5 rounded-lg bg-[#2d0b11] hover:bg-rose-950 text-rose-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{adminT.deleteBtn}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB: MENU VISITOR ANALYTICS & STATS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              {/* Header Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e070c] p-4 sm:p-5 rounded-2xl border border-[#3b0f15]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#d4a373]" />
                      <span>{adminT.analyticsHeaderTitle}</span>
                    </h2>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{adminT.liveIndicator}</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#e0b4b8]">{adminT.analyticsHeaderSub}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetMenuStats();
                      triggerNotify(adminT.statsResetSuccess);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#26080f] hover:bg-[#380c16] text-[#e0b4b8] hover:text-white border border-[#481119] hover:border-[#d4a373]/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
                    title={adminT.resetStatsBtn}
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#d4a373]" />
                    <span>{adminT.resetStatsBtn}</span>
                  </button>
                </div>
              </div>

              {/* 4 Main KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-[#1e070c] border border-[#3b0f15] flex flex-col justify-between space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-[#e0b4b8] text-xs font-bold">
                    <span>{adminT.statTotalVisits}</span>
                    <div className="w-8 h-8 rounded-xl bg-[#2e0910] flex items-center justify-center text-[#d4a373]">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                      {menuStats.totalVisits.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>{isAr ? '+14% نمو أسبوعي' : '+14% this week'}</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1e070c] border border-[#3b0f15] flex flex-col justify-between space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-[#e0b4b8] text-xs font-bold">
                    <span>{adminT.statTodayVisits}</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">
                      {menuStats.todayVisits.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#e0b4b8] block mt-1">
                      {isAr ? 'نشاط حي ومستمر اليوم' : 'Active sessions today'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1e070c] border border-[#3b0f15] flex flex-col justify-between space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-[#e0b4b8] text-xs font-bold">
                    <span>{adminT.statUniqueVisitors}</span>
                    <div className="w-8 h-8 rounded-xl bg-[#2e0910] flex items-center justify-center text-sky-400">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                      {menuStats.uniqueVisitors.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#e0b4b8] block mt-1">
                      {isAr ? 'زوار فريدين للأجهزة' : 'Unique client devices'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1e070c] border border-[#3b0f15] flex flex-col justify-between space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-[#e0b4b8] text-xs font-bold">
                    <span>{adminT.statTotalDishViews}</span>
                    <div className="w-8 h-8 rounded-xl bg-[#2e0910] flex items-center justify-center text-[#d4a373]">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-[#d4a373] font-mono block">
                      {menuStats.totalDishViews.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#e0b4b8] block mt-1">
                      {isAr ? 'نقرات استعراض المكونات' : 'Dish detail clicks'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid: Most Viewed Dishes + Category Engagement */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* 1. Most Viewed Dishes (7 Cols) */}
                <div className="lg:col-span-7 bg-[#1e070c] p-5 rounded-2xl border border-[#3b0f15] space-y-4 shadow-xl">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#d4a373]" />
                      <span>{adminT.topViewedDishesTitle}</span>
                    </h3>
                    <p className="text-[11px] text-[#e0b4b8] mt-0.5">{adminT.topViewedDishesSub}</p>
                  </div>

                  {(() => {
                    const sortedDishes = [...menuItems].sort(
                      (a, b) => (menuStats.dishViews[b.id] || 0) - (menuStats.dishViews[a.id] || 0)
                    );
                    const maxViews = Math.max(...sortedDishes.map((d) => menuStats.dishViews[d.id] || 0), 1);

                    return (
                      <div className="space-y-3 pt-1">
                        {sortedDishes.slice(0, 6).map((dish, idx) => {
                          const views = menuStats.dishViews[dish.id] || 0;
                          const percent = Math.round((views / maxViews) * 100);
                          const matchedCat = categories.find((c) => c.id === dish.category);
                          const categoryName = matchedCat
                            ? isAr
                              ? matchedCat.nameAr
                              : matchedCat.nameEn || matchedCat.nameAr
                            : dish.category;

                          return (
                            <div
                              key={dish.id}
                              className="p-3 bg-[#120407] rounded-xl border border-[#2b080f] space-y-2 hover:border-[#52131b] transition-colors"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span
                                    className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                      idx === 0
                                        ? 'bg-[#d4a373] text-[#1a0508]'
                                        : idx === 1
                                        ? 'bg-neutral-300 text-neutral-900'
                                        : idx === 2
                                        ? 'bg-amber-700 text-white'
                                        : 'bg-[#26080f] text-[#e0b4b8]'
                                    }`}
                                  >
                                    #{idx + 1}
                                  </span>
                                  <img
                                    src={dish.image}
                                    alt={dish.nameAr}
                                    className="w-10 h-10 rounded-lg object-cover border border-[#3b0f15] shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <h4 className="font-bold text-white text-xs truncate">
                                      {isAr ? dish.nameAr : dish.nameEn || dish.nameAr}
                                    </h4>
                                    <span className="text-[10px] text-[#e0b4b8] block truncate">
                                      {categoryName} · {dish.priceBHD.toFixed(1)} {adminT.currency}
                                    </span>
                                  </div>
                                </div>

                                <div className="text-right shrink-0">
                                  <span className="font-mono font-extrabold text-sm text-[#d4a373] block">
                                    {views.toLocaleString()}
                                  </span>
                                  <span className="text-[10px] text-[#e0b4b8] block">
                                    {adminT.viewsCount}
                                  </span>
                                </div>
                              </div>

                              {/* Progress bar */}
                              <div className="w-full bg-[#20060c] h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#782229] to-[#d4a373] rounded-full transition-all duration-700"
                                  style={{ width: `${Math.max(percent, 8)}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* 2. Category Engagement & Recent Feed (5 Cols) */}
                <div className="lg:col-span-5 space-y-5">
                  {/* Category Views Card */}
                  <div className="bg-[#1e070c] p-5 rounded-2xl border border-[#3b0f15] space-y-4 shadow-xl">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <FolderTree className="w-4 h-4 text-[#d4a373]" />
                        <span>{adminT.categoryInterestTitle}</span>
                      </h3>
                      <p className="text-[11px] text-[#e0b4b8] mt-0.5">{adminT.categoryInterestSub}</p>
                    </div>

                    <div className="space-y-2.5">
                      {categories.map((cat) => {
                        const count = menuStats.categoryViews[cat.id] || 0;
                        const linkedDishes = menuItems.filter((d) => d.category === cat.id).length;
                        return (
                          <div
                            key={cat.id}
                            className="p-2.5 bg-[#120407] rounded-xl border border-[#2b080f] flex items-center justify-between text-xs"
                          >
                            <div>
                              <span className="font-bold text-white block">
                                {isAr ? cat.nameAr : cat.nameEn || cat.nameAr}
                              </span>
                              <span className="text-[10px] text-[#e0b4b8]">
                                {linkedDishes} {adminT.catDishesCount}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="font-mono font-bold text-[#d4a373] text-xs">
                                {count.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-[#e0b4b8] block">
                                {adminT.viewsCount}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Activity Feed */}
                  <div className="bg-[#1e070c] p-5 rounded-2xl border border-[#3b0f15] space-y-3 shadow-xl">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span>{adminT.recentActivityTitle}</span>
                    </h3>

                    <div className="space-y-2">
                      {menuStats.recentActivities.length === 0 ? (
                        <div className="p-4 bg-[#120407] rounded-xl border border-[#2b080f] text-center text-xs text-[#e0b4b8] space-y-1">
                          <p className="font-bold text-white">
                            {isAr ? 'تم تصفير النشاطات والإحصائيات بنجاح' : 'Statistics reset successfully'}
                          </p>
                          <p className="text-[11px] text-[#e0b4b8]/70">
                            {isAr ? 'سيتم تسجيل الزيارات وتفاعل الزوار الجديد هنا لحظياً.' : 'New visits and visitor clicks will appear here live.'}
                          </p>
                        </div>
                      ) : (
                        menuStats.recentActivities.slice(0, 5).map((act) => (
                          <div
                            key={act.id}
                            className="p-2.5 bg-[#120407] rounded-xl border border-[#2b080f] flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-2 h-2 rounded-full bg-[#d4a373] shrink-0" />
                              <span className="text-white text-[11px] font-medium truncate">
                                {act.label}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#e0b4b8] shrink-0 font-mono">
                              {act.timestamp}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GALLERY MANAGER */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-[#1e070c] p-5 rounded-2xl border border-[#3b0f15] space-y-4">
                <h2 className="text-lg font-extrabold text-white">{adminT.galleryHeaderTitle}</h2>
                <p className="text-xs text-[#e0b4b8]">{adminT.galleryHeaderSub}</p>

                <form onSubmit={handleAddGallery} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#e0b4b8] font-bold mb-1">
                        {adminT.galleryImgTitleArLabel}
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: المجلس الملكي الفاخر"
                        value={newGalleryTitleAr}
                        onChange={(e) => setNewGalleryTitleAr(e.target.value)}
                        className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-[#e0b4b8] font-bold mb-1">
                        {adminT.galleryImgTitleEnLabel}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Royal VIP Lounge"
                        value={newGalleryTitleEn}
                        onChange={(e) => setNewGalleryTitleEn(e.target.value)}
                        className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-[#e0b4b8] font-bold mb-1">
                        {adminT.galleryImgUploadLabel}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'gallery')}
                        className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2 text-xs text-[#e0b4b8] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-[#782229] file:text-white file:font-bold cursor-pointer"
                      />
                    </div>
                  </div>

                  {newGalleryImage && (
                    <div className="p-3 bg-[#120407] rounded-xl border border-[#3b0f15] flex items-center gap-3">
                      <img
                        src={newGalleryImage}
                        alt="Preview"
                        className="w-16 h-12 object-cover rounded-lg border border-[#481119]"
                      />
                      <span className="text-xs text-emerald-400 font-bold">
                        {adminT.imageReadyNotice}
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!newGalleryImage}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-100 disabled:opacity-40 text-[#1a0508] font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <Upload className="w-4 h-4 text-[#782229]" />
                    <span>{adminT.galleryAddImageBtn}</span>
                  </button>
                </form>
              </div>

              {/* Current Slideshow Images */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-sm">{adminT.galleryCurrentImagesTitle}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {galleryImages.map((img) => (
                    <div
                      key={img.id}
                      className="rounded-2xl overflow-hidden bg-[#1e070c] border border-[#3b0f15] flex flex-col justify-between group"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-black/40 relative">
                        <img
                          src={img.image}
                          alt={isAr ? (img.titleAr || img.title) : (img.titleEn || img.title)}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingGalleryId(img.id);
                              setEditGalleryTitleAr(img.titleAr || img.title || '');
                              setEditGalleryTitleEn(img.titleEn || img.title || '');
                            }}
                            className="p-1.5 rounded-lg bg-black/70 hover:bg-[#782229] text-white text-xs cursor-pointer transition-colors"
                            title={adminT.galleryEditImageBtn}
                          >
                            <Edit2 className="w-3 h-3 text-[#d4a373]" />
                          </button>
                          <button
                            onClick={() => {
                              deleteGalleryImage(img.id);
                              triggerNotify(adminT.galleryDeletedSuccess);
                            }}
                            className="p-1.5 rounded-lg bg-black/70 hover:bg-rose-900 text-white text-xs cursor-pointer transition-colors"
                            title={adminT.deleteBtn}
                          >
                            <Trash2 className="w-3 h-3 text-rose-300" />
                          </button>
                        </div>
                      </div>

                      {editingGalleryId === img.id ? (
                        <div className="p-2 space-y-1.5 bg-[#140306]">
                          <input
                            type="text"
                            placeholder="الاسم بالعربية"
                            value={editGalleryTitleAr}
                            onChange={(e) => setEditGalleryTitleAr(e.target.value)}
                            className="w-full bg-[#1b0609] border border-[#481119] rounded p-1 text-[11px] text-white"
                            dir="rtl"
                          />
                          <input
                            type="text"
                            placeholder="English Name"
                            value={editGalleryTitleEn}
                            onChange={(e) => setEditGalleryTitleEn(e.target.value)}
                            className="w-full bg-[#1b0609] border border-[#481119] rounded p-1 text-[11px] text-white"
                            dir="ltr"
                          />
                          <div className="flex gap-1 pt-1">
                            <button
                              type="button"
                              onClick={() => handleSaveEditGallery(img.id)}
                              className="flex-1 py-1 bg-white text-[#1a0508] font-bold text-[10px] rounded cursor-pointer"
                            >
                              {adminT.gallerySaveImageBtn}
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingGalleryId(null)}
                              className="px-2 py-1 bg-[#2b0c10] text-[#e0b4b8] text-[10px] rounded cursor-pointer"
                            >
                              {adminT.cancelBtn}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2.5 text-center text-xs font-bold text-white space-y-0.5">
                          <div className="truncate text-white" title={img.titleAr || img.title}>
                            {img.titleAr || img.title}
                          </div>
                          {img.titleEn && (
                            <div className="truncate text-[10px] text-[#e0b4b8]/70 font-normal" title={img.titleEn} dir="ltr">
                              {img.titleEn}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SITE TEXTS & IDENTITY EDITOR */}
          {activeTab === 'texts' && (
            <form onSubmit={handleSaveTexts} className="space-y-6 max-w-4xl animate-fade-in">
              <div className="flex items-center justify-between bg-[#1e070c] p-4 rounded-2xl border border-[#3b0f15]">
                <div>
                  <h2 className="text-lg font-extrabold text-white">{adminT.textsHeaderTitle}</h2>
                  <p className="text-xs text-[#e0b4b8]">{adminT.textsHeaderSub}</p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-[#1a0508] font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#782229]" />
                  <span>{adminT.saveChanges}</span>
                </button>
              </div>

              {/* Top Bar Section */}
              <div className="bg-[#1e070c] p-5 rounded-2xl border border-[#3b0f15] space-y-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <span>{adminT.topBarSection}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#e0b4b8] font-bold mb-1">{adminT.locationLabel}</label>
                    <input
                      type="text"
                      value={textsForm.topBar.location}
                      onChange={(e) =>
                        setTextsForm({
                          ...textsForm,
                          topBar: { ...textsForm.topBar, location: e.target.value },
                        })
                      }
                      className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e0b4b8] font-bold mb-1">{adminT.phoneLabel}</label>
                    <input
                      type="text"
                      value={textsForm.topBar.phone}
                      onChange={(e) =>
                        setTextsForm({
                          ...textsForm,
                          topBar: { ...textsForm.topBar, phone: e.target.value },
                        })
                      }
                      className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white font-mono"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e0b4b8] font-bold mb-1">{adminT.hoursLabel}</label>
                    <input
                      type="text"
                      value={textsForm.topBar.hours}
                      onChange={(e) =>
                        setTextsForm({
                          ...textsForm,
                          topBar: { ...textsForm.topBar, hours: e.target.value },
                        })
                      }
                      className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e0b4b8] font-bold mb-1">{adminT.emailLabel}</label>
                    <input
                      type="email"
                      value={textsForm.topBar.email}
                      onChange={(e) =>
                        setTextsForm({
                          ...textsForm,
                          topBar: { ...textsForm.topBar, email: e.target.value },
                        })
                      }
                      className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Texts */}
              <div className="bg-[#1e070c] p-5 rounded-2xl border border-[#3b0f15] space-y-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d4a373]" />
                  <span>{adminT.heroTextsSection}</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#e0b4b8] font-bold mb-1">{adminT.kickerLabel}</label>
                    <input
                      type="text"
                      value={textsForm.hero.kicker}
                      onChange={(e) =>
                        setTextsForm({
                          ...textsForm,
                          hero: { ...textsForm.hero, kicker: e.target.value },
                        })
                      }
                      className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#e0b4b8] font-bold mb-1">{adminT.title1Label}</label>
                      <input
                        type="text"
                        value={textsForm.hero.titleLine1}
                        onChange={(e) =>
                          setTextsForm({
                            ...textsForm,
                            hero: { ...textsForm.hero, titleLine1: e.target.value },
                          })
                        }
                        className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white font-serif font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[#e0b4b8] font-bold mb-1">{adminT.title2Label}</label>
                      <input
                        type="text"
                        value={textsForm.hero.titleLine2}
                        onChange={(e) =>
                          setTextsForm({
                            ...textsForm,
                            hero: { ...textsForm.hero, titleLine2: e.target.value },
                          })
                        }
                        className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white font-serif font-bold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#e0b4b8] font-bold mb-1">{adminT.subtitleLabel}</label>
                    <textarea
                      rows={3}
                      value={textsForm.hero.subtitle}
                      onChange={(e) =>
                        setTextsForm({
                          ...textsForm,
                          hero: { ...textsForm.hero, subtitle: e.target.value },
                        })
                      }
                      className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white hover:bg-neutral-100 text-[#1a0508] font-extrabold text-sm shadow-md cursor-pointer transition-all"
              >
                {adminT.saveAllTextsBtn}
              </button>
            </form>
          )}

          {/* TAB 5: TABLE BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-[#1e070c] p-4 rounded-2xl border border-[#3b0f15] flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-white">{adminT.bookingsHeaderTitle}</h2>
                  <p className="text-xs text-[#e0b4b8]">{adminT.bookingsHeaderSub}</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#d4a373] bg-[#120407] px-3 py-1.5 rounded-xl border border-[#3b0f15]">
                  {bookings.length} {adminT.totalBookings}
                </span>
              </div>

              <div className="bg-[#1e070c] rounded-2xl border border-[#3b0f15] overflow-hidden">
                <div className="overflow-x-auto scrollbar-none">
                  <table className="w-full text-xs min-w-[640px]" dir={isAr ? 'rtl' : 'ltr'}>
                    <thead className="bg-[#150407] border-b border-[#3b0f15] text-[#e0b4b8] text-[11px]">
                      <tr>
                        <th className={`p-4 font-bold ${isAr ? 'text-right' : 'text-left'}`}>
                          {adminT.clientLabel}
                        </th>
                        <th className={`p-4 font-bold ${isAr ? 'text-right' : 'text-left'}`}>
                          {adminT.phoneLabel}
                        </th>
                        <th className={`p-4 font-bold ${isAr ? 'text-right' : 'text-left'}`}>
                          {adminT.datetimeLabel}
                        </th>
                        <th className={`p-4 font-bold ${isAr ? 'text-right' : 'text-left'}`}>
                          {adminT.preferredDishLabel}
                        </th>
                        <th className={`p-4 font-bold ${isAr ? 'text-right' : 'text-left'}`}>
                          {adminT.statusLabel}
                        </th>
                        <th className="p-4 font-bold text-center">{adminT.contactWhatsApp}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3b0f15]/60">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-[#25090f]/50">
                          <td className="p-4">
                            <span className="font-mono text-[11px] text-[#d4a373] font-bold block">{b.id}</span>
                            <span className="font-bold text-white text-sm">{b.name}</span>
                          </td>
                          <td className="p-4 font-mono text-[#e0b4b8]" dir="ltr">
                            {b.phone}
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-white block">{b.date} · {b.time}</span>
                            <span className="text-[11px] text-[#e0b4b8]">
                              {b.guests} {adminT.guestsCountLabel}
                            </span>
                          </td>
                          <td className="p-4 text-[#e0b4b8]">{b.dish || '-'}</td>
                          <td className="p-4">
                            <select
                              value={b.status}
                              onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                              className="text-xs bg-[#120407] border border-[#3b0f15] rounded-lg px-2 py-1 text-white cursor-pointer"
                            >
                              <option value="confirmed">{adminT.statusConfirmed}</option>
                              <option value="pending">{adminT.statusPending}</option>
                              <option value="cancelled">{adminT.statusCancelled}</option>
                            </select>
                          </td>
                          <td className="p-4 text-center">
                            <a
                              href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                isAr
                                  ? `مرحباً ${b.name}، يسعدنا التواصل معك من مطعم فريسكا البحرين بخصوص حجز طاولتكم لتاريخ ${b.date}.`
                                  : `Hello ${b.name}, we are contacting you from Frisca Restaurant Bahrain regarding your table reservation for ${b.date}.`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{adminT.contactWhatsApp}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SECURITY & CREDENTIALS */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-4xl animate-fade-in">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3d0e15] border border-[#782229] text-[#d4a373] text-[11px] font-bold mb-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{adminT.securityHeaderBadge}</span>
                </div>
                <h2 className="text-xl font-bold text-white font-serif">{adminT.securityHeaderTitle}</h2>
                <p className="text-xs text-[#e0b4b8] mt-1">{adminT.securityHeaderSub}</p>
              </div>

              {credErrorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-700/60 text-red-200 text-xs flex items-center gap-2">
                  <X className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{credErrorMsg}</span>
                </div>
              )}

              {/* Current Credentials */}
              <div className="bg-[#1b0609] border border-[#3b0f15] rounded-2xl p-5 shadow-lg">
                <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#d4a373]" />
                  <span>{adminT.currentCredsTitle}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#120407] border border-[#2b080f] rounded-xl p-3 flex items-center justify-between">
                    <span className="text-[#e0b4b8]">{adminT.currentUsernameLabel}</span>
                    <span className="font-mono font-bold text-white bg-[#22070c] px-2.5 py-1 rounded border border-[#481119]" dir="ltr">
                      {adminCredentials.username}
                    </span>
                  </div>
                  <div className="bg-[#120407] border border-[#2b080f] rounded-xl p-3 flex items-center justify-between">
                    <span className="text-[#e0b4b8]">{adminT.protectionStatusLabel}</span>
                    <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-700/50 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{adminT.protectedWithPassword}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Change Credentials Form */}
              <div className="bg-[#1b0609] border border-[#3b0f15] rounded-2xl p-6 shadow-xl">
                <h3 className="font-bold text-white text-sm mb-4 pb-3 border-b border-[#3b0f15] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#d4a373]" />
                  <span>{adminT.updateCredsTitle}</span>
                </h3>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setCredErrorMsg('');
                    if (!credUsername.trim()) {
                      setCredErrorMsg(adminT.errEnterUsername);
                      return;
                    }
                    if (!credPassword.trim() || credPassword.length < 4) {
                      setCredErrorMsg(adminT.errPasswordLength);
                      return;
                    }
                    if (credConfirmPassword && credConfirmPassword !== credPassword) {
                      setCredErrorMsg(adminT.errPasswordMismatch);
                      return;
                    }
                    const ok = await updateAdminCredentials({
                      username: credUsername,
                      password: credPassword,
                    });
                    if (ok) {
                      setCredConfirmPassword('');
                      triggerNotify(adminT.credsUpdatedSuccess);
                    } else {
                      setCredErrorMsg(adminT.errFillRequiredFields);
                    }
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-white mb-1.5">{adminT.newUsernameLabel}</label>
                      <input
                        type="text"
                        required
                        value={credUsername}
                        onChange={(e) => setCredUsername(e.target.value)}
                        className="w-full bg-[#120407] border border-[#3b0f15] focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] rounded-xl p-3 text-white font-mono text-xs outline-none"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="font-bold text-white">{adminT.newPasswordLabel}</label>
                        <button
                          type="button"
                          onClick={() => setShowCredPassword(!showCredPassword)}
                          className="text-[10px] text-[#d4a373] hover:text-white transition-colors cursor-pointer"
                        >
                          {showCredPassword ? adminT.hidePassword : adminT.showPassword}
                        </button>
                      </div>
                      <input
                        type={showCredPassword ? 'text' : 'password'}
                        required
                        value={credPassword}
                        onChange={(e) => setCredPassword(e.target.value)}
                        className="w-full bg-[#120407] border border-[#3b0f15] focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] rounded-xl p-3 text-white font-mono text-xs outline-none"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-white mb-1.5">{adminT.confirmPasswordLabel}</label>
                    <input
                      type={showCredPassword ? 'text' : 'password'}
                      value={credConfirmPassword}
                      onChange={(e) => setCredConfirmPassword(e.target.value)}
                      className="w-full max-w-md bg-[#120407] border border-[#3b0f15] focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] rounded-xl p-3 text-white font-mono text-xs outline-none"
                      dir="ltr"
                    />
                  </div>

                  <div className="pt-3 flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-[#1a0508] font-extrabold text-xs shadow-lg cursor-pointer transition-all active:scale-95 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4 text-[#782229]" />
                      <span>{adminT.saveNewCredsBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCredUsername(adminCredentials.username || 'admin');
                        setCredPassword(adminCredentials.password || '');
                        setCredConfirmPassword('');
                        setCredErrorMsg('');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#2b0c10] hover:bg-[#3d1117] text-[#e0b4b8] font-semibold text-xs cursor-pointer transition-colors"
                    >
                      {adminT.cancelBtn}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD OR EDIT DISH (Bilingual Name, Description & Dynamic Categories) */}
      {isAddDishOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#1b0609] border border-[#481119] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-[#3b0f15] bg-[#22070c] shrink-0">
              <div>
                <h3 className="font-bold text-white text-sm">
                  {editingDishId ? adminT.modalEditDishTitle : adminT.modalAddDishTitle}
                </h3>
                <span className="text-[11px] text-[#e0b4b8]">{adminT.modalDishSub}</span>
              </div>
              <button
                onClick={() => setIsAddDishOpen(false)}
                className="text-[#e0b4b8] hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDishSubmit} className="p-4 sm:p-5 space-y-3.5 sm:space-y-4 text-xs overflow-y-auto flex-1">
              {/* Names: Arabic & English */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-white mb-1">
                    {adminT.nameArLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: تاغليوليني الكمأة السوداء"
                    value={dishForm.nameAr}
                    onChange={(e) => setDishForm({ ...dishForm, nameAr: e.target.value })}
                    className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white text-right text-sm"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-white mb-1">
                    {adminT.nameEnLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Black Truffle Tagliolini"
                    value={dishForm.nameEn}
                    onChange={(e) => setDishForm({ ...dishForm, nameEn: e.target.value })}
                    className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white font-sans text-left text-sm"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-white mb-1 flex items-center justify-between">
                    <span>{adminT.categoryLabel}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddDishOpen(false);
                        setActiveTab('categories');
                      }}
                      className="text-[10px] text-[#d4a373] hover:underline"
                    >
                      + {adminT.addNewCategoryBtn}
                    </button>
                  </label>
                  <select
                    value={dishForm.category}
                    onChange={(e) => setDishForm({ ...dishForm, category: e.target.value })}
                    className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {isAr ? c.nameAr : c.nameEn || c.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-white mb-1">
                    {adminT.priceLabel}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={dishForm.priceBHD}
                    onChange={(e) =>
                      setDishForm({ ...dishForm, priceBHD: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* TWO SEPARATE DESCRIPTIONS: ARABIC & ENGLISH */}
              <div className="space-y-3 pt-1">
                {/* 1. Arabic Description (RTL) */}
                <div>
                  <label className="block font-bold text-[#d4a373] mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#d4a373]" />
                    <span>{adminT.descArLabel}</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder={adminT.descArPlaceholder}
                    value={dishForm.descriptionAr}
                    onChange={(e) => setDishForm({ ...dishForm, descriptionAr: e.target.value })}
                    className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white leading-relaxed text-right font-sans"
                    dir="rtl"
                  />
                </div>

                {/* 2. English Description (LTR) */}
                <div>
                  <label className="block font-bold text-[#d4a373] mb-1 flex items-center gap-1.5" dir="ltr">
                    <span className="w-2 h-2 rounded-full bg-[#d4a373]" />
                    <span>{adminT.descEnLabel}</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder={adminT.descEnPlaceholder}
                    value={dishForm.descriptionEn || ''}
                    onChange={(e) => setDishForm({ ...dishForm, descriptionEn: e.target.value })}
                    className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white leading-relaxed text-left font-sans"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Tag & Image Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-white mb-1">{adminT.tagLabel}</label>
                  <select
                    value={dishForm.tag || ''}
                    onChange={(e) => setDishForm({ ...dishForm, tag: e.target.value })}
                    className="w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white"
                  >
                    <option value="">{adminT.noTag}</option>
                    <option value={isAr ? 'الأكثر طلباً' : 'Best Seller'}>{adminT.tagBestSeller}</option>
                    <option value={isAr ? 'توصية الشيف' : "Chef's Choice"}>{adminT.tagChefChoice}</option>
                    <option value={isAr ? 'نباتي' : 'Vegetarian'}>{adminT.tagVegetarian}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-white mb-1">{adminT.dishImageLabel}</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      id="dish-file-input"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'dish')}
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <label
                        htmlFor="dish-file-input"
                        className="flex-1 py-2 px-3 rounded-xl bg-[#2b0c10] hover:bg-[#3d1117] border border-[#52131b] hover:border-[#d4a373] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#d4a373]" />
                        <span>
                          {dishForm.image ? adminT.replaceImageFromDevice : adminT.chooseImageFromDevice}
                        </span>
                      </label>
                      {dishForm.image && (
                        <button
                          type="button"
                          onClick={() => setDishForm((prev) => ({ ...prev, image: '' }))}
                          className="px-2.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300 text-xs font-bold"
                          title={adminT.removeImage}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {dishForm.image && (
                <div className="p-2.5 rounded-xl bg-[#120407] border border-[#3b0f15] flex items-center gap-3">
                  <img
                    src={dishForm.image}
                    alt="Dish Preview"
                    className="w-12 h-12 object-cover rounded-lg border border-[#481119] shrink-0"
                  />
                  <div className="truncate">
                    <span className="text-xs font-bold text-emerald-400 block flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{adminT.imageReadyNotice}</span>
                    </span>
                    <span className="text-[10px] text-[#e0b4b8] block truncate">
                      {adminT.imageReadySub}
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-white hover:bg-neutral-100 text-[#1a0508] font-extrabold text-xs shadow-md cursor-pointer transition-all active:scale-95"
                >
                  {editingDishId ? adminT.saveDishChangesBtn : adminT.addDishNowBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddDishOpen(false)}
                  className="px-4 py-3 rounded-xl bg-[#2b0c10] text-[#e0b4b8] font-semibold text-xs cursor-pointer hover:bg-[#3d1117]"
                >
                  {adminT.cancelBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD OR EDIT CATEGORY (Bilingual & Fixed Unique ID) */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#1b0609] border border-[#481119] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-[#3b0f15] bg-[#22070c] shrink-0">
              <div className="flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-[#d4a373]" />
                <h3 className="font-bold text-white text-sm">
                  {editingCategoryId ? adminT.editCategoryTitle : adminT.addCategoryTitle}
                </h3>
              </div>
              <button
                onClick={() => setIsAddCategoryOpen(false)}
                className="text-[#e0b4b8] hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="p-4 sm:p-5 space-y-3.5 sm:space-y-4 text-xs overflow-y-auto flex-1">
              {/* Arabic Name */}
              <div>
                <label className="block font-bold text-white mb-1.5">
                  {adminT.catNameArLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: المأكولات البحرية"
                  value={categoryForm.nameAr}
                  onChange={(e) => setCategoryForm({ ...categoryForm, nameAr: e.target.value })}
                  className="w-full bg-[#120407] border border-[#3b0f15] focus:border-[#d4a373] rounded-xl p-2.5 text-white text-right outline-none text-sm"
                  dir="rtl"
                />
              </div>

              {/* English Name */}
              <div>
                <label className="block font-bold text-white mb-1.5">
                  {adminT.catNameEnLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mediterranean Seafood"
                  value={categoryForm.nameEn}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCategoryForm((prev) => ({
                      ...prev,
                      nameEn: val,
                      // Auto-suggest ID if new and not manually filled
                      id: !editingCategoryId && !prev.id ? val.toLowerCase().replace(/[^a-z0-9]/g, '-') : prev.id,
                    }));
                  }}
                  className="w-full bg-[#120407] border border-[#3b0f15] focus:border-[#d4a373] rounded-xl p-2.5 text-white text-left outline-none font-sans text-sm"
                  dir="ltr"
                />
              </div>

              {/* Fixed Unique ID */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-white flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-[#d4a373]" />
                    <span>{adminT.catIdLabel}</span>
                  </label>
                  {editingCategoryId && (
                    <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                      {isAr ? 'معرّف ثابت لحماية الأصناف المرتبطة' : 'Fixed ID locked'}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  disabled={!!editingCategoryId}
                  placeholder="seafood"
                  value={categoryForm.id || ''}
                  onChange={(e) =>
                    setCategoryForm({
                      ...categoryForm,
                      id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''),
                    })
                  }
                  className={`w-full bg-[#120407] border border-[#3b0f15] rounded-xl p-2.5 text-white font-mono text-sm ${
                    editingCategoryId ? 'opacity-60 cursor-not-allowed' : 'focus:border-[#d4a373]'
                  }`}
                  dir="ltr"
                />
                <span className="text-[10px] text-[#e0b4b8]/70 block mt-1 font-mono">
                  {adminT.catIdHint}
                </span>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-white hover:bg-neutral-100 text-[#1a0508] font-extrabold text-xs shadow-md cursor-pointer transition-all active:scale-95"
                >
                  {editingCategoryId ? adminT.saveCategoryBtn : adminT.addCategorySubmitBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddCategoryOpen(false)}
                  className="px-4 py-3 rounded-xl bg-[#2b0c10] text-[#e0b4b8] font-semibold text-xs cursor-pointer hover:bg-[#3d1117]"
                >
                  {adminT.cancelBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
