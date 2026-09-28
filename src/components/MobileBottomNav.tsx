import React from 'react';
import { useCart } from '../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const { currentScreen, navigate, itemCount, setSearchOpen, currentMoodEmoji, nextMood } = useCart();

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF5] border-t-3 border-on-surface px-2 py-1.5 shadow-[0_-3px_0_#0f0d5a] flex items-center justify-around select-none"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      {/* 1. Home */}
      <button
        type="button"
        onClick={() => navigate('home')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
          currentScreen === 'home'
            ? 'bg-[#FFE200] border-2 border-on-surface text-on-surface shadow-[1.5px_1.5px_0_#0f0d5a] -translate-y-0.5'
            : 'text-on-surface/75 hover:text-on-surface border-2 border-transparent'
        }`}
      >
        <span className="material-symbols-outlined text-[22px] leading-none">home</span>
        <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">Home</span>
      </button>

      {/* 2. Shop */}
      <button
        type="button"
        onClick={() => navigate('shop')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
          currentScreen === 'shop'
            ? 'bg-[#FFE200] border-2 border-on-surface text-on-surface shadow-[1.5px_1.5px_0_#0f0d5a] -translate-y-0.5'
            : 'text-on-surface/75 hover:text-on-surface border-2 border-transparent'
        }`}
      >
        <span className="material-symbols-outlined text-[22px] leading-none">storefront</span>
        <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">Shop</span>
      </button>

      {/* 3. Search */}
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-on-surface/75 hover:text-on-surface transition-all cursor-pointer border-2 border-transparent active:scale-95"
      >
        <span className="material-symbols-outlined text-[22px] leading-none">search</span>
        <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">Search</span>
      </button>

      {/* 4. Bag / Cart - HIGHLIGHTED */}
      <button
        type="button"
        onClick={() => navigate('cart')}
        className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
          currentScreen === 'cart'
            ? 'bg-[#D8005A] text-white border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] -translate-y-0.5'
            : 'text-on-surface hover:text-[#D8005A] border-2 border-transparent'
        }`}
      >
        <div className="relative">
          <span className="material-symbols-outlined text-[22px] leading-none">shopping_cart</span>
          {itemCount > 0 && (
            <span
              className={`absolute -top-1.5 -right-2.5 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-on-surface ${
                currentScreen === 'cart' ? 'bg-[#FFE200] text-on-surface' : 'bg-[#D8005A] text-white'
              }`}
            >
              {itemCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">
          {currentScreen === 'cart' ? 'Your Bag' : 'Bag'}
        </span>
      </button>

      {/* 5. Mood Switcher */}
      <button
        type="button"
        onClick={nextMood}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-on-surface transition-all cursor-pointer border-2 border-transparent active:scale-90"
        title="Tap to switch your sock vibe!"
      >
        <span className="text-xl leading-none">{currentMoodEmoji}</span>
        <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">Vibe</span>
      </button>
    </nav>
  );
};
