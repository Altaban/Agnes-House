
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Stars, CheckCircle, Landmark, Phone, Info, Copy, Check, Sparkles, Gift, Receipt, Coins } from 'lucide-react';
import { ACCOUNTS, CONTACTS } from '../constants';

const DonationInfo: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="pb-24 animate-in fade-in duration-700 font-sans">
      {/* Hero Header */}
      <section className="relative py-24 bg-stone-50 overflow-hidden border-b border-stone-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-100/30 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Heart size={14} className="fill-amber-600" /> Share Your Love
          </div>
          <h1 className="font-serif-kr text-4xl md:text-5xl font-bold text-stone-800 mb-8 leading-tight italic">
            따뜻한 동행, <br className="md:hidden" /> <span className="text-amber-700">후원 안내</span>
          </h1>
          <p className="text-stone-500 text-lg max-w-2xl leading-relaxed font-medium">
            어르신들의 평화로운 노후를 위한 후원자님의 소중한 정성은 <br className="hidden md:block"/> 
            매일의 따뜻한 식사와 깨끗한 잠자리, 그리고 정성 어린 간호로 이어집니다.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        {/* Donation Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { 
              icon: <Receipt className="text-amber-600" size={32} />, 
              title: '법정 기부금 혜택', 
              desc: '지정기부금 단체로서 연말 정산 시 소득공제용 기부금 영수증을 발급해 드립니다.' 
            },
            { 
              icon: <Sparkles className="text-amber-600" size={32} />, 
              title: '감사의 미사 봉헌', 
              desc: '매일 아침 양로원 미사에서 후원자님과 가족분들의 평화와 안녕을 위해 기도합니다.' 
            },
            { 
              icon: <Gift className="text-amber-600" size={32} />, 
              title: '투명한 운영 보고', 
              desc: '보내주신 정성이 어떻게 사용되었는지 정기 소식지와 홈페이지를 통해 공개합니다.' 
            }
          ].map((benefit, idx) => (
            <div key={idx} className="group bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-xl text-stone-800 mb-4 font-serif-kr italic">{benefit.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed font-medium">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* The "Gold Medal" Concept - Special Highlight */}
        <div className="relative mb-32 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-amber-500 rounded-[4rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white rounded-[4rem] p-12 md:p-20 text-center border border-amber-100 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
              <Stars size={200} className="text-amber-800" />
            </div>
            
            <div className="max-w-3xl mx-auto relative z-10">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                <Coins size={40} className="text-amber-700" />
              </div>
              <h2 className="font-serif-kr text-3xl md:text-4xl font-bold text-stone-800 mb-8 italic tracking-tight">
                "우리는 <span className="text-amber-700 underline decoration-amber-300 underline-offset-8">직접 입금</span>해 주시는 분을 <br className="md:hidden" /> <span className="text-amber-900 font-black italic underline decoration-double decoration-amber-500">금메달 회원</span>이라 부릅니다"
              </h2>
              <div className="space-y-6 text-stone-600 text-lg leading-relaxed font-medium italic">
                <p>
                  아녜스의 집은 CMS(자동이체)를 통한 강제 징수를 하지 않습니다. <br className="hidden md:block"/>
                  번거로우시더라도 매달 어르신들을 기억하며 직접 입금해 주시는 그 마음을 
                </p>
                <p className="text-amber-800 font-bold not-italic text-2xl">
                  저희는 세상에서 가장 귀한 정성으로 여깁니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account & Process Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Account Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Landmark className="text-amber-600" size={28} />
              <h2 className="font-serif-kr text-2xl font-bold text-stone-800 italic">후원 계좌 안내</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {ACCOUNTS.map((acc, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:border-amber-400 transition-all group flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-stone-100 text-stone-500 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-tighter">Bank</span>
                      <span className="font-bold text-xl text-stone-800">{acc.bank}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-2xl font-mono font-bold text-stone-700 tracking-tighter group-hover:text-amber-700 transition-colors">
                        {acc.account}
                      </p>
                      <button 
                        onClick={() => handleCopy(acc.account, idx)}
                        className={`p-2 rounded-lg transition-all ${copiedIndex === idx ? 'bg-green-100 text-green-600' : 'bg-stone-50 text-stone-400 hover:bg-amber-50 hover:text-amber-600'}`}
                        title="계좌번호 복사"
                      >
                        {copiedIndex === idx ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                    <p className="text-xs text-stone-400 font-medium mt-2">예금주: <span className="text-stone-600 font-bold">{acc.holder}</span></p>
                  </div>
                  <div className="bg-amber-50/50 px-6 py-4 rounded-2xl border border-amber-100/50 text-center min-w-[140px]">
                    <p className="text-[10px] text-amber-600 font-black uppercase mb-1">Status</p>
                    <p className="text-sm font-bold text-amber-800">입금 즉시 확인</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-stone-50 rounded-3xl border border-dashed border-stone-200 flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Info size={20} className="text-amber-600" />
              </div>
              <p className="text-xs text-stone-500 leading-relaxed font-medium italic">
                * 위 계좌는 천사의 모후원 아녜스의 집 공식 후원 계좌입니다. <br/>
                * 입금 시 <span className="text-amber-700 font-bold">후원자님의 성함</span>으로 입금해 주시면 더욱 정확한 관리가 가능합니다.
              </p>
            </div>
          </div>

          {/* Contact & Support Step */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
              <h3 className="font-serif-kr text-2xl font-bold mb-8 flex items-center gap-3 italic">
                <Phone size={24} className="text-amber-400" /> 후원 문의
              </h3>
              
              <div className="space-y-10 relative z-10">
                <div className="flex items-center justify-between group">
                  <div>
                    <p className="text-[10px] text-stone-500 font-black uppercase tracking-widest mb-1">Donation Dept.</p>
                    <p className="text-2xl font-bold tracking-tighter group-hover:text-amber-400 transition-colors">{CONTACTS.donation}</p>
                    <p className="text-xs text-stone-500 mt-1 italic font-medium">천사의 모후원 사무실</p>
                  </div>
                  <a href={`tel:${CONTACTS.donation}`} className="p-4 bg-white/10 rounded-2xl hover:bg-amber-500 transition-all">
                    <Phone size={20} />
                  </a>
                </div>

                <div className="flex items-center justify-between group">
                  <div>
                    <p className="text-[10px] text-stone-500 font-black uppercase tracking-widest mb-1">Facility Inquiry</p>
                    <p className="text-2xl font-bold tracking-tighter group-hover:text-amber-400 transition-colors">{CONTACTS.admission}</p>
                    <p className="text-xs text-stone-500 mt-1 italic font-medium">아녜스의 집 (율전동)</p>
                  </div>
                  <a href={`tel:${CONTACTS.admission}`} className="p-4 bg-white/10 rounded-2xl hover:bg-amber-500 transition-all">
                    <Phone size={20} />
                  </a>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-xs text-amber-400 font-bold mb-6 text-center italic">
                    "입금 후 아래 신청서를 작성해 주시면 <br/> 즉시 후원자 코드를 발급해 드립니다."
                  </p>
                  <Link 
                    to="/apply" 
                    className="flex items-center justify-center gap-3 w-full bg-white text-stone-900 py-5 rounded-2xl font-black text-lg hover:bg-amber-400 hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                  >
                    온라인 후원 신청 <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Step Mini Guide */}
            <div className="bg-white rounded-[3rem] p-10 border border-stone-100 shadow-sm">
              <h4 className="font-bold text-stone-800 mb-6 flex items-center gap-2 font-serif-kr italic">후원 참여 방법</h4>
              <div className="space-y-6">
                {[
                  { step: '01', text: '후원 계좌로 직접 입금하기' },
                  { step: '02', text: '온라인 신청서 작성하기' },
                  { step: '03', text: '문자로 발급된 후원코드 확인' }
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-lg font-black text-amber-200 font-mono">{s.step}</span>
                    <p className="text-sm text-stone-600 font-bold">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArrowRight: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default DonationInfo;
