import React, { useState, useMemo } from 'react';
import { PageRoute } from '../types';
import { BHAJANS_DATA } from '../data/bhajans';

interface BhajansPageProps {
  onNavigate: (page: PageRoute, targetSectionId?: string, bhajanId?: string) => void;
  onShowToast: (msg: string) => void;
}

export const BhajansPage: React.FC<BhajansPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('सभी');
  const [visibleCount, setVisibleCount] = useState(10);

  // Available categories
  const categories = ['सभी', 'लोकप्रिय भजन', 'भजन', 'कीर्तन', 'आरती', 'चालीसा'];

  // Bilingual search algorithm matching all tokens (AND logic)
  const filteredBhajans = useMemo(() => {
    let list = BHAJANS_DATA;

    if (activeCategory !== 'सभी') {
      list = list.filter((b) => b.category === activeCategory);
    }

    if (!searchQuery.trim()) return list;

    const tokens = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return list;

    return list.filter((b) => {
      const titleLower = b.title.toLowerCase();
      const keywordsLower = b.keywords.map((k) => k.toLowerCase());
      const singerLower = b.singer.toLowerCase();

      return tokens.every(
        (token) =>
          titleLower.includes(token) ||
          singerLower.includes(token) ||
          keywordsLower.some((k) => k.includes(token))
      );
    });
  }, [searchQuery, activeCategory]);

  const displayedBhajans = filteredBhajans.slice(0, visibleCount);

  // Highlight matched tokens in Hindi title
  const renderHighlightedTitle = (title: string) => {
    if (!searchQuery.trim()) return title;
    const tokens = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return title;

    let text = title;
    tokens.forEach((token) => {
      // If token is Devanagari, highlight
      if (/[\u0900-\u097F]/.test(token)) {
        const regex = new RegExp(`(${token})`, 'gi');
        text = text.replace(regex, '<mark class="bg-[#d4af37]/40 text-inherit px-0.5 rounded">$1</mark>');
      }
    });

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className="pt-20">
      {/* PAGE BANNER */}
      <section className="relative py-14 sm:py-20 text-center overflow-hidden bg-gradient-to-b from-[#0b1a33]/90 via-[#0b1a33] to-[#0b1a33]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&auto=format&fit=crop&q=80')"
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="font-dev-serif text-3xl sm:text-5xl text-white font-bold mb-3">
            श्याम <span className="bg-gradient-to-r from-[#f5e7a3] to-[#d4af37] bg-clip-text text-transparent">भजन संग्रह</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-3" />
          <div className="font-dev-serif text-sm sm:text-base text-[#d4af37] tracking-widest animate-glow">
            ॥ जय श्री श्याम ॥
          </div>
        </div>
      </section>

      {/* SEARCH & LIST CONTENT */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#fdf8ed] via-[#faf0dc] to-[#f5e6c8] text-[#3d2f14] min-h-[70vh] relative">
        <div className="w-[92%] max-w-[850px] mx-auto relative z-10">
          {/* SEARCH BAR */}
          <div className="relative max-w-[620px] mx-auto mb-4 z-10">
            <div className="relative flex items-center">
              <i className="fas fa-search absolute left-5 text-[#b8860b] text-base pointer-events-none"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(10);
                }}
                placeholder="भजन खोजें... (हिंदी या English, जैसे: shyam teri bansi)"
                className="w-full pl-12 pr-12 py-3.5 rounded-full border-2 border-[#b8860b]/40 bg-white/95 text-[#3d2f14] font-medium text-base outline-none focus:border-[#b8860b] focus:bg-white focus:ring-4 focus:ring-[#b8860b]/15 shadow-md transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 w-7 h-7 rounded-full bg-[#b8860b]/15 text-[#b8860b] hover:bg-[#b8860b] hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>

          {/* Bilingual Search Hint */}
          <div className="text-center text-xs sm:text-sm text-[#6b5426] mb-6">
            <i className="fas fa-lightbulb text-[#b8860b] mr-1.5"></i>
            पूरे वाक्य से भी खोज सकते हैं —{' '}
            <span className="inline-block px-2 py-0.5 rounded-full bg-[#b8860b]/15 font-semibold text-[#8a6f1f] text-xs">
              shyam teri bansi
            </span>{' '}
            या{' '}
            <span className="inline-block px-2 py-0.5 rounded-full bg-[#b8860b]/15 font-semibold text-[#8a6f1f] text-xs">
              हारे का सहारा
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(10);
                }}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] shadow-md'
                    : 'bg-white/70 border border-[#b8860b]/30 text-[#6b5426] hover:border-[#b8860b] hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Result Count Banner */}
          {searchQuery && (
            <div className="text-center text-sm text-[#6b5426] mb-6 font-medium">
              <strong className="text-[#8a6f1f] font-dev-serif text-base">
                {filteredBhajans.length}
              </strong>{' '}
              भजन मिले "{searchQuery}" के लिए
            </div>
          )}

          {/* BHAJAN LIST */}
          {displayedBhajans.length === 0 ? (
            <div className="p-10 rounded-3xl bg-white/80 border border-[#b8860b]/30 text-center shadow-md">
              <i className="fas fa-search text-3xl text-[#b8860b] mb-3 block"></i>
              <h4 className="font-dev-serif text-lg font-bold text-[#8a6f1f] mb-2">
                कोई भजन नहीं मिला
              </h4>
              <p className="text-sm text-[#6b5426]">
                कृपया दूसरा खोज शब्द आज़माएँ। जैसे: <strong>श्याम</strong>, <strong>shyam</strong>,{' '}
                <strong>bansi</strong>, <strong>आरती</strong>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedBhajans.map((bhajan) => (
                <div
                  key={bhajan.id}
                  onClick={() => onNavigate('bhajan-detail', undefined, bhajan.id)}
                  className="p-4 sm:p-4.5 rounded-2xl bg-white/80 border border-[#b8860b]/30 border-l-4 border-l-[#b8860b] hover:border-l-[#d4af37] hover:bg-white hover:translate-x-1.5 hover:shadow-lg transition-all cursor-pointer flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#b8860b]/15 text-[#b8860b] group-hover:bg-[#b8860b] group-hover:text-white flex items-center justify-center text-base shrink-0 transition-all">
                    <i className="fas fa-book-open"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-dev-serif text-base sm:text-lg font-bold text-[#6b5426] group-hover:text-[#8a6f1f] truncate transition-colors">
                      {renderHighlightedTitle(bhajan.title)}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[#7a6538]">
                      <span>स्वर: {bhajan.singer}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#b8860b]/10 text-[#8a6f1f] font-medium">
                        {bhajan.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-[#b8860b] text-sm group-hover:translate-x-1 transition-transform shrink-0">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredBhajans.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + 10)}
                className="px-8 py-3 rounded-full border-2 border-[#b8860b] text-[#8a6f1f] font-bold text-sm sm:text-base hover:bg-[#b8860b] hover:text-white transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <i className="fas fa-plus-circle"></i> और भजन देखें
              </button>
            </div>
          )}
        </div>
      </section>

      {/* QUOTE STRIP */}
      <section className="py-12 bg-gradient-to-r from-[#0b1a33] via-[#122b4a] to-[#0b1a33] border-y border-[#d4af37]/30 text-center text-white">
        <div className="w-[92%] max-w-3xl mx-auto px-4">
          <blockquote className="font-dev-serif text-lg sm:text-2xl text-[#f5e7a3] leading-relaxed mb-3 italic">
            "बाबा श्याम का नाम लेते ही हर दुःख दूर हो जाता है, हर भक्त को सहारा मिल जाता है।"
          </blockquote>
          <div className="font-dev-serif text-base text-[#d4af37] tracking-widest font-semibold animate-glow">
            ॥ जय श्री श्याम ॥
          </div>
        </div>
      </section>
    </div>
  );
};
