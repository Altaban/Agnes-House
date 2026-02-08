
import React, { useState, useRef } from 'react';
import { Users, Search, PlusCircle, Database, DollarSign, X, Save, Landmark, Lock, ShieldAlert, UserPlus, MapPin, Fingerprint, Mail, Phone, FileSpreadsheet, FileUp, Edit, Trash2, MessageSquare, Send, CheckCircle2, MessageCircle, Info, Calendar, User, ExternalLink, Hash, Image as ImageIcon, RotateCcw, Upload } from 'lucide-react';
import { useDonors } from '../contexts/DonorContext';
import { ACCOUNTS } from '../constants';
import { Donor, Inquiry } from '../types';

const AdminPage: React.FC = () => {
  const { donors, appImages, addDonation, addDonor, updateDonor, deleteDonor, answerInquiry, updateAppImage, resetImages, exportData, importData, getNextCode, stats } = useDonors();
  const LOGO_URL = "https://blogpfthumb-phinf.pstatic.net/MjAyNTA4MDZfNTEg/MDAxNzU0NDM5NDg5NzEy.I6QoJSowjjdwF4XCSUP_hhuBENI4ib85DSLFOZ-PZygg.KoBEiBvLKsTmR3zuIq50ZnAhhWHjQDrHysXx-6j6Eykg.PNG/%EC%95%84%EB%85%9C%EC%8A%A4%EC%9D%98%EC%A7%91_%EB%A1%9C%EA%B3%A0.png/%EC%95%84%EB%85%9C%EC%8A%A4%EC%9D%98%EC%A7%91+%EB%A1%9C%EA%B3%A0.png";
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'members' | 'inquiries' | 'images'>('members');

  // Management State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
  const [detailDonor, setDetailDonor] = useState<Donor | null>(null);

  // Inquiry Response State
  const [respondingInquiry, setRespondingInquiry] = useState<{donorId: string, inq: Inquiry} | null>(null);
  const [answerText, setAnswerText] = useState('');

  // Add Donation Form State
  const [newAmount, setNewAmount] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newBank, setNewBank] = useState('농협은행');

  // Register/Edit Form State
  const [memberForm, setMemberForm] = useState({
    name: '',
    baptismalName: '',
    contact: '010-',
    email: '',
    address: '',
    bank: '농협은행',
    donationType: '정기후원',
    registrationNumber: '',
    joinDate: new Date().toISOString().split('T')[0],
    note: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [currentImageKey, setCurrentImageKey] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1004') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPasswordInput('');
    }
  };

  const handleImageUpload = (key: string) => {
    setCurrentImageKey(key);
    imageInputRef.current?.click();
  };

  const onImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentImageKey) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      updateAppImage(currentImageKey, base64);
      alert('이미지가 성공적으로 교체되었습니다.');
      setCurrentImageKey(null);
    };
    reader.readAsDataURL(file);
  };

  const allInquiries = donors.flatMap(d => 
    (d.inquiries || []).map(inq => ({
      donorId: d.id,
      donorName: d.name,
      donorCode: d.code,
      ...inq
    }))
  ).sort((a, b) => b.id.localeCompare(a.id));

  const filteredDonors = donors
    .filter(d => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.code.includes(searchTerm) ||
      (d.baptismalName && d.baptismalName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (d.contact && d.contact.includes(searchTerm))
    )
    .sort((a, b) => parseInt(b.code) - parseInt(a.code));

  const handleAddDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDonor || !newAmount) return;

    addDonation(selectedDonor.id, Number(newAmount), newNote, newBank);
    alert(`${selectedDonor.name}님에게 ${Number(newAmount).toLocaleString()}원 입금 기록을 추가했습니다.`);
    setNewAmount('');
    setNewNote('');
    setShowAddModal(false);
    setSelectedDonor(null);
  };

  const handleAnswerInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondingInquiry || !answerText.trim()) return;

    answerInquiry(respondingInquiry.donorId, respondingInquiry.inq.id, answerText);
    alert('답변이 성공적으로 등록되었습니다.');
    setRespondingInquiry(null);
    setAnswerText('');
  };

  const handleRegisterDonor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name) {
      alert('성명은 필수 입력 사항입니다.');
      return;
    }

    const assignedCode = addDonor(memberForm);
    alert(`${memberForm.name}님을 후원코드 ${assignedCode}번으로 등록했습니다.`);
    setShowRegisterModal(false);
    resetMemberForm();
  };

  const handleEditDonor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDonor) return;

    updateDonor(editingDonor.id, memberForm);
    alert(`${memberForm.name}님의 정보가 수정되었습니다.`);
    setShowEditModal(false);
    setEditingDonor(null);
    resetMemberForm();
  };

  const handleDeleteDonor = (donor: Donor) => {
    if (window.confirm(`${donor.name}(${donor.code})님의 정보를 시스템에서 영구히 삭제하시겠습니까?`)) {
      deleteDonor(donor.id);
      alert('삭제되었습니다.');
    }
  };

  const resetMemberForm = () => {
    setMemberForm({
      name: '', baptismalName: '', contact: '010-', email: '', 
      address: '', bank: '농협은행', donationType: '정기후원', 
      registrationNumber: '', joinDate: new Date().toISOString().split('T')[0], note: ''
    });
  };

  const openEditModal = (donor: Donor) => {
    setEditingDonor(donor);
    setMemberForm({
      name: donor.name,
      baptismalName: donor.baptismalName || '',
      contact: donor.contact || '010-',
      email: donor.email || '',
      address: donor.address || '',
      bank: donor.bank || '농협은행',
      donationType: donor.donationType,
      registrationNumber: donor.registrationNumber || '',
      joinDate: donor.joinDate,
      note: donor.note || ''
    });
    setShowEditModal(true);
  };

  const openDetailModal = (donor: Donor) => {
    setDetailDonor(donor);
    setShowDetailModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as ArrayBuffer;
      const result = importData(content);
      if (result.success) {
        alert(`파일에서 ${result.count}명의 데이터를 성공적으로 가져왔습니다.`);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        alert('올바른 파일 형식이 아니거나 데이터가 없습니다.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-stone-50">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in duration-500">
          <div className="bg-stone-800 p-10 text-center text-white relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6 border border-white/20 overflow-hidden">
              <img src={LOGO_URL} alt="admin logo" className="w-4/5 h-auto object-contain brightness-110" />
            </div>
            <h2 className="font-serif-kr text-2xl font-bold italic mb-2">관리자 전용</h2>
            <p className="text-stone-400 text-sm font-medium">허가된 담당자만 접근 가능합니다.</p>
          </div>
          <form onSubmit={handleLogin} className="p-10 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-widest">Access Password</label>
              <input type="password" placeholder="비밀번호를 입력하세요" className={`w-full px-5 py-4 rounded-2xl bg-stone-50 border transition-all outline-none text-center font-bold tracking-[0.5em] text-xl ${authError ? 'border-red-400 ring-2 ring-red-100' : 'border-stone-200 focus:ring-2 focus:ring-amber-500'}`} value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value); setAuthError(false); }} autoFocus />
              {authError && <p className="text-red-500 text-[11px] font-bold mt-2 text-center flex items-center justify-center gap-1"><ShieldAlert size={14} /> 비밀번호가 올바르지 않습니다.</p>}
            </div>
            <button type="submit" className="w-full bg-stone-800 text-white py-4 rounded-2xl font-bold text-lg hover:bg-stone-900 shadow-lg active:scale-[0.98] transition-all">로그인</button>
          </form>
        </div>
      </div>
    );
  }

  const IMAGE_LABELS: Record<string, string> = {
    HOME_HERO: "홈페이지 메인 배경 (85vh)",
    ABOUT_EXTERIOR: "기관 소개 - 건물 외관 전경",
    ABOUT_ALTAR: "기관 소개 - 성당 제대",
    DAILY_LIVING_ROOM: "아녜스의 집 - 거실",
    DAILY_DINING: "아녜스의 집 - 식당",
    DAILY_BEDROOM: "아녜스의 집 - 생활실(침실)",
    DAILY_BATH: "아녜스의 집 - 목욕탕/세탁실",
    DAILY_GARDEN: "아녜스의 집 - 산책로 정원"
  };

  return (
    <div className="py-12 bg-stone-50 min-h-screen font-sans animate-in fade-in duration-500">
      <div className="max-w-[98%] mx-auto px-4">
        {/* Dashboard Header */}
        <div className="flex flex-col xl:flex-row justify-between items-center mb-10 gap-6 border-b border-stone-200 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Database className="text-amber-700" size={32} />
              <h1 className="font-serif-kr text-3xl font-bold text-stone-800 italic">후원 관리 담당자실</h1>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <button onClick={() => setActiveTab('members')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'members' ? 'bg-stone-800 text-white shadow-lg' : 'bg-white text-stone-400 border border-stone-200'}`}>
                <Users size={14} /> 후원자 관리
              </button>
              <button onClick={() => setActiveTab('inquiries')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === 'inquiries' ? 'bg-stone-800 text-white shadow-lg' : 'bg-white text-stone-400 border border-stone-200'}`}>
                <MessageCircle size={14} /> 1:1 상담
                {allInquiries.some(i => i.status === 'pending') && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}
              </button>
              <button onClick={() => setActiveTab('images')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'images' ? 'bg-stone-800 text-white shadow-lg' : 'bg-white text-stone-400 border border-stone-200'}`}>
                <ImageIcon size={14} /> 이미지 관리
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => { resetMemberForm(); setShowRegisterModal(true); }} className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-amber-700 transition-all shadow-md active:scale-95"><UserPlus size={18} /> 신규 등록</button>
            <button onClick={exportData} className="flex items-center gap-2 bg-white text-stone-700 px-4 py-2.5 rounded-xl font-bold border border-stone-200 hover:bg-stone-50 transition-all shadow-sm"><FileSpreadsheet size={18} className="text-green-600" /> Excel 백업</button>
            <input type="file" accept=".xlsx, .xls, .csv, .json" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-stone-900 transition-all shadow-md active:scale-95"><FileUp size={18} /> 데이터 업로드</button>
          </div>
        </div>

        {activeTab === 'members' ? (
          <>
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-100 bg-stone-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input type="text" placeholder="성명, 코드, 연락처 검색..." className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="flex items-center gap-4 text-[11px] font-bold text-stone-400">
                  <span className="flex items-center gap-1"><Users size={14}/> 총 {stats.donorCount}명</span>
                  <span className="flex items-center gap-1"><DollarSign size={14}/> 누적 {stats.totalAmount.toLocaleString()}원</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-100 uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">코드</th>
                      <th className="px-6 py-4">성명 (세례명)</th>
                      <th className="px-6 py-4">연락처 / 이메일</th>
                      <th className="px-6 py-4">주민 / 사업자번호</th>
                      <th className="px-6 py-4 text-right">누적액</th>
                      <th className="px-6 py-4 text-center">연락</th>
                      <th className="px-6 py-4 text-center">작업</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {filteredDonors.map(donor => (
                      <tr key={donor.id} className="hover:bg-amber-50/20 transition-colors group">
                        <td className="px-6 py-4 font-mono font-bold">
                          <button onClick={() => openDetailModal(donor)} className="text-amber-700 hover:underline flex items-center gap-1">
                            <Hash size={10} /> {donor.code}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => openDetailModal(donor)} className="text-stone-800 font-bold hover:text-amber-700 hover:underline">
                            {donor.name} {donor.baptismalName ? <span className="text-stone-400 font-medium ml-1">({donor.baptismalName})</span> : ''}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-stone-600 font-medium">{donor.contact}</span>
                            <span className="text-[10px] text-stone-400">{donor.email || '-'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-stone-600 font-medium">
                          {donor.registrationNumber || '-'}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-stone-800">
                          {donor.totalDonationAmount.toLocaleString()}원
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                             <a href={`tel:${donor.contact}`} className="p-2 bg-stone-100 rounded-lg text-stone-500 hover:bg-amber-500 hover:text-white transition-all shadow-sm" title="문자/전화">
                                <Phone size={14} />
                             </a>
                             <a href={`mailto:${donor.email}`} className={`p-2 bg-stone-100 rounded-lg text-stone-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm ${!donor.email && 'opacity-30 pointer-events-none'}`} title="이메일">
                                <Mail size={14} />
                             </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => { setSelectedDonor(donor); setShowAddModal(true); }} className="bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700 transition-all shadow-sm" title="입금 추가"><PlusCircle size={14} /></button>
                            <button onClick={() => openEditModal(donor)} className="bg-stone-800 text-white p-2 rounded-lg hover:bg-stone-900 transition-all shadow-sm" title="정보 수정"><Edit size={14} /></button>
                            <button onClick={() => handleDeleteDonor(donor)} className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm" title="삭제"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : activeTab === 'inquiries' ? (
          <div className="space-y-6">
             <h2 className="font-serif-kr text-2xl font-bold text-stone-800 italic mb-6">1:1 상담 문의 관리</h2>
             {allInquiries.map(inq => (
               <div key={inq.id} className={`bg-white rounded-3xl border ${inq.status === 'pending' ? 'border-amber-400' : 'border-stone-200'} p-8 shadow-sm`}>
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <span className="font-bold text-stone-800">{inq.donorName} ({inq.donorCode})</span>
                        <span className="text-[10px] text-stone-400">{inq.date}</span>
                     </div>
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${inq.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        {inq.status === 'pending' ? '답변 대기' : '답변 완료'}
                     </span>
                  </div>
                  <p className="text-stone-700 mb-6 bg-stone-50 p-4 rounded-xl">{inq.question}</p>
                  {inq.status === 'pending' ? (
                     <button onClick={() => setRespondingInquiry({ donorId: inq.donorId, inq: inq as Inquiry })} className="bg-stone-800 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-amber-700 transition-all">답변 작성하기</button>
                  ) : (
                     <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                        <p className="text-xs text-stone-400 font-bold mb-1 uppercase tracking-widest">Response</p>
                        <p className="text-sm font-medium">{inq.answer}</p>
                     </div>
                  )}
               </div>
             ))}
          </div>
        ) : (
          <div className="space-y-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif-kr text-2xl font-bold text-stone-800 italic">이미지 라이브러리 관리</h2>
                <p className="text-stone-500 text-sm mt-1">홈페이지 곳곳의 임시 사진을 실제 시설 사진으로 교체해 주세요.</p>
              </div>
              <button onClick={() => { if(window.confirm('모든 이미지를 기본값으로 되돌리시겠습니까?')) resetImages(); }} className="flex items-center gap-2 text-red-500 font-bold text-xs hover:bg-red-50 px-4 py-2 rounded-xl transition-all border border-red-100">
                <RotateCcw size={14} /> 모든 이미지 초기화
              </button>
            </div>

            <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={onImageFileChange} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.keys(IMAGE_LABELS).map((key) => (
                <div key={key} className="bg-white rounded-[2rem] border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="aspect-video relative bg-stone-100 flex items-center justify-center overflow-hidden">
                    <img src={appImages[key]} alt={key} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button onClick={() => handleImageUpload(key)} className="bg-white text-stone-800 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xl hover:bg-amber-500 hover:text-white transition-all">
                        <Upload size={14} /> 사진 교체하기
                      </button>
                    </div>
                    {appImages[key].startsWith('data:image') && (
                      <div className="absolute top-4 right-4 bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-white/20 uppercase">Custom</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-sm font-bold text-stone-800 mb-1">{IMAGE_LABELS[key]}</h4>
                    <p className="text-[10px] text-stone-400 uppercase tracking-tighter">{key}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Donor Detail View Modal */}
      {showDetailModal && detailDonor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[3rem] w-full max-w-4xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="bg-stone-800 p-8 text-white flex justify-between items-center relative">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                       <User size={32} className="text-amber-400" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-serif-kr italic font-bold">{detailDonor.name} 후원자 프로필</h3>
                       <p className="text-stone-400 text-xs font-mono">CODE: {detailDonor.code} • JOINED: {detailDonor.joinDate}</p>
                    </div>
                 </div>
                 <button onClick={() => setShowDetailModal(false)} className="hover:text-amber-400 transition-colors"><X size={28} /></button>
              </div>
              
              <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                 <div className="md:col-span-1 space-y-6">
                    <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                       <p className="text-[10px] font-black text-stone-400 uppercase mb-4 tracking-widest border-b pb-2">Basic Information</p>
                       <div className="space-y-4">
                          <div><p className="text-[9px] text-stone-400 font-bold">세례명</p><p className="font-bold">{detailDonor.baptismalName || '-'}</p></div>
                          <div><p className="text-[9px] text-stone-400 font-bold">연락처</p><p className="font-bold text-amber-700">{detailDonor.contact}</p></div>
                          <div><p className="text-[9px] text-stone-400 font-bold">이메일</p><p className="font-medium text-xs break-all">{detailDonor.email || '-'}</p></div>
                          <div><p className="text-[9px] text-stone-400 font-bold">주민/사업자번호</p><p className="font-medium">{detailDonor.registrationNumber || '-'}</p></div>
                          <div><p className="text-[9px] text-stone-400 font-bold">주소</p><p className="text-xs font-medium leading-relaxed">{detailDonor.address || '-'}</p></div>
                       </div>
                    </div>
                    <div className="bg-stone-900 text-white p-6 rounded-3xl shadow-lg">
                       <p className="text-amber-400 text-[10px] font-black uppercase mb-2">Financial Summary</p>
                       <p className="text-3xl font-black italic">{detailDonor.totalDonationAmount.toLocaleString()}<span className="text-xs not-italic ml-1">원</span></p>
                       <p className="text-[10px] text-stone-500 mt-4">후원구분: {detailDonor.donationType}</p>
                       <p className="text-[10px] text-stone-500">주거래은행: {detailDonor.bank}</p>
                    </div>
                 </div>

                 <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
                       <div className="px-6 py-4 bg-stone-50 border-b border-stone-100 flex justify-between items-center">
                          <h4 className="font-bold text-stone-800 text-sm flex items-center gap-2 italic"><Clock size={16} className="text-amber-600" /> 입금 히스토리</h4>
                          <span className="text-[10px] bg-stone-200 px-2 py-0.5 rounded font-black">{detailDonor.donations?.length || 0} Records</span>
                       </div>
                       <div className="max-h-[350px] overflow-y-auto">
                          <table className="w-full text-xs text-left">
                             <thead className="sticky top-0 bg-stone-100/80 backdrop-blur-sm text-stone-400 font-black uppercase text-[9px]">
                                <tr>
                                   <th className="px-6 py-3">Date</th>
                                   <th className="px-6 py-3">Note</th>
                                   <th className="px-6 py-3 text-right">Amount</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-stone-50">
                                {detailDonor.donations && detailDonor.donations.length > 0 ? detailDonor.donations.map(d => (
                                   <tr key={d.id} className="hover:bg-amber-50/30">
                                      <td className="px-6 py-4 font-mono">{d.date}</td>
                                      <td className="px-6 py-4 font-medium text-stone-600">{d.note || '-'}</td>
                                      <td className="px-6 py-4 text-right font-black text-stone-800 italic">{d.amount.toLocaleString()}원</td>
                                   </tr>
                                )) : (
                                   <tr><td colSpan={3} className="px-6 py-10 text-center italic text-stone-300">데이터가 없습니다.</td></tr>
                                )}
                             </tbody>
                          </table>
                       </div>
                    </div>
                    <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                       <h4 className="text-xs font-black text-amber-700 uppercase mb-2 italic">관리자 메모 / 지향</h4>
                       <p className="text-sm font-medium text-amber-900 leading-relaxed italic">"{detailDonor.note || '등록된 메모가 없습니다.'}"</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Register/Edit Member Modal */}
      {(showRegisterModal || showEditModal) && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-white rounded-[3rem] w-full max-w-3xl my-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-stone-800 p-8 text-white relative flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                 {showEditModal ? <Edit className="text-amber-400" /> : <UserPlus className="text-amber-400" />}
              </div>
              <div>
                <h3 className="text-2xl font-serif-kr italic font-bold">
                  {showEditModal ? `후원자 정보 수정 (${editingDonor?.code})` : '신규 후원자 시스템 등록'}
                </h3>
                <p className="text-stone-400 text-xs">필수 정보를 모두 입력해 주세요.</p>
              </div>
              <button onClick={() => { setShowRegisterModal(false); setShowEditModal(false); }} className="absolute top-8 right-8 hover:text-amber-400 transition-colors"><X size={28} /></button>
            </div>
            
            <form onSubmit={showEditModal ? handleEditDonor : handleRegisterDonor} className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5 ml-1"><User size={12}/> 성명 / 단체명 <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold" value={memberForm.name} onChange={(e) => setMemberForm({...memberForm, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5 ml-1"><Info size={12}/> 세례명</label>
                  <input type="text" className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold" value={memberForm.baptismalName} onChange={(e) => setMemberForm({...memberForm, baptismalName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5 ml-1"><Phone size={12}/> 연락처 <span className="text-red-500">*</span></label>
                  <input required type="tel" className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold" value={memberForm.contact} onChange={(e) => setMemberForm({...memberForm, contact: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5 ml-1"><Mail size={12}/> 이메일 주소</label>
                  <input type="email" className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold" value={memberForm.email} onChange={(e) => setMemberForm({...memberForm, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5 ml-1"><Fingerprint size={12}/> 주민 / 사업자 번호</label>
                  <input type="text" placeholder="기부금 영수증 발급용" className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold" value={memberForm.registrationNumber} onChange={(e) => setMemberForm({...memberForm, registrationNumber: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5 ml-1"><Calendar size={12}/> 가입 일자</label>
                  <input type="date" className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold" value={memberForm.joinDate} onChange={(e) => setMemberForm({...memberForm, joinDate: e.target.value})} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5 ml-1"><MapPin size={12}/> 상세 주소</label>
                  <input type="text" placeholder="우편물 수령지" className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold" value={memberForm.address} onChange={(e) => setMemberForm({...memberForm, address: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">후원 구분</label>
                   <select className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 outline-none font-bold" value={memberForm.donationType} onChange={(e) => setMemberForm({...memberForm, donationType: e.target.value})}>
                      <option>정기후원</option>
                      <option>일시후원</option>
                      <option>물품후원</option>
                      <option>자원봉사</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5 ml-1"><Landmark size={12}/> 입금 은행</label>
                   <select className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 outline-none font-bold" value={memberForm.bank} onChange={(e) => setMemberForm({...memberForm, bank: e.target.value})}>
                      {ACCOUNTS.map(a => <option key={a.bank}>{a.bank}</option>)}
                   </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">상담 메모 및 기도 지향</label>
                  <textarea rows={3} className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 outline-none transition-all font-medium text-sm italic" value={memberForm.note} onChange={(e) => setMemberForm({...memberForm, note: e.target.value})} />
                </div>
              </div>
              <div className="mt-10 flex gap-4">
                 <button type="button" onClick={() => { setShowRegisterModal(false); setShowEditModal(false); }} className="flex-1 bg-stone-100 text-stone-600 py-5 rounded-2xl font-black hover:bg-stone-200 transition-all">취소</button>
                 <button type="submit" className={`flex-[2] ${showEditModal ? 'bg-stone-800' : 'bg-amber-600'} text-white py-5 rounded-2xl font-black text-lg hover:opacity-90 shadow-xl flex items-center justify-center gap-3 transition-all`}>
                   <Save size={24} /> {showEditModal ? '수정 내용 저장' : '신규 후원자 등록'}
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {respondingInquiry && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl">
              <div className="bg-stone-800 p-8 text-white flex justify-between items-center">
                 <h3 className="text-2xl font-serif-kr italic font-bold">상담 답변 등록</h3>
                 <button onClick={() => setRespondingInquiry(null)}><X size={24} /></button>
              </div>
              <form onSubmit={handleAnswerInquiry} className="p-8 space-y-6">
                 <div className="bg-stone-50 p-5 rounded-2xl text-stone-500 text-sm leading-relaxed italic border border-stone-100">"{respondingInquiry.inq.question}"</div>
                 <textarea required rows={5} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-200 outline-none text-sm font-medium" placeholder="답변 내용을 입력하세요." value={answerText} onChange={(e) => setAnswerText(e.target.value)} autoFocus />
                 <button type="submit" className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-amber-700 transition-all shadow-xl"><Send size={20} /> 답변 발송</button>
              </form>
           </div>
        </div>
      )}

      {showAddModal && selectedDonor && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-stone-800 p-8 text-white flex justify-between items-center">
              <h3 className="text-2xl font-serif-kr italic font-bold">{selectedDonor.name}님 입금 추가</h3>
              <button onClick={() => setShowAddModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddDonation} className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-stone-500 flex items-center gap-1.5 ml-1"><Landmark size={14} /> 입금 은행</label>
                <div className="grid grid-cols-3 gap-2">
                  {ACCOUNTS.map(acc => (
                    <button key={acc.bank} type="button" className={`py-3 text-xs rounded-xl border transition-all ${newBank === acc.bank ? 'bg-amber-600 text-white border-amber-600 font-bold' : 'bg-white text-stone-500 border-stone-200 hover:border-amber-500'}`} onClick={() => setNewBank(acc.bank)}>{acc.bank}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 flex items-center gap-1.5 ml-1"><DollarSign size={14} /> 입금 금액</label>
                <input required type="number" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 outline-none font-bold text-lg" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} autoFocus />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 ml-1">입금 메모</label>
                <input type="text" className="w-full px-5 py-3 rounded-xl bg-stone-50 border border-stone-200 outline-none" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="예: 3월 정기후원" />
              </div>
              <button type="submit" className="w-full bg-stone-800 text-white py-4 rounded-2xl font-bold text-lg hover:bg-stone-900 shadow-xl transition-all">내역 저장</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Clock: React.FC<{ size?: number, className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

export default AdminPage;
