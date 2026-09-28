import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_LOGOS } from '../data/products';

export const Footer: React.FC = () => {
  const { navigate, setMoodFilter, showToast, triggerConfetti } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Oops!', 'Please enter a valid email address.', '✉️');
      return;
    }
    setSubscribed(true);
    triggerConfetti(35);
    showToast('🎉 You Are In!', '10% discount coupon sent to your inbox: SOCKSY10', '💌');
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#0A0A28] text-white border-t-4 border-on-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        {/* Top Guarantee & Newsletter Grid */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-10 border-b-2 border-white/20 gap-8">
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="inline-block -rotate-1 self-start bg-secondary-container text-on-surface border-2 border-white px-3.5 py-1 rounded-md font-label-badge text-xs uppercase font-black shadow-[2px_2px_0_#ffffff]">
              100% Anti-Boring Guarantee
            </div>
            <h2 className="font-display-hero text-3xl sm:text-4xl uppercase tracking-tight text-[#FFF7D6]">
              KEEP YOUR SOCKS FUN.
            </h2>
            <p className="font-body-md text-white/80 text-sm sm:text-base">
              Born to rescue ankles everywhere from boring grey fabrics. Premium combed cotton, street
              pop graphics, crafted with love in India.
            </p>
          </div>

          {/* Newsletter Input Box */}
          <div className="w-full lg:w-auto">
            <p className="font-title-md text-xs font-black uppercase text-[#FFD9E0] mb-2">
              Get socks in your inbox (10% off first order)
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your funky email..."
                  required
                  className="w-full h-12 px-4 rounded-full bg-white text-[#0A0A28] border-2 border-[#0A0A28] placeholder:text-gray-500 font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0055] shadow-[3px_3px_0_#FF0055]"
                />
              </div>
              <button
                type="submit"
                className="fluid-btn h-12 px-6 rounded-full bg-[#E4006C] text-white font-title-md text-sm uppercase font-black border-2 border-white shadow-[2px_2px_0_#0A0A28] hover:bg-[#b60055] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>JOIN CREW</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
            {subscribed && (
              <p className="text-[#FFE082] text-xs font-bold mt-2 animate-bounce">
                🎉 Welcome to the crew! Use coupon code <span className="underline">SOCKSY10</span> at checkout!
              </p>
            )}
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b-2 border-white/20">
          {/* Col 1 */}
          <div className="flex flex-col gap-3">
            <span className="font-headline-md text-sm text-secondary-container uppercase tracking-wider font-black">
              Socks Collection
            </span>
            <button
              onClick={() => navigate('shop')}
              className="text-left text-sm text-white/80 hover:text-secondary-container transition-colors cursor-pointer"
            >
              All Socks (8)
            </button>
            <button
              onClick={() => navigate('shop')}
              className="text-left text-sm text-white/80 hover:text-secondary-container transition-colors cursor-pointer"
            >
              New Drops 🔥
            </button>
            <button
              onClick={() => navigate('shop')}
              className="text-left text-sm text-white/80 hover:text-secondary-container transition-colors cursor-pointer"
            >
              Ankle Length Socks
            </button>
            <button
              onClick={() => navigate('shop')}
              className="text-left text-sm text-white/80 hover:text-secondary-container transition-colors cursor-pointer"
            >
              Crew & Ribbed Socks
            </button>
            <button
              onClick={() => navigate('shop')}
              className="text-left text-sm text-white/80 hover:text-secondary-container transition-colors cursor-pointer"
            >
              No-show Loafers
            </button>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-3">
            <span className="font-headline-md text-sm text-secondary-container uppercase tracking-wider font-black">
              The Universe
            </span>
            <button
              onClick={() => {
                navigate('home');
                setTimeout(() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left text-sm text-white/80 hover:text-secondary-container transition-colors cursor-pointer"
            >
              About Mojadaar
            </button>
            <button
              onClick={() => {
                navigate('home');
                setTimeout(() => {
                  const el = document.getElementById('mood');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left text-sm text-white/80 hover:text-secondary-container transition-colors cursor-pointer"
            >
              Socks Mood Engine
            </button>
            <button
              onClick={() =>
                showToast('HQ Calling 📞', 'Drop us a line at yo@mojadaar.in or WhatsApp +91 98200 98200', '📞')
              }
              className="text-left text-sm text-white/80 hover:text-secondary-container transition-colors cursor-pointer"
            >
              Contact HQ
            </button>
            <button
              onClick={() =>
                showToast('Shipping Info ⚡', 'All orders dispatched within 24h from Mumbai & Delhi hubs.', '🚚')
              }
              className="text-left text-sm text-white/80 hover:text-secondary-container transition-colors cursor-pointer"
            >
              Shipping Info
            </button>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-3">
            <span className="font-headline-md text-sm text-secondary-container uppercase tracking-wider font-black">
              Peace of Mind
            </span>
            <button
              onClick={() =>
                showToast('7-Day Free Swap', 'No questions asked doorstep replacement guarantee!', '🔄')
              }
              className="text-left text-sm text-white/80 hover:text-secondary-container transition-colors cursor-pointer"
            >
              Easy Returns & Swaps
            </button>
            <button
              onClick={() =>
                showToast('Track Order', 'Enter your order ID from SMS/WhatsApp on our courier portal.', '📍')
              }
              className="text-left text-sm text-white/80 hover:text-secondary-container transition-colors cursor-pointer"
            >
              Track Your Order
            </button>
            <span className="text-sm text-white/60">Privacy Policy</span>
            <span className="text-sm text-white/60">Terms of Service</span>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-4">
            <span className="font-headline-md text-sm text-secondary-container uppercase tracking-wider font-black">
              Social Feet
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => showToast('Share the Moj!', 'mojadaar.in copied to clipboard!', '🔗')}
                className="w-10 h-10 rounded-xl bg-[#FFF7D6] text-[#0A0A28] border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#fecf00] hover:-translate-y-1 hover:rotate-6 transition-all cursor-pointer"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <button
                onClick={() => showToast('Community Chat', 'Join 24,000+ sneakerheads on Discord & Insta!', '💬')}
                className="w-10 h-10 rounded-xl bg-[#FFF7D6] text-[#0A0A28] border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#fecf00] hover:-translate-y-1 hover:-rotate-6 transition-all cursor-pointer"
                aria-label="Community"
              >
                <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
              </button>
              <button
                onClick={() => showToast('Instagram @mojadaar', 'Tag #LookingTooSocksy for weekly sock drops!', '📸')}
                className="w-10 h-10 rounded-xl bg-[#FFF7D6] text-[#0A0A28] border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#fecf00] hover:-translate-y-1 hover:rotate-6 transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </button>
            </div>
            <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex items-center gap-2 text-xs">
              <span className="material-symbols-outlined text-secondary-container text-lg">local_shipping</span>
              <span className="font-bold text-white">Express Delivery Across 24,000+ Pincodes</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-label-ticker text-xs text-white/70 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
            <span>© 2026 MOJADAAR · LOOKING TOO SOCKSY · MADE IN INDIA</span>
          </div>
          <div className="flex items-center gap-4">
            <span>DELHI / MUMBAI / BENGALURU</span>
            <span>✦</span>
            <span>100% COMBED COTTON</span>
            <span>✦</span>
            <span>DELIVERING WORLDWIDE FUN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
