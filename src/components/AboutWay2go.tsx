import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Users, Globe, CheckCircle2 } from 'lucide-react';

import our1Img from '../../assets/image/way2go/our1.png';
import our2Img from '../../assets/image/way2go/our2.png';
import ourStoryImg from '../../assets/image/way2go/our_story.jpg';
import readyTravelSvg from '../../assets/image/common/ready_travel.svg';

export const AboutWay2go: React.FC = () => {
  const { language, setActiveTab } = useApp();

  return (
    <div className="pb-16 bg-white">
      {/* Top Page Header Banner */}
      <div className=" py-10 sm:py-14 text-center mb-10">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1A2340] tracking-wide uppercase">
            {language === 'vi' ? 'SIM DU LỊCH TOÀN CẦU WAY2GO' : 'WAY2GO GLOBAL TRAVEL eSIM'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 italic font-medium">
            {language === 'vi'
              ? 'Nâng tầm trải nghiệm du lịch với kết nối không ngừng'
              : 'Elevating travel experiences with seamless connectivity'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-[#1A2340]">

        {/* SECTION 1: CÂU CHUYỆN VỀ CHÚNG TÔI */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="md:col-span-6 text-left space-y-4">
            <h2 className="text-xl  font-extrabold text-[#1A2340] tracking-tight">
              {language === 'vi' ? 'Về Way2go' : 'About us'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {language === 'vi'
                ? 'Chính thức thành lập vào năm 2010, Consortio Việt Nam là công ty uy tín trong lĩnh vực phân phối SIM du lịch và các dịch vụ hỗ trợ nâng cao trải nghiệm du lịch, tự hào được biết đến bởi các sản phẩm SIM du lịch Way2go có thiết kế riêng đi kèm các dịch vụ tích hợp và thông tin du lịch dành cho du khách quốc tế đến Việt Nam và du khách Việt Nam đi nước ngoài.'
                : 'Founded in 2010, Consortio Vietnam is a trusted company specializing in travel SIM cards and travel experience services, proud to present custom-designed Way2go travel eSIMs with integrated services for international visitors and outbound travelers.'}
            </p>
          </div>

          {/* Right Stats Cards with scenic background */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200/80 text-white p-6 sm:p-8 flex flex-col justify-between h-44 sm:h-52 group">
              <img
                src={ourStoryImg}
                alt="Way2go Customers"
                className="absolute inset-0 w-full h-full object-cover  group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 " />
              <div className="relative z-10 space-y-1 text-left">
                <span className="text-xs text-gray-600  font-medium">
                  {language === 'vi' ? 'Phục vụ trên' : 'Serving over'}
                </span>
                <div className="text-lg font-black text-[#1A2340]">
                  {language === 'vi' ? '2 triệu khách hàng' : '2 Million Customers'}
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200/80 text-white p-6 sm:p-8 flex flex-col justify-between h-44 sm:h-52 group">
              <img
                src={ourStoryImg}
                alt="Way2go Coverage"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute to-transparent" />
              <div className="relative z-10 space-y-1 text-left">
                <span className="text-xs text-gray-600 font-medium">
                  {language === 'vi' ? 'Phủ sóng trên' : 'Coverage across'}
                </span>
                <div className="text-lg font-black text-[#1A2340]">
                  {language === 'vi' ? '200 Quốc gia' : '200+ Countries'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: FAST FACTS CARD (CARD MÀU MẮT MÈO / MINT GREEN AS SHOWN IN IMAGE 2) */}
        <div className="bg-[#00D2B8] rounded-3xl p-8 sm:p-12 text-center border border-[#B8DDC6] shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-8 tracking-tight">
            Fast facts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
            {/* Stat 1: Year founded */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white text-[#1A2340] shadow-sm flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                2019
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/70">
                Year founded
              </div>
            </div>

            {/* Stat 2: Users */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white text-[#1A2340] shadow-sm flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                30M+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/70">
                Users
              </div>
            </div>

            {/* Stat 3: Countries coverage */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white text-[#1A2340] shadow-sm flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                200+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/70">
                Countries and regions coverage
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: TẦM NHÌN & SỨ MỆNH */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Image: our1.png */}
          <div className="md:col-span-6 flex justify-center">
            <img
              src={our1Img}
              alt="Way2go Vision Card"
              className="w-full max-w-md sm:max-w-lg h-auto rounded-3xl shadow-lg border border-slate-200/80 object-contain"
            />
          </div>

          {/* Right Content: Tầm nhìn & Sứ mệnh */}
          <div className="md:col-span-6 text-left space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#1A2340]">
                {language === 'vi' ? 'Tầm nhìn' : 'Vision'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {language === 'vi'
                  ? 'Trở thành doanh nghiệp vững mạnh và uy tín trong lĩnh vực cung cấp các sản phẩm, dịch vụ hỗ trợ nâng cao trải nghiệm du lịch.'
                  : 'To become a strong and reputable leader providing premium products and services that elevate global travel experiences.'}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xl font-bold text-[#1A2340]">
                {language === 'vi' ? 'Sứ mệnh' : 'Mission'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {language === 'vi'
                  ? 'Way2go mong muốn trở thành người bạn đồng hành đáng tin cậy của du khách đến từ khắp nơi trên thế giới, cùng du khách nâng tầm trải nghiệm du lịch và thoả thích kết nối mọi nền văn hoá trên thế giới.'
                  : 'Way2go strives to be the trusted companion of travelers worldwide, empowering seamless connectivity across all global cultures.'}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: GIÁ TRỊ CỐT LÕI */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Content: Giá trị cốt lõi */}
          <div className="md:col-span-7 text-left space-y-4">
            <h3 className="text-xl font-bold text-[#1A2340] mb-2">
              {language === 'vi' ? 'Giá trị cốt lõi' : 'Core Values'}
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong className="text-[#1A2340] font-bold">{language === 'vi' ? 'Hợp lực' : 'Synergy'}</strong> – {language === 'vi'
                  ? 'Hợp tác minh bạch, đồng hành cùng Quý Đối tác tạo ra những lợi ích bền vững, gắn kết Quý Khách hàng bằng sự chân thành và tôn trọng.'
                  : 'Transparent partnership, creating sustainable mutual growth with utmost sincerity and respect.'}
              </p>

              <p>
                <strong className="text-[#1A2340] font-bold">{language === 'vi' ? 'Sáng tạo' : 'Innovation'}</strong> – {language === 'vi'
                  ? 'Đề cao sự khác biệt tích cực, không ngừng khám phá, hoàn thiện và đổi mới, tạo ra các giá trị mới phù hợp với xu hướng phát triển của thời đại và bắt kịp nhu cầu thay đổi từng ngày của Quý Khách hàng.'
                  : 'Embracing positive difference, constantly innovating to deliver cutting-edge travel connectivity solutions.'}
              </p>

              <p>
                <strong className="text-[#1A2340] font-bold">{language === 'vi' ? 'Dũng cảm' : 'Courage'}</strong> – {language === 'vi'
                  ? 'Tiên phong lựa chọn và phát triển sản phẩm – dịch vụ chuyên biệt, suy nghĩ và hành động can đảm, vượt qua thách thức và khuôn mẫu.'
                  : 'Pioneering specialized products, daring to break boundaries and overcome challenges.'}
              </p>

              <p>
                <strong className="text-[#1A2340] font-bold">{language === 'vi' ? 'Nhân ái' : 'Compassion'}</strong> – {language === 'vi'
                  ? 'Tận tâm, thấu hiểu, chia sẻ, đồng hành và hỗ trợ Quý Khách hàng và Quý Đối tác trong mọi hành trình.'
                  : 'Dedicated support, empathy, and accompaniment for every customer and partner along their journey.'}
              </p>
            </div>
          </div>

          {/* Right Image: our2.png */}
          <div className="md:col-span-5 flex justify-center">
            <img
              src={our2Img}
              alt="Way2go Core Values Cards"
              className="w-full max-w-md sm:max-w-lg h-auto rounded-3xl shadow-lg border border-slate-200/80 object-contain"
            />
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-white border border-slate-200/80 text-[#1A2340] rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-sm flex flex-col items-center justify-center">
          <img
            src={readyTravelSvg}
            alt="Ready for Travel"
            className="h-32 sm:h-40 w-auto object-contain mb-2 mx-auto"
          />
          <h3 className="text-2xl sm:text-3xl font-black text-[#1A2340]">
            {language === 'vi' ? 'Sẵn sàng cho chuyến đi tiếp theo của bạn?' : 'Ready for Your Next Trip?'}
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            {language === 'vi'
              ? 'Chọn điểm đến ngay hôm nay và nhận mã kích hoạt siêu tốc trong 60 giây.'
              : 'Choose your destination today and get your instant eSIM in under 60 seconds.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('store')}
              className="px-6 py-3.5 rounded-full bg-[#FF7A5C] hover:bg-[#e6694c] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {language === 'vi' ? 'Xem các gói eSIM du lịch →' : 'Explore Travel eSIM Plans →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutWay2go;
