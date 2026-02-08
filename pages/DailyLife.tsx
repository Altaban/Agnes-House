
import React from 'react';
import { Camera, MapPin, ExternalLink, Home, Navigation, ArrowRight, Coffee, Utensils, Bath, Bed, Church, Trees } from 'lucide-react';
import { useDonors } from '../contexts/DonorContext';

const DailyLife: React.FC = () => {
  const { appImages } = useDonors();
  const blogUrl = "https://m.blog.naver.com/agneshouse1004";
  const LOGO_URL = "https://blogpfthumb-phinf.pstatic.net/MjAyNTA4MDZfNTEg/MDAxNzU0NDM5NDg5NzEy.I6QoJSowjjdwF4XCSUP_hhuBENI4ib85DSLFOZ-PZygg.KoBEiBvLKsTmR3zuIq50ZnAhhWHjQDrHysXx-6j6Eykg.PNG/%EC%95%84%EB%85%9C%EC%8A%A4%EC%9D%98%EC%A7%91_%EB%A1%9C%EA%B3%A0.png/%EC%95%84%EB%85%9C%EC%8A%A4%EC%9D%98%EC%A7%91+%EB%A1%9C%EA%B3%A0.png";
  const mapSearchUrl = "https://map.naver.com/v5/search/%EC%B2%9C%EC%82%AC%EC%9D%98%EB%AA%A8%ED%9B%84%EC%9B%90%20%EC%95%84%EB%85%9C%EC%8A%A4%EC%9D%98%EC%A7%91";

  const tourItems = [
    { icon: <Coffee />, title: '따뜻한 거실', desc: 'TV 시청과 담소가 오가는 포근한 공용 거실', img: appImages.DAILY_LIVING_ROOM },
    { icon: <Utensils />, title: '정갈한 식당', desc: '함께 식사하며 온기를 나누는 넓고 쾌적한 다이닝룸', img: appImages.DAILY_DINING },
    { icon: <Church />, title: '평화로운 성당', desc: '매일 미사와 기도가 봉헌되는 정갈한 성당 공간', img: appImages.ABOUT_ALTAR },
    { icon: <Bed />, title: '편안한 생활실', desc: '안락한 전동 침대와 넉넉한 수납공간을 갖춘 침실', img: appImages.DAILY_BEDROOM },
    { icon: <Bath />, title: '청결한 위생 시설', desc: '최신 세탁기와 안전한 목욕 보조 시설', img: appImages.DAILY_BATH },
    { icon: <Trees />, title: '사계절 정원', desc: '울창한 나무 사이로 뻗은 평화로운 산책로', img: appImages.DAILY_GARDEN },
  ];

  return (
    <div className="py-16 animate-in fade-in duration-700 font-sans bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-amber-100">Facility Tour</span>
          <h2 className="font-serif-kr text-4xl md:text-5xl font-bold text-stone-800 mb-8 italic">아녜스의 집 실물 둘러보기</h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            어르신들이 실제로 생활하시는 보금자리의 모습입니다. <br/>
            모든 공간은 안전과 청결, 그리고 프란치스칸의 소박함을 담아 관리됩니다.
          </p>
        </div>

        {/* Restore Facility Tour Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
          {tourItems.map((item, idx) => (
            <div key={idx} className="group cursor-default">
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl mb-6 aspect-[4/3] border border-stone-100 bg-stone-100">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                   <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl w-fit mb-3">
                     {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                   </div>
                   <h4 className="text-xl font-bold font-serif-kr">{item.title}</h4>
                </div>
              </div>
              <p className="text-stone-500 text-sm font-medium px-4 leading-relaxed italic">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Blog Gateway Hero */}
        <div className="bg-stone-50 rounded-[3rem] p-8 md:p-16 border border-stone-100 shadow-sm mb-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <img src={LOGO_URL} alt="watermark" className="w-80 h-auto grayscale" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-3/5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-[#03C75A]/10 text-[#03C75A] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <span className="bg-[#03C75A] text-white rounded-md px-1.5 py-0.5 text-[10px]">N</span> Official Blog Portal
              </div>
              <h3 className="font-serif-kr text-4xl md:text-5xl font-bold text-stone-800 mb-6 italic leading-tight">
                어르신들의 <span className="text-amber-700">생생한 모습</span> <br/> 블로그에서 확인하세요
              </h3>
              <p className="text-stone-500 text-lg mb-10 leading-relaxed font-medium">
                매일 제공되는 영양 식단부터 정성 가득한 생신 잔치까지, <br className="hidden lg:block"/>
                실제 활동 모습들을 블로그에서 투명하게 공개하고 있습니다.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href={blogUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#03C75A] text-white px-10 py-5 rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3 text-lg shadow-xl"
                >
                  블로그에서 일상 보기 <ExternalLink size={20} />
                </a>
              </div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-full flex items-center justify-center border-[12px] border-stone-100 shadow-2xl overflow-hidden group">
                  <img 
                    src={LOGO_URL} 
                    alt="Agnes House Logo" 
                    className="w-4/5 h-auto object-contain group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-amber-400 p-6 rounded-[2rem] shadow-xl animate-bounce">
                  <Camera size={32} className="text-stone-900" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-24 bg-stone-900 rounded-[4rem] p-8 md:p-20 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent"></div>
           <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                  <MapPin size={12} /> Location Guide
                </div>
                <h3 className="font-serif-kr text-4xl font-bold mb-8 italic">찾아오시는 길</h3>
                
                <div className="space-y-10">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                      <Home className="text-amber-400" size={28} />
                    </div>
                    <div>
                      <p className="text-stone-500 text-[10px] font-black uppercase mb-1 tracking-widest">Address</p>
                      <p className="text-white text-xl font-bold leading-snug font-serif-kr">
                        경기도 수원시 장안구 서부로 2162-14 <br/>
                        <span className="text-amber-500 text-lg">(천주교 율전동성당 옆)</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                      <Navigation className="text-blue-400" size={28} />
                    </div>
                    <div>
                      <p className="text-stone-500 text-[10px] font-black uppercase mb-1 tracking-widest">Transport</p>
                      <p className="text-stone-300 text-sm font-medium leading-relaxed">
                        1호선 성균관대역 2번 출구 도보 10분 거리입니다. <br/>
                        율전동 성당을 지나 주차장 안쪽 붉은 벽돌 건물로 오시면 됩니다.
                      </p>
                    </div>
                  </div>
                </div>

                <a 
                  href={mapSearchUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-12 bg-white text-stone-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-amber-400 transition-all flex items-center justify-center gap-3 shadow-xl w-fit"
                >
                  지도로 자세히 보기 <ArrowRight size={20} />
                </a>
              </div>

              <div className="lg:w-1/2 w-full">
                <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-md">
                   <div className="aspect-video bg-stone-800 rounded-3xl overflow-hidden relative border border-white/5">
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                         <MapPin size={48} className="text-amber-500 animate-bounce" />
                         <div className="text-center">
                            <p className="font-serif-kr font-bold text-xl">아녜스의 집 (율전동)</p>
                            <p className="text-xs text-stone-500 mt-1">네이버 지도에서 확인</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLife;
