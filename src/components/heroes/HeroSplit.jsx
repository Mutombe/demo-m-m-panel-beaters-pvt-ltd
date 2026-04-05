import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

function HeroSplit() {
  const { business, hero, stats } = siteData;
  const bgImage = hero.backgroundImages?.[0]?.url || hero.backgroundImage;
  const displayStats = (stats || []).slice(0, 2);

  return (
    <section className="relative min-h-screen flex items-center bg-navy-950 overflow-hidden">
      {/* Full-bleed background image — covers entire section */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt={hero.backgroundAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlay — dark on left fading to semi-transparent on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 via-45% to-navy-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/30" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:pt-0 lg:pb-0">
        <div className="lg:max-w-[55%]">
          {/* Accent line above heading */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 72 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="h-[3px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 mb-8 rounded-full"
          />

          {/* Eyebrow / badge */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="inline-block text-gold-400 text-xs font-semibold uppercase tracking-[3px] mb-5"
          >
            {hero.badge}
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white leading-[1.08] mb-6"
          >
            {hero.titleParts.map((part, i) =>
              part.highlight ? (
                <span
                  key={i}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600"
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-base sm:text-lg text-white/65 leading-relaxed mb-8 max-w-md"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
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

          {/* Stats row */}
          {displayStats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex gap-6 mb-8"
            >
              {displayStats.map((stat, idx) => (
                <React.Fragment key={stat.label}>
                  {idx > 0 && <div className="w-px bg-white/15" />}
                  <div>
                    <span className="text-3xl font-black text-gold-400 block leading-none">
                      {stat.number}
                    </span>
                    <span className="text-xs text-white/60 block mt-1">
                      {stat.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          )}

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex items-center gap-6 flex-wrap"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  weight="fill"
                  className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'}
                />
              ))}
              <span className="text-white/60 text-sm ml-2">
                {business.rating}/5 ({business.reviewCount} reviews)
              </span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <CheckCircle size={15} weight="fill" className="text-emerald-400" />
              <span className="text-white/60 text-sm">{hero.trustBadge}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSplit;
