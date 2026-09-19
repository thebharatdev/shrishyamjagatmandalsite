import React from 'react';
import { PageRoute } from '../types';
import { STUTI_DATA } from '../data/bhajans';

interface StutiPageProps {
  onNavigate: (page: PageRoute) => void;
  onShowToast: (msg: string) => void;
}

export const StutiPage: React.FC<StutiPageProps> = ({ onNavigate, onShowToast }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${STUTI_DATA.title}\n\n${STUTI_DATA.lyrics}`);
      onShowToast('स्तुति के बोल कॉपी हो गए ✓');
    } catch {
      onShowToast('कॉपी नहीं हो पाया');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'श्री श्याम स्तुति | श्री श्याम जगत मंडल',
          text: 'श्री श्याम स्तुति — हाथ जोड़ विनती करूँ, सुनियो चित्त लगाय',
          url: window.location.href
        });
      } catch {
        // cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      onShowToast('स्तुति लिंक कॉपी हो गया ✓');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const stanzas = STUTI_DATA.lyrics.split('\n\n');

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
            श्री श्याम <span className="bg-gradient-to-r from-[#f5e7a3] to-[#d4af37] bg-clip-text text-transparent">स्तुति</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-3" />
          <div className="font-dev-serif text-sm sm:text-base text-[#d4af37] tracking-widest animate-glow">
            ॥ जय श्री श्याम ॥
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#fdf8ed] via-[#faf0dc] to-[#f5e6c8] text-[#3d2f14] min-h-[75vh] relative">
        <div className="w-[92%] max-w-[850px] mx-auto relative z-10">
          {/* Intro Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#b8860b]/30 text-center mb-10 shadow-md backdrop-blur-md relative z-10">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-tr from-[#d4af37]/25 to-[#f4a300]/20 border-2 border-[#b8860b]/40 text-[#b8860b] flex items-center justify-center text-2xl shadow-sm">
              <i className="fas fa-praying-hands"></i>
            </div>
            <h2 className="font-dev-serif text-xl sm:text-2xl text-[#8a6f1f] font-bold mb-2">
              भावपूर्ण स्तुति पाठ
            </h2>
            <p className="text-sm sm:text-base text-[#6b5426] max-w-xl mx-auto leading-relaxed">
              बाबा श्याम की स्तुति से मन में सच्ची श्रद्धा व भक्ति का संचार होता है। प्रतिदिन प्रातः पूजा उपरांत इस स्तुति का पाठ करना अत्यंत कल्याणकारी है।
            </p>
          </div>

          {/* Stuti Card */}
          <article className="bg-white/95 border-2 border-[#b8860b]/35 rounded-3xl p-6 sm:p-12 shadow-[0_15px_45px_rgba(139,111,31,0.15)] relative z-10 overflow-hidden backdrop-blur-md">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-dev-serif text-xs font-bold shadow-md mb-3">
                <i className="fas fa-om"></i> स्तुति
              </span>
              <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] font-bold mb-3">
                {STUTI_DATA.title}
              </h2>
              <div className="text-xs sm:text-sm text-[#6b5426]">
                <span className="px-3 py-1 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/25">
                  <i className="fas fa-music text-[#b8860b] mr-1"></i> {STUTI_DATA.tarj}
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 text-[#b8860b] mt-4">
                <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#b8860b]"></span>
                <span>❋</span>
                <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#b8860b]"></span>
              </div>
            </div>

            <div className="font-dev-serif text-[#3d2f14] text-base sm:text-xl text-center leading-loose space-y-6">
              {stanzas.map((stanza, idx) => (
                <div key={idx} className="space-y-1">
                  {stanza.split('\n').map((line, lineIdx) => (
                    <div key={lineIdx}>{line}</div>
                  ))}
                </div>
              ))}
            </div>

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

      {/* QUOTE STRIP */}
      <section className="py-12 bg-gradient-to-r from-[#0b1a33] via-[#122b4a] to-[#0b1a33] border-y border-[#d4af37]/30 text-center text-white">
        <div className="w-[92%] max-w-3xl mx-auto px-4">
          <blockquote className="font-dev-serif text-lg sm:text-2xl text-[#f5e7a3] leading-relaxed mb-3 italic">
            "हारे का तू सहारा है, तेरा पावन नाम है — बाबा श्याम के चरणों में कोटि-कोटि प्रणाम है।"
          </blockquote>
          <div className="font-dev-serif text-base text-[#d4af37] tracking-widest font-semibold animate-glow">
            ॥ जय श्री श्याम ॥
          </div>
        </div>
      </section>
    </div>
  );
};
