import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quotes, ArrowRight, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { designTokens } from '../../data/siteData';
import siteData from '../../data/siteData';
import SectionReveal from '../SectionReveal';

function StarRating({ count, size = 14, className = 'text-gold-500' }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={size} weight="fill" className={className} />
      ))}
    </div>
  );
}

function CardsTestimonials() {
  const { business, homeTestimonials } = siteData;

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">What Our Clients Say</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} weight="fill" className={i < business.ratingRounded ? 'text-gold-500' : 'text-gold-500/40'} />
              ))}
            </div>
            <p className="text-steel-500">{business.rating} out of 5 from {business.reviewCount} reviews</p>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {homeTestimonials.map((item, index) => (
            <SectionReveal key={item.name} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-earth-50/50 border border-earth-100 hover:border-earth-200 rounded-2xl p-8 h-full flex flex-col hover:shadow-lg hover:shadow-navy-900/5 transition-all duration-300"
              >
                <Quotes size={36} weight="fill" className="text-gold-500/30 mb-4" />
                <p className="text-steel-700 leading-relaxed flex-1 mb-6 text-[15px]">"{item.text}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-earth-100">
                  <div className="w-11 h-11 bg-navy-900 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-navy-900 font-semibold text-sm">{item.name}</p>
                    <p className="text-steel-400 text-xs truncate">{item.role}</p>
                  </div>
                  <div className="ml-auto shrink-0">
                    <StarRating count={item.rating} />
                  </div>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="text-center mt-12">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600 transition-colors">
              Read All Reviews <ArrowRight size={18} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function SliderTestimonials() {
  const { business, homeTestimonials } = siteData;
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((prev) => (prev + 1) % homeTestimonials.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + homeTestimonials.length) % homeTestimonials.length);
  const item = homeTestimonials[current];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900">What Our Clients Say</h2>
          </div>
        </SectionReveal>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-earth-50 border border-earth-100 rounded-2xl p-8 sm:p-12 text-center"
            >
              <Quotes size={48} weight="fill" className="text-gold-500/20 mx-auto mb-6" />
              <p className="text-lg sm:text-xl text-steel-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                "{item.text}"
              </p>
              <div className="flex items-center justify-center gap-1 mb-3">
                <StarRating count={item.rating} size={18} />
              </div>
              <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                {item.name.charAt(0)}
              </div>
              <p className="text-navy-900 font-bold text-lg">{item.name}</p>
              <p className="text-steel-400 text-sm">{item.role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border border-earth-200 flex items-center justify-center hover:bg-earth-50 hover:border-earth-300 transition-colors"
              aria-label="Previous testimonial"
            >
              <CaretLeft size={18} className="text-navy-900" />
            </button>
            <div className="flex items-center gap-2">
              {homeTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-gold-500' : 'w-2 bg-earth-200 hover:bg-earth-300'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full border border-earth-200 flex items-center justify-center hover:bg-earth-50 hover:border-earth-300 transition-colors"
              aria-label="Next testimonial"
            >
              <CaretRight size={18} className="text-navy-900" />
            </button>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/reviews" className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600 transition-colors">
            Read All Reviews <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function QuoteHighlightTestimonials() {
  const { business, homeTestimonials } = siteData;
  const featured = homeTestimonials[0];

  return (
    <section className="section-padding bg-navy-900">
      <div className="max-w-5xl mx-auto text-center">
        <SectionReveal>
          <span className="inline-block text-gold-400 text-sm font-semibold uppercase tracking-wider mb-8">What Our Clients Say</span>
          <Quotes size={72} weight="fill" className="text-gold-500/20 mx-auto mb-8" />
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-white font-light leading-relaxed mb-10 max-w-3xl mx-auto">
            "{featured.text}"
          </blockquote>
          <div className="flex items-center justify-center gap-1 mb-4">
            <StarRating count={featured.rating} size={20} className="text-gold-400" />
          </div>
          <div className="w-14 h-14 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-400 font-bold text-xl mx-auto mb-3">
            {featured.name.charAt(0)}
          </div>
          <p className="text-white font-bold text-lg">{featured.name}</p>
          <p className="text-white/50 text-sm">{featured.role}</p>
        </SectionReveal>

        {homeTestimonials.length > 1 && (
          <div className="mt-16 grid sm:grid-cols-2 gap-6">
            {homeTestimonials.slice(1).map((item, index) => (
              <SectionReveal key={item.name} delay={index * 0.1}>
                <div className="text-left border border-white/10 hover:border-white/20 rounded-xl p-6 transition-colors duration-300">
                  <Quotes size={24} weight="fill" className="text-gold-500/20 mb-3" />
                  <p className="text-white/70 text-sm leading-relaxed mb-5">"{item.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-400 font-semibold text-xs shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-white/40 text-xs">{item.role}</p>
                    </div>
                    <div className="ml-auto shrink-0">
                      <StarRating count={item.rating} size={12} className="text-gold-400" />
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        )}

        <SectionReveal>
          <div className="mt-10">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-300 transition-colors">
              Read All Reviews <ArrowRight size={18} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function MinimalTestimonials() {
  const { homeTestimonials } = siteData;

  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <div className="mb-12">
            <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">What Our Clients Say</h2>
          </div>
        </SectionReveal>

        <div className="space-y-8">
          {homeTestimonials.map((item, index) => (
            <SectionReveal key={item.name} delay={index * 0.1}>
              <div className="border-l-3 border-gold-500 pl-8 py-3 hover:bg-earth-50/30 transition-colors duration-300 rounded-r-lg">
                <p className="text-steel-700 text-lg leading-relaxed mb-4">"{item.text}"</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-navy-900 font-semibold text-sm">{item.name}</span>
                  <span className="text-steel-300">·</span>
                  <span className="text-steel-400 text-sm">{item.role}</span>
                  <div className="ml-auto">
                    <StarRating count={item.rating} size={12} />
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="mt-10">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600 transition-colors">
              Read All Reviews <ArrowRight size={18} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const style = designTokens?.testimonialStyle || 'cards';

  const variants = {
    'cards': CardsTestimonials,
    'slider': SliderTestimonials,
    'quote-highlight': QuoteHighlightTestimonials,
    'minimal': MinimalTestimonials,
  };

  const Component = variants[style] || CardsTestimonials;
  return <Component />;
}

export default TestimonialSection;
