import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

function HeroParallax() {
  const { business, hero } = siteData;

  // Build image pool from backgroundImages, fallback to single image
  const imagePool = useMemo(() => {
    const imgs = hero.backgroundImages?.length
      ? hero.backgroundImages.slice(0, 3)
      : hero.backgroundImage
        ? [{ url: hero.backgroundImage, alt: hero.backgroundAlt || '' }]
        : [];
    return imgs;
  }, [hero.backgroundImages, hero.backgroundImage, hero.backgroundAlt]);

  // Create columns — 4 columns, each with 5 images distributed from the pool
  const columns = useMemo(() => {
    if (imagePool.length === 0) return [];
    const cols = [];
    for (let c = 0; c < 4; c++) {
      const colImages = [];
      for (let i = 0; i < 5; i++) {
        colImages.push(imagePool[(c + i) % imagePool.length]);
      }
      cols.push(colImages);
    }
    return cols;
  }, [imagePool]);

  if (imagePool.length === 0) return null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-950">
      {/* Scrolling image columns behind everything */}
      <div className="absolute inset-0 flex gap-3 sm:gap-4 px-2 sm:px-4 opacity-60">
        {columns.map((colImages, colIndex) => {
          const isEven = colIndex % 2 === 0;
          const duration = 20 + colIndex * 5;

          return (
            <div
              key={colIndex}
              className="flex-1 overflow-hidden relative"
            >
              <motion.div
                className="flex flex-col gap-3 sm:gap-4"
                animate={{
                  y: isEven ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                  duration: duration,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {/* Duplicate images for seamless loop */}
                {[...colImages, ...colImages].map((img, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden aspect-[3/4] w-full flex-shrink-0"
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(15,29,48,0.85) 0%,
            rgba(15,29,48,0.75) 20%,
            rgba(15,29,48,0.70) 40%,
            rgba(15,29,48,0.72) 55%,
            rgba(15,29,48,0.80) 70%,
            rgba(15,29,48,0.90) 85%,
            rgba(15,29,48,0.98) 100%
          )`,
        }}
      />
      {/* Extra radial vignette for center focus */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center 40%, rgba(15,29,48,0.6) 0%, rgba(15,29,48,0.3) 40%, rgba(15,29,48,0.7) 100%)',
        }}
      />

      {/* Centered text content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.1] backdrop-blur-md rounded-full px-5 py-2.5 mb-8"
          >
            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-medium tracking-wide">
              {hero.badge}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] mb-7"
          >
            {hero.titleParts.map((part, i) =>
              part.highlight ? (
                <span
                  key={i}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600"
                >
                  {part.text}
                </span>
              ) : (
                <React.Fragment key={i}>{part.text}</React.Fragment>
              )
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="text-base sm:text-lg md:text-xl text-white/65 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Link to="/contact" className="btn-primary text-base">
              {hero.ctaPrimary}
              <ArrowRight size={18} />
            </Link>
            <Link to="/projects" className="btn-secondary text-base">
              {hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center justify-center gap-5 sm:gap-8 flex-wrap"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  weight="fill"
                  className={
                    i < business.ratingRounded
                      ? 'text-gold-400'
                      : 'text-gold-400/40'
                  }
                />
              ))}
              <span className="text-white/70 text-sm ml-2">
                {business.rating}/5 ({business.reviewCount} reviews)
              </span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <CheckCircle size={16} weight="fill" className="text-emerald-400" />
              <span className="text-white/70 text-sm">{hero.trustBadge}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroParallax;
