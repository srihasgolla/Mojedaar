import React from 'react';
import { useCart } from '../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toast, hideToast } = useCart();

  if (!toast) return null;

  const isDeleteToast =
    toast.icon === '🗑️' ||
    toast.icon === '🗑' ||
    toast.icon === '😢' ||
    toast.title.includes('😢') ||
    toast.title.toLowerCase().includes('remove') ||
    toast.title.toLowerCase().includes('clear') ||
    toast.description.includes('😢') ||
    toast.description.includes('🗑️') ||
    toast.description.includes('🗑') ||
    toast.description.toLowerCase().includes('trash');

  const mainIcon = isDeleteToast ? '🗑️' : (toast.icon || '🧦');

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-[9999] max-w-sm w-full animate-[toastSlideIn_0.35s_cubic-bezier(0.16,1,0.3,1)_both]">
      <div
        className={`${
          isDeleteToast ? 'bg-[#FFF0F3]' : 'bg-[#FFEAA0]'
        } border-3 border-on-surface rounded-2xl p-4 shadow-[6px_6px_0_#0f0d5a] flex items-center justify-between gap-3 transition-colors duration-200`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative shrink-0 flex items-center justify-center">
            <span
              className={`text-3xl select-none ${
                isDeleteToast ? 'animate-[gentleWiggle_1.2s_ease-in-out_infinite] scale-110 inline-block' : ''
              }`}
            >
              {mainIcon}
            </span>
            {isDeleteToast && (
              <span
                className="absolute -bottom-1 -right-1.5 text-xs bg-white border border-on-surface rounded-full w-5 h-5 flex items-center justify-center shadow-[1px_1px_0_#0f0d5a] select-none"
                title="Sad"
                aria-label="Sad"
              >
                😢
              </span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="font-headline-md text-sm font-black uppercase text-on-surface tracking-wide leading-tight truncate">
                {toast.title}
              </p>
            </div>
            <p className="font-body-md text-xs text-on-surface font-semibold mt-0.5 leading-tight line-clamp-2">
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
              className="bg-[#D8005A] text-white text-[11px] font-black uppercase px-2.5 py-1.5 rounded-lg border-2 border-on-surface shadow-[1.5px_1.5px_0_#0f0d5a] hover:bg-[#b60055] cursor-pointer active:translate-y-0.5"
            >
              {toast.actionText}
            </button>
          )}
          <button
            onClick={hideToast}
            className="w-6 h-6 rounded-full border border-on-surface bg-white/80 text-on-surface flex items-center justify-center text-xs font-black cursor-pointer hover:bg-white active:scale-95"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
