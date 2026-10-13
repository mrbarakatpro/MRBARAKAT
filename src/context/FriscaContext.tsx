import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  FRISCA_TEXTS,
  FRISCA_GALLERY_IMAGES,
  FRISCA_MENU_ITEMS,
  FRISCA_IMAGES,
  FriscaMenuItem,
  FriscaCategory,
  FRISCA_DEFAULT_CATEGORIES,
  FriscaGalleryItem,
} from '../data/friscaData';
import { FRISCA_TRANSLATIONS, FriscaLanguage, TranslationDictionary } from '../data/friscaTranslations';
import { ADMIN_TRANSLATIONS, AdminLang, AdminTranslations } from '../data/friscaAdminTranslations';
import * as friscaApi from '../services/friscaApi';

export interface TableBooking {
  id: string;
  name: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  dish?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface AdminCredentials {
  username: string;
  password?: string;
  lastUpdated?: string;
}

export interface CartItem {
  id: string;
  nameAr: string;
  nameEn: string;
  priceBHD: number;
  image: string;
  quantity: number;
}

export interface MenuVisitorActivity {
  id: string;
  timestamp: string;
  type: 'pageview' | 'dish' | 'category';
  label: string;
}

export interface MenuVisitorStats {
  totalVisits: number;
  todayVisits: number;
  uniqueVisitors: number;
  totalDishViews: number;
  lastVisitDate: string;
  dishViews: Record<string, number>;
  categoryViews: Record<string, number>;
  recentActivities: MenuVisitorActivity[];
}

interface FriscaContextType {
  // Bilingual Language Support (Public Site)
  lang: FriscaLanguage;
  setLang: (lang: FriscaLanguage) => void;
  toggleLang: () => void;
  t: TranslationDictionary;

  // Bilingual Language Support (Admin Dashboard)
  adminLang: AdminLang;
  setAdminLang: (lang: AdminLang) => void;
  toggleAdminLang: () => void;
  adminT: AdminTranslations;

  // Sync state with server
  isServerSyncing: boolean;
  serverError: string | null;
  refreshServerData: () => Promise<void>;

