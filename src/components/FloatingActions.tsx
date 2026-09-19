import React, { useState, useEffect } from 'react';

interface FloatingActionsProps {
  flowersEnabled: boolean;
  onToggleFlowers: () => void;
  onShowToast: (msg: string) => void;
  onOpenMala: () => void;
  onLightDiya: () => void;
  centerDiyaActive?: boolean;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  flowersEnabled,
  onToggleFlowers,
  onShowToast,
  onOpenMala,
  onLightDiya,
  centerDiyaActive = false,
}) => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [diyaLit, setDiyaLit] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDiyaClick = () => {
    setDiyaLit(true);
    onLightDiya();
    onShowToast('🪔 पावन ज्योति प्रज्वलित! ॥ शुभं करोति कल्याणम् ॥');
    // Subtle reset of corner state after 3 seconds
    setTimeout(() => {
      setDiyaLit(false);
    }, 3000);
  };

  return (
    <>
      {/* Diya Glow Effect on Screen when Lit */}
      {diyaLit && (
        <div
          className="fixed bottom-[9.5rem] right-6 w-20 h-20 rounded-full pointer-events-none z-40 animate-pulse-gold drop-shadow-[0_0_50px_rgba(244,163,0,1)]"
          style={{
            background: 'radial-gradient(circle, rgba(244,163,0,0.85) 0%, rgba(212,175,55,0.4) 50%, transparent 70%)'
          }}
        />
      )}

      {/* Floating Buttons Group */}
      <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-3 items-end">
        {/* Flowers Toggle */}
        {/* <button
          onClick={onToggleFlowers}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0b1a33]/90 border border-[#d4af37]/50 text-[#f5e7a3] flex items-center justify-center text-lg shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          title={flowersEnabled ? 'पुष्प वर्षा बंद करें' : 'पुष्प वर्षा चालू करें'}
          aria-label="पुष्प वर्षा टॉगल करें"
        >
          {flowersEnabled ? '🌸' : '🚫'}
        </button> */}

        {/* Mala Jap Counter Floating Button */}
        <button
          id="floating-mala-btn"
          onClick={onOpenMala}
          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#8a5d14] via-[#d4af37] to-[#f5e7a3] text-[#0b1a33] flex items-center justify-center text-xl shadow-[0_0_25px_rgba(212,175,55,0.75)] hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-[#fef9ed]/80 group"
          title="माला जाप काउंटर खोलें (108 मनके)"
          aria-label="माला जाप काउंटर खोलें"
        >
          <span className="text-xl group-hover:rotate-12 transition-transform select-none">📿</span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f4a300] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#f4a300] text-[9px] font-bold text-[#0b1a33] items-center justify-center font-dev-serif">
              108
            </span>
          </span>
        </button>

        {/* Diya Button */}
        <button
          onClick={handleDiyaClick}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl shadow-2xl transition-all cursor-pointer active:scale-95 ${
            diyaLit || centerDiyaActive
              ? 'bg-[#f5e7a3] text-[#b8860b] scale-110 shadow-[0_0_35px_rgba(244,163,0,1)] ring-4 ring-[#f4a300]/50'
              : 'bg-[#f4a300] text-[#0b1a33] hover:scale-110 hover:shadow-[0_0_20px_rgba(244,163,0,0.8)]'
          }`}
          title="वर्चुअल दीपक जलाएँ"
          aria-label="वर्चुअल दीपक जलाएँ"
        >
          {diyaLit || centerDiyaActive ? '🪔' : <i className="fas fa-fire"></i>}
        </button>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#d4af37] text-[#0b1a33] flex items-center justify-center text-lg shadow-2xl transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${
            showTopBtn
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          title="ऊपर जाएँ"
          aria-label="शीर्ष पर स्क्रॉल करें"
        >
          <i className="fas fa-arrow-up font-bold"></i>
        </button>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919876543210?text=॥%20जय%20श्री%20श्याम%20॥%20श्री%20श्याम%20जगत%20मंडल%20से%20जुड़ना%20चाहते%20हैं।"
          target="_blank"
          rel="noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25d366] text-white flex items-center justify-center text-xl shadow-2xl hover:scale-110 active:scale-95 transition-all"
          title="व्हाट्सएप पर संपर्क करें"
          aria-label="व्हाट्सएप पर संदेश भेजें"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </>
  );
};
