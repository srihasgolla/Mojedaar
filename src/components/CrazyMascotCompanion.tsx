import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const RANDOM_BANTER = [
  "Life is too short for boring socks! 🧦",
  "100% Mojadaar Certified Funky! 🧦⚡",
  "Your ankles are about to be legendary! 🚀",
  "Zero chill, maximum comfort! 😎",
  "Pairs so loud your shoes will blush! 💥",
  "Click me for a backflip party! 🎪",
];

export const CrazyMascotCompanion: React.FC = () => {
  const { itemCount, currentScreen, triggerConfetti } = useCart();
  const [speech, setSpeech] = useState<string>("Funky ankles only, let's shop! 🧦✨");
  const [isMinimized, setIsMinimized] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [isDancing, setIsDancing] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  // React to cart items changing
  useEffect(() => {
    if (itemCount > 0 && !isMinimized) {
      setSpeech(`WOOO! ${itemCount} pair${itemCount > 1 ? 's' : ''} in the bag! Keep it rollin'! 🔥`);
      setBubbleVisible(true);
      const t = setTimeout(() => setBubbleVisible(false), 5000);
      return () => clearTimeout(t);
    }
  }, [itemCount, isMinimized]);

  // React to screen changing
  useEffect(() => {
    if (currentScreen === 'shop' && !isMinimized) {
      setSpeech("Fresh drip alert! Find your funky pair! 🧦⚡");
      setBubbleVisible(true);
      const t = setTimeout(() => setBubbleVisible(false), 4000);
      return () => clearTimeout(t);
    }
  }, [currentScreen, isMinimized]);

  const handleMascotClick = () => {
    setIsDancing(true);
    triggerConfetti(50);
    const randomQuote = RANDOM_BANTER[Math.floor(Math.random() * RANDOM_BANTER.length)];
    setSpeech(randomQuote);
    setBubbleVisible(true);

    setTimeout(() => {
      setIsDancing(false);
    }, 1000);
  };

  return (
    <aside
      aria-label="Funky sock mascot companion"
      className="fixed bottom-16 right-3 sm:bottom-5 sm:right-5 z-30 flex flex-col items-end select-none pointer-events-auto"
    >
      {/* Speech Bubble */}
      {!isMinimized && bubbleVisible && (
        <div
          role="status"
          aria-live="polite"
          className="mb-2 max-w-[220px] bg-white p-3 rounded-2xl border-3 border-[#0f0d5a] shadow-[4px_4px_0_#0f0d5a] animate-bounce-gentle relative"
        >
          <div className="flex items-start justify-between gap-1">
            <p className="font-headline-md text-xs font-black text-[#0f0d5a] leading-snug">
              {speech}
            </p>
            <button
              onClick={() => setBubbleVisible(false)}
              className="text-[#0f0d5a]/60 hover:text-[#0f0d5a] font-bold text-xs p-0.5 leading-none cursor-pointer"
              title="Close message"
            >
              ✕
            </button>
          </div>
          {/* Bubble beak */}
          <div className="absolute -bottom-2 right-8 w-3.5 h-3.5 bg-white border-b-3 border-r-3 border-[#0f0d5a] rotate-45" />
        </div>
      )}

      {/* Mascot Character & Minimized Toggle */}
      <div className="flex items-center gap-2">
        {/* Sock Mascot Button */}
        <button
          type="button"
          onClick={handleMascotClick}
          onMouseEnter={() => setBubbleVisible(true)}
          className={`relative group cursor-pointer transition-transform duration-300 focus:outline-none ${
            isDancing ? 'animate-mascot-backflip' : 'hover:scale-110 hover:-rotate-6'
          }`}
          title="Click Moji the Sock for crazy confetti!"
        >
          {/* Mascot Body Container */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 bg-[#FFE200] rounded-2xl border-3 border-[#0f0d5a] shadow-[4px_4px_0_#0f0d5a] p-2 flex flex-col items-center justify-between relative overflow-hidden transition-all group-hover:bg-[#FFD900] group-hover:shadow-[6px_6px_0_#0f0d5a]">
            {/* Ribbed Sock Cuff Top Arc */}
            <div className="w-11 h-3 bg-[#E4006C] rounded-t-lg border-2 border-[#0f0d5a] -mt-1 flex items-center justify-evenly px-0.5">
              <div className="w-0.5 h-full bg-white" />
              <div className="w-0.5 h-full bg-[#FFE200]" />
              <div className="w-0.5 h-full bg-white" />
            </div>

            {/* Cool Sunglasses & Cute Eyes */}
            <div className="w-full flex items-center justify-center gap-1 my-auto">
              <div className="w-5 h-3.5 bg-[#0f0d5a] rounded-sm flex items-center justify-center text-[8px] text-white font-black border border-white">
                ⚡
              </div>
              <div className="w-1.5 h-0.5 bg-[#0f0d5a]" />
              <div className="w-5 h-3.5 bg-[#0f0d5a] rounded-sm flex items-center justify-center text-[8px] text-white font-black border border-white">
                ⚡
              </div>
            </div>

            {/* Cheeky Smirk & Red Blush */}
            <div className="flex items-center justify-between w-full px-1">
              <span className="w-2 h-1 bg-[#FF0055]/50 rounded-full" />
              <div className="w-4 h-1.5 bg-[#0f0d5a] rounded-full" />
              <span className="w-2 h-1 bg-[#FF0055]/50 rounded-full" />
            </div>

            {/* Funky Striped Socks Sticking Out Bottom */}
            <div className="absolute -bottom-1 flex items-center gap-3">
              <div className="w-3.5 h-3 bg-[#E4006C] border border-[#0f0d5a] rounded-t-sm flex flex-col justify-evenly">
                <div className="w-full h-0.5 bg-[#FFE200]" />
              </div>
              <div className="w-3.5 h-3 bg-[#00DF8F] border border-[#0f0d5a] rounded-t-sm flex flex-col justify-evenly">
                <div className="w-full h-0.5 bg-white" />
              </div>
            </div>

            {/* Active Sparkles */}
            <span className="absolute top-1 right-1 text-[10px] animate-spin-slow">✨</span>
          </div>

          {/* Drip Tag Pill */}
          <div className="absolute -bottom-2 -left-2 bg-[#E4006C] text-white font-label-badge text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-[#0f0d5a] shadow-[1px_1px_0_#0f0d5a] rotate-[-6deg] group-hover:rotate-0 transition-transform">
            MOJI 🧦
          </div>
        </button>

        {/* Minimize / Expand Toggle */}
        <button
          type="button"
          onClick={() => setIsMinimized(!isMinimized)}
          className="w-7 h-7 rounded-full bg-white border-2 border-[#0f0d5a] shadow-[2px_2px_0_#0f0d5a] flex items-center justify-center text-[#0f0d5a] font-black text-xs hover:bg-[#FFE200] transition-colors cursor-pointer"
          title={isMinimized ? "Show mascot" : "Minimize mascot"}
        >
          {isMinimized ? "💬" : "–"}
        </button>
      </div>
    </aside>
  );
};
