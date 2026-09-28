import React from 'react';
import { useCart } from '../context/CartContext';

export const QuickCartDrawer: React.FC = () => {
  const {
    isQuickCartOpen,
    setQuickCartOpen,
    items,
    subtotal,
    removeFromCart,
    clearCart,
    navigate,
    setCheckoutOpen,
  } = useCart();

  if (!isQuickCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0A0A28]/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
      <div className="bg-[#FFFDF5] border-4 border-on-surface rounded-3xl max-w-lg w-full p-6 shadow-[8px_8px_0_#0f0d5a] relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-on-surface pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧦</span>
            <h3 className="font-headline-lg text-2xl uppercase font-black text-on-surface">
              Your Funky Cart
            </h3>
          </div>
          <button
            onClick={() => setQuickCartOpen(false)}
            className="w-8 h-8 rounded-full border-2 border-on-surface bg-[#FFE043] flex items-center justify-center font-black hover:bg-[#D8005A] hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Item List */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-1 py-1">
          {items.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant">
              <span className="text-4xl block mb-2">🧺</span>
              <p className="font-title-md uppercase font-bold text-on-surface">
                Your cart is feeling lonely!
              </p>
              <p className="text-xs mt-1">Scroll up and grab some loud socks.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF7D6] border-2 border-on-surface shadow-[2px_2px_0_#0f0d5a]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-14 rounded-xl border border-on-surface flex items-center justify-center p-1 shrink-0"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    ) : (
                      <span className="text-xl">{item.icon}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-title-md text-sm font-black text-on-surface leading-tight uppercase">
                      {item.name}
                    </h4>
                    <span className="text-xs text-on-surface-variant font-bold">
                      Qty: {item.quantity} × ₹{item.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-title-md text-sm font-black text-primary">
                    ₹{item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-on-surface/60 hover:text-red-600 font-black px-1.5 py-0.5 rounded border border-on-surface/20 bg-white text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t-2 border-on-surface pt-4 mt-4 space-y-3">
          <div className="flex justify-between items-center font-title-md text-lg font-black text-on-surface">
            <span>TOTAL:</span>
            <span className="text-[#D8005A] text-xl">₹{subtotal}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearCart}
              disabled={items.length === 0}
              className="fluid-btn px-4 py-2.5 rounded-xl border-2 border-on-surface bg-gray-100 text-on-surface font-title-md uppercase text-xs disabled:opacity-50"
            >
              Clear
            </button>
            <button
              onClick={() => {
                setQuickCartOpen(false);
                navigate('cart');
              }}
              className="fluid-btn px-4 py-2.5 rounded-xl border-2 border-on-surface bg-secondary-container text-on-surface font-title-md uppercase text-xs font-black shadow-[2px_2px_0_#0f0d5a]"
            >
              Full Bag View
            </button>
            <button
              onClick={() => {
                setQuickCartOpen(false);
                setCheckoutOpen(true);
              }}
              disabled={items.length === 0}
              className="fluid-btn flex-1 py-2.5 rounded-xl border-2 border-on-surface bg-[#D8005A] text-white font-title-md uppercase text-center font-black shadow-[3px_3px_0_#0f0d5a] disabled:opacity-50"
            >
              Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
