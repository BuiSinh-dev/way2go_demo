import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Globe, ShoppingBag, User, ChevronDown, Check, Coins, Menu, X, Search, TrendingUp } from 'lucide-react';
import logoNavy from '../../assets/image/logo/way2go-logo-navy.png';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    currency,
    setCurrency,
    cart,
    user,
    openStoreCatalog,
    setAuthModalOpen,
    setAuthModalMode,
    logoutUser,
    navigateToEarn,
    openCheckout
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEarnDropdownOpen, setIsEarnDropdownOpen] = useState(false);
  const [isMenuEarnExpanded, setIsMenuEarnExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'home', labelVi: 'Trang chủ', labelEn: 'Home' },
    { id: 'store', labelVi: 'Cửa hàng eSIM', labelEn: 'eSIM store' },
    { id: 'about', labelVi: 'Way2go', labelEn: 'Way2go' },
    { id: 'news', labelVi: 'News', labelEn: 'News' },
    { id: 'earn', labelVi: 'Earn with W2G', labelEn: 'Earn with W2G' },
    { id: 'helps', labelVi: 'Get Helps', labelEn: 'Get Helps' },
  ];

  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300 ${isScrolled ? 'shadow-md py-1' : 'shadow-xs py-0'}`}>
      {/* Main Top Bar: 3 Zones Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Zone 1: Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center text-left cursor-pointer"
          >
            <img
              src={logoNavy}
              alt="Way2Go Logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </button>
        </div>

        {/* Zone 2: Dynamic Center Content (Nav links when top, Search bar when scrolled) */}
        {!isScrolled ? (
          /* Initial Nav Links State - Image 1 */
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#1A2340]">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id || (link.id === 'store' && activeTab === 'product-detail');

              if (link.id === 'earn') {
                return (
                  <div
                    key={link.id}
                    className="relative py-3 flex items-center"
                    onMouseEnter={() => setIsEarnDropdownOpen(true)}
                    onMouseLeave={() => setIsEarnDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        navigateToEarn('coin');
                        setIsEarnDropdownOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`transition-colors relative py-1 cursor-pointer whitespace-nowrap flex items-center gap-1 ${isActive
                        ? 'text-[#1A2340] font-black'
                        : 'text-[#1A2340]/80 hover:text-[#1A2340]'
                        }`}
                    >
                      <span>{language === 'vi' ? link.labelVi : link.labelEn}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isEarnDropdownOpen ? 'rotate-180 text-[#1A2340]' : 'text-[#1A2340]/70'}`} />
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A2340] rounded-full" />
                      )}
                    </button>

                    {/* Dropdown Menu for Earn with W2G (Bridged hover container) */}
                    {isEarnDropdownOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 w-64 z-50">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 py-2 text-left text-xs font-semibold space-y-1 animate-in fade-in zoom-in-95 duration-150">
                          <button
                            type="button"
                            onClick={() => {
                              navigateToEarn('coin');
                              setIsEarnDropdownOpen(false);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full px-4 py-2.5 hover:bg-slate-50 text-[#1A2340] flex items-center gap-2.5 transition-colors cursor-pointer text-left"
                          >
                            <Coins className="w-4 h-4 text-amber-500 shrink-0" />
                            <div>
                              <div className="font-bold text-xs text-[#1A2340]">Way2Go Coin</div>
                              <div className="text-[11px] text-slate-500 font-normal">Loyalty & Giới thiệu bạn bè</div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              navigateToEarn('affiliate');
                              setIsEarnDropdownOpen(false);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full px-4 py-2.5 hover:bg-slate-50 text-[#1A2340] flex items-center gap-2.5 transition-colors cursor-pointer text-left border-t border-slate-100"
                          >
                            <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                            <div>
                              <div className="font-bold text-xs text-[#1A2340]">Chương trình Affiliate</div>
                              <div className="text-[11px] text-slate-500 font-normal">Hoa hồng 3 Tier đối tác</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id === 'store') {
                      openStoreCatalog();
                    } else {
                      setActiveTab(link.id as any);
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`transition-colors relative py-1 cursor-pointer whitespace-nowrap ${isActive
                    ? 'text-[#1A2340] font-black'
                    : 'text-[#1A2340]/80 hover:text-[#1A2340]'
                    }`}
                >
                  {language === 'vi' ? link.labelVi : link.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A2340] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        ) : (
          /* Scrolled Embedded Search Input State - Image 2 */
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden sm:flex items-center bg-white border border-[#E2E8F0] rounded-full p-1 shadow-sm hover:shadow-md transition-all">
            <Search className="w-4 h-4 text-[#1A2340]/60 ml-3 mr-2 shrink-0" />
            <input
              type="text"
              placeholder={language === 'vi' ? 'Bạn cần eSIM ở đâu?' : 'Where do you need an eSIMs?'}
              onClick={() => setActiveTab('store')}
              readOnly
              className="w-full bg-transparent border-none text-xs sm:text-sm text-[#1A2340] placeholder-[#1A2340]/60 font-medium focus:outline-none cursor-pointer py-1"
            />
            <button
              onClick={() => setActiveTab('store')}
              className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-[#1A2340] text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#E2E8F0] shadow-xs cursor-pointer shrink-0 mr-1"
            >
              <span>{language === 'vi' ? 'Địa điểm' : 'Locations'}</span>
              <ChevronDown className="w-3 h-3 text-[#1A2340]/60" />
            </button>
          </div>
        )}

        {/* Zone 3: Actions (Language, Currency, Cart, Auth & Menu Toggle when scrolled) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {!isScrolled && (
            <>
              {/* Language Switch */}
              <div className="relative group hidden sm:block">
                <button
                  onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-50 text-xs font-semibold text-[#1A2340] transition-all cursor-pointer border border-[#E2E8F0] bg-white shadow-xs hover:shadow-md"
                  title="Đổi ngôn ngữ / Change Language"
                >
                  <Globe className="w-3.5 h-3.5 text-[#1A2340]" />
                  <span>{language === 'vi' ? 'VN' : 'EN'}</span>
                </button>
              </div>

              {/* Currency Switch */}
              <button
                onClick={() => setCurrency(currency === 'VND' ? 'USD' : 'VND')}
                className="hidden md:inline-flex items-center px-3 py-1.5 rounded-full hover:bg-slate-50 text-xs font-semibold text-[#1A2340] transition-all cursor-pointer border border-[#E2E8F0] bg-white shadow-xs hover:shadow-md"
                title="Đổi tiền tệ / Switch Currency"
              >
                {currency}
              </button>
            </>
          )}

          {/* Cart Icon & Flyout */}
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 rounded-full text-[#1A2340] hover:text-[#00D2B8] hover:bg-slate-50 transition-all cursor-pointer border border-[#E2E8F0] bg-white shadow-xs hover:shadow-md"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1A2340] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 text-[#1A2340]">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-sm text-[#1A2340]">
                    {language === 'vi' ? 'Giỏ hàng của bạn' : 'Your Shopping Bag'} ({totalCartCount})
                  </h4>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-slate-400 hover:text-[#1A2340] p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    {language === 'vi' ? 'Giỏ hàng trống. Hãy chọn điểm đến!' : 'Cart is empty. Choose a destination!'}
                  </div>
                ) : (
                  <div className="py-2 space-y-3 max-h-64 overflow-y-auto">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between text-xs py-2 border-b border-slate-100 last:border-0">
                        <div>
                          <div className="font-semibold text-[#1A2340] flex items-center gap-1.5">
                            <img
                              src={`https://flagsapi.com/${item.destination.flagCode || item.destination.code || 'BE'}/flat/64.png`}
                              alt={item.destination.nameVi}
                              className="w-5 h-3.5 object-contain rounded-xs shrink-0"
                            />
                            <span>{language === 'vi' ? item.destination.nameVi : item.destination.nameEn}</span>
                          </div>
                          <div className="text-slate-500 mt-0.5">{item.plan.name}</div>
                          <div className="text-[#00D2B8] font-bold mt-1">
                            {currency === 'VND'
                              ? new Intl.NumberFormat('vi-VN').format(item.plan.priceVnd * item.quantity) + ' đ'
                              : '$' + (item.plan.priceUsd * item.quantity).toFixed(2)}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            openCheckout(item.destination, item.plan);
                            setIsCartOpen(false);
                          }}
                          className="bg-[#1A2340] hover:bg-[#243056] text-white px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          {language === 'vi' ? 'Mua' : 'Checkout'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Account / Auth Section */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-[#E2E8F0] hover:border-slate-300 bg-white transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                <div className="w-6 h-6 rounded-full bg-[#1A2340] text-white flex items-center justify-center font-bold text-xs">
                  {user.fullName.charAt(0)}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#1A2340] leading-tight truncate max-w-[100px]">
                    {user.fullName}
                  </span>
                  <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-0.5">
                    🪙 {user.coins} Coins
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#1A2340]/60" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 z-50 text-[#1A2340]">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-black text-[#1A2340]">{user.fullName}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{user.email}</p>
                    <div className="mt-2.5 bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-semibold">Số dư W2G Coin:</span>
                      <span className="font-extrabold text-[#00D2B8]">🪙 {user.coins} Coin</span>
                    </div>
                  </div>

                  <div className="py-1 text-xs">
                    <button
                      onClick={() => {
                        navigateToEarn('coin');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-[#1A2340] font-medium flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Coins className="w-4 h-4 text-amber-500" />
                      <span>{language === 'vi' ? 'Ví Coin & Giới thiệu bạn bè' : 'Coin Wallet & Referrals'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('helps');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-[#1A2340] font-medium flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>{language === 'vi' ? 'Trung tâm hỗ trợ' : 'Help & Support'}</span>
                    </button>
                  </div>

                  <div className="pt-1.5 border-t border-slate-100">
                    <button
                      onClick={() => {
                        logoutUser();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      {language === 'vi' ? 'Đăng xuất' : 'Sign Out'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-3.5 sm:px-4.5 py-1.5 text-xs font-bold text-[#1A2340] hover:bg-slate-50 rounded-full transition-all cursor-pointer border border-[#E2E8F0] bg-white shadow-md hover:shadow-lg whitespace-nowrap"
              >
                {language === 'vi' ? 'Đăng nhập' : 'Log in'}
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setAuthModalOpen(true);
                }}
                className="px-3.5 sm:px-4.5 py-1.5 text-xs font-bold text-white bg-[#FF7A5C] hover:bg-[#e6694c] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                {language === 'vi' ? 'Đăng ký' : 'Sign up'}
              </button>
            </div>
          )}

          {/* Menu button & dropdown */}
          <div className="relative flex items-center gap-1.5">
            {isScrolled && <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="px-3 py-1.5 rounded-full text-[#1A2340] hover:bg-slate-50 cursor-pointer flex items-center gap-1.5 border border-[#E2E8F0] bg-white shadow-xs transition-all font-bold text-xs"
              aria-label="Toggle Navigation Menu"
            >
              <span className="font-bold text-[#1A2340]">Menu</span>
              {isMobileMenuOpen ? <X className="w-4 h-4 text-[#1A2340]" /> : <Menu className="w-4 h-4 text-[#1A2340]" />}
            </button>

            {/* Compact Floating Dropdown Navigation Menu (Anchored directly under Menu button) */}
            {isMobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 z-50 text-left space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="space-y-3.5">
                  {navLinks.map((link) => {
                    const isActive = activeTab === link.id || (link.id === 'store' && activeTab === 'product-detail');

                    if (link.id === 'earn') {
                      return (
                        <div key={link.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => {
                                navigateToEarn('coin');
                                setIsMobileMenuOpen(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`block text-left font-bold text-sm sm:text-base transition-colors cursor-pointer ${isActive
                                ? 'text-[#1A2340] underline underline-offset-4 decoration-2'
                                : 'text-[#1A2340] hover:text-[#00D2B8]'
                                }`}
                            >
                              {language === 'vi' ? link.labelVi : link.labelEn}
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuEarnExpanded(!isMenuEarnExpanded);
                              }}
                              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-all cursor-pointer flex items-center justify-center"
                              title={isMenuEarnExpanded ? (language === 'vi' ? 'Thu gọn' : 'Collapse') : (language === 'vi' ? 'Mở rộng' : 'Expand')}
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMenuEarnExpanded ? 'rotate-180 text-[#1A2340]' : 'text-slate-500'}`} />
                            </button>
                          </div>

                          {isMenuEarnExpanded && (
                            <div className="pl-3 space-y-1.5 pt-1 border-l-2 border-[#1A2340] transition-all">
                              <button
                                onClick={() => {
                                  navigateToEarn('coin');
                                  setIsMobileMenuOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="block w-full text-left text-xs font-semibold text-slate-700 cursor-pointer hover:text-[#1A2340] py-0.5 transition-colors"
                              >
                                Way2Go Coin
                              </button>
                              <button
                                onClick={() => {
                                  navigateToEarn('affiliate');
                                  setIsMobileMenuOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="block w-full text-left text-xs font-semibold text-slate-700 cursor-pointer hover:text-[#1A2340] py-0.5 transition-colors"
                              >
                                Chương trình Affiliate
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <button
                        key={link.id}
                        onClick={() => {
                          if (link.id === 'store') {
                            openStoreCatalog();
                          } else {
                            setActiveTab(link.id as any);
                          }
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`block w-full text-left font-bold text-sm sm:text-base transition-colors cursor-pointer ${isActive
                          ? 'text-[#1A2340] underline underline-offset-4 decoration-2'
                          : 'text-[#1A2340] hover:text-[#00D2B8]'
                          }`}
                      >
                        {language === 'vi' ? link.labelVi : link.labelEn}
                      </button>
                    );
                  })}
                </div>

                {/* Bottom divider with currency & language icons */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-start gap-6">
                  <button
                    onClick={() => setCurrency(currency === 'VND' ? 'USD' : 'VND')}
                    className="p-1.5 text-slate-700 hover:text-[#1A2340] transition-colors cursor-pointer flex items-center gap-1.5 font-bold text-xs"
                    title="Đổi tiền tệ"
                  >
                    <span>💳</span>
                    <span>{currency}</span>
                  </button>

                  <button
                    onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
                    className="p-1.5 text-slate-700 hover:text-[#1A2340] transition-colors cursor-pointer flex items-center gap-1.5 font-bold text-xs"
                    title="Đổi ngôn ngữ"
                  >
                    <Globe className="w-4 h-4 text-slate-700" />
                    <span>{language.toUpperCase()}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
