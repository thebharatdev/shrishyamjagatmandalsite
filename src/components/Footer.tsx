import React from "react";
import { PageRoute } from "../types";

interface FooterProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#07101f] border-t border-[#d4af37]/20 pt-12 pb-6 text-white relative z-10">
      <div className="w-[92%] max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <i className="fas fa-gopuram text-[#f4a300] text-xl"></i>
              <h4 className="font-dev-serif text-lg font-bold text-[#d4af37]">
                श्री श्याम जगत मंडल
              </h4>
            </div>
            <p className="text-[#8a94a6] text-sm leading-relaxed mb-4">
              भक्ति, सेवा और श्रद्धा के पावन अभियान में आपका स्वागत है। हारे का
              सहारा, बाबा श्याम हमारा।
            </p>
            <div className="flex items-center gap-3 text-lg text-[#8a94a6]">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:text-[#d4af37] hover:scale-110 hover:bg-[#d4af37]/10 transition-all"
                title="फेसबुक"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:text-[#d4af37] hover:scale-110 hover:bg-[#d4af37]/10 transition-all"
                title="इंस्टाग्राम"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:text-[#d4af37] hover:scale-110 hover:bg-[#d4af37]/10 transition-all"
                title="यूट्यूब"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:text-[#25d366] hover:scale-110 hover:bg-[#25d366]/10 transition-all"
                title="व्हाट्सएप"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-dev-serif text-base font-semibold text-[#d4af37] mb-4">
              महत्वपूर्ण लिंक
            </h4>
            <ul className="space-y-2 text-sm text-[#8a94a6]">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  होम पेज
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  हमारे बारे में
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("bhajans")}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  श्याम भजन संग्रह
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("aarti")}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  श्री श्याम आरती
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("stuti")}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  श्री श्याम स्तुति
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  हमसे संपर्क करें
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Devotees */}
          <div>
            <h4 className="font-dev-serif text-base font-semibold text-[#d4af37] mb-4">
              भक्तों के लिए
            </h4>
            <ul className="space-y-2 text-sm text-[#8a94a6]">
              <li>
                <button
                  onClick={() => onNavigate("home", "darshan")}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  आज के दिव्य दर्शन
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("home", "festival")}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  आगामी पर्व एवं फाल्गुन मेला
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("home", "events")}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  भजन संध्या व कीर्तन आयोजन
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => onNavigate('home', 'panchang')}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  दैनिक पंचांग व शुभ मुहूर्त
                </button>
              </li> */}
              {/* <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#d4af37] transition-colors text-left"
                >
                  सेवा कार्य एवं अन्नदान
                </button>
              </li> */}
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4 className="font-dev-serif text-base font-semibold text-[#d4af37] mb-4">
              मंडल संपर्क
            </h4>
            <ul className="space-y-2.5 text-sm text-[#8a94a6]">
              {/* <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-[#d4af37] mt-1 shrink-0"></i>
                <span>श्री श्याम मंदिर, सेक्टर १२, नई दिल्ली - ११०००१</span>
              </li> */}
              <li className="flex items-center gap-2">
                <i className="fas fa-phone-alt text-[#d4af37] shrink-0"></i>
                <a href="tel:+919992211805" className="hover:text-[#d4af37]">
                  +91 9992211805
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-[#d4af37] shrink-0"></i>
                <a
                  href="mailto:shrishyamjagatmandal@gmail.com"
                  className="hover:text-[#d4af37]"
                >
                  shrishyamjagatmandal@gmail.com
                </a>
              </li>
              {/* <li className="flex items-center gap-2">
                <i className="fas fa-clock text-[#d4af37] shrink-0"></i>
                <span>दर्शन: प्रात: ६:०० - १२:००, सायं ४:०० - ९:००</span>
              </li> */}
            </ul>
          </div>
        </div>
        {/* Bottom bar */}
        {/* Bottom bar */}{" "}
        <div className="pt-6 border-t border-white/5 text-center text-xs sm:text-sm text-[#8a94a6]">
          {" "}
          <p>© 2026 श्री श्याम जगत मंडल। सर्वाधिकार सुरक्षित।</p>{" "}
         {/* Developer Credit */}
<p className="mt-2 flex items-center justify-center gap-1.5">
  Website Developed by{" "}
  <a
    href="https://bharatbhushan.netlify.app"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#d4af37] font-semibold hover:text-[#f4a300] transition-colors"
  >
    Bharat Bhushan
  </a>
  <span
    className="inline-block text-lg animate-heartbeat"
    title="Made with love"
  >
    💚
  </span>
  <span>| Jaipur</span>

  
</p>
          <p className="font-dev-serif text-base text-[#d4af37] font-semibold mt-2 tracking-widest animate-pulse-gold">
            {" "}
            ॥ जय श्री श्याम ॥{" "}
          </p>{" "}
        </div>
      </div>
    </footer>
  );
};
