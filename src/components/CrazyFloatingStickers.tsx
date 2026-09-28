import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface StickerItem {
  id: string;
  icon: string;
  badgeText: string;
  subtitle: string;
  defaultPosition: string; // Tailwind positioning classes
  rotate: string;
  animationClass: string;
  speechText: string;
  color: string;
}

const STICKERS: StickerItem[] = [
  {
    id: 'mojadaar-drip',
    icon: '🧦',
    badgeText: '100% MOJADAAR',
    subtitle: 'No boring feet allowed',
    defaultPosition: 'top-20 -left-4 md:-left-8',
    rotate: '-rotate-12',
    animationClass: 'animate-crazy-bob-1',
    speechText: 'Certified 100% Combed Cotton Drip! 🧦✨',
    color: '#FFE200',
  },
  {
    id: 'winged-sock',
    icon: '🧦',
    badgeText: 'FEET ON FIRE',
    subtitle: 'Anti-gravity vibes',
    defaultPosition: 'top-1/3 -right-3 md:-right-6',
    rotate: 'rotate-12',
    animationClass: 'animate-crazy-bob-2',
    speechText: 'Certified 100% Combed Cotton Drip! 🚀',
    color: '#E4006C',
  },
  {
    id: 'spicy-chili',
    icon: '🌶️',
    badgeText: 'EXTRA MIRCHI',
    subtitle: 'Dangerously loud',
    defaultPosition: 'bottom-28 -left-3 md:-left-6',
    rotate: 'rotate-6',
    animationClass: 'animate-crazy-bob-3',
    speechText: 'Spicy ankles for spicy personalities! 🔥',
    color: '#FF4D00',
  },
  {
    id: 'zap-bolt',
    icon: '⚡',
    badgeText: 'ZAP THE BLAND',
    subtitle: 'High-voltage cotton',
    defaultPosition: 'bottom-16 -right-4 md:-right-8',
    rotate: '-rotate-6',
    animationClass: 'animate-crazy-bob-1',
    speechText: 'Instant +50 Speed & Confidence! ⚡',
    color: '#00DF8F',
  },
];

export const CrazyFloatingStickers: React.FC = () => {
  const { triggerConfetti } = useCart();
  const [clickedSticker, setClickedSticker] = useState<string | null>(null);
  const [hoveredSticker, setHoveredSticker] = useState<string | null>(null);

  const handleClick = (st: StickerItem) => {
    setClickedSticker(st.id);
    triggerConfetti(35);
    setTimeout(() => {
      setClickedSticker(null);
    }, 800);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-20">
      {STICKERS.map((st) => {
        const isHovered = hoveredSticker === st.id;
        const isClicked = clickedSticker === st.id;

        return (
          <div
            key={st.id}
            className={`absolute pointer-events-auto transition-transform duration-300 ${st.defaultPosition}`}
            onMouseEnter={() => setHoveredSticker(st.id)}
            onMouseLeave={() => setHoveredSticker(null)}
          >
            <div
              onClick={() => handleClick(st)}
              className={`relative cursor-pointer group flex flex-col items-center transition-all duration-300 ${
                st.animationClass
              } ${isClicked ? 'scale-125 rotate-[360deg]' : 'hover:scale-115'} ${st.rotate}`}
            >
              {/* Comic Speech Bubble Pop on Hover */}
              {isHovered && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-xl border-2 border-[#0f0d5a] shadow-[3px_3px_0_#0f0d5a] whitespace-nowrap z-50 animate-bounce-gentle">
                  <span className="font-label-badge text-[11px] font-black uppercase text-[#0f0d5a] tracking-tight">
                    {st.speechText}
                  </span>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#0f0d5a] rotate-45" />
                </div>
              )}

              {/* Main Sticker Badge Container */}
              <div
                className="p-2 sm:p-2.5 rounded-2xl border-3 border-[#0f0d5a] shadow-[4px_4px_0_#0f0d5a] flex items-center gap-2 transition-transform duration-200 group-hover:shadow-[6px_6px_0_#0f0d5a]"
                style={{ backgroundColor: st.color }}
              >
                <span className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-130 group-hover:rotate-12 inline-block">
                  {st.icon}
                </span>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-headline-md text-[11px] leading-tight font-black uppercase text-[#0f0d5a]">
                    {st.badgeText}
                  </span>
                  <span className="font-label-badge text-[9px] uppercase tracking-wider text-[#0f0d5a]/80 font-bold">
                    {st.subtitle}
                  </span>
                </div>
              </div>

              {/* Click action indicator */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 bg-white text-[#0f0d5a] font-label-badge text-[9px] font-black px-1.5 py-0.5 rounded-md border border-[#0f0d5a]">
                CLICK ME! 💥
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
