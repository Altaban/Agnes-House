
export enum DonationType {
  REGULAR = '정기후원',
  ONETIME = '일시후원',
  GOODS = '물품후원',
  VOLUNTEER = '자원봉사'
}

export interface Inquiry {
  id: string;
  date: string;
  question: string;
  answer?: string;
  answerDate?: string;
  status: 'pending' | 'answered';
}

export interface IndividualDonation {
  id: string;
  date: string;
  amount: number;
  bank?: string;
  note?: string;
}

export interface Donor {
  id: string;
  code: string;
  name: string;
  baptismalName?: string;
  contact: string;
  email?: string;
  address?: string;
  donationType: string;
  registrationNumber?: string;
  joinDate: string;
  bank?: string;
  note?: string;
  donations: IndividualDonation[];
  inquiries: Inquiry[];
  totalDonationAmount: number;
  lastDonationDate?: string;
  tags?: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  isMember: boolean;
  totalDonation: number;
  prayerIntentions: string[];
}

// 앱 내 커스텀 이미지 매핑을 위한 타입
export interface AppImages {
  [key: string]: string;
}
