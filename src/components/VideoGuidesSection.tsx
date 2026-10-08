import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Apple, Smartphone, Radio, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export const VideoGuidesSection: React.FC = () => {
  const { language, setCompatibilityModalOpen } = useApp();
  const [activeGuideTab, setActiveGuideTab] = useState<'ios' | 'android'>('ios');
  const [isPlayingSim, setIsPlayingSim] = useState(false);

  const guides = {
    ios: {
      youtubeId: 'B7dorRdzQG4',
      youtubeUrl: 'https://youtu.be/B7dorRdzQG4',
      titleVi: 'Hướng dẫn cài đặt eSIM trên iPhone (iOS 16, 17, 18)',
      titleEn: 'How to Install eSIM on iPhone (iOS 16, 17, 18)',
      duration: '1:45',
      steps: [
        {
          step: '1',
          titleVi: 'Mở Cài đặt > Di động > Thêm eSIM',
          titleEn: 'Open Settings > Cellular > Add eSIM',
          descVi: 'Đảm bảo điện thoại kết nối mạng Wi-Fi ổn định trước khi quét mã.',
          descEn: 'Ensure device is connected to stable Wi-Fi before scanning.'
        },
        {
          step: '2',
          titleVi: 'Quét mã QR từ email của Way2Go',
          titleEn: 'Scan the QR code from Way2Go email',
          descVi: 'Hệ thống tự động tải hồ sơ viễn thông eSIM chỉ trong 30 giây.',
          descEn: 'eSIM profile downloads automatically within 30 seconds.'
        },
        {
          step: '3',
          titleVi: 'Đặt tên nhãn eSIM (vd: Du lịch Nhật)',
          titleEn: 'Label your eSIM (e.g. Travel eSIM)',
          descVi: 'Dễ dàng phân biệt giữa SIM chính tại nhà và SIM du lịch.',
          descEn: 'Easily differentiate between your home SIM and travel eSIM.'
        },
        {
          step: '4',
          titleVi: 'Hạ cánh: Bật "Chuyển vùng dữ liệu" (Data Roaming)',
          titleEn: 'Arrival: Turn ON "Data Roaming"',
          descVi: 'Chỉ bật roaming cho eSIM du lịch khi đã đáp máy bay tại nước sở tại.',
          descEn: 'Enable roaming strictly on the travel eSIM upon airport arrival.'
        }
      ]
    },
    android: {
      youtubeId: 'B7dorRdzQG4',
      youtubeUrl: 'https://youtu.be/B7dorRdzQG4',
      titleVi: 'Hướng dẫn cài đặt eSIM trên Samsung & Google Pixel',
      titleEn: 'How to Install eSIM on Samsung & Google Pixel',
      duration: '2:10',
      steps: [
        {
          step: '1',
          titleVi: 'Vào Cài đặt > Kết nối > Quản lý SIM',
          titleEn: 'Open Settings > Connections > SIM Manager',
          descVi: 'Chọn mục "Thêm gói cước di động" hoặc "Thêm eSIM".',
          descEn: 'Tap "Add mobile plan" or "Add eSIM".'
        },
        {
          step: '2',
          titleVi: 'Quét mã QR hoặc nhập mã kích hoạt',
          titleEn: 'Scan QR code or enter activation details',
          descVi: 'Đưa camera hướng vào mã QR nhận được qua email hoặc ứng dụng.',
          descEn: 'Point your camera at the QR code sent by Way2Go.'
        },
        {
          step: '3',
          titleVi: 'Bật eSIM và chọn làm mạng dữ liệu chính',
          titleEn: 'Turn on eSIM and set as Mobile Data SIM',
          descVi: 'Giữ SIM gọi thoại/SMS ở thẻ SIM vật lý chính để nhận mã OTP.',
          descEn: 'Keep calls/SMS on physical home SIM for free incoming OTPs.'
        },
        {
          step: '4',
          titleVi: 'Bật Chuyển vùng dữ liệu khi sang nước ngoài',
          titleEn: 'Enable Data Roaming when abroad',
          descVi: 'Điện thoại sẽ tự động bắt sóng nhà mạng đối tác địa phương nhanh chóng.',
          descEn: 'Device instantly locks onto partner carrier network.'
        }
      ]
    },
    roaming: {
      youtubeId: 'B7dorRdzQG4',
      youtubeUrl: 'https://youtu.be/B7dorRdzQG4',
      titleVi: 'Hướng dẫn cài đặt eSIM trên Samsung & Google Pixel',
      titleEn: 'How to Install eSIM on Samsung & Google Pixel',
      duration: '2:10',
      steps: [
        {
          step: '1',
          titleVi: 'Vào Cài đặt > Kết nối > Quản lý SIM',
          titleEn: 'Open Settings > Connections > SIM Manager',
          descVi: 'Chọn mục "Thêm gói cước di động" hoặc "Thêm eSIM".',
          descEn: 'Tap "Add mobile plan" or "Add eSIM".'
        },
        {
          step: '2',
          titleVi: 'Quét mã QR hoặc nhập mã kích hoạt',
          titleEn: 'Scan QR code or enter activation details',
          descVi: 'Đưa camera hướng vào mã QR nhận được qua email hoặc ứng dụng.',
          descEn: 'Point your camera at the QR code sent by Way2Go.'
        },
        {
          step: '3',
          titleVi: 'Bật eSIM và chọn làm mạng dữ liệu chính',
          titleEn: 'Turn on eSIM and set as Mobile Data SIM',
          descVi: 'Giữ SIM gọi thoại/SMS ở thẻ SIM vật lý chính để nhận mã OTP.',
          descEn: 'Keep calls/SMS on physical home SIM for free incoming OTPs.'
        },
        {
          step: '4',
          titleVi: 'Bật Chuyển vùng dữ liệu khi sang nước ngoài',
          titleEn: 'Enable Data Roaming when abroad',
          descVi: 'Điện thoại sẽ tự động bắt sóng nhà mạng đối tác địa phương nhanh chóng.',
          descEn: 'Device instantly locks onto partner carrier network.'
        }
      ]
    },
  };

  const activeContent = guides[activeGuideTab];

  return (
    <section id="video-guides" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2340] tracking-tight text-balance">
            {language === 'vi'
              ? 'Video hướng dẫn cài đặt eSIM & giải đáp chuyển vùng Roaming'
              : 'Step-by-Step eSIM Setup & Roaming Explainer Videos'}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#1A2340]/80">
            {language === 'vi'
              ? 'Dễ hiểu, chi tiết cho cả iPhone và Android. Kích hoạt thành công chỉ trong 3 phút.'
              : 'Effortless setup for both iOS and Android with zero technical expertise needed.'}
          </p>
        </div>

        {/* Guide Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar text-xs font-semibold">
          {[
            { id: 'ios', labelVi: 'Cài đặt trên iPhone (iOS)', labelEn: 'iPhone Setup (iOS)', icon: Apple },
            { id: 'android', labelVi: 'Cài đặt trên Android', labelEn: 'Android Setup', icon: Smartphone },
            { id: 'roaming', labelVi: 'Roaming', labelEn: 'Roaming', icon: Smartphone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeGuideTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveGuideTab(tab.id as any);
                  setIsPlayingSim(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${isActive
                  ? 'bg-[#1A2340] text-white font-black shadow-md'
                  : 'bg-white text-[#1A2340] border border-[#E2E8F0] hover:bg-slate-50'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{language === 'vi' ? tab.labelVi : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Video Player Mockup & Step-by-Step Breakdown - Pure White Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white text-[#1A2340] rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm">

          {/* Video Player */}
          <div className="lg:col-span-6">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#1A2340] border border-[#2b3a62] shadow-md group">
              {isPlayingSim ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeContent.youtubeId}?autoplay=1&rel=0`}
                  title={language === 'vi' ? activeContent.titleVi : activeContent.titleEn}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <div
                  onClick={() => setIsPlayingSim(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center cursor-pointer group bg-slate-900 overflow-hidden"
                >
                  {/* Real YouTube Video Thumbnail Image */}
                  <img
                    src={`https://img.youtube.com/vi/${activeContent.youtubeId}/hqdefault.jpg`}
                    alt={language === 'vi' ? activeContent.titleVi : activeContent.titleEn}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  {/* Subtle dark gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/50" />
                  {/* Play Icon */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-[#fdfdfd] text-[#1A2340] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-7 h-7  fill-[#1A2340]" />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[#1A2340]/80">
              <span>Được biên soạn bởi đội ngũ Kỹ thuật viễn thông Way2Go</span>
              <button
                onClick={() => setCompatibilityModalOpen(true)}
                className="text-[#1A2340] font-bold hover:underline cursor-pointer"
              >
                Kiểm tra máy bạn →
              </button>
            </div>
          </div>

          {/* Steps list */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1A2340]">
              {language === 'vi' ? '4 Bước thực hiện nhanh chóng:' : '4 Quick Execution Steps:'}
            </h3>

            <div className="space-y-3">
              {activeContent.steps.map((st) => (
                <div
                  key={st.step}
                  className="p-3.5 bg-slate-50 rounded-xl border border-[#E2E8F0] shadow-2xs flex items-start gap-3.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#1A2340] text-white font-black text-xs flex items-center justify-center shrink-0">
                    {st.step}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#1A2340]">
                      {language === 'vi' ? st.titleVi : st.titleEn}
                    </h5>
                    <p className="text-xs text-[#1A2340]/80 mt-0.5 leading-relaxed">
                      {language === 'vi' ? st.descVi : st.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
