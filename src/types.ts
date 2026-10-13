export type Language = 'ar' | 'en';

export interface PortfolioItem {
  id: string;
  title: { ar: string; en: string };
  category: 'weddings' | 'portraits' | 'commercial' | 'aerial' | 'events';
  categoryLabel: { ar: string; en: string };
  image: string;
  rawImage?: string; // For before/after color grading
  location: { ar: string; en: string };
  client: { ar: string; en: string };
  gear: {
    camera: string;
    lens: string;
    lighting: string;
    settings: string;
  };
  description: { ar: string; en: string };
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: { ar: string; en: string };
  tagline: { ar: string; en: string };
  description: { ar: string; en: string };
  iconName: string;
  deliverables: { ar: string[]; en: string[] };
  startingPriceBHD: number;
}

export interface PackageOption {
  id: string;
  name: { ar: string; en: string };
  type: 'wedding' | 'portrait' | 'commercial' | 'event';
  baseHours: number;
  basePriceBHD: number;
  photographers: number;
  videographers: number;
  includesDrone: boolean;
  includesAlbum: boolean;
  highlightReelMin: number;
  description: { ar: string; en: string };
}

export interface StudioSpace {
  id: string;
  name: { ar: string; en: string };
  area: string;
  specs: { ar: string[]; en: string[] };
  description: { ar: string; en: string };
  icon: string;
}

export interface Testimonial {
  id: string;
  name: { ar: string; en: string };
  title: { ar: string; en: string };
  city: { ar: string; en: string };
  comment: { ar: string; en: string };
  rating: number;
  date: string;
}

export interface ClientProofPhoto {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  selectedForAlbum: boolean;
  notes?: string;
  dimensions: string;
}
