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
                className="w-full h-auto max-w-[335px] mx-auto object-contain filter drop-shadow-sm"
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

              {/* Download buttons with inline rating badges */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">

                {/* iOS App Download */}
                <a
                  href="https://apps.apple.com/vn/app/way2go-travel-esim/id6744437994"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0F172A] flex items-center justify-center font-extrabold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all gap-3 border border-slate-200/80 cursor-pointer group"
                >
                  <img src={appStoreIcon} alt="App Store" className="w-6 h-6 object-contain shrink-0" />
                  <span>{language === 'vi' ? 'Tải ứng dụng iOS' : 'Download iOS App'}</span>
                </a>

                {/* Android App Download */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.consortio.way2go&hl=vi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0F172A] flex items-center justify-center font-extrabold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all gap-3 border border-slate-200/80 cursor-pointer group"
                >
                  <img src={googlePlayIcon} alt="Google Play" className="w-6 h-6 object-contain shrink-0" />
                  <span>{language === 'vi' ? 'Tải ứng dụng Android' : 'Download Android App'}</span>
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

