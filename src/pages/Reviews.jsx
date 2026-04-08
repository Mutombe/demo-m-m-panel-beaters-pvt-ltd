import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quotes, GoogleLogo, ThumbsUp } from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import SectionReveal from '../components/SectionReveal';
import siteData from '../data/siteData';

function Reviews() {
  const { business, reviews } = siteData;

  const heroImage =
    siteData.pageImages?.reviews ||
    siteData.hero?.backgroundImage ||
    '';

  return (
    <PageTransition>
      <PageHero
        label="Client Reviews"
        title={reviews.heroTitle}
        subtitle={reviews.heroSubtitle}
        image={heroImage}
        imageAlt={`${business.name} client testimonials`}
      />

      {/* Rating Summary */}
      <section className="relative -mt-8 z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 p-6 sm:p-8 md:p-10">
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-10 items-center">
              <div className="text-center sm:text-left">
                <div className="text-5xl sm:text-6xl font-bold text-navy-900 mb-2">
                  {business.rating}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      weight="fill"
                      className={
                        i < business.ratingRounded
                          ? 'text-gold-500'
                          : 'text-gold-500/40'
                      }
                    />
                  ))}
                </div>
                <p className="text-steel-500 text-sm sm:text-base">
                  Based on {business.reviewCount} reviews
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 text-sm text-steel-400">
                  <GoogleLogo size={18} weight="bold" />
                  <span>Google Reviews</span>
                </div>
              </div>

              <div className="space-y-3">
                {(reviews?.ratingBreakdown || []).map((item) => (
                  <div
                    key={item.stars}
                    className="flex items-center gap-3"
                  >
                    <span className="text-sm text-steel-500 w-12">
                      {item.stars} star
                    </span>
                    <div className="flex-1 h-2.5 bg-earth-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(item.count / business.reviewCount) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gold-500 rounded-full"
                      />
                    </div>
                    <span className="text-sm text-steel-400 w-6">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding bg-earth-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(reviews?.items || []).map((review, index) => (
              <SectionReveal key={review.name} delay={(index % 6) * 0.08}>
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-earth-100 h-full flex flex-col hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        weight="fill"
                        className={
                          i < review.rating
                            ? 'text-gold-500'
                            : 'text-earth-200'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-steel-400 mb-3 sm:mb-4">
                    {review.date}
                  </span>

                  <div className="flex-1">
                    <Quotes
                      size={24}
                      weight="fill"
                      className="text-gold-500/20 mb-2"
                    />
                    <p className="text-steel-600 text-sm leading-relaxed">
                      {review.text}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-6 pt-4 border-t border-earth-100">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-navy-900 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-navy-900 font-semibold text-sm truncate">
                            {review.name}
                          </p>
                          <p className="text-steel-400 text-xs truncate">
                            {review.role}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gold-600 bg-gold-50 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                        {review.project}
                      </span>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <SectionReveal>
            <ThumbsUp
              size={48}
              className="text-gold-400 mx-auto mb-6"
              weight="fill"
            />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              {reviews.ctaTitle}
            </h2>
            <p className="text-white/60 text-base sm:text-lg mb-6 sm:mb-8">
              {reviews.ctaSubtitle}
            </p>
            <a
              href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(reviews.ctaWhatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm sm:text-base"
            >
              {reviews.ctaCta}
            </a>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default Reviews;
