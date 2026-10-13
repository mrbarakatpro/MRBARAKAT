export type AdminLang = 'ar' | 'en';

export interface AdminTranslations {
  // Top Header
  title: string;
  badge: string;
  subtitle: string;
  securityBtn: string;
  securityShort: string;
  restoreDefaults: string;
  previewSite: string;
  logout: string;
  langToggle: string;

  // Sidebar & Navigation Tabs
  sidebarTitle: string;
  tabVisuals: string;
  tabVisualsDesc: string;
  tabLogo: string;
  tabLogoBadge: string;
  tabMenu: string;
  tabCategories: string;
  tabAnalytics: string;
  tabAnalyticsBadge: string;
  tabGallery: string;
  tabTexts: string;
  tabBookings: string;
  tabSecurity: string;
  securityHintTitle: string;
  securityHintDesc: string;

  // Analytics Tab
  analyticsHeaderTitle: string;
  analyticsHeaderSub: string;
  statTotalVisits: string;
  statTodayVisits: string;
  statUniqueVisitors: string;
  statTotalDishViews: string;
  topViewedDishesTitle: string;
  topViewedDishesSub: string;
  viewsCount: string;
  categoryInterestTitle: string;
  categoryInterestSub: string;
  recentActivityTitle: string;
  liveIndicator: string;
  resetStatsBtn: string;
  statsResetSuccess: string;

  // Visuals Tab
  visualsHeaderTitle: string;
  visualsHeaderSub: string;
  saveChanges: string;
  heroSectionTitle: string;
  heroCurrentOpacity: string;
  previewOpacity: string;
  changeHeroImage: string;
  opacitySliderLabel: string;
  identitySectionTitle: string;
  identitySectionSub: string;
  changeIdentityImage: string;
  slideshowSpeedTitle: string;
  slideshowSpeedSub: string;
  speedSliderLabel: string;
  currentSeconds: string;
  slideshowActive: string;
  manageSlideshowLink: string;
  saveAllVisualsBtn: string;

  // Logo Tab
  logoBadge: string;
  logoHeaderTitle: string;
  logoHeaderSub: string;
  logoLivePreviewTitle: string;
  logoActiveNotice: string;
  logoDefaultNotice: string;
  logoNavbarSimLabel: string;
  logoNavHome: string;
  logoNavMenu: string;
  logoNavBook: string;
  logoAspectTitle: string;
  logoAspectDesc: string;
  logoRestoreDefaultBtn: string;
  logoUploadTitle: string;
  logoUploadSub: string;
  logoUploadClickLabel: string;
  logoUploadFormats: string;
  logoPresetsTitle: string;
  logoPresetsReady: string;
  logoPresetsSub: string;
  logoPreset1Title: string;
  logoPreset1Desc: string;
  logoPreset2Title: string;
  logoPreset2Desc: string;
  logoPreset3Title: string;
  logoPreset3Desc: string;
  logoActiveBtn: string;
  logoSelectApplyBtn: string;

  // Menu Tab
  menuHeaderTitle: string;
  menuHeaderSub: string;
  addNewDishBtn: string;
  changeImageBtn: string;
  editBtn: string;
  deleteBtn: string;
  confirmDeleteDish: string;
  currency: string;
  noDishesNotice: string;
  noDishesSub: string;

  // Dish Modal
  modalEditDishTitle: string;
  modalAddDishTitle: string;
  modalDishSub: string;
  nameArLabel: string;
  nameEnLabel: string;
  categoryLabel: string;
  priceLabel: string;
  descArLabel: string;
  descEnLabel: string;
  descArPlaceholder: string;
  descEnPlaceholder: string;
  tagLabel: string;
  noTag: string;
  tagBestSeller: string;
  tagChefChoice: string;
  tagVegetarian: string;
  dishImageLabel: string;
  chooseImageFromDevice: string;
  replaceImageFromDevice: string;
  removeImage: string;
  imageReadyNotice: string;
  imageReadySub: string;
  saveDishChangesBtn: string;
  addDishNowBtn: string;
  cancelBtn: string;

  // Categories Tab
  categoriesHeaderTitle: string;
  categoriesHeaderSub: string;
  addNewCategoryBtn: string;
  catNameArLabel: string;
  catNameEnLabel: string;
  catIdLabel: string;
  catIdHint: string;
  catDishesCount: string;
  editCategoryTitle: string;
  addCategoryTitle: string;
  confirmDeleteCategory: string;
  cannotDeleteCategoryWithDishes: string;
  saveCategoryBtn: string;
  addCategorySubmitBtn: string;
  noCategoriesNotice: string;
  defaultCatBadge: string;

  // Gallery Tab
  galleryHeaderTitle: string;
  galleryHeaderSub: string;
  galleryImgTitleLabel: string;
  galleryImgTitleArLabel: string;
  galleryImgTitleEnLabel: string;
  galleryImgUploadLabel: string;
  galleryAddImageBtn: string;
  galleryEditImageBtn: string;
  gallerySaveImageBtn: string;
  galleryCurrentImagesTitle: string;
  confirmDeleteGallery: string;

