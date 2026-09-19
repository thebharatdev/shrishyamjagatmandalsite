import React, { useState, useEffect } from 'react';

interface MalaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

const MANTRAS = [
  { id: 'shyam', text: '॥ ॐ श्री श्याम देवाय नमः ॥', label: 'श्री श्याम मंत्र' },
  { id: 'hare-ka-sahara', text: '॥ हारे का सहारा, बाबा श्याम हमारा ॥', label: 'हारे का सहारा' },
  { id: 'khatu-naresh', text: '॥ जय श्री श्याम, लखदातार की जय ॥', label: 'लखदातार जयकारा' },
  { id: 'maha-mantra', text: '॥ हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥', label: 'महामंत्र' },
  { id: 'om-namah-shivaya', text: '॥ ॐ नमः शिवाय ॥', label: 'शिव मंत्र' },
];

export const MalaModal: React.FC<MalaModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [totalCount, setTotalCount] = useState<number>(() => {
    const saved = localStorage.getItem('ssjm_mala_total_count');
    return saved ? parseInt(saved, 10) || 0 : 0;
  });

  const [targetMala, setTargetMala] = useState<number>(() => {
    const saved = localStorage.getItem('ssjm_mala_target');
    return saved ? parseInt(saved, 10) || 1 : 1;
  });

  const [selectedMantra, setSelectedMantra] = useState<string>(MANTRAS[0].text);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [vibrateEnabled, setVibrateEnabled] = useState<boolean>(true);
  const [beadAngle, setBeadAngle] = useState<number>(0);
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ssjm_mala_total_count', totalCount.toString());
  }, [totalCount]);

  useEffect(() => {
    localStorage.setItem('ssjm_mala_target', targetMala.toString());
  }, [targetMala]);

  // Audio chime using Web Audio API (no external asset needed)
  const playChime = (frequency = 528, type: OscillatorType = 'sine', duration = 0.18) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might fail before user interaction
    }
  };

  const playMalaCompleteSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      // Spiritual bell chord
      [528, 660, 792, 1056].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 1.2);
      });
    } catch {
      // ignore
    }
  };

  const currentMalaNumber = Math.floor(totalCount / 108);
  const currentBeadInMala = totalCount % 108; // 0 to 107 (0 beads done means 0/108)

  const handleIncrement = () => {
    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 150);

    const nextCount = totalCount + 1;
    setTotalCount(nextCount);
    setBeadAngle((prev) => (prev + 360 / 108) % 360);

    // Vibration feedback
    if (vibrateEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30);
    }

    // Check mala completion (every 108)
    if (nextCount % 108 === 0) {
      playMalaCompleteSound();
      if (vibrateEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
      }
      onShowToast(`🎉 जय श्री श्याम! आपकी ${nextCount / 108} माला (108 जाप) पूर्ण हुई! 🙏`);
    } else {
      playChime(540, 'sine', 0.12);
    }
  };

  const handleReset = () => {
    setTotalCount(0);
    setBeadAngle(0);
    setShowResetConfirm(false);
    playChime(320, 'triangle', 0.2);
    onShowToast('माला जाप काउंटर रीसेट (0) कर दिया गया');
  };

  if (!isOpen) return null;

  const percentageInMala = Math.round((currentBeadInMala / 108) * 100);

  return (
    <div
      id="mala-jap-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md bg-[#0b1a33] border border-[#d4af37]/40 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.25)] text-white overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#122b4a] via-[#1a3860] to-[#122b4a] px-5 py-4 border-b border-[#d4af37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl text-[#f4a300] drop-shadow-[0_0_8px_rgba(244,163,0,0.8)]">📿</span>
            <div>
              <h3 className="font-dev-serif text-lg font-bold text-[#f5e7a3]">श्री श्याम माला जाप काउंटर</h3>
              <p className="text-xs text-[#d4af37]">108 मनकों का डिजिटल सिमरन</p>
            </div>
          </div>
          <button
            id="close-mala-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-[#f5e7a3] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="बंद करें"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Mantra Selector */}
          <div>
            <label className="block text-xs text-[#d4af37] font-semibold mb-1">जाप मंत्र चुनें:</label>
            <select
              value={selectedMantra}
              onChange={(e) => setSelectedMantra(e.target.value)}
              className="w-full bg-[#122b4a] border border-[#d4af37]/30 rounded-lg px-3 py-2 text-sm text-[#f5e7a3] focus:outline-none focus:border-[#f4a300] cursor-pointer"
            >
              {MANTRAS.map((m) => (
                <option key={m.id} value={m.text} className="bg-[#0b1a33] text-[#f5e7a3]">
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Current Mantra Card */}
          <div className="bg-[#122b4a]/60 border border-[#d4af37]/20 rounded-xl p-3 text-center">
            <p className="font-dev-serif text-base sm:text-lg font-semibold text-[#f5e7a3] animate-glow leading-relaxed">
              {selectedMantra}
            </p>
          </div>

          {/* Beads Circular Visualizer & Tap Button */}
          <div className="relative flex flex-col items-center justify-center py-2">
            {/* Circular Progress Bead Ring */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
              {/* Outer decorative ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 240 240">
                {/* Background Track */}
                <circle
                  cx="120"
                  cy="120"
                  r="102"
                  fill="none"
                  stroke="#122b4a"
                  strokeWidth="8"
                />
                {/* Active Progress Track */}
                <circle
                  cx="120"
                  cy="120"
                  r="102"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 102}
                  strokeDashoffset={2 * Math.PI * 102 * (1 - currentBeadInMala / 108)}
                  className="transition-all duration-200"
                />
              </svg>

              {/* Individual rotating beads preview (12 markers around perimeter) */}
              <div
                className="absolute inset-0 pointer-events-none transition-transform duration-300"
                style={{ transform: `rotate(${beadAngle}deg)` }}
              >
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 360) / 12;
                  return (
                    <span
                      key={i}
                      className="absolute w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#f5e7a3] to-[#b8860b] shadow-[0_0_6px_rgba(212,175,55,0.8)] border border-[#fff]/40"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-102px)`,
                      }}
                    />
                  );
                })}
              </div>

              {/* Main Interactive Bead (Tap Target) */}
              <button
                id="mala-increment-btn"
                onClick={handleIncrement}
                className={`relative z-10 w-36 h-36 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none shadow-[0_0_35px_rgba(212,175,55,0.35)] ${
                  isPressing
                    ? 'scale-90 bg-gradient-to-br from-[#d4af37] via-[#f4a300] to-[#b8860b] shadow-[0_0_50px_rgba(244,163,0,0.8)]'
                    : 'bg-gradient-to-br from-[#1b3d68] via-[#163153] to-[#0f223d] hover:scale-105 border-2 border-[#d4af37]/60'
                }`}
                aria-label="जाप गिनें"
              >
                <span className="font-dev-serif text-3xl sm:text-4xl font-extrabold text-[#f5e7a3] drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]">
                  {currentBeadInMala}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#d4af37] mt-0.5 font-medium">
                  / 108 मनके
                </span>
                <span className="text-[11px] text-[#f0e9d8]/80 mt-1 flex items-center gap-1">
                  <i className="fas fa-hand-pointer text-[10px] text-[#f4a300]"></i> स्पर्श करें
                </span>
              </button>
            </div>

            {/* Quick Helper Text */}
            <p className="text-xs text-[#d4af37]/80 mt-2 text-center">
              स्क्रीन के गोले पर टैप करके जप आगे बढ़ाएँ
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="bg-[#122b4a]/70 border border-[#d4af37]/25 rounded-xl p-2.5 text-center">
              <span className="text-[11px] text-[#d4af37] block font-medium">पूर्ण माला</span>
              <span className="text-lg font-bold text-[#f5e7a3] font-dev-serif">{currentMalaNumber}</span>
              <span className="text-[10px] text-gray-400 block">माला (108)</span>
            </div>
            <div className="bg-[#122b4a]/70 border border-[#d4af37]/25 rounded-xl p-2.5 text-center">
              <span className="text-[11px] text-[#d4af37] block font-medium">वर्तमान मनका</span>
              <span className="text-lg font-bold text-[#f4a300] font-dev-serif">{currentBeadInMala}</span>
              <span className="text-[10px] text-gray-400 block">{percentageInMala}% पूर्ण</span>
            </div>
            <div className="bg-[#122b4a]/70 border border-[#d4af37]/25 rounded-xl p-2.5 text-center">
              <span className="text-[11px] text-[#d4af37] block font-medium">कुल जाप संख्या</span>
              <span className="text-lg font-bold text-[#f5e7a3] font-dev-serif">{totalCount}</span>
              <span className="text-[10px] text-gray-400 block">कुल मंत्र</span>
            </div>
          </div>

          {/* Controls: Sound, Vibrate, Target */}
          <div className="bg-[#122b4a]/40 border border-white/10 rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f5e7a3]'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
                title="ध्वनि टॉगल"
              >
                <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
                <span>ध्वनि {soundEnabled ? 'चालू' : 'बंद'}</span>
              </button>

              <button
                onClick={() => setVibrateEnabled(!vibrateEnabled)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  vibrateEnabled
                    ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f5e7a3]'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
                title="कंपन टॉगल"
              >
                <i className="fas fa-mobile-alt"></i>
                <span>कंपन {vibrateEnabled ? 'चालू' : 'बंद'}</span>
              </button>
            </div>

            {/* Target mala input */}
            <div className="flex items-center gap-1.5 text-[#f5e7a3]">
              <span>लक्ष्य:</span>
              <select
                value={targetMala}
                onChange={(e) => setTargetMala(parseInt(e.target.value, 10))}
                className="bg-[#0b1a33] border border-[#d4af37]/30 rounded px-1.5 py-1 text-xs text-[#f5e7a3] focus:outline-none"
              >
                {[1, 3, 5, 7, 11, 21, 51, 108].map((num) => (
                  <option key={num} value={num}>
                    {num} माला
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Action */}
          <div className="pt-1">
            {!showResetConfirm ? (
              <button
                id="mala-reset-btn"
                onClick={() => setShowResetConfirm(true)}
                className="w-full py-2.5 rounded-xl border border-red-500/40 bg-red-900/20 hover:bg-red-900/40 text-red-200 text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <i className="fas fa-undo-alt"></i>
                <span>काउंटर रीसेट करें (Reset Counter)</span>
              </button>
            ) : (
              <div className="bg-red-950/70 border border-red-500/50 rounded-xl p-3 text-center space-y-2.5 animate-fade-in">
                <p className="text-xs text-red-200">
                  क्या आप सच में जप संख्या रीसेट (0) करना चाहते हैं?
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    id="mala-reset-confirm-btn"
                    onClick={handleReset}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow cursor-pointer transition-colors"
                  >
                    हाँ, रीसेट करें
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
                  >
                    रद्द करें
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-[#081324] px-4 py-2 border-t border-white/5 text-center text-[11px] text-[#d4af37]/70 font-dev-serif">
          ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
        </div>
      </div>
    </div>
  );
};
