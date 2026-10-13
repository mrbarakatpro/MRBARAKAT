import { PortfolioItem, ServiceItem, PackageOption, StudioSpace, Testimonial, ClientProofPhoto } from '../types';

export const STUDIO_IMAGES = {
  hero: '/src/assets/images/barakat_hero_studio_1791672455547.jpg',
  wedding: '/src/assets/images/barakat_wedding_bahrain_1791672471109.jpg',
  portrait: '/src/assets/images/barakat_portrait_bahrain_1791672486786.jpg',
  commercial: '/src/assets/images/barakat_commercial_bahrain_1791672503136.jpg',
  aerial: '/src/assets/images/barakat_bahrain_aerial_1791672522620.jpg',
};

export const STUDIO_CONTACT = {
  nameAr: 'استديو بركات للتصوير والإنتاج السينمائي',
  nameEn: 'Barakat Studio & Film Production',
  locationAr: 'الطابق 14، برج السيف التجاري، ضاحية السيف، المنامة، مملكة البحرين',
  locationEn: '14th Floor, Seef Business Tower, Al Seef District, Manama, Kingdom of Bahrain',
  phone: '+973 1700 8822',
  whatsapp: '+973 3922 8410',
  email: 'mrbarakatpro@gmail.com',
  crNumber: 'CR 104829-1 (سجل تجاري بحريني معتمد)',
  workingHoursAr: 'السبت - الخميس: 9:00 صباحاً حتى 10:00 مساءً | الجمعة للحجوزات الخاصة',
  workingHoursEn: 'Sat - Thu: 9:00 AM - 10:00 PM | Friday: By Private Appointment',
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    title: {
      ar: 'حفل زفاف ملكي - فندق الفورسيزونز خليج البحرين',
      en: 'Royal Wedding - Four Seasons Hotel Bahrain Bay',
    },
    category: 'weddings',
    categoryLabel: { ar: 'أعراس فاخرة', en: 'Luxury Weddings' },
    image: STUDIO_IMAGES.wedding,
    location: { ar: 'خليج البحرين، المنامة', en: 'Bahrain Bay, Manama' },
    client: { ar: 'عائلة آل خليفة الكريمة', en: 'VIP Bahraini Wedding' },
    gear: {
      camera: 'Hasselblad H6D-100c & Sony FX6 Cinema',
      lens: 'Hasselblad HC 2,2/100mm & GM 50mm f/1.2',
      lighting: 'Profoto B10X Plus High-Speed OCF & Lantern Diffusers',
      settings: '1/250s · f/2.0 · ISO 200 · 100 Megapixel Medium Format',
    },
    description: {
      ar: 'توثيق سينمائي دقيق لتفاصيل البشت الرجالي المطرز بالزري الذهبي، وفستان الزفاف الملكي في بهو الفورسيزونز المطل على أفق المنامة الساحر.',
      en: 'Precise cinematic capture highlighting traditional Bahraini Bisht gold embroidery and haute couture bridal details overlooking the Manama skyline.',
    },
    featured: true,
  },
  {
    id: 'portfolio-2',
    title: {
      ar: 'بورتريه قيادي - هوية الشخصيات البحرينية الرفيعة',
      en: 'Executive Portraiture - Prominent Bahraini Leader',
    },
    category: 'portraits',
    categoryLabel: { ar: 'بورتريه فني ورسمي', en: 'Fine Art Portrait' },
    image: STUDIO_IMAGES.portrait,
    location: { ar: 'استديو بركات - القاعة الملكية، السيف', en: 'Barakat Studio - Royal Set, Seef' },
    client: { ar: 'شخصية اقتصادية بارزة في البحرين', en: 'Senior Corporate Executive, Bahrain' },
    gear: {
      camera: 'Sony α7R V (61 MP Full-Frame)',
      lens: 'Sony FE 85mm f/1.4 GM II',
      lighting: 'Elinchrom Softbox Octa 150cm + Rim Hair Light',
      settings: '1/160s · f/2.8 · ISO 100 · 85mm',
    },
    description: {
      ar: 'إبراز الملامح الأصيلة والهيبة الخليجية بالغترة الحلبية والعقال الكلاسيكي، مع إضاءة ستوديو متدرجة بعناية لتعكس الوقار والعمق.',
      en: 'Capturing authentic Gulf heritage and executive prestige in traditional Ghutra and Agal, shaped with refined studio rim lighting and soft contrast.',
    },
    featured: true,
  },
  {
    id: 'portfolio-3',
    title: {
      ar: 'حملة إعلانية لمجموعة عطور العود والمجوهرات الملكية',
      en: 'Commercial Luxury Oud & Royal Jewelry Campaign',
    },
    category: 'commercial',
    categoryLabel: { ar: 'إعلانات ومنتجات فاخرة', en: 'Luxury Commercial' },
    image: STUDIO_IMAGES.commercial,
    location: { ar: 'استديو بركات - وحدة الماكرو والإعلانات', en: 'Barakat Studio - Macro Bay, Seef' },
    client: { ar: 'دار العود الملكي البحريني والمجوهرات', en: 'Royal Oud & Fine Diamond House' },
    gear: {
      camera: 'Phase One IQ4 150MP & Macro Focus Stacking',
      lens: 'Schneider Kreuznach 120mm f/4.0 Macro LS',
      lighting: 'Broncolor Scoro 3200S + Strip Grids & Backlit Smoke Chamber',
      settings: '1/200s · f/11 · ISO 50 · 24-Focus Stack Array',
    },
    description: {
      ar: 'تصوير إعلاني عالي الدقة لعطر العود الفاخر وعقد الألماس النقي فوق رخام البلاك ماركينا مع ضباب عطري ناعم وإضاءة ذهبية موجهة.',
      en: 'Ultra-high resolution commercial advertisement featuring artisanal Bahraini Oud fragrance and diamond necklace on gold-veined Nero Marquina marble.',
    },
    featured: true,
  },
  {
    id: 'portfolio-4',
    title: {
      ar: 'المنامة الذهبية - التصوير الجوي والسينمائي لأفق البحرين',
      en: 'Golden Manama - Cinematic Drone Skyline of Bahrain',
    },
    category: 'aerial',
    categoryLabel: { ar: 'سينما جوية ودرونز', en: 'Aerial Cinematography' },
    image: STUDIO_IMAGES.aerial,
    location: { ar: 'مرفأ البحرين المالي ومركز التجارة العالمي', en: 'Bahrain Financial Harbour & BWTC' },
    client: { ar: 'هيئة السياحة والتطوير المعماري بالبحرين', en: 'Bahrain Architecture & Tourism' },
    gear: {
      camera: 'DJI Inspire 3 (8K CinemaDNG / Apple ProRes RAW)',
      lens: 'DL 24mm F2.8 LS ASPH',
      lighting: 'Natural Bahrain Golden Hour Ambient Sunlight',
      settings: 'ProRes RAW 8K 60fps · 180° Shutter Rule · Log-C',
    },
    description: {
      ar: 'لقطة سينمائية جوية معتمدة ومرخصة لساعة الغروب الذهبية في المنامة تعكس أبراج مركز البحرين التجاري واليخوت الراسية في مياه الخليج العربي الهادئة.',
      en: 'Licensed aerial cinema capture showcasing the iconic Bahrain World Trade Center towers reflecting against the calm Persian Gulf at twilight.',
    },
    featured: true,
  },
  {
    id: 'portfolio-5',
    title: {
      ar: 'كواليس الإنتاج والتحضير السينمائي داخل استديو بركات',
      en: 'Behind The Scenes - Master Film Rig in Barakat Studio',
    },
    category: 'commercial',
    categoryLabel: { ar: 'الإنتاج والتحضير', en: 'Film Production' },
    image: STUDIO_IMAGES.hero,
    location: { ar: 'استديو بركات - الاستديو الرئيسي (Cyclorama Hall)', en: 'Barakat Studio - Stage 1 (Seef District)' },
    client: { ar: 'فريق عمل استديو بركات', en: 'Barakat Studio In-House Crew' },
    gear: {
      camera: 'ARRI Alexa Mini LF & RED V-Raptor 8K',
      lens: 'Cooke Anamorphic /i Full Frame Plus',
      lighting: 'Aputure Electro Storm CS15 & SkyPanel S60-C Overhead Grid',
      settings: 'Cinema Anamorphic 2.39:1 · 24fps 12-Bit RAW',
    },
    description: {
      ar: 'استديو متكامل مجهز بروافع تصوير سينمائية (Chapman Dolly)، وعوازل صوتية وشاشة إضاءة علوية بمساحة تتسع للسيارات والديكورات الضخمة.',
      en: 'Full-scale soundstage featuring cinema dolly rails, overhead softbox light grid, and spacious cyclorama infinity backdrop in Manama.',
    },
    featured: false,
  },
];

