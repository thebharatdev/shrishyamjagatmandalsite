import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, targetSectionId?: string) => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (page: PageRoute, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 ${
          scrolled
            ? 'bg-[#0b1a33]/95 backdrop-blur-md shadow-2xl border-b border-[#d4af37]/30'
            : 'bg-[#0b1a33]/85 backdrop-blur-sm border-b border-[#d4af37]/20'
        }`}
      >
        <div className="w-[92%] max-w-[1300px] mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <i className="fas fa-gopuram text-[#f4a300] text-2xl group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(244,163,0,0.8)]"></i>
            <span className="font-dev-serif text-lg sm:text-xl font-bold bg-gradient-to-r from-[#f5e7a3] via-[#d4af37] to-[#f4a300] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              श्री श्याम जगत मंडल
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-sm font-medium transition-colors relative pb-1 hover:text-[#d4af37] ${
                currentPage === 'home' ? 'text-[#d4af37]' : 'text-[#f0e9d8]'
              }`}
            >
              होम
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />
              )}
            </button>

            <button
              onClick={() => handleLinkClick('about')}
              className={`text-sm font-medium transition-colors relative pb-1 hover:text-[#d4af37] ${
                currentPage === 'about' ? 'text-[#d4af37]' : 'text-[#f0e9d8]'
              }`}
            >
              हमारे बारे में
              {currentPage === 'about' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />
              )}
            </button>

            <button
              onClick={() => handleLinkClick('bhajans')}
              className={`text-sm font-medium transition-colors relative pb-1 hover:text-[#d4af37] ${
                currentPage === 'bhajans' ? 'text-[#d4af37]' : 'text-[#f0e9d8]'
              }`}
            >
              भजन
              {currentPage === 'bhajans' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />
              )}
            </button>

            <button
              onClick={() => handleLinkClick('aarti')}
              className={`text-sm font-medium transition-colors relative pb-1 hover:text-[#d4af37] ${
                currentPage === 'aarti' ? 'text-[#d4af37]' : 'text-[#f0e9d8]'
              }`}
            >
              आरती
              {currentPage === 'aarti' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />
              )}
            </button>

            <button
              onClick={() => handleLinkClick('stuti')}
              className={`text-sm font-medium transition-colors relative pb-1 hover:text-[#d4af37] ${
                currentPage === 'stuti' ? 'text-[#d4af37]' : 'text-[#f0e9d8]'
              }`}
            >
              स्तुति
              {currentPage === 'stuti' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />
              )}
            </button>

            <button
              onClick={() => handleLinkClick('home', 'darshan')}
              className="text-sm font-medium text-[#f0e9d8] hover:text-[#d4af37] transition-colors pb-1"
            >
              दर्शन
            </button>

            <button
              onClick={() => handleLinkClick('home', 'festival')}
              className="text-sm font-medium text-[#f0e9d8] hover:text-[#d4af37] transition-colors pb-1"
            >
              पर्व
            </button>

            <button
              onClick={() => handleLinkClick('home', 'events')}
              className="text-sm font-medium text-[#f0e9d8] hover:text-[#d4af37] transition-colors pb-1"
            >
              आयोजन
            </button>

            <button
              onClick={() => handleLinkClick('home', 'news')}
              className="text-sm font-medium text-[#f0e9d8] hover:text-[#d4af37] transition-colors pb-1"
            >
              समाचार
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className={`text-sm font-medium transition-colors relative pb-1 hover:text-[#d4af37] ${
                currentPage === 'contact' ? 'text-[#d4af37]' : 'text-[#f0e9d8]'
              }`}
            >
              संपर्क करें
              {currentPage === 'contact' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />
              )}
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4 text-[#f0e9d8]">
            <button
              onClick={() => setShowNotice(true)}
              className="p-1.5 hover:text-[#d4af37] hover:scale-110 transition-all cursor-pointer relative"
              title="सूचना देखें"
              aria-label="सूचना देखें"
            >
              <i className="fas fa-bell text-lg"></i>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#f4a300] animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#f4a300]" />
            </button>

            <button
              onClick={onOpenSearch}
              className="p-1.5 hover:text-[#d4af37] hover:scale-110 transition-all cursor-pointer"
              title="भजन खोजें"
              aria-label="भजन खोजें"
            >
              <i className="fas fa-search text-lg"></i>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#d4af37] text-2xl cursor-pointer"
              aria-label="मेन्यू खोलें"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b1a33]/98 border-b border-[#d4af37]/30 px-6 py-5 mt-3 flex flex-col gap-3.5 backdrop-blur-xl shadow-2xl animate-fade-in">
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left text-base font-medium text-[#f0e9d8] hover:text-[#d4af37] py-1 border-b border-white/5"
            >
              🏠 होम
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="text-left text-base font-medium text-[#f0e9d8] hover:text-[#d4af37] py-1 border-b border-white/5"
            >
              📖 हमारे बारे में
            </button>
            <button
              onClick={() => handleLinkClick('bhajans')}
              className="text-left text-base font-medium text-[#f0e9d8] hover:text-[#d4af37] py-1 border-b border-white/5"
            >
              🎵 भजन संग्रह
            </button>
            <button
              onClick={() => handleLinkClick('aarti')}
              className="text-left text-base font-medium text-[#f0e9d8] hover:text-[#d4af37] py-1 border-b border-white/5"
            >
              🪔 श्री श्याम आरती
            </button>
            <button
              onClick={() => handleLinkClick('stuti')}
              className="text-left text-base font-medium text-[#f0e9d8] hover:text-[#d4af37] py-1 border-b border-white/5"
            >
              🙏 श्री श्याम स्तुति
            </button>
            <button
              onClick={() => handleLinkClick('home', 'darshan')}
              className="text-left text-base font-medium text-[#f0e9d8] hover:text-[#d4af37] py-1 border-b border-white/5"
            >
              👁️ आज के दर्शन
            </button>
            <button
              onClick={() => handleLinkClick('home', 'festival')}
              className="text-left text-base font-medium text-[#f0e9d8] hover:text-[#d4af37] py-1 border-b border-white/5"
            >
              ⭐ फाल्गुन मेला
            </button>
            <button
              onClick={() => handleLinkClick('home', 'events')}
              className="text-left text-base font-medium text-[#f0e9d8] hover:text-[#d4af37] py-1 border-b border-white/5"
            >
              📅 आगामी आयोजन
            </button>
            <button
              onClick={() => handleLinkClick('home', 'news')}
              className="text-left text-base font-medium text-[#f0e9d8] hover:text-[#d4af37] py-1 border-b border-white/5"
            >
              📰 समाचार
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-left text-base font-medium text-[#d4af37] py-1"
            >
              📞 संपर्क करें
            </button>
          </div>
        )}
      </header>

      {/* Devotional Notice Modal */}
      {showNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b1a33] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-[0_0_50px_rgba(212,175,55,0.3)] relative">
            <button
              onClick={() => setShowNotice(false)}
              className="absolute top-4 right-4 text-[#d4af37] hover:text-white text-xl p-2 cursor-pointer"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#f4a300] text-[#0b1a33] flex items-center justify-center text-2xl font-bold shadow-lg">
              ॐ
            </div>
            <h3 className="font-dev-serif text-xl sm:text-2xl text-[#d4af37] mb-2">
              विशेष सूचना एवं आमंत्रण
            </h3>
            <p className="text-[#f5e6c8] text-sm sm:text-base leading-relaxed mb-5">
              श्री श्याम फाल्गुन मेला एवं बाबा का दिव्य संकीर्तन दरबार आगामी ०३ अप्रैल २०२६ को आयोजित होगा। महाआरती प्रातः ६:०० व सायं ७:०० बजे संपन्न होगी। सपरिवार पधारें!
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setShowNotice(false);
                  handleLinkClick('home', 'festival');
                }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-semibold text-sm hover:scale-105 transition-transform"
              >
                विस्तृत विवरण देखें
              </button>
              <button
                onClick={() => setShowNotice(false)}
                className="px-5 py-2.5 rounded-full border border-[#d4af37] text-[#d4af37] font-semibold text-sm hover:bg-[#d4af37]/10"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
