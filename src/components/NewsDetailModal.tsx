import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, Sparkles } from 'lucide-react';

export const NewsDetailModal: React.FC = () => {
  const { selectedArticle, setSelectedArticle, language, navigateToEarn } = useApp();

  if (!selectedArticle) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1A2340]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1A2340] text-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#2b3a62] overflow-hidden my-8 text-left">
        
        {/* Header Banner with Cover Image */}
        <div className="relative border-b border-[#2b3a62]">
          {selectedArticle.imageUrl && (
            <div className="h-56 sm:h-64 relative overflow-hidden">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.titleVi}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2340] via-[#1A2340]/60 to-black/40" />
            </div>
          )}

          <button
            onClick={() => setSelectedArticle(null)}
            className="absolute right-4 top-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 space-y-3 relative z-10 -mt-16 sm:-mt-20">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#00D2B8] font-semibold">
              <span className="bg-[#00D2B8]/20 backdrop-blur-md border border-[#00D2B8]/30 px-3 py-1 rounded-full text-[#00D2B8] font-extrabold">
                {language === 'vi' ? selectedArticle.categoryVi : selectedArticle.categoryEn}
              </span>
              <span className="flex items-center gap-1 text-slate-200 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px]">
                <Calendar className="w-3 h-3 text-[#00D2B8]" />
                {selectedArticle.date}
              </span>
              <span className="flex items-center gap-1 text-slate-200 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px]">
                <Clock className="w-3 h-3 text-[#00D2B8]" />
                {selectedArticle.readTime}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug">
              {language === 'vi' ? selectedArticle.titleVi : selectedArticle.titleEn}
            </h2>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto text-sm text-slate-300 leading-relaxed bg-[#1A2340]">
          {(language === 'vi' ? selectedArticle.contentVi : selectedArticle.contentEn).map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          {/* Internal link to Earn with Way2Go */}
          <div className="mt-6 p-4 rounded-xl bg-[#243356] border border-[#31436e] flex items-center justify-between">
            <div className="text-xs text-slate-200">
              <span className="font-bold text-[#00D2B8]">Ưu đãi độc quyền:</span> Tích lũy Way2Go Coin ngay hôm nay để nhận miễn phí các gói eSIM du lịch tiếp theo!
            </div>
            <button
              onClick={() => {
                setSelectedArticle(null);
                navigateToEarn('coin');
              }}
              className="px-3.5 py-1.5 bg-[#00D2B8] hover:bg-[#00bda6] text-[#1A2340] font-black text-xs rounded-lg transition-colors cursor-pointer shrink-0 ml-3"
            >
              Khám phá ngay
            </button>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#12192e] border-t border-[#2b3a62] flex justify-end">
          <button
            onClick={() => setSelectedArticle(null)}
            className="px-5 py-2 bg-white hover:bg-slate-100 text-[#1A2340] rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Đóng bài viết
          </button>
        </div>

      </div>
    </div>
  );
};
