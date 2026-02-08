
import React from 'react';
import { Heart, Home, Users, Gift, Info, Calendar } from 'lucide-react';

export const COLORS = {
  primary: '#8B735B', // Warm Brown
  secondary: '#D2B48C', // Tan/Beige
  accent: '#E6D5B8', // Light Cream
  text: '#4A4238',
  bg: '#F9F6F2'
};

export const NAV_ITEMS = [
  { label: '기관 소개', path: '/about', icon: <Info size={18} /> },
  { label: '아녜스의 집', path: '/daily', icon: <Home size={18} /> },
  { label: '후원 안내', path: '/donation-info', icon: <Heart size={18} /> },
  { label: '후원 신청', path: '/apply', icon: <Gift size={18} /> },
  { label: '마이페이지', path: '/mypage', icon: <Users size={18} /> },
];

export const PROGRAMS = [
  { title: '생활복지 (KOMI)', desc: '체계적인 욕구 분석을 통한 어르신 맞춤형 케어' },
  { title: '간호 및 재활', desc: '물리치료 및 건강 관리 서비스 상시 제공' },
  { title: '쾌적한 보금자리', desc: '세탁실, 목욕탕, 정원 등 편안한 생활 시설' },
  { title: '신앙 및 영성', desc: '율전동 성당과 함께하는 매일 미사와 기도 생활' }
];

export const ACCOUNTS = [
  { bank: '농협은행', account: '162-01-052715', holder: '천사의모후원 아녜스의집' },
  { bank: '우체국', account: '107086-01-000276', holder: '천사의모후원 아녜스의집' },
  { bank: '국민은행', account: '221-01-0299-295', holder: '천사의모후원 아녜스의집' }
];

export const CONTACTS = {
  admission: '031-269-1009',
  donation: '010-2575-0245',
  email: 'angelus9967@gmail.com',
  address: '경기도 수원시 장안구 서부로 2162-14',
  representative: '오상선 바오로 신부 OFM'
};
