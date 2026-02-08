
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Donor, IndividualDonation, Inquiry, AppImages } from '../types';
import * as XLSX from 'xlsx';

interface DonorContextType {
  donors: Donor[];
  appImages: AppImages;
  addDonation: (donorId: string, amount: number, note: string, bank?: string) => void;
  addDonor: (donorData: Omit<Donor, 'id' | 'donations' | 'inquiries' | 'totalDonationAmount' | 'lastDonationDate' | 'code'>) => string;
  updateDonor: (donorId: string, donorData: Partial<Donor>) => void;
  deleteDonor: (donorId: string) => void;
  addInquiry: (donorId: string, question: string) => void;
  answerInquiry: (donorId: string, inquiryId: string, answer: string) => void;
  updateAppImage: (key: string, base64: string) => void;
  resetImages: () => void;
  exportData: () => void;
  exportDataJson: () => void;
  importData: (fileData: ArrayBuffer) => { success: boolean; count: number; format: string };
  findDonor: (name: string, code: string) => Donor | undefined;
  getNextCode: () => string;
  stats: {
    totalAmount: number;
    donorCount: number;
  };
}

const DonorContext = createContext<DonorContextType | undefined>(undefined);

const DEFAULT_IMAGES: AppImages = {
  HOME_HERO: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1920",
  ABOUT_EXTERIOR: "https://images.unsplash.com/photo-1548625361-125008427903?auto=format&fit=crop&q=80&w=1200",
  ABOUT_ALTAR: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1200",
  DAILY_LIVING_ROOM: "https://images.unsplash.com/photo-1540910419892-f0c160a21c27?auto=format&fit=crop&q=80&w=800",
  DAILY_DINING: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
  DAILY_BEDROOM: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&q=80&w=800",
  DAILY_BATH: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
  DAILY_GARDEN: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800"
};

const INITIAL_RAW_DATA = [
  {"code":"1650","name":"ofs 경기지구","baptismalName":"","registrationNumber":"","contact":"010-","email":"","address":"","bank":"우체국","donationType":"정기후원","totalDonationAmount":1500000,"joinDate":"2026-01-27","lastDonationDate":"2025-12-29", "inquiries": []},
  {"code":"1649","name":"우태섭","baptismalName":"라파엘","registrationNumber":"","contact":"010-","email":"","address":"","bank":"국민은행","donationType":"정기후원","totalDonationAmount":50000,"joinDate":"2026-01-27","lastDonationDate":"2026-01-07", "inquiries": []},
  {"code":"1648","name":"채양화","baptismalName":"호스티아","registrationNumber":"","contact":"010-8591-8147","email":"","address":"","bank":"국민은행","donationType":"정기후원","totalDonationAmount":10000,"joinDate":"2026-01-27","lastDonationDate":"2026-01-23", "inquiries": []},
  {"code":"1647","name":"이인숙","baptismalName":"체칠리아","registrationNumber":"","contact":"010-5104-8344","email":"","address":"","bank":"농협","donationType":"정기후원","totalDonationAmount":10000,"joinDate":"2026-01-27","lastDonationDate":"2025-12-29", "inquiries": []},
  {"code":"1001","name":"오상선","baptismalName":"바오로","registrationNumber":"591215-1690421","contact":"010-8630-6295","email":"osspaolo@daum.net","address":"","bank":"농협","donationType":"정기후원","totalDonationAmount":100000,"joinDate":"2025-12-01","lastDonationDate":"2026-01-01", "inquiries": []}
];

