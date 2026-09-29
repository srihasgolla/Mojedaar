import React from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_LOGOS } from '../data/products';

export const Header: React.FC = () => {
  const {
    currentScreen,
    navigate,
    itemCount,
    setSearchOpen,
    nextMood,
    currentMoodEmoji,
    setQuickCartOpen,
  } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF5] border-b-2 border-on-surface select-none shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo Left */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 group bg-transparent cursor-pointer border-none p-0 focus:outline-none shrink-0"
          aria-label="Mojadaar Home"
        >
          <img
            alt="Mojadaar Logo"
            className="h-10 sm:h-14 w-auto object-contain logo-blend-multiply bg-transparent transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-2deg]"
            src={BRAND_LOGOS.header}
          />
        </button>

        {/* Center Navigation Links: Hidden on mobile (use bottom bar), visible on desktop */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 font-black uppercase text-sm tracking-wider text-on-surface">
          <button
            onClick={() => navigate('shop')}
            className={`font-display-hero text-base uppercase tracking-wider transition-all cursor-pointer py-1.5 px-3 rounded-full border-2 ${
              currentScreen === 'shop'
                ? 'bg-secondary-container text-on-surface border-on-surface shadow-[2px_2px_0_#0f0d5a] -translate-y-0.5'
                : 'border-transparent hover:text-primary hover:underline decoration-secondary-container decoration-4 underline-offset-4'
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => {
              if (currentScreen !== 'home') {
                navigate('home');
                setTimeout(() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="font-display-hero text-base uppercase tracking-wider transition-all cursor-pointer py-1.5 px-3 border-2 border-transparent hover:text-primary hover:underline decoration-secondary-container decoration-4 underline-offset-4"
          >
            About
          </button>
        </nav>

        {/* Right Utility Action Circles */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* WordPress HTML Export Button */}
          <a
            href="/wordpress-pages/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-on-surface bg-[#E4006C] text-white font-display-hero text-xs uppercase shadow-[2px_2px_0_#0f0d5a] hover:bg-[#c9005f] hover:-translate-y-0.5 transition-all"
            title="Export full HTML for WordPress"
          >
            <span>WordPress HTML</span>
            <span className="text-[10px] bg-[#FFE54C] text-[#0f0d5a] px-1.5 py-0.2 rounded-full font-black">Export</span>
          </a>

          {/* 1: Search Button */}
          <button
            aria-label="Search socks"
            onClick={() => setSearchOpen(true)}
            className="icon-bounce w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-on-surface bg-[#FFE043] flex items-center justify-center text-on-surface shadow-[2px_2px_0_#0f0d5a] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px] font-black">search</span>
          </button>

          {/* 2: Mood Emoji Switcher */}
          <button
            aria-label="Change sock mood"
            onClick={nextMood}
            className="icon-bounce w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-on-surface bg-[#FF7F29] flex items-center justify-center text-lg sm:text-xl shadow-[2px_2px_0_#0f0d5a] cursor-pointer select-none"
            title="Click to change your sock mood!"
            type="button"
          >
            <span className="transform active:scale-125 transition-transform">{currentMoodEmoji}</span>
          </button>

          {/* 3: Shopping Cart Button with Dynamic Badge */}
          <button
            aria-label="Shopping Cart"
            onClick={() => navigate('cart')}
            className="icon-bounce relative w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-on-surface bg-[#D8005A] flex items-center justify-center text-sticker-white shadow-[2px_2px_0_#0f0d5a] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">shopping_cart</span>
            <span
              className={`absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 bg-[#FFDE00] text-on-surface font-black text-[10px] sm:text-[11px] w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-on-surface shadow-[1px_1px_0_#0f0d5a] transition-transform ${
                itemCount > 0 ? 'scale-100' : 'scale-90'
              }`}
              id="header-cart-badge"
            >
              {itemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
