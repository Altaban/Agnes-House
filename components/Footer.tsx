
import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACTS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif-kr text-white text-xl font-bold mb-4 text-stone-100">사회복지법인 천사의 모후원 아녜스의 집</h3>
            <p className="text-sm leading-relaxed mb-4 max-w-md text-stone-400">
              성모님의 사랑과 프란치스칸의 겸손함으로 어르신들을 정성껏 모시는 따뜻한 공동체입니다. 
              수원시의 지원을 받으며 소외된 이웃에게 사랑을 전합니다.
            </p>
            <div className="space-y-1 text-xs text-stone-500">
              <p>주소: {CONTACTS.address}</p>
              <p>입소문의: {CONTACTS.admission} (아녜스의 집)</p>
              <p>후원문의: {CONTACTS.donation} (천사의 모후원)</p>
              <p>이메일: {CONTACTS.email}</p>
              <p className="mt-2 font-medium text-stone-600">대표: {CONTACTS.representative}</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">시설안내</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/about" className="hover:text-amber-200 transition-colors">기관 소개</Link></li>
              <li><Link to="/daily" className="hover:text-amber-200 transition-colors">아녜스의 집</Link></li>
              <li><Link to="/apply" className="hover:text-amber-200 transition-colors">후원 신청</Link></li>
              <li><Link to="/donation-info" className="hover:text-amber-200 transition-colors">후원 혜택</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">법적 고지</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-amber-200 transition-colors">개인정보 처리방침</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">이용약관</a></li>
              <li className="pt-4 opacity-30 hover:opacity-100 transition-opacity">
                <Link to="/admin" className="text-[10px] uppercase font-bold tracking-tighter hover:text-amber-400">
                   Admin Management
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-600">
          <p>© 2024 천사의 모후원 아녜스의 집. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
