import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Briefcase,
  MapPin,
  ArrowRight,
  CaretDown,
  PaperPlaneTilt,
  WhatsappLogo,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import SectionReveal from '../components/SectionReveal';
import siteData from '../data/siteData';
import iconMap from '../data/iconMap';

function Careers() {
  const { business, careers } = siteData;
  const [expandedJob, setExpandedJob] = useState(null);

  const handleApply = (jobTitle) => {
    const subject = encodeURIComponent(
      `Application: ${jobTitle} - ${business.legalName}`
    );
    const body = encodeURIComponent(
      `Dear Hiring Manager,\n\nI am writing to express my interest in the ${jobTitle} position at ${business.legalName}.\n\n[Please attach your CV and cover letter]\n\nThank you for your consideration.\n\nBest regards,\n[Your Name]`
    );
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
    toast.success('Opening email client. Good luck with your application!');
  };

  const handleWhatsApp = (jobTitle) => {
    const message = encodeURIComponent(
      `Hello ${business.name}, I am interested in the ${jobTitle} position. Could you please share more details about this opportunity?`
    );
    window.open(
      `https://wa.me/${business.whatsappNumber}?text=${message}`,
      '_blank'
    );
  };

  const heroImage =
    siteData.pageImages?.careers ||
    careers.heroImage ||
    siteData.hero?.backgroundImage ||
    '';

  return (
    <PageTransition>
      <PageHero
        label="Careers"
        title={careers.heroTitle}
        subtitle={careers.heroSubtitle}
        image={heroImage}
        imageAlt={`Career opportunities at ${business.name}`}
      />

      {/* Culture */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                Our Culture
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900">
                {careers.cultureTitle}
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {careers.cultureItems.map((item, index) => {
              const IconComp = iconMap[item.iconName] || iconMap.Users;
              return (
                <SectionReveal key={item.title} delay={index * 0.1}>
                  <div className="text-center p-6 sm:p-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <IconComp
                        size={28}
                        className="text-gold-600"
                        weight="duotone"
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-2 sm:mb-3">
                      {item.title}
                    </h3>
                    <p className="text-steel-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>

          {/* Culture Image */}
          <SectionReveal>
            <div className="relative rounded-2xl overflow-hidden aspect-[21/9]">
              <img
                src={careers.cultureImage}
                alt={careers.cultureImageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 to-transparent flex items-center">
                <div className="p-6 sm:p-8 md:p-12 max-w-lg">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                    {careers.cultureTagline}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                    {careers.cultureTaglineDesc}
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-earth-50">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                Benefits
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900">
                What We Offer
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {careers.benefits.map((benefit, index) => {
              const IconComp =
                iconMap[benefit.iconName] || iconMap.ShieldCheck;
              return (
                <SectionReveal key={benefit.title} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-earth-100 flex gap-4 h-full">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gold-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <IconComp size={24} className="text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 mb-1 text-sm sm:text-base">
                        {benefit.title}
                      </h3>
                      <p className="text-steel-500 text-xs sm:text-sm leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                Open Positions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
                Current Opportunities
              </h2>
              <p className="text-steel-500 text-base sm:text-lg">
                {careers.positions.length} positions available
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-4">
            {careers.positions.map((job, index) => (
              <SectionReveal key={job.id} delay={index * 0.08}>
                <div className="bg-earth-50 border border-earth-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <button
                    onClick={() =>
                      setExpandedJob(
                        expandedJob === job.id ? null : job.id
                      )
                    }
                    className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-navy-900">
                          {job.title}
                        </h3>
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${
                            job.type === 'Full-Time'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {job.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 text-steel-400 text-xs sm:text-sm flex-wrap">
                        <span className="flex items-center gap-1">
                          <Briefcase size={14} />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <CaretDown
                      size={20}
                      className={`text-steel-400 transition-transform shrink-0 ml-2 ${
                        expandedJob === job.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedJob === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-earth-200">
                          <p className="text-steel-600 leading-relaxed mt-4 mb-6 text-sm sm:text-base">
                            {job.description}
                          </p>
                          <h4 className="text-sm font-semibold text-navy-900 uppercase tracking-wider mb-3">
                            Requirements
                          </h4>
                          <ul className="space-y-2 mb-6">
                            {job.requirements.map((req) => (
                              <li
                                key={req}
                                className="flex items-start gap-2 text-sm text-steel-600"
                              >
                                <ArrowRight
                                  size={14}
                                  className="text-gold-500 shrink-0 mt-1"
                                />
                                {req}
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => handleApply(job.title)}
                              className="btn-primary text-sm"
                            >
                              <PaperPlaneTilt size={18} />
                              Apply via Email
                            </button>
                            <button
                              onClick={() => handleWhatsApp(job.title)}
                              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5"
                            >
                              <WhatsappLogo size={18} weight="fill" />
                              Inquire via WhatsApp
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* General Application */}
      <section className="section-padding bg-gold-500">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              {careers.generalApplicationTitle}
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
              {careers.generalApplicationSubtitle}
            </p>
            <button
              onClick={() => handleApply('General Application')}
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <PaperPlaneTilt size={20} />
              {careers.generalApplicationCta}
            </button>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default Careers;
