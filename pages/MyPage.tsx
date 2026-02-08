
import React, { useState } from 'react';
import { Search, Heart, Clock, ChevronRight, TrendingUp, AlertCircle, CheckCircle2, ExternalLink, MessageSquare, Send, User, Calendar, Lock } from 'lucide-react';
import { useDonors } from '../contexts/DonorContext';
import { Donor } from '../types';

const MyPage: React.FC = () => {
  const { findDonor, addInquiry } = useDonors();
  const [searchName, setSearchName] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [currentDonor, setCurrentDonor] = useState<Donor | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'donation' | 'inquiry'>('donation');
  const [inquiryText, setInquiryText] = useState('');
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);

  const LOGO_URL = "https://blogpfthumb-phinf.pstatic.net/MjAyNTA4MDZfNTEg/MDAxNzU0NDM5NDg5NzEy.I6QoJSowjjdwF4XCSUP_hhuBENI4ib85DSLFOZ-PZygg.KoBEiBvLKsTmR3zuIq50ZnAhhWHjQDrHysXx-6j6Eykg.PNG/%EC%95%84%EB%85%9C%EC%8A%A4%EC%9D%98%EC%A7%91_%EB%A1%9C%EA%B3%A0.png/%EC%95%84%EB%85%9C%EC%8A%A4%EC%9D%98%EC%A7%91+%EB%A1%9C%EA%B3%A0.png";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = findDonor(searchName, searchCode);
    if (found) {
      setCurrentDonor(found);
      setError('');
    } else {
      setCurrentDonor(null);
      setError('정보를 찾을 수 없습니다. 이름과 후원번호를 확인해주세요.');
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDonor || !inquiryText.trim()) return;

    setIsSubmittingInquiry(true);
    setTimeout(() => {
      addInquiry(currentDonor.id, inquiryText);
      setInquiryText('');
      setIsSubmittingInquiry(false);
      // Refresh donor data from context (simulated since we rely on state in context)
      const updatedDonor = findDonor(currentDonor.name, currentDonor.code);
      if (updatedDonor) setCurrentDonor(updatedDonor);
      alert('문의사항이 성공적으로 등록되었습니다. 관리자가 확인 후 답변해 드리겠습니다.');
    }, 800);
  };

  return (
    <div className="py-20 animate-in fade-in duration-700 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 mb-12">
          <img src={LOGO_URL} alt="logo" className="h-20 w-auto" />
          <div>
            <h1 className="font-serif-kr text-3xl font-bold text-stone-800 italic tracking-tight">마이페이지</h1>
            <p className="text-stone-500 mt-2 text-sm font-medium">후원자님의 소중한 정성과 소통의 기록을 관리합니다.</p>
          </div>
        </div>

        {!currentDonor && (
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-stone-200 mb-12">
            <h2 className="font-bold text-xl text-stone-800 mb-8 flex items-center gap-3 font-serif-kr">
              <Search size={24} className="text-amber-600" /> 개인 후원 정보 조회
            </h2>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Donor Name</label>
                <input 
                  type="text" 
                  placeholder="성명을 입력하세요"
                  className="w-full px-6 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all font-bold"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Donor Code</label>
                <input 
                  type="text" 
                  placeholder="후원코드 (숫자)"
                  className="w-full px-6 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all font-bold"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-end">
                <button type="submit" className="w-full h-[60px] bg-stone-800 text-white font-black rounded-2xl hover:bg-stone-900 transition-all shadow-lg active:scale-95 text-lg">
                  내역 조회하기
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 text-sm mt-6 ml-1 flex items-center gap-2 font-bold bg-red-50 p-4 rounded-2xl"><AlertCircle size={18}/> {error}</p>}
          </div>
        )}

        {currentDonor && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Donor Profile Header */}
            <div className="bg-stone-800 rounded-[3rem] p-10 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <img src={LOGO_URL} alt="watermark" className="w-64 h-auto grayscale invert" />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
                <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20 shadow-inner backdrop-blur-sm">
                  <span className="text-4xl font-black text-amber-400">{currentDonor.name[0]}</span>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <h2 className="text-3xl font-black font-serif-kr italic tracking-tight">
                      {currentDonor.name} {currentDonor.baptismalName ? `(${currentDonor.baptismalName})` : ''} 님
                    </h2>
                    <span className="bg-amber-400 text-amber-950 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter">Official Donor</span>
                  </div>
                  <p className="text-stone-400 text-sm mt-3 font-bold">
                    후원코드: <span className="text-white font-mono">{currentDonor.code}</span> • {currentDonor.joinDate} 가입 • <span className="text-amber-400">{currentDonor.donationType}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end relative z-10 mt-10 md:mt-0 pt-10 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 pl-0 md:pl-12">
                <p className="text-stone-400 text-[10px] uppercase font-black tracking-widest mb-2">Total Contribution</p>
                <p className="text-5xl font-black text-amber-400 italic">
                  {(currentDonor.totalDonationAmount || 0).toLocaleString()} <span className="text-sm font-bold not-italic text-stone-300">원</span>
                </p>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="flex gap-2 p-1.5 bg-stone-100 rounded-3xl w-fit">
              <button 
                onClick={() => setActiveTab('donation')}
                className={`px-8 py-3 rounded-2xl font-black text-sm transition-all flex items-center gap-2 ${activeTab === 'donation' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
              >
                <Clock size={16} /> 입금 내역
              </button>
              <button 
                onClick={() => setActiveTab('inquiry')}
                className={`px-8 py-3 rounded-2xl font-black text-sm transition-all flex items-center gap-2 ${activeTab === 'inquiry' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
              >
                <MessageSquare size={16} /> 1:1 비공개 상담
              </button>
            </div>

            {activeTab === 'donation' ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <section className="bg-white rounded-[3rem] border border-stone-200 overflow-hidden shadow-sm">
                    <div className="px-10 py-8 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
                      <h3 className="font-black text-stone-800 flex items-center gap-3 font-serif-kr text-xl italic">
                        <Clock size={24} className="text-amber-600" /> 상세 입금 내역
                      </h3>
                      <span className="bg-stone-200 text-stone-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">History Log</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-stone-50/30 text-stone-400 font-black border-b border-stone-100 uppercase text-[10px] tracking-widest">
                          <tr>
                            <th className="px-10 py-6">Date</th>
                            <th className="px-10 py-6">Memo</th>
                            <th className="px-10 py-6 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                          {currentDonor.donations && currentDonor.donations.length > 0 ? (
                            currentDonor.donations.map((item) => (
                              <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                                <td className="px-10 py-6 text-stone-600 font-bold font-mono">{item.date}</td>
                                <td className="px-10 py-6">
                                  <span className="text-stone-800 font-medium">{item.note || '정기후원'}</span>
                                  {item.bank && <span className="ml-2 text-[10px] bg-stone-100 text-stone-400 px-2 py-0.5 rounded-md font-bold uppercase">{item.bank}</span>}
                                </td>
                                <td className="px-10 py-6 text-stone-900 font-black text-right italic text-lg">
                                  {item.amount.toLocaleString()}<span className="text-xs ml-1 font-bold opacity-50">원</span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr><td colSpan={3} className="px-10 py-20 text-center text-stone-400 italic font-medium">내역이 없습니다.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
                <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-stone-200 shadow-sm flex flex-col justify-center text-center">
                   <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Heart size={32} className="text-amber-600 fill-amber-600" />
                   </div>
                   <h4 className="font-serif-kr text-xl font-bold text-stone-800 mb-4">함께해 주셔서 감사합니다</h4>
                   <p className="text-stone-500 text-sm leading-relaxed italic">
                     "후원자님의 따뜻한 손길은 <br/> 어르신들에게 내일을 꿈꾸는 <br/> 큰 용기가 됩니다."
                   </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Inquiry Form */}
                <div className="bg-white p-10 rounded-[3rem] border border-stone-200 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Lock size={80} className="text-stone-800" />
                   </div>
                   <h3 className="font-serif-kr text-2xl font-bold text-stone-800 mb-6 flex items-center gap-3 italic">
                     <MessageSquare className="text-amber-600" size={28} /> 기관에 문의하기
                   </h3>
                   <form onSubmit={handleSubmitInquiry} className="space-y-4">
                      <div className="relative">
                        <textarea 
                          required
                          rows={4}
                          placeholder="궁금하신 점이나 전하고 싶은 메시지를 남겨주세요. 본 글은 관리자와 작성자 본인만 확인할 수 있는 비공개 상담글입니다."
                          className="w-full px-8 py-6 rounded-[2rem] bg-stone-50 border border-stone-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-stone-700 font-medium leading-relaxed"
                          value={inquiryText}
                          onChange={(e) => setInquiryText(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end">
                        <button 
                          type="submit" 
                          disabled={isSubmittingInquiry}
                          className="bg-stone-900 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-amber-700 transition-all shadow-xl active:scale-95 disabled:opacity-50"
                        >
                          {isSubmittingInquiry ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Send size={20} />}
                          상담 신청하기
                        </button>
                      </div>
                   </form>
                </div>

                {/* Inquiry List */}
                <div className="space-y-6">
                  <h3 className="font-serif-kr text-xl font-bold text-stone-800 ml-2 italic">상담 내역 (비공개)</h3>
                  {currentDonor.inquiries && currentDonor.inquiries.length > 0 ? (
                    currentDonor.inquiries.map((inq) => (
                      <div key={inq.id} className="bg-white rounded-[2.5rem] border border-stone-200 overflow-hidden shadow-sm group">
                        <div className="p-8">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-stone-400 bg-stone-100 px-3 py-1 rounded-full uppercase tracking-widest">{inq.date}</span>
                              {inq.status === 'answered' ? (
                                <span className="text-[10px] font-black text-green-700 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                                  <CheckCircle2 size={12} /> 답변 완료
                                </span>
                              ) : (
                                <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">답변 대기중</span>
                              )}
                            </div>
                            <Lock size={14} className="text-stone-300" />
                          </div>
                          <p className="text-stone-800 font-bold text-lg leading-relaxed mb-6 pl-2 border-l-4 border-stone-200">
                            {inq.question}
                          </p>
                          
                          {inq.answer && (
                            <div className="mt-8 bg-amber-50/50 p-8 rounded-[2rem] border border-amber-100 relative">
                               <div className="absolute top-0 left-8 -translate-y-1/2 bg-amber-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                 Office Response
                               </div>
                               <p className="text-stone-800 font-medium leading-relaxed italic text-base">
                                 "{inq.answer}"
                               </p>
                               <div className="mt-4 flex items-center justify-end gap-2 text-stone-400">
                                  <Calendar size={12} />
                                  <span className="text-[10px] font-bold">{inq.answerDate}</span>
                               </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-stone-300">
                       <MessageSquare size={48} className="mx-auto text-stone-200 mb-4" />
                       <p className="text-stone-400 font-medium italic">문의하신 내역이 없습니다.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-12 flex justify-center">
               <button 
                  onClick={() => setCurrentDonor(null)}
                  className="text-stone-400 hover:text-stone-600 font-black text-xs uppercase tracking-widest border-b border-stone-200 pb-1"
                >
                  로그아웃 및 사용자 변경
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
