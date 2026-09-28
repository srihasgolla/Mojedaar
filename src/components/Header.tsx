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
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo Left */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 group bg-transparent cursor-pointer border-none p-0 focus:outline-none"
          aria-label="Mojadaar Home"
        >
          <img
            alt="Mojadaar Logo"
            className="h-14 w-auto object-contain logo-blend-multiply bg-transparent transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-2deg]"
            src={BRAND_LOGOS.header}
          />
        </button>

        {/* Center Navigation Links: Streamlined to Shop and About */}
        <nav className="flex items-center gap-6 lg:gap-10 font-black uppercase text-sm tracking-wider text-on-surface">
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
        <div className="flex items-center gap-3">
          {/* 1: Search Button */}
          <button
            aria-label="Search socks"
            onClick={() => setSearchOpen(true)}
            className="icon-bounce w-11 h-11 rounded-full border-2 border-on-surface bg-[#FFE043] flex items-center justify-center text-on-surface shadow-[2px_2px_0_#0f0d5a] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] font-black">search</span>
          </button>

          {/* 2: Mood Emoji Switcher */}
          <button
            aria-label="Change sock mood"
            onClick={nextMood}
            className="icon-bounce w-11 h-11 rounded-full border-2 border-on-surface bg-[#FF7F29] flex items-center justify-center text-xl shadow-[2px_2px_0_#0f0d5a] cursor-pointer select-none"
            title="Click to change your sock mood!"
            type="button"
          >
            <span className="transform active:scale-125 transition-transform">{currentMoodEmoji}</span>
          </button>

          {/* 3: Shopping Cart Button with Dynamic Badge */}
          <button
            aria-label="Shopping Cart"
            onClick={() => navigate('cart')}
            onDoubleClick={() => setQuickCartOpen(true)}
            className="icon-bounce relative w-11 h-11 rounded-full border-2 border-on-surface bg-[#D8005A] flex items-center justify-center text-sticker-white shadow-[2px_2px_0_#0f0d5a] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            <span
              className={`absolute -top-1.5 -right-1.5 bg-[#FFDE00] text-on-surface font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-on-surface shadow-[1px_1px_0_#0f0d5a] transition-transform ${
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