export const STUDIO_SERVICES: ServiceItem[] = [
  {
    id: 'weddings',
    title: {
      ar: 'توثيق وتصوير الأعراس الملكية والفاخرة',
      en: 'Royal & Luxury Wedding Cinematography',
    },
    tagline: {
      ar: 'تخليد لحظات العمر الأغلى برؤية سينمائية استثنائية وألبومات إيطالية راقية',
      en: 'Capturing once-in-a-lifetime moments with cinematic grandeur & handmade Italian albums',
    },
    description: {
      ar: 'نوفر طاقماً متكاملاً من نخبة المصورين والمخرجات المحترفات مع خصوصية تامة للأعراس النسائية، وتوثيق احتفالات الرجال بالبشت والعرضة البحرينية التقليدية بأحدث كاميرات السينما العالمية.',
      en: 'Complete coverage team offering absolute privacy for female ballrooms and grand coverage for traditional Bahraini male celebrations with cinema-grade optics.',
    },
    iconName: 'Camera',
    deliverables: {
      ar: [
        'طاقم تصوير كامل (مصورات محترفات للأعراس النسائية + مصورون للقاعات الرجالية)',
        'فيلم سينمائي طويل بدقة 4K مع مونتاج سينمائي وهندسة صوتية للأغاني والشيلات',
        'تريلر تشويقي (Teaser) ومقاطع سريعة للإنستغرام وتيك توك تسلم خلال 24 ساعة',
        'ألبوم إيطالي فاخر من الجلد الطبيعي مع صندوق مخملي ملكي مطرز بالاسم',
        'تصوير جوي بالدرون (Drone) لموكب الزفة وقصر الاحتفال بموافقة رسمية',
      ],
      en: [
        'Dedicated female crews for private ladies halls + men ballroom cinematographers',
        'Full 4K cinematic wedding film with custom score mastering and color grading',
        'Express 24-hour teaser trailer for Instagram Reels and social media',
        'Handcrafted Italian leather album in a personalized velvet preservation chest',
        'Licensed aerial drone footage capturing the venue and grand motorcade',
      ],
    },
    startingPriceBHD: 450,
  },
  {
    id: 'portraits',
    title: {
      ar: 'جلسات البورتريه الفني والهوية الشخصية',
      en: 'Fine Art Studio & Executive Portraiture',
    },
    tagline: {
      ar: 'إبراز هيبتك وشخصيتك بأرقى معايير الإضاءة العالمية',
      en: 'Distinctive personal and corporate portraits tailored to executive prestige',
    },
    description: {
      ar: 'جلسات استديو مخصصة لكبار الشخصيات، الرؤساء التنفيذيين، الأطباء والمحامين، وفناني البحرين. نعتمد تقنيات نحت الملامح بالضوء والريتوش الفاخر الذي يحافظ على الملمس الطبيعي للبشرة.',
      en: 'Exclusive studio sessions for dignitaries, CEOs, artists, and families in Bahrain, utilizing master lighting techniques and natural texture high-end retouching.',
    },
    iconName: 'UserCheck',
    deliverables: {
      ar: [
        'جلسة استديو خاصة لمدة 60 إلى 90 دقيقة في أجنحة السيف الفاخرة',
        'اختيار الخلفيات الملكية الكلاسيكية أو السيكلو الحديث مع توجيه وضعيات احترافي',
        'ريتوش فائق الدقة (High-End Master Retouching) لـ 10 إلى 25 صورة مختارة',
        'تسليم الصور بصيغتي الطباعة العالية الجودة والويب السريعة',
        'لوحة جدارية كانفاس فاخرة بإطار متحفي جاهزة للتعليق بالمكتب أو المنزل',
      ],
      en: [
        'Private 60 to 90 min studio session at Seef District headquarters',
        'Choice of classical heritage, textured dark velvet, or modern cyclorama sets',
        'High-end magazine retouching on 10 to 25 selected master portraits',
        'Full resolution print files plus web-optimized social/LinkedIn assets',
        'Museum-grade gallery canvas frame ready for executive office or home display',
      ],
    },
    startingPriceBHD: 120,
  },
  {
    id: 'commercial',
    title: {
      ar: 'الإنتاج الإعلاني والتجاري للشركات والعلامات',
      en: 'Commercial & Brand Video Production',
    },
    tagline: {
      ar: 'إعلانات مرئية ترفع مبيعات علامتك التجارية وتبني هويتك البصرية',
      en: 'Compelling high-impact visual campaigns that drive brand authority and sales',
    },
    description: {
      ar: 'إنتاج إعلانات التلفزيون ومواقع التواصل الاجتماعي للمطاعم الفاخرة، العقارات والمجمعات، البنوك، دور الأزياء والمجوهرات والعطور في البحرين والخليج العربي.',
      en: 'Full-service TV commercials and social campaigns for Bahrain financial institutions, luxury real estate, fashion labels, and premier Gulf brands.',
    },
    iconName: 'Film',
    deliverables: {
      ar: [
        'كتابة السيناريو ورسم الـ Storyboard وتخطيط الرؤية الإخراجية',
        'طاقم تصوير بكاميرات سينما هوليوودية (RED / ARRI / Sony FX)',
        'هندسة إضاءة درامية احترافية وتسجيل صوت ميكروفونات لاسلكية نقية',
        'تلوين سينمائي وتأثيرات بصرية وجرافيكس ثلاثي الأبعاد',
        'تسليم بكافة المقاسات المناسبة للإعلانات التلفزيونية ومنصات التواصل',
      ],
      en: [
        'Concept development, storyboard writing, and director treatment',
        'Cinema-grade camera crew and heavy-duty lighting grip setup',
        'Pristine audio recording, original voiceover talent, and sound design',
        'DaVinci Resolve color grading and custom motion graphics branding',
        'Deliverables tailored to 16:9 4K TV broadcast and 9:16 mobile ad campaigns',
      ],
    },
    startingPriceBHD: 380,
  },
  {
    id: 'products',
    title: {
      ar: 'تصوير المنتجات الفاخرة، العطور والمجوهرات',
      en: 'Luxury Products, Oud & High Jewelry Photography',
    },
    tagline: {
      ar: 'إبراز بريق الأحجار الكريمة وتفاصيل زجاجات العطور بدقة متناهية',
      en: 'Capturing diamond reflections and luxury bottle textures with macro precision',
    },
    description: {
      ar: 'استديو متخصص بتقنية التركيز التراكمي (Focus Stacking) لعزل بريق الذهب والألماس والتفاصيل الدقيقة لمنتجات التجميل والساعات السويسرية الفاخرة.',
      en: 'State-of-the-art product stage with motorized turntables and focus stacking to capture brilliant reflections of jewelry, watches, and Arabian perfumes.',
    },
    iconName: 'Sparkles',
    deliverables: {
      ar: [
        'تصوير ماكرو عالي الدقة يبرز أنقى التفاصيل واللمعان',
        'تأثيرات حركية (قطرات ماء، دخان عطري، بودرة ملونة، رذاذ)',
        'عزل احترافي على خلفيات شفافة، بيضاء أو رخام طبيعي فاخر',
        'مقاطع فيديو دورانية 360 درجة جاهزة لمتاجر شوبيفاي وسلة وزد',
        'حقوق استخدام تجارية كاملة للحملات الإعلانية والمطبوعات',
      ],
      en: [
        'Ultra-sharp macro captures revealing intricate diamond facets and textures',
        'Special effects including water splash, aromatic mist, and smoke plumes',
        'Flawless clipping path on transparent, marble, or textured bespoke stages',
        'Seamless 360-degree rotating product reels for e-commerce platforms',
        'Full commercial broadcast and print licensing rights included',
      ],
    },
    startingPriceBHD: 150,
  },
  {
    id: 'drone',
    title: {
      ar: 'التصوير الجوي والسينمائي المرخص في البحرين',
      en: 'Licensed Drone & Aerial Cinematography in Bahrain',
    },
    tagline: {
      ar: 'مشاهد جوية ساحرة بترخيص رسمي من شؤون الطيران المدني البحريني',
      en: 'Stunning aerial footage authorized by Bahrain Civil Aviation Affairs (BCAA)',
    },
    description: {
      ar: 'نمتلك طائرات DJI Inspire 3 و FPV مع طيارين مرخصين رسمياً لتصوير الفعاليات الوطنية، المشاريع العقارية، والمنتجعات البحرية واليخوت في كافة محافظات البحرين.',
      en: 'Operating certified heavy-lift cinema drones and high-speed FPV craft with official clearances for real estate developments, maritime regattas, and state events.',
    },
    iconName: 'Compass',
    deliverables: {
      ar: [
        'طيارون معتمدون ومرخصون رسمياً من وزارة المواصلات والاتصالات بالبحرين',
        'تصوير بدقة 8K مع عدسات واسعة ومقربة قابلة للتبديل',
        'فيديو سينمائي سلس بفضل مثبت الجيمبال ثلاثي المحاور',
        'تسليم المواد الخام (Apple ProRes RAW / Log) مع تصحيح ألوان احترافي',
        'تأمين كامل وتصاريح طيران نظامية للمناطق الحيوية',
      ],
      en: [
        'Certified pilots with official Ministry permits for flights across Bahrain',
        '8K cinema recording with interchangeable cinema primes',
        'Ultra-smooth tracking shots around architectural landmarks and yachts',
        'RAW/Log deliverable assets with optional cinematic color grade LUTs',
        'Comprehensive public liability insurance coverage on all flights',
      ],
    },
    startingPriceBHD: 220,
  },
];

