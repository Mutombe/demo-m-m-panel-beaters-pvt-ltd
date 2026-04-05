import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Star, ShieldCheck, UsersThree } from '@phosphor-icons/react';
import { designTokens } from '../../data/siteData';
import siteData from '../../data/siteData';
import SectionReveal from '../SectionReveal';

const statIcons = [Trophy, Star, ShieldCheck, UsersThree];

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const numMatch = value.match(/[\d.]+/);
    if (!numMatch) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(numMatch[0]);
    const suffix = value.replace(numMatch[0], '');
    const prefix = value.substring(0, value.indexOf(numMatch[0]));
    const duration = 2000;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(target * eased);
      setDisplay(prefix + current + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

function OverlayStats() {
  const { stats } = siteData;

  return (
    <section className="relative -mt-16 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 p-2">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const IconComp = statIcons[index] || Trophy;
            const isLast = index === stats.length - 1;
            return (
              <SectionReveal key={stat.label} delay={index * 0.1}>
                <div className={`text-center py-8 px-4 ${!isLast ? 'lg:border-r border-earth-100' : ''} ${index % 2 === 0 && index < stats.length - 1 ? 'border-r border-earth-100 lg:border-r' : ''}`}>
                  <IconComp size={28} className="text-gold-500 mx-auto mb-3" weight="fill" />
                  <div className="text-3xl sm:text-4xl font-bold text-navy-900 mb-1">
                    <AnimatedNumber value={stat.number} />
                  </div>
                  <div className="text-sm text-steel-500 font-medium">{stat.label}</div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InlineStats() {
  const { stats } = siteData;

  return (
    <section className="py-16 bg-earth-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <SectionReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-navy-900 mb-2">
                  <AnimatedNumber value={stat.number} />
                </div>
                <div className="text-sm text-steel-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconBoxStats() {
  const { stats } = siteData;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComp = statIcons[index] || Trophy;
            return (
              <SectionReveal key={stat.label} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-earth-50 border border-earth-100 rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-navy-900/5 transition-shadow duration-300"
                >
                  <div className="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComp size={28} className="text-gold-500" weight="fill" />
                  </div>
                  <div className="text-3xl font-bold text-navy-900 mb-1">
                    <AnimatedNumber value={stat.number} />
                  </div>
                  <div className="text-sm text-steel-500 font-medium">{stat.label}</div>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CounterBarStats() {
  const { stats } = siteData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-16 bg-navy-900" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-gold-400 text-sm font-semibold uppercase tracking-wider mb-4">By The Numbers</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Track Record</h2>
          </div>
        </SectionReveal>
        <div className="space-y-8">
          {stats.map((stat, index) => {
            const numMatch = stat.number.match(/[\d.]+/);
            const numVal = numMatch ? parseFloat(numMatch[0]) : 50;
            const maxVal = numVal > 100 ? numVal * 1.2 : 100;
            const fillPercent = Math.min(95, (numVal / maxVal) * 100);

            return (
              <SectionReveal key={stat.label} delay={index * 0.1}>
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-white font-medium">{stat.label}</span>
                    <span className="text-gold-400 text-2xl font-bold">
                      <AnimatedNumber value={stat.number} />
                    </span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${fillPercent}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: index * 0.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const style = designTokens?.statsStyle || 'overlay';

  const variants = {
    'overlay': OverlayStats,
    'inline': InlineStats,
    'icon-boxes': IconBoxStats,
    'counter-bar': CounterBarStats,
  };

  const StatsComponent = variants[style] || OverlayStats;
  return <StatsComponent />;
}

export default StatsSection;
