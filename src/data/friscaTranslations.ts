export type FriscaLanguage = 'ar' | 'en';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  currency: string;
  topBar: {
    location: string;
    hours: string;
    phone: string;
    dashboard: string;
  };
  nav: {
    home: string;
    menu: string;
    bookTable: string;
    favorites: string;
    cart: string;
    dashboard: string;
    backToHome: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    exploreMenuBtn: string;
    bookTableBtn: string;
    stats: {
      awards: string;
      guests: string;
      ingredients: string;
      vip: string;
    };
  };
  identity: {
    kicker: string;
    title: string;
    locationBadge: string;
    paragraph1: string;
    paragraph2: string;
    coastalViewTitle: string;
    coastalViewDesc: string;
    royalServiceTitle: string;
    royalServiceDesc: string;
    seefHallTitle: string;
    seefHallSub: string;
    seefHallLocation: string;
    bookSeefHallBtn: string;
    vipBadge: string;
    featureMenu: string;
    featureMenuSub: string;
    featureView: string;
    featureViewSub: string;
    featureService: string;
    featureServiceSub: string;
  };
  gallery: {
    kicker: string;
    title: string;
    dragHint: string;
  };
  menuPage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    categories: {
      all: string;
      pastas: string;
      mains: string;
      pizza: string;
      appetizers: string;
      desserts: string;
      drinks: string;
    };
    noResults: string;
    addToCart: string;
    addedToCart: string;
    viewDetails: string;
    clickImageForDesc: string;
    detailsModalTitle: string;
    close: string;
    dishDescription: string;
    ingredients: string;
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptySubtitle: string;
    browseMenuBtn: string;
    itemCount: string;
    subtotal: string;
    total: string;
    orderViaWhatsApp: string;
    clearCart: string;
    whatsappGreeting: string;
    whatsappTotal: string;
    whatsappNote: string;
  };
  bookingModal: {
    title: string;
    nameLabel: string;
    phoneLabel: string;
    guestsLabel: string;
    dateLabel: string;
    timeLabel: string;
    selectedDishLabel: string;
    submitBtn: string;
    whatsappBtn: string;
    successTitle: string;
    successMessage: string;
    closeBtn: string;
  };
  footer: {
    brandDesc: string;
    quickLinks: string;
    contactInfo: string;
    openingHours: string;
    copyright: string;
    location: string;
    phone: string;
    email: string;
    hoursDetail: string;
  };
}

