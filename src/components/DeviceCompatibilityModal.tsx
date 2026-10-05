import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPATIBLE_DEVICES } from '../data/faqs';
import { X, Search, Check, Smartphone, AlertCircle } from 'lucide-react';

export const DeviceCompatibilityModal: React.FC = () => {
  const { isCompatibilityModalOpen, setCompatibilityModalOpen, language } = useApp();
  const [search, setSearch] = useState('');

  if (!isCompatibilityModalOpen) return null;

  const filterList = (list: string[]) =>
    list.filter((item) => item.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-[#1A2340]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#1A2340] rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 text-left">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-[#1A2340]">
              Đảm bảo thiết bị của bạn hỗ trợ eSIM.
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Hầu hết các dòng máy từ năm 2019 trở lại đây đều hỗ trợ công nghệ eSIM.
            </p>
          </div>
          <button
            onClick={() => setCompatibilityModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-[#1A2340] hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 bg-white">
          {/* Main search box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A2340]">
              <Smartphone className="w-4 h-4 text-[#1A2340]" />
              <span>Kiểm tra hỗ trợ eSIM</span>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nhập tên hoặc mã thiết bị (ví dụ: iPhone 15, D0001)..."
                className="w-full pl-10 pr-4 py-2.5 bg-white text-[#1A2340] placeholder-slate-400 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1A2340] focus:border-[#1A2340] focus:outline-none shadow-2xs"
              />
            </div>
          </div>

          {/* Apple devices */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#1A2340] mb-2.5">
              Apple (iPhone & iPad)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filterList(COMPATIBLE_DEVICES.apple).map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 text-xs text-[#1A2340] font-medium transition-colors">
                  <Check className="w-4 h-4 text-[#00D2B8] shrink-0 font-bold" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Samsung devices */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#1A2340] mb-2.5">
              Samsung Galaxy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filterList(COMPATIBLE_DEVICES.samsung).map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 text-xs text-[#1A2340] font-medium transition-colors">
                  <Check className="w-4 h-4 text-[#00D2B8] shrink-0 font-bold" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Pixel */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#1A2340] mb-2.5">
              Google Pixel
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filterList(COMPATIBLE_DEVICES.google).map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 text-xs text-[#1A2340] font-medium transition-colors">
                  <Check className="w-4 h-4 text-[#00D2B8] shrink-0 font-bold" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Others */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#1A2340] mb-2.5">
              Xiaomi, Oppo, Sony & Hãng Khác
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filterList(COMPATIBLE_DEVICES.others).map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 text-xs text-[#1A2340] font-medium transition-colors">
                  <Check className="w-4 h-4 text-[#00D2B8] shrink-0 font-bold" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setCompatibilityModalOpen(false)}
            className="px-6 py-2.5 bg-[#1A2340] hover:bg-[#243356] text-white rounded-xl text-xs font-black transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            Đã hiểu, đóng cửa sổ
          </button>
        </div>

      </div>
    </div>
  );
};
