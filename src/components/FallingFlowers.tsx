import React, { useMemo } from 'react';

interface FallingFlowersProps {
  enabled?: boolean;
}

export const FallingFlowers: React.FC<FallingFlowersProps> = ({
  enabled = true,
}) => {
  const petals = useMemo(() => {
    const emojis = ['🌸', '🌺', '🌼', '🏵️', '🌷', '💮'];

    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],

      left: `${(i * 4.6 + (i % 3) * 2.5) % 98}%`,

      // Har flower ki speed thodi different
      duration: `${8.5 + (i % 5) * 1.5}s`,

      // IMPORTANT:
      // Negative delay hata diya gaya hai
      // taaki flowers starting position se ek baar fall karein
      delay: `${(i % 7) * 0.35}s`,

      fontSize: `${0.95 + (i % 4) * 0.22}rem`,

      opacity: 0.35 + (i % 5) * 0.08,
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-[1]"
      style={{
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="
            absolute
            -top-16
            flower-anim
            will-change-transform
            drop-shadow-[0_0_6px_rgba(212,175,55,0.3)]
          "
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationIterationCount: 1,
            animationFillMode: 'forwards',
            fontSize: p.fontSize,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};