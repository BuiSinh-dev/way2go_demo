import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { COUNTRY_DIAL_CODES } from '../data/destinations';
import PartnerModal from './PartnerModal';
import appStoreIcon from '../../assets/image/common/app_store.png';
import googlePlayIcon from '../../assets/image/common/google-play.png';
import downloadImageSvg from '../../assets/image/common/start_travel.svg';
import {
  Coins,
  Share2,
  Users,
  Gift,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  QrCode,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  Smartphone,
  Plane,
  Camera,
  Globe,
  Percent,
  X,
  Compass,
  Sparkles
} from 'lucide-react';

interface RewardItem {
  id: string;
  titleVi: string;
  titleEn: string;
  costCoins: number;
  category: 'voucher' | 'esim';
  tagVi: string;
  tagEn: string;
  descriptionVi: string;
  descriptionEn: string;
}

const REWARDS_CATALOG: RewardItem[] = [
  {
    id: 'rew-voucher-50k',
    titleVi: 'Voucher Giảm Giá 50.000đ',
    titleEn: '50,000 VND Discount Voucher',
    costCoins: 500,
    category: 'voucher',
    tagVi: 'Dễ đổi nhất',
    tagEn: 'Most Popular',
    descriptionVi: 'Áp dụng giảm trực tiếp 50.000đ cho bất kỳ đơn hàng eSIM nào tại Way2Go.',
    descriptionEn: 'Instant 50,000 VND off on any eSIM plan order.'
  },
  {
    id: 'rew-voucher-100k',
    titleVi: 'Voucher Giảm Giá 100.000đ',
    titleEn: '100,000 VND Discount Voucher',
    costCoins: 1000,
    category: 'voucher',
    tagVi: 'Tiết kiệm cao',
    tagEn: 'Great Value',
    descriptionVi: 'Áp dụng giảm 100.000đ cho đơn hàng từ 200.000đ trở lên.',
    descriptionEn: 'Instant 100,000 VND off for orders from 200,000 VND.'
  },
  {
    id: 'rew-esim-thai-3d',
    titleVi: 'eSIM Thái Lan 1GB/ngày (3 Ngày)',
    titleEn: 'Thailand eSIM 1GB/Day (3 Days)',
    costCoins: 1200,
    category: 'esim',
    tagVi: 'Miễn phí 100%',
    tagEn: '100% Free Plan',
    descriptionVi: 'Nhận mã QR eSIM du lịch Thái Lan mạng AIS/TrueMove 5G tốc độ cao miễn phí.',
    descriptionEn: 'Free Thailand AIS/TrueMove 5G high-speed travel eSIM.'
  },
  {
    id: 'rew-esim-japan-3d',
    titleVi: 'eSIM Nhật Bản 1GB/ngày (3 Ngày)',
    titleEn: 'Japan eSIM 1GB/Day (3 Days)',
    costCoins: 1500,
    category: 'esim',
    tagVi: 'Hot Trend',
    tagEn: 'Hot Trend',
    descriptionVi: 'Nhận mã QR eSIM SoftBank/Docomo 5G Nhật Bản không giới hạn dung lượng hạ băng thông.',
    descriptionEn: 'Free Japan SoftBank/Docomo 5G travel eSIM code.'
  },
  {
    id: 'rew-esim-korea-3d',
    titleVi: 'eSIM Hàn Quốc 2GB/ngày (3 Ngày)',
    titleEn: 'South Korea eSIM 2GB/Day (3 Days)',
    costCoins: 1600,
    category: 'esim',
    tagVi: 'Bán chạy',
    tagEn: 'Best Seller',
    descriptionVi: 'Mạng SK Telecom 5G cực mạnh tại Seoul, Busan, đảo Jeju.',
    descriptionEn: 'Free SK Telecom 5G fast roaming in Seoul, Busan, Jeju.'
  },
  {
    id: 'rew-esim-europe-5gb',
    titleVi: 'eSIM 33 Nước Châu Âu 5GB (30 Ngày)',
    titleEn: 'Europe 33 Countries 5GB (30 Days)',
    costCoins: 2500,
    category: 'esim',
    tagVi: 'Gói Cao Cấp',
    tagEn: 'Premium Plan',
    descriptionVi: 'Sử dụng liên thông 33 quốc gia châu Âu: Pháp, Ý, Đức, Thụy Sĩ, Tây Ban Nha...',
    descriptionEn: 'Seamless connectivity across 33 European countries for 30 days.'
  }
];