export const STUDIO_PACKAGES: PackageOption[] = [
  {
    id: 'pkg-royal-wedding',
    name: { ar: 'باقة الفخامة الملكية (الأعراس الكبرى)', en: 'Royal Grand Wedding Package' },
    type: 'wedding',
    baseHours: 10,
    basePriceBHD: 850,
    photographers: 3,
    videographers: 2,
    includesDrone: true,
    includesAlbum: true,
    highlightReelMin: 4,
    description: {
      ar: 'تغطية شاملة غير محدودة للعروسين والقاعات من التحضيرات حتى نهاية الحفل، مع ألبوم إيطالي ملكي جلد طبيعي وطاقم نسائي كامل.',
      en: 'Complete coverage from bridal prep to grand farewell with 3 photographers, 2 cinema videographers, drone, and luxury Italian album.',
    },
  },
  {
    id: 'pkg-classic-wedding',
    name: { ar: 'باقة الزفاف الكلاسيكية الذهبية', en: 'Golden Classic Wedding Package' },
    type: 'wedding',
    baseHours: 6,
    basePriceBHD: 520,
    photographers: 2,
    videographers: 1,
    includesDrone: false,
    includesAlbum: true,
    highlightReelMin: 3,
    description: {
      ar: 'التغطية المثالية لحفلات الزفاف والملكة، تصوير فوتوغرافي وفيديو سينمائي عالي الجودة مع ألبوم فاخر وكافة الصور المعدلة.',
      en: 'Ideal coverage for Bahrain weddings and receptions, 2 photographers, 1 videographer, fine leather album, and 4K highlight reel.',
    },
  },
  {
    id: 'pkg-executive-portrait',
    name: { ar: 'باقة البورتريه التنفيذي والشخصي VIP', en: 'Executive VIP Portrait Package' },
    type: 'portrait',
    baseHours: 2,
    basePriceBHD: 140,
    photographers: 1,
    videographers: 0,
    includesDrone: false,
    includesAlbum: false,
    highlightReelMin: 0,
    description: {
      ar: 'جلسة استديو خاصة بالهيبة الخليجية لكبار الشخصيات ورجال الأعمال، تشمل 15 صورة معدلة بريتوش مجلات عالمي وبوسترات مطبوعة.',
      en: 'Private studio session with master lighting for leaders and professionals, 15 magazine-grade retouched photos and office canvas.',
    },
  },
  {
    id: 'pkg-commercial-brand',
    name: { ar: 'باقة الإعلانات والحملات التجارية', en: 'Commercial Brand Campaign Package' },
    type: 'commercial',
    baseHours: 6,
    basePriceBHD: 450,
    photographers: 1,
    videographers: 2,
    includesDrone: true,
    includesAlbum: false,
    highlightReelMin: 1,
    description: {
      ar: 'إنتاج إعلان ترويجي متكامل للعلامات والمطاعم والشركات، يشمل الإخراج، التلوين السينمائي، والتعليق الصوتي الاحترافي.',
      en: 'End-to-end commercial production for luxury brands, high-concept visuals, drone b-roll, voiceover, and multi-format delivery.',
    },
  },
];

