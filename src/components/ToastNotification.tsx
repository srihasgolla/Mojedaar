import React from 'react';
import { useCart } from '../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toast, hideToast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-[9999] max-w-sm w-full animate-bounce">
      <div className="bg-[#FFEAA0] border-3 border-on-surface rounded-2xl p-4 shadow-[6px_6px_0_#0f0d5a] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-3xl shrink-0">{toast.icon || '🧦'}</span>
          <div className="flex flex-col">
            <p className="font-headline-md text-sm font-black uppercase text-on-surface tracking-wide leading-tight">
              {toast.title}
            </p>
            <p className="font-body-md text-xs text-on-surface font-semibold mt-0.5 leading-tight">
              {toast.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {toast.actionText && toast.onAction && (
            <button
              onClick={() => {
                toast.onAction?.();
                hideToast();
              }}
              className="bg-[#D8005A] text-white text-[11px] font-black uppercase px-2.5 py-1.5 rounded-lg border-2 border-on-surface shadow-[1.5px_1.5px_0_#0f0d5a] hover:bg-[#b60055] cursor-pointer"
            >
              {toast.actionText}
            </button>
          )}
          <button
            onClick={hideToast}
            className="w-6 h-6 rounded-full border border-on-surface bg-white/80 text-on-surface flex items-center justify-center text-xs font-black cursor-pointer hover:bg-white"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
