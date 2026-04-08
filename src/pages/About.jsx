import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Eye,
  Buildings,
  CalendarBlank,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import SectionReveal from '../components/SectionReveal';
import siteData from '../data/siteData';
import iconMap from '../data/iconMap';

function About() {
  const { business, about } = siteData;

  const heroImage =
    siteData.pageImages?.about ||
    about.storyImage ||
    siteData.hero?.backgroundImage ||
    '';

  return (
    <PageTransition>
      <PageHero
        label="About Us"
        title={about.heroTitle}
        subtitle={about.heroSubtitle}
        image={heroImage}
        imageAlt={`${business.name} team and company`}
      />

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <SectionReveal direction="right">
              <div className="relative">
                <img
                  src={about.storyImage}
                  alt={about.storyImageAlt}
                  className="rounded-2xl w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-navy-900 text-white p-4 sm:p-6 rounded-2xl shadow-xl hidden sm:block">
                  <div className="flex items-center gap-3">
                    <Buildings size={28} className="text-gold-400" />
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">
                        {about.storyProjectCount}
                      </div>
                      <div className="text-xs sm:text-sm text-white/70">
                        {about.storyProjectLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal direction="left">
              <div>
                <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                  Our Story
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-4 sm:mb-6">
                  {about.storyTitle}
                </h2>
                <div className="space-y-4 text-steel-600 leading-relaxed text-sm sm:text-base">
                  {(about?.storyParagraphs || [about?.story || ""]).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="section-padding bg-earth-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <SectionReveal delay={0}>
              <div className="bg-white rounded-2xl p-8 sm:p-10 border border-earth-100 h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-navy-900 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <Target size={28} className="text-gold-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-3 sm:mb-4">
                  Our Mission
                </h3>
                <p className="text-steel-600 leading-relaxed text-sm sm:text-base">
                  {about?.mission || ""}
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="bg-white rounded-2xl p-8 sm:p-10 border border-earth-100 h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-navy-900 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <Eye size={28} className="text-gold-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-3 sm:mb-4">
                  Our Vision
                </h3>
                <p className="text-steel-600 leading-relaxed text-sm sm:text-base">
                  {about?.vision || ""}
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                Our Values
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900">
                The Pillars That Guide Us
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(about?.values || []).map((value, index) => {
              const IconComp = iconMap[value.iconName] || iconMap.ShieldCheck;
              return (
                <SectionReveal key={value.title} delay={index * 0.1}>
                  <div className="text-center p-4 sm:p-8 rounded-2xl hover:bg-earth-50 transition-colors h-full">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <IconComp
                        size={28}
                        className="text-gold-600"
                        weight="duotone"
                      />
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-navy-900 mb-2 sm:mb-3">
                      {value.title}
                    </h3>
                    <p className="text-steel-500 text-xs sm:text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block text-gold-400 text-sm font-semibold uppercase tracking-wider mb-4">
                Our Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Meet the Team
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {(about?.team || []).map((member, index) => (
              <SectionReveal key={member.name} delay={index * 0.1}>
                <div className="group text-center">
                  <div className="relative mb-4 sm:mb-6 rounded-2xl overflow-hidden aspect-[3/4]">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role} at ${business.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  </div>
                  <h4 className="text-white font-semibold text-sm sm:text-lg">
                    {member.name}
                  </h4>
                  <p className="text-gold-400 text-xs sm:text-sm mt-1">{member.role}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">
                Our Journey
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900">
                Key Milestones
              </h2>
            </div>
          </SectionReveal>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-earth-200 hidden sm:block" />
            <div className="space-y-8 sm:space-y-10">
              {(about?.milestones || []).map((milestone, index) => (
                <SectionReveal key={milestone.year} delay={index * 0.1}>
                  <div className="flex gap-4 sm:gap-8 items-start">
                    <div className="relative hidden sm:block">
                      <div className="w-16 h-16 bg-gold-500/10 border-2 border-gold-500 rounded-full flex items-center justify-center z-10 relative bg-white">
                        <CalendarBlank size={20} className="text-gold-600" />
                      </div>
                    </div>
                    <div className="flex-1 bg-earth-50 rounded-2xl p-5 sm:p-6 border border-earth-100">
                      <span className="text-gold-600 font-bold text-sm">
                        {milestone.year}
                      </span>
                      <h4 className="text-navy-900 font-bold text-base sm:text-lg mt-1 mb-2">
                        {milestone.title}
                      </h4>
                      <p className="text-steel-500 text-xs sm:text-sm leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gold-500">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              {about.ctaTitle}
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
              {about.ctaSubtitle}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all hover:-translate-y-0.5 text-sm sm:text-base"
            >
              {about.ctaCta}
              <ArrowRight size={20} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default About;
