import {
  FRISCA_TEXTS,
  FRISCA_GALLERY_IMAGES,
  FRISCA_MENU_ITEMS,
  FRISCA_DEFAULT_CATEGORIES,
  FriscaMenuItem,
  FriscaCategory,
} from '../data/friscaData';
import { MenuVisitorStats, TableBooking } from '../context/FriscaContext';

const API_BASE = '/api';
const TOKEN_KEY = 'frisca_admin_token';

/**
 * دالة مساعدة للحصول على توكن الأدمن من التخزين المؤقت
 */
export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string, persist = true) {
  if (persist) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
}

export function removeAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

/**
 * دالة مساعدة لتنفيذ طلبات Fetch مع الترويسات والتوكن
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; [key: string]: any }> {
  const token = getAdminToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await response.json();
      return json;
    }

    return {
      success: response.ok,
      message: response.statusText,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Network error connecting to API',
    };
  }
}

/**
 * 1. جلب كافة بيانات الموقع من السيرفر (عام - لكل الزوار)
 */
export async function fetchAllServerData() {
  return fetchApi<{
    categories: FriscaCategory[];
    menuItems: FriscaMenuItem[];
    gallery: typeof FRISCA_GALLERY_IMAGES;
    siteTexts: typeof FRISCA_TEXTS;
    menuStats: MenuVisitorStats;
    adminInfo: { username: string; lastUpdated: string } | null;
  }>('/data.php');
}

/**
 * 2. تسجيل دخول الأدمن
 */
export async function loginAdminApi(username: string, password: string) {
  const res = await fetchApi<{ token: string; admin: { username: string } }>('/login.php', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  if (res.success && res.token) {
    setAdminToken(res.token, true);
  }

  return res;
}

/**
 * 3. التحقق من صلاحية التوكن الحالي
 */
export async function verifyTokenApi() {
  const token = getAdminToken();
  if (!token) return { success: false, authenticated: false };
  return fetchApi<{ authenticated: boolean }>('/login.php', { method: 'GET' });
}

/**
 * 4. رفع صورة إلى السيرفر (حفظ في uploads/ وإرجاع الرابط)
 */
export async function uploadImageApi(
  fileOrBase64: File | string
): Promise<{ success: boolean; url?: string; message?: string }> {
  if (typeof fileOrBase64 === 'string') {
    // رفع كـ Base64
    return fetchApi<{ url: string }>('/upload.php', {
      method: 'POST',
      body: JSON.stringify({ imageBase64: fileOrBase64 }),
    });
  }

  // رفع كـ Multipart File
  const formData = new FormData();
  formData.append('image', fileOrBase64);

  const token = getAdminToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_BASE}/upload.php`, {
      method: 'POST',
      headers,
      body: formData,
    });
    return await res.json();
  } catch (e: any) {
    return { success: false, message: e?.message || 'Upload error' };
  }
}

/**
 * 5. أطباق المنيو (Menu Items)
 */
export async function createMenuItemApi(item: Omit<FriscaMenuItem, 'id'> & { id?: string }) {
  return fetchApi('/menu.php', {
    method: 'POST',
    body: JSON.stringify(item),
  });
}

export async function updateMenuItemApi(id: string, updated: Partial<FriscaMenuItem>) {
  return fetchApi('/menu.php', {
    method: 'PUT',
    body: JSON.stringify({ id, ...updated }),
  });
}

export async function deleteMenuItemApi(id: string) {
  return fetchApi(`/menu.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

/**
 * 6. تصنيفات المنيو (Categories)
 */
export async function createCategoryApi(cat: { id?: string; nameAr: string; nameEn: string }) {
  return fetchApi('/categories.php', {
    method: 'POST',
    body: JSON.stringify(cat),
  });
}

export async function updateCategoryApi(id: string, updated: Partial<FriscaCategory>) {
  return fetchApi('/categories.php', {
    method: 'PUT',
    body: JSON.stringify({ id, ...updated }),
  });
}

export async function deleteCategoryApi(id: string) {
  return fetchApi(`/categories.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

/**
 * 7. معرض الصور (Gallery)
 */
export async function createGalleryImageApi(data: { title?: string; titleAr?: string; titleEn?: string; image: string }) {
  const mainTitle = data.titleAr || data.title || data.titleEn || '';
  return fetchApi('/gallery.php', {
    method: 'POST',
    body: JSON.stringify({
      title: mainTitle,
      titleAr: data.titleAr || mainTitle,
      titleEn: data.titleEn || mainTitle,
      image: data.image,
    }),
  });
}

export async function updateGalleryImageApi(id: string, updated: { titleAr?: string; titleEn?: string; title?: string; image?: string }) {
  return fetchApi('/gallery.php', {
    method: 'PUT',
    body: JSON.stringify({ id, ...updated }),
  });
}

export async function deleteGalleryImageApi(id: string) {
  return fetchApi(`/gallery.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

/**
 * 8. نصوص وهوية وشعار الموقع
 */
export async function saveSiteTextsApi(texts: Partial<typeof FRISCA_TEXTS>) {
  return fetchApi('/texts.php', {
    method: 'POST',
    body: JSON.stringify(texts),
  });
}

/**
 * 9. إحصائيات المنيو
 */
export async function recordStatVisitApi(isNewUnique: boolean, label: string) {
  return fetchApi('/stats.php', {
    method: 'POST',
    body: JSON.stringify({ action: 'visit', isNewUnique, label }),
  });
}

export async function recordStatDishViewApi(dishId: string, dishTitle: string) {
  return fetchApi('/stats.php', {
    method: 'POST',
    body: JSON.stringify({ action: 'dish', dishId, dishTitle }),
  });
}

export async function recordStatCategoryViewApi(categoryId: string, categoryTitle: string) {
  return fetchApi('/stats.php', {
    method: 'POST',
    body: JSON.stringify({ action: 'category', categoryId, categoryTitle }),
  });
}

export async function resetStatsApi() {
  return fetchApi('/stats.php', {
    method: 'DELETE',
  });
}

/**
 * 10. حجوزات الطاولات
 */
export async function createBookingApi(booking: {
  name: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  dish?: string;
}) {
  return fetchApi('/bookings.php', {
    method: 'POST',
    body: JSON.stringify(booking),
  });
}

export async function updateBookingStatusApi(id: string, status: TableBooking['status']) {
  return fetchApi('/bookings.php', {
    method: 'PUT',
    body: JSON.stringify({ id, status }),
  });
}

/**
 * 11. تحديث بيانات الأدمن
 */
export async function updateAdminCredentialsApi(creds: { username: string; password: string }) {
  return fetchApi('/admin-credentials.php', {
    method: 'PUT',
    body: JSON.stringify(creds),
  });
}
