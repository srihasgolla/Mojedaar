import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ScreenType } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastData {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionText?: string;
  onAction?: () => void;
}

interface ParticleData {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  icon: string;
  text: string;
}

export interface CompletedOrder {
  orderId: string;
  customerName: string;
  phone: string;
  city: string;
  pincode: string;
  paymentMethod: string;
  itemsCount: number;
  grandTotal: number;
  items: CartItem[];
  placedAt: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  isFreeShipping: boolean;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  amountNeededForFreeShipping: number;
  promoCode: string;
  discountAmount: number;
  promoApplied: boolean;
  promoError: string | null;
  grandTotal: number;
  currentScreen: ScreenType;
  selectedProductId: string;
  selectedProduct: Product;
  wishlist: Set<string>;
  toast: ToastData | null;
  flyingParticles: ParticleData[];
  isQuickCartOpen: boolean;
  isSearchOpen: boolean;
  isCheckoutOpen: boolean;
  moodIndex: number;
  currentMoodEmoji: string;
  activeMoodFilter: string;
  lastOrder: CompletedOrder | null;
  setLastOrder: (order: CompletedOrder | null) => void;
  addToCart: (product: Product, style?: string, price?: number, qty?: number, triggerElem?: HTMLElement | null) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  toggleWishlist: (productId: string) => boolean;
  isWishlisted: (productId: string) => boolean;
  navigate: (screen: ScreenType, productId?: string) => void;
  openProduct: (productId: string) => void;
  showToast: (title: string, description: string, icon?: string, actionText?: string, onAction?: () => void) => void;
  hideToast: () => void;
  setQuickCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  nextMood: () => void;
  setMoodFilter: (mood: string) => void;
  triggerConfetti: (count?: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const MOOD_EMOJIS = ['😎', '🤪', '🤩', '🔥', '🧦', '🥳', '🌶️', '🚀'];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mojadaar_cart_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out legacy demo items if present so new/returning users get a clean 0-item cart as requested
          const realItems = parsed.filter((it: CartItem) => !it.id.startsWith('demo-'));
          return realItems;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('mirchi-masala');
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<ToastData | null>(null);
  const [flyingParticles, setFlyingParticles] = useState<ParticleData[]>([]);
  const [isQuickCartOpen, setQuickCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [moodIndex, setMoodIndex] = useState(0);
  const [activeMoodFilter, setActiveMoodFilter] = useState('all');
  const [promoCode, setPromoCode] = useState('SOCKSY10');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mojadaar_cart_items', JSON.stringify(items));
      const totalCount = items.reduce((sum, it) => sum + it.quantity, 0);
      localStorage.setItem('mojadaar_cart', totalCount.toString());
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const freeShippingThreshold = 999;
  const isFreeShipping = subtotal >= freeShippingThreshold || itemCount === 0;
  const shippingFee = itemCount > 0 && !isFreeShipping ? 99 : 0;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const showToast = (
    title: string,
    description: string,
    icon = '🧦',
    actionText?: string,
    onAction?: () => void
  ) => {
    const id = Date.now().toString();
    setToast({ id, title, description, icon, actionText, onAction });
  };

  const hideToast = () => setToast(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const triggerConfetti = (count = 60) => {
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#E4006C', '#FFE043', '#FF7F29', '#0f0d5a', '#00DF8F', '#FF3366', '#CB4900'];
    const particles = Array.from({ length: count }, () => ({
      x: window.innerWidth * (0.3 + Math.random() * 0.4),
      y: window.innerHeight * 0.4,
      size: Math.random() * 9 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 15 - 4,
      rot: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 14,
      alpha: 1,
    }));

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let isAlive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45;
        p.rot += p.vRot;
        p.alpha -= 0.013;

        if (p.alpha > 0) {
          isAlive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (isAlive) {
        animationId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animationId = requestAnimationFrame(render);
  };

  const addToCart = (
    product: Product,
    style = 'Crew · Free Size (UK 6-11)',
    price = product.price,
    qty = 1,
    triggerElem: HTMLElement | null = null
  ) => {
    // Flying particle effect
    if (triggerElem) {
      const rect = triggerElem.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top;
      const cartBtn = document.getElementById('header-cart-badge');
      const cartRect = cartBtn ? cartBtn.getBoundingClientRect() : { left: window.innerWidth - 60, top: 40 };

      const particleId = Date.now().toString() + Math.random();
      const newParticle: ParticleData = {
        id: particleId,
        x: startX,
        y: startY,
        targetX: cartRect.left - startX,
        targetY: cartRect.top - startY,
        icon: product.icon || '🧦',
        text: `+${qty} SOCK!`,
      };
      setFlyingParticles((prev) => [...prev, newParticle]);
      setTimeout(() => {
        setFlyingParticles((prev) => prev.filter((p) => p.id !== particleId));
      }, 800);
    }

    setItems((prev) => {
      const existing = prev.find((it) => it.productId === product.id && it.style === style);
      if (existing) {
        return prev.map((it) =>
          it.productId === product.id && it.style === style
            ? { ...it, quantity: it.quantity + qty }
            : it
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          name: product.name.toUpperCase(),
          style,
          price,
          quantity: qty,
          image: product.image,
          icon: product.icon,
          bgColor: product.bgColor,
        },
      ];
    });

    // Trigger cart celebration bounce
    const badge = document.getElementById('header-cart-badge');
    if (badge) {
      badge.classList.remove('cart-bounce-anim');
      void badge.offsetWidth;
      badge.classList.add('cart-bounce-anim');
    }

    showToast(
      `+${qty} ${product.name} Copped!`,
      `Total in bag: ₹${subtotal + price * qty} (${itemCount + qty} pairs)`,
      product.icon,
      'VIEW BAG',
      () => setCurrentScreen('cart')
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    const targetItem = items.find((i) => i.id === id);
    if (targetItem && targetItem.quantity + delta <= 0) {
      removeFromCart(id);
      return;
    }

    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast(
        'Socks Removed',
        `${item.name} moved to trash`,
        '🗑️',
        'UNDO',
        () => {
          setItems((prev) => [...prev, item]);
          showToast('Restored! 🎉', `${item.name} added back to bag!`, item.icon || '🧦');
        }
      );
    }
  };

  const clearCart = () => {
    if (items.length === 0) return;
    const previousItems = [...items];
    setItems([]);
    showToast(
      'Bag Cleared',
      'All funky socks moved to trash',
      '🗑️',
      'UNDO',
      () => {
        setItems(previousItems);
        showToast('Restored! 🎉', 'All socks added back to bag!', '🧦');
      }
    );
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SOCKSY10') {
      setPromoCode('SOCKSY10');
      setPromoApplied(true);
      setPromoError(null);
      triggerConfetti(45);
      showToast('🎉 Promo Code Applied!', "10% discount subtracted from your total!", '✨');
      return true;
    } else {
      setPromoApplied(false);
      setPromoError("Invalid code. Try 'SOCKSY10' for 10% off!");
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoApplied(false);
    setPromoCode('');
    setPromoError(null);
  };

  const toggleWishlist = (productId: string) => {
    let nowWishlisted = false;
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
        nowWishlisted = true;
      }
      return next;
    });

    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      if (nowWishlisted) {
        showToast('Saved to Wishlist ❤️', `${prod.name} added to favorites`, '❤️');
      } else {
        showToast('Removed from Wishlist', `${prod.name} removed from favorites`, '🤍');
      }
    }
    return nowWishlisted;
  };

  const isWishlisted = (productId: string) => wishlist.has(productId);

  const navigate = (screen: ScreenType, productId?: string) => {
    setCurrentScreen(screen);
    if (productId) {
      setSelectedProductId(productId);
    }
    // Instant scroll to top ensures mobile users immediately see top content (especially cart items)
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentScreen('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextMood = () => {
    const nextIdx = (moodIndex + 1) % MOOD_EMOJIS.length;
    setMoodIndex(nextIdx);
    showToast('Vibe Switched!', `Current Sock Mood: Level ${nextIdx + 1}`, MOOD_EMOJIS[nextIdx]);
  };

  const setMoodFilter = (mood: string) => {
    setActiveMoodFilter(mood);
    setCurrentScreen('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shippingFee,
        isFreeShipping,
        freeShippingThreshold,
        freeShippingProgress,
        amountNeededForFreeShipping,
        promoCode,
        discountAmount,
        promoApplied,
        promoError,
        grandTotal,
        currentScreen,
        selectedProductId,
        selectedProduct,
        wishlist,
        toast,
        flyingParticles,
        isQuickCartOpen,
        isSearchOpen,
        isCheckoutOpen,
        moodIndex,
        currentMoodEmoji: MOOD_EMOJIS[moodIndex],
        activeMoodFilter,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyPromoCode,
        removePromoCode,
        toggleWishlist,
        isWishlisted,
        navigate,
        openProduct,
        showToast,
        hideToast,
        setQuickCartOpen,
        setSearchOpen,
        setCheckoutOpen,
        nextMood,
        setMoodFilter,
        triggerConfetti,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
