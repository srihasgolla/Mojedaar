import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen, openProduct, addToCart } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filtered = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.moods.some((m) => m.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 bg-[#0A0A28]/70 backdrop-blur-sm z-[10000] flex items-start justify-center p-4 pt-20">
      <div className="bg-[#FFFDF5] border-4 border-on-surface rounded-3xl max-w-2xl w-full p-6 shadow-[8px_8px_0_#0f0d5a] flex flex-col gap-5 max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-on-surface pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔍</span>
            <h3 className="font-headline-lg text-xl uppercase font-black text-on-surface">
              Search Funky Socks
            </h3>
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            className="w-8 h-8 rounded-full border-2 border-on-surface bg-[#FFE043] flex items-center justify-center font-black hover:bg-[#D8005A] hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type chilli, zigzag, checkmate, matchbox, chai..."
            autoFocus
            className="w-full h-13 px-4 pl-11 rounded-2xl bg-white border-2 border-on-surface font-body-md text-base text-on-surface placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D8005A] shadow-[3px_3px_0_#0f0d5a]"
          />
          <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface text-xl">
            search
          </span>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1 flex flex-col gap-3 pr-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-on-surface-variant">
              <span className="text-4xl block mb-2">🧦</span>
              <p className="font-title-md uppercase font-bold text-on-surface">
                No matching socks found!
              </p>
              <p className="text-xs mt-1">Try searching "mirchi", "stripes", or "checkmate".</p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border-2 border-on-surface shadow-[3px_3px_0_#0f0d5a] hover:bg-[#FFF7D6] transition-colors"
              >
                <div
                  onClick={() => {
                    openProduct(product.id);
                    setSearchOpen(false);
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div
                    className="w-12 h-14 rounded-xl border-2 border-on-surface flex items-center justify-center p-1 shrink-0"
                    style={{ backgroundColor: product.bgColor }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div>
                    <h4 className="font-title-md text-sm font-black text-on-surface uppercase leading-tight hover:text-primary">
                      {product.name}
                    </h4>
                    <p className="text-xs text-on-surface-variant font-medium">
                      {product.subtitle} · ₹{product.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-headline-md text-sm font-black text-primary">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={(e) => {
                      addToCart(product, undefined, undefined, 1, e.currentTarget);
                    }}
                    className="fluid-btn px-3.5 py-1.5 rounded-xl bg-[#0f0d5a] text-white text-xs font-black uppercase hover:bg-[#e4006c] border-2 border-[#0f0d5a] shadow-[2px_2px_0_#0f0d5a] cursor-pointer shrink-0"
                  >
                    + ADD
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
