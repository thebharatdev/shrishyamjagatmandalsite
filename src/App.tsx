import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FallingFlowers } from './components/FallingFlowers';
import { FloatingActions } from './components/FloatingActions';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BhajansPage } from './pages/BhajansPage';
import { BhajanDetailPage } from './pages/BhajanDetailPage';
import { AartiPage } from './pages/AartiPage';
import { StutiPage } from './pages/StutiPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedBhajanId, setSelectedBhajanId] = useState<string | null>(null);
  const [flowersEnabled, setFlowersEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial spiritual preloader (Om animation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Toast auto dismiss
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Navigation handler
  const handleNavigate = (page: PageRoute, targetSectionId?: string, bhajanId?: string) => {
    setCurrentPage(page);
    if (bhajanId) {
      setSelectedBhajanId(bhajanId);
    }

    // Scroll to top or target section
    setTimeout(() => {
      if (targetSectionId) {
        const el = document.getElementById(targetSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1a33] text-white selection:bg-[#d4af37]/30 selection:text-[#f5e7a3]">
      {/* 1. SPIRITUAL PRELOADER */}
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-[#0b1a33] flex flex-col items-center justify-center transition-opacity duration-700">
          <div className="text-6xl sm:text-7xl font-bold text-[#d4af37] animate-pulse-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.8)] font-dev-serif">
            ॐ
          </div>
          <div className="font-dev-serif text-lg text-[#f5e7a3] mt-4 tracking-widest animate-glow">
            ॥ जय श्री श्याम ॥
          </div>
        </div>
      )}

      {/* 2. FALLING PETALS / FLOWERS */}
      <FallingFlowers enabled={flowersEnabled} />

      {/* 3. HEADER NAVIGATION */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => handleNavigate('bhajans')}
      />

      {/* 4. MAIN ROUTE CONTENT */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'bhajans' && (
          <BhajansPage onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentPage === 'bhajan-detail' && (
          <BhajanDetailPage
            bhajanId={selectedBhajanId}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'aarti' && (
          <AartiPage onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentPage === 'stuti' && (
          <StutiPage onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} onShowToast={showToast} />
        )}
      </main>

      {/* 5. FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* 6. FLOATING ACTIONS (WhatsApp, ScrollTop, Diya, Flowers) */}
      <FloatingActions
        flowersEnabled={flowersEnabled}
        onToggleFlowers={() => {
          const next = !flowersEnabled;
          setFlowersEnabled(next);
          showToast(next ? '🌸 पुष्प वर्षा चालू की गई' : 'पुष्प वर्षा बंद की गई');
        }}
        onShowToast={showToast}
      />

      {/* 7. TOAST NOTIFICATION */}
      <Toast message={toastMessage} />
    </div>
  );
}
