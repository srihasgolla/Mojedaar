import React from 'react';

interface MarqueeTickerProps {
  variant?: 'magenta' | 'yellow';
  reverse?: boolean;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  variant = 'magenta',
  reverse = false,
}) => {
  const isMagenta = variant === 'magenta';
  const bgClass = isMagenta
    ? 'bg-[#E4006C] text-white border-b-2 border-on-surface'
    : 'bg-[#FFE082] text-on-surface border-y-4 border-on-surface';

  const items = isMagenta ? [
    { text: 'YOUR FEET CALLED. THEY WANT BETTER SOCKS', icon: '🧦' },
    { text: 'FREE SHIPPING ABOVE ₹999', icon: '⚡' },
    { text: 'MADE IN INDIA WITH ZERO CHILL', icon: '🇮🇳' },
    { text: 'ALL THE SOCKS. ZERO BORING', icon: '🔥' },
    { text: 'CRISPY ANGRY TOAST ENERGY', icon: '🍞' },
    { text: 'NO SPAM, ONLY WILD SOCKS', icon: '🌶️' },
  ] : [
    { text: 'KEEP YOUR SOCKS FUNKY', icon: '✨' },
    { text: 'SEAMLESS TOE · COMBED COTTON', icon: '💥' },
    { text: 'ANGRY TOAST APPROVED DRIP', icon: '🍞' },
    { text: 'FITS UK 6-11 ALL DAY', icon: '🚀' },
    { text: 'LOOKING DANGEROUSLY SOCKSY', icon: '😎' },
  ];

  const phraseNodes = items.map((it, idx) => (
    <span key={idx} className="inline-flex items-center gap-2">
      <span className="text-base animate-bounce-gentle inline-block">{it.icon}</span>
      <span>{it.text}</span>
      <span className="text-[#ffe200] font-black">✦</span>
    </span>
  ));

  return (
    <div
      className={`w-full py-2.5 overflow-hidden select-none group cursor-pointer ${bgClass} transition-colors duration-300 hover:bg-[#0f0d5a] hover:text-white`}
      title="Hover for hyperdrive speed! ⚡"
    >
      <div
        className={`${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee-infinite'
        } group-hover:animate-marquee-hyperdrive uppercase font-label-ticker text-[13px] tracking-widest font-black flex items-center`}
      >
        <div className="flex items-center gap-6 pr-6 whitespace-nowrap">
          {phraseNodes}
        </div>
        <div aria-hidden="true" className="flex items-center gap-6 pr-6 whitespace-nowrap">
          {phraseNodes}
        </div>
      </div>
    </div>
  );
};
