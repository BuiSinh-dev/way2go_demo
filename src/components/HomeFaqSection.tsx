import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQS_DATA } from '../data/faqs';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import writingQuestionImg from '../../assets/image/header/writing_quetion.svg';

export const HomeFaqSection: React.FC = () => {
  const { language, navigateToHelps } = useApp();
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // Top 5 most critical FAQs for the homepage
  const homeFaqs = FAQS_DATA.slice(0, 5);

  return (
    <section className="py-16 bg-[#FAF5EE] border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header: Title Left, Button Right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2340] tracking-tight">
            {language === 'vi' ? 'Câu hỏi thường gặp' : 'Frequently Asked Questions'}
          </h2>

          <button
            onClick={() => navigateToHelps()}
            className="bg-white hover:bg-slate-50 text-[#1A2340] font-bold text-xs sm:text-sm px-6 py-3 rounded-full border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            {language === 'vi' ? 'Vào trung tâm hỗ trợ' : 'Visit Help Center'}
          </button>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: FAQ Accordions (7 cols) */}
          <div className="lg:col-span-7 space-y-3 text-left flex flex-col justify-between">
            {homeFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-sm transition-all"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer text-[#1A2340]"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#1A2340] leading-snug">
                      {language === 'vi' ? faq.questionVi : faq.questionEn}
                    </span>
                    <div className="text-slate-400 shrink-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#1A2340]" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#1A2340]/80 leading-relaxed border-t border-slate-100 pt-3 bg-white">
                      {language === 'vi' ? faq.answerVi : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Support Card with Illustration (5 cols) */}
          <div className="lg:col-span-5 flex">
            <div className="w-full bg-white rounded-[32px] p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col justify-between relative overflow-hidden">
              
              {/* Top Content Area inside Support Card */}
              <div className="text-left space-y-4 relative z-10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'vi' ? 'HỖ TRỢ' : 'SUPPORT'}
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-[#1A2340] leading-snug">
                  {language === 'vi'
                    ? 'Bạn cần trợ giúp? Chúng tôi cung cấp hỗ trợ đa ngôn ngữ 24/7'
                    : 'Need help? We offer 24/7 multilingual support'}
                </h3>

                <div className="pt-2 space-y-3">
                  <div>
                    <a
                      href="#support"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToHelps();
                      }}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1A2340] hover:text-[#00D2B8] transition-colors group"
                    >
                      <span>{language === 'vi' ? 'Liên hệ với bộ phận hỗ trợ.' : 'Contact Support'}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div>
                    <a
                      href="https://wa.me/84900000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1A2340] hover:text-[#00D2B8] transition-colors group"
                    >
                      <span>{language === 'vi' ? 'Trò chuyện trên WhatsApp' : 'Chat on WhatsApp'}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Illustration Positioned at Bottom Right */}
              <div className="mt-6 flex justify-end items-end relative z-0 pt-4">
                <img
                  src={writingQuestionImg}
                  alt="Support Illustration"
                  className="w-full max-w-[260px] sm:max-w-[290px] h-auto object-contain"
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

