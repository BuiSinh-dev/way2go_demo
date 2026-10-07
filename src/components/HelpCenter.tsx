import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQS_DATA } from '../data/faqs';
import { Calculator, HelpCircle, ChevronDown, ChevronUp, Search, Smartphone, ShieldCheck, Wifi, Compass, ArrowRight } from 'lucide-react';

export const HelpCenter: React.FC = () => {
  const { language, setCompatibilityModalOpen, navigateToDestination } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [faqSearch, setFaqSearch] = useState('');

  // Interactive Data Calculator State
  const [tripDays, setTripDays] = useState<number>(7);
  const [webHours, setWebHours] = useState<number>(2); // ~100MB/hr
  const [mapsHours, setMapsHours] = useState<number>(1.5); // ~60MB/hr
  const [socialHours, setSocialHours] = useState<number>(1.5); // ~300MB/hr
  const [videoHours, setVideoHours] = useState<number>(0.5); // ~700MB/hr
  const [callMinutes, setCallMinutes] = useState<number>(30); // ~150MB

  // Calculations
  const dailyMb = Math.round(
    webHours * 100 +
    mapsHours * 60 +
    socialHours * 300 +
    videoHours * 700 +
    (callMinutes / 60) * 300
  );
  const dailyGb = (dailyMb / 1024).toFixed(1);
  const totalGb = ((dailyMb * tripDays) / 1024).toFixed(1);

  const recommendedPlan = Number(dailyGb) > 2.5
    ? 'Không giới hạn (ULM) hoặc 3GB/ngày'
    : Number(dailyGb) > 1.2
      ? 'Gói 2GB / ngày (Phổ biến nhất)'
      : 'Gói 1GB / ngày';

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.questionVi.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.questionEn.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answerVi.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answerEn.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 bg-[#FAF5EE]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2340] tracking-tight">
            {language === 'vi' ? 'How can we help?' : 'How can we help?'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            {language === 'vi'
              ? 'Giải đáp mọi thắc mắc về cài đặt eSIM, khắc phục lỗi kết nối và công cụ ước tính dung lượng dữ liệu chính xác.'
              : 'Find answers about eSIM setup, roaming troubleshooting, and calculate your trip data needs.'}
          </p>

          {/* Quick Search */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder={language === 'vi' ? 'Tìm câu hỏi, sự cố...' : 'Search questions, issues...'}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-[#1A2340] placeholder-slate-400 rounded-xl border border-[#cbeaf6] text-xs shadow-xs focus:ring-2 focus:ring-[#1A2340] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DATA USAGE CALCULATOR SECTION                                            */}
        {/* ========================================================================= */}
        {/* DATA USAGE CALCULATOR SECTION (Primary Theme Outer, White Cards Inner)   */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* DATA USAGE CALCULATOR SECTION (Static Presentation Display)               */}
        {/* ========================================================================= */}
        <div id="data-calculator" className="bg-[#1A2340] text-white rounded-3xl border border-[#2b3a62] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#2b3a62] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1A2340]/15 text-[#1A2340] flex items-center justify-center border border-[#1A2340]/20 shrink-0">
                <Calculator className="w-6 h-6 text-[#1A2340]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">
                  {language === 'vi' ? 'Tính dung lượng cần dùng' : 'Data Usage Calculator'}
                </h2>
                <p className="text-xs text-slate-300 font-medium">
                  {language === 'vi'
                    ? 'Kéo chỉnh thói quen sử dụng hàng ngày để ước tính chính xác gói cước bạn cần'
                    : 'Estimate how much high-speed data your trip requires based on daily activities'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#243356] p-1 rounded-xl border border-[#31436e]">
                {[3, 5, 7, 10, 15, 30].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setTripDays(d)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      tripDays === d
                        ? 'bg-[#1A2340] text-white font-extrabold shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {d}N
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-6 items-stretch">
            {/* Left Column: White Card for Interactive Usage Sliders */}
            <div className="lg:col-span-7 bg-white text-[#1A2340] p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-md space-y-5 text-left">
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-[#1A2340] mb-2">
                  <span>🌐 Lướt web, đọc báo, tin tức:</span>
                  <span className="text-[#1A2340] font-black">{webHours} giờ / ngày</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={webHours}
                  onChange={(e) => setWebHours(parseFloat(e.target.value))}
                  style={{ background: `linear-gradient(to right, #1A2340 ${(webHours / 8) * 100}%, #E2E8F0 ${(webHours / 8) * 100}%)` }}
                  className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-[#1A2340]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-[#1A2340] mb-2">
                  <span>🗺️ Bản đồ Google Maps, chỉ đường:</span>
                  <span className="text-[#1A2340] font-black">{mapsHours} giờ / ngày</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={mapsHours}
                  onChange={(e) => setMapsHours(parseFloat(e.target.value))}
                  style={{ background: `linear-gradient(to right, #1A2340 ${(mapsHours / 8) * 100}%, #E2E8F0 ${(mapsHours / 8) * 100}%)` }}
                  className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-[#1A2340]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-[#1A2340] mb-2">
                  <span>📱 Mạng xã hội (TikTok, Reels, Instagram):</span>
                  <span className="text-[#1A2340] font-black">{socialHours} giờ / ngày</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={socialHours}
                  onChange={(e) => setSocialHours(parseFloat(e.target.value))}
                  style={{ background: `linear-gradient(to right, #1A2340 ${(socialHours / 8) * 100}%, #E2E8F0 ${(socialHours / 8) * 100}%)` }}
                  className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-[#1A2340]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-[#1A2340] mb-2">
                  <span>🎬 Xem video YouTube, Netflix HD:</span>
                  <span className="text-[#1A2340] font-black">{videoHours} giờ / ngày</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={videoHours}
                  onChange={(e) => setVideoHours(parseFloat(e.target.value))}
                  style={{ background: `linear-gradient(to right, #1A2340 ${(videoHours / 8) * 100}%, #E2E8F0 ${(videoHours / 8) * 100}%)` }}
                  className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-[#1A2340]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-[#1A2340] mb-2">
                  <span>📞 Gọi video thoại (FaceTime, WhatsApp, Zalo):</span>
                  <span className="text-[#1A2340] font-black">{callMinutes} phút / ngày</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="240"
                  step="15"
                  value={callMinutes}
                  onChange={(e) => setCallMinutes(parseInt(e.target.value))}
                  style={{ background: `linear-gradient(to right, #1A2340 ${(callMinutes / 240) * 100}%, #E2E8F0 ${(callMinutes / 240) * 100}%)` }}
                  className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-[#1A2340]"
                />
              </div>
            </div>

            {/* Right Column: White Card for Calculated Results & Recommended Plan */}
            <div className="lg:col-span-5 bg-white text-[#1A2340] p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-md space-y-4 text-left flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#1A2340] uppercase tracking-wider font-black">
                  KẾT QUẢ DỰ TÍNH
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="text-xs text-slate-500 font-semibold">Ước tính mỗi ngày:</div>
                    <div className="text-2xl font-black text-[#1A2340] tabular-nums">~{dailyGb} GB</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold">Tổng cả {tripDays} ngày:</div>
                    <div className="text-2xl font-black text-[#1A2340] tabular-nums">~{totalGb} GB</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Gợi ý gói tối ưu cho bạn:</div>
                  <div className="text-base font-extrabold text-[#1A2340]">
                    {recommendedPlan}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
                    Đảm bảo tốc độ cao 5G, không bị nghẽn mạng và thoải mái phát hotspot cho các thiết bị khác.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigateToDestination('japan')}
                className="w-full py-3 px-4 bg-[#1A2340] hover:bg-[#243356] text-white font-black text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
              >
                <span>Xem gói theo gợi ý này</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FAQS & TROUBLESHOOTING SECTIONS                                          */}
        {/* ========================================================================= */}
        <div className="space-y-6 text-left">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A2340]">
              {language === 'vi' ? 'Câu hỏi thường gặp & Hướng dẫn kỹ thuật' : 'Popular Questions & Troubleshooting'}
            </h2>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'install', label: 'Cài đặt' },
                { id: 'compatible', label: 'Tương thích máy' },
                { id: 'roaming', label: 'Roaming & Mạng' },
                { id: 'troubleshoot', label: 'Sửa lỗi' },
                { id: 'payment', label: 'Hoàn tiền & Đơn' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeCategory === c.id
                    ? 'bg-[#1A2340] text-white font-bold shadow-xs'
                    : 'bg-white text-[#1A2340] border border-[#E2E8F0] hover:bg-slate-50'
                    }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion FAQ list */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-sm transition-all"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer text-[#1A2340]"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#1A2340] leading-snug">
                      {language === 'vi' ? faq.questionVi : faq.questionEn}
                    </span>
                    <div className="text-slate-400 shrink-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#1A2340]" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#1A2340]/80 leading-relaxed border-t border-slate-100 pt-3 bg-white">
                      {language === 'vi' ? faq.answerVi : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
