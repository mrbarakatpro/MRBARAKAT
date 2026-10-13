export interface FriscaCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  icon?: string;
}

export interface FriscaGalleryItem {
  id: string;
  title: string;
  titleAr?: string;
  titleEn?: string;
  image: string;
  display_order?: number;
}

export const FRISCA_DEFAULT_CATEGORIES: FriscaCategory[] = [
  { id: 'pastas', nameAr: 'الباستا والريزوتو', nameEn: 'Pastas & Risotto' },
  { id: 'mains', nameAr: 'الأطباق الرئيسية واللحوم', nameEn: 'Main Courses & Steaks' },
  { id: 'pizza', nameAr: 'البيتزا النابولية', nameEn: 'Neapolitan Pizza' },
  { id: 'appetizers', nameAr: 'المقبلات والشوربات', nameEn: 'Appetizers & Starters' },
  { id: 'desserts', nameAr: 'الحلويات الفاخرة', nameEn: 'Desserts & Sweets' },
  { id: 'drinks', nameAr: 'المشروبات والموكتيلات', nameEn: 'Drinks & Mocktails' },
];

export interface FriscaMenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string; // Dynamic Category ID (e.g. 'pastas', 'mains', or custom)
  descriptionAr: string;
  descriptionEn?: string;
  priceBHD: number;
  image: string;
  tag?: string;
  tagEn?: string;
}

export const FRISCA_IMAGES = {
  hero: '/src/assets/images/frisca_hero_restaurant_1791674222406.jpg',
  seefHall: '/src/assets/images/frisca_seef_hall_1791676569850.jpg',
  pasta: '/src/assets/images/frisca_signature_pasta_1791674240410.jpg',
  steak: '/src/assets/images/frisca_steak_mains_1791674258976.jpg',
  dessert: '/src/assets/images/frisca_dessert_drink_1791674279035.jpg',
};

export const FRISCA_PRESET_LOGOS = [
  {
    id: 'badge-crest',
    name: 'شعار فريسكا الملكي (Crest Emblem)',
    desc: 'حلقة عنابية مذهبة مع شارة F الملكية وأوراق الغار الإيطالية',
  },
  {
    id: 'modern-monogram',
    name: 'المونوغرام العصري الفاخر (Modern Monogram)',
    desc: 'تصميم هندسي نبيتي أنيق بخطوط حادة وتاج مصغر',
  },
  {
    id: 'chef-culinary',
    name: 'الختم الإيطالي الكلاسيكي (Italian Seal)',
    desc: 'ختم دائري تراثي مع قبعة الطهي الفاخرة وسنابل القمح الذهبية',
  },
];

export const FRISCA_TEXTS = {
  logoUrl: '', // Custom uploaded logo or selected preset
  topBar: {
    location: 'ضفاف ضاحية السيف, المنامة - مملكة البحرين',
    hours: 'يومياً 12:00 م - 1:00 صباحاً',
    phone: '+973 1700 1122',
    email: 'info@frisca.bh',
  },
  hero: {
    kicker: 'الوجهة الأولى للطهي الفاخر في البحرين',
    titleLine1: 'مطعم فريسكا',
    titleLine2: 'الفخامة والرقي في قلب المنامة',
    subtitle: 'نأخذكم في رحلة طهي استثنائية تجمع بين نكهات البحر الأبيض المتوسط الأصيلة واللمسات البحرينية الحديثة، وسط أجواء مخملية وديكورات نبيتية تبهر الحواس.',
    exploreMenuBtn: 'استكشف قائمة الطعام',
    bookTableBtn: 'حجز طاولة خاصة',
    image: FRISCA_IMAGES.hero,
    opacity: 50,
  },
  stats: [
    { value: '15+', label: 'جائزة طهي عالمية' },
    { value: '100K+', label: 'ضيف سعيد سنوياً' },
    { value: '100%', label: 'مكونات طازجة وفاخرة' },
    { value: 'VIP', label: 'قاعات جلسات خاصة' },
  ],
  identity: {
    kicker: 'هوية فريسكا',
    title: 'حين يمتزج الشغف بالفخامة المطلقة',
    paragraph1: 'تم تأسيس مطعم وشريكة فريسكا (Frisca) بمملكة البحرين لتكون المعيار الجديد للضيافة الفاخرة. استوحينا الهوية من اللون النبيتي الفاخر لتعكس نبل المذاق وأناقة المكان.',
    paragraph2: 'نفتخر باستقطاب نخب الطهاة العالميين لتصميم أطباق متفردة ترتقي لأصحاب الذوق الرفيع، سواء في اجتماعات الأعمال الرسمية أو الأمسيات العائلية والخاصة.',
    card1: {
      title: 'إطلالة البحرية الساحرة',
      desc: 'موقع استراتيجي في ضاحية السيف.',
    },
    card2: {
      title: 'خدمة ضيافة ملكية',
      desc: 'اهتمام بأدق التفاصيل لراحتكم.',
    },
    imageCaptionTitle: 'المجلس الرئيسي - فرع السيف',
    imageCaptionSub: 'أجواء ساحرة وتصاميم مريحة',
    image: FRISCA_IMAGES.seefHall,
  },
  gallery: {
    kicker: 'معرض فريسكا',
    title: 'عالم من الفخامة بانتظاركم',
    speed: 25,
    autoPlay: true,
  },
  footer: {
    brandDesc: 'مطعم وشريكة فريسكا البحرين - العنوان المفضل لتجارب الإطعام الفاخرة والخدمة المتميزة.',
    copyright: '© 2026 مطعم فريسكا البحرين. جميع الحقوق محفوظة.',
  },
};

