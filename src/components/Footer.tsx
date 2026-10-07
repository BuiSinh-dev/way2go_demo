import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart, Mail, Phone, Globe, Smartphone } from 'lucide-react';
import logoWhite from '../../assets/image/logo/way2go_logo_white.png';

export const Footer: React.FC = () => {
  const { language, setActiveTab, openStoreCatalog, navigateToDestination, navigateToEarn, navigateToHelps } = useApp();

  return (
    <footer className="bg-[#1A2340] text-white pt-16 pb-12 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Top 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <img
                src={logoWhite}
                alt="Way2Go Logo"
                className="h-[230px] sm:h-[100px] w-auto object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              {language === 'vi'
                ? 'Nền tảng cung cấp eSIM du lịch quốc tế kết nối hơn 200 điểm đến toàn cầu. Kích hoạt 60 giây, tốc độ 5G tối đa và tích điểm Way2Go Coin tiện lợi.'
                : 'International travel eSIM platform covering 200+ destinations worldwide. 60s activation, top 5G speeds, and Way2Go rewards ecosystem.'}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00D2B8]" />
                <span>Hoàn tiền 100%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#00D2B8]" />
                <span>Không cần đổi SIM</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Điều hướng
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#00D2B8] transition-colors cursor-pointer"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  onClick={openStoreCatalog}
                  className="hover:text-[#00D2B8] transition-colors cursor-pointer"
                >
                  eSIM store
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#00D2B8] transition-colors cursor-pointer"
                >
                  Về Way2go
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#00D2B8] transition-colors cursor-pointer"
                >
                  Tin tức & SEO
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToEarn('coin')}
                  className="hover:text-[#00D2B8] transition-colors cursor-pointer"
                >
                  Earn with W2G
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToHelps()}
                  className="hover:text-[#00D2B8] transition-colors cursor-pointer"
                >
                  Trung tâm trợ giúp
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Destinations Col */}
          <div>
            <h4 className="text-sm font-extrabold text-white tracking-tight mb-4">
              Điểm đến phổ biến
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              {[
                { id: 'usa', label: 'United States', flagCode: 'US' },
                { id: 'uk', label: 'United Kingdom', flagCode: 'GB' },
                { id: 'south-korea', label: 'South Korea', flagCode: 'KR' },
                { id: 'japan', label: 'Japan', flagCode: 'JP' },
                { id: 'china', label: 'China', flagCode: 'CN' },
                { id: 'thailand', label: 'Thailand', flagCode: 'TH' },
                { id: 'taiwan', label: 'Taiwan', flagCode: 'TW' },
                { id: 'singapore', label: 'Singapore', flagCode: 'SG' },
                { id: 'vietnam-local', label: 'Vietnam', flagCode: 'VN' },
                { id: 'malaysia', label: 'Malaysia', flagCode: 'MY' },
              ].map((dest) => (
                <li key={dest.id}>
                  <button
                    onClick={() => navigateToDestination(dest.id)}
                    className="hover:text-[#00D2B8] transition-colors cursor-pointer text-slate-300 flex items-center gap-2 text-left"
                  >
                    <img
                      src={`https://flagsapi.com/${dest.flagCode}/flat/64.png`}
                      alt={dest.label}
                      className="w-5 h-3.5 object-cover rounded-xs shrink-0"
                    />
                    <span>{dest.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Hỗ trợ 24/7
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-white">
                <Phone className="w-4 h-4 text-[#00D2B8]" />
                <span className="font-semibold">+84 912 345 678 (Zalo)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-[#00D2B8]" />
                <span>support@way2go.io</span>
              </div>
              <div className="text-[11px] text-slate-400 pt-1">
                Trực kỹ thuật xuyên suốt 24/7 kể cả ngày lễ và Tết.
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-white block mb-1.5 font-semibold">Phương thức thanh toán:</span>
                <div className="flex flex-wrap gap-1.5 text-[10px] text-white">
                  <span className="bg-[#243056] border border-[#314373] px-2 py-1 rounded shadow-xs font-bold">Visa</span>
                  <span className="bg-[#243056] border border-[#314373] px-2 py-1 rounded shadow-xs font-bold">Mastercard</span>
                  <span className="bg-[#243056] border border-[#314373] px-2 py-1 rounded shadow-xs font-bold">Apple Pay</span>
                  <span className="bg-[#243056] border border-[#314373] px-2 py-1 rounded shadow-xs font-bold">VietQR</span>
                  <span className="bg-[#243056] border border-[#314373] px-2 py-1 rounded shadow-xs font-bold">MoMo</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 Way2Go Inc. All rights reserved. Tiên phong giải pháp viễn thông du lịch số.
          </div>
          <div className="flex items-center gap-4">
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Điều khoản dịch vụ và chính sách bảo vệ dữ liệu khách hàng theo chuẩn GSMA.'); }} className="hover:text-white transition-colors">
              Điều khoản dịch vụ
            </a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Chính sách bảo mật thông tin chuẩn quốc tế.'); }} className="hover:text-white transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#refund" onClick={(e) => { e.preventDefault(); alert('Chính sách hoàn tiền 100% khi phát sinh lỗi kỹ thuật từ hệ thống viễn thông.'); }} className="hover:text-white transition-colors">
              Chính sách hoàn tiền
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
