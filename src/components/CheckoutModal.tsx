import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setCheckoutOpen,
    items,
    grandTotal,
    subtotal,
    shippingFee,
    discountAmount,
    promoApplied,
    promoCode,
    clearCart,
    triggerConfetti,
    showToast,
  } = useCart();

  const [name, setName] = useState('Srihas Golla');
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('Flat 402, Pali Hill, Bandra West');
  const [city, setCity] = useState('Mumbai');
  const [pincode, setPincode] = useState('400050');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [upiId, setUpiId] = useState('srihas@okaxis');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !pincode) {
      showToast('Missing details', 'Please complete your shipping address.', '⚠️');
      return;
    }

    const newOrderId = 'MOJ-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setOrderConfirmed(true);
    triggerConfetti(90);
    showToast('🚀 Order Placed!', `Order #${newOrderId} confirmed! Packing your funky socks!`, '🎉');
  };

  const handleFinish = () => {
    clearCart();
    setOrderConfirmed(false);
    setCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A28]/70 backdrop-blur-md z-[10000] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFFDF5] border-4 border-on-surface rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-[8px_8px_0_#0f0d5a] my-8 relative">
        {orderConfirmed ? (
          <div className="text-center py-6 flex flex-col items-center gap-4 animate-pop-in">
            <div className="w-20 h-20 rounded-full bg-secondary-container border-3 border-on-surface flex items-center justify-center text-4xl shadow-[4px_4px_0_#0f0d5a] animate-bounce">
              🎉
            </div>
            <h2 className="font-display-hero text-3xl uppercase tracking-tight text-on-surface">
              YOUR SOCKS ARE ON THE WAY!
            </h2>
            <div className="bg-[#FFEAA0] p-4 rounded-2xl border-2 border-on-surface shadow-[3px_3px_0_#0f0d5a] max-w-sm w-full text-left font-body-md text-sm">
              <div className="flex justify-between font-black border-b border-on-surface/20 pb-2 mb-2">
                <span>ORDER ID:</span>
                <span className="text-primary">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Paid via:</span>
                <span className="font-bold uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold">₹{grandTotal}</span>
              </div>
              <div className="flex justify-between text-xs text-on-surface/70 mt-1">
                <span>Dispatching to:</span>
                <span className="font-bold truncate max-w-[180px]">{city} - {pincode}</span>
              </div>
            </div>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-md">
              Order confirmation SMS and tracking link sent to <strong>+91 {phone}</strong>. Expected delivery in 48 hours!
            </p>
            <button
              onClick={handleFinish}
              className="fluid-btn px-8 py-3.5 rounded-full bg-[#D8005A] text-white font-title-md text-base uppercase font-black border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] mt-2"
            >
              Back to Sock Universe 🧦
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-on-surface pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <h3 className="font-headline-lg text-2xl uppercase font-black text-on-surface">
                    Express Checkout
                  </h3>
                  <p className="text-xs text-on-surface-variant font-bold">
                    Fast, secure, 100% Cotton Mojadaar Guarantee
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="w-8 h-8 rounded-full border-2 border-on-surface bg-[#FFE043] flex items-center justify-center font-black hover:bg-[#D8005A] hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-5">
              {/* Order Summary Snapshot */}
              <div className="p-3.5 rounded-2xl bg-canvas-cream border-2 border-on-surface flex items-center justify-between text-xs font-bold">
                <div>
                  <span className="font-black text-sm uppercase text-on-surface block">
                    {items.length} Unique Styles ({items.reduce((s, i) => s + i.quantity, 0)} Pairs)
                  </span>
                  <span className="text-primary font-black">
                    {shippingFee === 0 ? 'FREE EXPRESS SHIPPING' : 'STANDARD SHIPPING'}
                    {promoApplied && ` · 10% OFF (${promoCode})`}
                  </span>
                </div>
                <span className="font-headline-md text-xl font-black text-on-surface">
                  ₹{grandTotal}
                </span>
              </div>

              {/* Shipping Details */}
              <div className="flex flex-col gap-3">
                <span className="font-headline-md text-xs uppercase font-black text-on-surface tracking-wider">
                  1. Shipping Address
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-white border-2 border-on-surface text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#D8005A]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-white border-2 border-on-surface text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#D8005A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
                    Street Address & Landmark
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white border-2 border-on-surface text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#D8005A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-white border-2 border-on-surface text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#D8005A]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-white border-2 border-on-surface text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#D8005A]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex flex-col gap-2.5">
                <span className="font-headline-md text-xs uppercase font-black text-on-surface tracking-wider">
                  2. Select Payment Method
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border-2 border-on-surface text-center flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-secondary-container shadow-[2px_2px_0_#0f0d5a] ring-2 ring-[#D8005A]'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">⚡</span>
                    <span className="text-xs font-black uppercase">Instant UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border-2 border-on-surface text-center flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-secondary-container shadow-[2px_2px_0_#0f0d5a] ring-2 ring-[#D8005A]'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">💵</span>
                    <span className="text-xs font-black uppercase">Cash on Del.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border-2 border-on-surface text-center flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-secondary-container shadow-[2px_2px_0_#0f0d5a] ring-2 ring-[#D8005A]'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">💳</span>
                    <span className="text-xs font-black uppercase">Cards / Net</span>
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="p-3 bg-[#FFF7D6] rounded-xl border border-on-surface flex flex-col gap-1.5 mt-1">
                    <label className="text-[11px] font-bold text-on-surface">Enter UPI ID / VPA</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi or username@okaxis"
                      className="h-9 px-3 rounded-lg bg-white border border-on-surface text-xs font-mono font-bold"
                    />
                    <span className="text-[10px] text-on-surface-variant font-medium">
                      Supports Google Pay, PhonePe, Paytm, CRED & BHIM.
                    </span>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="checkout-btn-physics btn-glow-pulse w-full h-14 rounded-full bg-[#D8005A] text-white font-title-md text-base uppercase font-black border-3 border-on-surface shadow-[4px_4px_0_#0f0d5a] hover:bg-[#b60055] flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span>CONFIRM ORDER (₹{grandTotal})</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
