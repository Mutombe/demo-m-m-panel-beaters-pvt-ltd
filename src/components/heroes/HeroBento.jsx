import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from '@phosphor-icons/react';
import siteData from '../../data/siteData';

function HeroBento() {
  const { business, hero, stats } = siteData;
  const images = hero.backgroundImages || [];
  const img1 = images[0]?.url || hero.backgroundImage;
  const img2 = images[1]?.url || hero.backgroundImage;
  const img3 = images[2]?.url || hero.backgroundImage;

  return (
    <section className="relative min-h-screen bg-navy-950 overflow-hidden">
      {/* Full-width mosaic grid */}
      <div className="pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* 7:5 asymmetric grid */}
          <div className="grid grid-cols-12 gap-3 sm:gap-4 h-[55vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] sm:min-h-[500px]">
            {/* Left — main image (col-span-7) */}
            <div className="col-span-12 sm:col-span-7 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative group">
              <img
                src={img1}
                alt={hero.backgroundAlt || 'Main showcase'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-navy-950/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/30 to-transparent" />
            </div>

            {/* Right — 2 stacked images (col-span-5) */}
            <div className="hidden sm:grid col-span-5 grid-rows-2 gap-3 sm:gap-4">
              <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative group">
                <img
                  src={img2}
                  alt="Project showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
              </div>
              <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative group">
                <img
                  src={img3}
                  alt="Project showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Glassmorphic content card — floating bottom-left over the grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto z-10 glass-strong rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-6 sm:py-8 max-w-xl shadow-2xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3.5 py-1.5 mb-4">
              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
              <span className="text-gold-400 text-xs font-medium tracking-wide">
                {hero.badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-4">
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
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/55 leading-relaxed mb-6 max-w-md">
              {hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-5">
              <Link to="/contact" className="btn-primary text-sm">
                {hero.ctaPrimary}
                <ArrowRight size={16} />
              </Link>
              <Link to="/projects" className="btn-secondary text-sm">
                {hero.ctaSecondary}
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    weight="fill"
                    className={i < business.ratingRounded ? 'text-gold-400' : 'text-gold-400/40'}
                  />
                ))}
                <span className="text-white/60 text-xs ml-1.5">
                  {business.rating}/5
                </span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/15" />
              <div className="flex items-center gap-1.5">
                <CheckCircle size={13} weight="fill" className="text-emerald-400" />
                <span className="text-white/60 text-xs">{hero.trustBadge}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats bar below the grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-8"
        >
          {(stats || []).map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
              className="text-center py-4 px-3 border border-white/[0.08] rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-300"
            >
              <div className="text-2xl sm:text-3xl font-bold text-gold-400 mb-1 tracking-tight">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroBento;
