import React, { useState, useEffect, useRef } from "react";
import { PageRoute } from "../types";
import {
  HERO_SLIDES,
  STATS,
  NEWS_ITEMS,
  GALLERY_ITEMS,
  SEVA_CARDS,
  PANCHANG_DATA,
  TEAM_MEMBERS,
} from "../data/siteData";
import { BHAJANS_DATA } from "../data/bhajans";

interface HomePageProps {
  onNavigate: (
    page: PageRoute,
    targetSectionId?: string,
    bhajanId?: string,
  ) => void;
  onShowToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  // Hero slide state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gallery Modal Lightbox
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // Quick contact state
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Festival Countdown state (target: 11 October 2026 00:00:00)
  // Countdown numbers are intentionally displayed in English digits.
  const [festivalCountdown, setFestivalCountdown] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
    isOver: false,
  });

  // Event Countdown state (target: 15 March 2026 18:00:00)
  const [eventCountdown, setEventCountdown] = useState({
    days: "००",
    hours: "००",
    mins: "००",
    secs: "००",
    isOver: false,
  });

  // Slideshow controls and swipe state
  const [isSlidePaused, setIsSlidePaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 40) {
        handleNextSlide();
      } else if (diff < -40) {
        handlePrevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto slide with pause support
  useEffect(() => {
    if (isSlidePaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isSlidePaused]);

  // Hindi number helper
  const toHindiDigits = (num: number) => {
    return num
      .toString()
      .replace(/\d/g, (d) => "०१२३४५६७८९"[parseInt(d, 10)])
      .padStart(2, "०");
  };

  // Festival countdown calculation
  useEffect(() => {
    const festivalTarget = new Date("2026-10-11T00:00:00").getTime();
    const eventTarget = new Date("2026-03-15T18:00:00").getTime();

    const updateCountdowns = () => {
      const now = Date.now();

      // Festival
      const festDiff = festivalTarget - now;
      if (festDiff <= 0) {
        setFestivalCountdown({
          days: "00",
          hours: "००",
          mins: "००",
          secs: "००",
          isOver: true,
        });
      } else {
        const d = Math.floor(festDiff / (1000 * 60 * 60 * 24));
        const h = Math.floor(
          (festDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const m = Math.floor((festDiff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((festDiff % (1000 * 60)) / 1000);
        setFestivalCountdown({
          days: String(d).padStart(2, "0"),
          hours: String(h).padStart(2, "0"),
          mins: String(m).padStart(2, "0"),
          secs: String(s).padStart(2, "0"),
          isOver: false,
        });
      }

      // Event
      const evDiff = eventTarget - now;
      if (evDiff <= 0) {
        setEventCountdown({
          days: "००",
          hours: "००",
          mins: "००",
          secs: "००",
          isOver: true,
        });
      } else {
        const d = Math.floor(evDiff / (1000 * 60 * 60 * 24));
        const h = Math.floor(
          (evDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const m = Math.floor((evDiff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((evDiff % (1000 * 60)) / 1000);
        setEventCountdown({
          days: toHindiDigits(d),
          hours: toHindiDigits(h),
          mins: toHindiDigits(m),
          secs: toHindiDigits(s),
          isOver: false,
        });
      }
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShareDarshan = async () => {
    const text = "आज के श्री श्याम दर्शन — ॥ हारे का सहारा बाबा श्याम हमारा ॥";
    if (navigator.share) {
      try {
        await navigator.share({
          title: "श्री श्याम दर्शन",
          text,
          url: window.location.href,
        });
      } catch {
        // User closed share dialog
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      onShowToast("दर्शन लिंक कॉपी हो गया ✓");
    }
  };

  const handleQuickContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) {
      onShowToast("कृपया नाम और मोबाइल नंबर भरें");
      return;
    }
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      onShowToast("॥ जय श्री श्याम ॥ आपका संदेश प्राप्त हो गया है!");
      setFormState({ name: "", phone: "", email: "", message: "" });
    }, 900);
  };

  const featuredBhajans = BHAJANS_DATA.slice(0, 5);

  return (
    <div className="relative">
      {/* 1. HERO SECTION (PREVIOUS CENTERED STYLE) */}
      {/* =====================================================
    HERO SECTION
    ===================================================== */}

<section
  id="home"
  className="
    relative
    min-h-[100svh]
    sm:h-screen
    min-h-[620px]
    flex
    items-center
    justify-center
    text-center
    overflow-hidden
    bg-[#0b1a33]
    select-none
  "
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
  {/* Slider Background */}

  <div className="absolute inset-0 z-0">
    {HERO_SLIDES.map((slide, idx) => (
      <div
        key={idx}
        className={`
          absolute
          inset-0
          bg-cover
          bg-center
          transition-all
          duration-1000
          ease-in-out
          ${
            idx === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105 pointer-events-none"
          }
        `}
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      >
        {/* Reduced Blue Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#0b1a33]/35
            via-[#0b1a33]/25
            to-[#0b1a33]/70
          "
        />
      </div>
    ))}
  </div>

  {/* Hero Content */}

  <div
    className="
      relative
      z-10
      w-full
      max-w-5xl
      mx-auto
      px-4
      pt-60
      sm:pt-50
      lg:pt-65
      pb-24
    "
  >
    {/* Top Badge */}

    <div
      className="
        inline-block
        px-4
        py-1.5
        rounded-full
        bg-[#d4af37]/15
        border
        border-[#d4af37]/40
        text-[#f5e7a3]
        font-dev-serif
        text-xs
        sm:text-base
        mb-5
        sm:mb-7
        backdrop-blur-md
        animate-glow
      "
    >
      ॥ हारे का सहारा बाबा श्याम हमारा ॥
    </div>

    {/* Main Heading */}

    <h1
      className="
        font-dev-serif
        text-3xl
        sm:text-5xl
        lg:text-6xl
        text-[#fef9ed]
        leading-tight
        drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]
        mb-5
        sm:mb-6
      "
    >
      श्री श्याम जगत मंडल, भिवानी आपका हार्दिक अभिनंदन करता है।
    </h1>

    {/* Description */}

    <p
      className="
        text-[#eee7da]
        text-sm
        sm:text-xl
        max-w-2xl
        mx-auto
        mb-7
        sm:mb-9
        leading-relaxed
        drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]
      "
    >
      भक्ति, सेवा और श्रद्धा के इस पावन सफर में श्री श्याम जगत मंडल आपका
      स्वागत करता है।
    </p>

    {/* Buttons */}

    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      <button
        onClick={() => {
          const el = document.getElementById("darshan");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        className="
          px-7
          sm:px-8
          py-3
          sm:py-3.5
          rounded-full
          bg-gradient-to-r
          from-[#d4af37]
          to-[#b8860b]
          text-[#0b1a33]
          font-bold
          text-sm
          sm:text-base
          shadow-[0_0_30px_rgba(212,175,55,0.6)]
          hover:scale-105
          active:scale-95
          transition-all
          flex
          items-center
          gap-2
          cursor-pointer
        "
      >
        <i className="fas fa-eye" />
        दैनिक दर्शन करें
      </button>

      <button
        onClick={() => onNavigate("bhajans")}
        className="
          px-7
          sm:px-8
          py-3
          sm:py-3.5
          rounded-full
          border-2
          border-[#d4af37]
          text-[#d4af37]
          font-bold
          text-sm
          sm:text-base
          hover:bg-[#d4af37]/15
          hover:scale-105
          active:scale-95
          transition-all
          flex
          items-center
          gap-2
          cursor-pointer
          backdrop-blur-sm
        "
      >
        <i className="fas fa-music" />
        भजन सुनें
      </button>
    </div>

    {/* Bottom Text */}

    <div
      className="
        font-dev-serif
        text-lg
        sm:text-2xl
        text-[#d4af37]
        font-bold
        tracking-widest
        mt-8
        sm:mt-12
        animate-glow
      "
    >
      ॥ जय श्री श्याम ॥
    </div>
  </div>

  {/* Previous Arrow */}

  <button
    onClick={handlePrevSlide}
    aria-label="पिछला चित्र"
    className="
      hidden
      sm:flex
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      z-20
      w-11
      h-11
      rounded-full
      bg-black/30
      hover:bg-[#d4af37]
      hover:text-[#0b1a33]
      text-white/80
      border
      border-[#d4af37]/40
      backdrop-blur-sm
      items-center
      justify-center
      transition-all
      cursor-pointer
      shadow-lg
      active:scale-90
    "
  >
    <i className="fas fa-chevron-left" />
  </button>

  {/* Next Arrow */}

  <button
    onClick={handleNextSlide}
    aria-label="अगला चित्र"
    className="
      hidden
      sm:flex
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      z-20
      w-11
      h-11
      rounded-full
      bg-black/30
      hover:bg-[#d4af37]
      hover:text-[#0b1a33]
      text-white/80
      border
      border-[#d4af37]/40
      backdrop-blur-sm
      items-center
      justify-center
      transition-all
      cursor-pointer
      shadow-lg
      active:scale-90
    "
  >
    <i className="fas fa-chevron-right" />
  </button>

  {/* Slide Indicator */}

  <div
    className="
      absolute
      bottom-16
      sm:bottom-20
      left-1/2
      -translate-x-1/2
      z-20
      flex
      items-center
      gap-2
    "
  >
    {HERO_SLIDES.map((_, idx) => (
      <button
        key={idx}
        onClick={() => setCurrentSlide(idx)}
        aria-label={`स्लाइड ${idx + 1}`}
        className={`
          transition-all
          duration-300
          rounded-full
          cursor-pointer
          ${
            idx === currentSlide
              ? "w-7 h-2 bg-gradient-to-r from-[#d4af37] to-[#f4a300] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
              : "w-2 h-2 bg-white/40 hover:bg-white/80"
          }
        `}
      />
    ))}
  </div>

  {/* Scroll Indicator */}

  <button
    onClick={() => {
      const el = document.getElementById("ticker");
      el?.scrollIntoView({ behavior: "smooth" });
    }}
    className="
      absolute
      bottom-4
      sm:bottom-6
      left-1/2
      -translate-x-1/2
      text-[#d4af37]
      text-xl
      sm:text-2xl
      animate-bounce
      cursor-pointer
      z-20
      p-2
    "
    aria-label="नीचे स्क्रॉल करें"
  >
    <i className="fas fa-chevron-down" />
  </button>
</section>

      {/* 2. SPIRITUAL TICKER */}
      <div
        id="ticker"
        className="bg-gradient-to-r from-[#0b1a33] via-[#1a2f4a] to-[#0b1a33] border-y border-[#d4af37]/30 py-3 overflow-hidden relative z-20"
      >
        <div className="flex whitespace-nowrap animate-ticker">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center">
              <span className="font-dev-serif text-lg sm:text-xl text-[#f5e7a3] mx-8">
                ॥ जय श्री श्याम ॥
              </span>
              <span className="text-[#f4a300]">•</span>
              <span className="font-dev-serif text-lg sm:text-xl text-[#f5e7a3] mx-8">
                ॥ हारे का सहारा बाबा श्याम हमारा ॥
              </span>
              <span className="text-[#f4a300]">•</span>
              <span className="font-dev-serif text-lg sm:text-xl text-[#f5e7a3] mx-8">
                ॥ श्री श्याम प्रभु की जय ॥
              </span>
              <span className="text-[#f4a300]">•</span>
              <span className="font-dev-serif text-lg sm:text-xl text-[#f5e7a3] mx-8">
                ॥ लखदातार की जय ॥
              </span>
              <span className="text-[#f4a300]">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PURPOSE SECTION (Warm Chandan) */}
     <section
  id="purpose"
  className="
    py-16 sm:py-24 lg:py-28
    bg-gradient-to-br
    from-[#fdf8ed]
    via-[#faf0dc]
    to-[#f5e6c8]
    text-[#3d2f14]
    relative
    overflow-hidden
  "
>
  {/* Decorative Background */}

  <div
    className="
      absolute
      top-0
      left-0
      w-72
      h-72
      bg-[#d4af37]/10
      rounded-full
      blur-3xl
      pointer-events-none
    "
  />

  <div
    className="
      absolute
      bottom-0
      right-0
      w-80
      h-80
      bg-[#b8860b]/10
      rounded-full
      blur-3xl
      pointer-events-none
    "
  />

  {/* Main Container */}

  <div
    className="
      w-[92%]
      max-w-[1350px]
      mx-auto
      relative
      z-10
    "
  >
    {/* =====================================================
        SECTION HEADING
        ===================================================== */}

    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
      {/* Badge */}

      <span
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          px-4
          py-2
          mb-4
          rounded-full
          bg-[#b8860b]/10
          border
          border-[#b8860b]/25
          text-[#8a6f1f]
          font-dev-serif
          text-sm
          sm:text-base
        "
      >
        🪔 भक्ति • सेवा • समर्पण
      </span>

      {/* Heading */}

      <h2
        className="
          font-dev-serif
          text-3xl
          sm:text-5xl
          lg:text-5xl
          xl:text-6xl
          text-[#8a6f1f]
          font-bold
          mb-4
          leading-tight
        "
      >
        मंडल का उद्देश्य
      </h2>

      {/* Divider */}

      <div className="flex items-center justify-center gap-3">
        <div className="w-12 sm:w-20 h-px bg-[#b8860b]/50" />

        <span className="text-[#b8860b]">
          ✦
        </span>

        <div className="w-12 sm:w-20 h-px bg-[#b8860b]/50" />
      </div>
    </div>

    {/* =====================================================
        MAIN CONTENT
        MOBILE  : STACK
        TABLET  : CENTERED STACK
        DESKTOP : TWO COLUMNS
        ===================================================== */}

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-10
        lg:gap-14
        xl:gap-20
        items-center
      "
    >
      {/* ===================================================
          IMAGE
          =================================================== */}

      <div
        className="
          relative
          w-full
          max-w-[650px]
          mx-auto
          lg:max-w-none
        "
      >
        <div
          className="
            absolute
            -inset-3
            rounded-[2rem]
            border
            border-[#b8860b]/20
            pointer-events-none
          "
        />

        <div
          className="
            relative
            w-full
            aspect-[4/3]
            max-h-[440px]
            rounded-3xl
            overflow-hidden
            border-4
            border-[#b8860b]
            shadow-[0_20px_50px_rgba(139,111,31,0.25)]
            animate-float
            bg-[#e8d5a8]
          "
        >
          <img
            src="/src/data/images/gallery (6).png"
            alt="श्री श्याम बाबा"
            className="
              w-full
              h-full
              object-cover
              object-center
            "
            loading="lazy"
          />

          {/* Image Overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#0b1a33]/70
              via-transparent
              to-transparent
            "
          />

          {/* Image Label */}

          <div
            className="
              absolute
              bottom-5
              left-5
              right-5
              flex
              justify-center
              sm:justify-start
            "
          >
            <div
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white/90
                backdrop-blur-sm
                text-[#8a6f1f]
                font-dev-serif
                font-bold
                text-sm
                shadow-lg
              "
            >
              🪔 श्री श्याम बाबा
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          CONTENT
          =================================================== */}

      <div
        className="
          w-full
          max-w-[720px]
          mx-auto
          lg:max-w-none
          text-center
          lg:text-left
        "
      >
        {/* Small Heading */}

        <span
          className="
            inline-block
            text-[#b8860b]
            font-semibold
            text-sm
            tracking-wider
            mb-3
          "
        >
          हमारा पावन संकल्प
        </span>

        {/* Main Heading */}

        <h3
          className="
            font-dev-serif
            text-2xl
            sm:text-4xl
            lg:text-3xl
            xl:text-4xl
            text-[#8a6f1f]
            font-bold
            mb-6
            leading-tight
          "
        >
          भक्ति से सेवा तक — हमारा संकल्प
        </h3>

        {/* Main Tagline */}

        <div
          className="
            relative
            p-5
            sm:p-6
            mb-6
            rounded-2xl
            bg-white/70
            border
            border-[#b8860b]/30
            shadow-md
          "
        >
          {/* Message Badge */}

          <div
            className="
              absolute
              -top-3
              left-1/2
              -translate-x-1/2
              lg:left-5
              lg:translate-x-0
              px-3
              py-1
              rounded-full
              bg-gradient-to-r
              from-[#d4af37]
              to-[#b8860b]
              text-[#0b1a33]
              text-xs
              font-bold
              whitespace-nowrap
            "
          >
            🪔 हमारा संदेश
          </div>

          <p
            className="
              font-dev-serif
              text-xl
              sm:text-2xl
              text-[#8a6f1f]
              font-bold
              italic
              leading-relaxed
              text-center
              pt-2
            "
          >
            हर घर गूँजे बाबा का नाम,
            <br />
            हर आँगन जले श्याम की ज्योत ❤️
          </p>
        </div>

        {/* Description */}

        <p
          className="
            text-[#3d2f14]
            text-base
            sm:text-lg
            leading-relaxed
            mb-5
          "
        >
          <strong className="text-[#8a6f1f]">
            श्री श्याम जगत मंडल, भिवानी
          </strong>{" "}
          का उद्देश्य है कि बाबा खाटू श्याम जी की भक्ति और कृपा हर घर तक
          पहुँचे।
        </p>

        <p
          className="
            text-[#3d2f14]
            text-base
            sm:text-lg
            leading-relaxed
            mb-6
          "
        >
          हमारा संकल्प है कि हर घर में बाबा का कीर्तन हो, श्याम नाम का
          गुणगान हो और बाबा की ज्योत प्रज्वलित हो।
        </p>

        {/* =================================================
            FREE KIRTAN CTA
            ================================================= */}

        <div
          className="
            p-5
            sm:p-6
            rounded-2xl
            bg-gradient-to-r
            from-[#b8860b]/10
            to-[#d4af37]/10
            border
            border-[#b8860b]/30
            mb-7
          "
        >
          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              sm:items-start
              gap-4
              text-center
              sm:text-left
            "
          >
            {/* Icon */}

            <div
              className="
                w-11
                h-11
                shrink-0
                rounded-full
                bg-gradient-to-r
                from-[#d4af37]
                to-[#b8860b]
                flex
                items-center
                justify-center
                text-[#0b1a33]
                shadow-md
              "
            >
              <i className="fas fa-music" />
            </div>

            {/* Text */}

            <div className="w-full">
              <h4
                className="
                  font-dev-serif
                  text-lg
                  sm:text-xl
                  font-bold
                  text-[#8a6f1f]
                  mb-1
                "
              >
                🕉️ निःशुल्क श्याम कीर्तन
              </h4>

              <p
                className="
                  text-sm
                  sm:text-base
                  text-[#6b5426]
                  leading-relaxed
                  mb-3
                "
              >
                हम विभिन्न स्थानों एवं घरों में निःशुल्क श्याम कीर्तन करते
                हैं। आप भी अपने घर बाबा का कीर्तन करवाना चाहते हैं तो
                संपर्क करें।
              </p>

              <div className="flex justify-center sm:justify-start">
                <a
                  href="tel:+919992211805"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    font-bold
                    text-[#8a6f1f]
                    hover:text-[#b8860b]
                    transition-colors
                  "
                >
                  <i className="fas fa-phone-alt" />
                  <span>+91 9992211805</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* =====================================================
        BOTTOM QUOTE
        ===================================================== */}

    <div
      className="
        mt-12
        sm:mt-16
        lg:mt-20
        text-center
      "
    >
      <div
        className="
          max-w-2xl
          mx-auto
          px-5
          sm:px-6
          py-5
          rounded-2xl
          bg-white/50
          border
          border-[#b8860b]/20
        "
      >
        <p
          className="
            font-dev-serif
            text-lg
            sm:text-2xl
            text-[#8a6f1f]
            font-bold
            italic
            leading-relaxed
          "
        >
          “घर-घर गूँजे श्याम का नाम,
          <br />
          घर-घर जले बाबा की ज्योत महान।”
        </p>

        <div
          className="
            mt-3
            text-[#b8860b]
            font-dev-serif
            font-bold
            tracking-widest
            text-sm
          "
        >
          ॥ जय श्री श्याम ॥
        </div>
      </div>
    </div>
  </div>
</section>

      {/* 4. DAILY DARSHAN SECTION */}
      <section
        id="darshan"
        className="py-16 sm:py-24 bg-gradient-to-br from-[#f8f1e0] via-[#f5e6c8] to-[#e8d5a8] text-[#3d2f14] relative overflow-hidden"
      >
        <div className="w-[92%] max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] mb-3">
              आज के श्री श्याम दर्शन
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto" />
          </div>

          <div className="bg-white/60 border border-[#b8860b]/30 rounded-3xl p-6 sm:p-10 shadow-[0_15px_45px_rgba(139,111,31,0.18)] backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="aspect-[3/4] max-h-[480px] mx-auto w-full max-w-[380px] rounded-2xl overflow-hidden border-4 border-[#b8860b] shadow-2xl relative group bg-[#e8d5a8]">
              <img
                src="/src/data/images/dailydarshan.jpg"
                alt="श्री श्याम दर्शन"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-dev-serif text-lg font-bold">
                  बाबा श्याम का दिव्य श्रृंगार स्वरूप
                </span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b8860b]/15 text-[#8a6f1f] text-sm font-semibold mb-3">
                <i className="far fa-calendar-alt"></i> आज का पावन दर्शन
              </div>
              <h3 className="font-dev-serif text-2xl sm:text-3xl text-[#8a6f1f] font-bold mb-3">
                दिव्य अलौकिक दर्शन
              </h3>
              <p className="text-[#3d2f14] text-base sm:text-lg mb-4">
                बाबा श्याम की कृपा आप सभी पर बनी रहे। हारे का सहारा, बाबा श्याम
                हमारा।
              </p>
              <div className="p-4 rounded-xl border-l-4 border-[#b8860b] bg-white/50 text-[#6b5426] font-dev-serif text-base sm:text-lg leading-relaxed mb-6">
                "हर दर्शन मन को शांति, श्रद्धा और नई ऊर्जा से भर देता है। बाबा
                श्याम का स्मरण करते हुए सेवा और भक्ति के मार्ग पर आगे बढ़ें।"
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() =>
                    setActivePhoto("/src/data/images/dailydarshan.jpg")
                  }
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <i className="fas fa-expand"></i> पूर्ण आकार में दर्शन
                </button>
                <button
                  onClick={handleShareDarshan}
                  className="p-3 rounded-full border border-[#b8860b] text-[#8a6f1f] hover:bg-[#b8860b] hover:text-white transition-all cursor-pointer"
                  title="दर्शन साझा करें"
                >
                  <i className="fas fa-share-alt text-lg"></i>
                </button>
                <a
                  href="https://wa.me/?text=॥%20जय%20श्री%20श्याम%20॥%20आज%20के%20दिव्य%20दर्शन%20करें"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full border border-[#25d366] text-[#25d366] hover:bg-[#25d366] hover:text-white transition-all"
                  title="व्हाट्सएप पर भेजें"
                >
                  <i className="fab fa-whatsapp text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="text-center font-dev-serif text-[#8a6f1f] font-bold mt-12 tracking-widest text-lg">
            ॥ जय श्री श्याम ॥
          </div>
        </div>
      </section>

      {/* 5. FESTIVAL SECTION (Dark Majestic) */}
      <section
        id="festival"
        className="py-16 sm:py-24 bg-gradient-to-b from-[#0b1a33] via-[#122b4a] to-[#0b1a33] text-white relative overflow-hidden"
      >
        <div className="w-[92%] max-w-[1250px] mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#d4af37] mb-2">
              आगामी पर्व एवं उत्सव
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-3" />
            <p className="text-[#b0b8c4] text-base sm:text-lg">
              बाबा श्याम के पावन पर्वों में सम्मिलित होकर भक्ति का आनंद लें
            </p>
          </div>

          {/* Festival Countdown Banner */}
          <div className="max-w-2xl mx-auto mb-12 p-6 rounded-3xl bg-gradient-to-br from-[#d4af37]/15 to-[#f4a300]/10 border border-[#d4af37]/40 text-center shadow-[0_0_40px_rgba(212,175,55,0.2)]">
            <div className="font-dev-serif text-[#f5e7a3] text-sm sm:text-base font-semibold mb-4 flex items-center justify-center gap-2">
              <i className="fas fa-hourglass-half text-[#f4a300]"></i>
              नवरात्रि पर्व — 11 अक्टूबर 2026, रविवार
            </div>
            {festivalCountdown.isOver ? (
              <div className="font-dev-serif text-xl sm:text-2xl text-[#d4af37] font-bold animate-glow">
                ॥ नवरात्रि पर्व मेला प्रारंभ हो चुका है ॥
              </div>
            ) : (
              <div className="flex justify-center gap-3 sm:gap-5">
                {[
                  { num: festivalCountdown.days, label: "दिन" },
                  { num: festivalCountdown.hours, label: "घंटे" },
                  { num: festivalCountdown.mins, label: "मिनट" },
                  { num: festivalCountdown.secs, label: "सेकंड" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="min-w-[70px] sm:min-w-[90px] p-3 rounded-2xl bg-[#0b1a33]/80 border border-[#d4af37]/40 shadow-inner"
                  >
                    <span className="font-dev-serif text-2xl sm:text-3xl font-bold text-[#d4af37] block leading-none drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                      {item.num}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#b0b8c4] mt-1 block">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Festival Poster */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border-4 border-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.3)] aspect-[4/3] group">
              <span className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-dev-serif font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5">
                <i className="fas fa-star"></i> विशेष वार्षिक पर्व
              </span>
              <img
                src="/src/data/images/upcomingfest.jpg"
                alt="श्री श्याम फाल्गुन मेला"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a33] via-transparent to-transparent flex flex-col justify-end p-6">
                <h4 className="font-dev-serif text-xl text-[#f5e7a3] font-bold">
                  नवरात्रि पर्व
                </h4>
                <span className="text-sm text-[#d1d9e6]">
                  <i className="far fa-calendar-alt"></i> 11 अक्टूबर 2026,
                  रविवार
                </span>
              </div>
            </div>

            {/* Festival Info */}
            <div className="lg:col-span-7">
              <h3 className="font-dev-serif text-2xl sm:text-3xl lg:text-4xl text-[#d4af37] leading-tight mb-4">
                नवरात्रि पर्व
              </h3>
              <p className="text-[#d1d9e6] text-base leading-relaxed mb-6">
                नवरात्रि माँ दुर्गा की आराधना और शक्ति की उपासना का पावन पर्व
                है।
                <br />
                इन नौ दिनों में भक्त माँ के नौ स्वरूपों की श्रद्धा और भक्ति से
                पूजा करते हैं।
                <br />
                यह पर्व हमें भक्ति, शक्ति, संयम और सकारात्मकता का संदेश देता है।
                <br />
                माँ जगदम्बा की कृपा से हर घर में सुख, शांति और समृद्धि का वास
                हो। 🌺🙏
              </p>

              {/* Detail Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                <div className="p-3.5 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-start gap-3">
                  <i className="far fa-calendar-alt text-[#f4a300] text-lg mt-0.5"></i>
                  <div>
                    <span className="text-xs uppercase text-[#b0b8c4] block">
                      तिथि
                    </span>
                    <span className="font-dev-serif text-sm sm:text-base font-semibold text-[#fef9ed]">
                      11 अक्टूबर 2026, रविवार
                    </span>
                  </div>
                </div>

                {/* <div className="p-3.5 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-start gap-3">
                  <i className="far fa-clock text-[#f4a300] text-lg mt-0.5"></i>
                  <div>
                    <span className="text-xs uppercase text-[#b0b8c4] block">
                      समय
                    </span>
                    <span className="font-dev-serif text-sm sm:text-base font-semibold text-[#fef9ed]">
                      प्रातः ६:०० से रात्रि १०:००
                    </span>
                  </div>
                </div> */}

                {/* <div className="p-3.5 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-start gap-3">
                  <i className="fas fa-map-marker-alt text-[#f4a300] text-lg mt-0.5"></i>
                  <div>
                    <span className="text-xs uppercase text-[#b0b8c4] block">
                      स्थान
                    </span>
                    <span className="font-dev-serif text-sm sm:text-base font-semibold text-[#fef9ed]">
                      श्री श्याम मंदिर प्रांगण, नई दिल्ली
                    </span>
                  </div>
                </div> */}

                {/* <div className="p-3.5 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-start gap-3">
                  <i className="fas fa-om text-[#f4a300] text-lg mt-0.5"></i>
                  <div>
                    <span className="text-xs uppercase text-[#b0b8c4] block">
                      विशेष
                    </span>
                    <span className="font-dev-serif text-sm sm:text-base font-semibold text-[#fef9ed]">
                      महाआरती एवं छप्पन भोग
                    </span>
                  </div>
                </div> */}
              </div>

              {/* <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate("contact")}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <i className="fas fa-hand-holding-heart"></i> सेवा में
                  सम्मिलित हों
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("events");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-full border border-[#d4af37] text-[#d4af37] font-semibold text-sm sm:text-base hover:bg-[#d4af37]/15 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <i className="fas fa-calendar-check"></i> पूर्ण कार्यक्रम
                  देखें
                </button>
              </div> */}
            </div>
          </div>

          <div className="text-center font-dev-serif text-[#d4af37] font-bold mt-12 tracking-widest text-lg animate-glow">
            ॥ जय माता दी ॥
          </div>
        </div>
      </section>

      {/* 6. UPCOMING EVENTS (Warm) */}
      <section
        id="events"
        className="py-16 sm:py-24 bg-gradient-to-br from-[#fdf8ed] via-[#faf0dc] to-[#f5e6c8] text-[#3d2f14] relative overflow-hidden"
      >
        <div className="w-[92%] max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] mb-3">
              आगामी आयोजन
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto" />
          </div>

          <div className="bg-white/65 border border-[#b8860b]/30 rounded-3xl p-6 sm:p-10 shadow-[0_15px_40px_rgba(139,111,31,0.15)] backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="rounded-2xl overflow-hidden border-4 border-[#b8860b] shadow-xl">
              <img
                src="/src/data/images/upcomingprog.jpg"
                alt="आयोजन"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <h3 className="font-dev-serif text-2xl sm:text-3xl text-[#8a6f1f] font-bold mb-3">
                द्वितीय विशाल निशान यात्रा
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-[#6b5426] mb-4">
                <span>
                  <i className="far fa-calendar-alt text-[#b8860b] mr-1.5"></i>{" "}
                  जनवरी, 2027
                </span>
                <span>
                  <i className="far fa-clock text-[#b8860b] mr-1.5"></i>
                  COMING SOON
                </span>
                <span>
                  <i className="fas fa-map-marker-alt text-[#b8860b] mr-1.5"></i>{" "}
                  COMING SOON
                </span>
              </div>
              <p className="text-[#3d2f14] text-base leading-relaxed mb-6">
                समस्त भक्तगण सादर आमंत्रित हैं। इस वर्ष की भांति अगले वर्ष भी
                विशाल निशान यात्रा का आयोजन किया जा रहा है। आप सभी से अनुरोध है
                कि इस पावन अवसर पर अपनी उपस्थिति दर्ज कराएं और बाबा श्याम की
                भक्ति में सम्मिलित हों।
              </p>

              {/* Countdown box */}
              {/* <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { num: eventCountdown.days, label: "दिन" },
                  { num: eventCountdown.hours, label: "घंटे" },
                  { num: eventCountdown.mins, label: "मिनट" },
                  { num: eventCountdown.secs, label: "सेकंड" },
                ].map((cd, idx) => (
                  <div
                    key={idx}
                    className="p-3 min-w-[65px] rounded-xl bg-[#b8860b]/15 border border-[#b8860b]/35 text-center"
                  >
                    <div className="font-dev-serif text-xl sm:text-2xl font-bold text-[#8a6f1f]">
                      {cd.num}
                    </div>
                    <div className="text-[11px] text-[#6b5426] font-medium">
                      {cd.label}
                    </div>
                  </div>
                ))}
              </div> */}

              {/* <button
                onClick={() => onNavigate("contact")}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                आयोजन में सम्मिलित हों
              </button> */}
            </div>
          </div>

          <div className="text-center font-dev-serif text-[#8a6f1f] font-bold mt-12 tracking-widest text-lg">
            ॥ जय श्री श्याम ॥
          </div>
        </div>
      </section>

      {/* 7. NEWS SECTION (Horizontal Carousel) */}
      <section
        id="news"
        className="py-16 sm:py-24 bg-gradient-to-br from-[#f8f1e0] via-[#f5e6c8] to-[#e8d5a8] text-[#3d2f14] relative overflow-hidden"
      >
        <div className="w-[92%] max-w-[1300px] mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] mb-3">
              समाचार एवं गतिविधियाँ
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto mb-2" />
            <p className="text-[#6b5426] text-sm sm:text-base">
              मंडल के सेवा अभियानों व आयोजनों की ताजा जानकारी
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEWS_ITEMS.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white/75 border border-[#b8860b]/30 rounded-3xl overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-2xl hover:border-[#b8860b] transition-all flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#b8860b] text-white text-xs font-bold font-dev-serif shadow">
                    {item.category}
                  </span>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-dev-serif text-lg text-[#6b5426] font-bold mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#7a6538] leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>
                  {/* <button
                    onClick={() => onShowToast(`विवरण: ${item.title}`)}
                    className="text-left font-semibold text-[#8a6f1f] text-sm hover:text-[#b8860b] flex items-center gap-1 cursor-pointer"
                  >
                    और पढ़ें <i className="fas fa-arrow-right text-xs"></i>
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BHAJAN HIGHLIGHT SECTION */}
      <section
        id="bhajan"
        className="py-16 sm:py-24 bg-gradient-to-br from-[#fdf8ed] via-[#faf0dc] to-[#f5e6c8] text-[#3d2f14] relative overflow-hidden"
      >
        <div className="w-[92%] max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] mb-3">
              श्याम भजन संग्रह
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto mb-2" />
            <p className="text-[#6b5426] text-sm sm:text-base">
              बाबा श्याम के भजनों के पावन बोल पढ़ें व गुनगुनाएँ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {featuredBhajans.map((bhajan) => (
              <div
                key={bhajan.id}
                onClick={() =>
                  onNavigate("bhajan-detail", undefined, bhajan.id)
                }
                className="bg-white/70 border border-[#b8860b]/25 rounded-2xl p-5 text-center shadow-md hover:-translate-y-2 hover:bg-white hover:border-[#b8860b] hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-xl mx-auto mb-3 group-hover:scale-110 group-hover:bg-[#b8860b] group-hover:text-white transition-all">
                    <i className="fas fa-music"></i>
                  </div>
                  <h4 className="font-dev-serif text-base font-semibold text-[#6b5426] group-hover:text-[#8a6f1f] mb-2">
                    {bhajan.title}
                  </h4>
                  <p className="text-xs text-[#7a6538] line-clamp-2">
                    स्वर: {bhajan.singer}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#b8860b]/15 text-xs text-[#b8860b] font-bold flex items-center justify-center gap-1">
                  <span>बोल पढ़ें</span>
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate("bhajans")}
              className="px-8 py-3.5 rounded-full border-2 border-[#b8860b] text-[#8a6f1f] font-bold hover:bg-[#b8860b] hover:text-white transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <i className="fas fa-book-open"></i> सभी भजन देखें (
              {BHAJANS_DATA.length}+ उपलब्ध)
            </button>
          </div>
        </div>
      </section>

      {/* 9. AARTI & STUTI CARDS */}
      <section
        id="aarti"
        className="py-16 sm:py-24 bg-gradient-to-br from-[#f8f1e0] via-[#f5e6c8] to-[#e8d5a8] text-[#3d2f14] relative overflow-hidden"
      >
        <div className="w-[92%] max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] mb-3">
              आरती एवं स्तुति
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/70 border-2 border-[#b8860b]/35 rounded-3xl p-8 text-center shadow-lg hover:-translate-y-2 hover:border-[#b8860b] transition-all relative overflow-hidden">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-3xl animate-bell">
                <i className="fas fa-bell"></i>
              </div>
              <h3 className="font-dev-serif text-2xl text-[#6b5426] font-bold mb-2">
                श्री श्याम आरती
              </h3>
              <p className="text-[#7a6538] text-base mb-6">
                बाबा श्याम की पावन आरती का पाठ करें — प्रातः एवं सायं करने
                योग्य।
              </p>
              <button
                onClick={() => onNavigate("aarti")}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                आरती पढ़ें
              </button>
            </div>

            <div
              id="stuti"
              className="bg-white/70 border-2 border-[#b8860b]/35 rounded-3xl p-8 text-center shadow-lg hover:-translate-y-2 hover:border-[#b8860b] transition-all relative overflow-hidden"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-3xl">
                <i className="fas fa-praying-hands"></i>
              </div>
              <h3 className="font-dev-serif text-2xl text-[#6b5426] font-bold mb-2">
                श्री श्याम स्तुति
              </h3>
              <p className="text-[#7a6538] text-base mb-6">
                बाबा श्याम की कृपा प्राप्त करने हेतु नित्य भावपूर्ण स्तुति का
                पाठ करें।
              </p>
              <button
                onClick={() => onNavigate("stuti")}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                स्तुति पढ़ें
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* 12. MANDAL MEMBERS SECTION */}
      <section
        id="members"
        className="py-16 sm:py-24 bg-gradient-to-br from-[#f8f1e0] via-[#f5e6c8] to-[#e8d5a8] text-[#3d2f14] relative overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#b8860b]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl" />

        <div className="w-[92%] max-w-[1250px] mx-auto relative z-10">


          {/* Members Grid */}
         {/* Members Grid — अब 3 columns max, photos बड़ी */}
{/* =========================================================
    MANDAL MEMBERS SECTION
    ========================================================= */}
<section
  id="members"
  className="
    relative overflow-hidden
    py-16 sm:py-20 lg:py-24
    bg-gradient-to-br
    from-[#f8f1e0]
    via-[#f5e6c8]
    to-[#e8d5a8]
    text-[#3d2f14]
  "
>
  {/* =====================================================
      BACKGROUND DECORATIONS
      ===================================================== */}

  <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#d4af37]/10 blur-3xl" />

  <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-[#b8860b]/10 blur-3xl" />

  <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-3xl" />

  {/* Decorative circles */}
  <div className="absolute top-20 right-[12%] w-3 h-3 rounded-full bg-[#d4af37]/40" />
  <div className="absolute top-40 left-[10%] w-2 h-2 rounded-full bg-[#b8860b]/40" />
  <div className="absolute bottom-24 right-[18%] w-4 h-4 rounded-full bg-[#d4af37]/30" />

  {/* =====================================================
      MAIN CONTAINER
      ===================================================== */}

  <div className="relative z-10 w-[92%] max-w-[1350px] mx-auto">

{/* =========================================================
    MANDAL MEMBERS SECTION
    PREMIUM RESPONSIVE DESIGN
    ========================================================= */}

<section
  id="members"
  className="
    relative overflow-hidden
    py-16 sm:py-20 lg:py-24 xl:py-28
    bg-gradient-to-br
    from-[#fffaf0]
    via-[#f8f1e0]
    to-[#ead8b5]
    text-[#3d2f14]
  "
>
  {/* BACKGROUND DECORATION */}

  <div className="absolute inset-0 pointer-events-none">
    <div
      className="
        absolute -top-40 -left-40
        w-[420px] h-[420px]
        rounded-full
        bg-[#d4af37]/10
        blur-3xl
      "
    />

    <div
      className="
        absolute top-1/2 -right-48
        w-[500px] h-[500px]
        rounded-full
        bg-[#b8860b]/10
        blur-3xl
      "
    />

    <div
      className="
        absolute bottom-0 left-1/3
        w-[350px] h-[350px]
        rounded-full
        bg-[#d4af37]/10
        blur-3xl
      "
    />
  </div>

  {/* MAIN CONTAINER */}

  <div
    className="
      relative z-10
      w-[92%]
      max-w-[1500px]
      mx-auto
    "
  >
    {/* SECTION HEADER */}

    <div className="text-center mb-12 sm:mb-16 lg:mb-20">

      {/* BADGE */}

      <div
        className="
          inline-flex
          items-center
          gap-2
          px-4 py-2
          mb-5
          rounded-full
          bg-white/70
          border border-[#b8860b]/30
          shadow-sm
          text-[#8a6f1f]
          font-dev-serif
          text-sm sm:text-base
        "
      >
        <i className="fas fa-users text-[#b8860b]" />
        मंडल परिवार
      </div>

      {/* HEADING */}

      <h2
        className="
          font-dev-serif
          text-3xl
          sm:text-4xl
          lg:text-5xl
          xl:text-6xl
          font-bold
          text-[#7d6419]
          leading-tight
          mb-4
        "
      >
        मंडल के सदस्य
      </h2>

      {/* DESCRIPTION */}

      <p
        className="
          max-w-3xl
          mx-auto
          text-[#6b5426]
          text-sm
          sm:text-base
          lg:text-lg
          leading-relaxed
        "
      >
        श्री श्याम जगत मंडल, भिवानी के समर्पित सदस्य,
        जो बाबा श्याम की भक्ति, सेवा और श्रद्धा के साथ
        मंडल के सेवा कार्यों में अपना योगदान दे रहे हैं।
      </p>

      {/* DIVIDER */}

      <div className="flex items-center justify-center gap-4 mt-7">
        <div
          className="
            w-16 sm:w-28
            h-px
            bg-gradient-to-r
            from-transparent
            to-[#b8860b]/60
          "
        />

        <div
          className="
            w-10 h-10
            rounded-full
            bg-gradient-to-br
            from-[#d4af37]
            to-[#b8860b]
            flex
            items-center
            justify-center
            text-[#fffaf0]
            shadow-md
          "
        >
          <i className="fas fa-om" />
        </div>

        <div
          className="
            w-16 sm:w-28
            h-px
            bg-gradient-to-l
            from-transparent
            to-[#b8860b]/60
          "
        />
      </div>
    </div>

    {/* MEMBERS GRID */}

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        2xl:grid-cols-4
        gap-6
        sm:gap-7
        lg:gap-8
        2xl:gap-9
        items-stretch
      "
    >
      {TEAM_MEMBERS.map((member, index) => (
        <article
          key={`${member.name}-${index}`}
          className="
            group
            relative
            w-full
            bg-white/90
            backdrop-blur-md
            rounded-[1.75rem]
            overflow-hidden
            border border-[#b8860b]/25
            shadow-[0_12px_35px_rgba(99,73,18,0.14)]
            hover:-translate-y-2
            hover:border-[#b8860b]/60
            hover:shadow-[0_25px_55px_rgba(99,73,18,0.22)]
            transition-all
            duration-500
            flex
            flex-col
          "
        >
          {/* GOLD TOP BAR */}

          <div
            className="
              absolute
              top-0
              left-0
              right-0
              h-1.5
              bg-gradient-to-r
              from-[#8a6f1f]
              via-[#f3cf68]
              to-[#8a6f1f]
              z-20
            "
          />

          {/* PHOTO */}

          <div
            className="
              relative
              w-full
              pt-5
              px-5
              sm:pt-6
              sm:px-6
              lg:pt-6
              lg:px-6
              2xl:pt-7
              2xl:px-7
            "
          >
            <div
              className="
                relative
                w-full
                aspect-[4/4.6]
                rounded-[1.4rem]
                overflow-hidden
                bg-[#ead8b5]
                border border-[#b8860b]/35
                shadow-[0_10px_30px_rgba(99,73,18,0.18)]
              "
            >
              <img
                src={member.img}
                alt={member.name}
                loading="lazy"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  object-center
                  group-hover:scale-105
                  transition-transform
                  duration-700
                "
              />

              {/* IMAGE GRADIENT */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-32
                  bg-gradient-to-t
                  from-[#211707]/75
                  via-[#211707]/20
                  to-transparent
                  pointer-events-none
                "
              />

              {/* BADGE */}

             

              {/* OM */}

              <div
                className="
                  absolute
                  bottom-4
                  right-4
                  w-10
                  h-10
                  rounded-full
                  bg-gradient-to-br
                  from-[#d4af37]
                  to-[#a77a08]
                  border-2
                  border-[#fffaf0]
                  flex
                  items-center
                  justify-center
                  text-[#fffaf0]
                  shadow-lg
                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              >
                <i className="fas fa-om text-sm" />
              </div>
            </div>
          </div>

          {/* MEMBER INFO */}

          <div
            className="
              px-5
              sm:px-6
              lg:px-7
              2xl:px-8
              pt-5
              pb-6
              lg:pb-7
              text-center
              flex
              flex-col
              flex-1
            "
          >
            {/* NAME */}

            <h3
              className="
                font-dev-serif
                text-xl
                sm:text-[21px]
                lg:text-[22px]
                2xl:text-[23px]
                font-bold
                text-[#624d20]
                leading-snug
                min-h-[58px]
                flex
                items-center
                justify-center
                group-hover:text-[#8a6f1f]
                transition-colors
              "
            >
              {member.name}
            </h3>

            {/* ROLE */}

            <div
              className="
                self-center
                inline-flex
                items-center
                justify-center
                gap-2
                mt-2
                px-4
                py-1.5
                rounded-full
                bg-gradient-to-r
                from-[#b8860b]/10
                to-[#d4af37]/10
                border border-[#b8860b]/30
                text-[#8a6f1f]
                font-dev-serif
                text-sm
                font-bold
              "
            >
              <i className="fas fa-award text-[#b8860b] text-xs" />
              {member.role}
            </div>

            {/* DIVIDER */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                my-5
              "
            >
              <div className="w-10 h-px bg-[#b8860b]/25" />

              <span className="text-[#b8860b] text-xs">
                ✦
              </span>

              <div className="w-10 h-px bg-[#b8860b]/25" />
            </div>

            {/* QUOTE */}

            <div className="relative px-3">
              <span
                className="
                  absolute
                  -top-3
                  left-0
                  font-serif
                  text-4xl
                  text-[#b8860b]/20
                  leading-none
                "
              >
                “
              </span>

              <p
                className="
                  font-dev-serif
                  text-sm
                  sm:text-[15px]
                  lg:text-[15px]
                  2xl:text-base
                  text-[#78643c]
                  leading-relaxed
                  italic
                  px-3
                "
              >
                {member.quote.replace(/^"|"$/g, "")}
              </p>

              <span
                className="
                  absolute
                  -bottom-4
                  right-0
                  font-serif
                  text-4xl
                  text-[#b8860b]/20
                  leading-none
                "
              >
                ”
              </span>
            </div>
          </div>

          {/* BOTTOM LINE */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              h-1
              bg-gradient-to-r
              from-transparent
              via-[#d4af37]
              to-transparent
              scale-x-0
              group-hover:scale-x-100
              transition-transform
              duration-500
            "
          />
        </article>
      ))}
    </div>

    {/* BOTTOM MESSAGE */}

    <div className="text-center mt-14 lg:mt-16">
      <p
        className="
          inline-flex
          items-center
          gap-2
          px-5
          py-2.5
          rounded-full
          bg-white/60
          border border-[#b8860b]/20
          text-[#7d6419]
          font-dev-serif
          text-sm
          sm:text-base
          shadow-sm
        "
      >
        <i className="fas fa-heart text-[#b8860b]" />
        सेवा ही सच्ची भक्ति है
        <i className="fas fa-heart text-[#b8860b]" />
      </p>
    </div>
  </div>
</section>



    {/* ===================================================
        BOTTOM MESSAGE
        =================================================== */}

    <div className="mt-14 sm:mt-16 text-center">

      <div
        className="
          max-w-3xl
          mx-auto
          px-6
          py-6
          sm:px-10
          sm:py-7
          rounded-3xl
          bg-white/55
          backdrop-blur-md
          border
          border-[#b8860b]/25
          shadow-[0_10px_30px_rgba(139,111,31,0.10)]
        "
      >

        {/* Icon */}

        <div className="flex justify-center mb-4">

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-gradient-to-br
              from-[#d4af37]
              to-[#b8860b]
              text-[#0b1a33]
              flex
              items-center
              justify-center
              shadow-lg
            "
          >
            <i className="fas fa-heart text-lg" />
          </div>

        </div>

        {/* Message */}

        <p
          className="
            font-dev-serif
            text-lg
            sm:text-2xl
            text-[#8a6f1f]
            font-bold
            italic
            leading-relaxed
          "
        >
          “सेवा में समर्पण, मन में श्रद्धा और
          हृदय में बाबा श्याम का नाम”
        </p>

        {/* Footer */}

        <div
          className="
            mt-4
            text-[#b8860b]
            font-dev-serif
            font-bold
            tracking-widest
            text-sm
            sm:text-base
          "
        >
          ॥ जय श्री श्याम ॥
        </div>

      </div>

    </div>

  </div>
</section>

          {/* Bottom Message */}
      
        </div>
      </section>
      {/* 10. SPIRITUAL QUOTE (Dark Strip) */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-[#0b1a33] via-[#122b4a] to-[#0b1a33] border-y border-[#d4af37]/30 text-center text-white relative">
        <div className="w-[92%] max-w-[850px] mx-auto px-4 relative z-10">
          <h2 className="font-dev-serif text-xl sm:text-2xl text-[#d4af37] mb-2">
            श्याम वाणी
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-6" />
          <blockquote className="font-dev-serif text-xl sm:text-3xl text-[#f5e7a3] leading-relaxed mb-4 italic">
            "जहाँ विश्वास होता है, वहाँ श्याम बाबा का आशीर्वाद अवश्य होता है।"
          </blockquote>
          <div className="font-dev-serif text-lg text-[#d4af37] tracking-widest font-semibold animate-glow">
            ॥ जय श्री श्याम ॥
          </div>
        </div>
      </section>

      {/* 11. GALLERY SECTION */}
      <section
        id="gallery"
        className="py-16 sm:py-24 bg-gradient-to-br from-[#fdf8ed] via-[#faf0dc] to-[#f5e6c8] text-[#3d2f14] relative"
      >
        <div className="w-[92%] max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] mb-3">
              श्याम दरबार की झलकियाँ
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActivePhoto(item.img)}
                className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer border-2 border-[#b8860b]/20 hover:border-[#b8860b] hover:scale-[1.02] shadow-md hover:shadow-xl transition-all group bg-[#e8d5a8]"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d2f14]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <i className="fas fa-search-plus text-2xl mb-1 text-[#f5e7a3]"></i>
                  <span className="font-dev-serif text-sm font-semibold">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer animate-fade-in"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              src={activePhoto}
              alt="दर्शन"
              className="max-h-[85vh] max-w-full rounded-2xl object-contain border-2 border-[#d4af37]"
            />
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 text-white text-2xl p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* 12. SEVA SECTION */}
      {/* <section
        id="seva"
        className="py-16 sm:py-24 bg-gradient-to-br from-[#f8f1e0] via-[#f5e6c8] to-[#e8d5a8] text-[#3d2f14] relative"
      >
        <div className="w-[92%] max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] mb-3">
              सेवा ही सबसे बड़ी साधना
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SEVA_CARDS.map((seva, idx) => (
              <div
                key={idx}
                className="bg-white/70 border border-[#b8860b]/25 rounded-3xl p-6 text-center shadow-md hover:-translate-y-2 hover:border-[#b8860b] transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center text-2xl">
                  <i className={`fas ${seva.icon}`}></i>
                </div>
                <h4 className="font-dev-serif text-lg font-bold text-[#6b5426] mb-2">
                  {seva.title}
                </h4>
                <p className="text-sm text-[#7a6538] leading-relaxed">
                  {seva.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center font-dev-serif text-[#8a6f1f] font-bold mt-12 tracking-widest text-lg">
            ॥ जय श्री श्याम ॥
          </div>
        </div>
      </section> */}

      {/* 13. DEVOTIONAL FEATURES */}
      {/* <section className="py-14 sm:py-20 bg-gradient-to-br from-[#fdf8ed] via-[#faf0dc] to-[#f5e6c8] text-[#3d2f14] relative">
        <div className="w-[92%] max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-dev-serif text-2xl sm:text-3xl text-[#8a6f1f] mb-2">
              भक्ति के साथ जुड़ें
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {[
              { emoji: "📿", title: "दैनिक मंत्र" },
              { emoji: "🕉️", title: "श्लोक" },
              { emoji: "🪔", title: "आरती", action: () => onNavigate("aarti") },
              {
                emoji: "🎵",
                title: "भजन",
                action: () => onNavigate("bhajans"),
              },
              {
                emoji: "🙏",
                title: "दैनिक दर्शन",
                action: () => {
                  const el = document.getElementById("darshan");
                  el?.scrollIntoView({ behavior: "smooth" });
                },
              },
              {
                emoji: "📅",
                title: "धार्मिक पंचांग",
                action: () => {
                  const el = document.getElementById("panchang");
                  el?.scrollIntoView({ behavior: "smooth" });
                },
              },
              { emoji: "📖", title: "धार्मिक ज्ञान" },
              { emoji: "🌸", title: "प्रेरक विचार" },
            ].map((f, idx) => (
              <button
                key={idx}
                onClick={
                  f.action ||
                  (() => onShowToast(`${f.title} सेवा में सम्मिलित हैं`))
                }
                className="p-4 rounded-2xl bg-white/70 border border-[#b8860b]/25 text-center shadow hover:-translate-y-1 hover:border-[#b8860b] hover:bg-white transition-all cursor-pointer flex flex-col items-center justify-center"
              >
                <span className="text-3xl mb-2">{f.emoji}</span>
                <span className="text-xs sm:text-sm font-semibold text-[#6b5426]">
                  {f.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* 14. PANCHANG SECTION */}
      {/* <section
        id="panchang"
        className="py-16 sm:py-24 bg-gradient-to-br from-[#f8f1e0] via-[#f5e6c8] to-[#e8d5a8] text-[#3d2f14] relative"
      >
        <div className="w-[92%] max-w-[1000px] mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] mb-3">
              आज का पावन पंचांग
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto" />
          </div>

          <div className="bg-white/70 border-2 border-[#b8860b]/30 rounded-3xl p-6 sm:p-10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center shadow-lg backdrop-blur-md">
            {PANCHANG_DATA.map((p, idx) => (
              <div key={idx} className="p-3">
                <div className="text-xs uppercase font-bold text-[#b8860b] tracking-wider mb-1">
                  {p.label}
                </div>
                <div className="font-dev-serif text-base sm:text-xl font-bold text-[#3d2f14]">
                  {p.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 15. QUICK CONTACT FORM */}
      <section
        id="contact"
        className="py-16 sm:py-24 bg-gradient-to-br from-[#fdf8ed] via-[#faf0dc] to-[#f5e6c8] text-[#3d2f14] relative"
      >
        <div className="w-[92%] max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-dev-serif text-2xl sm:text-4xl text-[#8a6f1f] mb-3">
              श्री श्याम जगत मंडल से जुड़ें
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto mb-2" />
            <p className="text-[#6b5426] text-base">
              भक्ति और सेवा के इस पावन अभियान का हिस्सा बनें
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4 text-[#3d2f14]">
              <h3 className="font-dev-serif text-2xl text-[#8a6f1f] font-bold">
                हमसे संपर्क करें
              </h3>
              <p className="text-base leading-relaxed text-[#6b5426]">
                कोई प्रश्न हो या सेवा कार्य में सम्मिलित होना चाहते हों, हमें
                अवश्य संपर्क करें।
              </p>
              <div className="space-y-3 pt-2">
                {/* <p className="flex items-center gap-3">
                  <i className="fas fa-map-marker-alt text-[#b8860b] w-6 text-lg"></i>
                  <span>श्री श्याम मंदिर, सेक्टर १२, नई दिल्ली - ११०००१</span>
                </p> */}
                <p className="flex items-center gap-3">
                  <i className="fas fa-phone-alt text-[#b8860b] w-6 text-lg"></i>
                  <a href="tel:+919992211805" className="hover:text-[#b8860b]">
                    +91 9992211805
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <i className="fas fa-envelope text-[#b8860b] w-6 text-lg"></i>
                  <a
                    href="mailto:info@shyamjagatmandal.org"
                    className="hover:text-[#b8860b]"
                  >
                    shrishyamjagatmandal@gmail.com
                  </a>
                </p>
              </div>

              <div className="pt-4 flex gap-3 text-lg">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/70 border border-[#b8860b]/30 flex items-center justify-center text-[#8a6f38] hover:text-[#b8860b] hover:scale-110 transition-all"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/70 border border-[#b8860b]/30 flex items-center justify-center text-[#8a6f38] hover:text-[#b8860b] hover:scale-110 transition-all"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/70 border border-[#b8860b]/30 flex items-center justify-center text-[#8a6f38] hover:text-[#b8860b] hover:scale-110 transition-all"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/70 border border-[#25d366]/40 flex items-center justify-center text-[#25d366] hover:scale-110 transition-all"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            {/* <form
              onSubmit={handleQuickContact}
              className="bg-white/80 border border-[#b8860b]/35 p-6 sm:p-8 rounded-3xl shadow-lg space-y-4"
            >
              <div>
                <label className="text-xs font-semibold text-[#6b5426] block mb-1">
                  आपका नाम *
                </label>
                <input
                  type="text"
                  required
                  placeholder="अपना नाम लिखें"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-[#b8860b]/35 bg-white text-[#3d2f14] outline-none focus:border-[#b8860b] text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6b5426] block mb-1">
                  मोबाइल नंबर *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="१० अंकों का मोबाइल नंबर"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState({ ...formState, phone: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-[#b8860b]/35 bg-white text-[#3d2f14] outline-none focus:border-[#b8860b] text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6b5426] block mb-1">
                  ईमेल (वैकल्पिक)
                </label>
                <input
                  type="email"
                  placeholder="आपका ईमेल"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-[#b8860b]/35 bg-white text-[#3d2f14] outline-none focus:border-[#b8860b] text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6b5426] block mb-1">
                  संदेश
                </label>
                <textarea
                  rows={3}
                  placeholder="अपना संदेश यहाँ लिखें..."
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-[#b8860b]/35 bg-white text-[#3d2f14] outline-none focus:border-[#b8860b] text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1a33] font-bold text-sm sm:text-base shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {formSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> भेजा जा रहा है...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> संदेश भेजें
                  </>
                )}
              </button>
            </form> */}
          </div>
        </div>
      </section>
    </div>
  );
};
