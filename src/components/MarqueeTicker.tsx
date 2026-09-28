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

  const phrase = isMagenta
    ? '✦ YOUR FEET CALLED. THEY WANT BETTER SOCKS ✦ FREE SHIPPING ABOVE ₹999 ✦ MADE IN INDIA ✦ ALL THE SOCKS. ZERO BORING ✦ 🚨 NO SPAM, ONLY SOCKS ✦'
    : 'keep your socks fun ✦ all the socks. zero boring ✦ made in india 🇮🇳 ✦ no spam, only socks ✦ looking too socksy ✦';

  return (
    <div className={`w-full py-2 overflow-hidden select-none ${bgClass}`}>
      <div
        className={`${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee-infinite'
        } uppercase font-label-ticker text-[13px] tracking-widest font-black flex items-center`}
      >
        <div className="flex items-center gap-6 pr-6 whitespace-nowrap">
          <span>{phrase}</span>
          <span>{phrase}</span>
        </div>
        <div aria-hidden="true" className="flex items-center gap-6 pr-6 whitespace-nowrap">
          <span>{phrase}</span>
          <span>{phrase}</span>
        </div>
      </div>
    </div>
  );
};
