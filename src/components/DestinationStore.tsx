import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DESTINATIONS } from '../data/destinations';
import { Destination, PlanVariant } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import worldImg from '../../assets/image/hero-image/world.svg';
import {
  Globe,
  Star,
  Check,
  Zap,
  Mail,
  RefreshCw,
  Headphones,
  Smartphone,
  ChevronDown,
  Gift,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Search,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

interface DestinationStoreProps {
  standalone?: boolean;
}

interface SelectedPlanState {
  category: 'daily' | 'fixed' | 'unlimited';
  cardId: string;
  dataName: string;
  days: number;
  priceUsd: number;
  priceVnd: number;
  totalDataSummary: string;
  speed: string;
}

export const DestinationStore: React.FC<DestinationStoreProps> = ({ standalone = false }) => {
  const {
    language,
    currency,
    formatPrice,
    selectedDestination,
    setSelectedDestination,
    storeView,
    setStoreView,
    openStoreCatalog,
    navigateToDestination,
    openCheckout,
    setCompatibilityModalOpen,
    activeTab,
    setActiveTab,
    previousTab
  } = useApp();

  // State for Catalog View
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [catalogSelectCountry, setCatalogSelectCountry] = useState<string>('');

  // Fallback destination if none selected
  const currentDest = selectedDestination || DESTINATIONS[1] || DESTINATIONS[0]; // Thailand as default

  // Expiry date (30 days from now)
  const expiryDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return `${d.getDate()} thg ${d.getMonth() + 1}, ${d.getFullYear()}`;
  }, []);

  // Duration state for individual cards (Detail View):
  // 1. Dữ liệu theo ngày
  const [dailyDays1Gb, setDailyDays1Gb] = useState<number>(3);
  const [dailyDays2Gb, setDailyDays2Gb] = useState<number>(3);
  const [dailyDays3Gb, setDailyDays3Gb] = useState<number>(3);

  // 2. Dữ liệu cố định
  const [fixedDays5Gb, setFixedDays5Gb] = useState<number>(5);
  const [fixedDays10Gb, setFixedDays10Gb] = useState<number>(5);
  const [fixedDays20Gb, setFixedDays20Gb] = useState<number>(3);
  const [fixedDays35Gb, setFixedDays35Gb] = useState<number>(7);
  const [fixedDays50Gb, setFixedDays50Gb] = useState<number>(10);

  // 3. Dữ liệu không giới hạn
  const [ulmDays5Mbps, setUlmDays5Mbps] = useState<number>(30);
  const [ulmDays10Mbps, setUlmDays10Mbps] = useState<number>(1);

  // Currently active selected plan card
  const [activeCardId, setActiveCardId] = useState<string>('daily-1gb');
  const [activeTabSpecs, setActiveTabSpecs] = useState<'features' | 'tech'>('features');

  // Multiplier calculation for price based on country
  const baseUsd = currentDest.startingPriceUsd || 3.5;
  const usdToVnd = 25000;

  // Active plan details calculated dynamically
  const activePlanInfo: SelectedPlanState = useMemo(() => {
    switch (activeCardId) {
      case 'daily-1gb': {
        const pUsd = Math.round((baseUsd * 0.9 + (dailyDays1Gb - 1) * 0.95) * 100) / 100;
        return {
          category: 'daily',
          cardId: 'daily-1gb',
          dataName: '1GB/ngày',
          days: dailyDays1Gb,
          priceUsd: pUsd,
          priceVnd: Math.round(pUsd * usdToVnd / 1000) * 1000,
          totalDataSummary: `${dailyDays1Gb * 1}GB / ${dailyDays1Gb} ngày`,
          speed: '5G / 4G LTE'
        };
      }
      case 'daily-2gb': {
        const pUsd = Math.round((baseUsd * 1.5 + (dailyDays2Gb - 1) * 1.4) * 100) / 100;
        return {
          category: 'daily',
          cardId: 'daily-2gb',
          dataName: '2GB/ngày',
          days: dailyDays2Gb,
          priceUsd: pUsd,
          priceVnd: Math.round(pUsd * usdToVnd / 1000) * 1000,
          totalDataSummary: `${dailyDays2Gb * 2}GB / ${dailyDays2Gb} ngày`,
          speed: '5G / 4G LTE'
        };
      }
      case 'daily-3gb': {
        const pUsd = Math.round((baseUsd * 1.8 + (dailyDays3Gb - 1) * 1.6) * 100) / 100;
        return {
          category: 'daily',
          cardId: 'daily-3gb',
          dataName: '3GB/ngày',
          days: dailyDays3Gb,
          priceUsd: pUsd,
          priceVnd: Math.round(pUsd * usdToVnd / 1000) * 1000,
          totalDataSummary: `${dailyDays3Gb * 3}GB / ${dailyDays3Gb} ngày`,
          speed: '5G Tối Đa'
        };
      }
      case 'fixed-5gb': {
        const pUsd = Math.round(baseUsd * 1.9 * 100) / 100;
        return {
          category: 'fixed',
          cardId: 'fixed-5gb',
          dataName: '5GB',
          days: fixedDays5Gb,
          priceUsd: pUsd,
          priceVnd: Math.round(pUsd * usdToVnd / 1000) * 1000,
          totalDataSummary: `5GB / ${fixedDays5Gb} ngày`,
          speed: '5G / 4G LTE'
        };
      }
      case 'fixed-10gb': {
        const pUsd = Math.round(baseUsd * 2.8 * 100) / 100;
        return {
          category: 'fixed',
          cardId: 'fixed-10gb',
          dataName: '10GB',
          days: fixedDays10Gb,
          priceUsd: pUsd,
          priceVnd: Math.round(pUsd * usdToVnd / 1000) * 1000,
          totalDataSummary: `10GB / ${fixedDays10Gb} ngày`,
          speed: '5G / 4G LTE'
        };
      }
      case 'fixed-20gb': {
        const pUsd = Math.round(baseUsd * 4.6 * 100) / 100;
        return {
          category: 'fixed',
          cardId: 'fixed-20gb',
          dataName: '20GB',
          days: fixedDays20Gb,
          priceUsd: pUsd,
          priceVnd: Math.round(pUsd * usdToVnd / 1000) * 1000,
          totalDataSummary: `20GB / ${fixedDays20Gb} ngày`,
          speed: '5G / 4G LTE'
        };
      }
      case 'fixed-35gb': {
        const pUsd = Math.round(baseUsd * 2.0 * 100) / 100;
        return {
          category: 'fixed',
          cardId: 'fixed-35gb',
          dataName: '35GB Gọi & SMS',
          days: fixedDays35Gb,
          priceUsd: pUsd,
          priceVnd: Math.round(pUsd * usdToVnd / 1000) * 1000,
          totalDataSummary: `35GB / ${fixedDays35Gb} ngày (Kèm Thoại)`,
          speed: '5G / 4G LTE'
        };
      }
      case 'fixed-50gb': {
        const pUsd = Math.round(baseUsd * 2.5 * 100) / 100;
        return {
          category: 'fixed',
          cardId: 'fixed-50gb',
          dataName: '50GB Gọi & SMS',
          days: fixedDays50Gb,
          priceUsd: pUsd,
          priceVnd: Math.round(pUsd * usdToVnd / 1000) * 1000,
          totalDataSummary: `50GB / ${fixedDays50Gb} ngày (Kèm Thoại)`,
          speed: '5G / 4G LTE'
        };
      }
      case 'ulm-5mbps': {
        const pUsd = Math.round((baseUsd * 4.2 + (ulmDays5Mbps - 5) * 1.5) * 100) / 100;
        return {
          category: 'unlimited',
          cardId: 'ulm-5mbps',
          dataName: 'Không giới hạn 5Mbps',
          days: ulmDays5Mbps,
          priceUsd: pUsd,
          priceVnd: Math.round(pUsd * usdToVnd / 1000) * 1000,
          totalDataSummary: `Không giới hạn Data / ${ulmDays5Mbps} ngày`,
          speed: '5Mbps Unlimited'
        };
      }
      case 'ulm-10mbps': {
        const pUsd = Math.round((baseUsd * 1.1 + (ulmDays10Mbps - 1) * 2.4) * 100) / 100;
        return {
          category: 'unlimited',
          cardId: 'ulm-10mbps',
          dataName: 'Không giới hạn 10Mbps',
          days: ulmDays10Mbps,
          priceUsd: pUsd,
          priceVnd: Math.round(pUsd * usdToVnd / 1000) * 1000,
          totalDataSummary: `Không giới hạn Data / ${ulmDays10Mbps} ngày`,
          speed: '10Mbps 5G Flash'
        };
      }
      default:
        return {
          category: 'daily',
          cardId: 'daily-1gb',
          dataName: '1GB/ngày',
          days: 3,
          priceUsd: 3.2,
          priceVnd: 80000,
          totalDataSummary: '3GB / 3 ngày',
          speed: '5G / 4G LTE'
        };
    }
  }, [
    activeCardId,
    baseUsd,
    dailyDays1Gb,
    dailyDays2Gb,
    dailyDays3Gb,
    fixedDays5Gb,
    fixedDays10Gb,
    fixedDays20Gb,
    fixedDays35Gb,
    fixedDays50Gb,
    ulmDays5Mbps,
    ulmDays10Mbps
  ]);

  const handleCheckoutClick = () => {
    const planVariant: PlanVariant = {
      id: `${activePlanInfo.cardId}-${activePlanInfo.days}d`,
      name: `${activePlanInfo.dataName} - ${activePlanInfo.days} Ngày`,
      type: activePlanInfo.category === 'daily' ? 'daily' : 'total',
      dataAmount: activePlanInfo.dataName,
      durationDays: activePlanInfo.days,
      priceVnd: activePlanInfo.priceVnd,
      priceUsd: activePlanInfo.priceUsd,
      speed: activePlanInfo.speed,
      isBestSeller: activeCardId === 'daily-2gb' || activeCardId === 'fixed-50gb' || activeCardId === 'ulm-10mbps'
    };
    openCheckout(currentDest, planVariant);
  };

  // Filtered list for Catalog View
  const filteredCatalogDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const matchesSearch =
        dest.nameVi.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        dest.nameEn.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        dest.code.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        dest.topCarriers.some((c) => c.toLowerCase().includes(catalogSearch.toLowerCase()));

      if (!matchesSearch) return false;
      if (catalogCategory === 'all') return true;
      if (catalogCategory === 'popular') return dest.category === 'popular';
      if (catalogCategory === 'local') return dest.category === 'local' || dest.category === 'popular';
      if (catalogCategory === 'regional') return dest.category === 'regional';
      if (catalogCategory === 'global') return dest.category === 'global';
      return true;
    });
  }, [catalogSearch, catalogCategory]);

  const handleCountrySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const destId = e.target.value;
    setCatalogSelectCountry(destId);
    if (destId) {
      navigateToDestination(destId);
    }
  };

  // ===========================================================================
  // 1. MÀN HÌNH eSIM STORE BAN ĐẦU (CATALOG SCREEN)
  // "Màn eSim store ban đầu vẫn giữ nguyên chỉ là ấn vào thì sẽ sang 1 trang khác thôi"
  // ===========================================================================
  if (storeView === 'catalog') {
    return (
      <div className="bg-white min-h-screen py-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold text-[#1A2340] bg-[#1A2340]/10 border border-[#1A2340]/20 px-3 py-1 rounded-full w-fit mx-auto tracking-wider uppercase">
              {language === 'vi' ? 'CỬA HÀNG eSIM QUỐC TẾ' : 'GLOBAL eSIM STORE'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2340] tracking-tight">
              {language === 'vi' ? 'Khám phá các gói eSIM theo Điểm đến' : 'Explore Travel eSIM Store'}
            </h1>
            <p className="text-[#1A2340]/80 text-sm sm:text-base leading-relaxed">
              {language === 'vi'
                ? 'Lựa chọn gói cước dữ liệu tốc độ cao tại hơn 200 quốc gia. Nhấn vào bất kỳ sản phẩm SIM nào để cấu hình chi tiết.'
                : 'Select high-speed data eSIMs across 200+ destinations. Click any card to customize your travel package.'}
            </p>

            {/* Search bar & Select Dropdown */}
            <div className="mt-6 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <div className="sm:col-span-5 relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#1A2340]">
                  🌐
                </div>
                <select
                  value={catalogSelectCountry}
                  onChange={handleCountrySelectChange}
                  className="w-full pl-9 pr-8 py-3 bg-white rounded-xl border border-[#E2E8F0] text-xs sm:text-sm font-semibold text-[#1A2340] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1A2340] cursor-pointer appearance-none"
                >
                  <option value="">
                    {language === 'vi' ? 'Chọn nhanh quốc gia...' : 'Select country...'}
                  </option>
                  <optgroup label={language === 'vi' ? 'Quốc gia phổ biến' : 'Popular Destinations'}>
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.flag} {language === 'vi' ? d.nameVi : d.nameEn}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#1A2340]/60 text-xs">
                  ▼
                </div>
              </div>

              <div className="sm:col-span-7 relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder={
                    language === 'vi'
                      ? 'Tìm điểm đến (ví dụ: Nhật Bản, Châu Âu, Thái Lan, Mỹ...)'
                      : 'Search destinations (e.g. Japan, Europe, USA...)'
                  }
                  className="w-full pl-10 pr-8 py-3 bg-white rounded-xl border border-[#E2E8F0] text-xs sm:text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1A2340] text-[#1A2340]"
                />
                {catalogSearch && (
                  <button
                    onClick={() => setCatalogSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Dark Navy Rounded Container Box Matching Image 1 */}
          <div className="bg-[#1A2340] rounded-[32px] p-6 sm:p-8 md:p-10 shadow-lg text-white">

            {/* Top Category Filter Tabs Bar with Cyan Underline */}
            <div className="border-b border-slate-700/60 pb-0 mb-6">
              <div className="flex items-center justify-start gap-8 overflow-x-auto no-scrollbar">
                {[
                  { id: 'popular', labelVi: 'Phổ biến', labelEn: 'Popular', icon: '🚀' },
                  { id: 'local', labelVi: 'Quốc gia', labelEn: 'Local eSIM', icon: '⚓' },
                  { id: 'regional', labelVi: 'Khu vực (Regional)', labelEn: 'Regional', icon: '🗺️' },
                  { id: 'global', labelVi: 'Toàn cầu (Global)', labelEn: 'Global', icon: '🌍' },
                ].map((cat) => {
                  const isActive = catalogCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCatalogCategory(cat.id)}
                      className={`relative pb-3 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 text-sm sm:text-base font-bold ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span>{language === 'vi' ? cat.labelVi : cat.labelEn}</span>
                      {isActive && (
                        <motion.span
                          layoutId="catalogActiveTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00D2B8] rounded-full"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Horizontal White SIM Cards Grid with Flag Images & Prices (Matching Image 1) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={catalogCategory + catalogSearch}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4"
              >
                {filteredCatalogDestinations.map((dest) => {
                  const flagCode = dest.flagCode || dest.code || 'BE';
                  const flagUrl = `https://flagsapi.com/${flagCode}/flat/64.png`;

                  return (
                    <motion.div
                      key={dest.id}
                      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigateToDestination(dest.id)}
                      className="bg-white hover:bg-slate-50 text-[#1A2340] rounded-2xl px-4 py-3.5 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                    >
                      {/* Left: Flag Image + Country Name */}
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <img
                          src={flagUrl}
                          alt={dest.nameVi}
                          className="w-8 h-6 object-contain shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="min-w-0">
                          <span className="font-extrabold text-sm text-[#1A2340] truncate block">
                            {language === 'vi' ? dest.nameVi : dest.nameEn}
                          </span>
                        </div>
                      </div>

                      {/* Right: Price */}
                      <div className="text-right shrink-0">
                        <span className="font-black text-sm text-[#1A2340] tabular-nums">
                          {formatPrice(dest.startingPriceVnd, dest.startingPriceUsd)}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>
    );
  }

  // ===========================================================================
  // 2. MÀN HÌNH CHI TIẾT SẢN PHẨM SIM (PRODUCT DETAIL PAGE - THEO ĐÚNG ẢNH 2)
  // "Khi click vào sản phẩm sim sẽ ra màn hình như kia"
  // ===========================================================================
  return (
    <div className="bg-white min-h-screen py-6 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Back to catalog breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (previousTab === 'home') {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                openStoreCatalog();
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A2340] hover:text-[#1A2340] bg-white px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#1A2340] transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#1A2340]" />
            <span>
              {previousTab === 'home'
                ? (language === 'vi' ? 'Quay lại Trang chủ' : 'Back to Home')
                : (language === 'vi' ? 'Quay lại eSIM store' : 'Back to eSIM store')}
            </span>
          </button>

          <div className="text-xs text-slate-500 hidden sm:block">
            Trang chủ / eSIM store / <span className="text-[#1A2340] font-bold">{currentDest.nameVi} eSIM</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TOP BAR / HEADER ROW                                                      */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">

          {/* Left Title & Trust Rating */}
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-3">
              <img
                src={`https://flagsapi.com/${currentDest.flagCode || currentDest.code || 'JP'}/flat/64.png`}
                alt={currentDest.nameVi}
                className="w-10 h-7 sm:w-12 sm:h-8 object-contain shrink-0"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A2340] tracking-tight">
                {currentDest.nameVi} eSIM
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <div className="flex items-center gap-1 text-[#1A2340] font-extrabold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.8/5</span>
              </div>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 font-medium">
                Tin dùng bởi hơn 500K+ khách hàng toàn cầu từ 2018
              </span>
            </div>
          </div>

          {/* Right Side: Country / Travel Landmark Element Illustration */}
          <div className="flex items-center justify-start sm:justify-end shrink-0 pt-2 sm:pt-0">
            <img
              src={worldImg}
              alt="Travel Element"
              className="h-20 sm:h-24 w-auto object-contain max-w-[260px] drop-shadow-xs"
            />
          </div>

        </div>

        {/* If regional / global: Render element listing all countries */}
        {currentDest.coveredCountriesList && currentDest.coveredCountriesList.length > 0 && (
          <div className="p-3 bg-white text-[#1A2340] rounded-xl border border-[#E2E8F0] flex flex-wrap items-center gap-1.5 text-xs shadow-xs">
            <span className="font-bold text-[#1A2340] flex items-center gap-1 mr-1">
              <Globe className="w-3.5 h-3.5 text-[#1A2340]" />
              <span>Phủ sóng ({currentDest.coveredCountriesCount || currentDest.coveredCountriesList.length} nước):</span>
            </span>
            {currentDest.coveredCountriesList.slice(0, 15).map((c, i) => (
              <span key={i} className="bg-slate-50 text-[#1A2340] border border-[#E2E8F0] px-2 py-0.5 rounded text-[11px]">
                {c}
              </span>
            ))}
            {currentDest.coveredCountriesList.length > 15 && (
              <span className="text-[#1A2340]/60 font-mono text-[11px]">
                +{currentDest.coveredCountriesList.length - 15} nước khác
              </span>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAIN 2-COLUMN LAYOUT: LEFT PACKAGES + RIGHT STICKY SUMMARY               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ======================================================================= */}
          {/* LEFT COLUMN: 3 DATA SECTIONS (DAILY, FIXED, UNLIMITED)                  */}
          {/* ======================================================================= */}
          <div className="lg:col-span-8 space-y-6">

            <h2 className="text-lg font-bold text-[#1A2340]">
              Nhận gói data eSIM cho {currentDest.nameVi}
            </h2>

            {/* --------------------------------------------------------------------- */}
            {/* 1. DỮ LIỆU THEO NGÀY (DATA MỚI MỖI NGÀY)                              */}
            {/* --------------------------------------------------------------------- */}
            <div className="bg-white text-[#1A2340] rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3.5">
              <div>
                <h3 className="text-base font-bold text-[#1A2340]">Dữ liệu theo ngày</h3>
                <p className="text-xs text-slate-500">Data mới mỗi ngày.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                {/* Card 1: 1GB/ngày */}
                <div
                  onClick={() => setActiveCardId('daily-1gb')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${activeCardId === 'daily-1gb'
                    ? 'border-[#1A2340] bg-white ring-2 ring-[#1A2340]/20 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-[#1A2340]/60 bg-slate-50'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-extrabold text-sm text-[#1A2340]">1GB/ngày</span>
                    <span className="font-black text-sm text-[#1A2340] tabular-nums">
                      {formatPrice(
                        Math.round((baseUsd * 0.9 + (dailyDays1Gb - 1) * 0.95) * usdToVnd / 1000) * 1000,
                        Math.round((baseUsd * 0.9 + (dailyDays1Gb - 1) * 0.95) * 100) / 100
                      )}
                    </span>
                  </div>

                  <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={dailyDays1Gb}
                      onChange={(e) => {
                        setDailyDays1Gb(Number(e.target.value));
                        setActiveCardId('daily-1gb');
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#1A2340] shadow-2xs cursor-pointer focus:outline-none focus:border-[#1A2340]"
                    >
                      {[1, 3, 5, 7, 10, 15, 30].map((d) => (
                        <option key={d} value={d}>{d} ngày</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Card 2: 2GB/ngày */}
                <div
                  onClick={() => setActiveCardId('daily-2gb')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${activeCardId === 'daily-2gb'
                    ? 'border-[#1A2340] bg-white ring-2 ring-[#1A2340]/20 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-[#1A2340]/60 bg-slate-50'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-extrabold text-sm text-[#1A2340]">2GB/ngày</span>
                    <span className="font-black text-sm text-[#1A2340] tabular-nums">
                      {formatPrice(
                        Math.round((baseUsd * 1.5 + (dailyDays2Gb - 1) * 1.4) * usdToVnd / 1000) * 1000,
                        Math.round((baseUsd * 1.5 + (dailyDays2Gb - 1) * 1.4) * 100) / 100
                      )}
                    </span>
                  </div>

                  <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={dailyDays2Gb}
                      onChange={(e) => {
                        setDailyDays2Gb(Number(e.target.value));
                        setActiveCardId('daily-2gb');
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#1A2340] shadow-2xs cursor-pointer focus:outline-none focus:border-[#1A2340]"
                    >
                      {[1, 3, 5, 7, 10, 15, 30].map((d) => (
                        <option key={d} value={d}>{d} ngày</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Card 3: 3GB/ngày with FLASH SALE tag */}
                <div
                  onClick={() => setActiveCardId('daily-3gb')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative ${activeCardId === 'daily-3gb'
                    ? 'border-[#1A2340] bg-white ring-2 ring-[#1A2340]/20 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-[#1A2340]/60 bg-slate-50'
                    }`}
                >
                  <div className="absolute -top-2.5 left-3">
                    <span className="bg-[#1A2340] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-2xs flex items-center gap-0.5">
                      <Zap className="w-2.5 h-2.5" /> FLASH SALE
                    </span>
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="font-extrabold text-sm text-[#1A2340]">3GB/ngày</span>
                    <div className="text-right">
                      <div className="font-black text-sm text-[#1A2340] tabular-nums">
                        {formatPrice(
                          Math.round((baseUsd * 1.8 + (dailyDays3Gb - 1) * 1.6) * usdToVnd / 1000) * 1000,
                          Math.round((baseUsd * 1.8 + (dailyDays3Gb - 1) * 1.6) * 100) / 100
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 line-through">
                        ${(baseUsd * 2.3 + (dailyDays3Gb - 1) * 1.9).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={dailyDays3Gb}
                      onChange={(e) => {
                        setDailyDays3Gb(Number(e.target.value));
                        setActiveCardId('daily-3gb');
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#1A2340] shadow-2xs cursor-pointer focus:outline-none focus:border-[#1A2340]"
                    >
                      {[1, 3, 5, 7, 10, 15, 30].map((d) => (
                        <option key={d} value={d}>{d} ngày</option>
                      ))}
                    </select>
                    <span className="text-[10px] font-bold text-[#1A2340] shrink-0">Save 20%</span>
                  </div>
                </div>

              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* 2. DỮ LIỆU CỐ ĐỊNH (DÙNG TỔNG DATA BẤT CỨ LÚC NÀO)                     */}
            {/* --------------------------------------------------------------------- */}
            <div className="bg-white text-[#1A2340] rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3.5">
              <div>
                <h3 className="text-base font-bold text-[#1A2340]">Dữ liệu cố định</h3>
                <p className="text-xs text-slate-500">Dùng tổng data bất cứ lúc nào.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                {/* 5GB */}
                <div
                  onClick={() => setActiveCardId('fixed-5gb')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${activeCardId === 'fixed-5gb'
                    ? 'border-[#1A2340] bg-white ring-2 ring-[#1A2340]/20 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-[#1A2340]/60 bg-slate-50'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-extrabold text-sm text-[#1A2340]">5GB</span>
                    <span className="font-black text-sm text-[#1A2340] tabular-nums">
                      {formatPrice(Math.round(baseUsd * 1.9 * usdToVnd / 1000) * 1000, Math.round(baseUsd * 1.9 * 100) / 100)}
                    </span>
                  </div>
                  <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={fixedDays5Gb}
                      onChange={(e) => {
                        setFixedDays5Gb(Number(e.target.value));
                        setActiveCardId('fixed-5gb');
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#1A2340] shadow-2xs cursor-pointer focus:outline-none focus:border-[#1A2340]"
                    >
                      {[3, 5, 7, 10, 15, 30].map((d) => (
                        <option key={d} value={d}>{d} ngày</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 10GB */}
                <div
                  onClick={() => setActiveCardId('fixed-10gb')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${activeCardId === 'fixed-10gb'
                    ? 'border-[#1A2340] bg-white ring-2 ring-[#1A2340]/20 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-[#1A2340]/60 bg-slate-50'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-extrabold text-sm text-[#1A2340]">10GB</span>
                    <span className="font-black text-sm text-[#1A2340] tabular-nums">
                      {formatPrice(Math.round(baseUsd * 2.8 * usdToVnd / 1000) * 1000, Math.round(baseUsd * 2.8 * 100) / 100)}
                    </span>
                  </div>
                  <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={fixedDays10Gb}
                      onChange={(e) => {
                        setFixedDays10Gb(Number(e.target.value));
                        setActiveCardId('fixed-10gb');
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#1A2340] shadow-2xs cursor-pointer focus:outline-none focus:border-[#1A2340]"
                    >
                      {[5, 7, 10, 15, 30].map((d) => (
                        <option key={d} value={d}>{d} ngày</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 20GB */}
                <div
                  onClick={() => setActiveCardId('fixed-20gb')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${activeCardId === 'fixed-20gb'
                    ? 'border-[#1A2340] bg-white ring-2 ring-[#1A2340]/20 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-[#1A2340]/60 bg-slate-50'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-extrabold text-sm text-[#1A2340]">20GB</span>
                    <span className="font-black text-sm text-[#1A2340] tabular-nums">
                      {formatPrice(Math.round(baseUsd * 4.6 * usdToVnd / 1000) * 1000, Math.round(baseUsd * 4.6 * 100) / 100)}
                    </span>
                  </div>
                  <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={fixedDays20Gb}
                      onChange={(e) => {
                        setFixedDays20Gb(Number(e.target.value));
                        setActiveCardId('fixed-20gb');
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#1A2340] shadow-2xs cursor-pointer focus:outline-none focus:border-[#1A2340]"
                    >
                      {[3, 5, 7, 10, 15, 30].map((d) => (
                        <option key={d} value={d}>{d} ngày</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 35GB Gọi & SMS with GOOD DEAL */}
                <div
                  onClick={() => setActiveCardId('fixed-35gb')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative ${activeCardId === 'fixed-35gb'
                    ? 'border-[#1A2340] bg-white ring-2 ring-[#1A2340]/20 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-[#1A2340]/60 bg-slate-50'
                    }`}
                >
                  <div className="absolute -top-2.5 left-3">
                    <span className="bg-[#1A2340] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                      GOOD DEAL
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-extrabold text-sm text-[#1A2340]">35GB</span>
                      <span className="text-[10px] bg-[#1A2340]/10 text-[#1A2340] px-1.5 py-0.5 rounded ml-1.5 font-bold">
                        Gọi & SMS
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-sm text-[#1A2340] tabular-nums">
                        {formatPrice(Math.round(baseUsd * 2.0 * usdToVnd / 1000) * 1000, Math.round(baseUsd * 2.0 * 100) / 100)}
                      </div>
                      <div className="text-[10px] text-slate-400 line-through">
                        ${(baseUsd * 2.5).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={fixedDays35Gb}
                      onChange={(e) => {
                        setFixedDays35Gb(Number(e.target.value));
                        setActiveCardId('fixed-35gb');
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#1A2340] shadow-2xs cursor-pointer focus:outline-none focus:border-[#1A2340]"
                    >
                      {[7, 10, 15, 30].map((d) => (
                        <option key={d} value={d}>{d} ngày</option>
                      ))}
                    </select>
                    <span className="text-[10px] font-bold text-[#1A2340] shrink-0">Save 20%</span>
                  </div>
                </div>

                {/* 50GB Gọi & SMS with BEST CHOICE */}
                <div
                  onClick={() => setActiveCardId('fixed-50gb')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative ${activeCardId === 'fixed-50gb'
                    ? 'border-[#1A2340] bg-white ring-2 ring-[#1A2340]/20 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-[#1A2340]/60 bg-slate-50'
                    }`}
                >
                  <div className="absolute -top-2.5 left-3">
                    <span className="bg-[#1A2340] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                      BEST CHOICE
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-extrabold text-sm text-[#1A2340]">50GB</span>
                      <span className="text-[10px] bg-[#1A2340]/10 text-[#1A2340] px-1.5 py-0.5 rounded ml-1.5 font-bold">
                        Gọi & SMS
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-sm text-[#1A2340] tabular-nums">
                        {formatPrice(Math.round(baseUsd * 2.5 * usdToVnd / 1000) * 1000, Math.round(baseUsd * 2.5 * 100) / 100)}
                      </div>
                      <div className="text-[10px] text-slate-400 line-through">
                        ${(baseUsd * 3.1).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={fixedDays50Gb}
                      onChange={(e) => {
                        setFixedDays50Gb(Number(e.target.value));
                        setActiveCardId('fixed-50gb');
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#1A2340] shadow-2xs cursor-pointer focus:outline-none focus:border-[#1A2340]"
                    >
                      {[10, 15, 30].map((d) => (
                        <option key={d} value={d}>{d} ngày</option>
                      ))}
                    </select>
                    <span className="text-[10px] font-bold text-[#1A2340] shrink-0">Save 20%</span>
                  </div>
                </div>

              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* 3. DỮ LIỆU KHÔNG GIỚI HẠN (DATA KHÔNG GIỚI HẠN SUỐT CHUYẾN ĐI)        */}
            {/* --------------------------------------------------------------------- */}
            <div className="bg-white text-[#1A2340] rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3.5">
              <div>
                <h3 className="text-base font-bold text-[#1A2340]">Dữ liệu không giới hạn</h3>
                <p className="text-xs text-slate-500">Data không giới hạn suốt chuyến đi.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Không giới hạn 5Mbps */}
                <div
                  onClick={() => setActiveCardId('ulm-5mbps')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${activeCardId === 'ulm-5mbps'
                    ? 'border-[#1A2340] bg-white ring-2 ring-[#1A2340]/20 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-[#1A2340]/60 bg-slate-50'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-extrabold text-sm text-[#1A2340]">Không giới hạn 5Mbps</div>
                      <div className="text-[11px] text-slate-500">Thoải mái xem video, lướt web</div>
                    </div>
                    <span className="font-black text-sm text-[#1A2340] tabular-nums">
                      {formatPrice(
                        Math.round((baseUsd * 4.2 + (ulmDays5Mbps - 5) * 1.5) * usdToVnd / 1000) * 1000,
                        Math.round((baseUsd * 4.2 + (ulmDays5Mbps - 5) * 1.5) * 100) / 100
                      )}
                    </span>
                  </div>

                  <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={ulmDays5Mbps}
                      onChange={(e) => {
                        setUlmDays5Mbps(Number(e.target.value));
                        setActiveCardId('ulm-5mbps');
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#1A2340] shadow-2xs cursor-pointer focus:outline-none focus:border-[#1A2340]"
                    >
                      {[5, 7, 10, 15, 30].map((d) => (
                        <option key={d} value={d}>{d} ngày</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Không giới hạn 10Mbps (FLASH SALE) */}
                <div
                  onClick={() => setActiveCardId('ulm-10mbps')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative ${activeCardId === 'ulm-10mbps'
                    ? 'border-[#1A2340] bg-white ring-2 ring-[#1A2340]/20 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-[#1A2340]/60 bg-slate-50'
                    }`}
                >
                  <div className="absolute -top-2.5 left-3">
                    <span className="bg-[#1A2340] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-2xs flex items-center gap-0.5">
                      <Zap className="w-2.5 h-2.5" /> FLASH SALE
                    </span>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-extrabold text-sm text-[#1A2340]">Không giới hạn 10Mbps</div>
                      <div className="text-[11px] text-slate-500">Tốc độ cực nhanh 5G</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-sm text-[#1A2340] tabular-nums">
                        {formatPrice(
                          Math.round((baseUsd * 1.1 + (ulmDays10Mbps - 1) * 2.4) * usdToVnd / 1000) * 1000,
                          Math.round((baseUsd * 1.1 + (ulmDays10Mbps - 1) * 2.4) * 100) / 100
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 line-through">
                        ${(baseUsd * 1.4 + (ulmDays10Mbps - 1) * 2.8).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={ulmDays10Mbps}
                      onChange={(e) => {
                        setUlmDays10Mbps(Number(e.target.value));
                        setActiveCardId('ulm-10mbps');
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#1A2340] shadow-2xs cursor-pointer focus:outline-none focus:border-[#1A2340]"
                    >
                      {[1, 3, 5, 7, 10, 15, 30].map((d) => (
                        <option key={d} value={d}>{d} ngày</option>
                      ))}
                    </select>
                    <span className="text-[10px] font-bold text-[#1A2340] shrink-0">Save 20%</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: STICKY PURCHASE MODULE                                    */}
          {/* ======================================================================= */}
          <div className="lg:col-span-4 sticky top-20">
            <div className="bg-white text-[#1A2340] rounded-2xl border border-[#E2E8F0] shadow-md overflow-hidden space-y-4">

              {/* Top Free Trial Badge */}
              <div className="bg-slate-50 border-b border-[#E2E8F0] p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#1A2340]">
                    Dành cho người dùng mới: eSIM dùng thử miễn phí
                  </div>
                  <div className="text-xs font-extrabold text-[#1A2340] mt-0.5">
                    Nhận miễn phí 300MB cho chuyến đi sắp tới
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1A2340]/10 text-[#1A2340] flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
              </div>

              {/* Scenic destination banner image */}
              <div className="px-4">
                <div className="relative rounded-xl overflow-hidden h-28 bg-gradient-to-r from-[#1A2340] via-[#243056] to-[#314373] flex flex-col justify-end p-3 text-white">
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono">
                    {currentDest.topCarriers.join(' · ')}
                  </div>
                  <div className="text-xs font-bold leading-tight drop-shadow-sm">
                    Tặng 20GB gói 7 ngày - 35k
                  </div>
                  <div className="text-[11px] text-white/90 drop-shadow-xs">
                    Gói 50GB free nâng cấp Unlimited Data
                  </div>
                </div>
              </div>

              {/* Destination & Summary list */}
              <div className="px-5 space-y-3">
                <div className="flex items-center gap-2 font-extrabold text-base text-[#1A2340] pb-2 border-b border-[#E2E8F0]">
                  <img
                    src={`https://flagsapi.com/${currentDest.flagCode || currentDest.code || 'JP'}/flat/64.png`}
                    alt={currentDest.nameVi}
                    className="w-7 h-5 object-contain shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span>eSIM {currentDest.nameVi}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Dung lượng</span>
                    <span className="font-bold text-[#1A2340]">{activePlanInfo.dataName}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Thời hạn</span>
                    <span className="font-bold text-[#1A2340]">{activePlanInfo.days} ngày</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Tổng dữ liệu</span>
                    <span className="font-bold text-[#1A2340]">{activePlanInfo.totalDataSummary}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-[#E2E8F0]">
                    <span className="font-semibold text-slate-600">Tổng cộng</span>
                    <span className="text-2xl font-black text-[#1A2340] tabular-nums">
                      {formatPrice(activePlanInfo.priceVnd, activePlanInfo.priceUsd)}
                    </span>
                  </div>
                </div>

                {/* Primary Buy CTA Button */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-4 rounded-full bg-[#1A2340] hover:bg-[#243056] text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Mua ngay</span>
                </button>

                {/* Trust markers */}
                <div className="pt-2 flex flex-col gap-1 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 text-[#1A2340] font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Thanh toán an toàn được đảm bảo</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 text-[#1A2340]" />
                      Thay eSIM trong 1 giờ
                    </span>
                    <span className="flex items-center gap-1">
                      <Headphones className="w-3 h-3 text-[#1A2340]" />
                      Hỗ trợ 24/7
                    </span>
                  </div>
                </div>

                {/* Tabs: Tính năng | Chi tiết kỹ thuật */}
                <div className="pt-2 border-t border-[#E2E8F0]">
                  <div className="grid grid-cols-2 text-center text-xs font-bold border-b border-[#E2E8F0] pb-1">
                    <button
                      onClick={() => setActiveTabSpecs('features')}
                      className={`pb-1 cursor-pointer transition-colors ${activeTabSpecs === 'features'
                        ? 'text-[#1A2340] border-b-2 border-[#1A2340]'
                        : 'text-slate-500 hover:text-[#1A2340]'
                        }`}
                    >
                      Tính năng
                    </button>
                    <button
                      onClick={() => setActiveTabSpecs('tech')}
                      className={`pb-1 cursor-pointer transition-colors ${activeTabSpecs === 'tech'
                        ? 'text-[#1A2340] border-b-2 border-[#1A2340]'
                        : 'text-slate-500 hover:text-[#1A2340]'
                        }`}
                    >
                      Chi tiết kỹ thuật
                    </button>
                  </div>

                  {activeTabSpecs === 'features' ? (
                    <div className="py-3 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#1A2340] shrink-0" />
                        <span>Giao eSIM tức thì qua email</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Nhà mạng đáng tin cậy ({currentDest.topCarriers.join(', ')})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#1A2340] shrink-0" />
                        <span>4G / 5G Kết nối nhanh và ổn định</span>
                      </div>
                      <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500 leading-relaxed">
                        <Calendar className="w-4 h-4 text-[#1A2340] shrink-0 mt-0.5" />
                        <span>
                          Kích hoạt trong vòng 30 ngày sau khi nhận mã QR của bạn. Nếu mua hôm nay, hạn kích hoạt là{' '}
                          <strong className="text-[#1A2340] font-semibold">{expiryDate}</strong>.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-3 space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-500">APN:</span>
                        <span className="font-bold text-[#1A2340]">Tự động cấu hình</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Hotspot/Tethering:</span>
                        <span className="font-bold text-[#1A2340]">Có hỗ trợ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Hạ tầng:</span>
                        <span className="font-bold text-[#1A2340]">5G / 4G LTE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Chính sách:</span>
                        <span className="font-bold text-[#1A2340]">Hoàn tiền 100% nếu lỗi</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Compatibility check button */}
                <div className="pt-2 pb-4">
                  <button
                    onClick={() => setCompatibilityModalOpen(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] text-xs font-bold text-[#1A2340] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-[#1A2340]" />
                    <span>Kiểm tra tương thích tại đây →</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
