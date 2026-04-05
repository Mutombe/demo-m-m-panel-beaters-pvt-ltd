import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HeroCarousel — cycles through background images with crossfade.
 * Uses progress bar indicators instead of dot indicators.
 *
 * Props:
 *   images: [{ url, alt }]       — array of 2-3 hero images
 *   backgroundImage: string      — legacy single image fallback
 *   backgroundAlt: string        — legacy single alt fallback
 *   interval: number             — ms between transitions (default 6000)
 *   overlay: string              — gradient overlay style: "left", "center", "full", "split", "subtle"
 *   children: React.ReactNode    — hero content rendered on top
 *   className: string            — additional classes for the section
 */
function HeroCarousel({
  images,
  backgroundImage,
  backgroundAlt,
  interval = 6000,
  overlay = 'left',
  children,
  className = '',
}) {
  // Build the image list — support both new array and legacy single image
  const imageList = React.useMemo(() => {
    if (images && images.length > 0) {
      return images.map((img) =>
        typeof img === 'string' ? { url: img, alt: '' } : img
      );
    }
    if (backgroundImage) {
      return [{ url: backgroundImage, alt: backgroundAlt || '' }];
    }
    return [];
  }, [images, backgroundImage, backgroundAlt]);

  const [current, setCurrent] = useState(0);
  const count = imageList.length;

  // Auto-advance
  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  // Overlay gradient based on style
  const overlayGradient = {
    left: (
      <>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/20" />
      </>
    ),
    center: (
      <>
        <div className="absolute inset-0 bg-navy-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30" />
      </>
    ),
    full: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/70 to-navy-950" />
      </>
    ),
    split: (
      <>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent" />
      </>
    ),
    subtle: (
      <>
        <div className="absolute inset-0 bg-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent" />
      </>
    ),
  };

  if (imageList.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Background images with crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={`hero-img-${current}`}
            src={imageList[current].url}
            alt={imageList[current].alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: 8, ease: 'easeOut' },
            }}
          />
        </AnimatePresence>

        {/* Blend overlay */}
        {overlayGradient[overlay] || overlayGradient.left}
      </div>

      {/* Progress bar indicators */}
      {count > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 w-48 sm:w-64">
          {imageList.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-[3px] flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === current && (
                <motion.div
                  className="h-full bg-gold-400 rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: interval / 1000, ease: 'linear' }}
                  key={`progress-${current}-${i}`}
                />
              )}
              {i < current && (
                <div className="h-full bg-gold-400 rounded-full w-full" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default HeroCarousel;
