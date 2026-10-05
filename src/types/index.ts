export type Language = 'vi' | 'en';
export type Currency = 'VND' | 'USD';

export interface PlanVariant {
  id: string;
  name: string;
  type: 'daily' | 'total';
  dataAmount: string; // e.g., '1GB/ngày', '2GB/ngày', '3GB/ngày', 'Không giới hạn (ULM)', '5GB', '10GB'
  dataGbPerDay?: number;
  durationDays: number;
  priceVnd: number;
  priceUsd: number;
  isBestSeller?: boolean;
  hasComboVoucher?: boolean;
  speed: string; // '5G / 4G LTE'
}

export interface Destination {
  id: string;
  nameVi: string;
  nameEn: string;
  code: string; // e.g., 'JP', 'TH', 'EU', 'US'
  flag: string;
  flagCode?: string; // e.g. 'BE', 'JP', 'TH', 'KR', 'VN', 'CN', 'HK', 'SG', 'TW', 'ID', 'AU', 'MY', 'US'
  category: 'popular' | 'hottrend' | 'season' | 'local' | 'regional' | 'global';
  region: 'Asia' | 'Europe' | 'Americas' | 'Global' | 'Other';
  startingPriceVnd: number;
  startingPriceUsd: number;
  topCarriers: string[];
  coveredCountriesCount?: number;
  coveredCountriesList?: string[];
  plans: PlanVariant[];
  tag?: string;
  accentGradient: string;
  descriptionVi: string;
  descriptionEn: string;
}

export interface CartItem {
  destination: Destination;
  plan: PlanVariant;
  quantity: number;
}

export interface UserProfile {
  fullName: string;
  birthYear: string;
  gender: 'Nam' | 'Nữ' | 'Khác' | 'Male' | 'Female' | 'Other';
  city: string;
  phone: string;
  phoneDialCode: string;
  email: string;
  username: string;
  coins: number;
  savedEsims?: {
    orderId: string;
    destinationName: string;
    planName: string;
    qrCode: string;
    activationCode: string;
    smdpAddress: string;
    purchasedDate: string;
  }[];
}

export interface NewsArticle {
  id: string;
  titleVi: string;
  titleEn: string;
  categoryVi: string;
  categoryEn: string;
  readTime: string;
  date: string;
  summaryVi: string;
  summaryEn: string;
  contentVi: string[];
  contentEn: string[];
  imageUrl?: string;
}
