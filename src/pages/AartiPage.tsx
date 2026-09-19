import React from 'react';
import { PageRoute } from '../types';

interface AartiPageProps {
  onNavigate: (page: PageRoute) => void;
  onShowToast: (msg: string) => void;
}

export const AartiPage: React.FC<AartiPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const aartiText = `श्री श्याम आरती

जय श्री श्याम हरे, बाबा जय श्री श्याम हरे ।
खाटू धाम विराजत, अनुपम रूप धरे ॥
ॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे ।

रतन जड़ित सिंहासन, सिर पर चंवर ढुरे ।
तन केसरिया बागो, कुण्डल श्रवण पड़े ॥
ॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे ।

गल पुष्पों की माला, सिर पार मुकुट धरे ।
खेवत धूप अग्नि पर, दीपक ज्योति जले ॥
ॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे ।

मोदक खीर चूरमा, सुवरण थाल भरे ।
सेवक भोग लगावत, सेवा नित्य करे ॥
ॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे ।

झांझ कटोरा और घडियावल, शंख मृदंग घुरे ।
भक्त आरती गावे, जय-जयकार करे ॥
ॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे ।

जो ध्यावे फल पावे, सब दुःख से उबरे ।
सेवक जन निज मुख से, श्री श्याम-श्याम उचरे ॥
ॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे ।

श्री श्याम बिहारी जी की आरती, जो कोई नर गावे ।
कहत आलुसिंह स्वामी, मनवांछित फल पावे ॥
ॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे ।

जय श्री श्याम हरे, बाबा जी श्री श्याम हरे ।
निज भक्तों के तुमने, पूरण काज करे ॥
ॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे ।

ॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे ।
खाटू धाम विराजत, अनुपम रूप धरे ॥
ॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे ।

॥ जय श्री श्याम ॥`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(aartiText);
      onShowToast('आरती के बोल कॉपी हो गए ✓');
    } catch {
      onShowToast('कॉपी नहीं हो पाया');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'श्री श्याम आरती | श्री श्याम जगत मंडल',
          text: 'श्री श्याम आरती — ॐ जय श्री श्याम हरे',
          url: window.location.href,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        onShowToast('आरती लिंक कॉपी हो गया ✓');
      } catch {
        onShowToast('लिंक कॉपी नहीं हो पाया');
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // आरती के टेक्स्ट को paragraphs में divide करना
  const aartiParagraphs = aartiText
    .split('\n\n')
    .filter((paragraph) => paragraph.trim());

  return (
    <div className="pt-20">
      {/* PAGE BANNER */}
      <section className="relative py-14 sm:py-20 text-center overflow-hidden bg-gradient-to-b from-[#0b1a33]/90 via-[#0b1a33] to-[#0b1a33]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1600&auto=format&fit=crop&q=80')",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="font-dev-serif text-3xl sm:text-5xl text-white font-bold mb-3">
            श्री श्याम{' '}
            <span className="bg-gradient-to-r from-[#f5e7a3] to-[#d4af37] bg-clip-text text-transparent">
              आरती
            </span>
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
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-tr from-[#d4af37]/25 to-[#f4a300]/20 border-2 border-[#b8860b]/40 text-[#b8860b] flex items-center justify-center text-2xl animate-bell shadow-sm">
              <i className="fas fa-bell"></i>
            </div>

            <h2 className="font-dev-serif text-xl sm:text-2xl text-[#8a6f1f] font-bold mb-2">
              नित्य पावन आरती
            </h2>

            <p className="text-sm sm:text-base text-[#6b5426] max-w-xl mx-auto leading-relaxed">
              प्रातः एवं सायं बाबा श्याम की आरती करें। श्रद्धा से की गई आरती से
              मन को शांति, घर में सुख-समृद्धि एवं बाबा का आशीर्वाद प्राप्त होता
              है।
            </p>
          </div>

          {/* Aarti Text Card */}
          <article className="bg-white/95 border-2 border-[#b8860b]/35 rounded-3xl p-6 sm:p-12 shadow-[0_15px_45px_rgba(139,111,31,0.15)] relative z-10 overflow-hidden backdrop-blur-md">

            {/* Heading */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-dev-serif text-xs font-bold shadow-md mb-3">
                <i className="fas fa-bell"></i> आरती
              </span>

              <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] font-bold mb-3">
                श्री श्याम आरती
              </h2>

              <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-[#6b5426]">
                <span className="px-3 py-1 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/25">
                  <i className="fas fa-music text-[#b8860b] mr-1"></i>
                  तर्ज: ॐ जय जगदीश हरे
                </span>

                <span className="px-3 py-1 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/25">
                  <i className="far fa-clock text-[#b8860b] mr-1"></i>
                  समय: प्रातः एवं सायं
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 text-[#b8860b] mt-4">
                <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#b8860b]"></span>
                <span>❋</span>
                <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#b8860b]"></span>
              </div>
            </div>

            {/* EXACT AARTI TEXT FROM aartiText */}
            <div className="font-dev-serif text-[#3d2f14] text-base sm:text-xl text-center leading-loose">

              {aartiParagraphs.map((paragraph, index) => {
                const lines = paragraph.split('\n');

                return (
                  <div
                    key={index}
                    className={`space-y-1 ${
                      index !== aartiParagraphs.length - 1
                        ? 'mb-7'
                        : ''
                    }`}
                  >
                    {lines.map((line, lineIndex) => (
                      <div
                        key={lineIndex}
                        className={
                          line === 'श्री श्याम आरती'
                            ? 'text-[#8a6f1f] text-xl sm:text-2xl font-bold mb-4'
                            : line.includes('ॐ जय श्री श्याम हरे')
                              ? 'text-[#8a6f1f] font-bold'
                              : line === '॥ जय श्री श्याम ॥'
                                ? 'text-[#b8860b] font-bold text-lg sm:text-xl mt-4'
                                : ''
                        }
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                );
              })}

            </div>

            {/* Bottom Decoration */}
            <div className="text-center pt-8 mt-8 border-t border-dashed border-[#b8860b]/35">
              <span className="text-2xl text-[#b8860b] font-bold block mb-1">
                ॐ
              </span>

              <span className="font-dev-serif text-[#8a6f1f] text-lg font-bold tracking-widest">
                ॥ जय श्री श्याम ॥
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 pt-6 border-t border-[#b8860b]/20">

              {/* Copy */}
              <button
                onClick={handleCopy}
                className="px-6 py-2.5 rounded-full border-2 border-[#b8860b] text-[#8a6f1f] font-semibold text-sm hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#b8860b] hover:text-[#0b1a33] hover:border-transparent transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <i className="fas fa-copy"></i>
                कॉपी करें
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="px-6 py-2.5 rounded-full border-2 border-[#b8860b] text-[#8a6f1f] font-semibold text-sm hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#b8860b] hover:text-[#0b1a33] hover:border-transparent transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <i className="fas fa-share-alt"></i>
                साझा करें
              </button>

              {/* Print */}
              <button
                onClick={handlePrint}
                className="px-6 py-2.5 rounded-full border-2 border-[#b8860b] text-[#8a6f1f] font-semibold text-sm hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#b8860b] hover:text-[#0b1a33] hover:border-transparent transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <i className="fas fa-print"></i>
                प्रिंट करें
              </button>

            </div>
          </article>
        </div>
      </section>

      {/* QUOTE STRIP */}
      <section className="py-12 bg-gradient-to-r from-[#0b1a33] via-[#122b4a] to-[#0b1a33] border-y border-[#d4af37]/30 text-center text-white">
        <div className="w-[92%] max-w-3xl mx-auto px-4">

          <blockquote className="font-dev-serif text-lg sm:text-2xl text-[#f5e7a3] leading-relaxed mb-3 italic">
            "जो भक्त श्रद्धा से बाबा श्याम की आरती करता है, बाबा उसके जीवन से
            सारे दुःख दूर कर देते हैं।"
          </blockquote>

          <div className="font-dev-serif text-base text-[#d4af37] tracking-widest font-semibold animate-glow">
            ॥ जय श्री श्याम ॥
          </div>

        </div>
      </section>
    </div>
  );
};