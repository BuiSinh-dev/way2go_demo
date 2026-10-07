import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock } from 'lucide-react';

export const NewsDetailModal: React.FC = () => {
  const { selectedArticle, setSelectedArticle, language, navigateToEarn } = useApp();

  if (!selectedArticle) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1A2340]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#1A2340] rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E2E8F0] overflow-hidden my-8 text-left">
        
        {/* Header Banner with Cover Image */}
        <div className="relative border-b border-[#E2E8F0] bg-white">
          {selectedArticle.imageUrl && (
            <div className="h-52 sm:h-60 relative overflow-hidden">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.titleVi}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            </div>
          )}

          <button
            onClick={() => setSelectedArticle(null)}
            className="absolute right-4 top-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#1A2340] shadow-md border border-slate-200 backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 space-y-3 bg-white">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              <span className="bg-[#1A2340] text-white px-3 py-1 rounded-full text-[11px] font-extrabold shadow-xs">
                {language === 'vi' ? selectedArticle.categoryVi : selectedArticle.categoryEn}
              </span>
              <span className="flex items-center gap-1 text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full text-[11px]">
                <Calendar className="w-3 h-3 text-[#1A2340]" />
                {selectedArticle.date}
              </span>
              <span className="flex items-center gap-1 text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full text-[11px]">
                <Clock className="w-3 h-3 text-[#1A2340]" />
                {selectedArticle.readTime}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#1A2340] leading-snug">
              {language === 'vi' ? selectedArticle.titleVi : selectedArticle.titleEn}
            </h2>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[55vh] overflow-y-auto text-sm text-slate-700 leading-relaxed bg-white">
          {(language === 'vi' ? selectedArticle.contentVi : selectedArticle.contentEn).map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          {/* Internal link to Earn with Way2Go */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between shadow-xs">
            <div className="text-xs text-slate-700">
              <span className="font-bold text-[#1A2340]">Ưu đãi độc quyền:</span> Tích lũy Way2Go Coin ngay hôm nay để nhận miễn phí các gói eSIM du lịch tiếp theo!
            </div>
            <button
              onClick={() => {
                setSelectedArticle(null);
                navigateToEarn('coin');
              }}
              className="px-3.5 py-1.5 bg-[#1A2340] hover:bg-[#28355c] text-white font-black text-xs rounded-lg transition-colors cursor-pointer shrink-0 ml-3 shadow-xs"
            >
              Khám phá ngay
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-[#E2E8F0] flex justify-end">
          <button
            onClick={() => setSelectedArticle(null)}
            className="px-5 py-2 bg-[#1A2340] hover:bg-[#28355c] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Đóng bài viết
          </button>
        </div>

      </div>
    </div>
  );
};
