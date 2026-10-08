import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { NEWS_DATA } from '../data/news';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import InviteFriends from './InviteFriends';
import appStoreIcon from '../../assets/image/common/app_store.png';
import googlePlayIcon from '../../assets/image/common/google-play.png';
import downloadImageSvg from '../../assets/image/common/start_travel.svg';

export interface Props {
  standalone?: boolean;
}

export const NewsSection: React.FC<Props> = (props) => {
  const { language, setSelectedArticle, setActiveTab } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const filteredArticles = NEWS_DATA.filter((article) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    const title = (language === 'vi' ? article.titleVi : article.titleEn).toLowerCase();
    const summary = (language === 'vi' ? article.summaryVi : article.summaryEn).toLowerCase();
    const category = (language === 'vi' ? article.categoryVi : article.categoryEn).toLowerCase();
    return title.includes(query) || summary.includes(query) || category.includes(query);
  });

  return (
    <section className={`py-6 sm:py-10 ${props.standalone ? 'bg-slate-50/40' : 'bg-white border-t border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {props.standalone ? (
          /* Standalone News Screen: Card Wrapper with shadow-xl md:shadow-2xl */
          <div className="bg-white rounded-[32px] p-6 sm:p-8 md:p-10 space-y-10 my-4 sm:my-6">
            {/* Header: Centered "News" title + Search input */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="relative inline-block">
                <h1 className="relative z-10 text-4xl sm:text-5xl font-black text-[#1A2340] tracking-tight px-6 py-1">
                  News
                </h1>
              </div>

              <div className="mt-4 max-w-2xl mx-auto relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search News"
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#E2E8F0] rounded-full text-xs sm:text-sm text-[#1A2340] placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1A2340] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Articles Vertical Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="w-full bg-white text-[#1A2340] rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:border-[#1A2340] transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    {/* Card Cover Image */}
                    <div className="h-48 sm:h-52 relative overflow-hidden bg-[#1A2340]">
                      {article.imageUrl ? (
                        <img
                          src={article.imageUrl}
                          alt={article.titleVi}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#1A2340] flex items-center justify-center text-white/20 font-black text-2xl font-mono">
                          WAY2GO INSIGHT
                        </div>
                      )}
                    </div>

                    {/* Card content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-[#1A2340] group-hover:opacity-60 transition-colors line-clamp-2 leading-snug">
                          {language === 'vi' ? article.titleVi : article.titleEn}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-[#1A2340]/75 line-clamp-3 leading-relaxed">
                          {language === 'vi' ? article.summaryVi : article.summaryEn}
                        </p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#1A2340]/70">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#1A2340]/60" />
                          {article.date}
                        </span>
                        <span className="font-extrabold text-[#1A2340] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          {language === 'vi' ? 'Đọc tiếp' : 'Read more'} →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500 text-sm">
                {language === 'vi' ? `Không tìm thấy bài viết phù hợp với "${searchQuery}"` : `No articles found matching "${searchQuery}"`}
              </div>
            )}

            {/* Card Download App Banner */}
            <div
              className="rounded-3xl px-6 shadow-xl text-white relative overflow-hidden"
              style={{ background: "radial-gradient(circle at 0% 0%, #03B4A0, #DEF3FD)" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-8 text-left space-y-4">
                  <h3 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
                    {language === 'vi'
                      ? (
                        <span>Tải App Way2go
                          <span className="block">Quản lý eSim & đổi quà miễn phí.</span></span>
                      )
                      : 'Download Way2Go App — Easily manage eSIM & redeem rewards anywhere'}
                  </h3>

                  <p className="text-xs sm:text-sm text-white leading-relaxed max-w-xl">
                    {language === 'vi'
                      ? 'Tải ngay ứng dụng Way2Go trên iOS và Android để kiểm tra dung lượng data thực tế, kích hoạt eSIM 1-click và nhận ngay 100 Way2Go Coins miễn phí khi đăng nhập lần đầu!'
                      : 'Get the Way2Go app on iOS & Android to monitor data usage, activate eSIMs in 1-click, and get 100 bonus Way2Go Coins on first login!'}
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <a
                      href="https://apps.apple.com/vn/app/way2go-travel-esim/id6744437994"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-white hover:bg-slate-100 text-[#1A2340] font-extrabold text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer border border-white"
                    >
                      <img src={appStoreIcon} alt="App Store" className="w-5 h-5 object-contain shrink-0" />
                      <span>{language === 'vi' ? 'Tải ứng dụng iOS' : 'App Store (iOS)'}</span>
                    </a>

                    <a
                      href="https://play.google.com/store/apps/details?id=com.consortio.way2go&hl=vi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-white text-[#1A2340] font-extrabold text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer"
                    >
                      <img src={googlePlayIcon} alt="Google Play" className="w-5 h-5 object-contain shrink-0" />
                      <span>{language === 'vi' ? 'Tải ứng dụng Android' : 'Google Play (Android)'}</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-4 flex justify-center">
                  <img
                    src={downloadImageSvg}
                    alt="Way2Go App Download"
                    className="w-full max-w-[280px] h-auto object-contain filter drop-shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Invite Friends Network Section */}
            <InviteFriends />
          </div>
        ) : (
          /* Home Screen: Horizontal Carousel Slider */
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2340] tracking-tight">
                  {language === 'vi' ? 'Tin tức' : 'Latest News'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  {language === 'vi'
                    ? 'Kinh nghiệm du lịch, mẹo dùng eSIM và cập nhật mới nhất'
                    : 'Travel experiences, eSIM tips and latest updates'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  onClick={scrollLeft}
                  className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#1A2340] shadow-xs transition-colors cursor-pointer"
                  aria-label="Previous articles"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#1A2340] shadow-xs transition-colors cursor-pointer"
                  aria-label="Next articles"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setActiveTab('news');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="ml-1 text-xs font-extrabold text-[#1A2340] hover:text-[#FF6500] flex items-center gap-1.5 cursor-pointer whitespace-nowrap bg-white px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#FF6500] shadow-2xs transition-all"
                >
                  <span>{language === 'vi' ? 'Xem tất cả' : 'View all'}</span>
                  <ArrowRight className="w-4 h-4 text-[#1A2340]" />
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
            >
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="min-w-[280px] sm:min-w-[320px] max-w-[340px] bg-white text-[#1A2340] rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:border-[#1A2340] transition-all cursor-pointer flex flex-col justify-between group shrink-0"
                >
                  {/* Card Cover Image */}
                  <div className="h-44 sm:h-48 relative overflow-hidden bg-[#1A2340]">
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={article.titleVi}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1A2340] flex items-center justify-center text-white/20 font-black text-2xl font-mono">
                        WAY2GO INSIGHT
                      </div>
                    )}
                  </div>

                  {/* Card content */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#1A2340] group-hover:opacity-70 transition-colors line-clamp-2 leading-snug">
                        {language === 'vi' ? article.titleVi : article.titleEn}
                      </h3>
                      <p className="mt-2 text-xs text-[#1A2340]/75 line-clamp-3 leading-relaxed">
                        {language === 'vi' ? article.summaryVi : article.summaryEn}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#1A2340]/70">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#1A2340]/60" />
                        {article.date}
                      </span>
                      <span className="font-extrabold text-[#1A2340] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        {language === 'vi' ? 'Đọc tiếp' : 'Read more'} →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
