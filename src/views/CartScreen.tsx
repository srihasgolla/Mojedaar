import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { MarqueeTicker } from '../components/MarqueeTicker';

export const CartScreen: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    shippingFee,
    isFreeShipping,
    freeShippingProgress,
    amountNeededForFreeShipping,
    grandTotal,
    discountAmount,
    promoApplied,
    promoCode,
    promoError,
    applyPromoCode,
    removePromoCode,
    updateQuantity,
    removeFromCart,
    clearCart,
    navigate,
    addToCart,
    setCheckoutOpen,
    triggerConfetti,
  } = useCart();

  const [inputCode, setInputCode] = useState('SOCKSY10');

  const handleApplyPromo = () => {
    applyPromoCode(inputCode);
  };

  const handleQuickAdd = (productName: string, price: number, icon: string, bgColor: string) => {
    const existing = PRODUCTS.find((p) => p.name.toLowerCase() === productName.toLowerCase());
    if (existing) {
      addToCart(existing);
    } else {
      addToCart({
        id: 'quick-' + Date.now(),
        name: productName,
        category: 'crew',
        categoryLabel: 'CREW SOCKS',
        moods: ['desi', 'foodie'],
        price: price,
        originalPrice: price + 100,
        rating: 4.9,
        reviewsCount: 50,
        subtitle: 'Hot Pick Pair',
        image: 'https://lh3.googleusercontent.com/aida/AEtjO1WSPn-D1m2AeSqGgdHfyrbl8xEkKIK3VLMPE0wAOoLJaTjxapl40ektkS3rKNysilVtWIRXaBtMU7jGUXKok_8I1aQAXhMS-w9MDo4d8jNmIjjvwSojg-6noNvKVk-UY5d_wOTSBAlVEe3p_O5-4WnBp3t5TibdSgcYdFAmlP3Be8D_9PAk3en28Y2cNCfgXwQvli4fOibyhZ1Ix3on5qF9uzK-L-KZJAuYwotwSX6TObSF7zusB85oKg8S',
        bgColor: bgColor,
        icon: icon,
        popularity: 100,
        description: 'Street pop special release.',
        fabricDetails: '85% Combed Cotton',
        galleryImages: [],
        lengthOptions: [],
      });
    }
    triggerConfetti(25);
  };

  return (
    <div className="w-full flex flex-col bg-[#FFFDF5]">
      {/* 1. TOP TICKER RIBBON - Hidden on mobile so cart items are immediately visible */}
      <div className="hidden md:block">
        <MarqueeTicker variant="magenta" />
      </div>

      {/* 2. MAIN CONTAINER - Optimized padding for phone screens */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 pt-3 sm:pt-6 pb-28 lg:pb-12 flex flex-col gap-5 sm:gap-6">
        
        {/* Two-Column Responsive Layout: On phone, Cart Items are strictly FIRST (order-1) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          
          {/* PRIMARY COLUMN: Cart Line Items, Recommendations & Bento (7 Cols on desktop, Order 1 on mobile) */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 order-1">
            
            {/* CART ITEMS BOX - APPEARS FIRST WHEN USER CLICKS CART */}
            <div
              id="cart-items-box"
              className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[5px_5px_0_#0f0d5a] border-3 border-on-surface flex flex-col gap-4 text-left"
            >
              {/* Header: Title + Free Shipping status compact integration */}
              <div className="flex flex-col gap-3 pb-3 border-b-2 border-gray-100">
                <div className="flex items-center justify-between">
                  <h1 className="font-headline-xl text-lg sm:text-2xl uppercase text-on-surface font-black tracking-tight">
                    YOUR SOCKS LOOT ({itemCount})
                  </h1>
                  <span className="font-body-md text-[11px] sm:text-xs font-black text-[#E4006C] uppercase tracking-wider flex items-center gap-1">
                    <span>Ships from Mumbai</span> <span>🇮🇳</span>
                  </span>
                </div>

                {/* Compact Free Shipping Progress Bar */}
                <div className="w-full p-2.5 sm:p-3 rounded-xl bg-[#FFF7D6] border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base sm:text-lg shrink-0">{isFreeShipping ? '🎉' : '🚀'}</span>
                    <span className="font-headline-md text-xs sm:text-sm font-black uppercase text-on-surface truncate">
                      {isFreeShipping
                        ? 'FREE EXPRESS DELIVERY UNLOCKED!'
                        : `ADD ₹${amountNeededForFreeShipping} FOR FREE EXPRESS DELIVERY`}
                    </span>
                  </div>
                  <div className="w-20 sm:w-36 h-2.5 bg-white rounded-full border border-on-surface overflow-hidden shrink-0 p-0.5">
                    <div
                      className="h-full bg-[#E4006C] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Item List */}
              {items.length === 0 ? (
                <div className="py-10 flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFF7D6] border-3 border-on-surface flex items-center justify-center text-4xl sm:text-5xl shadow-[4px_4px_0_#0f0d5a]">
                    🧦
                  </div>
                  <h3 className="font-headline-lg text-lg sm:text-xl uppercase font-black text-on-surface mt-2">
                    Your bag is hungry for funky socks!
                  </h3>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface/70 max-w-md px-2">
                    Your feet deserve colors, dopamine, and pure cotton comfort. Don't leave them barefoot and boring!
                  </p>
                  <button
                    onClick={() => navigate('shop')}
                    className="fluid-btn px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-[#E4006C] text-white border-3 border-on-surface font-title-md text-xs sm:text-sm font-black uppercase shadow-[3px_3px_0_#0f0d5a] mt-2 inline-block cursor-pointer active:translate-y-0.5"
                  >
                    EXPLORE SOCKS
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 sm:gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="cart-row flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFF7D6]/60 border-2 border-on-surface transition-all duration-200 hover:bg-[#FFF7D6] shadow-[2.5px_2.5px_0_#0f0d5a]"
                    >
                      {/* Left: Thumbnail & Info */}
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div
                          className="w-14 h-16 sm:w-20 sm:h-24 rounded-xl border-2 border-on-surface overflow-hidden relative shrink-0 flex items-center justify-center text-2xl sm:text-3xl shadow-[2px_2px_0_#0f0d5a]"
                          style={{ backgroundColor: item.bgColor }}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain mix-blend-multiply p-1"
                            />
                          ) : (
                            <span>{item.icon}</span>
                          )}
                        </div>

                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="inline-block self-start px-1.5 py-0.5 rounded bg-white text-on-surface font-label-badge text-[9px] sm:text-[10px] uppercase font-black border border-on-surface truncate">
                            Pure Combed Cotton
                          </span>
                          <h3 className="font-title-md text-xs sm:text-base uppercase font-black text-on-surface leading-tight mt-0.5 truncate">
                            {item.name}
                          </h3>
                          <span className="font-body-md text-[11px] sm:text-xs text-on-surface/70 font-medium truncate">
                            {item.style}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-headline-md text-xs sm:text-sm font-black text-[#b60055]">
                              ₹{item.price * item.quantity}
                            </span>
                            <span className="text-[10px] sm:text-xs text-on-surface/60 font-body-md">
                              (₹{item.price} ea)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Quantity Stepper & Delete Button */}
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {/* Stepper */}
                        <div className="flex items-center bg-white rounded-full border-2 border-on-surface p-0.5 shadow-[1.5px_1.5px_0_#0f0d5a]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-secondary-container font-black text-on-surface transition-all active:scale-75 cursor-pointer select-none text-sm"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            −
                          </button>
                          <span className="inline-block min-w-[22px] sm:min-w-[28px] text-center px-1 font-title-md text-xs sm:text-sm font-black text-on-surface select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-secondary-container font-black text-on-surface transition-all active:scale-75 cursor-pointer select-none text-sm"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>

                        {/* Remove button - dustbin that shows swapped sad badge on deletion */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="icon-bounce w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-100 text-red-700 border-2 border-on-surface flex items-center justify-center hover:bg-red-200 transition-colors cursor-pointer shrink-0 shadow-[1px_1px_0_#0f0d5a] active:scale-90"
                          title="Remove item"
                          aria-label={`Remove ${item.name} from bag`}
                        >
                          <span className="material-symbols-outlined text-[16px] sm:text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Actions inside Loot Box */}
              {items.length > 0 && (
                <div className="flex items-center justify-between pt-3 border-t-2 border-gray-100">
                  <button
                    onClick={() => navigate('shop')}
                    className="flex items-center gap-1 sm:gap-2 font-body-md text-xs sm:text-sm font-black text-on-surface hover:text-[#b60055] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">arrow_back</span>
                    Continue Shopping
                  </button>
                  <button
                    onClick={clearCart}
                    className="text-on-surface/70 font-body-md text-xs sm:text-sm font-bold hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* QUICK-ADD RECOMMENDATIONS (Order 3 on mobile) */}
            <div className="w-full bg-[#FFF7D6] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[5px_5px_0_#0f0d5a] border-3 border-on-surface flex flex-col gap-3 sm:gap-4 text-left order-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl animate-bounce">🔥</span>
                  <h3 className="font-headline-md text-sm sm:text-lg uppercase text-on-surface font-black">
                    Pairs You'll Vibe With
                  </h3>
                </div>
                <span className="font-label-badge text-[10px] sm:text-xs uppercase font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#b60055] text-white border border-on-surface">
                  HOT PICKS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Quick 1 */}
                <div className="p-3 bg-white rounded-xl sm:rounded-2xl border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] flex items-center justify-between gap-2.5 brutal-card-hover">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl border-2 border-on-surface bg-[#FFE043] flex items-center justify-center overflow-hidden shrink-0">
                      <span className="text-2xl sm:text-3xl">☕</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-title-md text-xs sm:text-sm font-black uppercase text-on-surface truncate">
                        Cutting Chai Crew
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-on-surface/70">Crew · Free Size</span>
                      <span className="font-headline-md text-xs sm:text-sm font-black text-[#b60055] mt-0.5">
                        ₹449
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickAdd('Cutting Chai Crew', 449, '☕', '#FFE043')}
                    className="fluid-btn px-2.5 py-1.5 sm:px-3 bg-secondary-container hover:bg-[#ffe082] text-on-surface font-title-md text-xs font-black uppercase rounded-lg sm:rounded-xl border-2 border-on-surface shadow-[1.5px_1.5px_0_#0f0d5a] cursor-pointer shrink-0"
                  >
                    + ADD
                  </button>
                </div>

                {/* Quick 2 */}
                <div className="p-3 bg-white rounded-xl sm:rounded-2xl border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] flex items-center justify-between gap-2.5 brutal-card-hover">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl border-2 border-on-surface bg-[#E4006C] flex items-center justify-center overflow-hidden shrink-0 text-white">
                      <span className="text-2xl sm:text-3xl">🥭</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-title-md text-xs sm:text-sm font-black uppercase text-on-surface truncate">
                        Aam Papad Ankle
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-on-surface/70">Ankle · Free Size</span>
                      <span className="font-headline-md text-xs sm:text-sm font-black text-[#b60055] mt-0.5">
                        ₹399
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickAdd('Aam Papad Ankle', 399, '🥭', '#FF7F29')}
                    className="fluid-btn px-2.5 py-1.5 sm:px-3 bg-secondary-container hover:bg-[#ffe082] text-on-surface font-title-md text-xs font-black uppercase rounded-lg sm:rounded-xl border-2 border-on-surface shadow-[1.5px_1.5px_0_#0f0d5a] cursor-pointer shrink-0"
                  >
                    + ADD
                  </button>
                </div>
              </div>
            </div>

            {/* Quality Bento Guarantees (Order 4 on mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left order-4">
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFF7D6] border-2 sm:border-3 border-on-surface shadow-[3px_3px_0_#0f0d5a] flex flex-col gap-1 brutal-card-hover">
                <span className="text-2xl sm:text-3xl">☁️</span>
                <span className="font-title-md text-xs sm:text-sm font-black uppercase text-on-surface">
                  Anti-Hole Tech
                </span>
                <p className="font-body-md text-[11px] sm:text-xs text-on-surface/80 font-medium">
                  Reinforced toe & heel stitched with Egyptian cotton threads.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border-2 sm:border-3 border-on-surface shadow-[3px_3px_0_#0f0d5a] flex flex-col gap-1 brutal-card-hover">
                <span className="text-2xl sm:text-3xl">🧷</span>
                <span className="font-title-md text-xs sm:text-sm font-black uppercase text-on-surface">
                  15-Day Swap
                </span>
                <p className="font-body-md text-[11px] sm:text-xs text-on-surface/80 font-medium">
                  Free door-step pickups if they aren't the softest thing on your feet.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-secondary-container border-2 sm:border-3 border-on-surface shadow-[3px_3px_0_#0f0d5a] flex flex-col gap-1 brutal-card-hover">
                <span className="text-2xl sm:text-3xl">🌿</span>
                <span className="font-title-md text-xs sm:text-sm font-black uppercase text-on-surface">
                  Non-Toxic Dyes
                </span>
                <p className="font-body-md text-[11px] sm:text-xs text-on-surface font-semibold">
                  100% skin safe vibrant pigments that never bleed into white kicks.
                </p>
              </div>
            </div>
          </div>

          {/* SECONDARY COLUMN: BAG SUMMARY & CHECKOUT (5 Cols on desktop, Order 2 on mobile) */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 lg:sticky lg:top-24 text-left order-2">
            <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[5px_5px_0_#0f0d5a] sm:shadow-[8px_8px_0_#0f0d5a] border-3 border-on-surface flex flex-col gap-4 relative">
              <h2 className="font-headline-xl text-lg sm:text-2xl uppercase text-on-surface font-black border-b-2 border-gray-100 pb-2.5">
                BAG SUMMARY
              </h2>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-2.5 font-body-md text-xs sm:text-sm">
                <div className="flex items-center justify-between text-on-surface">
                  <span className="font-bold">Subtotal ({itemCount} pairs)</span>
                  <span className="font-black text-sm sm:text-base">₹{subtotal}</span>
                </div>

                {promoApplied && (
                  <div className="flex items-center justify-between text-[#b60055]">
                    <div className="flex items-center gap-1 font-black">
                      <span className="material-symbols-outlined text-[16px]">local_offer</span>
                      <span>Promo Discount ({promoCode})</span>
                    </div>
                    <span className="font-black">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-on-surface">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span>Express Delivery across India</span>
                    <span className="font-label-badge text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-secondary-container text-on-surface font-black uppercase border border-on-surface">
                      {shippingFee === 0 ? 'FREE' : 'STANDARD'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {shippingFee === 0 ? (
                      <>
                        <span className="line-through text-gray-400 font-bold text-xs mr-1">
                          ₹99
                        </span>
                        <span className="font-black text-[#b60055] uppercase">FREE</span>
                      </>
                    ) : (
                      <span className="font-black text-on-surface">₹99</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-on-surface/70 text-[11px] sm:text-xs">
                  <span>Estimated Taxes (GST 12%)</span>
                  <span className="font-bold">Included in MRP</span>
                </div>
              </div>

              {/* Coupon Form */}
              <div className="pt-2 border-t-2 border-gray-100 flex flex-col gap-2">
                <label className="font-label-badge text-xs uppercase font-black text-on-surface flex items-center justify-between">
                  <span>HAVE A PROMO CODE?</span>
                  {!promoApplied && (
                    <button
                      type="button"
                      onClick={() => applyPromoCode('SOCKSY10')}
                      className="text-[#E4006C] hover:underline font-black text-[10px] cursor-pointer"
                    >
                      Use SOCKSY10
                    </button>
                  )}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="TRY: SOCKSY10"
                    className="w-full h-11 sm:h-12 px-3 sm:px-4 rounded-xl bg-[#eeecff] text-on-surface border-2 border-on-surface font-title-md text-xs sm:text-sm uppercase font-black focus:outline-none focus:bg-[#FFF7D6]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="fluid-btn h-11 sm:h-12 px-4 sm:px-6 rounded-xl bg-on-surface text-white border-2 border-on-surface font-title-md text-xs font-black uppercase shadow-[2px_2px_0_#0f0d5a] hover:bg-[#b60055] cursor-pointer shrink-0"
                  >
                    APPLY
                  </button>
                </div>

                {promoApplied && (
                  <div className="flex items-center justify-between text-[#b60055] text-xs font-black pt-0.5">
                    <span className="flex items-center gap-1 truncate">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      <span>'{promoCode}' applied: 10% discount!</span>
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-red-600 underline cursor-pointer shrink-0 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoError && (
                  <div className="flex items-center gap-1 text-red-600 text-xs font-black pt-0.5">
                    <span className="material-symbols-outlined text-[15px]">error</span>
                    <span>{promoError}</span>
                  </div>
                )}
              </div>

              {/* Total Bill Box */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFF7D6] border-2 sm:border-3 border-on-surface flex items-center justify-between shadow-[2.5px_2.5px_0_#0f0d5a]">
                <div className="flex flex-col">
                  <span className="font-label-badge text-[10px] sm:text-xs uppercase font-black text-on-surface/70">
                    TOTAL AMOUNT DUE
                  </span>
                  <span className="font-label-ticker text-[10px] sm:text-xs font-black text-[#b60055]">
                    {shippingFee === 0 ? 'FREE SHIPPING APPLIED 🎉' : 'STANDARD SHIPPING'}
                  </span>
                </div>
                <span className="font-headline-xl text-xl sm:text-3xl font-black text-on-surface">
                  ₹{grandTotal}
                </span>
              </div>

              {/* Primary Checkout CTA */}
              <button
                type="button"
                disabled={items.length === 0}
                onClick={() => setCheckoutOpen(true)}
                className="checkout-btn-physics btn-glow-pulse w-full h-12 sm:h-14 rounded-full bg-[#E4006C] text-white border-2 sm:border-3 border-on-surface font-title-md text-xs sm:text-base uppercase font-black tracking-wider hover:bg-[#b60055] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 shadow-[3px_3px_0_#0f0d5a] active:translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[22px]">lock</span>
                <span>PROCEED TO CHECKOUT (₹{grandTotal})</span>
                <span className="material-symbols-outlined text-[18px] sm:text-[20px] group-hover:translate-x-1.5 transition-transform">
                  arrow_forward
                </span>
              </button>

              {/* Trust Badges */}
              <div className="flex flex-col gap-2 pt-1 text-center">
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold text-on-surface/80 uppercase flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">security</span>
                    256-Bit SSL
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">payments</span>
                    Cash on Delivery
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">swap_horiz</span>
                    15D Returns
                  </span>
                </div>

                {/* Payment Network Chips */}
                <div className="flex items-center justify-center flex-wrap gap-1.5 pt-0.5 opacity-90">
                  {['UPI', 'GPAY', 'PAYTM', 'RUPAY', 'VISA', 'MASTERCARD'].map((p) => (
                    <div
                      key={p}
                      className="px-2 py-0.5 bg-[#eeecff] rounded-md border border-on-surface font-label-badge text-[9px] font-black tracking-wider text-on-surface"
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-4 rounded-xl sm:rounded-2xl bg-[#FFFDF5] border-2 sm:border-3 border-on-surface flex items-start gap-3 shadow-[3px_3px_0_#0f0d5a] brutal-card-hover">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary-container border-2 border-on-surface flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0_#0f0d5a]">
                <span className="material-symbols-outlined text-on-surface text-[18px] sm:text-[22px] font-black">
                  star
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-xs sm:text-sm font-black text-on-surface">
                    Kabir S., Delhi
                  </span>
                  <span className="font-label-badge text-[9px] px-1.5 py-0.5 bg-white rounded-full border border-on-surface text-[#b60055] font-black">
                    VERIFIED SOCKER
                  </span>
                </div>
                <p className="font-body-md text-[11px] sm:text-xs text-on-surface/80 font-medium leading-relaxed">
                  "Insane quality, never slips into sneakers, and people literally stare at the Mirchi Masala print at work. Best socks in India hands down."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. STICKY MOBILE BOTTOM CHECKOUT ACTION BAR (Phone users only, when items > 0) */}
      {items.length > 0 && (
        <div
          className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-[#FFFDF5] border-t-3 border-on-surface px-4 py-2.5 shadow-[0_-3px_0_#0f0d5a] flex items-center justify-between gap-3"
          style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
        >
          <div className="flex flex-col">
            <span className="font-label-badge text-[10px] uppercase font-black text-on-surface/70 leading-none">
              TOTAL DUE
            </span>
            <span className="font-headline-xl text-lg font-black text-[#D8005A]">
              ₹{grandTotal}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            className="fluid-btn px-6 py-2 rounded-full bg-[#E4006C] text-white font-title-md text-xs font-black uppercase border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] flex items-center gap-1.5 active:translate-y-0.5 cursor-pointer"
          >
            <span>CHECKOUT ({itemCount})</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
};
