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
    <div className="fixed inset-0 z-50 bg-[#1A2340]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1A2340] text-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#2b3a62] overflow-hidden my-8 text-left">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#2b3a62] flex items-center justify-between bg-[#12192e]">
          <div>
            <h3 className="font-extrabold text-base text-white">
              Đảm bảo thiết bị của bạn hỗ trợ eSIM.
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Hầu hết các dòng máy từ năm 2019 trở lại đây đều hỗ trợ công nghệ eSIM.
            </p>
          </div>
          <button
            onClick={() => setCompatibilityModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#243356] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Main search box */}
          <div className="bg-[#243356] p-4 rounded-2xl border border-[#31436e] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Smartphone className="w-4 h-4 text-[#00D2B8]" />
              <span>Kiểm tra hỗ trợ eSIM</span>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nhập tên hoặc mã thiết bị (ví dụ: iPhone 15, D0001)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#1A2340] text-white placeholder-slate-400 rounded-xl border border-[#31436e] text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
              />
            </div>
          </div>

          {/* Apple devices */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#00D2B8] mb-2">
              Apple (iPhone & iPad)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filterList(COMPATIBLE_DEVICES.apple).map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#243356] text-xs text-slate-200">
                  <Check className="w-3.5 h-3.5 text-[#00D2B8] shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Samsung devices */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#00D2B8] mb-2">
              Samsung Galaxy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filterList(COMPATIBLE_DEVICES.samsung).map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#243356] text-xs text-slate-200">
                  <Check className="w-3.5 h-3.5 text-[#00D2B8] shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Pixel */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#00D2B8] mb-2">
              Google Pixel
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filterList(COMPATIBLE_DEVICES.google).map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#243356] text-xs text-slate-200">
                  <Check className="w-3.5 h-3.5 text-[#00D2B8] shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Others */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#00D2B8] mb-2">
              Xiaomi, Oppo, Sony & Hãng Khác
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filterList(COMPATIBLE_DEVICES.others).map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#243356] text-xs text-slate-200">
                  <Check className="w-3.5 h-3.5 text-[#00D2B8] shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="px-6 py-4 bg-[#12192e] border-t border-[#2b3a62] flex justify-end">
          <button
            onClick={() => setCompatibilityModalOpen(false)}
            className="px-5 py-2.5 bg-[#00D2B8] hover:bg-[#00bda6] text-[#1A2340] rounded-xl text-xs font-black transition-colors cursor-pointer"
          >
            Đã hiểu, đóng cửa sổ
          </button>
        </div>

      </div>
    </div>
  );
};