export const STUDIO_SPACES: StudioSpace[] = [
  {
    id: 'cyclorama',
    name: { ar: 'قاعة السيكلو اللانهائي الأبيض (Infinity Stage)', en: 'Infinity Cyclorama Stage' },
    area: '150 متر مربع',
    specs: {
      ar: ['جدار منحني بدون زوايا بعرض 12 متراً وارتفاع 5.5 متر', 'شبكة إضاءة سقفية كاملة (Overhead Motorized Truss Grid)', 'أرضية خرسانية ملساء تتحمل دخول السيارات والمعدات الثقيلة'],
      en: ['Seamless curved wall 12m width x 5.5m ceiling height', 'Overhead motorized DMX lighting truss system', 'Reinforced smooth floor supporting vehicle & prop entry'],
    },
    description: {
      ar: 'المساحة المثالية لتصوير الإعلانات التلفزيونية الكبرى، استعراض السيارات، الجلسات الغنائية وحملات الأزياء.',
      en: 'Spacious sound-isolated stage tailored for large commercial productions, automotive shoots, and fashion lookbooks.',
    },
    icon: 'Maximize2',
  },
  {
    id: 'royal-majlis',
    name: { ar: 'القاعة الملكية والديكور الخليجي التراثي', en: 'Royal Gulf Heritage Set' },
    area: '110 متر مربع',
    specs: {
      ar: ['أثاث فاخر مذهب، ثريات كريستال بوهيمية، وبشت بحريني أصيل', 'خلفيات قماشية يدوية الصنع مستوردة من إيطاليا', 'إضاءات دافئة مدروسة ومرايا كلاسيكية منحوتة'],
      en: ['Gilded heritage furniture, crystal chandeliers, and traditional textiles', 'Hand-painted canvas backdrops imported from Florence', 'Sculpted antique mirrors and warm acoustic architecture'],
    },
    description: {
      ar: 'مخصصة لجلسات كبار الشخصيات والبورتريه الملكي ولقاءات البودكاست الفاخرة التي تعكس أصالة البحرين والخليج.',
      en: 'Crafted for VIP executive portraits, wedding couple portraits, and cultural talk shows celebrating Bahraini heritage.',
    },
    icon: 'Crown',
  },
  {
    id: 'macro-bay',
    name: { ar: 'جناح تصوير الماكرو والعطور والمجوهرات', en: 'Macro & High-Speed Product Stage' },
    area: '65 متر مربع',
    specs: {
      ar: ['طاولات رخامية إيطالية دوارة بمحركات دقيقة', 'أجهزة صنع الضباب والرذاذ المائي والمؤثرات الخاصة', 'كاميرات ماكرو مجهزة بتقنية Focus Stacking الآلي'],
      en: ['Motorized precision turntable and black Nero Marquina slabs', 'Special effects mist generator and controlled splash tanks', 'Microscope-level focus stacking macro rail systems'],
    },
    description: {
      ar: 'بيئة معزولة ونظيفة تماماً لالتقاط أدق تفاصيل المجوهرات، الساعات السويسرية، وزجاجات العطور الفاخرة.',
      en: 'A controlled sterile stage designed exclusively for diamonds, luxury timepieces, and high-end fragrance packaging.',
    },
    icon: 'Gem',
  },
  {
    id: 'vip-glamour',
    name: { ar: 'جناح الميك اب وتبديل الملابس الخاص لكبار الشخصيات', en: 'VIP Green Room & Glamour Suite' },
    area: '50 متر مربع',
    specs: {
      ar: ['مرايا هوليوودية بإضاءة CRI 98+ مطابقة لإضاءة التصوير', 'غرفة تبديل ملابس خاصة مع خزائن مؤمنة ومكواة بخار احترافية', 'ركن ضيافة بحرينية فاخرة مع القهوة العربية والحلوى البحرينية'],
      en: ['Hollywood vanity mirrors calibrated to high CRI 98+ light index', 'Private en-suite dressing area with professional garment steamers', 'Complimentary authentic Bahraini hospitality, Gahwa, and Halwa'],
    },
    description: {
      ar: 'نوفر أقصى درجات الراحة والخصوصية لزبائننا وضيوف الشرف والعرائس قبل انطلاق الجلسة.',
      en: 'Ensuring total relaxation, utmost privacy, and elite hospitality before step-in to the cameras.',
    },
    icon: 'Sparkles',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: { ar: 'الشيخ عبد الرحمن آل خليفة', en: 'Shaikh Abdulrahman Al Khalifa' },
    title: { ar: 'عرس عائلي في قصر القضيبية', en: 'Family Wedding, Gudaibiya Palace' },
    city: { ar: 'المنامة', en: 'Manama' },
    comment: {
      ar: 'استديو بركات قمة في الرقي والاحترافية. توثيق زواجنا كان تحفة فنية، والفيديو السينمائي أظهر فخامة العرس وهيبته بأجمل صورة. الألبوم الإيطالي شيء لا يوصف!',
      en: 'Barakat Studio delivered nothing short of a masterpiece. The cinematic film captured every royal nuance with dignity and sheer beauty. The leather album is sublime!',
    },
    rating: 5,
    date: '2026',
  },
  {
    id: 't-2',
    name: { ar: 'فاطمة بوخماس', en: 'Fatima Bukhammas' },
    title: { ar: 'عروس في فندق الريتز كارلتون', en: 'Bride at The Ritz-Carlton Bahrain' },
    city: { ar: 'ضاحية السيف', en: 'Seef District' },
    comment: {
      ar: 'الفريق النسائي كان متعاوناً جداً ومريحاً لأبعد الحدود. اهتموا بأدق تفاصيل الفستان والمجوهرات والمكياج، والتسليم كان سريعاً جداً وفي الموعد تماماً. شكراً للأستاذ بركات وفريقه المبدع.',
      en: 'The ladies crew was incredibly kind, attentive, and discreet. They highlighted every detail of my dress and jewelry. Delivery was punctual and pristine!',
    },
    rating: 5,
    date: '2026',
  },
  {
    id: 't-3',
    name: { ar: 'محمد الدوسري', en: 'Mohammed Al Dossary' },
    title: { ar: 'الرئيس التنفيذي - شركة استثمارية كبرى', en: 'Managing Director, Investment Group' },
    city: { ar: 'الرفاع', en: 'Riffa' },
    comment: {
      ar: 'جلسة البورتريه في استديو بركات كانت تجربة تضاهي أكبر استديوهات لندن ونيويورك. إتقان توزيع الإضاءة وإظهار الملامح الخليجية بوقار واحترافية عالية لا تجدها في أي مكان آخر.',
      en: 'The portrait experience in their Seef studio matches top studios in London or New York. The light sculpting and dignified Gulf presence are unmatched.',
    },
    rating: 5,
    date: '2026',
  },
  {
    id: 't-4',
    name: { ar: 'ريم الكعبي', en: 'Reem Al Kaabi' },
    title: { ar: 'مديرة تسويق علامة عطور فاخرة', en: 'Marketing Director, Luxury Perfumes' },
    city: { ar: 'جزر أمواج', en: 'Amwaj Islands' },
    comment: {
      ar: 'نفذنا حملتنا الإعلانية الأخيرة في استديو بركات، والنتيجة حققت أعلى تفاعل في تاريخ علامتنا. دقة تصوير قطرات العطر وانعكاسات الزجاج أبهرت جمهورنا في الخليج.',
      en: 'Our commercial campaign shot at Barakat Studio generated record engagement. The macro precision and lighting on our fragrance bottles were jaw-dropping.',
    },
    rating: 5,
    date: '2026',
  },
];

