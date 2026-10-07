import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COUNTRY_DIAL_CODES, RESIDENCE_COUNTRIES } from '../data/destinations';
import { X, Check, ArrowRight, Smartphone, CreditCard, Banknote, ChevronDown } from 'lucide-react';

const getFlagUrl = (flagCode?: string) => {
  if (!flagCode || flagCode === 'UN') return 'https://flagsapi.com/BE/flat/64.png';
  return `https://flagsapi.com/${flagCode}/flat/64.png`;
};

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setCheckoutModalOpen,
    checkoutItem,
    language,
    currency,
    formatPrice,
    user,
    setCompatibilityModalOpen,
    deductCoins,
    addCoins
  } = useApp();

  // Compatibility checkbox
  const [isDeviceCompatibleChecked, setIsDeviceCompatibleChecked] = useState(false);

  // Form info
  const [fullName, setFullName] = useState(user ? user.fullName : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [selectedDialCode, setSelectedDialCode] = useState('+84');
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phone : '');
  const [selectedCountry, setSelectedCountry] = useState('Việt Nam');

  // Custom Dropdowns open state
  const [isDialDropdownOpen, setIsDialDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Use Way2Go coin or code toggle
  const [isCoinOrCodeChecked, setIsCoinOrCodeChecked] = useState(false);
  const [coinsToUse, setCoinsToUse] = useState<number>(0);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountVnd: number; discountUsd: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'qr_bank'>('card');

  // Order submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  if (!isCheckoutModalOpen || !checkoutItem) return null;

  const { destination, plan } = checkoutItem;

  const selectedDialItem = COUNTRY_DIAL_CODES.find(c => c.code === selectedDialCode) || COUNTRY_DIAL_CODES[0];
  const selectedCountryItem = RESIDENCE_COUNTRIES.find(c => c.name === selectedCountry || selectedCountry.includes(c.name)) || RESIDENCE_COUNTRIES[0];

  // Coin math: 1 Coin = 100 VND (~$0.004 USD)
  const maxCoinsAvailable = user ? user.coins : 0;
  const coinDiscountVnd = coinsToUse * 100;
  const coinDiscountUsd = Math.round((coinsToUse * 100 / 25000) * 100) / 100;

  const basePriceVnd = plan.priceVnd;
  const basePriceUsd = plan.priceUsd;

  const promoDiscountVnd = appliedPromo ? appliedPromo.discountVnd : 0;
  const promoDiscountUsd = appliedPromo ? appliedPromo.discountUsd : 0;

  const finalPriceVnd = Math.max(0, basePriceVnd - coinDiscountVnd - promoDiscountVnd);
  const finalPriceUsd = Math.max(0, basePriceUsd - coinDiscountUsd - promoDiscountUsd);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'W2GSPRING' || code === 'FRIEND10') {
      const discVnd = Math.round(basePriceVnd * 0.1);
      const discUsd = Math.round(basePriceUsd * 0.1 * 100) / 100;
      setAppliedPromo({ code, discountVnd: discVnd, discountUsd: discUsd });
    } else if (code.startsWith('W2G-')) {
      const discVnd = Math.round(basePriceVnd * 0.1);
      const discUsd = Math.round(basePriceUsd * 0.1 * 100) / 100;
      setAppliedPromo({ code, discountVnd: discVnd, discountUsd: discUsd });
    } else {
      setPromoError('Mã ưu đãi không hợp lệ hoặc đã hết hạn.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDeviceCompatibleChecked) {
      alert('Vui lòng tích xác nhận thiết bị của bạn tương thích với eSIM trước khi tiếp tục.');
      return;
    }
    if (!email) {
      alert('Vui lòng nhập email nhận mã QR eSIM.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (coinsToUse > 0) {
        deductCoins(coinsToUse);
      }
      const earnedCoins = Math.round(finalPriceVnd / 2000);
      addCoins(earnedCoins);

      const generatedOrder = {
        orderId: `W2G-${Math.floor(100000 + Math.random() * 900000)}`,
        destinationName: `${destination.flag} ${language === 'vi' ? destination.nameVi : destination.nameEn}`,
        planName: plan.name,
        amountVnd: finalPriceVnd,
        amountUsd: finalPriceUsd,
        smdpAddress: 'smdp.way2go.io',
        activationCode: `CONF-${Math.random().toString(36).substring(2, 8).toUpperCase()}-W2G`,
        qrPayload: `LPA:1$smdp.way2go.io$CONF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        email,
        date: new Date().toLocaleDateString()
      };
      setOrderSuccess(generatedOrder);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleClose = () => {
    setCheckoutModalOpen(false);
    setOrderSuccess(null);
    setIsDialDropdownOpen(false);
    setIsCountryDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A2340]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#1A2340] rounded-3xl max-w-2xl w-full shadow-2xl border border-[#1A2340]/20 overflow-hidden my-8 text-left">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#1A2340]/15 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <img
              src={getFlagUrl(destination.flagCode || destination.code)}
              alt={destination.nameVi}
              className="w-7 h-5 object-contain rounded-xs shadow-xs shrink-0"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            <div>
              <h3 className="font-extrabold text-base text-[#1A2340]">
                {orderSuccess
                  ? (language === 'vi' ? 'Đặt hàng thành công & Nhận eSIM' : 'Order Confirmed - eSIM Ready')
                  : (language === 'vi' ? 'Thanh toán đơn hàng eSIM' : 'Complete eSIM Order')}
              </h3>
              <p className="text-xs text-slate-500">
                {destination.nameVi} · {plan.name}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-[#1A2340] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          
          {orderSuccess ? (
            /* ========================================================================= */
            /* SUCCESS ORDER VIEW WITH QR CODE DELIVERY SIMULATION                       */
            /* ========================================================================= */
            <div className="space-y-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#1A2340] text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#1A2340]">
                  {language === 'vi' ? 'Thanh toán thành công!' : 'Payment Completed!'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Mã QR và thông tin kích hoạt đã được gửi tới email: <strong className="text-[#1A2340]">{orderSuccess.email}</strong>
                </p>
              </div>

              {/* QR Code Delivery Box */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-[#1A2340]/20 max-w-sm mx-auto space-y-4 shadow-sm">
                <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 inline-block">
                  <svg className="w-40 h-40 text-[#1A2340] mx-auto" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 0h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zM6 6h2v2H6V6zm12 0h2v2h-2V6zm-6 0h2v2h-2V6zm0 6h2v2h-2v-2zm-6 6h2v2H6v-2z" />
                  </svg>
                </div>

                <div className="text-left text-xs space-y-1.5 font-mono bg-white p-3 rounded-lg border border-[#1A2340]/20">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mã đơn hàng:</span>
                    <span className="font-bold text-[#1A2340]">{orderSuccess.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">SM-DP+ Address:</span>
                    <span className="font-bold text-[#1A2340]">{orderSuccess.smdpAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Activation Code:</span>
                    <span className="font-bold text-[#1A2340]">{orderSuccess.activationCode}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-700 text-left space-y-1 border border-[#1A2340]/20">
                <div className="font-bold text-[#1A2340]">Lưu ý quan trọng:</div>
                <p>1. Hãy quét mã QR này khi đang ở nhà với Wi-Fi ổn định.</p>
                <p>2. Chỉ BẬT "Chuyển vùng dữ liệu" (Data Roaming) của eSIM khi đã hạ cánh xuống sân bay điểm đến.</p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3.5 bg-[#1A2340] text-white font-black text-xs rounded-xl shadow-md hover:bg-[#28355c] transition-colors cursor-pointer"
              >
                Hoàn tất & Về trang chủ
              </button>
            </div>
          ) : (
            /* ========================================================================= */
            /* CHECKOUT FORM VIEW                                                        */
            /* ========================================================================= */
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              
              {/* Checkbox device compatible */}
              <div className="p-4 rounded-xl bg-slate-50 border border-[#1A2340]/20 shadow-xs">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDeviceCompatibleChecked}
                    onChange={(e) => setIsDeviceCompatibleChecked(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#1A2340] focus:ring-[#1A2340] accent-[#1A2340] cursor-pointer"
                  />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-[#1A2340]">
                      Tôi xác nhận điện thoại của mình tương thích với công nghệ eSIM và là máy quốc tế (Unlocked).
                    </span>{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setCompatibilityModalOpen(true);
                      }}
                      className="text-[#1A2340] underline font-bold hover:opacity-80 inline-block"
                    >
                      (Xem danh sách máy hỗ trợ)
                    </button>
                  </div>
                </label>
              </div>

              {/* Package Summary snippet */}
              <div className="p-4 rounded-xl bg-slate-50 border border-[#1A2340]/20 shadow-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#1A2340]">{plan.name}</span>
                    {plan.isBestSeller && (
                      <span className="bg-[#FF6500] text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                        BEST SELLER
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {destination.topCarriers.join(' · ')} · {plan.speed}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-base text-[#1A2340]">
                    {formatPrice(plan.priceVnd, plan.priceUsd)}
                  </div>
                </div>
              </div>

              {/* Customer Information with Custom Dropdowns with Flag Images */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A2340]">
                  Thông tin người nhận eSIM
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#1A2340]/20 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-1 focus:ring-[#1A2340] focus:border-[#1A2340] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                      Email nhận mã QR *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#1A2340]/20 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-1 focus:ring-[#1A2340] focus:border-[#1A2340] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                      Số điện thoại liên hệ *
                    </label>
                    <div className="flex gap-2">
                      
                      {/* Phone Dial Code Custom Dropdown */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsDialDropdownOpen(!isDialDropdownOpen);
                            setIsCountryDropdownOpen(false);
                          }}
                          className="px-2.5 py-2.5 rounded-lg border border-[#1A2340]/20 bg-white text-[#1A2340] text-xs font-semibold hover:border-[#1A2340] focus:ring-1 focus:ring-[#1A2340] flex items-center gap-1.5 cursor-pointer h-full min-w-[105px]"
                        >
                          <img
                            src={getFlagUrl(selectedDialItem.flagCode)}
                            alt={selectedDialItem.country}
                            className="w-5 h-3.5 object-contain rounded-xs shrink-0"
                          />
                          <span>{selectedDialItem.code}</span>
                          <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-auto" />
                        </button>

                        {isDialDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsDialDropdownOpen(false)} />
                            <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-[#1A2340]/20 rounded-xl shadow-xl max-h-56 overflow-y-auto w-56 py-1">
                              {COUNTRY_DIAL_CODES.map((item) => (
                                <button
                                  key={item.code + item.country}
                                  type="button"
                                  onClick={() => {
                                    setSelectedDialCode(item.code);
                                    setIsDialDropdownOpen(false);
                                  }}
                                  className={`w-full px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-[#1A2340]/5 transition-colors cursor-pointer text-left ${
                                    selectedDialCode === item.code ? 'bg-[#1A2340]/10 font-bold text-[#1A2340]' : 'text-slate-700'
                                  }`}
                                >
                                  <img
                                    src={getFlagUrl(item.flagCode)}
                                    alt={item.country}
                                    className="w-5 h-3.5 object-contain rounded-xs shrink-0"
                                  />
                                  <span>{item.code} ({item.country})</span>
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="912 345 678"
                        className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#1A2340]/20 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-1 focus:ring-[#1A2340] focus:border-[#1A2340] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                      Quốc gia cư trú *
                    </label>

                    {/* Country of Residence Custom Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCountryDropdownOpen(!isCountryDropdownOpen);
                          setIsDialDropdownOpen(false);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#1A2340]/20 bg-white text-[#1A2340] text-xs font-semibold hover:border-[#1A2340] focus:ring-1 focus:ring-[#1A2340] flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={getFlagUrl(selectedCountryItem.flagCode)}
                            alt={selectedCountryItem.name}
                            className="w-5 h-3.5 object-contain rounded-xs shrink-0"
                          />
                          <span>{selectedCountry}</span>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                      </button>

                      {isCountryDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setIsCountryDropdownOpen(false)} />
                          <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white border border-[#1A2340]/20 rounded-xl shadow-xl max-h-56 overflow-y-auto py-1">
                            {RESIDENCE_COUNTRIES.map((item) => (
                              <button
                                key={item.name}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(item.name);
                                  setIsCountryDropdownOpen(false);
                                }}
                                className={`w-full px-3.5 py-2 text-xs flex items-center gap-2.5 hover:bg-[#1A2340]/5 transition-colors cursor-pointer text-left ${
                                  selectedCountry === item.name ? 'bg-[#1A2340]/10 font-bold text-[#1A2340]' : 'text-slate-700'
                                }`}
                              >
                                <img
                                  src={getFlagUrl(item.flagCode)}
                                  alt={item.name}
                                  className="w-5 h-3.5 object-contain rounded-xs shrink-0"
                                />
                                <span>{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                  </div>
                </div>
              </div>

              {/* Way2Go Coin or Promo */}
              <div className="border border-[#1A2340]/20 rounded-2xl p-4 bg-slate-50 shadow-xs space-y-4">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCoinOrCodeChecked}
                    onChange={(e) => setIsCoinOrCodeChecked(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1A2340] focus:ring-[#1A2340] accent-[#1A2340] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#1A2340]">
                    Sử dụng Way2Go Coin hoặc Mã giảm giá / Mã giới thiệu
                  </span>
                </label>

                {isCoinOrCodeChecked && (
                  <div className="space-y-4 pt-2 border-t border-[#1A2340]/20">
                    {/* Section 1: Way2Go Coin */}
                    <div className="p-3.5 bg-white rounded-xl border border-[#1A2340]/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A2340]">
                          <span>🪙</span>
                          <span>Way2Go Coin (Loyalty & Điểm thưởng)</span>
                        </div>
                        <span className="text-xs font-bold text-[#1A2340]">
                          Ví có: {maxCoinsAvailable} Coin
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600">
                        Quy đổi: 1 Coin = 100 VNĐ. Có thể dùng trừ trực tiếp vào giá trị đơn hàng này.
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="number"
                          min="0"
                          max={maxCoinsAvailable}
                          value={coinsToUse}
                          onChange={(e) => {
                            const val = Math.min(maxCoinsAvailable, Math.max(0, parseInt(e.target.value) || 0));
                            setCoinsToUse(val);
                          }}
                          placeholder="Số coin muốn dùng"
                          className="w-36 px-3 py-1.5 rounded-lg border border-[#1A2340]/20 bg-white text-[#1A2340] text-xs font-mono font-bold focus:outline-none focus:border-[#1A2340]"
                        />
                        <button
                          type="button"
                          onClick={() => setCoinsToUse(maxCoinsAvailable)}
                          className="px-2.5 py-1.5 bg-[#1A2340] hover:bg-[#28355c] text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          Dùng tối đa
                        </button>
                        {coinsToUse > 0 && (
                          <span className="text-xs font-bold text-[#1A2340] ml-auto">
                            - {new Intl.NumberFormat('vi-VN').format(coinDiscountVnd)} đ
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Section 2: Promo Code / Referee code */}
                    <div className="p-3.5 bg-white rounded-xl border border-[#1A2340]/20 space-y-2">
                      <label className="block text-xs font-bold text-[#1A2340]">
                        Nhập code referee hoặc code của chương trình khuyến mãi (CTKM)
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Ví dụ: W2GSPRING, FRIEND10, W2G-TRAVEL2026..."
                          className="flex-1 px-3 py-2 rounded-lg border border-[#1A2340]/20 bg-white text-[#1A2340] placeholder-slate-400 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#1A2340]"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-4 py-2 bg-[#1A2340] text-white rounded-lg text-xs font-bold hover:bg-[#28355c] transition-colors cursor-pointer"
                        >
                          Áp dụng
                        </button>
                      </div>

                      {appliedPromo && (
                        <div className="text-xs text-[#1A2340] font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã áp dụng mã {appliedPromo.code}: Giảm 10% ({formatPrice(appliedPromo.discountVnd, appliedPromo.discountUsd)})</span>
                        </div>
                      )}
                      {promoError && (
                        <div className="text-xs text-red-500 font-semibold">{promoError}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A2340]">
                  Phương thức thanh toán
                </h4>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-2 border-[#1A2340] bg-[#1A2340]/5 text-[#1A2340] font-bold ring-1 ring-[#1A2340]'
                        : 'border-[#E2E8F0] bg-white text-slate-700 hover:border-[#1A2340]/40'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-inherit" />
                    <span className="text-[11px] block">Visa / Master</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'applepay'
                        ? 'border-2 border-[#1A2340] bg-[#1A2340]/5 text-[#1A2340] font-bold ring-1 ring-[#1A2340]'
                        : 'border-[#E2E8F0] bg-white text-slate-700 hover:border-[#1A2340]/40'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-inherit" />
                    <span className="text-[11px] block">Apple / Google Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr_bank')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'qr_bank'
                        ? 'border-2 border-[#1A2340] bg-[#1A2340]/5 text-[#1A2340] font-bold ring-1 ring-[#1A2340]'
                        : 'border-[#E2E8F0] bg-white text-slate-700 hover:border-[#1A2340]/40'
                    }`}
                  >
                    <Banknote className="w-4 h-4 mx-auto mb-1 text-inherit" />
                    <span className="text-[11px] block">QR Ngân hàng / MoMo</span>
                  </button>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="pt-3 border-t border-[#1A2340]/20 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Giá gói eSIM:</span>
                  <span className="tabular-nums font-semibold text-[#1A2340]">{formatPrice(basePriceVnd, basePriceUsd)}</span>
                </div>
                {coinDiscountVnd > 0 && (
                  <div className="flex justify-between text-[#1A2340] font-semibold">
                    <span>Trừ Way2Go Coin ({coinsToUse} coin):</span>
                    <span className="tabular-nums">- {formatPrice(coinDiscountVnd, coinDiscountUsd)}</span>
                  </div>
                )}
                {promoDiscountVnd > 0 && (
                  <div className="flex justify-between text-[#1A2340] font-semibold">
                    <span>Giảm mã ưu đãi ({appliedPromo?.code}):</span>
                    <span className="tabular-nums">- {formatPrice(promoDiscountVnd, promoDiscountUsd)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-[#1A2340] pt-2 border-t border-[#1A2340]/20">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-[#1A2340] tabular-nums text-xl font-black">
                    {formatPrice(finalPriceVnd, finalPriceUsd)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#FF6500] hover:bg-[#E05800] active:bg-[#C84E00] disabled:bg-slate-300 text-white font-black text-sm sm:text-base rounded-full shadow-lg shadow-[#FF6500]/30 hover:shadow-orange-500/40 transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <span>Đang xử lý đơn hàng...</span>
                ) : (
                  <>
                    <span>Xác nhận & Nhận mã QR ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
