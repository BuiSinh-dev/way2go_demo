import React from 'react';
import { useApp } from '../context/AppContext';
import { Star } from 'lucide-react';
import appStoreIcon from '../../assets/image/common/app_store.png';
import googlePlayIcon from '../../assets/image/common/google-play.png';
import downloadImageSvg from '../../assets/image/common/download_image.svg';

export const AppDownloadBanner: React.FC = () => {
  const { language } = useApp();

  return (
    <section id="app-download" className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Soft Slate Banner matching clean white layout */}
        <div className="bg-slate-50 rounded-[32px] sm:rounded-[40px]  relative overflow-hidden shadow-xs border border-slate-200/80">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

            {/* Left Column: Download Image Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <img
                src={downloadImageSvg}
                alt="Download App Illustration"
                className="w-full h-auto max-w-[420px] mx-auto object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Right Column: Heading, Description & Download Buttons */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 className="text-4xl font-black text-[#0F172A] tracking-tight leading-[1.2]">
                {language === 'vi'
                  ? 'Chúng tôi luôn đồng hành cùng bạn, dù bạn ở bất cứ đâu'
                  : 'We are always with you, wherever you are'}
              </h2>

              <p className="text-sm sm:text-base text-[#1E293B]/90 font-medium leading-relaxed max-w-xl">
                {language === 'vi'
                  ? 'Tải về ứng dụng Way2Go để dễ dàng mua, quản lý và nạp eSIM mọi lúc mọi nơi.'
                  : 'Download the Way2Go app to easily buy, manage and top up eSIM anytime, anywhere.'}
              </p>

              {/* Download buttons & Rating stars */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 pt-2">

                {/* iOS App Download & Rating */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2.5 w-full sm:w-auto">
                  <a
                    href="https://apps.apple.com/vn/app/way2go-travel-esim/id6744437994"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0F172A] font-extrabold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 border border-slate-100/80 cursor-pointer"
                  >
                    <img src={appStoreIcon} alt="App Store" className="w-6 h-6 object-contain shrink-0" />
                    <span>{language === 'vi' ? 'Tải ứng dụng iOS' : 'Download iOS App'}</span>
                  </a>

                  {/* Rating under button */}
                  <div className="w-full text-center pt-0.5 space-y-0.5">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      {language === 'vi' ? 'Đánh giá' : 'Rating'}
                    </div>
                    <div className="text-2xl font-black text-[#0F172A]">4.7</div>
                    <div className="flex justify-center gap-0.5 text-[#FF9F29]">
                      <Star className="w-4 h-4 fill-[#FF9F29]" />
                      <Star className="w-4 h-4 fill-[#FF9F29]" />
                      <Star className="w-4 h-4 fill-[#FF9F29]" />
                      <Star className="w-4 h-4 fill-[#FF9F29]" />
                      <Star className="w-4 h-4 fill-[#FF9F29]" />
                    </div>
                  </div>
                </div>

                {/* Android App Download & Rating */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2.5 w-full sm:w-auto">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.consortio.way2go&hl=vi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0F172A] font-extrabold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 border border-slate-100/80 cursor-pointer"
                  >
                    <img src={googlePlayIcon} alt="Google Play" className="w-6 h-6 object-contain shrink-0" />
                    <span>{language === 'vi' ? 'Tải ứng dụng Android' : 'Download Android App'}</span>
                  </a>

                  {/* Rating under button */}
                  <div className="w-full text-center pt-0.5 space-y-0.5">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      {language === 'vi' ? 'Đánh giá' : 'Rating'}
                    </div>
                    <div className="text-2xl font-black text-[#0F172A]">4.6</div>
                    <div className="flex justify-center gap-0.5 text-[#FF9F29]">
                      <Star className="w-4 h-4 fill-[#FF9F29]" />
                      <Star className="w-4 h-4 fill-[#FF9F29]" />
                      <Star className="w-4 h-4 fill-[#FF9F29]" />
                      <Star className="w-4 h-4 fill-[#FF9F29]" />
                      <Star className="w-4 h-4 fill-[#FF9F29] opacity-60" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