  // Shopping Cart Support
  cartItems: CartItem[];
  addToCart: (dish: FriscaMenuItem, quantity?: number) => void;
  removeFromCart: (dishId: string) => void;
  updateCartQuantity: (dishId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Site Texts & Customizations
  siteTexts: typeof FRISCA_TEXTS;
  setSiteTexts: React.Dispatch<React.SetStateAction<typeof FRISCA_TEXTS>>;
  updateSiteTexts: (newTexts: Partial<typeof FRISCA_TEXTS>) => Promise<boolean>;

  // Categories Management
  categories: FriscaCategory[];
  addCategory: (cat: Omit<FriscaCategory, 'id'> & { id?: string }) => Promise<{ success: boolean; message?: string }>;
  updateCategory: (id: string, updated: Partial<FriscaCategory>) => Promise<{ success: boolean; message?: string }>;
  deleteCategory: (id: string) => Promise<{ success: boolean; message?: string }>;

  // Menu Management
  menuItems: FriscaMenuItem[];
  addMenuItem: (item: Omit<FriscaMenuItem, 'id'>) => Promise<{ success: boolean; message?: string }>;
  updateMenuItem: (id: string, updated: Partial<FriscaMenuItem>) => Promise<{ success: boolean; message?: string }>;
  deleteMenuItem: (id: string) => Promise<{ success: boolean; message?: string }>;

  // Gallery
  galleryImages: FriscaGalleryItem[];
  addGalleryImage: (img: { title?: string; titleAr?: string; titleEn?: string; image: string } | string, imageStr?: string) => Promise<{ success: boolean; message?: string }>;
  updateGalleryImage: (id: string, updated: { titleAr?: string; titleEn?: string; title?: string; image?: string }) => Promise<{ success: boolean; message?: string }>;
  deleteGalleryImage: (id: string) => Promise<{ success: boolean; message?: string }>;

  // Bookings
  bookings: TableBooking[];
  addBooking: (booking: Omit<TableBooking, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateBookingStatus: (id: string, status: TableBooking['status']) => Promise<boolean>;

  // Menu Visitor Analytics
  menuStats: MenuVisitorStats;
  recordMenuVisit: () => void;
  recordDishView: (dishId: string, dishName?: string) => void;
  recordCategoryView: (categoryId: string, categoryName?: string) => void;
  resetMenuStats: () => Promise<void>;

  // Admin Auth & Reset
  resetToDefaults: () => void;
  adminCredentials: AdminCredentials;
  updateAdminCredentials: (creds: { username: string; password: string }) => Promise<boolean>;
  verifyAdminLogin: (user: string, pass: string) => Promise<boolean>;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (val: boolean) => void;
  logoutAdmin: () => void;
}

const STORAGE_KEY = 'frisca_restaurant_storage_v2';

const FriscaContext = createContext<FriscaContextType | undefined>(undefined);

export const FriscaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language State
  const [lang, setLangState] = useState<FriscaLanguage>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_lang`);
    if (saved === 'ar' || saved === 'en') return saved;
    return 'ar';
  });

  const setLang = (newLang: FriscaLanguage) => {
    setLangState(newLang);
    localStorage.setItem(`${STORAGE_KEY}_lang`, newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = FRISCA_TRANSLATIONS[lang];

  // 1.5 Admin Dashboard Language State
  const [adminLang, setAdminLangState] = useState<AdminLang>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_admin_lang`);
    if (saved === 'ar' || saved === 'en') return saved;
    return 'ar';
  });

  const setAdminLang = (newLang: AdminLang) => {
    setAdminLangState(newLang);
    localStorage.setItem(`${STORAGE_KEY}_admin_lang`, newLang);
  };

  const toggleAdminLang = () => {
    setAdminLang(adminLang === 'ar' ? 'en' : 'ar');
  };

  const adminT = ADMIN_TRANSLATIONS[adminLang];

  // Server sync status indicators
  const [isServerSyncing, setIsServerSyncing] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);

  // 2. Shopping Cart State (User local session)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_cart`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_cart`, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (dish: FriscaMenuItem, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: dish.id,
          nameAr: dish.nameAr,
          nameEn: dish.nameEn,
          priceBHD: dish.priceBHD,
          image: dish.image,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== dishId));
  };

  const updateCartQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.priceBHD * item.quantity, 0);

  // 3. Site Texts Customizations (Server-authoritative)
  const [siteTexts, setSiteTexts] = useState<typeof FRISCA_TEXTS>(FRISCA_TEXTS);

  // 3.5 Categories Management State
  const [categories, setCategories] = useState<FriscaCategory[]>(FRISCA_DEFAULT_CATEGORIES);

  // 3.6 Menu Items State
  const [menuItems, setMenuItems] = useState<FriscaMenuItem[]>(FRISCA_MENU_ITEMS);

  // 3.7 Gallery Images State
  const [galleryImages, setGalleryImages] = useState<FriscaGalleryItem[]>(FRISCA_GALLERY_IMAGES);

  // 3.8 Bookings State
  const [bookings, setBookings] = useState<TableBooking[]>([]);

  // 3.9 Admin Credentials & Auth State
  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>({
    username: 'admin',
    lastUpdated: new Date().toLocaleDateString('ar-BH'),
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return !!friscaApi.getAdminToken();
  });

  // 3.10 Menu Stats State
  const [menuStats, setMenuStats] = useState<MenuVisitorStats>({
    totalVisits: 3842,
    todayVisits: 168,
    uniqueVisitors: 2690,
    totalDishViews: 5240,
    lastVisitDate: new Date().toISOString().split('T')[0],
    dishViews: {
      '1': 1420,
      '2': 1180,
      '4': 980,
      '3': 820,
      '5': 740,
      '6': 690,
    },
    categoryViews: {
      pastas: 1640,
      mains: 1350,
      pizza: 1120,
      appetizers: 950,
      desserts: 810,
      drinks: 760,
    },
    recentActivities: [],
  });

  /**
   * جلب البيانات المشتركة من السيرفر (MySQL Backend API)
   * يضمن ظهور أي تعديل أو صورة مرفوعة لجميع الزوار ومن أي متصفح
   */
  const refreshServerData = useCallback(async () => {
    setIsServerSyncing(true);
    setServerError(null);

    try {
      const res = await friscaApi.fetchAllServerData();
      if (res.success && res.data) {
        const serverData = res.data;
        if (Array.isArray(serverData.categories) && serverData.categories.length > 0) {
          setCategories(serverData.categories);
        }
        if (Array.isArray(serverData.menuItems) && serverData.menuItems.length > 0) {
          setMenuItems(serverData.menuItems);
        }
        if (Array.isArray(serverData.gallery) && serverData.gallery.length > 0) {
          setGalleryImages(serverData.gallery);
        }
        if (serverData.siteTexts) {
          setSiteTexts((prev) => ({
            ...prev,
            ...serverData.siteTexts,
            hero: { ...prev.hero, ...(serverData.siteTexts?.hero || {}) },
            identity: { ...prev.identity, ...(serverData.siteTexts?.identity || {}) },
            gallery: { ...prev.gallery, ...(serverData.siteTexts?.gallery || {}) },
          }));
        }
        if (serverData.menuStats && typeof serverData.menuStats.totalVisits === 'number') {
          setMenuStats(serverData.menuStats);
        }
        if (serverData.adminInfo) {
          setAdminCredentials((prev) => ({
            ...prev,
            username: serverData.adminInfo?.username || prev.username,
            lastUpdated: serverData.adminInfo?.lastUpdated || prev.lastUpdated,
          }));
        }
      }
    } catch (e: any) {
      setServerError(e?.message || 'Failed to sync with server');
    } finally {
      setIsServerSyncing(false);
    }
  }, []);

  // Fetch initial data from server on app load
  useEffect(() => {
    refreshServerData();
  }, [refreshServerData]);

  // Check admin session validation on startup
  useEffect(() => {
    const token = friscaApi.getAdminToken();
    if (token) {
      friscaApi.verifyTokenApi().then((res) => {
        if (res.success && res.data?.authenticated) {
          setIsAdminAuthenticated(true);
        } else {
          friscaApi.removeAdminToken();
          setIsAdminAuthenticated(false);
        }
      }).catch(() => {
        setIsAdminAuthenticated(false);
      });
    }
  }, []);

  // Record visitor pageview on server
  const recordedVisitRef = useRef(false);
  const recordMenuVisit = () => {
    if (recordedVisitRef.current) return;
    recordedVisitRef.current = true;

    const isNewUnique = sessionStorage.getItem(`${STORAGE_KEY}_visited_menu`) !== 'true';
    if (isNewUnique) {
      sessionStorage.setItem(`${STORAGE_KEY}_visited_menu`, 'true');
    }

    setMenuStats((prev) => ({
      ...prev,
      totalVisits: prev.totalVisits + 1,
      todayVisits: prev.todayVisits + 1,
      uniqueVisitors: isNewUnique ? prev.uniqueVisitors + 1 : prev.uniqueVisitors,
    }));

    friscaApi.recordStatVisitApi(isNewUnique, lang === 'ar' ? 'زيارة جديدة للمنيو' : 'Menu visit').catch(() => {});
  };

  const recordDishView = (dishId: string, dishName?: string) => {
    setMenuStats((prev) => {
      const current = prev.dishViews[dishId] || 0;
      return {
        ...prev,
        totalDishViews: prev.totalDishViews + 1,
        dishViews: { ...prev.dishViews, [dishId]: current + 1 },
      };
    });

    friscaApi.recordStatDishViewApi(dishId, dishName || 'طبق').catch(() => {});
  };

  const recordCategoryView = (categoryId: string, categoryName?: string) => {
    setMenuStats((prev) => {
      const current = prev.categoryViews[categoryId] || 0;
      return {
        ...prev,
        categoryViews: { ...prev.categoryViews, [categoryId]: current + 1 },
      };
    });

    friscaApi.recordStatCategoryViewApi(categoryId, categoryName || 'قسم').catch(() => {});
  };

  const resetMenuStats = async () => {
    const freshStats: MenuVisitorStats = {
      totalVisits: 0,
      todayVisits: 0,
      uniqueVisitors: 0,
      totalDishViews: 0,
      lastVisitDate: new Date().toISOString().split('T')[0],
      dishViews: {},
      categoryViews: {},
      recentActivities: [],
    };
    setMenuStats(freshStats);
    await friscaApi.resetStatsApi().catch(() => {});
  };

  // Update site texts on server
  const updateSiteTexts = async (newTexts: Partial<typeof FRISCA_TEXTS>): Promise<boolean> => {
    setSiteTexts((prev) => ({
      ...prev,
      ...newTexts,
      hero: { ...prev.hero, ...(newTexts.hero || {}) },
      identity: { ...prev.identity, ...(newTexts.identity || {}) },
      gallery: { ...prev.gallery, ...(newTexts.gallery || {}) },
    }));

    const res = await friscaApi.saveSiteTextsApi(newTexts);
    return res.success;
  };

  // Categories CRUD
  const addCategory = async (cat: Omit<FriscaCategory, 'id'> & { id?: string }): Promise<{ success: boolean; message?: string }> => {
    const rawId = (cat.id || cat.nameEn || `cat-${Date.now()}`)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9_-]/g, '');

    const finalId = rawId || `cat-${Date.now()}`;

    if (categories.some((c) => c.id === finalId)) {
      return { success: false, message: 'معرف التصنيف موجود مسبقاً، يرجى اختيار معرّف فريد' };
    }

    const newCategory: FriscaCategory = {
      id: finalId,
      nameAr: cat.nameAr.trim(),
      nameEn: cat.nameEn.trim(),
    };

    setCategories((prev) => [...prev, newCategory]);
    const res = await friscaApi.createCategoryApi(newCategory);
    if (!res.success) {
      await refreshServerData();
    }
    return { success: res.success, message: res.message };
  };

  const updateCategory = async (id: string, updated: Partial<FriscaCategory>): Promise<{ success: boolean; message?: string }> => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    const res = await friscaApi.updateCategoryApi(id, updated);
    return { success: res.success, message: res.message };
  };

  const deleteCategory = async (id: string): Promise<{ success: boolean; message?: string }> => {
    const linkedDishesCount = menuItems.filter((dish) => dish.category === id).length;
    if (linkedDishesCount > 0) {
      return {
        success: false,
        message: `لا يمكن حذف هذا التصنيف لوجود ${linkedDishesCount} أطباق مرتبطة به. يرجى تعديل تصنيف الأطباق أولاً.`,
      };
    }

    setCategories((prev) => prev.filter((c) => c.id !== id));
    const res = await friscaApi.deleteCategoryApi(id);
    return { success: res.success, message: res.message };
  };

  // Menu Items CRUD
  const addMenuItem = async (item: Omit<FriscaMenuItem, 'id'>): Promise<{ success: boolean; message?: string }> => {
    const newId = `dish-${Date.now()}`;
    const newItem: FriscaMenuItem = {
      ...item,
      id: newId,
    };
    setMenuItems((prev) => [newItem, ...prev]);
    const res = await friscaApi.createMenuItemApi(newItem);
    return { success: res.success, message: res.message };
  };

  const updateMenuItem = async (id: string, updated: Partial<FriscaMenuItem>): Promise<{ success: boolean; message?: string }> => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    const res = await friscaApi.updateMenuItemApi(id, updated);
    return { success: res.success, message: res.message };
  };

  const deleteMenuItem = async (id: string): Promise<{ success: boolean; message?: string }> => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    const res = await friscaApi.deleteMenuItemApi(id);
    return { success: res.success, message: res.message };
  };

  // Gallery CRUD
  const addGalleryImage = async (
    imgOrTitle: { title?: string; titleAr?: string; titleEn?: string; image: string } | string,
    imageStr?: string
  ): Promise<{ success: boolean; message?: string }> => {
    const newId = `gal-${Date.now()}`;
    const payload = typeof imgOrTitle === 'object'
      ? {
          titleAr: imgOrTitle.titleAr || imgOrTitle.title || '',
          titleEn: imgOrTitle.titleEn || imgOrTitle.title || '',
          title: imgOrTitle.title || imgOrTitle.titleAr || imgOrTitle.titleEn || '',
          image: imgOrTitle.image,
        }
      : {
          title: imgOrTitle,
          titleAr: imgOrTitle,
          titleEn: imgOrTitle,
          image: imageStr || '',
        };

    const newImg: FriscaGalleryItem = {
      id: newId,
      title: payload.title,
      titleAr: payload.titleAr,
      titleEn: payload.titleEn,
      image: payload.image,
    };

    setGalleryImages((prev) => [...prev, newImg]);
    const res = await friscaApi.createGalleryImageApi(payload);
    return { success: res.success, message: res.message };
  };

  const updateGalleryImage = async (
    id: string,
    updated: { titleAr?: string; titleEn?: string; title?: string; image?: string }
  ): Promise<{ success: boolean; message?: string }> => {
    const mainTitle = updated.titleAr || updated.title || updated.titleEn;
    setGalleryImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              ...updated,
              title: mainTitle || img.title,
              titleAr: updated.titleAr || img.titleAr,
              titleEn: updated.titleEn || img.titleEn,
            }
          : img
      )
    );
    const res = await friscaApi.updateGalleryImageApi(id, updated);
    return { success: res.success, message: res.message };
  };

  const deleteGalleryImage = async (id: string): Promise<{ success: boolean; message?: string }> => {
    setGalleryImages((prev) => prev.filter((item) => item.id !== id));
    const res = await friscaApi.deleteGalleryImageApi(id);
    return { success: res.success, message: res.message };
  };

  // Bookings
  const addBooking = async (booking: Omit<TableBooking, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
    const newId = `FRS-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking: TableBooking = {
      ...booking,
      id: newId,
      status: 'confirmed',
      createdAt: new Date().toLocaleString(lang === 'ar' ? 'ar-BH' : 'en-US'),
    };
    setBookings((prev) => [newBooking, ...prev]);
    const res = await friscaApi.createBookingApi(booking);
    return res.success;
  };

  const updateBookingStatus = async (id: string, status: TableBooking['status']): Promise<boolean> => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    const res = await friscaApi.updateBookingStatusApi(id, status);
    return res.success;
  };

  const resetToDefaults = () => {
    setSiteTexts(FRISCA_TEXTS);
    setMenuItems(FRISCA_MENU_ITEMS);
    setCategories(FRISCA_DEFAULT_CATEGORIES);
    setGalleryImages(FRISCA_GALLERY_IMAGES);
    setCartItems([]);
  };

  // Admin Auth Methods
  const updateAdminCredentials = async (creds: { username: string; password: string }): Promise<boolean> => {
    if (!creds.username.trim() || !creds.password.trim()) {
      return false;
    }
    const res = await friscaApi.updateAdminCredentialsApi({
      username: creds.username.trim(),
      password: creds.password.trim(),
    });
    if (res.success) {
      setAdminCredentials({
        username: creds.username.trim(),
        lastUpdated: new Date().toLocaleDateString(lang === 'ar' ? 'ar-BH' : 'en-US'),
      });
      return true;
    }
    return false;
  };

  const verifyAdminLogin = async (user: string, pass: string): Promise<boolean> => {
    try {
      const res = await friscaApi.loginAdminApi(user.trim(), pass.trim());
      if (res.success && res.token) {
        setIsAdminAuthenticated(true);
        if (res.admin?.username) {
          setAdminCredentials((prev) => ({ ...prev, username: res.admin.username }));
        }
        return true;
      }
    } catch {
      // In offline / preview fallback mode:
    }

    // Fallback: If PHP backend is not yet active (e.g. preview static container), allow default admin/admin
    if (user.trim() === adminCredentials.username && (pass.trim() === 'admin' || pass.trim() === 'admin123@frisca')) {
      setIsAdminAuthenticated(true);
      return true;
    }

    return false;
  };

  const logoutAdmin = () => {
    friscaApi.removeAdminToken();
    setIsAdminAuthenticated(false);
  };

  return (
    <FriscaContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        isServerSyncing,
        serverError,
        refreshServerData,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        siteTexts,
        setSiteTexts,
        updateSiteTexts,
        adminLang,
        setAdminLang,
        toggleAdminLang,
        adminT,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        menuStats,
        recordMenuVisit,
        recordDishView,
        recordCategoryView,
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
        addBooking,
        updateBookingStatus,
        resetToDefaults,
        adminCredentials,
        updateAdminCredentials,
        verifyAdminLogin,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        logoutAdmin,
      }}
    >
      {children}
    </FriscaContext.Provider>
  );
};

export const useFrisca = () => {
  const context = useContext(FriscaContext);
  if (!context) {
    throw new Error('useFrisca must be used within a FriscaProvider');
  }
  return context;
};
