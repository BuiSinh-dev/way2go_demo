import React, { useState } from 'react';
import beFriendSvg from '../../assets/image/common/be_friend.svg';
import { useApp } from '../context/AppContext';
import PartnerModal from './PartnerModal';

function InviteFriends() {
    const { language } = useApp();
    const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

    return (
        <section className="bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-12 sm:mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD5] shadow-xs overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        {/* Left: SVG Illustration */}
                        <div className="md:col-span-5 flex justify-center items-center">
                            <img
                                src={beFriendSvg}
                                alt="Partner network illustration"
                                className="w-full max-w-xs sm:max-w-sm h-auto max-h-[260px] object-contain"
                            />
                        </div>

                        {/* Right: Content matching design screenshot */}
                        <div className="md:col-span-7 text-left space-y-4">
                            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1A2340] tracking-tight leading-tight">
                                {language === 'vi' ? 'Gia nhập Mạng lưới Đối tác Way2Go.' : 'Join Way2Go Partner Network.'}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#1A2340]/80 leading-relaxed max-w-lg">
                                {language === 'vi'
                                    ? 'Kiếm thêm thu nhập thụ động mỗi ngày cùng Way2go, dễ dàng và nhanh chóng.'
                                    : 'Earn passive income every day with Way2Go, easy and fast.'}
                            </p>
                            <div className="pt-2">
                                <button
                                    onClick={() => setIsPartnerModalOpen(true)}
                                    className="px-6 py-3 bg-[#FF7A2F] hover:bg-[#e0651c] text-white text-xs sm:text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center justify-center"
                                >
                                    {language === 'vi' ? 'Gia nhập ngay' : 'Join Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Partner Registration Modal */}
            <PartnerModal
                isOpen={isPartnerModalOpen}
                onClose={() => setIsPartnerModalOpen(false)}
            />
        </section>
    );
}

export default InviteFriends;