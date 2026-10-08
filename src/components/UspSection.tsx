import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, ShieldCheck, DollarSign, Headset, Globe2, Smartphone, Users } from 'lucide-react';

export const UspSection: React.FC = () => {
  const { language, navigateToEarn } = useApp();

  const usps = [
    {
      icon: Users,
      titleVi: 'Gần 2.000.000 khách hàng tin tưởng',
      titleEn: 'Nearly 2,000,000 Verified Travelers',
      descVi: 'Được các travel blogger, doanh nhân và khách du lịch từ khắp nơi trên thế giới lựa chọn làm bạn đồng hành số 1.',
      descEn: 'The go-to choice for globetrotters, digital nomads, and holidaymakers exploring over 200 destinations.'
    },
    {
      icon: Zap,
      titleVi: 'Kích hoạt siêu tốc trong 60 giây',
      titleEn: '60-Second Instant Delivery',
      descVi: 'Mã QR và thông tin cài đặt được gửi tự động vào email ngay sau khi thanh toán. Không cần chờ đợi giao hàng vật lý.',
      descEn: 'Instant QR code sent to your email immediately upon payment. Zero shipping delays, ready before departure.'
    },
    {
      icon: Globe2,
      titleVi: 'Đối tác viễn thông Tier-1 (5G / 4G LTE)',
      titleEn: 'Tier-1 National Telco Partners',
      descVi: 'Liên kết trực tiếp với các nhà mạng viễn thông quốc gia: SoftBank, NTT Docomo, Vodafone, AT&T, Singtel đảm bảo tốc độ cao.',
      descEn: 'Direct interconnects with premier national carriers: SoftBank, Vodafone, Orange, AT&T, and Singtel.'
    },
    {
      icon: Smartphone,
      titleVi: 'Giữ nguyên SIM Việt Nam nhận OTP',
      titleEn: 'Keep Home SIM Active for SMS OTPs',
      descVi: 'Không cần tháo thẻ SIM vật lý. Tiếp tục nhận thông báo biến động số dư và mã OTP ngân hàng hoàn toàn miễn phí.',
      descEn: 'Dual-SIM mode keeps your primary bank number active for 2FA SMS while travel eSIM powers unlimited data.'
    },
    {
      icon: DollarSign,
      titleVi: 'Tiết kiệm tới 90% cước phí Roaming',
      titleEn: 'Save Up to 90% vs Regular Roaming',
      descVi: 'Gói cước trả trước minh bạch 100%, không lo hóa đơn phát sinh tiền triệu sau chuyến du lịch nước ngoài.',
      descEn: 'Transparent flat prepaid plans with zero hidden fees or shocking post-travel roaming billing surprises.'
    },
    {
      icon: ShieldCheck,
      titleVi: 'Cam kết hoàn tiền 100% nếu có lỗi',
      titleEn: '100% Money-Back Guarantee',
      descVi: 'Chính sách bảo hành rõ ràng, hoàn tiền nếu eSIM không tương thích hoặc gặp lỗi kỹ thuật từ hệ sinh thái.',
      descEn: 'Hassle-free refund policy if your eSIM encounters technical issues that cannot be resolved in 24 hours.'
    },
  ];

  return (
    <section className="py-16 bg-white text-[#1A2340] border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Highlight Banner with Light #EBF9FF Background and Ambient Glows */}
        <div className="mb-14 bg-[#EBF9FF] rounded-3xl p-8 sm:p-12 shadow-xl text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#00D2B8]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-64 h-64 bg-[#ff7a5c]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A2340] mb-8 max-w-3xl mx-auto text-balance">
              {language === 'vi'
                ? 'Why do over 2 million people choose Way2go'
                : 'Why do over 2 million people choose Way2go'}
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-2">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#1A2340] flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                  <Globe2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#1A2340]" />
                </div>
                <span className="text-xs font-bold text-[#1A2340] mt-3">{language === 'vi' ? '200+ Quốc gia' : '200+ Countries'}</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#1A2340] flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                  <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-[#1A2340]" />
                </div>
                <span className="text-xs font-bold text-[#1A2340] mt-3">{language === 'vi' ? 'Kích hoạt 60s' : '60s Activation'}</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#1A2340] flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                  <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-[#1A2340]" />
                </div>
                <span className="text-xs font-bold text-[#1A2340] mt-3">{language === 'vi' ? 'Giữ nguyên SIM' : 'Dual SIM Mode'}</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#1A2340] flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                  <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#1A2340]" />
                </div>
                <span className="text-xs font-bold text-[#1A2340] mt-3">{language === 'vi' ? 'Hoàn tiền 100%' : '100% Refund'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* USPs Grid - Pure White Cards with #E2E8F0 Border */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <div
                key={idx}
                className="bg-[#EBF9FF] border border-[#E2E8F0] rounded-3xl p-6 hover:border-[#1A2340] transition-all text-left group shadow-xs text-[#1A2340]"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-[#1A2340] border border-[#E2E8F0] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1A2340] mb-2">
                  {language === 'vi' ? usp.titleVi : usp.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#1A2340]/80 leading-relaxed">
                  {language === 'vi' ? usp.descVi : usp.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
