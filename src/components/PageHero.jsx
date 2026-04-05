import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable hero section for inner pages with blended background image.
 * Uses siteData image URLs — no hardcoded Unsplash URLs.
 */
function PageHero({ label, title, subtitle, image, imageAlt }) {
  return (
    <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden min-h-[40vh] sm:min-h-[45vh] flex items-end">
      {/* Background Image — blended */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={imageAlt || ''}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {label && (
            <span className="inline-block text-gold-400 text-sm font-semibold uppercase tracking-wider mb-4">
              {label}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            {Array.isArray(title)
              ? title.map((part, i) =>
                  part.highlight ? (
                    <span key={i} className="text-gold-400">
                      {part.text}
                    </span>
                  ) : (
                    <React.Fragment key={i}>{part.text}</React.Fragment>
                  )
                )
              : title}
          </h1>
          {subtitle && (
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default PageHero;
