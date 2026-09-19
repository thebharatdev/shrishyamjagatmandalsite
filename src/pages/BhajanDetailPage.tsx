import React, { useState } from 'react';
import { PageRoute } from '../types';
import { BHAJANS_DATA } from '../data/bhajans';

interface BhajanDetailPageProps {
  bhajanId: string | null;
  onNavigate: (page: PageRoute) => void;
  onShowToast: (msg: string) => void;
}

export const BhajanDetailPage: React.FC<BhajanDetailPageProps> = ({
  bhajanId,
  onNavigate,
  onShowToast
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const bhajan = BHAJANS_DATA.find((b) => b.id === bhajanId) || BHAJANS_DATA[0];

  if (!bhajan) {
    return (
      <div className="pt-28 pb-20 text-center text-[#3d2f14] px-4">
        <div className="max-w-md mx-auto p-10 rounded-3xl bg-white/80 border border-[#b8860b]/40 shadow-xl">
          <i className="fas fa-book-open text-4xl text-[#b8860b] mb-4 block"></i>
          <h3 className="font-dev-serif text-2xl text-[#8a6f1f] font-bold mb-2">
            भजन नहीं मिला
          </h3>
          <p className="text-sm text-[#6b5426] mb-6">
            क्षमा करें, यह भजन उपलब्ध नहीं है।
          </p>
          <button
            onClick={() => onNavigate('bhajans')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-sm"
          >
            भजन सूची पर वापस जाएँ
          </button>
        </div>
      </div>
    );
  }

  // Split lyrics into stanzas
  const stanzas = bhajan.lyrics
    .split('\n\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const handleCopy = async () => {
    try {
      const tarjLine = bhajan.tarj ? `तर्ज: ${bhajan.tarj}\n` : '';
      const textToCopy = `${bhajan.title}\nस्वर: ${bhajan.singer}\n${tarjLine}\n${bhajan.lyrics}`;
      await navigator.clipboard.writeText(textToCopy);
      onShowToast('भजन के बोल कॉपी हो गए ✓');
    } catch {
      onShowToast('कॉपी नहीं हो पाया');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${bhajan.title} | श्री श्याम जगत मंडल`,
      text: `${bhajan.title} — स्वर: ${bhajan.singer}`,
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      onShowToast('भजन लिंक कॉपी हो गया ✓');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const fontSizeClass =
    fontSize === 'xlarge'
      ? 'text-xl sm:text-2xl leading-loose'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl leading-relaxed'
      : 'text-base sm:text-lg leading-relaxed';

  return (
    <div className="pt-20">
      {/* Top navigation back button */}
      <div className="py-4 bg-[#0b1a33]/90 border-b border-[#d4af37]/20 relative z-10">
        <div className="w-[92%] max-w-[850px] mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('bhajans')}
            className="inline-flex items-center gap-2 text-sm text-[#f5e7a3] hover:text-white font-medium transition-colors cursor-pointer"
          >
            <i className="fas fa-arrow-left"></i> भजन संग्रह पर वापस जाएँ
          </button>

          {/* Text Size Controls */}
          <div className="flex items-center gap-1.5 text-xs text-[#f5e7a3]">
            <span className="opacity-80">अक्षर:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-[#d4af37] text-[#0b1a33] font-bold' : 'hover:bg-white/10'}`}
            >
              छोटा
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded ${fontSize === 'large' ? 'bg-[#d4af37] text-[#0b1a33] font-bold' : 'hover:bg-white/10'}`}
            >
              मध्यम
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-1 rounded ${fontSize === 'xlarge' ? 'bg-[#d4af37] text-[#0b1a33] font-bold' : 'hover:bg-white/10'}`}
            >
              बड़ा
            </button>
          </div>
        </div>
      </div>

      {/* Main Bhajan Article */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#fdf8ed] via-[#faf0dc] to-[#f5e6c8] text-[#3d2f14] min-h-[75vh] relative">
        <div className="w-[92%] max-w-[800px] mx-auto relative z-10">
          <article className="bg-white/95 border-2 border-[#b8860b]/35 rounded-3xl p-6 sm:p-12 shadow-[0_15px_45px_rgba(139,111,31,0.15)] relative z-10 overflow-hidden backdrop-blur-md">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-dev-serif text-xs font-bold shadow-md mb-3">
                <i className="fas fa-om"></i> {bhajan.category}
              </span>

              <h1 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] font-bold mb-3 leading-tight">
                {bhajan.title}
              </h1>

              {/* Singer & Tarj meta row */}
              <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-[#6b5426]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/25">
                  <i className="fas fa-microphone text-[#b8860b]"></i>
                  <span>स्वर: <strong>{bhajan.singer}</strong></span>
                </span>

                {bhajan.tarj && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/25">
                    <i className="fas fa-music text-[#b8860b]"></i>
                    <span>तर्ज: <strong>{bhajan.tarj}</strong></span>
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-3 text-[#b8860b] mt-4">
                <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#b8860b]"></span>
                <span>❋</span>
                <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#b8860b]"></span>
              </div>
            </div>

            {/* Lyrics Stanzas */}
            <div className={`font-dev-serif text-[#3d2f14] text-center space-y-6 ${fontSizeClass}`}>
              {stanzas.map((stanza, idx) => (
                <div key={idx} className="space-y-1">
                  {stanza.split('\n').map((line, lineIdx) => (
                    <div key={lineIdx}>{line}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* End Signature */}
            <div className="text-center pt-8 mt-8 border-t border-dashed border-[#b8860b]/35">
              <span className="text-2xl text-[#b8860b] font-bold block mb-1">ॐ</span>
              <span className="font-dev-serif text-[#8a6f1f] text-lg font-bold tracking-widest">
                ॥ जय श्री श्याम ॥
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 pt-6 border-t border-[#b8860b]/20">
              <button
                onClick={handleCopy}
                className="px-6 py-2.5 rounded-full border-2 border-[#b8860b] text-[#8a6f1f] font-semibold text-sm hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#b8860b] hover:text-[#0b1a33] hover:border-transparent transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <i className="fas fa-copy"></i> कॉपी करें
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-2.5 rounded-full border-2 border-[#b8860b] text-[#8a6f1f] font-semibold text-sm hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#b8860b] hover:text-[#0b1a33] hover:border-transparent transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <i className="fas fa-share-alt"></i> साझा करें
              </button>
              <button
                onClick={handlePrint}
                className="px-6 py-2.5 rounded-full border-2 border-[#b8860b] text-[#8a6f1f] font-semibold text-sm hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#b8860b] hover:text-[#0b1a33] hover:border-transparent transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <i className="fas fa-print"></i> प्रिंट करें
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
