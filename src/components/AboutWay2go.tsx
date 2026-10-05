import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Users, Award, Shield, CheckCircle2, Heart, ArrowRight } from 'lucide-react';

import readyTravelSvg from '../../assets/image/common/ready_travel.svg';

export const AboutWay2go: React.FC = () => {
  const { language, setActiveTab } = useApp();

  const milestones = [
    {
      year: '2019',
      titleVi: 'Khởi đầu sứ mệnh kết nối',
      titleEn: 'Founding & Vision',
      descVi: 'Way2Go được thành lập với mục tiêu giải phóng người du lịch khỏi sự phức tạp của SIM vật lý và cước roaming đắt đỏ.',
      descEn: 'Way2Go was founded to eliminate physical SIM cards and exorbitant overseas roaming rates.'
    },
    {
      year: '2021',
      titleVi: 'Cột mốc 100.000 khách hàng đầu tiên',
      titleEn: '100,000 First Travelers',
      descVi: 'Mở rộng kết nối tại 50 quốc gia châu Á và châu Âu, tiên phong áp dụng công nghệ eSIM kích hoạt tự động.',
      descEn: 'Expanded across 50 destinations in Asia and Europe with automated eSIM provisioning.'
    },
    {
      year: '2024',
      titleVi: 'Phủ sóng hơn 200 quốc gia',
      titleEn: '200+ Destinations Worldwide',
      descVi: 'Hợp tác trực tiếp với các nhà mạng viễn thông quốc gia Tier-1, ra mắt tính năng ví điểm thưởng Way2Go Coin.',
      descEn: 'Direct interconnects with Tier-1 national carriers and introduced Way2Go Coin loyalty system.'
    },
    {
      year: '2026',
      titleVi: 'Đạt gần 2.000.000 khách hàng toàn cầu',
      titleEn: 'Nearly 2M Global Customers',
      descVi: 'Phục vụ hàng triệu chuyến đi an toàn, ổn định với đội ngũ hỗ trợ kỹ thuật trực tiếp 24/7 và ứng dụng 1 chạm.',
      descEn: 'Empowering millions of seamless trips backed by 24/7 human technical support and 1-tap mobile app.'
    }
  ];

  return (
    <div className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A2340] tracking-tight">
            {language === 'vi' ? 'Kết nối thế giới trong tầm tay bạn' : 'Connecting the World in Your Pocket'}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {language === 'vi'
              ? 'Way2Go là nền tảng viễn thông du lịch số, mang lại cho bạn sự tự do kết nối internet tốc độ cao không giới hạn tại hơn 200 quốc gia và vùng lãnh thổ.'
              : 'Way2Go is a next-generation travel telecom platform providing seamless, high-speed 5G internet across 200+ destinations worldwide.'}
          </p>
        </div>

        {/* What is Way2Go? Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white text-[#1A2340] p-8 rounded-3xl border border-[#E2E8F0] shadow-sm">
          <div className="space-y-4 text-left">
            <h2 className="text-2xl font-bold text-[#1A2340]">
              {language === 'vi' ? 'Way2Go là gì?' : 'What is Way2Go?'}
            </h2>
            <p className="text-sm text-[#1A2340]/80 leading-relaxed">
              {language === 'vi'
                ? 'Way2Go sinh ra để thay đổi cách chúng ta du lịch. Thay vì xếp hàng tại quầy bán SIM sân bay, tìm que chọc SIM hay lo sợ làm mất thẻ SIM Việt Nam, bạn chỉ cần 1 thao tác quét mã QR đơn giản.'
                : 'Way2Go redefines how the world stays connected while traveling. Skip airport SIM queues, fragile SIM ejector pins, and avoid losing your home SIM.'}
            </p>
            <p className="text-sm text-[#1A2340]/80 leading-relaxed">
              {language === 'vi'
                ? 'Chúng tôi tin rằng internet trong mỗi chuyến đi không chỉ là tiện ích, mà là sự an tâm tuyệt đối để định vị bản đồ, liên lạc với gia đình và tận hưởng trọn vẹn từng khoảnh khắc.'
                : 'We believe travel connectivity is not just a utility, but peace of mind ensuring you navigate easily and stay in touch with loved ones anywhere.'}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#1A2340]/90">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00D2B8]" />
                <span>Không hợp đồng</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00D2B8]" />
                <span>Không phí ẩn</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00D2B8]" />
                <span>Hoàn tiền 100%</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1A2340] border border-[#E2E8F0] p-6 rounded-2xl text-[#1A2340] space-y-4 text-left shadow-2xs">
            <h3 className="text-xl font-bold text-white">Sứ mệnh của chúng tôi</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              "Xóa bỏ mọi rào cản về cước viễn thông quốc tế, trao quyền cho mỗi người tự tin khám phá thế giới với sự kết nối tốc độ cao và chi phí tiết kiệm nhất."
            </p>
            <div className="pt-4 border-t border-[#E2E8F0] grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-black text-[#00D2B8] font-mono">200+</div>
                <div className="text-[11px] text-white/70">Quốc gia phủ sóng</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#00D2B8] font-mono">1.95M+</div>
                <div className="text-[11px] text-white/70">Người dùng tin chọn</div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A2340]">
              {language === 'vi' ? 'Hành trình phát triển của Way2Go' : 'Our Milestones & Growth'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Từ một ý tưởng năm 2019 đến mạng lưới kết nối toàn cầu hôm nay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-white text-[#1A2340] p-5 rounded-2xl border border-[#E2E8F0] text-left space-y-2 relative shadow-xs">
                <div className="text-2xl font-black text-[#00D2B8] font-mono">{m.year}</div>
                <div className="font-bold text-sm text-[#1A2340]">{language === 'vi' ? m.titleVi : m.titleEn}</div>
                <p className="text-xs text-[#1A2340]/80 leading-relaxed">{language === 'vi' ? m.descVi : m.descEn}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-white border border-[#E2E8F0] text-[#1A2340] rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-sm flex flex-col items-center justify-center">
          <img
            src={readyTravelSvg}
            alt="Ready for Travel"
            className="h-32 sm:h-44 w-auto object-contain mb-2 mx-auto"
          />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A2340]">
            {language === 'vi' ? 'Sẵn sàng cho chuyến đi tiếp theo của bạn?' : 'Ready for Your Next Trip?'}
          </h3>
          <p className="text-sm text-[#1A2340]/80 max-w-xl mx-auto">
            {language === 'vi'
              ? 'Chọn điểm đến ngay hôm nay và nhận mã kích hoạt siêu tốc trong 60 giây.'
              : 'Choose your destination today and get your instant eSIM in under 60 seconds.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('store')}
              className="px-6 py-3 rounded-xl bg-[#1A2340] hover:opacity-80 text-white font-black text-sm shadow-md transition-all cursor-pointer"
            >
              {language === 'vi' ? 'Xem các gói eSIM du lịch →' : 'Explore Travel eSIM Plans →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
