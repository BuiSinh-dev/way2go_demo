import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { NEWS_DATA } from '../data/news';
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { language, setSelectedArticle, setActiveTab, activeTab } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isStandalone = activeTab === 'news';

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

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2340] tracking-tight">
              {language === 'vi' ? 'Cẩm nang du lịch & Bài viết SEO nổi bật' : 'Travel Guides & Featured SEO Insights'}
            </h2>
            <p className="mt-2 text-sm text-[#1A2340]/80">
              {language === 'vi'
                ? 'Lướt qua các kinh nghiệm dùng eSIM, mẹo tiết kiệm dung lượng và cẩm nang khám phá thế giới.'
                : 'Browse trending travel eSIM hacks, roaming comparisons, and destination guides.'}
            </p>
          </div>

          {/* Controls on Home mode: Navigation arrows + Xem tất cả button */}
          {!isStandalone && (
            <div className="flex items-center gap-2 shrink-0">
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
                className="ml-1 text-xs font-extrabold text-[#1A2340] hover:text-[#00D2B8] flex items-center gap-1.5 cursor-pointer whitespace-nowrap bg-white px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#00D2B8] shadow-2xs transition-all"
              >
                <span>{language === 'vi' ? 'Xem tất cả' : 'View all'}</span>
                <ArrowRight className="w-4 h-4 text-[#1A2340]" />
              </button>
            </div>
          )}
        </div>

        {/* Section Content: Grid layout on standalone screen VS Horizontal slider on Home */}
        {isStandalone ? (
          /* Standalone News Screen: Vertical Grid showing all articles */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {NEWS_DATA.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="w-full bg-white text-[#1A2340] rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:border-[#00D2B8] transition-all cursor-pointer flex flex-col justify-between group"
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
                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />

                  {/* Floating Category & Read Time Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="bg-[#1A2340]/85 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs">
                      {language === 'vi' ? article.categoryVi : article.categoryEn}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 border border-white/10">
                      <Clock className="w-3 h-3 text-[#00D2B8]" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-[#1A2340] group-hover:text-[#00D2B8] transition-colors line-clamp-2 leading-snug">
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
          /* Home Screen: Horizontal Carousel Slider */
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
          >
            {NEWS_DATA.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="min-w-[280px] sm:min-w-[320px] max-w-[340px] bg-white text-[#1A2340] rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:border-[#00D2B8] transition-all cursor-pointer flex flex-col justify-between group shrink-0"
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
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />

                  {/* Floating Category & Read Time Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="bg-[#1A2340]/85 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs">
                      {language === 'vi' ? article.categoryVi : article.categoryEn}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 border border-white/10">
                      <Clock className="w-3 h-3 text-[#00D2B8]" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#1A2340] group-hover:text-[#00D2B8] transition-colors line-clamp-2 leading-snug">
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
        )}
      </div>
    </section>
  );
};
