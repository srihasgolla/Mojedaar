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
      {/* 1. TOP TICKER RIBBON */}
      <MarqueeTicker variant="magenta" />

      {/* 2. MAIN CONTAINER */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        {/* FREE SHIPPING PROGRESS NOTIFICATION BAR */}
        <div className="w-full p-4 rounded-2xl bg-secondary-container border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-on-surface flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0_#0f0d5a]">
              {isFreeShipping ? '🎉' : '🚀'}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-headline-md text-sm sm:text-base font-black uppercase text-on-surface tracking-tight">
                {isFreeShipping
                  ? '🥳 YOU UNLOCKED FREE EXPRESS DELIVERY!'
                  : `ADD ₹${amountNeededForFreeShipping} MORE FOR FREE EXPRESS DELIVERY`}
              </span>
              <span className="text-xs font-bold text-on-surface/70">
                Crafted with breathable combed cotton · Super swift dispatch
              </span>
            </div>
          </div>

          <div className="w-full sm:w-56 h-3 bg-white rounded-full border-2 border-on-surface overflow-hidden p-0.5">
            <div
              className="h-full bg-[#E4006C] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* MAIN TWO COLUMN CHECKOUT EXPERIENCE */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: CART LINE ITEMS & RECOMMENDATIONS (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Cart Items Box */}
            <div className="w-full bg-white rounded-3xl p-5 md:p-6 shadow-[6px_6px_0_#0f0d5a] border-3 border-on-surface flex flex-col gap-5 text-left">
              <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
                <h1 className="font-headline-xl text-xl sm:text-2xl uppercase text-on-surface font-black">
                  YOUR SOCKS LOOT ({itemCount})
                </h1>
                <span className="font-body-md text-xs sm:text-sm font-bold text-[#E4006C] uppercase tracking-wider flex items-center gap-1">
                  <span>Ships from Mumbai</span> <span>🇮🇳</span>
                </span>
              </div>

              {/* Item List */}
              {items.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-24 h-24 rounded-full bg-[#FFF7D6] border-3 border-on-surface flex items-center justify-center text-5xl shadow-[4px_4px_0_#0f0d5a]">
                    🧦
                  </div>
                  <h3 className="font-headline-lg text-xl uppercase font-black text-on-surface mt-2">
                    Your bag is hungry for some funky socks!
                  </h3>
                  <p className="font-body-md text-sm text-on-surface/70 max-w-md">
                    Your feet deserve colors, dopamine, and pure cotton comfort. Don't leave them barefoot and boring!
                  </p>
                  <button
                    onClick={() => navigate('shop')}
                    className="fluid-btn px-8 py-3 rounded-full bg-[#E4006C] text-white border-3 border-on-surface font-title-md text-sm font-black uppercase shadow-[4px_4px_0_#0f0d5a] mt-3 inline-block cursor-pointer"
                  >
                    EXPLORE SOCKS
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="cart-row flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FFF7D6]/60 border-2 border-on-surface transition-all duration-300 hover:bg-[#FFF7D6] shadow-[3px_3px_0_#0f0d5a]"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl border-2 border-on-surface overflow-hidden relative shrink-0 flex items-center justify-center text-3xl shadow-[2px_2px_0_#0f0d5a]"
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

                        <div className="flex flex-col gap-0.5">
                          <span className="inline-block self-start px-2 py-0.5 rounded bg-white text-on-surface font-label-badge text-[10px] uppercase font-black border border-on-surface">
                            Pure Combed Cotton
                          </span>
                          <h3 className="font-title-md text-sm sm:text-base uppercase font-black text-on-surface leading-tight mt-1">
                            {item.name}
                          </h3>
                          <span className="font-body-md text-xs text-on-surface/70 font-medium">
                            {item.style}
                          </span>
                          <div className="flex items-center gap-2 sm:hidden mt-1">
                            <span className="font-headline-md text-sm font-black text-on-surface">
                              ₹{item.price * item.quantity}
                            </span>
                            <span className="text-xs text-on-surface/60 font-body-md">
                              ₹{item.price} ea
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t border-on-surface/10 sm:border-t-0">
                        <div className="hidden sm:flex flex-col items-end">
                          <span className="font-headline-md text-base font-black text-on-surface">
                            ₹{item.price * item.quantity}
                          </span>
                          <span className="text-xs text-on-surface/70 font-bold">
                            ₹{item.price} ea
                          </span>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center bg-white rounded-full border-2 border-on-surface p-0.5 shadow-[2px_2px_0_#0f0d5a]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary-container font-black text-on-surface transition-all active:scale-80 cursor-pointer select-none"
                          >
                            −
                          </button>
                          <span className="inline-block min-w-[28px] text-center px-2 font-title-md text-sm font-black text-on-surface select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary-container font-black text-on-surface transition-all active:scale-80 cursor-pointer select-none"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="icon-bounce w-9 h-9 rounded-full bg-red-100 text-red-700 border-2 border-on-surface flex items-center justify-center hover:bg-red-200 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Actions */}
              {items.length > 0 && (
                <div className="flex items-center justify-between pt-3 border-t-2 border-gray-100">
                  <button
                    onClick={() => navigate('shop')}
                    className="flex items-center gap-2 font-body-md text-xs sm:text-sm font-black text-on-surface hover:text-[#b60055] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Continue Shopping
                  </button>
                  <button
                    onClick={clearCart}
                    className="text-on-surface/70 font-body-md text-xs sm:text-sm font-bold hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Clear All Items
                  </button>
                </div>
              )}
            </div>

            {/* QUICK-ADD RECOMMENDATIONS SECTION */}
            <div className="w-full bg-[#FFF7D6] rounded-3xl p-5 md:p-6 shadow-[6px_6px_0_#0f0d5a] border-3 border-on-surface flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce">🔥</span>
                  <h3 className="font-headline-md text-base sm:text-lg uppercase text-on-surface font-black">
                    Pairs You'll Vibe With
                  </h3>
                </div>
                <span className="font-label-badge text-xs uppercase font-black px-2.5 py-1 rounded-full bg-[#b60055] text-white border border-on-surface">
                  HOT PICKS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Quick 1 */}
                <div className="p-3 bg-white rounded-2xl border-2 border-on-surface shadow-[3px_3px_0_#0f0d5a] flex items-center justify-between gap-3 brutal-card-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-16 rounded-xl border-2 border-on-surface bg-[#FFE043] flex items-center justify-center overflow-hidden shrink-0">
                      <span className="text-3xl">☕</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-xs sm:text-sm font-black uppercase text-on-surface">
                        Cutting Chai Crew
                      </span>
                      <span className="text-[11px] font-bold text-on-surface/70">Crew · Free Size</span>
                      <span className="font-headline-md text-xs sm:text-sm font-black text-[#b60055] mt-0.5">
                        ₹449
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickAdd('Cutting Chai Crew', 449, '☕', '#FFE043')}
                    className="fluid-btn px-3 py-1.5 bg-secondary-container hover:bg-[#ffe082] text-on-surface font-title-md text-xs font-black uppercase rounded-xl border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] cursor-pointer shrink-0"
                  >
                    + ADD
                  </button>
                </div>

                {/* Quick 2 */}
                <div className="p-3 bg-white rounded-2xl border-2 border-on-surface shadow-[3px_3px_0_#0f0d5a] flex items-center justify-between gap-3 brutal-card-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-16 rounded-xl border-2 border-on-surface bg-[#E4006C] flex items-center justify-center overflow-hidden shrink-0 text-white">
                      <span className="text-3xl">🥭</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-xs sm:text-sm font-black uppercase text-on-surface">
                        Aam Papad Ankle
                      </span>
                      <span className="text-[11px] font-bold text-on-surface/70">Ankle · Free Size</span>
                      <span className="font-headline-md text-xs sm:text-sm font-black text-[#b60055] mt-0.5">
                        ₹399
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickAdd('Aam Papad Ankle', 399, '🥭', '#FF7F29')}
                    className="fluid-btn px-3 py-1.5 bg-secondary-container hover:bg-[#ffe082] text-on-surface font-title-md text-xs font-black uppercase rounded-xl border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] cursor-pointer shrink-0"
                  >
                    + ADD
                  </button>
                </div>
              </div>
            </div>

            {/* Quality Bento Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-2xl bg-[#FFF7D6] border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] flex flex-col gap-1 brutal-card-hover">
                <span className="text-3xl">☁️</span>
                <span className="font-title-md text-sm font-black uppercase text-on-surface">
                  Anti-Hole Tech
                </span>
                <p className="font-body-md text-xs text-on-surface/80 font-medium">
                  Reinforced toe & heel stitched with double twisted Egyptian cotton threads.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] flex flex-col gap-1 brutal-card-hover">
                <span className="text-3xl">🧷</span>
                <span className="font-title-md text-sm font-black uppercase text-on-surface">
                  15-Day Swap
                </span>
                <p className="font-body-md text-xs text-on-surface/80 font-medium">
                  Free door-step pickups if they aren't the softest thing on your feet.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-secondary-container border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] flex flex-col gap-1 brutal-card-hover">
                <span className="text-3xl">🌿</span>
                <span className="font-title-md text-sm font-black uppercase text-on-surface">
                  Non-Toxic Dyes
                </span>
                <p className="font-body-md text-xs text-on-surface font-semibold">
                  100% skin safe vibrant pigments that never bleed into white kicks.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY, COUPON, CHECKOUT CTA (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 sticky top-28 text-left">
            <div className="w-full bg-white rounded-3xl p-6 shadow-[8px_8px_0_#0f0d5a] border-3 border-on-surface flex flex-col gap-5 relative">
              <h2 className="font-headline-xl text-xl sm:text-2xl uppercase text-on-surface font-black border-b-2 border-gray-100 pb-3">
                BAG SUMMARY
              </h2>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-3 font-body-md text-sm">
                <div className="flex items-center justify-between text-on-surface">
                  <span className="font-bold">Subtotal ({itemCount} pairs)</span>
                  <span className="font-black text-base">₹{subtotal}</span>
                </div>

                {promoApplied && (
                  <div className="flex items-center justify-between text-[#b60055]">
                    <div className="flex items-center gap-1 font-black">
                      <span className="material-symbols-outlined text-[18px]">local_offer</span>
                      <span>Promo Discount ({promoCode})</span>
                    </div>
                    <span className="font-black">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-on-surface">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span>Express Delivery across India</span>
                    <span className="font-label-badge text-[10px] px-2 py-0.5 rounded-full bg-secondary-container text-on-surface font-black uppercase border border-on-surface">
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

                <div className="flex items-center justify-between text-on-surface/70 text-xs">
                  <span>Estimated Taxes (GST 12%)</span>
                  <span className="font-bold">Included in MRP</span>
                </div>
              </div>

              {/* Coupon Form */}
              <div className="pt-2 border-t-2 border-gray-100 flex flex-col gap-2">
                <label className="font-label-badge text-xs uppercase font-black text-on-surface">
                  HAVE A PROMO CODE?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="TRY: SOCKSY10"
                    className="w-full h-12 px-4 rounded-xl bg-[#eeecff] text-on-surface border-2 border-on-surface font-title-md text-sm uppercase font-black focus:outline-none focus:bg-[#FFF7D6]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="fluid-btn h-12 px-6 rounded-xl bg-on-surface text-white border-2 border-on-surface font-title-md text-xs font-black uppercase shadow-[2px_2px_0_#0f0d5a] hover:bg-[#b60055] cursor-pointer"
                  >
                    APPLY
                  </button>
                </div>

                {promoApplied && (
                  <div className="flex items-center justify-between text-[#b60055] text-xs font-black pt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Code '{promoCode}' applied: 10% instant discount!</span>
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-red-600 underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoError && (
                  <div className="flex items-center gap-1 text-red-600 text-xs font-black pt-1">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    <span>{promoError}</span>
                  </div>
                )}
              </div>

              {/* Total Bill Pill */}
              <div className="p-4 rounded-2xl bg-[#FFF7D6] border-3 border-on-surface flex items-center justify-between shadow-[3px_3px_0_#0f0d5a]">
                <div className="flex flex-col">
                  <span className="font-label-badge text-xs uppercase font-black text-on-surface/70">
                    TOTAL AMOUNT DUE
                  </span>
                  <span className="font-label-ticker text-xs font-black text-[#b60055]">
                    {shippingFee === 0 ? 'FREE SHIPPING APPLIED 🎉' : 'STANDARD SHIPPING'}
                  </span>
                </div>
                <span className="font-headline-xl text-2xl sm:text-3xl font-black text-on-surface">
                  ₹{grandTotal}
                </span>
              </div>

              {/* Primary Checkout CTA */}
              <button
                type="button"
                disabled={items.length === 0}
                onClick={() => setCheckoutOpen(true)}
                className="checkout-btn-physics btn-glow-pulse w-full h-14 rounded-full bg-[#E4006C] text-white border-3 border-on-surface font-title-md text-sm sm:text-base uppercase font-black tracking-wider hover:bg-[#b60055] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[22px]">lock</span>
                <span>PROCEED TO CHECKOUT (₹{grandTotal})</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </button>

              {/* Trust Badges */}
              <div className="flex flex-col gap-3 pt-2 text-center">
                <div className="flex items-center justify-center gap-3 text-xs font-bold text-on-surface/80 uppercase">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                    256-Bit SSL
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">payments</span>
                    Cash on Delivery
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">swap_horiz</span>
                    Easy 15D Returns
                  </span>
                </div>

                {/* Payment Network Chips */}
                <div className="flex items-center justify-center flex-wrap gap-2 pt-1 opacity-90">
                  <div className="px-2.5 py-1 bg-[#eeecff] rounded-lg border-2 border-on-surface font-label-badge text-[10px] font-black tracking-widest text-on-surface">
                    UPI
                  </div>
                  <div className="px-2.5 py-1 bg-[#eeecff] rounded-lg border-2 border-on-surface font-label-badge text-[10px] font-black tracking-widest text-on-surface">
                    GPAY
                  </div>
                  <div className="px-2.5 py-1 bg-[#eeecff] rounded-lg border-2 border-on-surface font-label-badge text-[10px] font-black tracking-widest text-on-surface">
                    PAYTM
                  </div>
                  <div className="px-2.5 py-1 bg-[#eeecff] rounded-lg border-2 border-on-surface font-label-badge text-[10px] font-black tracking-widest text-on-surface">
                    RUPAY
                  </div>
                  <div className="px-2.5 py-1 bg-[#eeecff] rounded-lg border-2 border-on-surface font-label-badge text-[10px] font-black tracking-widest text-on-surface">
                    VISA
                  </div>
                  <div className="px-2.5 py-1 bg-[#eeecff] rounded-lg border-2 border-on-surface font-label-badge text-[10px] font-black tracking-widest text-on-surface">
                    MASTERCARD
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-5 rounded-2xl bg-[#FFFDF5] border-3 border-on-surface flex items-start gap-3.5 shadow-[4px_4px_0_#0f0d5a] brutal-card-hover">
              <div className="w-10 h-10 rounded-xl bg-secondary-container border-2 border-on-surface flex items-center justify-center shrink-0 shadow-[2px_2px_0_#0f0d5a]">
                <span className="material-symbols-outlined text-on-surface text-[22px] font-black">
                  star
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-sm font-black text-on-surface">
                    Kabir S., Delhi
                  </span>
                  <span className="font-label-badge text-[10px] px-2 py-0.5 bg-white rounded-full border border-on-surface text-[#b60055] font-black">
                    VERIFIED SOCKER
                  </span>
                </div>
                <p className="font-body-md text-xs text-on-surface/80 font-medium">
                  "Insane quality, never slips into sneakers, and people literally stare at the Mirchi Masala print at work. Best socks in India hands down."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