export const DonorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [appImages, setAppImages] = useState<AppImages>(DEFAULT_IMAGES);

  const normalizeData = (rawData: any[]): Donor[] => {
    return rawData
      .filter(item => (item.name || item['성명']) && (item.code || item['코드']))
      .map(item => {
        const code = String(item.code || item['코드'] || "").trim().replace(/"/g, '');
        const name = String(item.name || item['성명'] || "").trim().replace(/"/g, '');
        const baptismalName = String(item.baptismalName || item['세례명'] || "").trim().replace(/"/g, '');
        const contact = String(item.contact || item['연락처'] || "010-").trim().replace(/"/g, '');
        const email = String(item.email || item['이메일'] || "").trim().replace(/"/g, '');
        const address = String(item.address || item['주소'] || "").trim().replace(/"/g, '');
        const bank = String(item.bank || item['은행'] || "").trim().replace(/"/g, '');
        const donationType = String(item.donationType || item['후원구분'] || "정기후원").trim().replace(/"/g, '');
        const registrationNumber = String(item.registrationNumber || item['주민번호'] || item['사업자번호'] || "").trim().replace(/"/g, '');
        
        const rawTotal = item.totalDonationAmount || item['총후원금액'] || item['금액'] || 0;
        const totalAmount = typeof rawTotal === 'string' 
          ? Number(rawTotal.replace(/[^0-9.-]+/g, "")) 
          : Number(rawTotal);

        const joinDate = item.joinDate || item['가입일'] || "";
        const lastDonationDate = item.lastDonationDate || item['최종후원일'] || "";
        
        const donations: IndividualDonation[] = Array.isArray(item.donations) ? item.donations : [];
        const inquiries: Inquiry[] = Array.isArray(item.inquiries) ? item.inquiries : [];

        const finalDonations = donations.length > 0 ? donations : (totalAmount > 0 ? [{
          id: `migration_${code}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          date: lastDonationDate || joinDate || new Date().toISOString().split('T')[0],
          amount: totalAmount,
          note: '데이터 이관 (누적 합계)',
          bank: bank
        }] : []);

        return {
          id: item.id || `donor_${code}`,
          code, name, baptismalName, contact, email, address, donationType, registrationNumber,
          joinDate, bank, note: item.note || "",
          donations: finalDonations,
          inquiries: inquiries,
          totalDonationAmount: totalAmount,
          lastDonationDate,
          tags: item.tags || []
        };
      });
  };

  useEffect(() => {
    // Load Donors
    const savedDonors = localStorage.getItem('queen_angels_donors');
    if (savedDonors) {
      try {
        setDonors(normalizeData(JSON.parse(savedDonors)));
      } catch (e) {
        setDonors(normalizeData(INITIAL_RAW_DATA));
      }
    } else {
      const normalized = normalizeData(INITIAL_RAW_DATA);
      setDonors(normalized);
      localStorage.setItem('queen_angels_donors', JSON.stringify(normalized));
    }

    // Load Images
    const savedImages = localStorage.getItem('agnes_house_images');
    if (savedImages) {
      try {
        setAppImages({ ...DEFAULT_IMAGES, ...JSON.parse(savedImages) });
      } catch (e) {
        setAppImages(DEFAULT_IMAGES);
      }
    }
  }, []);

  const updateAppImage = (key: string, base64: string) => {
    const updated = { ...appImages, [key]: base64 };
    setAppImages(updated);
    localStorage.setItem('agnes_house_images', JSON.stringify(updated));
  };

  const resetImages = () => {
    setAppImages(DEFAULT_IMAGES);
    localStorage.removeItem('agnes_house_images');
  };

  const getNextCode = () => {
    if (donors.length === 0) return "1001";
    const codes = donors.map(d => parseInt(d.code)).filter(c => !isNaN(c));
    if (codes.length === 0) return "1001";
    return (Math.max(...codes) + 1).toString();
  };

  const addDonation = (donorId: string, amount: number, note: string, bank?: string) => {
    const updated = donors.map(d => {
      if (d.id === donorId) {
        const newDonation = {
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          amount,
          note,
          bank
        };
        return {
          ...d,
          donations: [newDonation, ...d.donations],
          totalDonationAmount: (d.totalDonationAmount || 0) + amount,
          lastDonationDate: newDonation.date
        };
      }
      return d;
    });
    setDonors(updated);
    localStorage.setItem('queen_angels_donors', JSON.stringify(updated));
  };

  const addInquiry = (donorId: string, question: string) => {
    const updated = donors.map(d => {
      if (d.id === donorId) {
        const newInquiry: Inquiry = {
          id: `inq_${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          question,
          status: 'pending'
        };
        return {
          ...d,
          inquiries: [newInquiry, ...(d.inquiries || [])]
        };
      }
      return d;
    });
    setDonors(updated);
    localStorage.setItem('queen_angels_donors', JSON.stringify(updated));
  };

  const answerInquiry = (donorId: string, inquiryId: string, answer: string) => {
    const updated = donors.map(d => {
      if (d.id === donorId) {
        const updatedInquiries = d.inquiries.map(inq => {
          if (inq.id === inquiryId) {
            return {
              ...inq,
              answer,
              answerDate: new Date().toISOString().split('T')[0],
              status: 'answered' as const
            };
          }
          return inq;
        });
        return { ...d, inquiries: updatedInquiries };
      }
      return d;
    });
    setDonors(updated);
    localStorage.setItem('queen_angels_donors', JSON.stringify(updated));
  };

  const addDonor = (donorData: Omit<Donor, 'id' | 'donations' | 'inquiries' | 'totalDonationAmount' | 'lastDonationDate' | 'code'>) => {
    const newCode = getNextCode();
    const newDonor: Donor = {
      ...donorData,
      id: `donor_${newCode}`,
      code: newCode,
      donations: [],
      inquiries: [],
      totalDonationAmount: 0,
      lastDonationDate: undefined,
      tags: []
    };
    const updated = [newDonor, ...donors];
    setDonors(updated);
    localStorage.setItem('queen_angels_donors', JSON.stringify(updated));
    return newCode;
  };

  const updateDonor = (donorId: string, donorData: Partial<Donor>) => {
    const updated = donors.map(d => {
      if (d.id === donorId) {
        return { ...d, ...donorData };
      }
      return d;
    });
    setDonors(updated);
    localStorage.setItem('queen_angels_donors', JSON.stringify(updated));
  };

  const deleteDonor = (donorId: string) => {
    const updated = donors.filter(d => d.id !== donorId);
    setDonors(updated);
    localStorage.setItem('queen_angels_donors', JSON.stringify(updated));
  };

  const exportData = () => {
    const exportRows = donors.map(d => ({
      '코드': d.code,
      '성명': d.name,
      '세례명': d.baptismalName,
      '주민번호': d.registrationNumber,
      '연락처': d.contact,
      '이메일': d.email,
      '주소': d.address,
      '은행': d.bank,
      '후원구분': d.donationType,
      '총후원금액': d.totalDonationAmount,
      '가입일': d.joinDate,
      '최종후원일': d.lastDonationDate
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "후원자명단");
    
    const wscols = [
      {wch: 10}, {wch: 15}, {wch: 15}, {wch: 20}, {wch: 20},
      {wch: 25}, {wch: 40}, {wch: 15}, {wch: 15}, {wch: 15},
      {wch: 15}, {wch: 15}
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, `천사의모후원_후원명단_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportDataJson = () => {
    const dataStr = JSON.stringify(donors, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const exportFileDefaultName = `천사의모후원_후원명단_백업_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    URL.revokeObjectURL(url);
  };

  const importData = (fileData: ArrayBuffer) => {
    try {
      let jsonData: any[] = [];
      let detectedFormat = 'Excel';
      
      const text = new TextDecoder().decode(fileData);
      const trimmedText = text.trim();
      
      if (trimmedText.startsWith('[') || trimmedText.startsWith('{')) {
        try {
          const parsed = JSON.parse(trimmedText);
          jsonData = Array.isArray(parsed) ? parsed : [parsed];
          detectedFormat = 'JSON';
        } catch (jsonErr) {
          const workbook = XLSX.read(fileData, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          jsonData = XLSX.utils.sheet_to_json(worksheet);
        }
      } else {
        const workbook = XLSX.read(fileData, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        jsonData = XLSX.utils.sheet_to_json(worksheet);
      }
      
      const incomingDonors = normalizeData(jsonData);
      
      if (incomingDonors.length > 0) {
        setDonors(prev => {
          const donorMap = new Map();
          prev.forEach(d => donorMap.set(d.code, d));
          incomingDonors.forEach(d => donorMap.set(d.code, d));
          const merged = Array.from(donorMap.values());
          localStorage.setItem('queen_angels_donors', JSON.stringify(merged));
          return merged;
        });
        return { success: true, count: incomingDonors.length, format: detectedFormat };
      }
      return { success: false, count: 0, format: 'Unknown' };
    } catch (e) {
      console.error("Import error:", e);
      return { success: false, count: 0, format: 'Error' };
    }
  };

  const findDonor = (name: string, code: string) => {
    return donors.find(d => d.name === name && d.code === code);
  };

  const stats = {
    totalAmount: donors.reduce((acc, curr) => acc + (curr.totalDonationAmount || 0), 0),
    donorCount: donors.length
  };

  return (
    <DonorContext.Provider value={{ 
      donors, 
      appImages,
      addDonation, 
      addDonor, 
      updateDonor, 
      deleteDonor, 
      addInquiry, 
      answerInquiry, 
      updateAppImage,
      resetImages,
      exportData, 
      exportDataJson, 
      importData, 
      findDonor, 
      getNextCode, 
      stats 
    }}>
      {children}
    </DonorContext.Provider>
  );
};

export const useDonors = () => {
  const context = useContext(DonorContext);
  if (!context) throw new Error('useDonors must be used within a DonorProvider');
  return context;
};
