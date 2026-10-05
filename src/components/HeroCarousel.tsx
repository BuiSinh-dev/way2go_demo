import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

import worldImg from '../../assets/image/hero-image/world.svg';
import couponImg from '../../assets/image/hero-image/coupon_discount.svg';
import roadTripImg from '../../assets/image/hero-image/road_trip.svg';

export const HeroCarousel: React.FC = () => {
  const { language, setActiveTab, navigateToEarn, setAuthModalOpen, setAuthModalMode } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badgeVi: 'KẾT NỐI TOÀN CẦU 200+ ĐIỂM ĐẾN',
      badgeEn: 'GLOBAL CONNECTIVITY 200+ DESTINATIONS',
      titleVi: 'Luôn kết nối, dù bạn đi đâu',
      titleEn: 'Stay connected, wherever you go',
      subtextVi: 'Thiết lập eSIM ngay lập tức tại hơn 200 điểm đến. Tận hưởng tốc độ 4G/5G nhanh chóng mà không lo phí roaming.',
      subtextEn: 'Instant eSIM setup in 200+ destinations. Enjoy fast 4G/5G data with zero roaming fees',
      ctaPrimaryVi: 'Bắt đầu ngay',
      ctaPrimaryEn: 'Get Started',
      ctaSecondaryVi: 'Tìm điểm đến',
      ctaSecondaryEn: 'Find Your Destination',
      onPrimaryClick: () => {
        const el = document.getElementById('popular-locations');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else setActiveTab('store');
      },
      onSecondaryClick: () => setActiveTab('store'),
      image: worldImg
    },
    {
      id: 2,
      badgeVi: 'TÍCH ĐIỂM W2G COIN · HOÀN TIỀN ĐẾN 10%',
      badgeEn: 'WAY2GO COIN · UP TO 10% CASHBACK',
      titleVi: 'Nhận ưu đãi mỗi chuyến đi',
      titleEn: 'Earn Rewards Every Time You Travel',
      subtextVi: 'Nhận đến 10% cashback cho mỗi đơn eSIM với Way2go Coin. Đi nhiều hơn, tiết kiệm nhiều hơn!',
      subtextEn: 'Get up to 10% cashback on every eSIM order with Way2go Coin. Travel more, save more!',
      ctaPrimaryVi: 'Cách thức hoạt động',
      ctaPrimaryEn: 'How It Works',
      ctaSecondaryVi: 'Xem ví Coin',
      ctaSecondaryEn: 'View Coin Wallet',
      onPrimaryClick: () => navigateToEarn('coin'),
      onSecondaryClick: () => navigateToEarn('coin'),
      image: couponImg
    },
    {
      id: 3,
      badgeVi: '2M+ DU KHÁCH TIN DÙNG TOÀN CẦU',
      badgeEn: 'TRUSTED BY 2M+ TRAVELERS WORLDWIDE',
      titleVi: 'Được hơn 2 triệu du khách trên toàn thế giới tin dùng',
      titleEn: 'Trusted by 2M+ Travelers Worldwide',
      subtextVi: 'Cài đặt nhanh chóng, hỗ trợ 24/7 và giá cả minh bạch. Được đánh giá cao bởi những du khách thực tế trên các nền tảng đánh giá uy tín.',
      subtextEn: 'Fast setup, 24/7 support, and transparent pricing. Top-rated by real travelers on top review platforms',
      ctaPrimaryVi: 'Tìm điểm đến',
      ctaPrimaryEn: 'Find Your Destination',
      ctaSecondaryVi: 'Đăng ký ngay',
      ctaSecondaryEn: 'Sign up',
      isSecondarySignUp: true,
      onPrimaryClick: () => setActiveTab('store'),
      onSecondaryClick: () => {
        setAuthModalMode('register');
        setAuthModalOpen(true);
      },
      image: roadTripImg
    }
  ];

  // Increased slide display duration from 6s to 8.5s for comfortable reading
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="hero-carousel" className="relative overflow-hidden bg-[#1A2340] text-white">
      {/* Prominent Search Bar */}
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <div className="relative flex items-center bg-white border border-[#E2E8F0] rounded-full p-1.5 shadow-md transition-shadow">
          <div className="pl-4 pr-2 text-slate-400">
            <svg className="w-5 h-5 text-[#1A2340]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={language === 'vi' ? 'Bạn cần eSIM ở đâu?' : 'Where do you need an eSIMs?'}
            onClick={() => setActiveTab('store')}
            readOnly
            className="w-full bg-transparent border-none text-sm text-[#1A2340] placeholder-[#1A2340]/60 font-medium focus:outline-none cursor-pointer py-2"
          />
          <button
            onClick={() => setActiveTab('store')}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-[#1A2340] text-xs font-bold px-4 py-2 rounded-full border border-[#E2E8F0] shadow-sm transition-all cursor-pointer shrink-0 mr-1"
          >
            <span>{language === 'vi' ? 'Địa điểm' : 'Locations'}</span>
            <span className="text-[10px] text-[#1A2340]/60">▼</span>
          </button>
        </div>
      </div>

      <div className="bg-[#1A2340] text-white pt-6 pb-14 md:pt-8 md:pb-16 px-4 sm:px-6 lg:px-8 relative">
        {/* Horizontal Smooth Slider Track */}
        <div className="max-w-7xl mx-auto overflow-hidden relative z-10">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((s) => (
              <div
                key={s.id}
                className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Column: Text & CTAs */}
                <div className="lg:col-span-7 space-y-5 text-left">
                  {/* Metadata Header Badge */}
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#00D2B8]">
                    <Sparkles className="w-3.5 h-3.5 text-[#00D2B8]" />
                    <span className="bg-[#243056] border border-[#314373] px-2.5 py-1 rounded-full text-white font-bold">
                      {language === 'vi' ? s.badgeVi : s.badgeEn}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
                    {language === 'vi' ? s.titleVi : s.titleEn}
                  </h1>

                  {/* Subtext */}
                  <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
                    {language === 'vi' ? s.subtextVi : s.subtextEn}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={s.onPrimaryClick}
                      className="px-6 py-3 rounded-full bg-[#00D2B8] hover:bg-[#00bda6] text-[#1A2340] font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>{language === 'vi' ? s.ctaPrimaryVi : s.ctaPrimaryEn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={s.onSecondaryClick}
                      className={`px-5 py-3 rounded-full font-bold text-sm transition-all cursor-pointer shadow-md hover:shadow-lg ${s.isSecondarySignUp
                        ? 'bg-[#FF7A5C] hover:bg-[#e6694c] text-white border border-[#FF7A5C]'
                        : 'bg-white hover:bg-slate-50 text-[#1A2340] border border-[#E2E8F0]'
                        }`}
                    >
                      {language === 'vi' ? s.ctaSecondaryVi : s.ctaSecondaryEn}
                    </button>
                  </div>

                  {/* Ratings row */}
                  <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300 font-semibold border-t border-[#2b3a62]/80 mt-4">
                    <div className="flex items-center gap-1.5 bg-[#243056] px-3 py-1.5 rounded-full border border-[#314373]">
                      <span className="text-amber-400">★ 4.9</span>
                      <span className="text-white">iOS App Store</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#243056] px-3 py-1.5 rounded-full border border-[#314373]">
                      <span className="text-amber-400">★ 4.9</span>
                      <span className="text-white">Android Google Play</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#243056] px-3 py-1.5 rounded-full border border-[#314373]">
                      <span className="text-emerald-400">★ 4.8</span>
                      <span className="text-white">Trustpilot Excellent</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Clean Display of Hero Images with NO extra text */}
                <div className="lg:col-span-5 flex items-center justify-center p-2">
                  <img
                    src={s.image}
                    alt={language === 'vi' ? s.titleVi : s.titleEn}
                    className="w-full max-w-md h-auto max-h-[380px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Slide Indicators & Controls */}
        <div className="max-w-7xl mx-auto mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 transition-all rounded-full cursor-pointer ${currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-slate-600 hover:bg-slate-400'
                  }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#1A2340] transition-colors cursor-pointer shadow-xs"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#1A2340] transition-colors cursor-pointer shadow-xs"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
