import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5e7a3] to-[#b8860b] text-[#0b1a33] font-bold text-sm sm:text-base shadow-[0_10px_35px_rgba(212,175,55,0.6)] border border-[#d4af37] animate-bounce max-w-[90vw] text-center">
      {message}
    </div>
  );
};
