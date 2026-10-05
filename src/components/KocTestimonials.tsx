import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShieldCheck, Heart, MapPin, CheckCircle } from 'lucide-react';

export const KocTestimonials: React.FC = () => {
  const { language } = useApp();

  const reviews = [
    {
      name: 'Khoai Lang Thang',
      roleVi: 'Travel Vlogger & Nhà sáng tạo nội dung',
      roleEn: 'Travel Creator & Food Vlogger',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
      flags: ['JP'],
      destinationVi: 'Nhật Bản',
      destinationEn: 'Japan',
      quoteVi: 'Mỗi lần đi quay phim ở nước ngoài, điều Khoai quan tâm nhất là mạng phải đủ mạnh để upload video và tra cứu bản đồ xe lửa. Dùng eSIM Way2Go hơn 2 năm nay chưa từng bị rớt mạng lần nào, cực kỳ an tâm!',
      quoteEn: 'Every time I shoot abroad, reliable connection for uploading high-res footage is vital. Way2Go eSIM has never failed me across Japan and Europe over the past 2 years!',
      rating: 5,
      date: '2026-03-12',
      likes: '1.2k',
      accentColor: 'from-amber-500/20 to-orange-500/10'
    },
    {
      name: 'Hà Trúc',
      roleVi: 'Lifestyle & Travel Content Creator',
      roleEn: 'Lifestyle & Fashion Traveler',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      flags: ['FR'],
      destinationVi: 'Pháp',
      destinationEn: 'France',
      quoteVi: 'Đi tour liên tuyến 4 nước Châu Âu mà chỉ cần 1 mã QR duy nhất. Vừa ngồi trên tàu ngắm cảnh vừa livestream mượt mà, không phải bận tâm tháo sim cất giữ sợ mất như trước.',
      quoteEn: 'One single QR code for 4 European countries. Streaming high-quality stories while riding the train through the Alps was effortless with zero SIM swapping.',
      rating: 5,
      date: '2026-03-05',
      likes: '890',
      accentColor: 'from-rose-500/20 to-pink-500/10'
    },
    {
      name: 'Lê Bảo Trung',
      roleVi: 'Kỹ sư công nghệ & Digital Nomad',
      roleEn: 'Software Engineer & Nomad',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      flags: ['TH'],
      destinationVi: 'Thái Lan',
      destinationEn: 'Thailand',
      quoteVi: 'Mình làm việc từ xa cần họp online Zoom liên tục. Gói Không Giới Hạn (ULM) của Way2Go phát Wi-Fi cho cả laptop và máy tính bảng chạy phà phà. Giá rẻ hơn bộ phát Wi-Fi rất nhiều.',
      quoteEn: 'Working remotely requires stable Zoom calls. Way2Go Unlimited (ULM) plan shared hotspot smoothly to my MacBook and iPad. Way cheaper than pocket Wi-Fi rental.',
      rating: 5,
      date: '2026-02-27',
      likes: '640',
      accentColor: 'from-blue-500/20 to-cyan-500/10'
    },
    {
      name: 'Nguyễn Thảo My',
      roleVi: 'Du học sinh tại Melbourne, Úc',
      roleEn: 'International Student in Australia',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
      flags: ['AU'],
      destinationVi: 'Úc',
      destinationEn: 'Australia',
      quoteVi: 'Lúc mới sang chưa kịp làm thẻ ngân hàng bản địa nên mua eSIM Way2Go dùng tạm. Bất ngờ là sóng Telstra và KT siêu khỏe, lại được tặng 500 Coin trừ thẳng vào tiền đơn sau!',
      quoteEn: 'Purchased Way2Go eSIM before setting up my local bank account. Super strong Telstra coverage and earned 500 W2G Coins for instant discount on next refill!',
      rating: 5,
      date: '2026-02-19',
      likes: '420',
      accentColor: 'from-emerald-500/20 to-teal-500/10'
    }
  ];

  return (
    <section id="koc-reviews" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2340] tracking-tight">
              {language === 'vi'
                ? 'Feedback từ khách hàng & các KOLs, KOC du lịch'
                : 'Real Stories from Travelers, KOLs & Creators'}
            </h2>
            <p className="mt-2 text-sm text-[#1A2340]/80">
              {language === 'vi'
                ? 'Những bức hình và cảm nhận chân thực nhất từ cộng đồng xê dịch toàn cầu khi đồng hành cùng Way2Go.'
                : 'Authentic photos and reviews from global creators and verified travelers worldwide.'}
            </p>
          </div>
        </div>

        {/* Testimonials Grid - Pure White Cards with #E2E8F0 Border */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white text-[#1A2340] rounded-2xl p-5 border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-[#00D2B8] transition-all flex flex-col justify-between text-left"
            >
              <div>
                {/* Rating & Location Tag with Flag Images */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-500 shrink-0">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1A2340] bg-slate-50 border border-[#E2E8F0] px-2 py-0.5 rounded truncate">
                    <div className="flex items-center gap-1 shrink-0">
                      {rev.flags.map((code, fIdx) => (
                        <img
                          key={fIdx}
                          src={`https://flagsapi.com/${code}/flat/64.png`}
                          alt={code}
                          className="w-4 h-3 object-contain shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                    <span className="truncate">{language === 'vi' ? rev.destinationVi : rev.destinationEn}</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#1A2340]/90 italic leading-relaxed mb-4">
                  "{language === 'vi' ? rev.quoteVi : rev.quoteEn}"
                </p>
              </div>

              {/* Author & Verification with Avatar Image */}
              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatarUrl}
                    alt={rev.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#00D2B8]/40 shadow-xs shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#1A2340] flex items-center gap-1">
                      <span>{rev.name}</span>
                      <CheckCircle className="w-3 h-3 text-[#00D2B8] fill-[#00D2B8]/20" />
                    </div>
                    <div className="text-[10px] text-[#1A2340]/70">
                      {language === 'vi' ? rev.roleVi : rev.roleEn}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#1A2340]/70 font-semibold">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>{rev.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
