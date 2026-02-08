
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import DailyLife from './pages/DailyLife';
import DonationInfo from './pages/DonationInfo';
import ApplyDonation from './pages/ApplyDonation';
import MyPage from './pages/MyPage';
import AdminPage from './pages/AdminPage';
import { DonorProvider } from './contexts/DonorContext';

const App: React.FC = () => {
  return (
    <DonorProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-stone-50 selection:bg-stone-200">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/daily" element={<DailyLife />} />
              <Route path="/donation-info" element={<DonationInfo />} />
              <Route path="/apply" element={<ApplyDonation />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DonorProvider>
  );
};

export default App;
