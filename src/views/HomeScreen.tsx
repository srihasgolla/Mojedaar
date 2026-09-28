import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, BRAND_LOGOS, LIFESTYLE_IMAGES, MOODS } from '../data/products';
import { MarqueeTicker } from '../components/MarqueeTicker';

export const HomeScreen: React.FC = () => {
  const { navigate, openProduct, addToCart, setMoodFilter, triggerConfetti } = useCart();
  const homepageProducts = PRODUCTS.slice(0, 6);

  return (
    <div className="w-full flex flex-col bg-[#FFFDF5]">
      {/* 1. TOP TICKER RIBBON */}
      <MarqueeTicker variant="magenta" />

      {/* 2. HERO SECTION */}
      <section className="relative w-full bg-[#FFFDF5] pt-8 pb-16 lg:pt-12 lg:pb-24 px-4 sm:px-8 border-b-4 border-on-surface overflow-hidden">
        {/* Background geometric pastel decorative elements */}
        <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#FFD8DE] pointer-events-none -z-0 opacity-80 animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#FFEAA0] rotate-12 pointer-events-none -z-0 rounded-3xl opacity-75" />

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Center Floating Stage Container */}
          <div className="w-full relative flex items-center justify-center min-h-[380px] lg:min-h-[460px] mb-4">
            {/* LEFT FLOATING BADGE */}
            <div
              onClick={() => openProduct('mirchi-masala')}
              className="animate-float-left absolute left-2 sm:left-6 md:left-12 lg:left-16 top-10 sm:top-14 z-20 brutal-card-hover cursor-pointer block group"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 bg-[#FFE800] rounded-3xl border-4 border-on-surface shadow-[6px_6px_0_#0f0d5a] p-3 sm:p-4 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:rotate-6">
                <img
                  alt="Funky Pink Pattern Sock"
                  className="w-full h-full object-cover mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                  src={LIFESTYLE_IMAGES.floatingLeft}
                />
              </div>
            </div>

            {/* CENTER LOGO EMBLEM */}
            <div className="flex flex-col items-center justify-center animate-gentle-wobble z-10">
              <div
                onClick={() => navigate('shop')}
                className="relative max-w-[320px] sm:max-w-[420px] lg:max-w-[500px] bg-transparent cursor-pointer group"
              >
                <img
                  alt="Mojadaar Logo Emblem"
                  className="w-full h-auto object-contain logo-blend-multiply bg-transparent transition-transform duration-300 group-hover:scale-105"
                  src={BRAND_LOGOS.heroEmblem}
                />
              </div>

              {/* Tilted star decoration behind pill */}
              <div className="mt-2 inline-flex items-center px-6 py-2 rounded-full bg-[#FFE54C] border-3 border-on-surface shadow-[3px_3px_0_#0f0d5a] hover:rotate-2 transition-transform duration-200">
                <span className="font-display-hero text-xs sm:text-sm uppercase tracking-wider text-on-surface font-black">
                  INDIA'S FUNKIEST SOCK UNIVERSE
                </span>
              </div>
            </div>

            {/* RIGHT FLOATING BADGE */}
            <div
              onClick={() => openProduct('bijli-stripes')}
              className="animate-float-right absolute right-2 sm:right-6 md:right-12 lg:right-16 top-6 sm:top-10 z-20 brutal-card-hover cursor-pointer block group"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 bg-[#FFF7E8] rounded-3xl border-4 border-on-surface shadow-[6px_6px_0_#0f0d5a] p-3 sm:p-4 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:-rotate-6">
                <img
                  alt="Striped socks pair"
                  className="w-full h-full object-cover mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                  src={LIFESTYLE_IMAGES.floatingRight}
                />
              </div>
            </div>
          </div>

          {/* MASSIVE NAVY TYPOGRAPHY "BORING SOCKS ARE CANCELLED." */}
          <div className="w-full max-w-5xl mt-2 mb-4">
            <h1 className="font-display-hero text-[48px] sm:text-[76px] lg:text-[104px] uppercase text-[#0A0744] tracking-tight leading-[0.9] font-black">
              BORING SOCKS <br />
              <span className="text-[#b60055] inline-block underline decoration-[#fecf00] decoration-wavy transition-transform hover:scale-105">
                ARE
              </span>{' '}
              <span className="text-[#cb4900] inline-block transition-transform hover:rotate-1">
                CANCELLED.
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="font-body-lg text-base sm:text-xl text-[#5c3f45] max-w-2xl mb-8 font-medium">
            Loud patterns, ridiculous comfort, zero chill. Designed in India for feet with a
            personality problem.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              onClick={() => navigate('shop')}
              className="fluid-btn px-8 py-3.5 rounded-full bg-[#b60055] text-white font-title-md text-base uppercase border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] inline-block font-black cursor-pointer"
            >
              SHOP ALL SOCKS
            </button>
            <button
              onClick={() => navigate('shop')}
              className="fluid-btn px-8 py-3.5 rounded-full bg-white text-on-surface font-title-md text-base uppercase border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] hover:bg-[#ffe082] inline-flex items-center gap-2 font-black cursor-pointer"
            >
              EXPLORE SOCKS 🧦
            </button>
          </div>

          {/* Bandra Lifestyle Card Feature */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
            <div className="md:col-span-5 bg-[#FFFDF5] rounded-3xl border-3 border-on-surface p-6 shadow-[6px_6px_0_#0f0d5a] flex flex-col items-center justify-center text-center brutal-card-hover">
              <img
                alt="Official 3D Mojadaar Logo"
                className="h-32 w-auto object-contain logo-blend-multiply bg-transparent transition-transform duration-300 hover:scale-110"
                src={BRAND_LOGOS.bandraCard}
              />
              <div className="mt-4 px-4 py-1.5 bg-[#fecf00] rounded-full border-2 border-on-surface font-label-badge text-xs uppercase font-black text-on-surface shadow-[2px_2px_0_#0f0d5a]">
                100% MOJ GUARANTEED
              </div>
            </div>

            <div className="md:col-span-7 rounded-3xl border-3 border-on-surface overflow-hidden shadow-[6px_6px_0_#0f0d5a] relative bg-[#e4006c] h-64 md:h-72 group">
              <img
                alt="Lifestyle in Bandra socks"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={LIFESTYLE_IMAGES.bandraStreet}
              />
              <div className="absolute top-4 left-4 bg-[#fecf00] px-3.5 py-1 rounded-full border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] flex items-center gap-1.5 rotate-[-2deg] group-hover:rotate-0 transition-transform">
                <span className="font-label-badge text-xs uppercase text-on-surface font-black">
                  Shot in Bandra ✦
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a] text-[#b60055] font-bold text-xs uppercase group-hover:-translate-y-1 transition-transform">
                Street Pop Crew
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY SOCKS? VALUE HIGHLIGHTS */}
      <section className="w-full bg-[#fcf8ff] py-16 px-4 sm:px-8 lg:px-12 border-b-4 border-on-surface" id="about">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="font-display-hero text-3xl sm:text-4xl uppercase text-on-surface font-black">
                  WHY
                </span>
                <span className="font-display-hero text-3xl sm:text-4xl uppercase text-[#cb4900] underline decoration-[#fecf00] font-black">
                  SOCKS?
                </span>
              </div>
              <p className="font-body-lg text-base text-[#5c3f45] max-w-xl">
                Because your feet shouldn't have to dress boring. Mojadaar makes the loudest, comfiest
                socks in the country.
              </p>
            </div>
            <div className="bg-[#ffe082] px-4 py-2 rounded-2xl border-2 border-on-surface font-title-md text-sm uppercase shadow-[3px_3px_0_#0f0d5a] self-start md:self-end hover:rotate-2 transition-transform font-bold">
              🔥 5 Comfort Pillars
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Softness */}
            <div className="p-5 rounded-2xl bg-[#FFF7D6] border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] flex items-start gap-4 brutal-card-hover group">
              <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                ☁️
              </span>
              <div>
                <h3 className="font-title-md text-lg uppercase text-on-surface font-black">
                  Softness
                </h3>
                <p className="font-body-md text-sm text-[#5c3f45] mt-1">
                  Combed cotton that feels like a nap.
                </p>
              </div>
            </div>

            {/* 2. Fit */}
            <div className="p-5 rounded-2xl bg-white border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] flex items-start gap-4 brutal-card-hover group">
              <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
                🧷
              </span>
              <div>
                <h3 className="font-title-md text-lg uppercase text-on-surface font-black">Fit</h3>
                <p className="font-body-md text-sm text-[#5c3f45] mt-1">
                  Stays up. Never strangles your calf.
                </p>
              </div>
            </div>

            {/* 3. Breathability */}
            <div className="p-5 rounded-2xl bg-[#eeecff] border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] flex items-start gap-4 brutal-card-hover group">
              <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                🌬️
              </span>
              <div>
                <h3 className="font-title-md text-lg uppercase text-on-surface font-black">
                  Breathability
                </h3>
                <p className="font-body-md text-sm text-[#5c3f45] mt-1">
                  Built for Indian summers, obviously.
                </p>
              </div>
            </div>

            {/* 4. Durability */}
            <div className="p-5 rounded-2xl bg-white border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] flex items-start gap-4 brutal-card-hover group">
              <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
                💪
              </span>
              <div>
                <h3 className="font-title-md text-lg uppercase text-on-surface font-black">
                  Durability
                </h3>
                <p className="font-body-md text-sm text-[#5c3f45] mt-1">
                  Wash 100 times. Still loud.
                </p>
              </div>
            </div>

            {/* 5. Fun */}
            <div className="p-5 rounded-2xl bg-[#fecf00] border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] flex items-start gap-4 sm:col-span-2 lg:col-span-2 brutal-card-hover group">
              <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                🤪
              </span>
              <div>
                <h3 className="font-title-md text-lg uppercase text-on-surface font-black">Fun</h3>
                <p className="font-body-md text-sm text-on-surface font-semibold mt-1">
                  Non-negotiable. Wear what sparks genuine joy everyday.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EVERYONE'S SOCKS RIGHT NOW */}
      <section className="w-full bg-[#fecf00] py-16 px-4 sm:px-8 lg:px-12 border-b-4 border-on-surface" id="shop">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="italic font-body-md text-sm text-[#231b00] font-bold tracking-tight">
                no pressure, but…
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl uppercase text-on-surface tracking-tight font-black">
                EVERYONE'S <span className="text-[#b60055] underline decoration-white">SOCKS</span>{' '}
                RIGHT NOW.
              </h2>
              <p className="font-body-md text-sm text-[#231b00] mt-1 font-semibold">
                Swipe through the pairs flying out of our warehouse in Mumbai this week.
              </p>
            </div>
            <button
              onClick={() => navigate('shop')}
              className="fluid-btn self-start md:self-end px-5 py-2.5 rounded-full bg-white border-2 border-on-surface text-on-surface font-title-md text-sm uppercase shadow-[3px_3px_0_#0f0d5a] hover:bg-[#FFF7D6] flex items-center gap-1.5 whitespace-nowrap font-black cursor-pointer"
            >
              <span>See all the socks</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* 6 Real Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {homepageProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border-3 border-on-surface p-3 shadow-[5px_5px_0_#0f0d5a] flex flex-col justify-between group product-card"
              >
                <div>
                  <div
                    onClick={() => openProduct(product.id)}
                    className="block cursor-pointer relative w-full aspect-square rounded-2xl overflow-hidden mb-3 border-2 border-on-surface"
                    style={{ backgroundColor: product.bgColor }}
                  >
                    <img
                      alt={product.name}
                      src={product.image}
                      className="w-full h-full object-cover mix-blend-multiply product-img transition-transform duration-300"
                    />

                    {/* Collectible Streetwear Stamp - Pops in on hover just like Angry Toast */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-15">
                      <div className="opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-[-8deg] transition-all duration-300 transform bg-[#FFE200] text-[#0f0d5a] font-display-hero text-[11px] font-black uppercase px-2.5 py-1 rounded-xl border-2 border-[#0f0d5a] shadow-[3px_3px_0_#0f0d5a]">
                        {product.badge || '🔥 100% DRIP'}
                      </div>
                    </div>

                    {product.badge && (
                      <span
                        className={`badge-pop absolute top-2 left-2 font-label-badge text-[10px] uppercase px-2 py-0.5 rounded-full border border-on-surface font-extrabold shadow-[1px_1px_0_#0f0d5a] ${
                          product.badgeType === 'new'
                            ? 'bg-secondary-container text-on-surface'
                            : product.badgeType === 'bestseller'
                            ? 'bg-[#b60055] text-white'
                            : product.badgeType === 'lowstock'
                            ? 'bg-[#FF0055] text-white'
                            : product.badgeType === 'limited'
                            ? 'bg-[#a23900] text-white'
                            : 'bg-secondary-container text-on-surface'
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => openProduct(product.id)}
                      className="font-title-md text-sm uppercase text-on-surface font-black truncate hover:text-primary transition-colors text-left cursor-pointer"
                    >
                      {product.name}
                    </button>
                    <div className="text-xs font-bold text-on-surface shrink-0">
                      ★ {product.rating}
                    </div>
                  </div>

                  <p className="font-body-md text-[11px] text-[#5c3f45] truncate mt-0.5">
                    {product.subtitle}
                  </p>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-title-md text-base text-[#b60055] font-black">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#906e75] line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    addToCart(product, undefined, undefined, 1, e.currentTarget);
                    triggerConfetti(30);
                  }}
                  className="add-btn mt-3 w-full py-2.5 rounded-xl bg-[#0f0d5a] text-white font-title-md text-xs uppercase border-2 border-[#0f0d5a] hover:bg-[#e4006c] shadow-[2px_2px_0_#0f0d5a] flex items-center justify-center gap-1.5 font-black cursor-pointer transition-all hover:scale-102"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <span className="material-symbols-outlined text-[16px] cart-icon-wiggle">add_shopping_cart</span>
                  <span>ADD TO CART</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT'S YOUR SOCKS MOOD? */}
      <section className="w-full bg-[#0A0A28] py-16 px-4 sm:px-8 lg:px-12 border-b-4 border-on-surface text-white" id="mood">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="font-display-hero text-3xl sm:text-4xl uppercase tracking-tight text-white font-black">
              WHAT'S YOUR <span className="text-[#fecf00]">SOCKS</span> MOOD?
            </h2>
            <p className="font-body-lg text-base text-[#d7d6ff] mt-1">
              Skip the categories. Shop the feeling.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setMoodFilter(mood.id)}
                className="text-left group h-40 rounded-2xl border-3 border-white p-4 flex flex-col justify-between brutal-mood-card cursor-pointer"
                style={{
                  backgroundColor: mood.colorBg,
                  boxShadow: `4px 4px 0px ${mood.shadowColor}`,
                }}
              >
                <span className="text-3xl mood-emoji">{mood.emoji}</span>
                <span
                  className="font-headline-md text-lg uppercase leading-tight font-black"
                  style={{ color: mood.textColor }}
                >
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LIFESTYLE BANNER & REVIEWS */}
      <section className="w-full bg-[#b60055] text-white py-16 px-4 sm:px-8 lg:px-12 border-b-4 border-on-surface">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h2 className="font-display-hero text-3xl sm:text-5xl lg:text-7xl uppercase text-white text-center leading-tight tracking-tight mb-8 font-black">
            YOUR FEET <br />
            HAVE ENTERED <br />
            <span className="text-[#ffe082] underline decoration-[#0A0A28] hover:rotate-1 inline-block transition-transform">
              THEIR FUN ERA.
            </span>
          </h2>

          {/* Auto Rickshaw Bandra Lifestyle Photography */}
          <div className="w-full max-w-4xl rounded-3xl overflow-hidden border-4 border-on-surface shadow-[8px_8px_0_#0f0d5a] bg-[#FFF7D6] mb-12 brutal-card-hover group">
            <img
              alt="Friends wearing bright funky socks sitting in the back of an auto rickshaw"
              className="w-full h-auto max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              src={LIFESTYLE_IMAGES.rickshawFunEra}
            />
          </div>

          {/* Testimonials */}
          <div className="w-full max-w-5xl">
            <h3 className="font-headline-lg text-2xl uppercase text-[#FFF7D6] mb-6 text-center font-black">
              People are obsessed.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-on-surface">
              <div className="bg-[#FFF7D6] p-5 rounded-3xl border-3 border-on-surface shadow-[5px_5px_0_#0f0d5a] flex flex-col justify-between brutal-card-hover">
                <p className="font-title-md text-sm sm:text-base italic mb-4 font-semibold text-on-surface">
                  “I bought these for myself and now everyone keeps asking where they're from.”
                </p>
                <div className="text-[#725c00] font-black tracking-widest text-sm">★★★★★</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border-3 border-on-surface shadow-[5px_5px_0_#0f0d5a] flex flex-col justify-between brutal-card-hover">
                <p className="font-title-md text-sm sm:text-base italic mb-4 font-semibold text-on-surface">
                  “Finally, socks with a personality. Fits great, hasn't shrunk after multiple washes!”
                </p>
                <div className="text-[#725c00] font-black tracking-widest text-sm">★★★★★</div>
              </div>

              <div className="bg-[#ffe082] p-5 rounded-3xl border-3 border-on-surface shadow-[5px_5px_0_#0f0d5a] flex flex-col justify-between brutal-card-hover">
                <p className="font-title-md text-sm sm:text-base italic mb-4 font-semibold text-on-surface">
                  “My feet have never received this much attention. Total conversation starter.”
                </p>
                <div className="text-[#725c00] font-black tracking-widest text-sm">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM TICKER RIBBON */}
      <MarqueeTicker variant="yellow" reverse={true} />
    </div>
  );
};
