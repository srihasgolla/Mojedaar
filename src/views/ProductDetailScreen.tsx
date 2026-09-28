import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { DEMO_REVIEWS } from '../data/products';
import { Review } from '../types';
import { MarqueeTicker } from '../components/MarqueeTicker';

export const ProductDetailScreen: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigate,
    showToast,
    triggerConfetti,
    setCheckoutOpen,
  } = useCart();

  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [selectedLengthId, setSelectedLengthId] = useState('crew');
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ success: boolean; msg: string } | null>(null);
  const [isMagnified, setIsMagnified] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(DEMO_REVIEWS);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewBody, setNewReviewBody] = useState('');

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>('acc-1');

  const gallery = selectedProduct.galleryImages || [
    { label: 'Front', url: selectedProduct.image, bgColor: selectedProduct.bgColor },
  ];
  const activeImage = gallery[activeThumbIndex] || gallery[0];

  const lengths = selectedProduct.lengthOptions || [
    { id: 'ankle', label: 'Ankle', sublabel: 'Hits below ankle', price: 399, originalPrice: 499 },
    { id: 'crew', label: 'Crew (Original)', sublabel: 'Classic mid-calf ribbed', price: 449, originalPrice: 599 },
    { id: 'calf', label: 'Tall Crew', sublabel: 'Extra long boot rise', price: 499, originalPrice: 649 },
  ];

  const currentLengthOption = lengths.find((l) => l.id === selectedLengthId) || lengths[0];
  const currentPrice = currentLengthOption.price;
  const originalPrice = currentLengthOption.originalPrice;
  const discountPct = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  const wishlisted = isWishlisted(selectedProduct.id);

  const handlePincodeCheck = () => {
    const val = pincode.trim();
    if (val.length === 6 && /^\d+$/.test(val)) {
      setPincodeStatus({
        success: true,
        msg: `Delivering to ${val} by Friday via Express Courier. Cash on Delivery is available!`,
      });
      showToast('Pincode Serviceable! 🚚', `Delivery to ${val} is guaranteed in 48-72 hrs.`, '⚡');
    } else {
      setPincodeStatus({
        success: false,
        msg: 'Please enter a valid 6-digit Indian postal code (e.g. 400050, 110001).',
      });
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewBody) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      author: newReviewAuthor,
      location: 'Verified Mumbai Sneakerhead',
      rating: 5,
      title: 'Obsessed with the drip!',
      body: newReviewBody,
      timeAgo: 'Just now',
      verified: true,
      avatarLetter: newReviewAuthor.charAt(0).toUpperCase(),
      avatarBg: '#fecf00',
    };

    setReviews([newRev, ...reviews]);
    setIsWriteReviewOpen(false);
    setNewReviewAuthor('');
    setNewReviewBody('');
    triggerConfetti(40);
    showToast('Review Submitted! ⭐', 'Thanks for the spicy feedback!', '🔥');
  };

  return (
    <div className="w-full flex flex-col bg-[#FFFDF5]">
      {/* 1. TOP TICKER RIBBON */}
      <MarqueeTicker variant="magenta" />

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {/* Breadcrumb Bar */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-body-md text-xs sm:text-sm text-on-surface/70 mb-6 font-semibold">
          <button onClick={() => navigate('home')} className="hover:text-primary transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('shop')} className="hover:text-primary transition-colors cursor-pointer">
            Shop
          </button>
          <span>/</span>
          <span className="capitalize">{selectedProduct.category} Socks</span>
          <span>/</span>
          <span className="text-on-surface font-black">{selectedProduct.name}</span>
        </nav>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Neo-Pop Interactive Gallery */}
          <section className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage Container with dynamic background color match */}
            <div
              id="main-stage-container"
              className="relative w-full aspect-[4/5] sm:aspect-square rounded-3xl p-6 sm:p-10 flex items-center justify-center overflow-hidden border-3 border-on-surface shadow-[6px_6px_0_#0f0d5a] transition-colors duration-300"
              style={{ backgroundColor: activeImage.bgColor || selectedProduct.bgColor }}
            >
              {/* Neo Floating Badges with Spring Motion */}
              <div className="absolute top-5 left-5 z-20 flex flex-col items-start gap-2">
                <span className="animate-badge-wiggle inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF0055] text-white font-label-badge text-xs uppercase tracking-wider border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] font-black cursor-default">
                  <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
                  SPICY AF 🌶️
                </span>
                <span className="animate-badge-bounce inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-on-surface font-label-badge text-xs uppercase tracking-tight border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] font-black cursor-default">
                  <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                  SHOT IN BANDRA
                </span>
              </div>

              {/* Wishlist & Zoom Buttons */}
              <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Add to Wishlist"
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`icon-bounce w-11 h-11 rounded-full border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] flex items-center justify-center cursor-pointer transition-colors ${
                    wishlisted
                      ? 'bg-secondary-container text-[#FF0055]'
                      : 'bg-white text-on-surface hover:bg-secondary-container'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>

                <button
                  type="button"
                  aria-label="Magnify image"
                  onClick={() => setIsMagnified(!isMagnified)}
                  className="icon-bounce w-11 h-11 rounded-full bg-white text-on-surface flex items-center justify-center border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] cursor-pointer"
                  title="Click to zoom in"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isMagnified ? 'zoom_out' : 'zoom_in'}
                  </span>
                </button>
              </div>

              {/* Hero Image Stage */}
              <div
                className={`relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 ${
                  isMagnified ? 'scale-125' : 'scale-100'
                }`}
              >
                <img
                  alt={selectedProduct.name}
                  src={activeImage.url}
                  className="animate-float-left max-w-[88%] max-h-[88%] object-contain mix-blend-multiply transition-all duration-300"
                />
              </div>

              {/* Bottom Micro-ribbon Inside Stage */}
              <div className="absolute bottom-4 inset-x-6 z-20 flex items-center justify-between text-xs font-bold text-on-surface px-4 py-2 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a]">
                <span className="flex items-center gap-1.5 font-label-badge text-xs font-black">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e4006c] animate-pulse" />
                  100% COMBED COTTON 200 NEEDLE KNIT
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#b60055] font-black">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  AUTHENTIC MOJADAAR ORIGINAL
                </span>
              </div>
            </div>

            {/* Thumbnail Selector Bar */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {gallery.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveThumbIndex(idx)}
                  className={`thumb-btn thumb-bounce relative aspect-square rounded-2xl p-2 flex items-center justify-center overflow-hidden border-2 border-on-surface cursor-pointer transition-all ${
                    activeThumbIndex === idx
                      ? 'ring-3 ring-[#D8005A] ring-offset-2 shadow-[3px_3px_0_#0f0d5a] scale-105'
                      : 'shadow-[2px_2px_0_#0f0d5a]'
                  }`}
                  style={{ backgroundColor: thumb.bgColor }}
                >
                  <img
                    alt={thumb.label}
                    src={thumb.url}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                  <span className="absolute bottom-1 right-1 text-[9px] font-black px-1.5 py-0.5 rounded bg-white text-on-surface border border-on-surface shadow-xs">
                    {thumb.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Trust Badges Under Gallery */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-2xl border-2 border-on-surface shadow-[3px_3px_0_#0f0d5a] flex items-center gap-2.5 brutal-card-hover">
                <div className="w-9 h-9 rounded-full bg-secondary-container border-2 border-on-surface flex items-center justify-center text-on-surface shrink-0">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-title-md text-xs font-black text-on-surface leading-tight">
                    Dispatched in 24h
                  </span>
                  <span className="text-[11px] text-on-surface/70 font-medium leading-tight">
                    Free over ₹999
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-2xl border-2 border-on-surface shadow-[3px_3px_0_#0f0d5a] flex items-center gap-2.5 brutal-card-hover">
                <div className="w-9 h-9 rounded-full bg-[#ffd9e0] border-2 border-on-surface flex items-center justify-center text-[#b60055] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">cached</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-title-md text-xs font-black text-on-surface leading-tight">
                    7-Day Free Swap
                  </span>
                  <span className="text-[11px] text-on-surface/70 font-medium leading-tight">
                    Zero hassle returns
                  </span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 bg-white rounded-2xl border-2 border-on-surface shadow-[3px_3px_0_#0f0d5a] flex items-center gap-2.5 brutal-card-hover">
                <div className="w-9 h-9 rounded-full bg-[#FFF7D6] border-2 border-on-surface flex items-center justify-center text-[#cb4900] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-title-md text-xs font-black text-on-surface leading-tight">
                    Anti-Slip Grip
                  </span>
                  <span className="text-[11px] text-on-surface/70 font-medium leading-tight">
                    Reinforced heel & toe
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Purchase & Specs Panel */}
          <section className="lg:col-span-5 flex flex-col gap-6 text-left">
            {/* Header Info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="animate-bounce inline-block px-3 py-1 rounded-full bg-secondary-container text-on-surface font-label-badge text-xs uppercase font-black border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a]">
                  BESTSELLER IN MUMBAI
                </span>
                <span className="px-3 py-1 rounded-full bg-[#e1e0ff] text-on-surface font-label-badge text-xs uppercase border-2 border-on-surface font-black shadow-[2px_2px_0_#0f0d5a]">
                  ARTISAN SERIES VOL. 3
                </span>
              </div>

              <h1 className="font-display-hero text-3xl sm:text-4xl lg:text-[44px] uppercase text-[#0A0744] tracking-tight leading-[0.95] pt-1 font-black">
                {selectedProduct.name} SOCKS
              </h1>

              <p className="font-body-md text-sm sm:text-base text-on-surface/80 font-semibold">
                {selectedProduct.description}
              </p>

              {/* Reviews & Quality Row */}
              <div className="flex items-center gap-3 pt-1">
                {reviews.length > 0 ? (
                  <>
                    <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a]">
                      <div className="flex text-amber-500">
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star</span>
                      </div>
                      <span className="font-title-md text-xs font-black text-on-surface ml-1">
                        5.0
                      </span>
                    </div>
                    <a href="#reviews-section" className="font-body-md text-sm text-[#b60055] font-black hover:underline">
                      {reviews.length} Verified Review{reviews.length > 1 ? 's' : ''}
                    </a>
                  </>
                ) : (
                  <a href="#reviews-section" className="font-body-md text-xs sm:text-sm text-[#b60055] font-black hover:underline flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a]">
                    <span>✨</span>
                    <span>New Arrival • Be First To Review</span>
                  </a>
                )}
                <span className="text-gray-400">·</span>
                <span className="text-xs text-on-surface font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> 100% Combed Cotton
                </span>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="p-5 rounded-3xl bg-white border-3 border-on-surface shadow-[5px_5px_0_#0f0d5a] flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display-hero text-3xl font-black text-on-surface tracking-tight">
                    ₹{currentPrice}
                  </span>
                  <span className="font-body-lg text-lg line-through text-on-surface/50">
                    ₹{originalPrice}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FF0055] text-white font-label-badge text-xs font-black border border-on-surface shadow-[1px_1px_0_#0f0d5a]">
                    {discountPct}% OFF
                  </span>
                </div>
                <span className="text-xs text-on-surface/70 font-bold">Inclusive of all taxes</span>
              </div>
            </div>

            {/* Sock Length Selector */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-headline-md text-xs uppercase font-black text-on-surface">
                  SELECT SOCK LENGTH
                </span>
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      'Size & Fit Guide 📏',
                      'Free size: Fits UK 6 - 11 (EU 39 - 45) with 4-way comfort stretch.',
                      '🧦'
                    )
                  }
                  className="text-primary text-xs font-black hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">straighten</span> Length Guide
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {lengths.map((len) => {
                  const isSelected = selectedLengthId === len.id;
                  return (
                    <button
                      key={len.id}
                      type="button"
                      onClick={() => setSelectedLengthId(len.id)}
                      className={`length-pill p-3 rounded-2xl border-2 border-on-surface text-left transition-all flex flex-col gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-secondary-container ring-2 ring-[#b60055] shadow-[3px_3px_0_#0f0d5a] scale-102'
                          : 'bg-white hover:bg-canvas-cream shadow-[2px_2px_0_#0f0d5a]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-title-md text-xs font-bold text-on-surface">
                          {len.label}
                        </span>
                        <span className="text-[10px] text-on-surface font-bold">₹{len.price}</span>
                      </div>
                      <span className="text-[11px] text-on-surface/70 font-medium">
                        {len.sublabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fit & Universal Stretch Box */}
            <div className="p-3.5 rounded-2xl bg-white border-2 border-on-surface flex items-center justify-between shadow-[2px_2px_0_#0f0d5a]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px] font-black">
                  all_inclusive
                </span>
                <div className="flex flex-col">
                  <span className="font-title-md text-xs font-black text-on-surface">
                    One Size Fits Most (Unisex Fit)
                  </span>
                  <span className="text-[11px] text-on-surface/70 font-medium">
                    Engineered 4-way stretch: Fits UK 6 - 11 (EU 39 - 45)
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-surface text-[11px] font-black border border-on-surface shadow-xs">
                Universal Stretch
              </span>
            </div>

            {/* Scarcity Stock Indicator */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="flex items-center gap-1.5 text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e4006c] animate-ping" />
                  Only 14 pairs left in Mumbai fulfillment hub!
                </span>
                <span className="text-on-surface/70 font-bold">Selling fast</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#eeecff] border border-on-surface overflow-hidden">
                <div className="h-full bg-gradient-to-r from-secondary-container via-[#FF0055] to-[#e4006c] w-[78%] rounded-full" />
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-stretch gap-3">
                {/* Stepper */}
                <div className="h-14 px-3 rounded-2xl bg-white border-2 border-on-surface flex items-center gap-3 shadow-[3px_3px_0_#0f0d5a]">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-8 h-8 rounded-xl bg-canvas-cream border border-on-surface text-on-surface flex items-center justify-center font-black text-lg hover:bg-secondary-container active:scale-85 transition-all cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-title-md text-base font-black text-on-surface w-6 text-center select-none">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="w-8 h-8 rounded-xl bg-canvas-cream border border-on-surface text-on-surface flex items-center justify-center font-black text-lg hover:bg-secondary-container active:scale-85 transition-all cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag CTA */}
                <button
                  type="button"
                  onClick={(e) =>
                    addToCart(selectedProduct, currentLengthOption.label, currentPrice, qty, e.currentTarget)
                  }
                  className="fluid-btn flex-1 h-14 rounded-2xl bg-[#D8005A] text-white font-headline-md text-base font-black uppercase tracking-wide border-2 border-on-surface shadow-[4px_4px_0_#0f0d5a] flex items-center justify-center gap-2 group cursor-pointer active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[22px] group-hover:rotate-12 transition-transform duration-200">
                    local_mall
                  </span>
                  <span>ADD TO BAG · ₹{currentPrice * qty}</span>
                </button>
              </div>

              {/* Express 1-Click Buy */}
              <button
                type="button"
                onClick={() => {
                  addToCart(selectedProduct, currentLengthOption.label, currentPrice, qty);
                  setCheckoutOpen(true);
                }}
                className="electric-shimmer-btn w-full h-13 py-3 rounded-2xl text-on-surface font-title-md text-sm font-black uppercase tracking-wide border-2 border-on-surface shadow-[4px_4px_0_#0f0d5a] flex items-center justify-center gap-3 cursor-pointer"
              >
                <span className="animate-pulse">⚡ EXPRESS UPI / 1-CLICK BUY</span>
                <div className="flex items-center gap-1.5 opacity-90 text-[10px] font-black bg-white px-2 py-0.5 rounded-full text-on-surface border border-on-surface shadow-xs">
                  <span>GPAY</span>
                  <span>•</span>
                  <span>PHONEPE</span>
                  <span>•</span>
                  <span>PAYTM</span>
                </div>
              </button>
            </div>

            {/* Indian Pincode Delivery Checker */}
            <div className="p-4 rounded-3xl bg-white border-2 border-on-surface flex flex-col gap-3 shadow-[3px_3px_0_#0f0d5a]">
              <div className="flex items-center justify-between">
                <span className="font-title-md text-xs font-black text-on-surface uppercase flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#b60055]">pin_drop</span>
                  Check Estimated Delivery Time
                </span>
                <span className="text-[11px] text-on-surface/70 font-bold">Pan-India Express</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 400050)"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#FFFDF5] border border-on-surface font-body-md text-sm text-on-surface placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D8005A]"
                />
                <button
                  type="button"
                  onClick={handlePincodeCheck}
                  className="fluid-btn h-11 px-5 rounded-xl bg-on-surface text-white font-title-md text-xs font-black uppercase tracking-wider border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] cursor-pointer hover:bg-primary transition-colors"
                >
                  Check
                </button>
              </div>

              {pincodeStatus && (
                <div
                  className={`text-xs font-bold p-2.5 rounded-xl border border-on-surface flex items-center gap-2 ${
                    pincodeStatus.success
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-red-100 text-red-900'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {pincodeStatus.success ? 'local_shipping' : 'error'}
                  </span>
                  <span>{pincodeStatus.msg}</span>
                </div>
              )}
            </div>

            {/* Specifications Accordions */}
            <div className="flex flex-col gap-2 pt-2">
              {/* Accordion 1: Fabric */}
              <div className="rounded-2xl bg-white border-2 border-on-surface overflow-hidden shadow-[2px_2px_0_#0f0d5a]">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'acc-1' ? null : 'acc-1')}
                  className="w-full p-4 text-left flex items-center justify-between font-title-md text-sm font-black text-on-surface cursor-pointer select-none hover:bg-canvas-cream/40 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#cb4900]">tune</span>
                    Fabric & Sneaker Tech Specs
                  </span>
                  <span
                    className={`material-symbols-outlined transition-transform duration-300 ${
                      openAccordion === 'acc-1' ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openAccordion === 'acc-1' && (
                  <div className="p-4 pt-0 font-body-md text-xs text-on-surface/80">
                    <div className="grid grid-cols-2 gap-2 pt-1 font-medium">
                      <div className="p-2.5 rounded-xl bg-[#FFF7D6] border border-on-surface flex flex-col">
                        <span className="font-bold text-on-surface">85% Combed Cotton</span>
                        <span className="text-[11px] text-on-surface/70">Ultra-soft breathable natural yarn</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#FFF7D6] border border-on-surface flex flex-col">
                        <span className="font-bold text-on-surface">12% Spandex</span>
                        <span className="text-[11px] text-on-surface/70">Ribbed cuff stays up all day</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#FFF7D6] border border-on-surface flex flex-col">
                        <span className="font-bold text-on-surface">3% Elastane</span>
                        <span className="text-[11px] text-on-surface/70">Arch compression hug</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#FFF7D6] border border-on-surface flex flex-col">
                        <span className="font-bold text-on-surface">Seamless Toe</span>
                        <span className="text-[11px] text-on-surface/70">Zero irritation seams</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Care */}
              <div className="rounded-2xl bg-white border-2 border-on-surface overflow-hidden shadow-[2px_2px_0_#0f0d5a]">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'acc-2' ? null : 'acc-2')}
                  className="w-full p-4 text-left flex items-center justify-between font-title-md text-sm font-black text-on-surface cursor-pointer select-none hover:bg-canvas-cream/40 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#725c00]">
                      local_laundry_service
                    </span>
                    Care Instructions (Keep the Spice Fresh)
                  </span>
                  <span
                    className={`material-symbols-outlined transition-transform duration-300 ${
                      openAccordion === 'acc-2' ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openAccordion === 'acc-2' && (
                  <div className="p-4 pt-0 font-body-md text-xs text-on-surface/80">
                    <ul className="list-disc pl-4 space-y-1 font-semibold">
                      <li>Machine wash cold inside out with like colors (gentle spin).</li>
                      <li>Do NOT iron directly over the graphic illustrations.</li>
                      <li>Air dry in shade or tumble dry low. Never bleach out the colors!</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping */}
              <div className="rounded-2xl bg-white border-2 border-on-surface overflow-hidden shadow-[2px_2px_0_#0f0d5a]">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'acc-3' ? null : 'acc-3')}
                  className="w-full p-4 text-left flex items-center justify-between font-title-md text-sm font-black text-on-surface cursor-pointer select-none hover:bg-canvas-cream/40 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#b60055]">
                      published_with_changes
                    </span>
                    Shipping & 7-Day Hassle-Free Swap
                  </span>
                  <span
                    className={`material-symbols-outlined transition-transform duration-300 ${
                      openAccordion === 'acc-3' ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openAccordion === 'acc-3' && (
                  <div className="p-4 pt-0 font-body-md text-xs text-on-surface/80 flex flex-col gap-1.5">
                    <p className="font-medium">
                      We dispatch within 24 hours from Mumbai & NCR warehouses. BlueDart, Delhivery,
                      and Shadowfax ensure your drip arrives quick.
                    </p>
                    <p className="font-medium">
                      If you aren't completely obsessed with how comfy and funky your feet feel, exchange
                      or return with our 7-day doorstep pickup guarantee.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* 3. REVIEWS SECTION */}
        <section className="mt-16 pt-6 flex flex-col gap-8 text-left" id="reviews-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display-hero text-2xl font-black uppercase text-[#0A0744] tracking-tight">
                WHAT THE SNEAKERHEADS SAY
              </h3>
              <p className="font-body-md text-sm text-on-surface/70 font-medium">
                Real unadulterated feedback from feet across India.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsWriteReviewOpen(true)}
              className="fluid-btn self-start sm:self-auto px-5 py-2.5 rounded-full bg-white border-2 border-on-surface font-title-md text-xs font-black uppercase text-on-surface shadow-[3px_3px_0_#0f0d5a] hover:bg-secondary-container cursor-pointer"
            >
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-3xl bg-white border-3 border-on-surface flex flex-col justify-between gap-4 shadow-[4px_4px_0_#0f0d5a] brutal-card-hover"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[16px]">
                            star
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] text-on-surface/60 font-bold">{rev.timeAgo}</span>
                    </div>
                    <p className="font-title-md text-sm font-black text-on-surface">"{rev.title}"</p>
                    <p className="font-body-md text-xs text-on-surface/70 font-medium">{rev.body}</p>
                  </div>

                  <div className="flex items-center gap-2.5 pt-2">
                    <div
                      className="w-7 h-7 rounded-full border border-on-surface text-on-surface flex items-center justify-center font-black text-xs"
                      style={{ backgroundColor: rev.avatarBg }}
                    >
                      {rev.avatarLetter}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-on-surface">{rev.author}</span>
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">verified</span>
                        {rev.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white p-8 sm:p-10 rounded-3xl border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] text-center flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-[#FFEAA0] border-2 border-on-surface flex items-center justify-center text-3xl shadow-[3px_3px_0_#0f0d5a] mb-1">
                  🧦
                </div>
                <h4 className="font-headline-md text-xl uppercase font-black text-on-surface">
                  Be The First To Review This Pair!
                </h4>
                <p className="font-body-md text-sm text-on-surface/70 max-w-md font-medium">
                  We believe in authentic customer feedback with zero fake reviews. Rock these socks on your feet and drop your real thoughts for fellow sneakerheads!
                </p>
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(true)}
                  className="fluid-btn px-6 py-2.5 rounded-full bg-[#FFE200] text-on-surface font-title-md text-xs sm:text-sm uppercase font-black border-2 border-on-surface shadow-[3px_3px_0_#0f0d5a] hover:bg-[#D8005A] hover:text-white cursor-pointer mt-2"
                >
                  Write First Review ✍️
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Write Review Modal */}
        {isWriteReviewOpen && (
          <div className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-4">
            <div className="bg-[#FFFDF5] border-4 border-on-surface rounded-3xl max-w-md w-full p-6 shadow-[8px_8px_0_#0f0d5a]">
              <div className="flex justify-between items-center border-b-2 border-on-surface pb-3 mb-4">
                <h3 className="font-headline-lg text-lg uppercase font-black">Drop Your Spicy Review</h3>
                <button
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="w-7 h-7 rounded-full border border-on-surface bg-gray-200 flex items-center justify-center font-black"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddReview} className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-bold uppercase block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Vikram S."
                    className="w-full h-10 px-3 rounded-xl bg-white border-2 border-on-surface text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase block mb-1">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewBody}
                    onChange={(e) => setNewReviewBody(e.target.value)}
                    placeholder="Tell everyone how the combed cotton feels..."
                    className="w-full p-3 rounded-xl bg-white border-2 border-on-surface text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="fluid-btn py-3 rounded-xl bg-[#D8005A] text-white font-title-md text-sm uppercase font-black border-2 border-on-surface shadow-[3px_3px_0_#0f0d5a] mt-2"
                >
                  Post Review 🌶️
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Add To Bag Bar */}
      <div
        className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-[#FFFDF5] border-t-3 border-on-surface px-4 py-2.5 shadow-[0_-3px_0_#0f0d5a] flex items-center justify-between gap-3"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex flex-col min-w-0">
          <span className="font-title-md text-xs font-black text-on-surface truncate max-w-[160px]">
            {selectedProduct.name}
          </span>
          <span className="font-headline-md text-sm font-black text-[#b60055]">
            ₹{currentPrice * qty}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            addToCart(selectedProduct, currentLengthOption.label, currentPrice, qty, e.currentTarget);
            triggerConfetti(35);
          }}
          className="fluid-btn px-5 py-2 rounded-full bg-[#E4006C] text-white font-title-md text-xs font-black uppercase border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] flex items-center gap-1.5 active:translate-y-0.5 cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
          <span>ADD TO BAG</span>
        </button>
      </div>
    </div>
  );
};
