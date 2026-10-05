import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COUNTRY_DIAL_CODES } from '../data/destinations';
import { X, User, Mail, Lock, Sparkles, CheckCircle2, Phone, Calendar, MapPin } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    language,
    loginUser,
    registerUser
  } = useApp();

  // Registration Form Fields as requested in OCR:
  // - Họ và tên
  // - Năm sinh
  // - Giới tính: Nam / Nữ / Khác
  // - Thành phố sinh sống
  // - SĐT
  // - email (đăng ký = email ko cần OTP xác thực, có thể đăng nhập nhanh = email)
  // - tên tài khoản
  // - mật khẩu
  const [fullName, setFullName] = useState('');
  const [birthYear, setBirthYear] = useState('1998');
  const [gender, setGender] = useState<'Nam' | 'Nữ' | 'Khác'>('Nam');
  const [city, setCity] = useState('Hồ Chí Minh');
  const [phoneDialCode, setPhoneDialCode] = useState('+84');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Login form field
  const [loginInput, setLoginInput] = useState(''); // email or username
  const [loginPassword, setLoginPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !password) {
      alert(language === 'vi' ? 'Vui lòng điền đầy đủ các thông tin bắt buộc (*)' : 'Please fill all required fields');
      return;
    }

    registerUser({
      fullName,
      birthYear,
      gender,
      city,
      phone,
      phoneDialCode,
      email,
      username: username || email.split('@')[0]
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInput) {
      alert(language === 'vi' ? 'Vui lòng nhập Email hoặc Tên tài khoản' : 'Please enter Email or Username');
      return;
    }
    loginUser(loginInput, loginPassword);
    setAuthModalOpen(false);
  };

  const fillDemoRegister = () => {
    setFullName('Trần Phương Linh');
    setBirthYear('1996');
    setGender('Nữ');
    setCity('Hà Nội');
    setPhone('0934567890');
    setEmail('phuonglinh.travel@gmail.com');
    setUsername('phuonglinhtravel');
    setPassword('Way2go2026!');
  };

  const fillDemoLogin = () => {
    setLoginInput('minh.nguyen@example.com');
    setLoginPassword('password123');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A2340]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#EBF9FF] text-[#1A2340] rounded-3xl max-w-lg w-full shadow-xl border border-[#cbeaf6] overflow-hidden my-8 text-left">

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#cbeaf6] flex items-center justify-between bg-white">
          <div>
            <h3 className="font-extrabold text-lg text-[#1A2340]">
              {authModalMode === 'login'
                ? (language === 'vi' ? 'Đăng nhập Way2Go' : 'Sign In to Way2Go')
                : (language === 'vi' ? 'Đăng ký tài khoản mới' : 'Create New Account')}
            </h3>
            <p className="text-xs text-[#1A2340]/70 mt-0.5">
              {language === 'vi'
                ? 'Nhận ngay 500 W2G Coins (~50.000đ) khi đăng ký thành viên!'
                : 'Get 500 W2G Coins ($5) welcome bonus upon signing up!'}
            </p>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#1A2340] hover:bg-[#EBF9FF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[82vh] overflow-y-auto bg-white">

          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-white border border-[#cbeaf6] rounded-full mb-6 text-xs font-bold">
            <button
              onClick={() => setAuthModalMode('login')}
              className={`py-2 rounded-full transition-all cursor-pointer ${authModalMode === 'login' ? 'bg-[#1A2340] text-white shadow-md' : 'text-[#1A2340]/70 hover:text-[#1A2340]'
                }`}
            >
              {language === 'vi' ? 'Đăng nhập' : 'Sign In'}
            </button>
            <button
              onClick={() => setAuthModalMode('register')}
              className={`py-2 rounded-full transition-all cursor-pointer ${authModalMode === 'register' ? 'bg-[#1A2340] text-white shadow-md' : 'text-[#1A2340]/70 hover:text-[#1A2340]'
                }`}
            >
              {language === 'vi' ? 'Đăng ký' : 'Sign Up'}
            </button>
          </div>

          {/* ========================================================================= */}
          {/* LOGIN FORM                                                                */}
          {/* ========================================================================= */}
          {authModalMode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                  {language === 'vi' ? 'Email hoặc Tên tài khoản *' : 'Email or Username *'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="email@example.com / username"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                  {language === 'vi' ? 'Mật khẩu *' : 'Password *'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#00D2B8] accent-[#00D2B8]" />
                  <span>{language === 'vi' ? 'Ghi nhớ đăng nhập' : 'Remember me'}</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Vui lòng kiểm tra email của bạn để nhận liên kết đặt lại mật khẩu.'); }} className="text-[#00D2B8] font-semibold hover:underline">
                  {language === 'vi' ? 'Quên mật khẩu?' : 'Forgot password?'}
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1A2340] hover:bg-[#243056] text-white font-black text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {language === 'vi' ? 'Đăng nhập ngay' : 'Sign In Now'}
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={fillDemoLogin}
                  className="text-[11px] text-slate-500 hover:text-[#00D2B8] underline cursor-pointer"
                >
                  ⚡ Điền nhanh tài khoản thử nghiệm
                </button>
              </div>
            </form>
          ) : (
            /* ========================================================================= */
            /* REGISTRATION FORM                                                         */
            /* ========================================================================= */
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Field 1: Họ và tên */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn Minh"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                />
              </div>

              {/* Field 2 & 3: Năm sinh & Giới tính */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                    Năm sinh *
                  </label>
                  <select
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-[#1A2340] text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                  >
                    {Array.from({ length: 70 }, (_, i) => 2012 - i).map((y) => (
                      <option key={y} value={y} className="bg-white">{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                    Giới tính *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-[#1A2340] text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                  >
                    <option value="Nam" className="bg-white">Nam</option>
                    <option value="Nữ" className="bg-white">Nữ</option>
                    <option value="Khác" className="bg-white">Khác</option>
                  </select>
                </div>
              </div>

              {/* Field 4: Thành phố sinh sống */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                  Thành phố sinh sống *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-[#1A2340] text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                >
                  <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Khác">Tỉnh / Thành phố khác</option>
                </select>
              </div>

              {/* Field 5: SĐT */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                  Số điện thoại *
                </label>
                <div className="flex gap-2">
                  <select
                    value={phoneDialCode}
                    onChange={(e) => setPhoneDialCode(e.target.value)}
                    className="px-2 py-2 rounded-lg border border-slate-300 bg-white text-[#1A2340] text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                  >
                    {COUNTRY_DIAL_CODES.map((item) => (
                      <option key={item.code} value={item.code} className="bg-white">
                        {item.flag} {item.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="912 345 678"
                    className="flex-1 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                  />
                </div>
              </div>

              {/* Field 6: email */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                  Email (Đăng ký nhanh, không cần OTP) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                />
              </div>

              {/* Field 7: tên tài khoản */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                  Tên tài khoản (Username) *
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="user_traveler"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none font-mono"
                />
              </div>

              {/* Field 8: mật khẩu */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2340] mb-1">
                  Mật khẩu *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-[#1A2340] placeholder-slate-400 text-xs focus:ring-2 focus:ring-[#00D2B8] focus:outline-none"
                />
              </div>

              {/* Loyalty Reward Indicator */}
              <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] text-slate-700 text-xs flex items-center gap-2 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#00D2B8] shrink-0" />
                <span>Bạn sẽ nhận ngay <strong className="text-[#00D2B8]">500 W2G Coins</strong> vào ví sau khi tạo tài khoản!</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF7A5C] hover:bg-[#e6694c] text-white font-black text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Hoàn tất đăng ký & Nhận 500 Coins
              </button>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={fillDemoRegister}
                  className="text-[11px] text-slate-500 hover:text-[#00D2B8] underline cursor-pointer"
                >
                  ⚡ Tự động điền dữ liệu mẫu để thử nghiệm
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