export const SAMPLE_CLIENT_PROOFS: ClientProofPhoto[] = [
  {
    id: 'proof-101',
    title: 'إطلالة العروس الملكية - تفاصيل الطرحة',
    thumbnail: STUDIO_IMAGES.wedding,
    category: 'weddings',
    selectedForAlbum: true,
    notes: 'تنعيم الإضاءة الخلفية للثريا وإبراز تفاصيل تطريز الزري الذهبي',
    dimensions: '11600 × 8700 px (100MP)',
  },
  {
    id: 'proof-102',
    title: 'لقطة البشت والعقال - وقار الزوج',
    thumbnail: STUDIO_IMAGES.portrait,
    category: 'portraits',
    selectedForAlbum: true,
    notes: 'ممتازة للغلاف الداخلي للألبوم الكبير',
    dimensions: '9504 × 6336 px (61MP)',
  },
  {
    id: 'proof-103',
    title: 'تفاصيل زجاجة العطر والماس',
    thumbnail: STUDIO_IMAGES.commercial,
    category: 'commercial',
    selectedForAlbum: false,
    notes: 'يرجى إزالة انعكاس الإضاءة البسيط عن حافة الغطاء',
    dimensions: '14204 × 10652 px (150MP)',
  },
  {
    id: 'proof-104',
    title: 'لقطة الغروب الذهبي للمنامة والمرفأ',
    thumbnail: STUDIO_IMAGES.aerial,
    category: 'aerial',
    selectedForAlbum: true,
    notes: 'اعتماد هذه الصورة للطباعة على لوحة كانفاس متحفية 120×80 سم',
    dimensions: '8192 × 4320 px (8K DNG)',
  },
];
