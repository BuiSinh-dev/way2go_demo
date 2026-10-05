import React, { createContext, useContext, useState, useEffect } from 'react';
import { Destination, PlanVariant, CartItem, UserProfile, NewsArticle, Language, Currency } from '../types';
import { DESTINATIONS } from '../data/destinations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  activeTab: 'home' | 'store' | 'about' | 'news' | 'earn' | 'helps' | 'product-detail';
  setActiveTab: (tab: 'home' | 'store' | 'about' | 'news' | 'earn' | 'helps' | 'product-detail') => void;
  previousTab: 'home' | 'store' | 'about' | 'news' | 'earn' | 'helps';
  storeView: 'catalog' | 'detail';
  setStoreView: (view: 'catalog' | 'detail') => void;
  openStoreCatalog: () => void;
  earnSubTab: 'coin' | 'affiliate';
  setEarnSubTab: (sub: 'coin' | 'affiliate') => void;
  selectedDestination: Destination | null;
  setSelectedDestination: (dest: Destination | null) => void;
  cart: CartItem[];
  addToCart: (dest: Destination, plan: PlanVariant) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  user: UserProfile | null;
  loginUser: (emailOrUser: string, pass: string) => boolean;
  registerUser: (userData: Omit<UserProfile, 'coins'>) => void;
  logoutUser: () => void;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => boolean;
  // Modals
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  isCheckoutModalOpen: boolean;
  setCheckoutModalOpen: (open: boolean) => void;
  checkoutItem: { destination: Destination; plan: PlanVariant } | null;
  openCheckout: (dest: Destination, plan: PlanVariant) => void;
  isCompatibilityModalOpen: boolean;
  setCompatibilityModalOpen: (open: boolean) => void;
  selectedArticle: NewsArticle | null;
  setSelectedArticle: (article: NewsArticle | null) => void;
  formatPrice: (vnd: number, usd: number) => string;
  navigateToDestination: (destId: string) => void;
  navigateToEarn: (sub?: 'coin' | 'affiliate') => void;
  navigateToHelps: (section?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  fullName: 'Nguyễn Văn Minh',
  birthYear: '1995',
  gender: 'Nam',
  city: 'Hồ Chí Minh',
  phone: '0912345678',
  phoneDialCode: '+84',
  email: 'minh.nguyen@example.com',
  username: 'minhtraveler',
  coins: 500, // 50,000 VND welcome / loyalty balance
  savedEsims: [
    {
      orderId: 'W2G-98412',
      destinationName: 'Nhật Bản (SoftBank 5G)',
      planName: '2GB / Ngày - 7 Ngày',
      qrCode: 'LPA:1$smdp.way2go.io$CONF-882914-JP',
      activationCode: 'CONF-882914-JP',
      smdpAddress: 'smdp.way2go.io',
      purchasedDate: '2026-03-20'
    }
  ]
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');
  const [currency, setCurrency] = useState<Currency>('VND');
  const [activeTab, setActiveTab] = useState<'home' | 'store' | 'about' | 'news' | 'earn' | 'helps' | 'product-detail'>('home');
  const [previousTab, setPreviousTab] = useState<'home' | 'store' | 'about' | 'news' | 'earn' | 'helps'>('store');
  const [storeView, setStoreView] = useState<'catalog' | 'detail'>('catalog');
  const [earnSubTab, setEarnSubTab] = useState<'coin' | 'affiliate'>('coin');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(DESTINATIONS[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(DEMO_USER);

  // Modals
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [checkoutItem, setCheckoutItem] = useState<{ destination: Destination; plan: PlanVariant } | null>(null);
  const [isCompatibilityModalOpen, setCompatibilityModalOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const formatPrice = (vnd: number, usd: number): string => {
    if (currency === 'VND') {
      return new Intl.NumberFormat('vi-VN').format(vnd) + ' đ';
    } else {
      return '$' + usd.toFixed(2);
    }
  };

  const addToCart = (dest: Destination, plan: PlanVariant) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.destination.id === dest.id && item.plan.id === plan.id);
      if (existing) {
        return prev.map((item) =>
          item.destination.id === dest.id && item.plan.id === plan.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { destination: dest, plan, quantity: 1 }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const openCheckout = (dest: Destination, plan: PlanVariant) => {
    setCheckoutItem({ destination: dest, plan });
    setCheckoutModalOpen(true);
  };

  const loginUser = (emailOrUser: string, pass: string): boolean => {
    if (user && (user.email === emailOrUser || user.username === emailOrUser)) {
      return true;
    }
    setUser({
      fullName: emailOrUser.includes('@') ? emailOrUser.split('@')[0] : emailOrUser,
      birthYear: '1998',
      gender: 'Nam',
      city: 'Hà Nội',
      phone: '0988776655',
      phoneDialCode: '+84',
      email: emailOrUser.includes('@') ? emailOrUser : `${emailOrUser}@gmail.com`,
      username: emailOrUser.includes('@') ? emailOrUser.split('@')[0] : emailOrUser,
      coins: 350,
      savedEsims: []
    });
    return true;
  };

  const registerUser = (userData: Omit<UserProfile, 'coins'>) => {
    setUser({
      ...userData,
      coins: 500, // Welcome bonus 500 W2G Coins!
      savedEsims: []
    });
    setAuthModalOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const addCoins = (amount: number) => {
    if (!user) return;
    setUser((prev) => prev ? { ...prev, coins: prev.coins + amount } : null);
  };

  const deductCoins = (amount: number): boolean => {
    if (!user || user.coins < amount) return false;
    setUser((prev) => prev ? { ...prev, coins: prev.coins - amount } : null);
    return true;
  };

  const openStoreCatalog = () => {
    setActiveTab('store');
    setStoreView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDestination = (destId: string) => {
    const dest = DESTINATIONS.find((d) => d.id === destId);
    if (dest) {
      setSelectedDestination(dest);
    }
    if (activeTab !== 'product-detail') {
      setPreviousTab(activeTab as any);
    }
    setActiveTab('product-detail');
    setStoreView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToEarn = (sub: 'coin' | 'affiliate' = 'coin') => {
    setEarnSubTab(sub);
    setActiveTab('earn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHelps = (section?: string) => {
    setActiveTab('helps');
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        activeTab,
        setActiveTab,
        previousTab,
        storeView,
        setStoreView,
        openStoreCatalog,
        earnSubTab,
        setEarnSubTab,
        selectedDestination,
        setSelectedDestination,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        user,
        loginUser,
        registerUser,
        logoutUser,
        addCoins,
        deductCoins,
        isAuthModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isCheckoutModalOpen,
        setCheckoutModalOpen,
        checkoutItem,
        openCheckout,
        isCompatibilityModalOpen,
        setCompatibilityModalOpen,
        selectedArticle,
        setSelectedArticle,
        formatPrice,
        navigateToDestination,
        navigateToEarn,
        navigateToHelps
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