export const FRISCA_GALLERY_IMAGES: FriscaGalleryItem[] = [
  { id: '1', title: 'المجلس الرئيسي فرع السيف', titleAr: 'المجلس الرئيسي فرع السيف', titleEn: 'Main Seef Lounge', image: FRISCA_IMAGES.seefHall },
  { id: '2', title: 'تاغليوليني الكمأة السوداء', titleAr: 'تاغليوليني الكمأة السوداء', titleEn: 'Black Truffle Tagliolini', image: FRISCA_IMAGES.pasta },
  { id: '3', title: 'واغيو ريب آي مشوي', titleAr: 'واغيو ريب آي مشوي', titleEn: 'Grilled Wagyu Ribeye', image: FRISCA_IMAGES.steak },
  { id: '4', title: 'فوندان الشوكولاتة والجيلاتو', titleAr: 'فوندان الشوكولاتة والجيلاتو', titleEn: 'Chocolate Fondant & Gelato', image: FRISCA_IMAGES.dessert },
  { id: '5', title: 'المقبلات والبوراتا الطازجة', titleAr: 'المقبلات والبوراتا الطازجة', titleEn: 'Fresh Burrata & Starters', image: FRISCA_IMAGES.pasta },
  { id: '6', title: 'موكتيل فريسكا روبي المنعش', titleAr: 'موكتيل فريسكا روبي المنعش', titleEn: 'Frisca Ruby Royal Mocktail', image: FRISCA_IMAGES.dessert },
  { id: '7', title: 'الجلسات المسائية الراقية', titleAr: 'الجلسات المسائية الراقية', titleEn: 'Evening Lounge Atmosphere', image: FRISCA_IMAGES.hero },
];

export const FRISCA_MENU_ITEMS: FriscaMenuItem[] = [
  {
    id: '1',
    nameAr: 'تاغليوليني فريسكا بالكمأة السوداء',
    nameEn: 'Truffle Tagliolini',
    category: 'pastas',
    descriptionAr: 'باستا طازجة محضرة يدوياً مع زبدة البارميزان ورقائق الكمأة الإيطالية الفاخرة.',
    descriptionEn: 'Artisanal fresh egg pasta tossed with rich parmesan churned butter and fragrant Italian black truffle shavings.',
    priceBHD: 8.5,
    image: FRISCA_IMAGES.pasta,
    tag: 'الأكثر طلباً',
    tagEn: 'Best Seller',
  },
  {
    id: '2',
    nameAr: 'ستيك واغيو ريب آي مشوي',
    nameEn: 'Grilled Wagyu Ribeye',
    category: 'mains',
    descriptionAr: 'لحم واغيو مشوي على لهب خشب البلوط مع خضار المزرعة الصغيرة وصلصة الديمي غلاس.',
    descriptionEn: 'Prime marble score Wagyu ribeye grilled over oak charcoal, served with heirloom vegetables and velvety demi-glace.',
    priceBHD: 14.5,
    image: FRISCA_IMAGES.steak,
    tag: 'توصية الشيف',
    tagEn: "Chef's Choice",
  },
  {
    id: '3',
    nameAr: 'بوراتا فريسكا الحرفية',
    nameEn: 'Fresh Burrata Salad',
    category: 'appetizers',
    descriptionAr: 'جبنة بوراتا طازجة مع طماطم كرزية ملونة، بيستو الريحان وزيت الزيتون البكر.',
    descriptionEn: 'Creamy artisanal burrata accompanied by sweet heirloom tomatoes, fragrant Genoese pesto and extra virgin olive oil.',
    priceBHD: 5.5,
    image: FRISCA_IMAGES.pasta,
    tag: 'نباتي',
    tagEn: 'Vegetarian',
  },
  {
    id: '4',
    nameAr: 'بيتزا تروفل فريسكا الحجرية',
    nameEn: 'Stone Oven Truffle Pizza',
    category: 'pizza',
    descriptionAr: 'عجينة نابولية مخمرة، جبن موزاريلا بوفالو، فطر وفصوص الكمأة الطازجة.',
    descriptionEn: '48-hour fermented Neapolitan dough, buffalo mozzarella, wild forest mushrooms and aromatic black truffle carpaccio.',
    priceBHD: 7.5,
    image: FRISCA_IMAGES.hero,
    tag: 'فرن حجري',
    tagEn: 'Stone Baked',
  },
  {
    id: '5',
    nameAr: 'تيراميسو فريسكا الكلاسيكي',
    nameEn: 'Signature Tiramisu',
    category: 'desserts',
    descriptionAr: 'بسكويت السافوياردي المنقوع بالإسبريسو وطبقات جبن الماسكاربوني المخملي.',
    descriptionEn: 'Traditional espresso-dipped savoiardi ladyfingers enveloped in whipped mascarpone cream and dusted with fine cocoa.',
    priceBHD: 4.2,
    image: FRISCA_IMAGES.dessert,
    tag: 'الأكثر طلباً',
    tagEn: 'Best Seller',
  },
  {
    id: '6',
    nameAr: 'موكتيل فريسكا روبي سيغنتشر',
    nameEn: 'Frisca Ruby Mocktail',
    category: 'drinks',
    descriptionAr: 'مزيج الرمان الطبيعي، التوت البري، منقوع الروزماري والصودا الفوارة.',
    descriptionEn: 'Freshly pressed ruby pomegranate, muddled wild forest berries, botanical rosemary mist and chilled sparkling soda.',
    priceBHD: 3.2,
    image: FRISCA_IMAGES.dessert,
    tag: 'منعش',
    tagEn: 'Signature Drink',
  },
];