export const EarnWithWay2go: React.FC = () => {
  const {
    language,
    earnSubTab,
    setEarnSubTab,
    user,
    setAuthModalOpen,
    setAuthModalMode,
    deductCoins,
    addCoins
  } = useApp();

  // State for code copy & notifications
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  // Reward redemption state
  const [redeemedReward, setRedeemedReward] = useState<RewardItem | null>(null);
  const [redeemError, setRedeemError] = useState<string | null>(null);

  // Affiliate Income Calculator State
  const [calcOrderCount, setCalcOrderCount] = useState<number>(80);
  const avgOrderVnd = 320000; // ~ $13 USD average order value

  // Commission calculation based on the 3 Tiers
  const tierInfo = useMemo(() => {
    if (calcOrderCount < 50) {
      return {
        tierNameVi: 'Tier 1 · Bronze Starter',
        tierNameEn: 'Tier 1 · Bronze Starter',
        percent: 10,
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      };
    } else if (calcOrderCount <= 200) {
      return {
        tierNameVi: 'Tier 2 · Silver Pro (Phổ biến nhất)',
        tierNameEn: 'Tier 2 · Silver Pro (Most Popular)',
        percent: 15,
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      };
    } else {
      return {
        tierNameVi: 'Tier 3 · Gold Elite',
        tierNameEn: 'Tier 3 · Gold Elite',
        percent: 20,
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      };
    }
  }, [calcOrderCount]);

  const estimatedMonthlyVnd = Math.round(calcOrderCount * avgOrderVnd * (tierInfo.percent / 100));
  const estimatedMonthlyUsd = Math.round(estimatedMonthlyVnd / 25000);
  const estimatedYearlyVnd = estimatedMonthlyVnd * 12;

  // Affiliate Form state
  const [affiliateSubmitted, setAffiliateSubmitted] = useState(false);
  const [affForm, setAffForm] = useState({
    name: user ? user.fullName : '',
    email: user ? user.email : '',
    phoneDialCode: '+84',
    phone: user ? user.phone : '',
    channelType: 'TikTok / YouTube Travel Vlogger',
    channelUrl: '',
    followerCount: '10,000 - 50,000 followers',
    expectedMonthlyOrders: '50 - 150 đơn/tháng',
    payoutMethod: 'Ngân hàng nội địa Việt Nam (Vietcombank, MB, Techcombank...)',
    notes: ''
  });

  // User referral details
  const referralCode = user ? `W2G-${user.username.toUpperCase()}` : 'W2G-TRAVEL2026';
  const referralLink = `https://way2go.vn/ref/${referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRedeem = (item: RewardItem) => {
    if (!user) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return;
    }

    if (user.coins < item.costCoins) {
      setRedeemError(
        language === 'vi'
          ? `Bạn cần thêm ${item.costCoins - user.coins} Way2Go Coins để đổi phần quà này. Hãy chia sẻ mã giới thiệu để nhận thêm Coin!`
          : `You need ${item.costCoins - user.coins} more Coins to redeem this item. Share your referral code to earn more!`
      );
      setTimeout(() => setRedeemError(null), 4000);
      return;
    }

    // Deduct coins
    const success = deductCoins(item.costCoins);
    if (success) {
      setRedeemedReward(item);
    }
  };

  const handleAffiliateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAffiliateSubmitted(true);
  };
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const earnFaqs = [
    {
      qVi: '1 Way2Go Coin có giá trị bao nhiêu và có hạn sử dụng không?',
      qEn: 'What is the value of 1 Way2Go Coin and do coins expire?',
      aVi: '1 Way2Go Coin tương đương 100 VNĐ. Điểm thưởng Way2Go Coin tích lũy không có ngày hết hạn và có thể được sử dụng để trừ tiền trực tiếp trên bất kỳ đơn hàng nào hoặc đổi lấy gói eSIM miễn phí 100%.',
      aEn: '1 Way2Go Coin equals 100 VND. W2G Coins never expire and can be redeemed for direct checkout discounts or 100% free travel eSIM packages.'
    },
    {
      qVi: 'Tôi có thể chia sẻ mã giới thiệu cho bao nhiêu người?',
      qEn: 'How many friends can I invite with my referral code?',
      aVi: 'Hoàn toàn không giới hạn! Bạn có thể chia sẻ mã cho bạn bè, người thân, đồng nghiệp hoặc đăng trên các hội nhóm du lịch. Mỗi khi một người bạn mua hàng thành công lần đầu, bạn nhận ngay 500 Coins và bạn của bạn được giảm ngay 10%.',
      aEn: 'No limit at all! Share your code with unlimited friends. Every time a new friend completes their first order, you receive 500 Coins and they save 10% instantly.'
    },
    {
      qVi: 'Chương trình Affiliate khác gì so với Way2Go Coin?',
      qEn: 'How does the Affiliate Program differ from Way2Go Coin?',
      aVi: 'Way2Go Coin là chương trình tích điểm thưởng cho người dùng cá nhân (nhận coin đổi data/giảm giá). Chương trình Affiliate dành cho nhà sáng tạo nội dung, blogger, công ty du lịch muốn kiếm thu nhập tiền mặt định kỳ (hoa hồng từ 10% đến 20%) và rút về tài khoản ngân hàng thực tế.',
      aEn: 'Way2Go Coin is a loyalty rewards program for individual travelers. The Affiliate Program is for creators, bloggers, and agencies seeking cash income (10% to 20% commission) deposited directly into their bank accounts.'
    },
    {
      qVi: 'Thời gian đối soát và thanh toán hoa hồng Affiliate như thế nào?',
      qEn: 'What is the affiliate payout schedule and payment methods?',
      aVi: 'Hệ thống đối soát tự động mỗi 2 tuần (vào ngày 15 và ngày cuối tháng) hoặc theo tuần đối với đối tác Tier 3. Hoa hồng được chuyển thẳng về tài khoản ngân hàng nội địa Việt Nam, Ví MoMo hoặc tài khoản PayPal với ngưỡng rút tối thiểu chỉ từ 500.000 VNĐ ($20 USD).',
      aEn: 'Payouts are processed bi-weekly (15th and end of month) or weekly for Tier 3 partners. Payments are transferred via Vietnamese local bank transfer, MoMo, or PayPal with a low threshold of 500,000 VND ($20 USD).'
    },
    {
      qVi: 'Cookie của link Affiliate được lưu trong bao lâu?',
      qEn: 'How long is the affiliate tracking cookie duration?',
      aVi: 'Thời gian lưu cookie là 30 ngày. Nếu khách hàng nhấp vào liên kết của bạn và hoàn tất mua hàng trong vòng 30 ngày tiếp theo (kể cả họ đóng trình duyệt rồi quay lại), hoa hồng vẫn được ghi nhận tự động vào tài khoản của bạn.',
      aEn: 'Our tracking cookie lasts for 30 days. If a user clicks your link and purchases anytime within 30 days, your commission is credited automatically.'
    }
  ];

  return (
    <div className="py-6 sm:py-10 bg-slate-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[32px] p-6 sm:p-8 md:p-10 border border-[#E2E8F0] shadow-xl md:shadow-2xl space-y-10 my-4 sm:my-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A2340] tracking-tight">
            Earn with <span className="text-[#00D2B8]">Way2Go</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {language === 'vi'
              ? 'Tích lũy Way2Go Coin để đổi gói eSIM miễn phí, giảm giá đơn hàng hoặc trở thành Đối tác Affiliate nhận hoa hồng lên tới 20% mỗi lượt giới thiệu.'
              : 'Accumulate Way2Go Coins for 100% free travel eSIMs, or partner with us as an Affiliate to earn up to 20% lifetime recurring commissions.'}
          </p>

          {/* Sub Navigation Switcher */}
          {/* <div className="inline-flex p-1.5 bg-white border border-[#E2E8F0] rounded-2xl shadow-inner gap-1.5 mt-2">
            <button
              onClick={() => setEarnSubTab('coin')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${earnSubTab === 'coin'
                ? 'bg-[#1A2340] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#1A2340]'
                }`}
            >
              <Coins className={`w-4 h-4 ${earnSubTab === 'coin' ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
              <span>{language === 'vi' ? 'Way2Go Coin (Loyalty & Giới thiệu)' : 'Way2Go Coin (Loyalty & Referral)'}</span>
            </button>

            <button
              onClick={() => setEarnSubTab('affiliate')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${earnSubTab === 'affiliate'
                ? 'bg-[#1A2340] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#1A2340]'
                }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{language === 'vi' ? 'Chương trình Affiliate (Hoa hồng 3 Tier)' : 'Affiliate Program (3-Tier)'}</span>
            </button>
          </div> */}
        </div>

        {/* ========================================================================= */}
        {/* SUBTAB 1: WAY2GO COIN (LOYALTY & REFERRAL)                               */}
        {/* ========================================================================= */}
        {earnSubTab === 'coin' && (
          <div className="space-y-12">

            {/* User Wallet Card */}
            <div className="bg-gradient-to-br from-amber-500/15 via-amber-400/5 to-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* Balance Info */}
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center font-black text-3xl shadow-md border-2 border-white">
                    🪙
                  </div>
                  <div className="text-left space-y-1">
                    <div className="text-xs font-extrabold text-amber-900 tracking-wider uppercase flex items-center gap-2">
                      <span>{language === 'vi' ? 'VÍ ĐIỂM THƯỞNG CỦA BẠN' : 'YOUR REWARDS WALLET'}</span>
                      {user && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {user.username}
                        </span>
                      )}
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {user ? `${new Intl.NumberFormat('vi-VN').format(user.coins)} Coins` : '0 Coins'}
                    </div>
                    <div className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span className="font-semibold text-amber-700">1 Coin = 100 VNĐ</span>
                      <span>•</span>
                      <span>
                        {user
                          ? `Tương đương giảm ${new Intl.NumberFormat('vi-VN').format(user.coins * 100)} đ khi thanh toán đơn hàng`
                          : language === 'vi'
                            ? 'Đăng ký ngay nhận 500 Coins chào mừng (~50.000đ)'
                            : 'Sign up to claim 500 welcome Coins (~$2.00 USD)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex flex-wrap items-center gap-3">
                  {!user ? (
                    <button
                      onClick={() => {
                        setAuthModalMode('register');
                        setAuthModalOpen(true);
                      }}
                      className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{language === 'vi' ? 'Đăng ký nhận ngay 500 Coins' : 'Sign up & Get 500 Coins'}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const element = document.getElementById('rewards-catalog');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Gift className="w-4 h-4" />
                        <span>{language === 'vi' ? 'Đổi Quà Ngay' : 'Redeem Rewards'}</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* How Way2Go Coin Works (3 Simple Steps) */}
            <div className="text-left space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-600" />
                <h2 className="text-xl font-extrabold text-slate-900">
                  {language === 'vi' ? 'Cơ chế hoạt động của Way2Go Coin' : 'How Way2Go Coin Works'}
                </h2>
              </div>
              <p className="text-xs text-slate-600">
                {language === 'vi'
                  ? 'Quy trình tích điểm và nhận thưởng hoàn toàn tự động chỉ với 3 bước:'
                  : 'Automated 3-step rewards and referral mechanism:'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Step 1 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 relative hover:border-amber-400 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-lg flex items-center justify-center">
                    01
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    {language === 'vi' ? 'Chia sẻ mã giới thiệu' : 'Share Your Referral Code'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'vi'
                      ? 'Gửi mã giới thiệu hoặc link riêng của bạn cho bạn bè, người thân đang chuẩn bị đi du lịch quốc tế.'
                      : 'Send your personalized code or referral link to friends planning an upcoming trip.'}
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 relative hover:border-amber-400 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-lg flex items-center justify-center">
                    02
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    {language === 'vi' ? 'Bạn bè được GIẢM 10%' : 'Friend Gets 10% OFF'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'vi'
                      ? 'Người được bạn giới thiệu sẽ được chiết khấu ngay 10% trên tổng giá trị đơn hàng eSIM đầu tiên.'
                      : 'Your friends instantly save 10% discount on their first eSIM package order at checkout.'}
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 relative hover:border-amber-400 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-lg flex items-center justify-center">
                    03
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    {language === 'vi' ? 'Nhận ngay 500 Coins' : 'Earn 500 Coins Instantly'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'vi'
                      ? 'Ngay sau khi đơn hàng thành công, ví của bạn được cộng 500 Coins (~50.000đ). Dùng trừ tiền hoặc đổi eSIM miễn phí!'
                      : 'As soon as their purchase succeeds, you receive 500 Coins in your wallet for cash off or free data.'}
                  </p>
                </div>

              </div>
            </div>

            {/* Referral Toolbox Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-left space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-extrabold text-lg text-slate-900">
                      {language === 'vi' ? 'Hộp công cụ chia sẻ của bạn' : 'Your Referral Toolbox'}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600">
                    {language === 'vi'
                      ? 'Chia sẻ mã hoặc link này lên Facebook, Zalo, nhóm phượt để nhận Coin không giới hạn:'
                      : 'Share your code or link anywhere to earn unlimited rewards:'}
                  </p>
                </div>

                <button
                  onClick={() => setShowQrModal(true)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <QrCode className="w-4 h-4 text-slate-600" />
                  <span>{language === 'vi' ? 'Tạo mã QR giới thiệu' : 'View QR Code'}</span>
                </button>
              </div>

              {/* Code & Link Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Referral Code Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {language === 'vi' ? 'Mã Giới Thiệu Cá Nhân' : 'Personal Referral Code'}
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-mono text-base font-extrabold text-slate-900 tracking-wider">
                      {referralCode}
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? (language === 'vi' ? 'Đã sao chép' : 'Copied') : (language === 'vi' ? 'Chép mã' : 'Copy')}</span>
                    </button>
                  </div>
                </div>

                {/* Referral Link Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {language === 'vi' ? 'Đường Dẫn Giới Thiệu (Tự Động Áp Mã)' : 'Referral Link (Auto-Applies Discount)'}
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-slate-700 truncate max-w-[220px] font-mono">
                      {referralLink}
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? (language === 'vi' ? 'Đã sao chép' : 'Copied') : (language === 'vi' ? 'Chép link' : 'Copy')}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* My Referral Stats & Activity History */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-left space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    {language === 'vi' ? 'Thống kê giới thiệu của bạn' : 'Your Referral Activity'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {language === 'vi' ? 'Cập nhật trực tiếp theo thời gian thực' : 'Real-time performance analytics'}
                  </p>
                </div>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ● Đang kích hoạt
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">
                    {language === 'vi' ? 'Bạn bè đã mời' : 'Friends Invited'}
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {user ? '8' : '0'}
                  </div>
                  <div className="text-[10px] text-slate-500">Người nhập mã</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">
                    {language === 'vi' ? 'Đơn thành công' : 'Completed Orders'}
                  </div>
                  <div className="text-2xl font-black text-emerald-600">
                    {user ? '6' : '0'}
                  </div>
                  <div className="text-[10px] text-slate-500">Tỷ lệ 75%</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">
                    {language === 'vi' ? 'Coins đã tích' : 'Total Coins'}
                  </div>
                  <div className="text-2xl font-black text-amber-500">
                    {user ? `${user.coins + 1000}` : '0'}
                  </div>
                  <div className="text-[10px] text-slate-500">~ 350.000đ</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">
                    {language === 'vi' ? 'Coins khả dụng' : 'Available Coins'}
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {user ? `${user.coins}` : '0'}
                  </div>
                  <div className="text-[10px] text-slate-500">Sẵn sàng đổi quà</div>
                </div>
              </div>

              {/* Activity Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-2.5 font-bold">Thời gian</th>
                      <th className="py-2.5 font-bold">Hoạt động</th>
                      <th className="py-2.5 font-bold">Trạng thái</th>
                      <th className="py-2.5 font-bold text-right">Biến động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 text-slate-500">28/09/2026</td>
                      <td className="py-3 font-semibold">Bạn bè (linh***@gmail.com) mua gói eSIM Nhật Bản</td>
                      <td className="py-3"><span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Thành công</span></td>
                      <td className="py-3 font-bold text-emerald-600 text-right">+500 Coins</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-slate-500">24/09/2026</td>
                      <td className="py-3 font-semibold">Bạn bè (tuan***@yahoo.com) mua gói eSIM Thái Lan</td>
                      <td className="py-3"><span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Thành công</span></td>
                      <td className="py-3 font-bold text-emerald-600 text-right">+500 Coins</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-slate-500">19/09/2026</td>
                      <td className="py-3 font-semibold">Thưởng chào mừng tạo tài khoản thành viên mới</td>
                      <td className="py-3"><span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Hoàn tất</span></td>
                      <td className="py-3 font-bold text-emerald-600 text-right">+500 Coins</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Catalog Đổi Thưởng Điểm Way2Go Coin (Coin Rewards Redemption Store) */}
            <div id="rewards-catalog" className="text-left space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    {language === 'vi' ? 'CỬA HÀNG ĐỔI THƯỞNG COIN' : 'COIN REWARDS CATALOG'}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    {language === 'vi' ? 'Đổi Quà Tặng & Gói Data Miễn Phí' : 'Redeem Free eSIMs & Vouchers'}
                  </h2>
                </div>
                <p className="text-xs text-slate-600 max-w-md">
                  {language === 'vi'
                    ? 'Sử dụng điểm Way2Go Coin đã tích lũy để đổi voucher giảm giá hoặc nhận gói eSIM quốc tế miễn phí 100%:'
                    : 'Use your accumulated Way2Go Coins for instant discount vouchers or free travel eSIMs:'}
                </p>
              </div>

              {redeemError && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center gap-3">
                  <Coins className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>{redeemError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {REWARDS_CATALOG.map((item) => {
                  const hasEnough = user && user.coins >= item.costCoins;
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
                    >
                      <span className="absolute top-5 right-5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {language === 'vi' ? item.tagVi : item.tagEn}
                      </span>

                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                          {item.category === 'voucher' ? <Percent className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                        </div>

                        <div>
                          <h4 className="font-extrabold text-base text-slate-900 leading-snug">
                            {language === 'vi' ? item.titleVi : item.titleEn}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {language === 'vi' ? item.descriptionVi : item.descriptionEn}
                          </p>
                        </div>
                      </div>

                      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-black text-amber-600 text-lg">
                          <span>🪙</span>
                          <span>{item.costCoins}</span>
                          <span className="text-xs font-normal text-slate-500">Coins</span>
                        </div>

                        <button
                          onClick={() => handleRedeem(item)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${hasEnough
                            ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                          {hasEnough
                            ? (language === 'vi' ? 'Đổi quà ngay' : 'Redeem Now')
                            : (language === 'vi' ? 'Đổi quà' : 'Redeem')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card Download App ngay dưới Card Đổi Quà Tặng & Gói Data Miễn Phí */}
              <div className="bg-gradient-to-br from-[#1A2340] via-[#1E294B] to-[#0F172A] rounded-3xl pr-2.5 border border-slate-700/60 shadow-xl text-white relative overflow-hidden mt-8">
                {/* Background decorative glow */}
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#00D2B8]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-10 -top-10 w-64 h-64 bg-[#ff7a5c]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                  {/* Left Column: App Illustration */}
                  <div className="lg:col-span-4 flex justify-center">
                    <img
                      src={downloadImageSvg}
                      alt="Way2Go App Download"
                      className="w-full max-w-[300px] h-auto object-contain filter drop-shadow-md"
                    />
                  </div>

                  {/* Right Column: Information & Download Links */}
                  <div className="lg:col-span-8 text-left space-y-4">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                      {language === 'vi'
                        ? 'Tải App Way2Go — Quản lý eSIM & Đổi quà miễn phí mọi lúc mọi nơi'
                        : 'Download Way2Go App — Easily manage eSIM & redeem rewards anywhere'}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                      {language === 'vi'
                        ? 'Tải ngay ứng dụng Way2Go trên iOS và Android để kiểm tra dung lượng data thực tế, kích hoạt eSIM 1-click và nhận ngay 100 Way2Go Coins miễn phí khi đăng nhập lần đầu!'
                        : 'Get the Way2Go app on iOS & Android to monitor data usage, activate eSIMs in 1-click, and get 100 bonus Way2Go Coins on first login!'}
                    </p>

                    {/* Download Buttons Row */}
                    <div className="flex flex-wrap items-center gap-3.5 pt-2">
                      <a
                        href="https://apps.apple.com/vn/app/way2go-travel-esim/id6744437994"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-white hover:bg-slate-100 text-[#1A2340] font-extrabold text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer border border-white"
                      >
                        <img src={appStoreIcon} alt="App Store" className="w-5 h-5 object-contain shrink-0" />
                        <span>{language === 'vi' ? 'Tải ứng dụng iOS' : 'App Store (iOS)'}</span>
                      </a>

                      <a
                        href="https://play.google.com/store/apps/details?id=com.consortio.way2go&hl=vi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-[#1E294B] hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer border border-slate-600"
                      >
                        <img src={googlePlayIcon} alt="Google Play" className="w-5 h-5 object-contain shrink-0" />
                        <span>{language === 'vi' ? 'Tải ứng dụng Android' : 'Google Play (Android)'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 2: AFFILIATE PROGRAM (3-TIER COMMISSION AS NOTED)                 */}
        {/* ========================================================================= */}
        {earnSubTab === 'affiliate' && (
          <div className="space-y-14">

            {/* 3 USPs as requested in OCR / Holafly style notes */}
            <div className="text-left space-y-5">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 m-0">
                {language === 'vi'
                  ? 'Tại sao hơn 1.200 Creator & Đối tác chọn Way2Go?'
                  : 'Why 1,200+ Creators & Partners Choose Way2Go?'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                {language === 'vi'
                  ? 'Chương trình Affiliate được thiết kế tối ưu chuyển đổi, minh bạch tuyệt đối và cam kết thanh toán đúng hạn.'
                  : 'Engineered for high conversion, zero tracking loss, and guaranteed bi-weekly payouts.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">

                {/* USP 1 */}
                <div className="bg-white p-7 rounded-3xl border border-slate-200 text-left space-y-3 hover:border-emerald-500 transition-colors shadow-xs">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    {language === 'vi' ? 'Hoa hồng lên tới 20% mỗi đơn' : 'Up to 20% Lifetime Commission'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'vi'
                      ? 'Mức chiết khấu cao hàng đầu thị trường viễn thông du lịch số. Tỷ lệ hoa hồng lũy tiến lên đến 20% cho mỗi gói eSIM bán ra.'
                      : 'Industry-leading commission rates up to 20% per order with transparent tracking.'}
                  </p>
                </div>

                {/* USP 2 */}
                <div className="bg-white p-7 rounded-3xl border border-slate-200 text-left space-y-3 hover:border-emerald-500 transition-colors shadow-xs">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    {language === 'vi' ? 'Cookie lưu trữ 30 ngày' : '30-Day Extended Cookie'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'vi'
                      ? 'Bất kỳ khi nào người dùng nhấp vào link và hoàn tất mua hàng trong vòng 30 ngày, hoa hồng vẫn được ghi nhận tự động cho bạn.'
                      : 'Visitors who click your link and purchase within 30 days are automatically attributed to you.'}
                  </p>
                </div>

                {/* USP 3 */}
                <div className="bg-white p-7 rounded-3xl border border-slate-200 text-left space-y-3 hover:border-emerald-500 transition-colors shadow-xs">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    {language === 'vi' ? 'Rút tiền định kỳ 2 tuần/lần' : 'Bi-Weekly Guaranteed Payouts'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'vi'
                      ? 'Dashboard theo dõi số lượt click và doanh số theo thời gian thực. Rút tiền nhanh chóng về tài khoản ngân hàng Việt Nam, MoMo hoặc PayPal.'
                      : 'Real-time click & conversion dashboard with automatic payouts to VN Bank, MoMo, or PayPal.'}
                  </p>
                </div>

              </div>
            </div>

            {/* 3-Tier Commission Structure */}
            <div className="text-left space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {language === 'vi' ? 'Bảng 3 Hạng Hoa Hồng Đối Tác' : '3-Tier Affiliate Commission Structure'}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  {language === 'vi'
                    ? 'Mức hoa hồng tự động nâng hạng dựa trên tổng số lượng đơn hàng phát sinh trong tháng:'
                    : 'Commission tier automatically upgrades based on your monthly order volume:'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Tier 1 */}
                <div className="bg-white rounded-3xl p-7 border border-slate-200 space-y-5 relative shadow-xs">
                  <div className="text-xs font-black text-slate-500 uppercase tracking-wider">
                    TIER 1 · BRONZE STARTER
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-black text-slate-900">
                      10% <span className="text-sm font-normal text-slate-500">/ đơn hàng</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600">Dưới 50 đơn hàng / tháng</div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Link theo dõi affiliate cá nhân</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Cookie lưu trữ 30 ngày</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Kho banner & tài liệu truyền thông chuẩn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Thanh toán 2 lần mỗi tháng</span>
                    </div>
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="bg-white rounded-3xl p-7 border border-slate-200 space-y-5 relative shadow-xs">
                  <div className="text-xs font-black text-slate-500 uppercase tracking-wider">
                    TIER 2 · SILVER PRO
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-black text-slate-900">
                      15% <span className="text-sm font-normal text-slate-500">/ đơn hàng</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600">Từ 50 - 200 đơn hàng / tháng</div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Tặng 01 eSIM trải nghiệm miễn phí mỗi tháng</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Mã coupon giảm giá độc quyền theo tên kênh</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Cookie lưu trữ 30 ngày</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Rút tiền ưu tiên 2 tuần/lần</span>
                    </div>
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="bg-white rounded-3xl p-7 border border-slate-200 space-y-5 relative shadow-xs">
                  <div className="text-xs font-black text-amber-700 uppercase tracking-wider">
                    TIER 3 · GOLD ELITE
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-black text-amber-600">
                      20% <span className="text-sm font-normal text-slate-500">/ đơn hàng</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600">Trên 200 đơn hàng / tháng</div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold">Dedicated Account Manager hỗ trợ riêng 1:1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold">Landing Page thiết kế riêng theo thương hiệu của bạn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Thanh toán linh hoạt theo từng tuần</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Vé mời tham gia sự kiện du lịch thường niên</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Income Calculator */}
            <div className="bg-white/90 rounded-3xl p-6 sm:p-10 border border-[#e2d5c7] text-slate-900 text-left space-y-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {language === 'vi' ? 'Bạn có thể kiếm được bao nhiêu?' : 'How Much Can You Earn?'}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {language === 'vi'
                      ? 'Kéo thanh trượt để tính thu nhập dự kiến dựa trên số đơn hàng eSIM phát sinh mỗi tháng:'
                      : 'Slide to estimate your projected monthly commission based on order volume:'}
                  </p>
                </div>

                <div className={`px-4 py-2 rounded-xl border text-xs font-black uppercase ${tierInfo.badgeColor}`}>
                  {language === 'vi' ? tierInfo.tierNameVi : tierInfo.tierNameEn}
                </div>
              </div>

              {/* Slider Control */}
              <div className="space-y-3 bg-[#1A2340] text-white p-6 rounded-2xl border border-[#31436e]">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-200 font-bold">
                    {language === 'vi' ? 'Số lượng eSIM bán được mỗi tháng:' : 'Monthly eSIM Orders:'}
                  </span>
                  <span className="text-2xl font-black text-[#00D2B8]">
                    {calcOrderCount} <span className="text-xs text-slate-300 font-normal">đơn / tháng</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={calcOrderCount}
                  onChange={(e) => setCalcOrderCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00D2B8]"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>10 đơn (Tier 1 - 10%)</span>
                  <span>50 đơn (Tier 2 - 15%)</span>
                  <span>200+ đơn (Tier 3 - 20%)</span>
                  <span>500 đơn</span>
                </div>
              </div>

              {/* Earnings Output Display */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="p-5 bg-[#1A2340] text-white rounded-2xl border border-[#31436e] space-y-1">
                  <div className="text-xs text-slate-300 uppercase font-bold">Tỷ lệ hoa hồng</div>
                  <div className="text-3xl font-black text-[#00D2B8]">{tierInfo.percent}%</div>
                  <div className="text-[11px] text-slate-400">Áp dụng cho mọi đơn hàng</div>
                </div>

                <div className="p-5 bg-[#1A2340] text-white rounded-2xl border border-[#31436e] space-y-1">
                  <div className="text-xs text-slate-300 uppercase font-bold">Hoa hồng mỗi tháng</div>
                  <div className="text-3xl font-black text-white">
                    {new Intl.NumberFormat('vi-VN').format(estimatedMonthlyVnd)} đ
                  </div>
                  <div className="text-[11px] text-[#00D2B8] font-bold">
                    ~ ${estimatedMonthlyUsd} USD / tháng
                  </div>
                </div>

                <div className="p-5 bg-[#1A2340] text-white rounded-2xl border border-[#31436e] space-y-1">
                  <div className="text-xs text-slate-300 uppercase font-bold">Thu nhập ước tính cả năm</div>
                  <div className="text-3xl font-black text-amber-400">
                    {new Intl.NumberFormat('vi-VN').format(estimatedYearlyVnd)} đ
                  </div>
                  <div className="text-[11px] text-slate-400">Thu nhập thụ động bền vững</div>
                </div>
              </div>
            </div>

            {/* Who should join? (6 Target Groups) */}
            <div className="text-left space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  {language === 'vi' ? 'Ai nên trở thành Đối tác Way2Go?' : 'Who Should Join Our Network?'}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Content Creators & Vloggers</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sáng tạo nội dung trên TikTok, YouTube, Reels về trải nghiệm du lịch, chia sẻ mẹo dùng sim quốc tế.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Travel Bloggers & Reviewers</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sở hữu website du lịch, cẩm nang phượt, bài viết hướng dẫn hành trình các nước trên thế giới.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Hướng dẫn viên & Tour Leader</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Trực tiếp dẫn tour đoàn đi nước ngoài, dễ dàng giới thiệu và hỗ trợ khách du lịch mua eSIM tại sân bay.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Admin Hội Nhóm & Cộng Đồng</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Quản trị viên group Facebook du lịch tự túc, hội du học sinh Nhật, Hàn, Châu Âu, Mỹ...
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <Plane className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Đại lý Lữ hành & Vé máy bay</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Doanh nghiệp du lịch tích hợp bán kèm eSIM cho khách hàng đặt combo vé máy bay, khách sạn.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Digital Nomads & Xê dịch</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Những người làm việc từ xa di chuyển khắp nơi, kết nối mạng lưới bạn bè quốc tế cùng sử dụng eSIM.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Steps to Partner */}
            <div className="text-left space-y-6">
              <h2 className="text-2xl font-black text-slate-900">
                {language === 'vi' ? 'Quy trình 4 bước bắt đầu kiếm thu nhập' : '4 Simple Steps to Start Earning'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs">1</div>
                  <h4 className="font-extrabold text-sm text-slate-900">Đăng ký online</h4>
                  <p className="text-xs text-slate-600">Điền form bên dưới với thông tin kênh truyền thông của bạn (mất 2 phút).</p>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs">2</div>
                  <h4 className="font-extrabold text-sm text-slate-900">Kích hoạt Portal</h4>
                  <p className="text-xs text-slate-600">Đội ngũ Way2Go duyệt tài khoản trong 24h và gửi link tracking riêng.</p>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs">3</div>
                  <h4 className="font-extrabold text-sm text-slate-900">Đặt link & mã ưu đãi</h4>
                  <p className="text-xs text-slate-600">Gắn liên kết vào bài viết, video bio hoặc gửi cho khách hàng, đoàn tour.</p>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#1A2340] text-white font-bold flex items-center justify-center text-xs">4</div>
                  <h4 className="font-extrabold text-sm text-slate-900">Nhận hoa hồng định kỳ</h4>
                  <p className="text-xs text-slate-600">Theo dõi doanh số trực tiếp và nhận tiền chuyển khoản tự động mỗi 2 tuần.</p>
                </div>
              </div>
            </div>

            {/* Affiliate Registration Banner Card */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 text-left shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <h3 className="text-2xl font-black text-[#1A2340]">
                  {language === 'vi' ? 'Gia nhập Mạng lưới Đối tác Way2Go' : 'Join Way2Go Affiliate Network'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'vi'
                    ? 'Hoàn thành mẫu đăng ký dưới đây. Đội ngũ Partnership của chúng tôi sẽ liên hệ phê duyệt và kích hoạt mã đối tác trong vòng 24 giờ làm việc.'
                    : 'Fill out the application form. Our partnership team will review and approve your partner portal within 24 business hours.'}
                </p>
              </div>

              <button
                onClick={() => setIsPartnerModalOpen(true)}
                className="px-8 py-3.5 rounded-full bg-[#FF7A2F] hover:bg-[#e0651c] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0 flex items-center gap-2"
              >
                <span>{language === 'vi' ? 'Gia nhập ngay' : 'Join Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}


        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 text-left space-y-6 shadow-xs">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900">
              {language === 'vi' ? 'Câu hỏi thường gặp về Earn with Way2Go' : 'Earn with Way2Go FAQs'}
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {earnFaqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    <span>{language === 'vi' ? faq.qVi : faq.qEn}</span>
                    <div className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                      {language === 'vi' ? faq.aVi : faq.aEn}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>

      {/* ========================================================================= */}
      {/* MODAL 1: QR CODE SHARING MODAL                                            */}
      {/* ========================================================================= */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                {language === 'vi' ? 'MÃ QR GIỚI THIỆU' : 'REFERRAL QR CODE'}
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Quét để giảm ngay 10%
              </h3>
            </div>

            {/* Generated Simulated QR Code */}
            <div className="p-5 bg-slate-50 rounded-2xl border-2 border-dashed border-emerald-400 inline-block mx-auto">
              <div className="w-44 h-44 bg-white p-3 rounded-xl shadow-inner flex flex-col items-center justify-center relative">
                {/* SVG QR Code Pattern */}
                <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                  {/* Top-left marker */}
                  <rect x="5" y="5" width="28" height="28" fill="currentColor" />
                  <rect x="9" y="9" width="20" height="20" fill="white" />
                  <rect x="13" y="13" width="12" height="12" fill="currentColor" />

                  {/* Top-right marker */}
                  <rect x="67" y="5" width="28" height="28" fill="currentColor" />
                  <rect x="71" y="9" width="20" height="20" fill="white" />
                  <rect x="75" y="13" width="12" height="12" fill="currentColor" />

                  {/* Bottom-left marker */}
                  <rect x="5" y="67" width="28" height="28" fill="currentColor" />
                  <rect x="9" y="71" width="20" height="20" fill="white" />
                  <rect x="13" y="75" width="12" height="12" fill="currentColor" />

                  {/* Random simulated data dots */}
                  <rect x="38" y="8" width="8" height="6" fill="currentColor" />
                  <rect x="50" y="10" width="12" height="6" fill="currentColor" />
                  <rect x="38" y="20" width="6" height="12" fill="currentColor" />
                  <rect x="52" y="24" width="8" height="8" fill="currentColor" />
                  <rect x="10" y="38" width="18" height="6" fill="currentColor" />
                  <rect x="34" y="38" width="10" height="10" fill="currentColor" />
                  <rect x="48" y="38" width="14" height="6" fill="currentColor" />
                  <rect x="70" y="38" width="18" height="10" fill="currentColor" />
                  <rect x="8" y="50" width="8" height="10" fill="currentColor" />
                  <rect x="22" y="52" width="6" height="8" fill="currentColor" />
                  <rect x="38" y="52" width="18" height="8" fill="currentColor" />
                  <rect x="62" y="52" width="12" height="8" fill="currentColor" />
                  <rect x="80" y="52" width="12" height="6" fill="currentColor" />
                  <rect x="38" y="68" width="8" height="10" fill="currentColor" />
                  <rect x="52" y="68" width="14" height="6" fill="currentColor" />
                  <rect x="72" y="68" width="20" height="8" fill="currentColor" />
                  <rect x="38" y="82" width="18" height="10" fill="currentColor" />
                  <rect x="62" y="82" width="8" height="8" fill="currentColor" />
                  <rect x="76" y="82" width="14" height="10" fill="currentColor" />
                </svg>

                {/* Center Logo Badge */}
                <div className="absolute inset-0 m-auto w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-[10px] shadow-md border-2 border-white">
                  W2G
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-mono font-bold text-sm text-slate-800">{referralCode}</div>
              <p className="text-[11px] text-slate-500">
                Bạn bè chỉ cần mở camera điện thoại quét mã là tự động chuyển đến trang mua hàng kèm mã giảm giá.
              </p>
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-800 transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Đã sao chép link' : 'Sao chép link kèm mã'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REWARD REDEEMED CELEBRATION MODAL                                */}
      {/* ========================================================================= */}
      {redeemedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setRedeemedReward(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
              🎁
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                {language === 'vi' ? 'ĐỔI QUÀ THÀNH CÔNG!' : 'REWARD REDEEMED!'}
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {language === 'vi' ? redeemedReward.titleVi : redeemedReward.titleEn}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'vi'
                  ? `Đã trừ ${redeemedReward.costCoins} Coins từ ví của bạn. Dưới đây là mã quà tặng độc quyền của bạn:`
                  : `Deducted ${redeemedReward.costCoins} Coins from your wallet. Here is your voucher code:`}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-2 border-dashed border-amber-300 rounded-2xl space-y-1">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">MÃ VOUCHER ĐỔI THƯỞNG</div>
              <div className="font-mono text-lg font-black text-slate-900 tracking-wider">
                W2G-GIFT-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold">Áp dụng trực tiếp tại bước thanh toán</div>
            </div>

            <button
              onClick={() => setRedeemedReward(null)}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              {language === 'vi' ? 'Đóng & Tiếp tục khám phá' : 'Close & Continue'}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: PARTNER REGISTRATION FORM MODAL                                  */}
      {/* ========================================================================= */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />

    </div>
  );
};
