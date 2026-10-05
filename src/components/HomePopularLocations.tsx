import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DESTINATIONS } from '../data/destinations';
import { motion, AnimatePresence } from 'motion/react';
import visiteTravelImg from '../../assets/image/header/visite_travel.svg';

export const HomePopularLocations: React.FC = () => {
  const { language, currency, formatPrice, navigateToDestination, setActiveTab } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('popular');

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    if (activeCategory === 'popular') return dest.category === 'popular' || dest.id === 'japan' || dest.id === 'thailand' || dest.id === 'south-korea' || dest.id === 'hongkong' || dest.id === 'china' || dest.id === 'vietnam-local' || dest.id === 'macao' || dest.id === 'singapore' || dest.id === 'taiwan' || dest.id === 'indonesia' || dest.id === 'australia' || dest.id === 'malaysia';
    if (activeCategory === 'local') return dest.category === 'local' || dest.category === 'popular';
    if (activeCategory === 'regional') return dest.category === 'regional';
    if (activeCategory === 'global') return dest.category === 'global';
    return true;
  });

  const categories = [
    { id: 'popular', labelVi: 'Phổ biến', labelEn: 'Popular', icon: '🚀' },
    { id: 'local', labelVi: 'Địa phương', labelEn: 'Local', icon: '⚓' },
    { id: 'regional', labelVi: 'Khu vực', labelEn: 'Regional', icon: '🗺️' },
    { id: 'global', labelVi: 'Toàn cầu', labelEn: 'Global', icon: '🌍' },
  ];

  return (
    <section id="popular-locations" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
        {/* Visite Travel Header Illustration Banner */}
        <div className="flex justify-center">
          <img
            src={visiteTravelImg}
            alt="Visite Travel Banner"
            className="w-full max-w-[500px] h-auto object-contain "
          />
        </div>
        {/* Rounded Container as Reference Image */}
        <div className="bg-[#1A2340] rounded-[32px] p-6 sm:p-8 md:p-10 shadow-lg text-white">

          {/* Top Category Tabs Bar */}
          <div className="border-b border-slate-700/60 pb-0 mb-6">
            <div className="flex items-center justify-start sm:justify-start gap-8 overflow-x-auto no-scrollbar">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative pb-3 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 text-sm sm:text-base font-bold ${isActive
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                      }`}
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span>{language === 'vi' ? cat.labelVi : cat.labelEn}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00D2B8] rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-left">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {language === 'vi' ? 'Khám phá eSIM cho các điểm đến phổ biến' : 'Get eSIMs for popular locations'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                {language === 'vi'
                  ? 'Khám phá các eSIM được yêu thích nhất của chúng tôi — các gói cước bắt đầu từ mức giá hiển thị.'
                  : 'Grab eSIMs for popular destinations.'}
              </p>
            </div>

            <button
              onClick={() => {
                setActiveTab('store');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white hover:bg-slate-100 text-[#1A2340] font-black text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-center"
            >
              {language === 'vi' ? 'Khám phá tất cả điểm đến' : 'View all destinations'}
            </button>
          </div>

          {/* SIM Cards Grid with Smooth Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4"
            >
              {filteredDestinations.map((dest) => {
                const flagCode = dest.flagCode || dest.code || 'BE';
                const flagUrl = `https://flagsapi.com/${flagCode}/flat/64.png`;

                return (
                  <motion.div
                    key={dest.id}
                    whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigateToDestination(dest.id)}
                    className="bg-white hover:bg-slate-50 text-[#1A2340] rounded-2xl px-4 py-3 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                  >
                    {/* Left: Flag Image + Country Name */}
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <img
                        src={flagUrl}
                        alt={dest.nameVi}
                        className="w-8 h-6 object-contain shrink-0"
                        onError={(e) => {
                          // Fallback if image fails to load
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="font-extrabold text-sm text-[#1A2340] truncate">
                        {language === 'vi' ? dest.nameVi : dest.nameEn}
                      </span>
                    </div>

                    {/* Right: Price */}
                    <div className="text-right shrink-0">
                      <span className="font-black text-sm text-[#1A2340] tabular-nums">
                        {currency === 'USD'
                          ? `$${dest.startingPriceUsd.toFixed(2)} USD`
                          : `${formatPrice(dest.startingPriceVnd, dest.startingPriceUsd)}`}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
