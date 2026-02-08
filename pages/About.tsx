
import React from 'react';
import { Leaf, Shield, MapPin, Church, Users } from 'lucide-react';
import { useDonors } from '../contexts/DonorContext';

const About: React.FC = () => {
  const { appImages } = useDonors();
  
  return (
    <div className="py-20 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="lg:w-1/2">
            <h2 className="text-amber-600 font-serif-kr text-2xl font-bold mb-4 italic">T. 평화를 빕니다</h2>
            <h1 className="font-serif-kr text-4xl md:text-5xl font-bold text-stone-800 mb-8 italic tracking-tight">천사의 모후원 <br/> <span className="text-amber-700 underline decoration-amber-200 underline-offset-8">아녜스의 집</span></h1>
            <p className="text-stone-600 text-lg leading-relaxed font-medium mb-8">
              수원시 <span className="text-stone-900 font-bold">율전동 성당</span> 바로 옆, 믿음의 뿌리 위에 세워진 보금자리입니다. 
              천사의 모후원은 가난하고 소외된 어르신들을 성모님의 사랑으로 모시는 
              정직하고 투명한 무료/실비 양로원입니다.
            </p>
            <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-3xl border border-stone-100 shadow-inner italic">
               <MapPin className="text-amber-600 mt-1" size={20} />
               <p className="text-sm text-stone-500">수원시 장안구 서부로 2162-14 (율전동 성당 옆 건물)</p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute -inset-4 bg-amber-100/30 rounded-[3rem] -rotate-1"></div>
             <img 
               src={appImages.ABOUT_EXTERIOR} 
               alt="Agnes House Exterior" 
               className="relative z-10 rounded-[3rem] shadow-2xl object-cover h-[500px] w-full brightness-95 border-4 border-white" 
             />
             <div className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-stone-200 shadow-lg">
                <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Main Building</p>
                <p className="text-xs font-bold text-stone-700">율전동 성당과 함께하는 아녜스의 집</p>
             </div>
          </div>
        </div>

        {/* Admission Info Section */}
        <div className="bg-stone-900 rounded-[4rem] p-12 md:p-20 mb-32 border border-stone-800 shadow-2xl text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
          <h2 className="font-serif-kr text-3xl md:text-4xl font-bold mb-10 italic">입소 대상 안내</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 shadow-lg group hover:border-amber-500/50 transition-all">
              <span className="inline-block px-4 py-1 bg-purple-600/20 text-purple-400 rounded-full text-[10px] font-black mb-4 uppercase tracking-widest">Type A</span>
              <h4 className="text-white font-bold text-2xl mb-4">기초생활수급자</h4>
              <p className="text-stone-400 font-medium">전액 무료 입소 지원</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 shadow-lg group hover:border-amber-500/50 transition-all">
              <span className="inline-block px-4 py-1 bg-amber-600/20 text-amber-400 rounded-full text-[10px] font-black mb-4 uppercase tracking-widest">Type B</span>
              <h4 className="text-white font-bold text-2xl mb-4">차상위계층 및 일반</h4>
              <p className="text-stone-400 font-medium">실비 입소 지원 및 개별 상담</p>
            </div>
          </div>
          <p className="mt-12 text-amber-500 font-bold flex items-center justify-center gap-2">
            <Shield size={18} /> 전국 65세 이상 어르신 누구나 상담 환영합니다.
          </p>
        </div>

        {/* Spiritual Core */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-stone-100 rounded-[3rem] rotate-1"></div>
            <img 
              src={appImages.ABOUT_ALTAR} 
              alt="Peaceful Altar" 
              className="relative z-10 rounded-[3rem] shadow-2xl object-cover h-[450px] w-full" 
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-serif-kr text-3xl font-bold text-stone-800 mb-8 italic flex items-center gap-3">
              <Church className="text-amber-700" /> 영성과 함께하는 삶
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100 shadow-sm">
                  <Leaf className="text-amber-700" size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-stone-800 mb-2 font-serif-kr">매일 아침의 미사</h4>
                  <p className="text-stone-500 text-sm leading-relaxed font-medium">
                    정갈한 성당 제대 앞에서 봉헌하는 미사는 어르신들의 
                    영혼에 평화를, 육체에 생기를 불어넣어 주는 하루의 중심입니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center border border-stone-200 shadow-sm">
                  <Users className="text-stone-700" size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-stone-800 mb-2 font-serif-kr">성모님의 보살핌</h4>
                  <p className="text-stone-500 text-sm leading-relaxed font-medium">
                    아름답게 꾸며진 성모 동산의 온화한 눈길 아래에서 
                    어르신들은 묵주 기도를 바치며 주님의 은총 안에 머뭅니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Representative Quote */}
        <div className="relative bg-stone-800 text-white p-16 md:p-24 rounded-[4rem] overflow-hidden text-center shadow-2xl">
          <div className="absolute inset-0 opacity-15">
             <img src="https://images.unsplash.com/photo-1511649475106-4ab7868022d8?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="font-serif-kr text-4xl md:text-5xl font-bold mb-10 italic">"참 소중한 당신께 <br className="md:hidden" /> 감사를 드립니다"</h3>
            <p className="text-xl md:text-2xl text-stone-300 mb-12 font-light italic leading-relaxed">
              예수님과 성 프란치스코의 따뜻한 포옹처럼 사랑이 가득한 곳, 
              어르신들이 주님의 품 안에서 미소 지으며 여생을 보내실 수 있도록 
              우리는 매일 아침 전구를 청하며 정성을 다하겠습니다.
            </p>
            <div className="pt-10 border-t border-white/10">
              <p className="font-bold text-amber-400 text-lg">천사의 모후원 대표 오상선 바오로 신부 OFM</p>
              <p className="text-stone-500 text-sm mt-1 uppercase tracking-widest font-black">Spiritual Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