  // Texts Tab
  textsHeaderTitle: string;
  textsHeaderSub: string;
  topBarSection: string;
  locationLabel: string;
  phoneLabel: string;
  hoursLabel: string;
  emailLabel: string;
  heroTextsSection: string;
  kickerLabel: string;
  title1Label: string;
  title2Label: string;
  subtitleLabel: string;
  identitySection: string;
  saveAllTextsBtn: string;

  // Bookings Tab
  bookingsHeaderTitle: string;
  bookingsHeaderSub: string;
  totalBookings: string;
  filterAll: string;
  filterConfirmed: string;
  filterPending: string;
  filterCancelled: string;
  clientLabel: string;
  guestsCountLabel: string;
  datetimeLabel: string;
  preferredDishLabel: string;
  statusLabel: string;
  statusConfirmed: string;
  statusPending: string;
  statusCancelled: string;
  contactWhatsApp: string;
  noBookingsNotice: string;

  // Security Tab
  securityHeaderBadge: string;
  securityHeaderTitle: string;
  securityHeaderSub: string;
  currentCredsTitle: string;
  currentUsernameLabel: string;
  protectionStatusLabel: string;
  protectedWithPassword: string;
  updateCredsTitle: string;
  newUsernameLabel: string;
  newPasswordLabel: string;
  confirmPasswordLabel: string;
  showPassword: string;
  hidePassword: string;
  saveNewCredsBtn: string;

  // Notifications & Alerts
  dishUpdatedSuccess: string;
  dishAddedSuccess: string;
  dishDeletedSuccess: string;
  dishImageUpdatedSuccess: string;
  catAddedSuccess: string;
  catUpdatedSuccess: string;
  catDeletedSuccess: string;
  galleryAddedSuccess: string;
  galleryDeletedSuccess: string;
  visualsSavedSuccess: string;
  textsSavedSuccess: string;
  defaultsRestoredSuccess: string;
  credsUpdatedSuccess: string;
  logoSavedSuccess: string;
  logoRestoredSuccess: string;
  logoPresetAppliedSuccess: string;
  errSelectImage: string;
  errFileNotImage: string;
  errFileSizeLarge: string;
  errFillCategoryFields: string;
  errFillRequiredFields: string;
  errPasswordLength: string;
  errPasswordMismatch: string;
  errEnterUsername: string;

  // Login Screen
  loginTitle: string;
  loginSubtitle: string;
  loginUsernameLabel: string;
  loginUsernamePlaceholder: string;
  loginPasswordLabel: string;
  loginPasswordPlaceholder: string;
  loginSubmitBtn: string;
  loginBackToSite: string;
  loginErrorEmpty: string;
  loginErrorInvalid: string;
  loginSecurityBadge: string;
}

