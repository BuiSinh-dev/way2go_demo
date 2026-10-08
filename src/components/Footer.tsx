import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart, Mail, Phone, Globe, Smartphone } from 'lucide-react';
import logoNavy from '../../assets/image/logo/way2go-logo-navy.png';

export const Footer: React.FC = () => {
  const { language, setActiveTab, openStoreCatalog, navigateToDestination, navigateToEarn, navigateToHelps } = useApp();

  return (
    <footer className="bg-[#EBF9FF] text-[#1A2340] pt-16 pb-12 text-left relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#00D2B8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-96 h-96 bg-[#ff7a5c]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* Top 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <img
                src={logoNavy}
                alt="Way2Go Logo"
                className="h-[100px] w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#1A2340]/90 max-w-sm leading-relaxed font-medium">
              {language === 'vi'
                ? 'Nền tảng cung cấp eSIM du lịch quốc tế kết nối hơn 200 điểm đến toàn cầu. Kích hoạt 60 giây, tốc độ 5G tối đa và tích điểm Way2Go Coin tiện lợi.'
                : 'International travel eSIM platform covering 200+ destinations worldwide. 60s activation, top 5G speeds, and Way2Go rewards ecosystem.'}
            </p>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h4 className="text-xs font-bold text-[#1A2340] uppercase tracking-wider mb-4">
              Điều hướng
            </h4>
            <ul className="space-y-2.5 text-xs text-[#1A2340]">
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
            <h4 className="text-xs font-bold text-[#1A2340] uppercase tracking-wider mb-4">
              Điểm đến phổ biến
            </h4>
            <ul className="space-y-2.5 text-xs text-[#1A2340]">
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
                    className="hover:text-[#00D2B8] transition-colors cursor-pointer text-[#1A2340] flex items-center gap-2 text-left"
                  >
                    <span>{dest.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Col */}
          <div>
            <h4 className="text-xs font-bold text-[#1A2340] uppercase tracking-wider mb-4">
              Hỗ trợ 24/7
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-[#1A2340]">
                <Phone className="w-4 h-4 text-[#1A2340]" />
                <span className="font-semibold">+84 912 345 678 (Zalo)</span>
              </div>
              <div className="flex items-center gap-2 text-[#1A2340]">
                <Mail className="w-4 h-4 text-[#1A2340]" />
                <span>support@way2go.io</span>
              </div>
              <div className="text-[11px] text-[#1A2340]/70 pt-1 font-medium">
                Trực kỹ thuật xuyên suốt 24/7 kể cả ngày lễ và Tết.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-[#1A2340]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#1A2340]/70 gap-4">
          <div>
            © 2026 Way2Go Inc. All rights reserved. Tiên phong giải pháp viễn thông du lịch số.
          </div>
          <div className="flex items-center gap-4">
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Điều khoản dịch vụ và chính sách bảo vệ dữ liệu khách hàng theo chuẩn GSMA.'); }} className="hover:text-[#00D2B8] transition-colors">
              Điều khoản dịch vụ
            </a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Chính sách bảo mật thông tin chuẩn quốc tế.'); }} className="hover:text-[#00D2B8] transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#refund" onClick={(e) => { e.preventDefault(); alert('Chính sách hoàn tiền 100% khi phát sinh lỗi kỹ thuật từ hệ thống viễn thông.'); }} className="hover:text-[#00D2B8] transition-colors">
              Chính sách hoàn tiền
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