export const FRISCA_TRANSLATIONS: Record<FriscaLanguage, TranslationDictionary> = {
  ar: {
    brandName: 'FRISCA',
    tagline: 'البحرين · تجربة طهي فاخرة',
    currency: 'د.ب',
    topBar: {
      location: 'ضفاف ضاحية السيف, المنامة - مملكة البحرين',
      hours: 'يومياً 12:00 م - 1:00 صباحاً',
      phone: '+973 1700 1122',
      dashboard: 'لوحة التحكم',
    },
    nav: {
      home: 'الرئيسية',
      menu: 'قائمة الطعام',
      bookTable: 'احجز طاولتك',
      favorites: 'المفضلة',
      cart: 'السلة',
      dashboard: 'لوحة التحكم',
      backToHome: 'العودة إلى الرئيسية',
    },
    hero: {
      kicker: 'الوجهة الأولى للطهي الفاخر في البحرين',
      titleLine1: 'مطعم فريسكا',
      titleLine2: 'الفخامة والرقي في قلب المنامة',
      subtitle: 'نأخذكم في رحلة طهي استثنائية تجمع بين نكهات البحر الأبيض المتوسط الأصيلة واللمسات البحرينية الحديثة، وسط أجواء مخملية وديكورات نبيتية تبهر الحواس.',
      exploreMenuBtn: 'استكشف قائمة الطعام',
      bookTableBtn: 'حجز طاولة خاصة',
      stats: {
        awards: 'جائزة طهي عالمية',
        guests: 'ضيف سعيد سنوياً',
        ingredients: 'مكونات طازجة وفاخرة',
        vip: 'قاعات جلسات خاصة',
      },
    },
    identity: {
      kicker: 'هوية فريسكا',
      title: 'حين يمتزج الشغف بالفخامة المطلقة',
      locationBadge: 'مملكة البحرين · ضاحية السيف',
      paragraph1: 'تم تأسيس مطعم وشريكة فريسكا (Frisca) بمملكة البحرين لتكون المعيار الجديد للضيافة الفاخرة. استوحينا الهوية من اللون النبيتي الفاخر لتعكس نبل المذاق وأناقة المكان.',
      paragraph2: 'نفتخر باستقطاب نخب الطهاة العالميين لتصميم أطباق متفردة ترتقي لأصحاب الذوق الرفيع، سواء في اجتماعات الأعمال الرسمية أو الأمسيات العائلية والخاصة.',
      coastalViewTitle: 'إطلالة البحرية الساحرة',
      coastalViewDesc: 'موقع استراتيجي في ضاحية السيف.',
      royalServiceTitle: 'خدمة ضيافة ملكية',
      royalServiceDesc: 'اهتمام بأدق التفاصيل لراحتكم.',
      seefHallTitle: 'المجلس الرئيسي - فرع السيف',
      seefHallSub: 'أجواء ساحرة وتصاميم مريحة',
      seefHallLocation: 'فرع ضاحية السيف · المنامة',
      bookSeefHallBtn: 'احجز في المجلس الرئيسي',
      vipBadge: 'جلسات VIP هادئة وعائلية',
      featureMenu: 'قائمة طعام حصرية',
      featureMenuSub: 'أطباق شيف فريسكا الخاصة',
      featureView: 'إطلالة على ضفاف السيف',
      featureViewSub: 'أجواء بحرية وموسيقى هادئة',
      featureService: 'خدمة ضيافة VIP',
      featureServiceSub: 'طاقم مخصص لراحتكم التامة',
    },
    gallery: {
      kicker: 'معرض فريسكا',
      title: 'عالم من الفخامة بانتظاركم',
      dragHint: 'سلايد شو متحرك - مرر لمشاهدة كافة اللقطات الحصرية',
    },
    menuPage: {
      title: 'قائمة الطعام',
      subtitle: 'أطباق إيطالية ومتوسطية معدة بأيدي أمهر الطهاة العالميين في مملكة البحرين.',
      searchPlaceholder: 'ابحث عن طبقك المفضل...',
      allCategories: 'كافة الأطباق',
      categories: {
        all: 'كافة الأطباق',
        pastas: 'الباستا والريزوتو',
        mains: 'الأطباق الرئيسية واللحوم',
        pizza: 'البيتزا النابولية',
        appetizers: 'المقبلات والشوربات',
        desserts: 'الحلويات الفاخرة',
        drinks: 'المشروبات والموكتيلات',
      },
      noResults: 'لا توجد أطباق مطابقة لبحثك',
      addToCart: 'إضافة إلى السلة',
      addedToCart: 'تمت الإضافة بنجاح ✓',
      viewDetails: 'عرض التفاصيل',
      clickImageForDesc: 'اضغط على الصورة لعرض الوصف والتفاصيل',
      detailsModalTitle: 'تفاصيل الطبق ومكوناته',
      close: 'إغلاق',
      dishDescription: 'وصف الطبق',
      ingredients: 'المكونات والتحضير',
    },
    cart: {
      title: 'سلة طلبات فريسكا',
      emptyTitle: 'سلتك فارغة حالياً',
      emptySubtitle: 'استكشف قائمة طعامنا الفاخرة وأضف أطباقك المفضلة لتجربتها الآن',
      browseMenuBtn: 'تصفح قائمة الطعام',
      itemCount: 'أطباق مختارة',
      subtotal: 'المجموع الفرعي',
      total: 'المجموع الكلي',
      orderViaWhatsApp: 'إتمام الطلب عبر واتساب',
      clearCart: 'تفريغ السلة',
      whatsappGreeting: 'مرحباً مطعم فريسكا البحرين، أود إتمام الطلب التالي:',
      whatsappTotal: 'المجموع الإجمالي',
      whatsappNote: 'يرجى تأكيد استلام الطلب ووقت التجهيز المتوقع. شكراً لكم!',
    },
    bookingModal: {
      title: 'حجز طاولة خاصة',
      nameLabel: 'الاسم الكريم',
      phoneLabel: 'رقم الهاتف / الواتساب',
      guestsLabel: 'عدد الضيوف',
      dateLabel: 'تاريخ الحجز',
      timeLabel: 'وقت الحجز',
      selectedDishLabel: 'الطبق أو المجلس المفضل',
      submitBtn: 'تأكيد الحجز المباشر',
      whatsappBtn: 'إرسال تأكيد عبر واتساب',
      successTitle: 'تم تسجيل طلب حجزكم بنجاح!',
      successMessage: 'سيتواصل معكم فريق الاستقبال لتأكيد الحجز وضمان أروع تجربة ضيافة.',
      closeBtn: 'تم',
    },
    footer: {
      brandDesc: 'مطعم وشريكة فريسكا البحرين - العنوان المفضل لتجارب الإطعام الفاخرة والخدمة المتميزة على ضفاف ضاحية السيف.',
      quickLinks: 'تنقل سريع',
      contactInfo: 'معلومات التواصل',
      openingHours: 'ساعات العمل',
      copyright: '© 2026 مطعم فريسكا البحرين. جميع الحقوق محفوظة.',
      location: 'ضاحية السيف، المنامة، مملكة البحرين',
      phone: '+973 1700 1122',
      email: 'info@frisca.bh',
      hoursDetail: 'يومياً من 12:00 ظهراً وحتى 1:00 صباحاً',
    },
  },

  en: {
    brandName: 'FRISCA',
    tagline: 'Bahrain · Luxury Fine Dining Experience',
    currency: 'BHD',
    topBar: {
      location: 'Seef Waterfront District, Manama - Kingdom of Bahrain',
      hours: 'Daily 12:00 PM - 1:00 AM',
      phone: '+973 1700 1122',
      dashboard: 'Admin Portal',
    },
    nav: {
      home: 'Home',
      menu: 'Menu',
      bookTable: 'Book a Table',
      favorites: 'Favorites',
      cart: 'Cart',
      dashboard: 'Dashboard',
      backToHome: 'Back to Home',
    },
    hero: {
      kicker: 'The Premier Culinary Destination in Bahrain',
      titleLine1: 'Frisca Restaurant',
      titleLine2: 'Luxury & Elegance in the Heart of Manama',
      subtitle: 'Embark on an extraordinary culinary journey blending authentic Mediterranean delicacies with modern culinary artistry, set against a rich burgundy velvet ambiance.',
      exploreMenuBtn: 'Explore Menu',
      bookTableBtn: 'Reserve a Private Table',
      stats: {
        awards: 'Global Culinary Awards',
        guests: 'Delighted Guests Annually',
        ingredients: 'Farm-Fresh Luxury Ingredients',
        vip: 'Private VIP Dining Lounges',
      },
    },
    identity: {
      kicker: 'The Frisca Essence',
      title: 'Where Culinary Passion Meets Timeless Luxury',
      locationBadge: 'Kingdom of Bahrain · Seef District',
      paragraph1: 'Frisca Restaurant was established in the Kingdom of Bahrain to set a new benchmark for luxury Mediterranean hospitality. Inspired by rich imperial burgundy, every detail reflects noble taste and architectural grace.',
      paragraph2: 'We take immense pride in hosting world-class chefs crafting signature plates for connoisseurs, tailored for elite corporate gatherings, celebratory milestones, and intimate family evenings.',
      coastalViewTitle: 'Captivating Coastal Views',
      coastalViewDesc: 'Prime seaside waterfront in Seef district.',
      royalServiceTitle: 'Royal White-Glove Hospitality',
      royalServiceDesc: 'Meticulous attention to your comfort.',
      seefHallTitle: 'Main Lounge - Seef Branch',
      seefHallSub: 'Charming ambiance & relaxed comfort',
      seefHallLocation: 'Seef District Waterfront · Manama',
      bookSeefHallBtn: 'Reserve at Main Lounge',
      vipBadge: 'VIP Quiet & Family Lounges',
      featureMenu: 'Exclusive Tasting Menu',
      featureMenuSub: 'Chef signature seasonal creations',
      featureView: 'Seef Waterfront View',
      featureViewSub: 'Soothing nautical breeze & ambient music',
      featureService: 'VIP Butler Service',
      featureServiceSub: 'Dedicated staff ensuring perfection',
    },
    gallery: {
      kicker: 'Frisca Gallery',
      title: 'A World of Opulence Awaits You',
      dragHint: 'Animated slideshow - Swipe to view all exclusive highlights',
    },
    menuPage: {
      title: 'Menu',
      subtitle: 'Artisanal Italian & Mediterranean culinary creations masterfully prepared by world-class chefs.',
      searchPlaceholder: 'Search your favorite dish...',
      allCategories: 'All Dishes',
      categories: {
        all: 'All Dishes',
        pastas: 'Pastas & Risotto',
        mains: 'Mains & Steaks',
        pizza: 'Neapolitan Pizza',
        appetizers: 'Appetizers & Soups',
        desserts: 'Artisan Desserts',
        drinks: 'Beverages & Mocktails',
      },
      noResults: 'No dishes match your search query',
      addToCart: 'Add to Cart',
      addedToCart: 'Added to Cart ✓',
      viewDetails: 'View Details',
      clickImageForDesc: 'Click photo to view description & ingredients',
      detailsModalTitle: 'Dish Details & Ingredients',
      close: 'Close',
      dishDescription: 'Dish Description',
      ingredients: 'Ingredients & Preparation',
    },
    cart: {
      title: 'Your Order Cart',
      emptyTitle: 'Your cart is currently empty',
      emptySubtitle: 'Explore our gourmet dining menu and select signature dishes to try now.',
      browseMenuBtn: 'Browse Menu',
      itemCount: 'Dishes selected',
      subtotal: 'Subtotal',
      total: 'Total',
      orderViaWhatsApp: 'Complete Order via WhatsApp',
      clearCart: 'Clear Cart',
      whatsappGreeting: 'Hello Frisca Restaurant Bahrain, I would like to place the following order:',
      whatsappTotal: 'Grand Total',
      whatsappNote: 'Please confirm order receipt and estimated preparation time. Thank you!',
    },
    bookingModal: {
      title: 'Book a Private Table',
      nameLabel: 'Full Name',
      phoneLabel: 'Phone / WhatsApp',
      guestsLabel: 'Number of Guests',
      dateLabel: 'Reservation Date',
      timeLabel: 'Preferred Time',
      selectedDishLabel: 'Preferred Dish or Lounge',
      submitBtn: 'Confirm Direct Booking',
      whatsappBtn: 'Send Confirmation via WhatsApp',
      successTitle: 'Your reservation request is received!',
      successMessage: 'Our front-of-house team will contact you promptly to ensure an unforgettable dining experience.',
      closeBtn: 'Done',
    },
    footer: {
      brandDesc: 'Frisca Restaurant & Lounge Bahrain - The destination of choice for refined dining and luxury hospitality on the Seef waterfront.',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Information',
      openingHours: 'Opening Hours',
      copyright: '© 2026 Frisca Restaurant Bahrain. All rights reserved.',
      location: 'Seef District, Manama, Kingdom of Bahrain',
      phone: '+973 1700 1122',
      email: 'info@frisca.bh',
      hoursDetail: 'Daily from 12:00 PM to 1:00 AM',
    },
  },
};