export const ADMIN_TRANSLATIONS: Record<AdminLang, AdminTranslations> = {
  ar: {
    title: 'لوحة تحكم مطعم فريسكا',
    badge: 'PRO CONTROL PANEL',
    subtitle: 'التحكم في المنيو، التصنيفات، الصور، وهوية المطعم',
    securityBtn: 'أمان الحساب وتغيير الرمز',
    securityShort: 'الأمان',
    restoreDefaults: 'استعادة الأصل',
    previewSite: 'معاينة الموقع للزوار',
    logout: 'تسجيل خروج',
    langToggle: 'English',

    sidebarTitle: 'إعدادات الكونترول بنل',
    tabVisuals: 'الصور والشفافية والسلايد شو',
    tabVisualsDesc: 'تعديل صورة الهيدر والشفافية',
    tabLogo: 'لوجو وشعار المطعم',
    tabLogoBadge: 'جديد',
    tabMenu: 'إدارة المنيو والأسعار',
    tabCategories: 'إدارة التصنيفات',
    tabAnalytics: 'إحصائيات زوار المنيو',
    tabAnalyticsBadge: 'مباشر',
    tabGallery: 'معرض السلايد شو المتحرك',
    tabTexts: 'نصوص وهوية الموقع',
    tabBookings: 'حجوزات الطاولات',
    tabSecurity: 'بيانات الدخول والأمان',
    securityHintTitle: 'أمان لوحة التحكم:',
    securityHintDesc: 'يمكنك تغيير اسم المستخدم وكلمة المرور في أي وقت من تبويب الأمان.',

    // Analytics Tab
    analyticsHeaderTitle: 'إحصائيات وزوار قائمة الطعام (Menu Analytics)',
    analyticsHeaderSub: 'متابعة تفاعلات الزوار، عدد المشاهدات اللحظية، والأطباق الأكثر طلباً واهتماماً',
    statTotalVisits: 'إجمالي زيارات المنيو',
    statTodayVisits: 'زيارات اليوم',
    statUniqueVisitors: 'الزوار الفريدين التقديريين',
    statTotalDishViews: 'مشاهدات وتفاصيل الأطباق',
    topViewedDishesTitle: 'الأطباق الأكثر مشاهدة وإقبالاً',
    topViewedDishesSub: 'الأطباق التي حازت على أعلى نسبة اهتمام ومشاهدة من زوار المنيو',
    viewsCount: 'مشاهدة',
    categoryInterestTitle: 'اهتمامات الزوار حسب التصنيفات',
    categoryInterestSub: 'توزيع تفاعل الزوار عبر مختلف أقسام المنيو',
    recentActivityTitle: 'سجل التفاعل والزيارات الأخيرة',
    liveIndicator: 'تتبع لحظي نشط',
    resetStatsBtn: 'إعادة تعيين الإحصائيات',
    statsResetSuccess: 'تمت إعادة تعيين إحصائيات الزوار بنجاح!',

    visualsHeaderTitle: 'التحكم في صور الهيدر والشفافية والسلايد شو',
    visualsHeaderSub: 'تعديل صورة الهيدر ونسبة شفافيتها (50%)، صورة المجلس الصغير، وإعدادات السلايد شو المتحرك',
    saveChanges: 'حفظ التعديلات',
    heroSectionTitle: 'صورة خلفية الهيدر ونسبة الشفافية (Opacity 50%)',
    heroCurrentOpacity: 'الشفافية الحالية:',
    previewOpacity: 'معاينة الشفافية',
    changeHeroImage: 'تغيير صورة الهيدر من جهازك:',
    opacitySliderLabel: 'شريط سحب وضبط نسبة الشفافية (Opacity Slider):',
    identitySectionTitle: 'صورة المجلس الرئيسي - فرع السيف (هوية فريسكا)',
    identitySectionSub: 'يمكنك تغيير صورة قاعة السيف الظاهرة في قسم «هوية فريسكا» من جهازك',
    changeIdentityImage: 'تغيير صورة المجلس من جهازك:',
    slideshowSpeedTitle: 'سرعة تحريك شريط السلايد شو (Marquee Speed)',
    slideshowSpeedSub: 'تحكم في سرعة انسياب شريط الصور التلقائي في الصفحة الرئيسية لمطعم فريسكا',
    speedSliderLabel: 'مدة دورة الحركة (بالثواني):',
    currentSeconds: 'ثانية',
    slideshowActive: '✓ السلايد شو مفعل ونشط تلقائياً',
    manageSlideshowLink: 'إدارة وإضافة صور للسلايد شو ↗',
    saveAllVisualsBtn: 'حفظ كافة التعديلات البصرية فوراً',

    logoBadge: 'الهوية البصرية والعلامة التجارية',
    logoHeaderTitle: 'لوجو وشعار مطعم فريسكا (Restaurant Brand Logo)',
    logoHeaderSub: 'يمكنك رفع لوجو المطعم الخاص بك من جهازك مباشرة، أو اختيار أحد الشعارات الـ 3 المقترحة. يتم حفظ اللوجو واستخدامه تلقائياً في كامل الموقع مع الحفاظ التام على أبعاده.',
    logoLivePreviewTitle: 'المعاينة الحية للوجو الحالي في الموقع',
    logoActiveNotice: 'لوجو نشط ومحفوظ حالياً',
    logoDefaultNotice: 'الشعار الملكي الافتراضي (Default Crest)',
    logoNavbarSimLabel: 'معاينة كيف يظهر في شريط التنقل العلوي (Navbar Preview):',
    logoNavHome: 'الرئيسية',
    logoNavMenu: 'قائمة الطعام',
    logoNavBook: 'احجز طاولتك',
    logoAspectTitle: '✓ الحفاظ التام على أبعاد اللوجو:',
    logoAspectDesc: 'يتم استخدام تقنية object-contain الذكية لضمان عدم حدوث أي شد أو تشويه لأبعاد الشعار مهما كان شكله.',
    logoRestoreDefaultBtn: 'استعادة الشعار الملكي الأصلي',
    logoUploadTitle: 'رفع لوجو مخصص من جهازك (Upload Custom Logo)',
    logoUploadSub: 'اختر ملف صورة للوجو الخاص بمطعمك (صيغة PNG بخلفية شفافة، أو JPG أو SVG أو WebP)',
    logoUploadClickLabel: 'اضغط هنا لاختيار ملف اللوجو من حاسوبك أو هاتفك',
    logoUploadFormats: 'يدعم صيغ PNG الشفافة، SVG، JPG، WebP حتى 10 ميجابايت مع ضغط آلي فائق الجودة',
    logoPresetsTitle: '3 لوجهات وتصاميم مقترحة صممت خصيصاً لمطعم فريسكا',
    logoPresetsReady: 'جاهزة للتطبيق الفوري',
    logoPresetsSub: 'يمكنك التبديل بين اللوجهات الثلاثة المقترحة بنقرة زر واحدة لرؤية النتيجة فوراً',
    logoPreset1Title: '1. الشعار الملكي التراثي',
    logoPreset1Desc: 'حلقة عنابية مذهبة مع حرف F الإمبراطوري الكلاسيكي',
    logoPreset2Title: '2. المونوغرام العصري المتوج',
    logoPreset2Desc: 'تصميم هندسي فخم ومينيمال مع تاج ذهبي ملوكي',
    logoPreset3Title: '3. الختم الإيطالي (Italian Seal)',
    logoPreset3Desc: 'ختم طهي أيقوني مع قبعة الشيف ونقوش البحر الأبيض المتوسط',
    logoActiveBtn: '✓ الشعار النشط',
    logoSelectApplyBtn: 'اختيار وتطبيق',

    menuHeaderTitle: 'إدارة قائمة الطعام (المنيو)',
    menuHeaderSub: 'إضافة أطباق جديدة، تعديل الأسعار بالدينار البحريني، كتابة الوصف بالعربي والإنجليزي، وربطها بالتصنيفات',
    addNewDishBtn: 'إضافة طبق جديد',
    changeImageBtn: 'تغيير الصورة',
    editBtn: 'تعديل',
    deleteBtn: 'حذف',
    confirmDeleteDish: 'هل أنت متأكد من حذف هذا الطبق من المنيو؟',
    currency: 'د.ب',
    noDishesNotice: 'لا توجد أطباق مسجلة حالياً',
    noDishesSub: 'اضغط على زر «إضافة طبق جديد» للبدء في تعبئة قائمة الطعام',

    modalEditDishTitle: 'تعديل بيانات الطبق',
    modalAddDishTitle: 'إضافة طبق جديد للمنيو',
    modalDishSub: 'أدخل تفاصيل الطبق باللغتين العربية والإنجليزية وحدد السعر والتصنيف',
    nameArLabel: 'اسم الطبق بالعربية *',
    nameEnLabel: 'اسم الطبق بالإنجليزية *',
    categoryLabel: 'التصنيف *',
    priceLabel: 'السعر (دينار بحريني د.ب) *',
    descArLabel: 'الوصف بالعربية (Arabic Description) *',
    descEnLabel: 'الوصف بالإنجليزية (English Description) *',
    descArPlaceholder: 'اكتب وصف المكونات والنكهة بالعربية...',
    descEnPlaceholder: 'Write dish description and ingredients in English...',
    tagLabel: 'الوسم الخاص (Tag)',
    noTag: 'بدون وسم',
    tagBestSeller: 'الأكثر طلباً',
    tagChefChoice: 'توصية الشيف',
    tagVegetarian: 'نباتي',
    dishImageLabel: 'صورة الطبق (من جهازك)',
    chooseImageFromDevice: 'اختيار صورة من جهازك',
    replaceImageFromDevice: 'استبدال الصورة من جهازك',
    removeImage: 'حذف الصورة',
    imageReadyNotice: 'تم تجهيز الصورة بنجاح',
    imageReadySub: 'ستظهر في بطاقة الصنف ومعاينة المنيو',
    saveDishChangesBtn: 'حفظ تعديلات الطبق',
    addDishNowBtn: 'إضافة الطبق للمنيو فوراً',
    cancelBtn: 'إلغاء',

    categoriesHeaderTitle: 'إدارة التصنيفات (Categories Management)',
    categoriesHeaderSub: 'إضافة تصنيفات جديدة للمنيو، تعديل الأسماء بالعربية والإنجليزية، وحذف التصنيفات غير المستخدمة',
    addNewCategoryBtn: 'إضافة تصنيف جديد',
    catNameArLabel: 'اسم التصنيف بالعربية *',
    catNameEnLabel: 'اسم التصنيف بالإنجليزية *',
    catIdLabel: 'المعرّف الثابت (ID) *',
    catIdHint: 'حروف وأرقام إنجليزية فقط بدون مسافات، مثل: seafood, bakery',
    catDishesCount: 'أطباق مرتبطة',
    editCategoryTitle: 'تعديل بيانات التصنيف',
    addCategoryTitle: 'إضافة تصنيف جديد للمنيو',
    confirmDeleteCategory: 'هل أنت متأكد من حذف هذا التصنيف؟',
    cannotDeleteCategoryWithDishes: 'لا يمكن حذف هذا التصنيف لوجود أطباق مرتبطة به. يرجى نقل الأطباق لتصنيف آخر أولاً.',
    saveCategoryBtn: 'حفظ تعديلات التصنيف',
    addCategorySubmitBtn: 'إضافة التصنيف فوراً',
    noCategoriesNotice: 'لا توجد تصنيفات مسجلة',
    defaultCatBadge: 'تصنيف رئيسي',

    galleryHeaderTitle: 'إضافة صور إلى السلايد شو المتحرك',
    galleryHeaderSub: 'يمكنك رفع صور من جهازك لتنضم فوراً لشريط السلايد شو في الصفحة الرئيسية لمطعم فريسكا بالاسمين العربي والإنجليزي',
    galleryImgTitleLabel: 'عنوان الصورة',
    galleryImgTitleArLabel: 'اسم الصورة بالعربية *',
    galleryImgTitleEnLabel: 'اسم الصورة بالإنجليزية *',
    galleryImgUploadLabel: 'رفع صورة من جهازك',
    galleryAddImageBtn: 'إضافة الصورة للمعرض فوراً',
    galleryEditImageBtn: 'تعديل أسماء الصورة',
    gallerySaveImageBtn: 'حفظ التعديلات',
    galleryCurrentImagesTitle: 'الصور النشطة في شريط السلايد شو الحالي',
    confirmDeleteGallery: 'هل أنت متأكد من حذف هذه الصورة من المعرض؟',

    textsHeaderTitle: 'تعديل نصوص وهوية الموقع',
    textsHeaderSub: 'التحكم في بيانات التواصل، نصوص قسم الهيرو، وهوية المجلس لفرع السيف',
    topBarSection: 'بيانات الشريط العلوي والاتصال (Top Bar & Contact)',
    locationLabel: 'العنوان / الموقع',
    phoneLabel: 'رقم الهاتف / الواتساب',
    hoursLabel: 'أوقات العمل',
    emailLabel: 'البريد الإلكتروني',
    heroTextsSection: 'نصوص واجهة الهيرو الرئيسية (Hero Section)',
    kickerLabel: 'الشارة الترويجية (Kicker)',
    title1Label: 'العنوان السطر الأول',
    title2Label: 'العنوان السطر الثاني',
    subtitleLabel: 'الوصف التعريفي للهيرو',
    identitySection: 'قسم هوية فريسكا (Frisca Identity)',
    saveAllTextsBtn: 'حفظ كافة النصوص المحدثة',

    bookingsHeaderTitle: 'سجل حجوزات الطاولات',
    bookingsHeaderSub: 'إدارة وتتبع طلبات حجز الطاولات الواردة من زوار الموقع وتحديث حالتها أو التواصل المباشر عبر واتساب',
    totalBookings: 'إجمالي الحجوزات:',
    filterAll: 'الكل',
    filterConfirmed: 'مؤكد',
    filterPending: 'قيد الانتظار',
    filterCancelled: 'ملغي',
    clientLabel: 'العميل',
    guestsCountLabel: 'الأفراد',
    datetimeLabel: 'الموعد',
    preferredDishLabel: 'الطلب المفضل',
    statusLabel: 'الحالة',
    statusConfirmed: 'مؤكد',
    statusPending: 'قيد الانتظار',
    statusCancelled: 'ملغي',
    contactWhatsApp: 'واتساب',
    noBookingsNotice: 'لا توجد حجوزات مسجلة بهذه التصفية',

    securityHeaderBadge: 'أمان لوحة التحكم وحماية النظام',
    securityHeaderTitle: 'تعديل اسم المستخدم وكلمة المرور (Username & Password)',
    securityHeaderSub: 'قم بتعيين اسم مستخدم جديد وكلمة مرور سرية خاصة بك للوصول إلى لوحة تحكم مطعم فريسكا',
    currentCredsTitle: 'البيانات الحالية النشطة في النظام',
    currentUsernameLabel: 'اسم المستخدم الحالي:',
    protectionStatusLabel: 'حالة الحماية:',
    protectedWithPassword: 'محمي بكلمة مرور',
    updateCredsTitle: 'تحديث بيانات الدخول الجديدة',
    newUsernameLabel: 'اسم المستخدم الجديد (New Username) *',
    newPasswordLabel: 'كلمة المرور الجديدة (New Password) *',
    confirmPasswordLabel: 'تأكيد كلمة المرور الجديدة (Confirm Password)',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور',
    saveNewCredsBtn: 'حفظ وتحديث بيانات الدخول فوراً',

    dishUpdatedSuccess: 'تم تحديث بيانات الطبق بنجاح!',
    dishAddedSuccess: 'تمت إضافة الطبق الجديد إلى المنيو بنجاح!',
    dishDeletedSuccess: 'تم حذف الطبق من المنيو بنجاح.',
    dishImageUpdatedSuccess: 'تم تحديث صورة الطبق بنجاح!',
    catAddedSuccess: 'تمت إضافة التصنيف الجديد بنجاح!',
    catUpdatedSuccess: 'تم تحديث بيانات التصنيف بنجاح!',
    catDeletedSuccess: 'تم حذف التصنيف بنجاح.',
    galleryAddedSuccess: 'تمت إضافة الصورة للسلايد شو بنجاح!',
    galleryDeletedSuccess: 'تم حذف الصورة من السلايد شو بنجاح.',
    visualsSavedSuccess: 'تم حفظ كافة التعديلات البصرية بنجاح!',
    textsSavedSuccess: 'تم حفظ وتحديث نصوص الموقع بنجاح!',
    defaultsRestoredSuccess: 'تمت استعادة الإعدادات الأصلية بنجاح!',
    credsUpdatedSuccess: 'تم تحديث اسم المستخدم وكلمة المرور للوحة التحكم بنجاح!',
    logoSavedSuccess: 'تم رفع وحفظ لوجو المطعم بنجاح وسيعرض في كامل الموقع!',
    logoRestoredSuccess: 'تمت استعادة الشعار الملكي الأصلي بنجاح!',
    logoPresetAppliedSuccess: 'تم تطبيق الشعار المقترح بنجاح!',
    errSelectImage: 'يرجى اختيار صورة أولاً.',
    errFileNotImage: 'الملف المختار ليس صورة صالحة. يرجى اختيار ملف صورة (PNG, JPG, SVG, WebP).',
    errFileSizeLarge: 'حجم الصورة كبير جداً (أكثر من 10 ميجابايت). يرجى اختيار صورة أصغر حجماً.',
    errFillCategoryFields: 'يرجى ملء اسم التصنيف بالعربية والإنجليزية والمعرف الثابت.',
    errFillRequiredFields: 'يرجى ملء جميع الحقول المطلوبة.',
    errPasswordLength: 'يجب أن تتكون كلمة المرور من 4 أحرف على الأقل.',
    errPasswordMismatch: 'تأكيد كلمة المرور غير متطابق مع كلمة المرور الجديدة.',
    errEnterUsername: 'يرجى إدخال اسم مستخدم صالح.',

    // Login Screen
    loginTitle: 'تسجيل دخول لوحة التحكم',
    loginSubtitle: 'يرجى إدخال اسم المستخدم وكلمة المرور للوصول إلى إدارة مطعم فريسكا',
    loginUsernameLabel: 'اسم المستخدم (Username)',
    loginUsernamePlaceholder: 'أدخل اسم المستخدم...',
    loginPasswordLabel: 'كلمة المرور (Password)',
    loginPasswordPlaceholder: 'أدخل كلمة المرور...',
    loginSubmitBtn: 'تسجيل الدخول إلى لوحة التحكم',
    loginBackToSite: 'العودة لموقع فريسكا',
    loginErrorEmpty: 'يرجى كتابة اسم المستخدم وكلمة المرور.',
    loginErrorInvalid: 'اسم المستخدم أو كلمة المرور غير صحيحة. يرجى المحاولة مجدداً.',
    loginSecurityBadge: 'نظام إدارة محمي وآمن',
  },

  en: {
    title: 'Frisca Control Panel',
    badge: 'PRO CONTROL PANEL',
    subtitle: 'Manage menu items, categories, visuals, and restaurant branding',
    securityBtn: 'Account Security & Password',
    securityShort: 'Security',
    restoreDefaults: 'Reset Defaults',
    previewSite: 'View Live Site',
    logout: 'Logout',
    langToggle: 'العربية',

    sidebarTitle: 'CONTROL PANEL SETTINGS',
    tabVisuals: 'Visuals, Opacity & Slideshow',
    tabVisualsDesc: 'Hero image and opacity settings',
    tabLogo: 'Restaurant Logo & Branding',
    tabLogoBadge: 'NEW',
    tabMenu: 'Menu Items & Pricing',
    tabCategories: 'Category Management',
    tabAnalytics: 'Menu Visitor Analytics',
    tabAnalyticsBadge: 'LIVE',
    tabGallery: 'Animated Slideshow Gallery',
    tabTexts: 'Site Texts & Identity',
    tabBookings: 'Table Bookings',
    tabSecurity: 'Login Credentials & Security',
    securityHintTitle: 'Control Panel Security:',
    securityHintDesc: 'You can change your username and password anytime from the Security tab.',

    // Analytics Tab
    analyticsHeaderTitle: 'Menu Visitor Statistics & Engagement',
    analyticsHeaderSub: 'Track real-time visitor counts, daily pageviews, and most engaged menu items',
    statTotalVisits: 'Total Menu Pageviews',
    statTodayVisits: "Today's Visits",
    statUniqueVisitors: 'Unique Visitors',
    statTotalDishViews: 'Dish Detail Views',
    topViewedDishesTitle: 'Most Viewed Dishes',
    topViewedDishesSub: 'Menu items with highest customer interest and view rates',
    viewsCount: 'views',
    categoryInterestTitle: 'Visitor Interest by Category',
    categoryInterestSub: 'Engagement distribution across menu categories',
    recentActivityTitle: 'Recent Visitor Activity & Sessions',
    liveIndicator: 'Live Real-time Tracking',
    resetStatsBtn: 'Reset Analytics',
    statsResetSuccess: 'Visitor statistics reset successfully!',

    visualsHeaderTitle: 'Header Visuals, Opacity & Slideshow Settings',
    visualsHeaderSub: 'Control header background image, 50% opacity slider, VIP lounge photo, and carousel marquee speed',
    saveChanges: 'Save Changes',
    heroSectionTitle: 'Header Background Image & Opacity (50% Default)',
    heroCurrentOpacity: 'Current Opacity:',
    previewOpacity: 'Preview Opacity',
    changeHeroImage: 'Upload Header Background from your device:',
    opacitySliderLabel: 'Opacity Slider Control (%):',
    identitySectionTitle: 'Seef Hall Main Lounge Image (Frisca Identity)',
    identitySectionSub: 'Replace the Seef branch lounge image featured on the Frisca Identity section',
    changeIdentityImage: 'Upload Lounge Image from your device:',
    slideshowSpeedTitle: 'Animated Slideshow Marquee Speed',
    slideshowSpeedSub: 'Adjust the automated continuous sliding speed on Frisca homepage',
    speedSliderLabel: 'Cycle duration (in seconds):',
    currentSeconds: 'seconds',
    slideshowActive: '✓ Slideshow is active and running',
    manageSlideshowLink: 'Manage & add slideshow photos ↗',
    saveAllVisualsBtn: 'Save All Visual Settings Now',

    logoBadge: 'Visual Identity & Branding',
    logoHeaderTitle: 'Frisca Restaurant Brand Logo',
    logoHeaderSub: 'Upload your custom restaurant logo from your device, or choose one of 3 tailored preset logos. Automatically applied across header, footer, booking modal, and login screens while strictly preserving aspect ratio.',
    logoLivePreviewTitle: 'Live Logo Preview on Website',
    logoActiveNotice: 'Currently Active & Saved Logo',
    logoDefaultNotice: 'Default Imperial Crest Emblem',
    logoNavbarSimLabel: 'Navbar Header Simulation Preview:',
    logoNavHome: 'Home',
    logoNavMenu: 'Menu',
    logoNavBook: 'Book a Table',
    logoAspectTitle: '✓ Aspect Ratio Strictly Preserved:',
    logoAspectDesc: 'Using object-contain rendering to guarantee zero distortion, stretching, or warping regardless of logo shape.',
    logoRestoreDefaultBtn: 'Restore Original Imperial Crest',
    logoUploadTitle: 'Upload Custom Logo from Device',
    logoUploadSub: 'Select a transparent PNG, SVG, JPG, or WebP logo file from your computer or phone',
    logoUploadClickLabel: 'Click here to choose logo file from your device',
    logoUploadFormats: 'Supports PNG (transparent), SVG, JPG, WebP up to 10MB with automated high-definition compression',
    logoPresetsTitle: '3 Bespoke Preset Logos Tailored for Frisca',
    logoPresetsReady: 'Ready for 1-Click Apply',
    logoPresetsSub: 'Switch between these three elegant handcrafted logos with a single click',
    logoPreset1Title: '1. Imperial Heritage Crest',
    logoPreset1Desc: 'Burgundy and gold ring with classic imperial F monogram',
    logoPreset2Title: '2. Crowned Modern Monogram',
    logoPreset2Desc: 'Minimalist geometric lines with miniature golden crown',
    logoPreset3Title: '3. Italian Culinary Seal',
    logoPreset3Desc: 'Iconic Mediterranean chef seal with wheat wreath details',
    logoActiveBtn: '✓ Active Logo',
    logoSelectApplyBtn: 'Select & Apply',

    menuHeaderTitle: 'Menu & Dishes Management',
    menuHeaderSub: 'Add new dishes, update prices in Bahraini Dinar (BHD), write bilingual Arabic & English descriptions, and link with categories',
    addNewDishBtn: 'Add New Dish',
    changeImageBtn: 'Change Photo',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    confirmDeleteDish: 'Are you sure you want to remove this dish from the menu?',
    currency: 'BHD',
    noDishesNotice: 'No dishes registered in this category',
    noDishesSub: 'Click "Add New Dish" to begin populating your restaurant menu',

    modalEditDishTitle: 'Edit Dish Details',
    modalAddDishTitle: 'Add New Dish to Menu',
    modalDishSub: 'Enter bilingual dish details in Arabic and English, and configure price and category',
    nameArLabel: 'Dish Name (Arabic) *',
    nameEnLabel: 'Dish Name (English) *',
    categoryLabel: 'Category *',
    priceLabel: 'Price (Bahraini Dinar BHD) *',
    descArLabel: 'Arabic Description (الوصف بالعربي) *',
    descEnLabel: 'English Description (الوصف بالإنجليزي) *',
    descArPlaceholder: 'اكتب وصف المكونات والنكهة بالعربية...',
    descEnPlaceholder: 'Write dish description, flavor notes, and ingredients in English...',
    tagLabel: 'Special Tag',
    noTag: 'No Tag',
    tagBestSeller: 'Best Seller',
    tagChefChoice: "Chef's Choice",
    tagVegetarian: 'Vegetarian',
    dishImageLabel: 'Dish Photo (from device)',
    chooseImageFromDevice: 'Choose photo from device',
    replaceImageFromDevice: 'Replace photo from device',
    removeImage: 'Remove Photo',
    imageReadyNotice: 'Photo processed successfully',
    imageReadySub: 'Will appear on dish card and menu preview',
    saveDishChangesBtn: 'Save Dish Changes',
    addDishNowBtn: 'Add Dish to Menu Now',
    cancelBtn: 'Cancel',

    categoriesHeaderTitle: 'Category Management',
    categoriesHeaderSub: 'Add custom menu categories, update bilingual names in Arabic & English, and manage linked menu items',
    addNewCategoryBtn: 'Add New Category',
    catNameArLabel: 'Category Name (Arabic) *',
    catNameEnLabel: 'Category Name (English) *',
    catIdLabel: 'Unique Category ID *',
    catIdHint: 'Lowercase letters & numbers only without spaces, e.g. seafood, bakery',
    catDishesCount: 'Linked Dishes',
    editCategoryTitle: 'Edit Category Details',
    addCategoryTitle: 'Add New Menu Category',
    confirmDeleteCategory: 'Are you sure you want to delete this category?',
    cannotDeleteCategoryWithDishes: 'Cannot delete this category because dishes are currently linked to it. Please reassign the dishes first.',
    saveCategoryBtn: 'Save Category Changes',
    addCategorySubmitBtn: 'Add Category Now',
    noCategoriesNotice: 'No categories available',
    defaultCatBadge: 'Primary Category',

    galleryHeaderTitle: 'Add Photos to Slideshow Marquee',
    galleryHeaderSub: 'Upload photos from your computer with bilingual Arabic and English titles for the live homepage slideshow',
    galleryImgTitleLabel: 'Photo Title',
    galleryImgTitleArLabel: 'Photo Title (Arabic) *',
    galleryImgTitleEnLabel: 'Photo Title (English) *',
    galleryImgUploadLabel: 'Upload Photo from Device',
    galleryAddImageBtn: 'Add Photo to Gallery Now',
    galleryEditImageBtn: 'Edit Photo Titles',
    gallerySaveImageBtn: 'Save Changes',
    galleryCurrentImagesTitle: 'Active Photos in Current Slideshow',
    confirmDeleteGallery: 'Are you sure you want to remove this photo from the gallery?',

    textsHeaderTitle: 'Website Content & Identity Texts',
    textsHeaderSub: 'Update contact details, hero presentation phrases, and Seef lounge branding copy',
    topBarSection: 'Top Bar & Contact Information',
    locationLabel: 'Location / Address',
    phoneLabel: 'Phone / WhatsApp',
    hoursLabel: 'Opening Hours',
    emailLabel: 'Email Address',
    heroTextsSection: 'Homepage Hero Presentation Texts',
    kickerLabel: 'Kicker Tagline',
    title1Label: 'Title Line 1',
    title2Label: 'Title Line 2',
    subtitleLabel: 'Hero Descriptive Subtitle',
    identitySection: 'Frisca Identity Copy (Seef Branch)',
    saveAllTextsBtn: 'Save All Updated Texts',

    bookingsHeaderTitle: 'Table Reservations Log',
    bookingsHeaderSub: 'Manage and track table bookings submitted by website guests, update their status, or contact them directly via WhatsApp',
    totalBookings: 'Total Reservations:',
    filterAll: 'All',
    filterConfirmed: 'Confirmed',
    filterPending: 'Pending',
    filterCancelled: 'Cancelled',
    clientLabel: 'Guest',
    guestsCountLabel: 'Party Size',
    datetimeLabel: 'Date & Time',
    preferredDishLabel: 'Preferred Dish / Hall',
    statusLabel: 'Status',
    statusConfirmed: 'Confirmed',
    statusPending: 'Pending',
    statusCancelled: 'Cancelled',
    contactWhatsApp: 'WhatsApp',
    noBookingsNotice: 'No reservations found matching this filter',

    securityHeaderBadge: 'Control Panel Security & Access',
    securityHeaderTitle: 'Change Admin Username & Password',
    securityHeaderSub: 'Set up your personalized username and secret password to secure your Frisca control panel access',
    currentCredsTitle: 'Current Active Credentials in System',
    currentUsernameLabel: 'Current Username:',
    protectionStatusLabel: 'Protection Status:',
    protectedWithPassword: 'Password Protected',
    updateCredsTitle: 'Update New Login Credentials',
    newUsernameLabel: 'New Username *',
    newPasswordLabel: 'New Password *',
    confirmPasswordLabel: 'Confirm New Password',
    showPassword: 'Show Password',
    hidePassword: 'Hide Password',
    saveNewCredsBtn: 'Save & Update Login Credentials',

    dishUpdatedSuccess: 'Dish details updated successfully!',
    dishAddedSuccess: 'New dish added to menu successfully!',
    dishDeletedSuccess: 'Dish removed from menu successfully.',
    dishImageUpdatedSuccess: 'Dish photo updated successfully!',
    catAddedSuccess: 'New category added successfully!',
    catUpdatedSuccess: 'Category updated successfully!',
    catDeletedSuccess: 'Category deleted successfully.',
    galleryAddedSuccess: 'Photo added to slideshow successfully!',
    galleryDeletedSuccess: 'Photo removed from slideshow successfully.',
    visualsSavedSuccess: 'All visual settings saved successfully!',
    textsSavedSuccess: 'Website texts saved and updated successfully!',
    defaultsRestoredSuccess: 'Original settings restored successfully!',
    credsUpdatedSuccess: 'Admin username and password updated successfully!',
    logoSavedSuccess: 'Restaurant logo uploaded and saved across the website!',
    logoRestoredSuccess: 'Original imperial crest restored successfully!',
    logoPresetAppliedSuccess: 'Preset logo applied successfully!',
    errSelectImage: 'Please choose an image file first.',
    errFileNotImage: 'Selected file is not an image. Please choose PNG, JPG, SVG, or WebP.',
    errFileSizeLarge: 'Image file is too large (over 10MB). Please choose a smaller image.',
    errFillCategoryFields: 'Please provide category name in Arabic, English, and a unique ID.',
    errFillRequiredFields: 'Please fill in all required fields.',
    errPasswordLength: 'Password must be at least 4 characters long.',
    errPasswordMismatch: 'Password confirmation does not match the new password.',
    errEnterUsername: 'Please enter a valid username.',

    // Login Screen
    loginTitle: 'Control Panel Admin Login',
    loginSubtitle: 'Please enter your username and password to access Frisca restaurant management',
    loginUsernameLabel: 'Username',
    loginUsernamePlaceholder: 'Enter your username...',
    loginPasswordLabel: 'Password',
    loginPasswordPlaceholder: 'Enter your password...',
    loginSubmitBtn: 'Login to Admin Dashboard',
    loginBackToSite: 'Back to Frisca Website',
    loginErrorEmpty: 'Please enter both username and password.',
    loginErrorInvalid: 'Invalid username or password. Please try again.',
    loginSecurityBadge: 'Secure Admin Portal',
  },
};
