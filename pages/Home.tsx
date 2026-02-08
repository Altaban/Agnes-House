
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShieldCheck, Stars, Coffee } from 'lucide-react';
import { PROGRAMS } from '../constants';
import { useDonors } from '../contexts/DonorContext';

const Home: React.FC = () => {
  const { appImages } = useDonors();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={appImages.HOME_HERO} 
            alt="Main Banner" 
            className="w-full h-full object-cover brightness-[0.45]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h2 className="font-serif-kr text-amber-100 text-xl md:text-2xl mb-4">Pax et Bonum - 평화와 선</h2>
            <h1 className="font-serif-kr text-4xl md:text-6xl font-bold leading-tight mb-6">
              미소와 기도가 <br />
              머무는 보금자리 <br />
              <span className="text-amber-300">아녜스의 집</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-200 mb-8 font-light leading-relaxed">
              성모님의 사랑과 프란치스칸 영성으로 <br className="md:hidden" />
              어르신들의 일상을 축복과 기쁨으로 채워갑니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/apply" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 flex items-center gap-2 shadow-xl">
                사랑의 후원 시작하기 <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold transition-all">
                기관 소개 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Brief */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-stone-100 text-stone-600 rounded-full text-[10px] font-black mb-6 tracking-widest uppercase border border-stone-200">Spiritual Foundation</span>
          <h2 className="font-serif-kr text-3xl md:text-5xl text-stone-800 mb-8 leading-snug italic">
            "미사와 기도로 여는 <br className="md:hidden" /> 평화로운 일상"
          </h2>
          <p className="text-stone-500 leading-relaxed text-lg font-medium italic">
            율전동 성당과 함께 호흡하며 매일 아침 미사를 봉헌합니다. <br className="hidden md:block"/>
            정갈한 제대 앞에서 어르신들과 후원자님들을 위한 평화의 기도를 멈추지 않습니다.
          </p>
        </div>
      </section>

      {/* Program Grid */}
      <section className="bg-stone-50 py-24 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="font-serif-kr text-4xl font-bold text-stone-800 italic">생활복지 서비스</h2>
              <p className="text-stone-500 mt-2 font-medium">어르신들의 편안한 노후를 위한 체계적인 케어 시스템</p>
            </div>
            <Link to="/daily" className="text-amber-700 font-black text-sm hover:underline flex items-center gap-2 uppercase tracking-widest">
              시설 둘러보기 <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROGRAMS.map((prog, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group border border-stone-200/50">
                <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-inner">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-4 font-serif-kr">{prog.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed font-medium">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[4rem] overflow-hidden bg-stone-800 p-12 md:p-24 text-white shadow-2xl">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-stone-900 to-stone-800/80"></div>
          </div>
          <div className="relative z-10 max-w-2xl">
            <Heart className="text-amber-400 mb-8 fill-amber-400" size={48} />
            <h2 className="font-serif-kr text-4xl md:text-5xl font-bold mb-8 italic tracking-tight">
              당신은 <br className="md:hidden" /> <span className="text-amber-400">참 소중한 사람</span>입니다
            </h2>
            <p className="text-stone-300 text-lg mb-10 leading-relaxed italic font-light">
              예수님과 성 프란치스코의 따뜻한 포옹처럼, 후원자님의 사랑은 어르신들에게 가장 큰 위로와 희망이 됩니다. 
              우리는 매일 감사하는 마음으로 미사 지향을 올립니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <Coffee className="text-amber-400" size={24} />
                <span className="text-sm font-bold">매일 아침 미사 지향</span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <Stars className="text-amber-400" size={24} />
                <span className="text-sm font-bold">연말 소득공제 혜택</span>
              </div>
            </div>
            <Link to="/apply" className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-amber-400 transition-all shadow-lg active:scale-95">
              후원회 가입하기 <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
