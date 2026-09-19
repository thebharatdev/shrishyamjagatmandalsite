import React from 'react';

interface VirtualDiyaCenterProps {
  isVisible: boolean;
}

export const VirtualDiyaCenter: React.FC<VirtualDiyaCenterProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      id="virtual-diya-center-overlay"
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center transition-opacity duration-500 animate-fade-in select-none"
    >
      {/* 1. Full Screen Shiny Golden Ambient Vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(244, 163, 0, 0.45) 0%, rgba(212, 175, 55, 0.25) 45%, rgba(11, 26, 51, 0.75) 85%)',
          backdropFilter: 'brightness(1.25) saturate(1.4)',
        }}
      />

      {/* 2. Rotating Golden Sunburst / Divine Rays */}
      <div
        className="absolute w-[600px] h-[600px] sm:w-[780px] sm:h-[780px] rounded-full animate-divine-rays opacity-80"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg 15deg, rgba(245, 231, 163, 0.35) 20deg 25deg, transparent 30deg 45deg, rgba(244, 163, 0, 0.35) 50deg 55deg, transparent 60deg 75deg, rgba(212, 175, 55, 0.35) 80deg 85deg, transparent 90deg 105deg, rgba(245, 231, 163, 0.35) 110deg 115deg, transparent 120deg 135deg, rgba(244, 163, 0, 0.35) 140deg 145deg, transparent 150deg 165deg, rgba(212, 175, 55, 0.35) 170deg 175deg, transparent 180deg 195deg, rgba(245, 231, 163, 0.35) 200deg 205deg, transparent 210deg 225deg, rgba(244, 163, 0, 0.35) 230deg 235deg, transparent 240deg 255deg, rgba(212, 175, 55, 0.35) 260deg 265deg, transparent 270deg 285deg, rgba(245, 231, 163, 0.35) 290deg 295deg, transparent 300deg 315deg, rgba(244, 163, 0, 0.35) 320deg 325deg, transparent 330deg 345deg, rgba(212, 175, 55, 0.35) 350deg 355deg, transparent 360deg)',
        }}
      />

      {/* 3. Outer Glowing Pulsing Halo */}
      <div
        className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full animate-pulse-gold"
        style={{
          background: 'radial-gradient(circle, rgba(244,163,0,0.85) 0%, rgba(212,175,55,0.4) 45%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* 4. Twinkling Sparkles around center */}
      {[
        { top: '22%', left: '32%', delay: '0s', size: 'text-2xl sm:text-3xl' },
        { top: '20%', right: '30%', delay: '0.4s', size: 'text-xl sm:text-2xl' },
        { bottom: '26%', left: '28%', delay: '0.2s', size: 'text-2xl' },
        { bottom: '24%', right: '30%', delay: '0.6s', size: 'text-3xl' },
        { top: '42%', left: '22%', delay: '0.3s', size: 'text-xl sm:text-2xl' },
        { top: '40%', right: '22%', delay: '0.5s', size: 'text-2xl sm:text-3xl' },
        { top: '15%', left: '50%', delay: '0.1s', size: 'text-2xl' },
      ].map((sp, idx) => (
        <span
          key={idx}
          className={`absolute text-[#f5e7a3] animate-sparkle drop-shadow-[0_0_12px_rgba(255,255,255,1)] ${sp.size}`}
          style={{
            top: sp.top,
            bottom: sp.bottom,
            left: sp.left,
            right: sp.right,
            animationDelay: sp.delay,
          }}
        >
          ✨
        </span>
      ))}

      {/* 5. Center Grand Diya Artwork & Flame */}
      <div className="relative flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
        {/* Divine Aura Glow Behind Flame */}
        <div
          className="absolute -top-16 w-40 h-40 sm:w-52 sm:h-52 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,200,0.95) 0%, rgba(255,180,30,0.8) 40%, rgba(255,90,0,0.5) 65%, transparent 80%)',
            filter: 'blur(25px)',
          }}
        />

        {/* SVG Beautiful Virtual Diya */}
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 drop-shadow-[0_15px_40px_rgba(244,163,0,0.95)]">
          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            <defs>
              {/* Flame Outer Gradient */}
              <radialGradient id="flameOuter" cx="50%" cy="80%" r="70%">
                <stop offset="0%" stopColor="#ffffbb" />
                <stop offset="25%" stopColor="#ffd23f" />
                <stop offset="60%" stopColor="#ff7b00" />
                <stop offset="100%" stopColor="#e02401" />
              </radialGradient>

              {/* Flame Inner Core Gradient */}
              <radialGradient id="flameCore" cx="50%" cy="75%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#fff8b5" />
                <stop offset="85%" stopColor="#ffd13b" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              {/* Clay / Brass Diya Body Gradient */}
              <linearGradient id="diyaBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5e7a3" />
                <stop offset="25%" stopColor="#d4af37" />
                <stop offset="65%" stopColor="#b8860b" />
                <stop offset="100%" stopColor="#68470a" />
              </linearGradient>

              {/* Diya Rim Gradient */}
              <linearGradient id="diyaRim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8c5807" />
                <stop offset="30%" stopColor="#f5e7a3" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f5e7a3" />
                <stop offset="100%" stopColor="#8c5807" />
              </linearGradient>

              {/* Diya Base Stand Gradient */}
              <linearGradient id="diyaBase" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4a2e05" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#4a2e05" />
              </linearGradient>
            </defs>

            {/* Glowing Aura Ring on Base */}
            <ellipse cx="100" cy="165" rx="75" ry="16" fill="rgba(244,163,0,0.5)" filter="blur(8px)" />

            {/* FLAME GROUP (Animated Flicker) */}
            <g className="animate-diya-flame">
              {/* Flame Outer Teardrop */}
              <path
                d="M100 24 C100 24 74 68 74 95 C74 114 86 128 100 128 C114 128 126 114 126 95 C126 68 100 24 100 24 Z"
                fill="url(#flameOuter)"
              />
              {/* Flame Inner Core */}
              <path
                d="M100 48 C100 48 84 76 84 96 C84 109 91 120 100 120 C109 120 116 109 116 96 C116 76 100 48 100 48 Z"
                fill="url(#flameCore)"
              />
              {/* Flame White Hot Center Spark */}
              <ellipse cx="100" cy="98" rx="6" ry="12" fill="#ffffff" opacity="0.9" />
            </g>

            {/* Cotton Wick (Batti) */}
            <path
              d="M98 126 Q100 115 102 108"
              stroke="#261b0d"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* DIYA CLAY / BRASS BOWL */}
            {/* Base Pedestal Stand */}
            <ellipse cx="100" cy="165" rx="42" ry="9" fill="url(#diyaBase)" stroke="#d4af37" strokeWidth="1" />
            <path
              d="M84 156 L82 165 L118 165 L116 156 Z"
              fill="url(#diyaBody)"
            />

            {/* Main Bowl Body */}
            <path
              d="M32 126 C36 154 65 162 100 162 C135 162 164 154 168 126 C155 132 125 135 100 135 C75 135 45 132 32 126 Z"
              fill="url(#diyaBody)"
              stroke="#f5e7a3"
              strokeWidth="1.2"
            />

            {/* Diya Top Ellipse Rim */}
            <ellipse
              cx="100"
              cy="126"
              rx="68"
              ry="11"
              fill="url(#diyaRim)"
              stroke="#fff"
              strokeWidth="0.8"
            />

            {/* Inner Oil Glow Reservoir */}
            <ellipse
              cx="100"
              cy="126"
              rx="56"
              ry="8"
              fill="#522f08"
            />
            <ellipse
              cx="100"
              cy="127"
              rx="50"
              ry="6"
              fill="rgba(244,163,0,0.85)"
              filter="blur(2px)"
            />

            {/* Traditional Carved Patterns on Diya Body */}
            <path
              d="M60 144 Q70 152 80 144 Q90 152 100 144 Q110 152 120 144 Q130 152 140 144"
              fill="none"
              stroke="#f5e7a3"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle cx="80" cy="151" r="2.2" fill="#ffffff" />
            <circle cx="100" cy="151" r="2.5" fill="#ffffff" />
            <circle cx="120" cy="151" r="2.2" fill="#ffffff" />
          </svg>
        </div>

        {/* Spiritual Mantra Label */}
        <div className="mt-4 px-6 py-2 rounded-full bg-[#0b1a33]/85 border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.9)] backdrop-blur-md animate-pulse-gold">
          <span className="font-dev-serif text-lg sm:text-2xl font-bold text-[#f5e7a3] tracking-wider drop-shadow-[0_0_15px_rgba(244,163,0,1)]">
            ॥ शुभं करोति कल्याणम् ॥
          </span>
        </div>
        <p className="font-dev-serif text-xs sm:text-sm text-[#f4a300] mt-1.5 font-semibold tracking-widest drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
          ॥ जय श्री श्याम ॥
        </p>
      </div>
    </div>
  );
};
