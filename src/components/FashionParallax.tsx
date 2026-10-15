import React, { useEffect, useRef } from 'react';

interface FashionObjectConfig {
  id: string;
  src: string;
  alt: string;
  className: string;
  depthX: number; // Max horizontal travel in px
  depthY: number; // Max vertical travel in px
  rotateDeg: number; // Max rotational tilt
}

const FASHION_OBJECTS: FashionObjectConfig[] = [
  {
    id: 'handbag-caramel',
    src: '/assets/fashion/handbag-caramel.webp',
    alt: 'Luxury Caramel Tan Leather Handbag',
    className: 'item-handbag-caramel',
    depthX: 30,
    depthY: 26,
    rotateDeg: 2.2,
  },
  {
    id: 'handbag-dark',
    src: '/assets/fashion/handbag-dark.webp',
    alt: 'Luxury Espresso Quilted Leather Handbag with Gold Chain',
    className: 'item-handbag-dark',
    depthX: -24,
    depthY: -20,
    rotateDeg: -1.8,
  },
  {
    id: 'dress-elegant',
    src: '/assets/fashion/dress-elegant.webp',
    alt: 'Silk Satin Evening Gown Dress in Champagne & Caramel',
    className: 'item-dress-elegant',
    depthX: 18,
    depthY: -22,
    rotateDeg: 1.4,
  },
  {
    id: 'jacket-boucle',
    src: '/assets/fashion/jacket-boucle.webp',
    alt: 'Parisian Tailored Boucle Tweed Jacket with Pearl Buttons',
    className: 'item-jacket-boucle',
    depthX: -26,
    depthY: 22,
    rotateDeg: -2.0,
  },
  {
    id: 'accessory-sunglasses',
    src: '/assets/fashion/accessory-sunglasses.webp',
    alt: 'Designer Amber Tortoiseshell Cat-Eye Sunglasses',
    className: 'item-sunglasses',
    depthX: 36,
    depthY: 30,
    rotateDeg: 3.0,
  },
];

interface FashionParallaxProps {
  children?: React.ReactNode;
}

export const FashionParallax: React.FC<FashionParallaxProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Pointer position tracking via refs (no React state re-renders for smooth 120fps)
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const isAnimating = { current: false };
    let cachedRect: DOMRect | null = null;

    const updateRect = () => {
      if (container) {
        cachedRect = container.getBoundingClientRect();
      }
    };
    updateRect();

    const applyTransforms = (x: number, y: number) => {
      // Update ambient studio spotlight variables on the hero container
      const spotX = ((x + 1) / 2) * 100;
      const spotY = ((y + 1) / 2) * 100;
      container.style.setProperty('--pointer-x', `${spotX.toFixed(1)}%`);
      container.style.setProperty('--pointer-y', `${spotY.toFixed(1)}%`);

      // Apply transform to each individual fashion layer
      itemsRef.current.forEach((el, index) => {
        if (!el) return;
        const config = FASHION_OBJECTS[index];
        if (!config) return;

        const w = window.innerWidth;
        const motionFactor = w < 768 ? 0.35 : w < 1024 ? 0.65 : 1.0;
        const moveX = x * config.depthX * motionFactor;
        const moveY = y * config.depthY * motionFactor;
        const rot = x * config.rotateDeg * motionFactor;

        el.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      });
    };

    // Smooth Lerp animation loop with automatic sleep when stationary
    const animate = () => {
      const ease = 0.08;
      const dx = targetX.current - currentX.current;
      const dy = targetY.current - currentY.current;

      // When difference is negligible, snap to resting target and sleep RAF (0% CPU)
      if (Math.abs(dx) < 0.0005 && Math.abs(dy) < 0.0005) {
        currentX.current = targetX.current;
        currentY.current = targetY.current;
        applyTransforms(currentX.current, currentY.current);
        isAnimating.current = false;
        animFrameId.current = null;
        return;
      }

      currentX.current += dx * ease;
      currentY.current += dy * ease;
      applyTransforms(currentX.current, currentY.current);

      animFrameId.current = requestAnimationFrame(animate);
    };

    const wakeAnimation = () => {
      if (!isAnimating.current && !document.hidden) {
        isAnimating.current = true;
        animFrameId.current = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Ignore touch devices to preserve mobile performance
      if (e.pointerType === 'touch') return;

      if (!cachedRect) updateRect();
      if (!cachedRect) return;

      const centerX = cachedRect.left + cachedRect.width / 2;
      const centerY = cachedRect.top + cachedRect.height / 2;

      // Normalized coordinates from -1.0 to +1.0
      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (cachedRect.width / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (cachedRect.height / 2)));

      targetX.current = normX;
      targetY.current = normY;
      wakeAnimation();
    };

    const handlePointerLeave = () => {
      // Smooth return to rest position when pointer exits viewport
      targetX.current = 0;
      targetY.current = 0;
      wakeAnimation();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameId.current) {
          cancelAnimationFrame(animFrameId.current);
          animFrameId.current = null;
          isAnimating.current = false;
        }
      } else {
        wakeAnimation();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="caramel-hero-stage"
      id="hero-parallax-stage"
      aria-label="Caramel Fashion Editorial Stage"
    >
      {/* Layered Photorealistic Fashion Cutouts */}
      <div className="fashion-parallax-viewport" aria-hidden="true">
        {FASHION_OBJECTS.map((obj, i) => (
          <div
            key={obj.id}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className={`fashion-item-anchor ${obj.className}`}
          >
            {/* Nested idle wrapper so keyframe idle animation never overwrites pointer transforms */}
            <div className="fashion-item-idle">
              <picture>
                <source srcSet={obj.src.replace('.webp', '.avif')} type="image/avif" />
                <source srcSet={obj.src} type="image/webp" />
                <img
                  src={obj.src}
                  alt={obj.alt}
                  className="fashion-item-img"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Graceful fallback slot in case image asset is missing
                    console.warn(`Asset failed to load: ${obj.src}`);
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </picture>
            </div>
          </div>
        ))}
      </div>

      {/* Central Brand Identity and Social Nav */}
      {children}
    </div>
  );
};
