import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, MOODS } from '../data/products';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { CrazyFloatingStickers } from '../components/CrazyFloatingStickers';

export const ShopScreen: React.FC = () => {
  const {
    openProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    activeMoodFilter,
    setMoodFilter,
    triggerConfetti,
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ankle' | 'crew' | 'noshow'>('all');
  const [selectedSort, setSelectedSort] = useState<'popular' | 'newest' | 'low-high' | 'high-low'>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(600);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Mood filter
      if (activeMoodFilter !== 'all' && !product.moods.includes(activeMoodFilter)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'low-high') return a.price - b.price;
      if (selectedSort === 'high-low') return b.price - a.price;
      if (selectedSort === 'newest') {
        const order = ['mirchi-masala', 'mumbai-meri-jaan', 'bijli-stripes'];
        return (order.indexOf(a.id) > -1 ? -1 : 1) - (order.indexOf(b.id) > -1 ? -1 : 1);
      }
      return b.popularity - a.popularity;
    });
  }, [selectedCategory, selectedSort, maxPrice, activeMoodFilter]);

  const isAnyFilterActive =
    selectedCategory !== 'all' ||
    activeMoodFilter !== 'all' ||
    maxPrice < 600 ||
    selectedSort !== 'popular';

  const categoryCounts = {
    all: PRODUCTS.length,
    ankle: PRODUCTS.filter((p) => p.category === 'ankle').length,
    crew: PRODUCTS.filter((p) => p.category === 'crew').length,
    noshow: PRODUCTS.filter((p) => p.category === 'noshow').length,
  };

  return (
    <div className="w-full flex flex-col bg-[#FFFDF5]">
      {/* 1. TOP TICKER RIBBON */}
      <MarqueeTicker variant="magenta" />

      {/* 2. LIVE DISPATCH / STATS MINI BANNER */}
      <section className="w-full bg-[#FFF7D6] py-3 px-4 sm:px-8 border-b-2 border-on-surface">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-label-badge text-xs uppercase tracking-wider text-[#0A0A28]">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF0055] animate-ping" />
            <span className="font-black text-[#e4006c]">4,819 PAIRS DISPATCHED THIS WEEK</span>
            <span className="hidden sm:inline text-gray-400">/</span>
            <span className="hidden sm:inline font-medium text-on-surface/80">NEXT DISPATCH AT 4:00 PM IST</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-black">
              <span className="material-symbols-outlined text-[16px] text-[#cb4900]">bolt</span>
              <span>FREE SHIPPING OVER ₹999</span>
            </span>
            <span className="bg-secondary-container px-2 py-0.5 rounded-md text-on-surface font-extrabold border border-on-surface shadow-[1px_1px_0_#0f0d5a]">
              FITS UK 6–11
            </span>
          </div>
        </div>
      </section>

      {/* 3. HERO BILLBOARD */}
      <section className="w-full py-8 md:py-12 bg-[#FFFDF5] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto bg-[#eeecff] rounded-3xl p-6 sm:p-10 relative overflow-hidden border-3 border-on-surface shadow-[6px_6px_0_#0f0d5a]">
          {/* Crazy Animated Stickers Layer */}
          <CrazyFloatingStickers />

          {/* Decorative Backdrop */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#fecf00]/30 blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-72 h-72 rounded-full bg-[#e4006c]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#e4006c] text-white px-3.5 py-1.5 rounded-full font-label-badge text-xs uppercase tracking-wider border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] flex items-center gap-1.5 font-black hover:rotate-1 transition-transform">
                  <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
                  ALL THE SOCKS DROPS
                </span>
                <span className="bg-white text-[#0A0A28] px-3.5 py-1.5 rounded-full font-label-badge text-xs uppercase tracking-wider border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] font-extrabold">
                  100% COMBED COTTON · SEAMLESS TOE
                </span>
              </div>

              <h1 className="font-headline-xl text-[38px] sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0A0744] font-black leading-none">
                ALL THE SOCKS. <br />
                <span className="text-[#e4006c] inline-block underline decoration-[#fecf00] decoration-wavy hover:rotate-1 transition-transform cursor-pointer">
                  ZERO BORING.
                </span>
              </h1>

              <p className="font-body-lg text-sm sm:text-base text-on-surface/80 max-w-lg font-medium">
                Designed in India for wild ankles, sneakerheads, and folks who refuse to wear plain black
                socks ever again. Anti-slip cuffs guaranteed.
              </p>
            </div>

            {/* Quick Summary Stats Card */}
            <div className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-2xl border-2 border-on-surface shadow-[4px_4px_0_#0f0d5a] shrink-0 hover:rotate-1 transition-transform">
              <div className="flex flex-col items-start px-2">
                <span className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-black">
                  200K+
                </span>
                <span className="font-label-badge text-[10px] uppercase text-on-surface/70 font-bold">
                  Happy Ankles
                </span>
              </div>
              <div className="w-px h-10 bg-gray-300" />
              <div className="flex flex-col items-start px-2">
                <div className="flex items-center gap-1 text-[#fecf00]">
                  <span className="material-symbols-outlined text-[20px] text-amber-500">star</span>
                  <span className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-black">
                    4.9
                  </span>
                </div>
                <span className="font-label-badge text-[10px] uppercase text-on-surface/70 font-bold">
                  Average Rating
                </span>
              </div>
              <div className="w-px h-10 bg-gray-300" />
              <div className="flex flex-col items-start px-2">
                <span className="font-headline-lg text-2xl sm:text-3xl text-[#e4006c] font-black">
                  18
                </span>
                <span className="font-label-badge text-[10px] uppercase text-on-surface/70 font-bold">
                  Signature Pairs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FILTER & MOOD BAR - SCROLLS NATURALLY WITH PAGE */}
      <section className="w-full bg-[#FFFDF5] px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 rounded-3xl border-3 border-[#0f0d5a] shadow-[5px_5px_0_#0f0d5a] flex flex-col gap-4">
          {/* Top Row: Category Tabs & Sorting Controls */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* Category Segment Controls */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full font-title-md text-xs sm:text-sm whitespace-nowrap border-2 border-[#0f0d5a] font-black transition-all shadow-[2px_2px_0_#0f0d5a] cursor-pointer shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-[#0f0d5a] text-white shadow-[2px_2px_0_#e4006c]'
                    : 'bg-[#eeecff] text-[#0f0d5a] hover:bg-[#ffe200]'
                }`}
              >
                All Pairs ({categoryCounts.all})
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('ankle')}
                className={`px-4 py-2 rounded-full font-title-md text-xs sm:text-sm whitespace-nowrap border-2 border-[#0f0d5a] font-black transition-all shadow-[2px_2px_0_#0f0d5a] cursor-pointer shrink-0 ${
                  selectedCategory === 'ankle'
                    ? 'bg-[#0f0d5a] text-white shadow-[2px_2px_0_#e4006c]'
                    : 'bg-[#eeecff] text-[#0f0d5a] hover:bg-[#ffe200]'
                }`}
              >
                Ankle Socks ({categoryCounts.ankle})
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('crew')}
                className={`px-4 py-2 rounded-full font-title-md text-xs sm:text-sm whitespace-nowrap border-2 border-[#0f0d5a] font-black transition-all shadow-[2px_2px_0_#0f0d5a] cursor-pointer shrink-0 ${
                  selectedCategory === 'crew'
                    ? 'bg-[#0f0d5a] text-white shadow-[2px_2px_0_#e4006c]'
                    : 'bg-[#eeecff] text-[#0f0d5a] hover:bg-[#ffe200]'
                }`}
              >
                Crew Socks ({categoryCounts.crew})
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('noshow')}
                className={`px-4 py-2 rounded-full font-title-md text-xs sm:text-sm whitespace-nowrap border-2 border-[#0f0d5a] font-black transition-all shadow-[2px_2px_0_#0f0d5a] cursor-pointer shrink-0 ${
                  selectedCategory === 'noshow'
                    ? 'bg-[#0f0d5a] text-white shadow-[2px_2px_0_#e4006c]'
                    : 'bg-[#eeecff] text-[#0f0d5a] hover:bg-[#ffe200]'
                }`}
              >
                No-Show Socks ({categoryCounts.noshow})
              </button>
            </div>

            {/* Sort & Price Filters */}
            <div className="flex items-center flex-wrap sm:flex-nowrap gap-3 shrink-0">
              {/* Sort Dropdown */}
              <div className="relative inline-flex items-center bg-[#eeecff] rounded-full pl-3.5 pr-2.5 py-1.5 border-2 border-[#0f0d5a] shadow-[2px_2px_0_#0f0d5a] shrink-0">
                <span className="material-symbols-outlined text-[#0f0d5a] text-[18px] mr-1.5 pointer-events-none select-none">
                  swap_vert
                </span>
                <span className="font-label-badge text-xs uppercase text-[#0f0d5a]/75 mr-1 font-black pointer-events-none select-none">
                  Sort:
                </span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value as any)}
                  className="appearance-none bg-transparent font-title-md text-xs sm:text-sm font-black text-[#0f0d5a] focus:outline-none cursor-pointer pr-6 py-0.5 border-none"
                  aria-label="Sort products by"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Drops</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
                <span className="material-symbols-outlined text-[#0f0d5a] text-[18px] absolute right-2 pointer-events-none select-none">
                  expand_more
                </span>
              </div>

              {/* Price Max Slider */}
              <div className="flex items-center gap-2 bg-[#eeecff] rounded-full px-3.5 py-1.5 border-2 border-[#0f0d5a] shadow-[2px_2px_0_#0f0d5a] shrink-0">
                <span className="font-label-badge text-xs uppercase text-[#0f0d5a]/75 font-black select-none">
                  Max ₹
                </span>
                <input
                  type="range"
                  min="300"
                  max="600"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                  className="w-20 accent-[#e4006c] cursor-pointer"
                  aria-label="Filter by maximum price"
                />
                <span className="font-title-md text-xs sm:text-sm font-black text-[#0f0d5a] select-none">
                  ₹{maxPrice}
                </span>
              </div>

              {/* Quick Reset Button if active */}
              {isAnyFilterActive && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setMoodFilter('all');
                    setMaxPrice(600);
                    setSelectedSort('popular');
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#e4006c] text-white text-xs font-black uppercase border-2 border-[#0f0d5a] shadow-[2px_2px_0_#0f0d5a] hover:bg-[#b60055] transition-all cursor-pointer shrink-0"
                  title="Reset all filters"
                >
                  <span className="material-symbols-outlined text-[15px]">refresh</span>
                  <span>Reset</span>
                </button>
              )}

              {/* Free size badge */}
              <span className="hidden xl:inline-flex items-center gap-1 bg-[#FFF7D6] text-[#0f0d5a] font-label-badge text-xs px-3 py-1.5 rounded-full font-black border-2 border-[#0f0d5a] shadow-[2px_2px_0_#0f0d5a] shrink-0 select-none">
                <span className="material-symbols-outlined text-[14px]">straighten</span> FREE SIZE (UK 6-11)
              </span>
            </div>
          </div>

          {/* Bottom Row: Shop by Mood Pill Carousel & Counter */}
          <div className="pt-3 border-t-2 border-dashed border-[#0f0d5a]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
              <span className="font-label-badge text-xs uppercase text-[#0f0d5a] font-black shrink-0 pr-1 flex items-center gap-1.5 bg-[#FFF7D6] px-2.5 py-1 rounded-full border border-[#0f0d5a] select-none">
                <span className="material-symbols-outlined text-[16px] text-[#e4006c]">palette</span> VIBE:
              </span>
              <button
                type="button"
                onClick={() => {
                  setMoodFilter('all');
                  triggerConfetti(20);
                }}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-black border-2 border-[#0f0d5a] font-body-md text-xs transition-all shadow-[1.5px_1.5px_0_#0f0d5a] cursor-pointer hover:scale-105 active:scale-95 ${
                  activeMoodFilter === 'all'
                    ? 'bg-[#ffe200] text-[#0f0d5a] shadow-[2px_2px_0_#0f0d5a]'
                    : 'bg-white text-[#0f0d5a] hover:bg-[#FFF7D6]'
                }`}
              >
                ✨ All Vibes
              </button>
              {MOODS.map((mood) => (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => {
                    setMoodFilter(mood.id);
                    triggerConfetti(30);
                  }}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full border-2 border-[#0f0d5a] font-body-md text-xs font-bold transition-all shadow-[1.5px_1.5px_0_#0f0d5a] cursor-pointer hover:scale-105 active:scale-95 ${
                    activeMoodFilter === mood.id
                      ? 'bg-[#ffe200] text-[#0f0d5a] font-black shadow-[2px_2px_0_#0f0d5a]'
                      : 'bg-white text-[#0f0d5a] hover:bg-[#FFF7D6]'
                  }`}
                >
                  {mood.emoji} {mood.label}
                </button>
              ))}
            </div>

            {/* Quick Live Stock Count Indicator */}
            <div className="hidden md:flex items-center gap-2 shrink-0 font-label-badge text-xs text-[#0f0d5a] font-black pl-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#24a148] animate-pulse shrink-0" />
              <span>{filteredProducts.length} PAIRS IN STOCK</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT CATALOG GRID */}
      <section className="w-full bg-[#FFFDF5] py-8 md:py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section subheader & live counter */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-baseline gap-3">
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-black text-on-surface uppercase">
                FRESH FEET SELECTION
              </h2>
              <span className="font-label-badge text-xs bg-secondary-container text-on-surface font-extrabold px-2.5 py-1 rounded-md border-2 border-on-surface shadow-[1.5px_1.5px_0_#0f0d5a]">
                {filteredProducts.length} STYLES SHOWING
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-label-badge text-xs text-on-surface/70 font-bold">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#e4006c]" />
              COMFORT FIT ARCH SUPPORT
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-4 bg-white rounded-3xl border-3 border-on-surface shadow-[6px_6px_0_#0f0d5a] p-8">
              <span className="text-5xl">🧦</span>
              <h3 className="font-headline-lg text-2xl uppercase font-black text-on-surface">
                No funky socks matched your filter!
              </h3>
              <p className="font-body-md text-sm text-on-surface/70 max-w-md">
                Try resetting your filters or adjusting your max price slider.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setMoodFilter('all');
                  setMaxPrice(600);
                }}
                className="fluid-btn px-6 py-2.5 rounded-full bg-secondary-container text-on-surface font-title-md text-xs uppercase font-black border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {filteredProducts.map((product) => {
                const wishlisted = isWishlisted(product.id);
                return (
                  <article
                    key={product.id}
                    className="product-card brutal-card-hover group relative bg-white rounded-3xl p-4 flex flex-col justify-between border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] transition-all duration-300"
                  >
                    <div>
                      {/* Image Box */}
                      <div
                        onClick={() => openProduct(product.id)}
                        className="relative w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center p-3 border-2 border-on-surface cursor-pointer"
                        style={{ backgroundColor: product.bgColor }}
                      >
                        {product.badge && (
                          <span
                            className={`badge-pop absolute top-2.5 left-2.5 z-10 font-label-badge text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-on-surface shadow-[1px_1px_0_#0f0d5a] ${
                              product.badgeType === 'new'
                                ? 'bg-[#FF0055] text-white'
                                : product.badgeType === 'bestseller'
                                ? 'bg-secondary-container text-on-surface'
                                : product.badgeType === 'lowstock'
                                ? 'bg-[#FF0055] text-white'
                                : product.badgeType === 'limited'
                                ? 'bg-[#cb4900] text-white'
                                : 'bg-[#e4006c] text-white'
                            }`}
                          >
                            {product.badge}
                          </span>
                        )}

                        {/* Wishlist Button */}
                        <button
                          type="button"
                          aria-label="Add to wishlist"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`absolute top-2.5 right-2.5 z-20 w-9 h-9 rounded-full border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] flex items-center justify-center transition-all cursor-pointer ${
                            wishlisted
                              ? 'bg-secondary-container text-[#FF0055] heart-pop'
                              : 'bg-white text-on-surface hover:bg-secondary-container'
                          }`}
                        >
                          <span
                            className="material-symbols-outlined text-[19px]"
                            style={{
                              fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0",
                            }}
                          >
                            favorite
                          </span>
                        </button>

                        <img
                          alt={product.name}
                          src={product.image}
                          className="product-img w-full h-full object-contain mix-blend-multiply transition-transform duration-300"
                        />

                        {/* Angry Toast Style Collectible Stamp Overlay on Hover */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-15">
                          <div className="opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-[-8deg] transition-all duration-300 transform bg-[#FFE200] text-[#0f0d5a] font-display-hero text-[11px] font-black uppercase px-3 py-1 rounded-xl border-2 border-[#0f0d5a] shadow-[3px_3px_0_#0f0d5a]">
                            {product.category === 'ankle' ? '⚡ ANKLE HEAT' : product.category === 'noshow' ? '👀 GHOST DRIP' : '🔥 CREW SLAP'}
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="mt-4 flex flex-col gap-1.5 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-label-badge text-[10px] uppercase font-bold text-on-surface/70 tracking-wider">
                            {product.categoryLabel}
                          </span>
                          <div className="flex items-center gap-0.5 font-label-badge text-[11px] font-black text-on-surface">
                            <span className="material-symbols-outlined text-[14px] text-amber-500">
                              star
                            </span>
                            <span>{product.rating} ({product.reviewsCount})</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => openProduct(product.id)}
                          className="font-title-md text-base font-black text-on-surface group-hover:text-[#e4006c] transition-colors uppercase leading-snug text-left cursor-pointer truncate"
                        >
                          {product.name}
                        </button>

                        <p className="font-body-md text-xs text-on-surface/70 truncate">
                          {product.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Price & Action Button */}
                    <div className="mt-4 pt-3 flex items-center justify-between border-t border-gray-200 gap-2">
                      <div className="flex items-baseline gap-1.5 shrink-0">
                        <span className="font-headline-md text-lg font-black text-[#0f0d5a]">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                        <span className="font-label-badge text-[10px] text-[#0f0d5a]/60 uppercase font-bold">
                          MRP
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          addToCart(product, undefined, undefined, 1, e.currentTarget);
                          triggerConfetti(30);
                        }}
                        className="quick-add-btn fluid-btn h-10 px-4 rounded-full bg-[#e4006c] text-white font-title-md text-xs font-black border-2 border-[#0f0d5a] shadow-[2px_2px_0_#0f0d5a] hover:bg-[#b60055] hover:shadow-[4px_4px_0_#0f0d5a] flex items-center gap-1.5 cursor-pointer shrink-0 transition-all hover:scale-105"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <span className="material-symbols-outlined text-[17px] cart-icon-wiggle">
                          add_shopping_cart
                        </span>
                        <span>ADD</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 6. SOCKSY GUARANTEE & SOCIAL PROOF STRIP */}
      <section className="w-full bg-[#FFF7D6] py-8 px-4 sm:px-8 border-y-4 border-on-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#e4006c] border-2 border-on-surface flex items-center justify-center shadow-[2px_2px_0_#0f0d5a] shrink-0">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <h4 className="font-title-md text-xs sm:text-sm font-black uppercase text-on-surface">
                100% Combed Cotton
              </h4>
              <p className="font-body-md text-xs text-on-surface/70">Ultra-soft, zero pilling</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-secondary-container border-2 border-on-surface flex items-center justify-center shadow-[2px_2px_0_#0f0d5a] shrink-0">
              <span className="material-symbols-outlined text-2xl text-amber-500">
                sentiment_very_satisfied
              </span>
            </div>
            <div>
              <h4 className="font-title-md text-xs sm:text-sm font-black uppercase text-on-surface">
                Anti-Slip Silicon
              </h4>
              <p className="font-body-md text-xs text-on-surface/70">Socks stay up all day long</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#e4006c] border-2 border-on-surface flex items-center justify-center shadow-[2px_2px_0_#0f0d5a] shrink-0">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
            <div>
              <h4 className="font-title-md text-xs sm:text-sm font-black uppercase text-on-surface">
                Fast 48h Dispatch
              </h4>
              <p className="font-body-md text-xs text-on-surface/70">Direct from Mumbai hub</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#cb4900] border-2 border-on-surface flex items-center justify-center shadow-[2px_2px_0_#0f0d5a] shrink-0">
              <span className="material-symbols-outlined text-2xl">sync_alt</span>
            </div>
            <div>
              <h4 className="font-title-md text-xs sm:text-sm font-black uppercase text-on-surface">
                Hassle-Free Swap
              </h4>
              <p className="font-body-md text-xs text-on-surface/70">7-day replacement guarantee</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
