import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Phone,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import SectionReveal from '../components/SectionReveal';
import siteData from '../data/siteData';
import iconMap from '../data/iconMap';

function Services() {
  const { business, services } = siteData;

  // Use first service image or hero bg as page hero image
  const heroImage =
    siteData.pageImages?.services ||
    services.items?.[0]?.image ||
    siteData.hero?.backgroundImage ||
    '';

  return (
    <PageTransition>
      <PageHero
        label="Our Services"
        title={services.heroTitle}
        subtitle={services.heroSubtitle}
        image={heroImage}
        imageAlt={`${business.name} professional services`}
      />

      {/* Services Grid */}
      {services.items.map((service, index) => {
        const IconComp = iconMap[service.iconName] || iconMap.Buildings;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`section-padding ${
              index % 2 === 0 ? 'bg-white' : 'bg-earth-50'
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div
                className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${
                  index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <SectionReveal
                  direction={index % 2 === 0 ? 'right' : 'left'}
                  className={index % 2 !== 0 ? 'lg:order-2' : ''}
                >
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={`${service.title} services by ${business.name} in ${business.city}`}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-gold-500 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2">
                        <IconComp size={20} weight="fill" />
                        <span className="text-sm font-semibold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>
                </SectionReveal>

                <SectionReveal
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  className={index % 2 !== 0 ? 'lg:order-1' : ''}
                >
                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold-500/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                      <IconComp size={28} className="text-gold-600" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-3 sm:mb-4">
                      {service.title}
                    </h2>
                    <p className="text-steel-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                      {service.desc}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 sm:mb-8">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle
                            size={18}
                            weight="fill"
                            className="text-gold-500 shrink-0 mt-0.5"
                          />
                          <span className="text-steel-600 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link to="/contact" className="btn-primary">
                      Request a Quote
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={siteData.hero?.backgroundImage || heroImage}
            alt={`${business.name} quality work`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-navy-950/85" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              {services.ctaTitle}
            </h2>
            <p className="text-white/70 text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
              {services.ctaSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary text-sm sm:text-base">
                <Phone size={20} />
                Contact Us Today
              </Link>
              <Link to="/projects" className="btn-secondary text-sm sm:text-base">
                View Our Projects
                <ArrowRight size={20} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default Services;
