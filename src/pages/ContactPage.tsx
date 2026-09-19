import React, { useState } from 'react';
import { PageRoute } from '../types';
import { FAQ_ITEMS } from '../data/siteData';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
  onShowToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onShowToast }) => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name.trim()) {
      onShowToast('कृपया अपना नाम लिखें');
      return;
    }
    if (!formState.phone.trim() || !/^[0-9]{10}$/.test(formState.phone.trim())) {
      onShowToast('कृपया सही १० अंकों का मोबाइल नंबर डालें');
      return;
    }
    if (!formState.subject) {
      onShowToast('कृपया विषय चुनें');
      return;
    }
    if (!formState.message.trim()) {
      onShowToast('कृपया अपना संदेश लिखें');
      return;
    }
    if (formState.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      onShowToast('कृपया सही ईमेल पता डालें');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onShowToast('॥ जय श्री श्याम ॥ आपका संदेश भेज दिया गया है!');
      setFormState({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 1100);
  };

  return (
    <div className="pt-20">
      {/* PAGE BANNER */}
      <section className="relative py-14 sm:py-20 text-center overflow-hidden bg-gradient-to-b from-[#0b1a33]/90 via-[#0b1a33] to-[#0b1a33]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1600&auto=format&fit=crop&q=80')"
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="font-dev-serif text-3xl sm:text-5xl text-white font-bold mb-3">
            हमसे <span className="bg-gradient-to-r from-[#f5e7a3] to-[#d4af37] bg-clip-text text-transparent">संपर्क करें</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-3" />
          <div className="font-dev-serif text-sm sm:text-base text-[#d4af37] tracking-widest animate-glow">
            ॥ जय श्री श्याम ॥
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#fdf8ed] via-[#faf0dc] to-[#f5e6c8] text-[#3d2f14] relative">
        <div className="w-[92%] max-w-[1150px] mx-auto relative z-10">
          {/* Intro Card */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-tr from-[#d4af37]/25 to-[#f4a300]/20 border-2 border-[#b8860b]/40 text-[#b8860b] flex items-center justify-center text-2xl shadow-sm">
              <i className="fas fa-hands-praying"></i>
            </div>
            <h2 className="font-dev-serif text-2xl sm:text-3xl text-[#8a6f1f] font-bold mb-2">
              भक्ति और सेवा के इस पावन अभियान से जुड़ें
            </h2>
            <p className="text-sm sm:text-base text-[#6b5426] leading-relaxed">
              कोई प्रश्न, सुझाव, या सहयोग की भावना है? हमें संदेश भेजें — श्री श्याम जगत मंडल परिवार आपकी सेवा में सदा तत्पर है।
            </p>
          </div>

          {/* Contact Cards - Centered */}
          <div className="flex flex-wrap justify-center items-stretch gap-6 max-w-2xl mx-auto mb-12">
            <div className="w-full sm:w-[280px] p-6 rounded-3xl bg-white/85 border border-[#b8860b]/35 text-center shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-2xl mb-3 shadow-inner">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h4 className="font-dev-serif text-lg font-bold text-[#6b5426] mb-1">फ़ोन</h4>
              <p className="text-sm text-[#7a6538]">
                <a href="tel:+919992211805" className="hover:text-[#b8860b] font-semibold text-base transition-colors">+91 9992211805</a>
              </p>
              <p className="text-xs text-[#8a6f38] mt-1">सोम - रवि (सदा उपलब्ध)</p>
            </div>

            <div className="w-full sm:w-[320px] p-6 rounded-3xl bg-white/85 border border-[#b8860b]/35 text-center shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-2xl mb-3 shadow-inner">
                <i className="fas fa-envelope"></i>
              </div>
              <h4 className="font-dev-serif text-lg font-bold text-[#6b5426] mb-1">ईमेल</h4>
              <p className="text-sm text-[#7a6538] break-all">
                <a href="mailto:shrishyamjagatmandal@gmail.com" className="hover:text-[#b8860b] font-medium transition-colors">shrishyamjagatmandal@gmail.com</a>
              </p>
              <p className="text-xs text-[#8a6f38] mt-1">आधिकारिक संपर्क</p>
            </div>
          </div>

          {/* Form + Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Contact Form */}
            {/* <div className="lg:col-span-7 bg-white/85 border-2 border-[#b8860b]/35 rounded-3xl p-6 sm:p-10 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="font-dev-serif text-xl sm:text-2xl text-[#8a6f1f] font-bold mb-1 flex items-center justify-center gap-2">
                  <i className="fas fa-paper-plane text-[#b8860b]"></i> संदेश भेजें
                </h3>
                <p className="text-xs sm:text-sm text-[#6b5426]">
                  नीचे दिया गया फ़ॉर्म भरें, हम शीघ्र ही आपसे संपर्क करेंगे।
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#6b5426] block mb-1">
                    <i className="fas fa-user text-[#b8860b] mr-1"></i> आपका नाम <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="अपना पूरा नाम लिखें"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#b8860b]/35 bg-white text-[#3d2f14] outline-none focus:border-[#b8860b] text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6b5426] block mb-1">
                    <i className="fas fa-phone text-[#b8860b] mr-1"></i> मोबाइल नंबर <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="१० अंकों का मोबाइल नंबर"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#b8860b]/35 bg-white text-[#3d2f14] outline-none focus:border-[#b8860b] text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6b5426] block mb-1">
                    <i className="fas fa-envelope text-[#b8860b] mr-1"></i> ईमेल पता (वैकल्पिक)
                  </label>
                  <input
                    type="email"
                    placeholder="आपका ईमेल पता"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#b8860b]/35 bg-white text-[#3d2f14] outline-none focus:border-[#b8860b] text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6b5426] block mb-1">
                    <i className="fas fa-tag text-[#b8860b] mr-1"></i> विषय <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#b8860b]/35 bg-white text-[#3d2f14] outline-none focus:border-[#b8860b] text-sm cursor-pointer"
                  >
                    <option value="">— विषय चुनें —</option>
                    <option value="जानकारी">सामान्य जानकारी</option>
                    <option value="आयोजन">आयोजन संबंधी</option>
                    <option value="सेवा">सेवा कार्य में सहयोग</option>
                    <option value="सदस्यता">मंडल की सदस्यता</option>
                    <option value="सुझाव">सुझाव / प्रश्न</option>
                    <option value="अन्य">अन्य</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6b5426] block mb-1">
                    <i className="fas fa-comment-dots text-[#b8860b] mr-1"></i> आपका संदेश <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="अपना संदेश यहाँ लिखें..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#b8860b]/35 bg-white text-[#3d2f14] outline-none focus:border-[#b8860b] text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-sm sm:text-base shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> भेजा जा रहा है...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> संदेश भेजें
                    </>
                  )}
                </button>
              </form>
            </div> */}

            {/* Info Side */}
            <div className="lg:col-span-5 space-y-6">
              {/* Temple Address Info */}
              {/* <div className="bg-white/80 border border-[#b8860b]/30 p-6 rounded-3xl shadow-md">
                <h4 className="font-dev-serif text-lg font-bold text-[#8a6f1f] mb-4 flex items-center gap-2">
                  <i className="fas fa-map-marked-alt text-[#b8860b]"></i> मंदिर का पता
                </h4>
                <div className="space-y-3 text-sm text-[#3d2f14]">
                  <p className="flex items-start gap-2.5">
                    <i className="fas fa-map-marker-alt text-[#b8860b] mt-1 shrink-0"></i>
                    <span>श्री श्याम मंदिर, सेक्टर १२, नई दिल्ली, भारत - ११०००१</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <i className="fas fa-subway text-[#b8860b] shrink-0"></i>
                    <span>मेट्रो स्टेशन से मात्र ५ मिनट की दूरी</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <i className="fas fa-parking text-[#b8860b] shrink-0"></i>
                    <span>निःशुल्क सुरक्षित पार्किंग उपलब्ध</span>
                  </p>
                </div> */}
              {/* </div> */}

              {/* Social Channels */}
              {/* <div className="bg-white/80 border border-[#b8860b]/30 p-6 rounded-3xl shadow-md">
                <h4 className="font-dev-serif text-lg font-bold text-[#8a6f1f] mb-3 flex items-center gap-2">
                  <i className="fas fa-share-alt text-[#b8860b]"></i> सोशल मीडिया
                </h4>
                <p className="text-xs sm:text-sm text-[#6b5426] mb-4">
                  हमसे सोशल मीडिया पर जुड़ें एवं दैनिक अपडेट प्राप्त करें:
                </p>
                <div className="flex gap-3 text-base">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow"
                    title="फेसबुक"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 transition-transform shadow"
                    title="इंस्टाग्राम"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow"
                    title="यूट्यूब"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow"
                    title="व्हाट्सएप"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div> */}

              {/* Join Mandal CTA */}
              {/* <div className="p-6 rounded-3xl bg-gradient-to-br from-[#d4af37]/20 to-[#b8860b]/15 border-2 border-dashed border-[#b8860b]/50 text-center shadow-md">
                <h4 className="font-dev-serif text-lg font-bold text-[#8a6f1f] mb-2">
                  <i className="fas fa-hands-helping text-[#b8860b] mr-1.5"></i> मंडल से जुड़ें
                </h4>
                <p className="text-xs sm:text-sm text-[#6b5426] mb-4">
                  भक्ति और सेवा के इस पावन अभियान का हिस्सा बनें। मंडल की सदस्यता पूर्णतः निःशुल्क है।
                </p>
                <a
                  href="mailto:shrishyamjagatmandal@gmail.com?subject=मंडल सदस्यता हेतु अनुरोध"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all"
                >
                  <i className="fas fa-user-plus"></i> सदस्यता हेतु संपर्क करें
                </a>
                <div className="font-dev-serif text-xs text-[#8a6f1f] font-semibold mt-3 tracking-wider">
                  ॥ जय श्री श्याम ॥
                </div>
              </div> */}
            </div>
          </div>

          {/* GOOGLE MAPS EMBED */}
          {/* <div className="mb-16">
            <div className="text-center mb-6">
              <h3 className="font-dev-serif text-xl sm:text-2xl text-[#8a6f1f] font-bold mb-1 flex items-center justify-center gap-2">
                <i className="fas fa-map-marked-alt text-[#b8860b]"></i> हमारा स्थान
              </h3>
              <p className="text-xs sm:text-sm text-[#6b5426]">
                मंदिर तक पहुँचने के लिए नीचे दिया गया नक्शा देखें
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden border-4 border-[#b8860b] shadow-xl aspect-video max-h-[400px] bg-[#e8d5a8]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0!2d77.2!3d28.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzAwLjAiTiA3N8KwMTInMDAuMCJF!5e0!3m2!1shi!2sin!4v1700000000000!5m2!1shi!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="श्री श्याम जगत मंडल स्थान"
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div> */}

          {/* FAQ ACCORDION */}
          {/* <div>
            <div className="text-center mb-8">
              <h3 className="font-dev-serif text-xl sm:text-2xl text-[#8a6f1f] font-bold mb-1 flex items-center justify-center gap-2">
                <i className="fas fa-question-circle text-[#b8860b]"></i> अक्सर पूछे जाने वाले प्रश्न
              </h3>
              <p className="text-xs sm:text-sm text-[#6b5426]">
                भक्तों द्वारा पूछे जाने वाले कुछ सामान्य प्रश्न
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-3">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#b8860b]/30 bg-white/80 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-white transition-colors"
                    >
                      <h4 className="font-dev-serif text-sm sm:text-base font-semibold text-[#6b5426]">
                        {faq.q}
                      </h4>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 transition-transform ${
                          isOpen ? 'bg-[#b8860b] text-white rotate-45' : 'bg-[#b8860b]/15 text-[#b8860b]'
                        }`}
                      >
                        <i className="fas fa-plus"></i>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#7a6538] leading-relaxed border-t border-dashed border-[#b8860b]/20">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </section>

      {/* QUOTE STRIP */}
      <section className="py-12 bg-gradient-to-r from-[#0b1a33] via-[#122b4a] to-[#0b1a33] border-y border-[#d4af37]/30 text-center text-white">
        <div className="w-[92%] max-w-3xl mx-auto px-4">
          <blockquote className="font-dev-serif text-lg sm:text-2xl text-[#f5e7a3] leading-relaxed mb-3 italic">
            "सेवा और संपर्क से ही मंडल परिवार बढ़ता है, और बाबा का आशीर्वाद सदा बना रहता है।"
          </blockquote>
          <div className="font-dev-serif text-base text-[#d4af37] tracking-widest font-semibold animate-glow">
            ॥ जय श्री श्याम ॥
          </div>
        </div>
      </section>
    </div>
  );
};
