/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './views/HomeScreen';
import { ShopScreen } from './views/ShopScreen';
import { ProductDetailScreen } from './views/ProductDetailScreen';
import { CartScreen } from './views/CartScreen';
import { ToastNotification } from './components/ToastNotification';
import { FlyingParticleLayer } from './components/FlyingParticleLayer';
import { SearchModal } from './components/SearchModal';
import { QuickCartDrawer } from './components/QuickCartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CrazyMascotCompanion } from './components/CrazyMascotCompanion';
import { MobileBottomNav } from './components/MobileBottomNav';

const AppContent: React.FC = () => {
  const { currentScreen } = useCart();

  return (
    <div className="min-h-screen w-full overflow-x-clip flex flex-col bg-[#FFFDF5] text-on-surface antialiased relative selection:bg-secondary-container selection:text-on-surface pb-16 md:pb-0">
      {/* Dynamic Confetti Canvas */}
      <canvas id="confetti-canvas" className="fixed inset-0 pointer-events-none z-[99999]" />

      {/* Global Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'shop' && <ShopScreen />}
        {currentScreen === 'product' && <ProductDetailScreen />}
        {currentScreen === 'cart' && <CartScreen />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Interactive Overlays */}
      <ToastNotification />
      <FlyingParticleLayer />
      <SearchModal />
      <QuickCartDrawer />
      <CheckoutModal />
      <CrazyMascotCompanion />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
