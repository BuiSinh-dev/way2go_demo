import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COUNTRY_DIAL_CODES } from '../data/destinations';
import { X, Check, ShieldCheck, QrCode, AlertCircle, ArrowRight, Smartphone, Sparkles, CreditCard, Banknote } from 'lucide-react';

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

  // Compatibility checkbox note: "Đổi màu 'kiểm tra thiết bị tương thích' -> đổi thành ô vuông có dấu tích cho KH nhấn vào"
  const [isDeviceCompatibleChecked, setIsDeviceCompatibleChecked] = useState(false);

  // Form info
  const [fullName, setFullName] = useState(user ? user.fullName : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [selectedDialCode, setSelectedDialCode] = useState('+84');
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phone : '');
  const [selectedCountry, setSelectedCountry] = useState('Việt Nam');

  // Use Way2Go coin or code toggle note: "tích vào 'use way2go coin or code' sẽ sổ ra 2 section này"
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
      // Deduct coins if used
      if (coinsToUse > 0) {
        deductCoins(coinsToUse);
      }
      // Add loyalty coins for this purchase: 10% value
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
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A2340]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#1A2340] rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E2E8F0] overflow-hidden my-8 text-left">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xl">{destination.flag}</span>
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
              <div className="w-14 h-14 rounded-full bg-[#00D2B8]/20 text-[#00D2B8] flex items-center justify-center mx-auto">
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
              <div className="bg-slate-50 p-6 rounded-2xl border border-[#E2E8F0] max-w-sm mx-auto space-y-4 shadow-sm">
                <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 inline-block">
                  <svg className="w-40 h-40 text-slate-900 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 0h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zM6 6h2v2H6V6zm12 0h2v2h-2V6zm-6 0h2v2h-2V6zm0 6h2v2h-2v-2zm-6 6h2v2H6v-2z" />
                  </svg>
                </div>

                <div className="text-left text-xs space-y-1.5 font-mono bg-white p-3 rounded-lg border border-[#E2E8F0]">
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
                    <span className="font-bold text-[#00D2B8]">{orderSuccess.activationCode}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-700 text-left space-y-1 border border-[#E2E8F0]">
                <div className="font-bold text-[#00D2B8]">Lưu ý quan trọng:</div>
                <p>1. Hãy quét mã QR này khi đang ở nhà với Wi-Fi ổn định.</p>
                <p>2. Chỉ BẬT "Chuyển vùng dữ liệu" (Data Roaming) của eSIM khi đã hạ cánh xuống sân bay điểm đến.</p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-[#00D2B8] text-white font-black text-xs rounded-xl shadow-md hover:bg-[#00bda6] transition-colors cursor-pointer"
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
              <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] shadow-xs">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDeviceCompatibleChecked}
                    onChange={(e) => setIsDeviceCompatibleChecked(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#00D2B8] focus:ring-[#00D2B8] accent-[#00D2B8]"
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
                      className="text-[#00D2B8] underline font-semibold hover:text-[#00bda6] inline-block"
                    >
                      (Xem danh sách máy hỗ trợ)
                    </button>
                  </div>
                </label>
              </div>

              {/* Package Summary snippet */}
              <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] shadow-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#1A2340]">{plan.name}</span>
                    {plan.isBestSeller && (
                      <span className="bg-[#00D2B8] text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                        BEST SELLER
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {destination.topCarriers.join(' · ')} · {plan.speed}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-base text-[#00D2B8]">
                    {formatPrice(plan.priceVnd, plan.priceUsd)}
                  </div>
                </div>
              </div>

              {/* Customer Information with Dropdowns */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#00D2B8]">
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                      Số điện thoại liên hệ *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={selectedDialCode}
                        onChange={(e) => setSelectedDialCode(e.target.value)}
                        className="px-2 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none bg-white text-[#1A2340] font-medium"
                      >
                        {COUNTRY_DIAL_CODES.map((item) => (
                          <option key={item.code} value={item.code} className="bg-white">
                            {item.flag} {item.code} ({item.country})
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="912 345 678"
                        className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                      Quốc gia cư trú *
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none bg-white text-[#1A2340] font-medium"
                    >
                      <option value="Việt Nam">🇻🇳 Việt Nam</option>
                      <option value="Nhật Bản">🇯🇵 Nhật Bản</option>
                      <option value="Hàn Quốc">🇰🇷 Hàn Quốc</option>
                      <option value="Hoa Kỳ">🇺🇸 Hoa Kỳ (USA)</option>
                      <option value="Úc">🇦🇺 Úc (Australia)</option>
                      <option value="Singapore">🇸🇬 Singapore</option>
                      <option value="Vương Quốc Anh">🇬🇧 Vương Quốc Anh</option>
                      <option value="Khác">🌐 Quốc gia khác</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Way2Go Coin or Promo */}
              <div className="border border-[#E2E8F0] rounded-2xl p-4 bg-slate-50 shadow-xs space-y-4">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCoinOrCodeChecked}
                    onChange={(e) => setIsCoinOrCodeChecked(e.target.checked)}
                    className="w-4 h-4 rounded text-[#00D2B8] focus:ring-[#00D2B8] accent-[#00D2B8]"
                  />
                  <span className="text-xs font-bold text-[#1A2340]">
                    Sử dụng Way2Go Coin hoặc Mã giảm giá / Mã giới thiệu
                  </span>
                </label>

                {isCoinOrCodeChecked && (
                  <div className="space-y-4 pt-2 border-t border-[#E2E8F0]">
                    {/* Section 1: Way2Go Coin */}
                    <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A2340]">
                          <span>🪙</span>
                          <span>Way2Go Coin (Loyalty & Điểm thưởng)</span>
                        </div>
                        <span className="text-xs font-bold text-[#00D2B8]">
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
                          className="w-36 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-[#1A2340] text-xs font-mono font-bold focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setCoinsToUse(maxCoinsAvailable)}
                          className="px-2.5 py-1.5 bg-[#00D2B8]/20 hover:bg-[#00D2B8]/30 text-[#00D2B8] rounded-lg text-[11px] font-bold cursor-pointer"
                        >
                          Dùng tối đa
                        </button>
                        {coinsToUse > 0 && (
                          <span className="text-xs font-bold text-[#00D2B8] ml-auto">
                            - {new Intl.NumberFormat('vi-VN').format(coinDiscountVnd)} đ
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Section 2: Promo Code / Referee code */}
                    <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] space-y-2">
                      <label className="block text-xs font-bold text-[#1A2340]">
                        Nhập code referee hoặc code của chương trình khuyến mãi (CTKM)
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Ví dụ: W2GSPRING, FRIEND10, W2G-TRAVEL2026..."
                          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-[#1A2340] placeholder-slate-400 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#00D2B8]"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-4 py-2 bg-[#00D2B8] text-white rounded-lg text-xs font-bold hover:bg-[#00bda6] transition-colors cursor-pointer"
                        >
                          Áp dụng
                        </button>
                      </div>

                      {appliedPromo && (
                        <div className="text-xs text-[#00D2B8] font-bold flex items-center gap-1">
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
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#00D2B8]">
                  Phương thức thanh toán
                </h4>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#00D2B8] bg-[#00D2B8]/10 text-[#1A2340] font-bold ring-1 ring-[#00D2B8]'
                        : 'border-[#E2E8F0] bg-white text-slate-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-inherit" />
                    <span className="text-[11px] block">Visa / Master</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'applepay'
                        ? 'border-[#00D2B8] bg-[#00D2B8]/10 text-[#1A2340] font-bold ring-1 ring-[#00D2B8]'
                        : 'border-[#E2E8F0] bg-white text-slate-700'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-inherit" />
                    <span className="text-[11px] block">Apple / Google Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr_bank')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'qr_bank'
                        ? 'border-[#00D2B8] bg-[#00D2B8]/10 text-[#1A2340] font-bold ring-1 ring-[#00D2B8]'
                        : 'border-[#E2E8F0] bg-white text-slate-700'
                    }`}
                  >
                    <Banknote className="w-4 h-4 mx-auto mb-1 text-inherit" />
                    <span className="text-[11px] block">QR Ngân hàng / MoMo</span>
                  </button>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="pt-3 border-t border-[#E2E8F0] space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Giá gói eSIM:</span>
                  <span className="tabular-nums font-semibold text-[#1A2340]">{formatPrice(basePriceVnd, basePriceUsd)}</span>
                </div>
                {coinDiscountVnd > 0 && (
                  <div className="flex justify-between text-[#00D2B8] font-semibold">
                    <span>Trừ Way2Go Coin ({coinsToUse} coin):</span>
                    <span className="tabular-nums">- {formatPrice(coinDiscountVnd, coinDiscountUsd)}</span>
                  </div>
                )}
                {promoDiscountVnd > 0 && (
                  <div className="flex justify-between text-[#00D2B8] font-semibold">
                    <span>Giảm mã ưu đãi ({appliedPromo?.code}):</span>
                    <span className="tabular-nums">- {formatPrice(promoDiscountVnd, promoDiscountUsd)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-[#1A2340] pt-2 border-t border-[#E2E8F0]">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-[#00D2B8] tabular-nums text-lg font-black">
                    {formatPrice(finalPriceVnd, finalPriceUsd)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#00D2B8] hover:bg-[#00bda6] disabled:bg-slate-300 text-[#1A2340] font-black text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
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
