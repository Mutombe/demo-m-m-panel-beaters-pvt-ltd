import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

function HeroCinematic() {
  const { business, hero } = siteData;

  // Build image list for carousel
  const images = hero.backgroundImages?.length
    ? hero.backgroundImages
    : hero.backgroundImage
      ? [{ url: hero.backgroundImage, alt: hero.backgroundAlt || '' }]
      : [];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-cycle background images
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Split title into words for skew reveal
  const titleWords = hero.titleParts.flatMap((part) => {
    const words = part.text.split(/(\s+)/);
    return words
      .filter((w) => w.trim().length > 0)
      .map((word) => ({
        text: word + ' ',
        highlight: part.highlight || false,
      }));
  });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background carousel with Ken Burns */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={`cinematic-bg-${currentSlide}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          >
            <img
              src={images[currentSlide]?.url || ''}
              alt={images[currentSlide]?.alt || ''}
              className="w-full h-full object-cover"
              style={{
                animation: 'kenburns 20s ease-in-out infinite alternate',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* 8-stop smoky gradient — left side solid, fading to transparent on right */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(to right,
              rgba(15,29,48,0.98) 0%,
              rgba(15,29,48,0.95) 15%,
              rgba(15,29,48,0.85) 30%,
              rgba(15,29,48,0.7) 45%,
              rgba(15,29,48,0.5) 55%,
              rgba(15,29,48,0.3) 65%,
              rgba(15,29,48,0.1) 80%,
              transparent 100%
            )`,
          }}
        />
        {/* Bottom fade for page transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent z-[1]" />
      </div>

      {/* Content — aligned left on the solid gradient side */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 lg:pt-0">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-medium">{hero.badge}</span>
          </motion.div>

          {/* Heading with skewY word reveal */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] mb-7">
            <span className="inline-flex flex-wrap">
              {titleWords.map((word, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <motion.span
                    className={`inline-block ${
                      word.highlight
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600'
                        : ''
                    }`}
                    initial={{ opacity: 0, y: 30, skewY: 4 }}
                    animate={{ opacity: 1, y: 0, skewY: 0 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.5 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 + titleWords.length * 0.08 + 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/65 leading-relaxed mb-10 max-w-xl"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 + titleWords.length * 0.08 + 0.4 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Link to="/contact" className="btn-primary">
              {hero.ctaPrimary}
              <ArrowRight size={18} />
            </Link>
            <Link to="/projects" className="btn-secondary">
              {hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 + titleWords.length * 0.08 + 0.6 }}
            className="flex items-center gap-6 flex-wrap"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  weight="fill"
                  className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'}
                />
              ))}
              <span className="text-white/70 text-sm ml-2">
                {business.rating}/5 ({business.reviewCount} reviews)
              </span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <CheckCircle size={16} weight="fill" className="text-emerald-400" />
              <span className="text-white/70 text-sm">{hero.trustBadge}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators — bottom right */}
      {images.length > 1 && (
        <div className="absolute bottom-8 right-8 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === currentSlide
                  ? 'bg-gold-400 scale-125'
                  : 'bg-white/25 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HeroCinematic;
