
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const LOGO_URL = "https://blogpfthumb-phinf.pstatic.net/MjAyNTA4MDZfNTEg/MDAxNzU0NDM5NDg5NzEy.I6QoJSowjjdwF4XCSUP_hhuBENI4ib85DSLFOZ-PZygg.KoBEiBvLKsTmR3zuIq50ZnAhhWHjQDrHysXx-6j6Eykg.PNG/%EC%95%84%EB%85%9C%EC%8A%A4%EC%9D%98%EC%A7%91_%EB%A1%9C%EA%B3%A0.png/%EC%95%84%EB%85%9C%EC%8A%A4%EC%9D%98%EC%A7%91+%EB%A1%9C%EA%B3%A0.png";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
              <img 
                src={LOGO_URL} 
                alt="아녜스의 집 공식 로고" 
                className="h-20 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-kr text-xl font-bold text-stone-800 tracking-tight leading-tight">
                천사의 모후원
              </span>
              <span className="text-amber-700 font-black text-xs tracking-widest uppercase">
                Agnes House
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  location.pathname === item.path
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-stone-500 hover:text-amber-700 hover:bg-amber-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-500 hover:text-stone-800 focus:outline-none p-2 bg-stone-50 rounded-xl"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 py-4 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-bold transition-colors ${
                  location.pathname === item.path
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span className={location.pathname === item.path ? 'text-white' : 'opacity-50 text-amber-600'}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
