import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { COUNTRY_DIAL_CODES } from '../data/destinations';
import { useApp } from '../context/AppContext';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const { user } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: user ? user.fullName : '',
    email: user ? user.email : '',
    phoneDialCode: 'VN +84',
    phone: user ? user.phone : '',
    channelType: 'TikTok / YouTube Travel Vlogger',
    channelUrl: '',
    followerCount: '10,000 - 50,000 followers',
    payoutMethod: 'Ngân hàng nội địa Việt Nam (Vietcombank, MB, Techcombank, BIDV, ACB...)',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-2xl w-full text-left space-y-6 relative shadow-2xl animate-in fade-in zoom-in duration-200 my-8">
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A2340] tracking-tight">
            Gia nhập Mạng lưới Đối tác Way2Go
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Hoàn thành mẫu đăng ký dưới đây. Đội ngũ Partnership của chúng tôi sẽ liên hệ phê duyệt và kích hoạt mã đối tác trong vòng 24 giờ làm việc.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 bg-emerald-50 rounded-2xl border-2 border-emerald-400 text-emerald-900 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-3xl mx-auto shadow-md">
              ✓
            </div>
            <h3 className="font-black text-2xl text-emerald-900">🎉 Đăng ký thành công!</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-emerald-800 max-w-lg mx-auto">
              Cảm ơn <strong>{formData.name}</strong> đã đăng ký gia nhập mạng lưới đối tác Way2Go. Thông tin hướng dẫn kích hoạt tài khoản Partner Dashboard đã được gửi tới email <strong>{formData.email}</strong>.
            </p>
            <p className="text-xs font-semibold text-emerald-900">
              Đội ngũ Partnership sẽ liên hệ với bạn trong vòng 24h làm việc.
            </p>
            <div className="pt-2">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl bg-[#1A2340] hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2340] mb-1.5">
                  Họ và tên người đại diện *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1A2340] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2340] mb-1.5">
                  Email nhận báo cáo doanh số *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="partner@yourdomain.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1A2340] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2340] mb-1.5">
                  Số điện thoại (kèm mã quốc gia) *
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.phoneDialCode}
                    onChange={(e) => setFormData({ ...formData, phoneDialCode: e.target.value })}
                    className="w-28 px-2 py-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:outline-none"
                  >
                    {COUNTRY_DIAL_CODES.map((c) => (
                      <option key={c.code} value={`${c.flagCode} ${c.code}`}>
                        {c.flagCode} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0988 123 456"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1A2340] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2340] mb-1.5">
                  Loại hình kênh / Phương thức truyền thông
                </label>
                <select
                  value={formData.channelType}
                  onChange={(e) => setFormData({ ...formData, channelType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1A2340] focus:border-transparent outline-none bg-white transition-all"
                >
                  <option>TikTok / YouTube Travel Vlogger</option>
                  <option>Instagram / Facebook Creator</option>
                  <option>Website / Blog Du Lịch Cá Nhân</option>
                  <option>Hướng dẫn viên / Tour Leader</option>
                  <option>Quản trị viên Group Du lịch / Phượt</option>
                  <option>Công ty Du lịch / Agency Lữ hành</option>
                  <option>Du học sinh / Digital Nomad</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2340] mb-1.5">
                  Đường dẫn kênh / Website chính *
                </label>
                <input
                  type="url"
                  required
                  value={formData.channelUrl}
                  onChange={(e) => setFormData({ ...formData, channelUrl: e.target.value })}
                  placeholder="https://tiktok.com/@yourchannel hoặc https://yourblog.vn"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1A2340] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2340] mb-1.5">
                  Quy mô người theo dõi / Lượng khách
                </label>
                <select
                  value={formData.followerCount}
                  onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1A2340] focus:border-transparent outline-none bg-white transition-all"
                >
                  <option>&lt; 10,000 followers</option>
                  <option>10,000 - 50,000 followers</option>
                  <option>50,000 - 200,000 followers</option>
                  <option>&gt; 200,000 followers</option>
                  <option>Tour đoàn 100 - 500 khách/tháng</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2340] mb-1.5">
                Phương thức nhận hoa hồng ưa thích
              </label>
              <select
                value={formData.payoutMethod}
                onChange={(e) => setFormData({ ...formData, payoutMethod: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1A2340] focus:border-transparent outline-none bg-white transition-all"
              >
                <option>Ngân hàng nội địa Việt Nam (Vietcombank, MB, Techcombank, BIDV, ACB...)</option>
                <option>Ví điện tử MoMo</option>
                <option>Tài khoản quốc tế PayPal</option>
                <option>Payoneer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2340] mb-1.5">
                Kế hoạch hợp tác hoặc câu hỏi bổ sung (Tùy chọn)
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Bạn dự định gắn link trong bài viết nào? Đặt banner ở vị trí nào?..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1A2340] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-[#1A2340] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Gửi đơn đăng ký trở thành Đối tác</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PartnerModal;
