import React from 'react';
import { PageRoute } from '../types';
import { STATS, TIMELINE_ITEMS, TEAM_MEMBERS, SEVA_CARDS } from '../data/siteData';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20">

      {/* PAGE BANNER */}
      <section className="relative py-16 sm:py-24 text-center overflow-hidden bg-gradient-to-b from-[#0b1a33]/90 via-[#0b1a33] to-[#0b1a33] bg-cover bg-center">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: "url('/src/data/images/slide2.jpg')"
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4">

          <h1 className="font-dev-serif text-3xl sm:text-5xl text-white font-bold mb-3">
            हमारे{' '}
            <span className="bg-gradient-to-r from-[#f5e7a3] to-[#d4af37] bg-clip-text text-transparent">
              बारे में
            </span>
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-3" />

          <div className="font-dev-serif text-sm sm:text-base text-[#d4af37] tracking-widest animate-glow">
            ॥ जय श्री श्याम ॥
          </div>

        </div>
      </section>


      {/* WARM CONTENT CONTAINER */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-[#fdf8ed] via-[#faf0dc] to-[#f5e6c8] text-[#3d2f14] relative">

        <div className="w-[92%] max-w-[1100px] mx-auto relative z-10">

          {/* Top Center Hero Image */}
          <div className="max-w-[780px] mx-auto mb-14 text-center">

            <div className="relative border-4 border-[#b8860b] rounded-3xl overflow-hidden shadow-[0_20px_55px_rgba(139,111,31,0.3)] aspect-[16/10] max-h-[420px] mx-auto bg-[#e8d5a8]">

              <img
                src="/src/data/images/aboutpage.jpg"
                alt="श्री श्याम जगत मंडल"
                className="w-full h-full object-cover"
                loading="eager"
              />

              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-dev-serif font-bold text-xs sm:text-sm shadow-xl whitespace-nowrap flex items-center gap-2">

                <i className="fas fa-gopuram"></i>

                श्री श्याम जगत मंडल

              </span>

            </div>

            <p className="font-dev-serif text-base sm:text-lg text-[#6b5426] italic mt-8 max-w-xl mx-auto">
              "भक्ति, सेवा और श्रद्धा — यही हमारा मार्ग है।"
            </p>

          </div>


          {/* Mandal Objective / Free Kirtan */}
          <div className="text-center mb-8">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-xl mb-3">
              <i className="fas fa-bullseye"></i>
            </div>

            <h2 className="font-dev-serif text-2xl sm:text-3xl text-[#8a6f1f] font-bold mb-2">
              हमारा उद्देश्य
            </h2>

            <p className="text-sm sm:text-base text-[#6b5426] max-w-3xl mx-auto leading-relaxed">
              <strong className="text-[#8a6f1f]">
                श्री श्याम जगत मंडल, भिवानी
              </strong>{' '}
              का उद्देश्य है कि बाबा खाटू श्याम जी की भक्ति और कृपा हर घर तक पहुँचे।
            </p>

          </div>


          {/* Kirtan Card */}
          <div className="bg-white/80 border-2 border-[#b8860b]/30 rounded-3xl p-6 sm:p-10 shadow-lg mb-14 text-center">

            <p className="font-dev-serif text-lg sm:text-2xl text-[#8a6f1f] font-bold leading-relaxed mb-5">

              <strong>
                <em>
                  हर घर गूँजे बाबा का नाम,
                  <br />
                  हर आँगन जले श्याम की ज्योत ❤️
                </em>
              </strong>

            </p>

            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-5" />

            <p className="text-base sm:text-lg text-[#6b5426] leading-relaxed mb-5">

              हमारा संकल्प है कि हर घर में बाबा का कीर्तन हो, श्याम नाम का गुणगान हो
              और बाबा की ज्योत प्रज्वलित हो।

            </p>

            <p className="font-dev-serif text-base sm:text-lg text-[#8a6f1f] font-semibold italic mb-6">

              “जहाँ भक्त बुलाएँ, वहाँ बाबा का गुणगान पहुँचाएँ।”

            </p>


            <div className="inline-flex flex-col items-center px-6 py-5 rounded-2xl bg-[#b8860b]/10 border border-[#b8860b]/30">

              <h3 className="font-dev-serif text-xl sm:text-2xl font-bold text-[#8a6f1f] mb-2">

                🕉️ निःशुल्क श्याम कीर्तन

              </h3>

              <p className="text-sm sm:text-base text-[#6b5426] leading-relaxed mb-4 max-w-2xl">

                हम विभिन्न स्थानों एवं घरों में{' '}

                <strong>
                  निःशुल्क श्याम कीर्तन
                </strong>{' '}

                करते हैं।

                आप भी अपने घर बाबा का कीर्तन करवाना चाहते हैं तो संपर्क करें।

              </p>

              <a
                href="tel:+919992211805"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-base sm:text-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
              >

                <i className="fas fa-phone-alt"></i>

                <span>
                  +91 9992211805
                </span>

              </a>

            </div>


            <p className="font-dev-serif text-base sm:text-lg text-[#8a6f1f] font-bold italic mt-7 leading-relaxed">

              <strong>
                <em>
                  “घर-घर गूँजे श्याम का नाम,
                  <br />
                  घर-घर जले बाबा की ज्योत महान।”
                </em>
              </strong>

            </p>

          </div>


          {/* Stats Strip */}
          {/* 
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">

            {STATS.map((s, idx) => (

              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/70 border border-[#b8860b]/35 text-center shadow-md hover:-translate-y-1 transition-transform"
              >

                <div className="font-dev-serif text-2xl sm:text-4xl font-bold text-[#8a6f1f] mb-1">
                  {s.number}
                </div>

                <div className="text-xs sm:text-sm text-[#6b5426] font-medium">
                  {s.label}
                </div>

              </div>

            ))}

          </div>
          */}


          {/* Mission / Vision / Values */}
          {/*
          <div className="text-center mb-8">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-xl mb-3">
              <i className="fas fa-bullseye"></i>
            </div>

            <h2 className="font-dev-serif text-2xl sm:text-3xl text-[#8a6f1f] font-bold mb-2">
              हमारा मिशन एवं दृष्टिकोण
            </h2>

            <p className="text-sm sm:text-base text-[#6b5426]">
              हम क्या करना चाहते हैं और क्यों करते हैं
            </p>

          </div>
          */}


          {/*
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

            <div className="bg-white/75 border border-[#b8860b]/30 rounded-3xl p-6 text-center shadow-md hover:-translate-y-2 hover:border-[#b8860b] transition-all">

              <div className="w-14 h-14 mx-auto rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-2xl mb-4">
                <i className="fas fa-hands-praying"></i>
              </div>

              <h3 className="font-dev-serif text-xl font-bold text-[#8a6f1f] mb-2">
                हमारा मिशन
              </h3>

              <p className="text-sm text-[#6b5426] leading-relaxed">
                बाबा श्याम की भक्ति को जन-जन तक पहुँचाना एवं भक्तों को एकजुट करके भक्ति एवं सेवा के मार्ग पर आगे बढ़ना।
              </p>

            </div>


            <div className="bg-white/75 border border-[#b8860b]/30 rounded-3xl p-6 text-center shadow-md hover:-translate-y-2 hover:border-[#b8860b] transition-all">

              <div className="w-14 h-14 mx-auto rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-2xl mb-4">
                <i className="fas fa-eye"></i>
              </div>

              <h3 className="font-dev-serif text-xl font-bold text-[#8a6f1f] mb-2">
                हमारा दृष्टिकोण
              </h3>

              <p className="text-sm text-[#6b5426] leading-relaxed">
                एक ऐसे समाज का निर्माण जहाँ प्रेम, भाईचारा और सेवा की भावना हर हृदय में हो, और सनातन संस्कृति का प्रचार हो।
              </p>

            </div>


            <div className="bg-white/75 border border-[#b8860b]/30 rounded-3xl p-6 text-center shadow-md hover:-translate-y-2 hover:border-[#b8860b] transition-all">

              <div className="w-14 h-14 mx-auto rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-2xl mb-4">
                <i className="fas fa-heart"></i>
              </div>

              <h3 className="font-dev-serif text-xl font-bold text-[#8a6f1f] mb-2">
                हमारे मूल्य
              </h3>

              <p className="text-sm text-[#6b5426] leading-relaxed">
                श्रद्धा, सेवा, सत्यनिष्ठा, समर्पण एवं सबके प्रति प्रेम — यही हमारे जीवन के आधार हैं।
              </p>

            </div>

          </div>
          */}


          {/* Timeline */}
          {/*
          <div className="text-center mb-8">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-xl mb-3">
              <i className="fas fa-history"></i>
            </div>

            <h2 className="font-dev-serif text-2xl sm:text-3xl text-[#8a6f1f] font-bold mb-2">
              हमारी यात्रा
            </h2>

            <p className="text-sm sm:text-base text-[#6b5426]">
              छोटे से आरंभ से लेकर आज तक की पावन यात्रा
            </p>

          </div>
          */}


          {/*
          <div className="max-w-2xl mx-auto mb-16 relative pl-8 sm:pl-10 border-l-2 border-[#b8860b]">

            {TIMELINE_ITEMS.map((t, idx) => (

              <div
                key={idx}
                className="relative mb-8 last:mb-0"
              >

                <span className="absolute -left-[41px] sm:-left-[49px] top-1 w-6 h-6 rounded-full bg-[#b8860b] border-4 border-[#faf0dc] shadow-md" />

                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-xs mb-2">
                  {t.year}
                </span>

                <h4 className="font-dev-serif text-lg font-bold text-[#8a6f1f] mb-1">
                  {t.title}
                </h4>

                <p className="text-sm text-[#6b5426] leading-relaxed">
                  {t.desc}
                </p>

              </div>

            ))}

          </div>
          */}


          {/* =====================================================
              TEAM MEMBERS
          ===================================================== */}
          <div className="text-center mb-10">

            <div className="w-16 h-16 mx-auto rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-2xl mb-4 border border-[#b8860b]/20">
              <i className="fas fa-users-cog"></i>
            </div>

            <h2 className="font-dev-serif text-3xl sm:text-4xl text-[#8a6f1f] font-bold mb-3">

              मंडल की{' '}

              <span className="bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#8a6f1f] bg-clip-text text-transparent">
                टीम
              </span>

            </h2>

            <div className="flex items-center justify-center gap-3 mb-4">

              <div className="w-14 sm:w-20 h-px bg-gradient-to-r from-transparent to-[#d4af37]" />

              <span className="text-[#b8860b] text-sm">
                ✦
              </span>

              <div className="w-14 sm:w-20 h-px bg-gradient-to-l from-transparent to-[#d4af37]" />

            </div>

            <p className="text-sm sm:text-base text-[#6b5426]">
              जो समर्पण एवं सेवा भाव से मंडल का संचालन करते हैं
            </p>

          </div>


          {/* =====================================================
              TEAM CARDS
              PHOTO + NAME + POST ONLY
          ===================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

            {TEAM_MEMBERS.map((m, idx) => (

              <div
                key={idx}
                className="bg-white/75 border border-[#b8860b]/30 rounded-3xl p-6 text-center shadow-md hover:-translate-y-2 hover:border-[#b8860b] hover:shadow-xl transition-all duration-300"
              >

                {/* Large Photo */}
                <div className="relative w-40 h-40 sm:w-44 sm:h-44 mx-auto mb-6">

                  {/* Outer Golden Ring */}
                  <div className="absolute -inset-1 rounded-full border-2 border-[#d4af37]" />

                  {/* Photo */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-[5px] border-[#b8860b] bg-[#e8d5a8] shadow-lg">

                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                  </div>

                </div>


                {/* Name */}
                <h4 className="font-dev-serif text-xl sm:text-2xl font-bold text-[#8a6f1f] mb-3">
                  {m.name}
                </h4>


                {/* Post */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/30">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]"></span>

                  <span className="text-xs font-bold text-[#9a771d] tracking-wide">
                    {m.role}
                  </span>

                </div>

              </div>

            ))}

          </div>


          {/* =====================================================
              SEVA SECTION
          ===================================================== */}

          {/*
          <div className="text-center mb-8">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-xl mb-3">
              <i className="fas fa-hand-holding-heart"></i>
            </div>

            <h2 className="font-dev-serif text-2xl sm:text-3xl text-[#8a6f1f] font-bold mb-2">
              हमारे सेवा कार्य
            </h2>

            <p className="text-sm sm:text-base text-[#6b5426]">
              भक्ति के साथ-साथ सेवा — यही हमारा संकल्प है
            </p>

          </div>
          */}


          {/*
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

            {SEVA_CARDS.map((s, idx) => (

              <div
                key={idx}
                className="bg-white/75 border border-[#b8860b]/30 rounded-3xl p-6 text-center shadow-md"
              >

                <div className="w-12 h-12 mx-auto rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-xl mb-3">
                  <i className={`fas ${s.icon}`}></i>
                </div>

                <h4 className="font-dev-serif text-base font-bold text-[#8a6f1f] mb-1">
                  {s.title}
                </h4>

                <p className="text-xs text-[#6b5426] leading-relaxed">
                  {s.desc}
                </p>

              </div>

            ))}

          </div>
          */}


          {/* =====================================================
              CTA BLOCK
          ===================================================== */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#d4af37]/15 to-[#b8860b]/10 border-2 border-dashed border-[#b8860b]/50 text-center shadow-lg">

            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] flex items-center justify-center text-2xl mb-4 shadow-md">

              <i className="fas fa-hands-helping"></i>

            </div>

            <h3 className="font-dev-serif text-2xl sm:text-3xl text-[#8a6f1f] font-bold mb-3">

              इस पावन अभियान का हिस्सा बनें

            </h3>

            <p className="text-base text-[#6b5426] max-w-xl mx-auto mb-6">

              बाबा श्याम की भक्ति को घर-घर पहुँचाने के इस पावन संकल्प से जुड़ें।
              निःशुल्क श्याम कीर्तन के लिए आज ही संपर्क करें।

            </p>

            <div className="flex flex-wrap justify-center gap-4">

              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >

                <i className="fas fa-phone-alt mr-1.5"></i>

                कीर्तन के लिए संपर्क करें

              </button>


              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-3 rounded-full border-2 border-[#b8860b] text-[#8a6f1f] font-bold text-sm sm:text-base hover:bg-[#b8860b]/10 transition-all cursor-pointer"
              >

                <i className="fas fa-envelope mr-1.5"></i>

                संपर्क करें

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          QUOTE STRIP
      ========================================================= */}
      <section className="py-12 bg-gradient-to-r from-[#0b1a33] via-[#122b4a] to-[#0b1a33] border-y border-[#d4af37]/30 text-center text-white">

        <div className="w-[92%] max-w-3xl mx-auto px-4">

          <blockquote className="font-dev-serif text-lg sm:text-2xl text-[#f5e7a3] leading-relaxed mb-3 italic">

            "जहाँ भक्ति है, वहाँ शक्ति है — और जहाँ सेवा है, वहाँ बाबा श्याम का आशीर्वाद है।"

          </blockquote>

          <div className="font-dev-serif text-base text-[#d4af37] tracking-widest font-semibold animate-glow">

            ॥ जय श्री श्याम ॥

          </div>

        </div>

      </section>

    </div>
  );
};
