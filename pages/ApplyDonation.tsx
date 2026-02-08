
import React, { useState } from 'react';
import { Heart, Check, Landmark, Info, MessageSquare, Smartphone, Loader2, MapPin, Fingerprint } from 'lucide-react';
import { ACCOUNTS } from '../constants';
import { useDonors } from '../contexts/DonorContext';

const ApplyDonation: React.FC = () => {
  const { addDonor } = useDonors();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    amount: '30000',
    type: '정기후원',
    note: '',
    bankChoice: '농협은행',
    registrationNumber: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 실제 데이터베이스(Context)에 등록
    setTimeout(() => {
      const newCode = addDonor({
        name: formData.name,
        contact: formData.phone,
        email: formData.email,
        address: formData.address,
        donationType: formData.type,
        registrationNumber: formData.registrationNumber,
        bank: formData.bankChoice,
        joinDate: new Date().toISOString().split('T')[0],
        note: formData.note,
        baptismalName: '' // 필요한 경우 세례명 입력 칸 추가 가능
      });
      
      setGeneratedCode(newCode);
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (submitted) {
    const selectedAccount = ACCOUNTS.find(a => a.bank === formData.bankChoice);
    
    return (
      <div className="py-20 max-w-2xl mx-auto px-4 animate-in fade-in zoom-in duration-500 font-sans">
        <div className="mb-10 transform hover:scale-[1.02] transition-transform">
          <div className="bg-stone-800 rounded-3xl p-6 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <div className="flex items-start gap-4">
              <div className="bg-amber-500 p-2 rounded-xl text-stone-900">
                <MessageSquare size={20} fill="currentColor" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">SMS 안내 발송 완료</span>
                  <span className="text-stone-500 text-[10px]">방금 전</span>
                </div>
                <div className="bg-stone-900/50 rounded-2xl p-4 text-stone-200 text-sm leading-relaxed border border-white/5">
                  <p className="font-bold text-white mb-2">[천사의 모후원 아녜스의 집]</p>
                  <p>{formData.name} 후원자님, 따뜻한 나눔에 진심으로 감사드립니다.</p>
                  <div className="my-2 py-2 border-y border-white/5 text-stone-400 text-xs">
                    • 약정내용: {formData.type} ({Number(formData.amount).toLocaleString()}원)<br/>
                    • 입금계좌: {selectedAccount?.bank} {selectedAccount?.account}<br/>
                    • <span className="text-amber-400 font-bold">후원코드: {generatedCode}</span>
                  </div>
                  <p>위 코드는 마이페이지 조회 시 필요하오니 보관 부탁드립니다. 평화를 빕니다.</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-[10px] text-stone-400 mt-3 font-medium flex items-center justify-center gap-1">
            <Smartphone size={12} /> 입력하신 번호({formData.phone})로 안내 문자가 발송되었습니다.
          </p>
        </div>

        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
            <Check className="text-green-600" size={40} strokeWidth={3} />
          </div>
          <h1 className="font-serif-kr text-3xl font-bold text-stone-800 italic">후원 신청 완료</h1>
          
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm text-left">
            <h3 className="font-bold text-stone-800 mb-6 flex items-center gap-2 border-b pb-4 border-stone-100 font-serif-kr">
              <Landmark size={20} className="text-amber-600" /> 입금 정보 확인
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-stone-50 p-4 rounded-2xl">
                <span className="text-stone-500 text-sm">나의 후원코드</span>
                <span className="text-2xl font-black text-amber-600 font-mono tracking-tighter">{generatedCode}</span>
              </div>
              <div className="p-5 rounded-2xl border-2 border-amber-100 bg-amber-50/30">
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-1">입금 계좌</p>
                <p className="text-lg font-bold text-stone-800">{selectedAccount?.bank}</p>
                <p className="text-2xl font-mono text-amber-800 font-bold my-1 tracking-tight">{selectedAccount?.account}</p>
                <p className="text-sm text-stone-500">예금주: {selectedAccount?.holder}</p>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-stone-400 leading-relaxed italic">
              * 정기후원자는 은행 앱에서 위 계좌로 <span className="text-stone-700 font-bold">'매월 자동이체'</span>를 직접 등록해 주세요.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => window.location.hash = '#/'}
              className="w-full bg-stone-800 text-white py-4 rounded-2xl font-bold hover:bg-stone-900 transition-all shadow-lg active:scale-[0.98]"
            >
              홈으로 돌아가기
            </button>
            <button 
              onClick={() => window.location.hash = '#/mypage'}
              className="w-full bg-white text-stone-600 py-4 rounded-2xl font-bold border border-stone-200 hover:bg-stone-50 transition-all active:scale-[0.98]"
            >
              내 후원내역 확인하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 animate-in fade-in duration-700">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-amber-50 rounded-3xl mb-4 shadow-inner">
            <Heart className="text-amber-600 fill-amber-600" size={32} />
          </div>
          <h1 className="font-serif-kr text-4xl font-bold text-stone-800 italic tracking-tight">사랑의 후원 신청</h1>
          <p className="text-stone-500 mt-4 leading-relaxed font-medium">
            어르신들의 따뜻한 보금자리를 위해 <br className="hidden md:block"/>
            직접 입금해주시는 정성어린 마음을 기다립니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-stone-200 space-y-8 relative">
          {isSubmitting && (
            <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center">
              <Loader2 className="text-amber-600 animate-spin mb-4" size={48} />
              <p className="font-bold text-stone-800 animate-pulse">안내 문자 발송 및 약정 처리 중...</p>
            </div>
          )}

          <div className="space-y-6">
            <h3 className="font-serif-kr text-xl font-bold text-stone-800 border-l-4 border-amber-600 pl-3">기본 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">성명 / 단체명</label>
                <input 
                  required
                  type="text" 
                  placeholder="성함 또는 단체명"
                  className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">연락처</label>
                <input 
                  required
                  type="tel" 
                  placeholder="010-0000-0000"
                  className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider flex items-center gap-1.5">
                  <Fingerprint size={14} className="text-stone-400" /> 주민등록번호 / 사업자번호
                </label>
                <input 
                  type="text" 
                  placeholder="영수증 발급용 (선택사항)"
                  className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                />
                <p className="text-[10px] text-stone-400 ml-1 italic">* 기부금 영수증 발급을 원하실 경우 입력해 주세요.</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">이메일</label>
                <input 
                  type="email" 
                  placeholder="example@mail.com"
                  className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={14} className="text-stone-400" /> 주소 (우편물 수령지)
              </label>
              <input 
                type="text" 
                placeholder="도로명 주소 또는 지번 주소를 입력해 주세요"
                className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-sm"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-6 pt-4 border-t border-stone-100">
            <h3 className="font-serif-kr text-xl font-bold text-stone-800 border-l-4 border-amber-600 pl-3">후원 약정</h3>
            <div className="space-y-4">
              <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">후원 종류 및 입금 계좌 선택</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`py-4 rounded-2xl border text-sm transition-all shadow-sm ${formData.type === '정기후원' ? 'bg-stone-800 text-white border-stone-800 font-bold' : 'bg-white text-stone-500 border-stone-200 hover:border-amber-500'}`}
                  onClick={() => setFormData({...formData, type: '정기후원'})}
                >
                  정기후원 (직접 입금)
                </button>
                <button
                  type="button"
                  className={`py-4 rounded-2xl border text-sm transition-all shadow-sm ${formData.type === '일시후원' ? 'bg-stone-800 text-white border-stone-800 font-bold' : 'bg-white text-stone-500 border-stone-200 hover:border-amber-500'}`}
                  onClick={() => setFormData({...formData, type: '일시후원'})}
                >
                  일시후원
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ACCOUNTS.map(acc => (
                  <button
                    key={acc.bank}
                    type="button"
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center group ${formData.bankChoice === acc.bank ? 'border-amber-500 bg-amber-50 shadow-md ring-1 ring-amber-500' : 'border-stone-200 bg-white hover:border-amber-300 hover:bg-stone-50'}`}
                    onClick={() => setFormData({...formData, bankChoice: acc.bank})}
                  >
                    <span className={`text-xs font-bold mb-1 ${formData.bankChoice === acc.bank ? 'text-amber-800' : 'text-stone-700'}`}>
                      {acc.bank}
                    </span>
                    <span className={`text-[10px] font-mono tracking-tight leading-tight ${formData.bankChoice === acc.bank ? 'text-amber-600' : 'text-stone-400'}`}>
                      {acc.account}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">입금 예정 금액</label>
              <div className="relative">
                <input 
                  required
                  type="number" 
                  placeholder="30000"
                  className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all pr-12 font-bold text-lg"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 font-bold">원</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">기도 지향 (매일 아침 미사 봉헌)</label>
              <textarea 
                rows={3}
                placeholder="후원자님 또는 가족을 위한 기도가 필요하시면 남겨주세요."
                className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-stone-800 text-white py-5 rounded-2xl font-bold text-lg hover:bg-stone-900 shadow-xl transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              사랑의 후원 약정하기
            </button>
            <div className="flex items-start gap-2 mt-4 px-2">
              <Info size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-stone-400 leading-relaxed italic">
                신청 즉시 입력하신 번호로 후원코드와 계좌번호가 포함된 안내 문자가 발송됩니다.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyDonation;
