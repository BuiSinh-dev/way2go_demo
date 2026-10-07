import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { HomePopularLocations } from './components/HomePopularLocations';
import { VideoGuidesSection } from './components/VideoGuidesSection';
import { UspSection } from './components/UspSection';
import { HomeFaqSection } from './components/HomeFaqSection';
import { NewsSection } from './components/NewsSection';
import { KocTestimonials } from './components/KocTestimonials';
import { AppDownloadBanner } from './components/AppDownloadBanner';
import { DestinationStore } from './components/DestinationStore';
import { AboutWay2go } from './components/AboutWay2go';
import { EarnWithWay2go } from './components/EarnWithWay2go';
import { HelpCenter } from './components/HelpCenter';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { DeviceCompatibilityModal } from './components/DeviceCompatibilityModal';
import { NewsDetailModal } from './components/NewsDetailModal';
import { Footer } from './components/Footer';
import InviteFriends from './components/InviteFriends';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1A2340] antialiased selection:bg-[#00D2B8] selection:text-[#1A2340]">
      {/* 1-Row 3-Zone Navigation Header */}
      <Header />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* 2. Hero Carousel */}
            <HeroCarousel />

            {/* 3. Get eSIMs for popular locations */}
            <HomePopularLocations />

            {/* 4. Video guides về eSIM, cài đặt 2 dòng máy, roaming */}
            <VideoGuidesSection />

            {/* 5. Gần 2Tr users, tại sao chọn W2G, các USP */}
            <UspSection />

            {/* 6. FAQs */}
            <HomeFaqSection />
            {/* 8. Feedback KH, KOLs, KOC chụp với eSIM */}
            <KocTestimonials />
            <InviteFriends />
            {/* 7. Các bài SEO nổi bật lướt qua */}
            <NewsSection />



            {/* 9. Để tải APP */}
            <AppDownloadBanner />
          </>
        )}

        {/* ========================================================================= */}
        {/* CỘT 2: TRANG CHI TIẾT eSIM STORE (OPT1 FILTER + STICKY SUMMARY)          */}
        {/* ========================================================================= */}
        {(activeTab === 'store' || activeTab === 'product-detail') && (
          <div className="pt-2">
            <DestinationStore standalone={true} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* CỘT 3: WAY2GO (ABOUT US)                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'about' && <AboutWay2go />}

        {/* ========================================================================= */}
        {/* CỘT 4: NEWS (TIN TỨC & SEO ARTICLES)                                     */}
        {/* ========================================================================= */}
        {activeTab === 'news' && (
          <div className="pt-4">
            <NewsSection />
          </div>
        )}

        {/* ========================================================================= */}
        {/* CỘT 5: EARN WITH WAY2GO (LOYALTY COIN & AFFILIATE 3 TIERS)               */}
        {/* ========================================================================= */}
        {activeTab === 'earn' && <EarnWithWay2go />}

        {/* ========================================================================= */}
        {/* CỘT 6: GET HELPS & DATA USAGE CALCULATOR                                 */}
        {/* ========================================================================= */}
        {activeTab === 'helps' && <HelpCenter />}
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Global Modals */}
      <CheckoutModal />
      <AuthModal />
      <DeviceCompatibilityModal />
      <NewsDetailModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
