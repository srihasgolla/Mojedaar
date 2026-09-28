import React from 'react';
import { useCart } from '../context/CartContext';

export const FlyingParticleLayer: React.FC = () => {
  const { flyingParticles } = useCart();

  if (flyingParticles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {flyingParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute font-headline-md text-xs font-black px-2.5 py-1 rounded-full bg-[#FFE043] text-on-surface border-2 border-on-surface shadow-[3px_3px_0_#0f0d5a] flex items-center gap-1"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animation: 'flyToCart 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            transformOrigin: 'center center',
            ['--target-x' as string]: `${particle.targetX}px`,
            ['--target-y' as string]: `${particle.targetY}px`,
          }}
        >
          <span>{particle.icon}</span>
          <span>{particle.text}</span>
        </div>
      ))}
      <style>{`
        @keyframes flyToCart {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.9;
            transform: translate(calc(var(--target-x) * 0.4), calc(var(--target-y) * 0.6 - 40px)) scale(1.3) rotate(-15deg);
          }
          100% {
            opacity: 0;
            transform: translate(var(--target-x), var(--target-y)) scale(0.3) rotate(30deg);
          }
        }
      `}</style>
    </div>
  );
};
