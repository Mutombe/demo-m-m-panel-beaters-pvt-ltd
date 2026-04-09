import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowDown, Phone, WhatsappLogo, Star, Quotes, CaretLeft, CaretRight,
  CheckCircle, ShieldCheck, Wrench, Car, Clock, Eye, Target, Trophy,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import siteData from '../data/siteData';

const iconMap = { Wrench, Car, ShieldCheck, Eye, Target, Trophy, Star };

function AnimatedCounter({ target, suffix = '', duration = 2.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const num = parseInt(String(target).replace(/[^0-9]/g, ''), 10) || 0;
  useEffect(() => { if (!inView) return; let s = 0; const inc = num / (duration * 60); const t = setInterval(() => { s += inc; if (s >= num) { setCount(num); clearInterval(t); } else setCount(Math.floor(s)); }, 1000/60); return () => clearInterval(t); }, [inView, num, duration]);
  return <span ref={ref}>{inView ? count.toLocaleString() : '0'}{suffix}</span>;
}

function NoiseTexture({ opacity = 0.035 }) {
  return <div className="absolute inset-0 pointer-events-none z-10" style={{ opacity, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />;
}

/* Welding spark trail effect */
function WeldingSparks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {[...Array(18)].map((_, i) => (
        <div key={i} className="absolute" style={{
          width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`,
          background: `radial-gradient(circle, rgba(212,168,83,${Math.random() * 0.9 + 0.1}) 0%, transparent 70%)`,
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animation: `sparkle-float ${Math.random() * 7 + 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`, borderRadius: '50%',
        }} />
      ))}
    </div>
  );
}

/* ================================================================
   1. HERO -- Dark Industrial, Gold-Amber Accent, Welding Sparks
   ================================================================ */
function HeroSection() {
  const { hero } = siteData;
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = hero?.backgroundImages?.map(img => img.url) || [
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=1400&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1400&q=80',
  ];
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const textOp = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => { const t = setInterval(() => setCurrentSlide(p => (p+1) % heroImages.length), 6500); return () => clearInterval(t); }, [heroImages.length]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] overflow-hidden bg-neutral-950">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <AnimatePresence mode="sync">
          <motion.img key={currentSlide} src={heroImages[currentSlide]} alt="M&M Panel Beaters" className="absolute inset-0 w-full h-[130%] object-cover object-center" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2, ease: 'easeInOut' }} loading="eager" />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/88 via-neutral-950/45 to-neutral-950/92 z-[1]" />
      </motion.div>

      <WeldingSparks />
      <NoiseTexture opacity={0.04} />

      {/* Diagonal amber stripe */}
      <div className="absolute top-0 right-[8%] w-[2px] h-[40%] bg-gradient-to-b from-amber-500/60 to-transparent z-20 rotate-12 origin-top" />

      <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {heroImages.map((_, i) => <button key={i} onClick={() => setCurrentSlide(i)} className={`w-[3px] transition-all duration-700 ${i === currentSlide ? 'h-10 bg-amber-500' : 'h-4 bg-white/20'}`} aria-label={`Slide ${i+1}`} />)}
      </div>

      <motion.div className="relative z-20 flex flex-col justify-center h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36" style={{ y: textY, opacity: textOp }}>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3 }} className="w-20 h-[2px] bg-gradient-to-r from-amber-500 to-amber-400/40 mb-6 origin-left" />

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
          {hero?.badge || 'Trusted Since Establishment'}
        </motion.p>

        <div className="overflow-hidden">
          {['MASTERCRAFT', 'BODY', 'RESTORATION.'].map((line, i) => (
            <motion.div key={line} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}>
              <h1 className={`font-heading leading-[0.86] tracking-tight ${line === 'BODY' ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent' : 'text-white'}`} style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', fontWeight: line === 'BODY' ? 900 : 200 }}>
                {line}
              </h1>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }} className="flex items-center gap-3 mt-8">
          <div className="w-8 h-[1px] bg-amber-500/40" />
          <p className="text-white/25 text-xs sm:text-sm uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>29 Reviews &middot; Anthony, Harare</p>
        </motion.div>

        {/* Warranty badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.25 }} className="flex items-center gap-3 mt-6">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-4 py-2">
            <ShieldCheck size={18} weight="fill" className="text-amber-500" />
            <span className="text-amber-300 text-xs uppercase tracking-[0.15em] font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>Full Warranty Backed</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.4 }} className="flex flex-wrap gap-4 mt-8">
          <Link to="/contact" className="group inline-flex items-center gap-3 bg-amber-500 text-neutral-950 px-8 py-4 text-sm uppercase tracking-[0.15em] font-bold transition-all duration-500 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/20" style={{ fontFamily: 'var(--font-sans)' }}>
            {hero?.ctaPrimary || 'Request Quote'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/projects" className="group inline-flex items-center gap-3 border border-white/15 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:border-amber-500/40 hover:text-amber-400 transition-all duration-500" style={{ fontFamily: 'var(--font-sans)' }}>
            {hero?.ctaSecondary || 'Our Portfolio'}
          </Link>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-white/15 text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-sans)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ArrowDown size={14} className="text-amber-500/40" /></motion.div>
      </motion.div>

      <div className="hidden lg:flex absolute right-8 bottom-12 z-20">
        <span className="text-white/8 text-[10px] uppercase tracking-[0.4em]" style={{ writingMode: 'vertical-rl', fontFamily: 'var(--font-sans)' }}>M&M Panel Beaters &mdash; Harare</span>
      </div>
    </section>
  );
}

/* ================================================================
   2. MARQUEE
   ================================================================ */
function MarqueeTicker() {
  const items = ['PANEL BEATING', 'SPRAY PAINTING', 'WELDING', 'CHASSIS ALIGNMENT', 'INSURANCE CLAIMS', 'COLOUR MATCHING', 'RUST TREATMENT'];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className="bg-neutral-950 border-y border-amber-500/10 py-5 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => <span key={i} className="flex items-center gap-6 mx-6"><span className="text-amber-500/70 font-heading text-lg sm:text-2xl tracking-wider font-bold uppercase">{item}</span><span className="text-amber-500/15">+</span></span>)}
      </div>
    </section>
  );
}

/* ================================================================
   3. BEFORE / AFTER
   ================================================================ */
function BeforeAfterShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const cases = [
    { before: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80', after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80', label: 'Fender Reconstruction' },
    { before: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80', after: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=600&q=80', label: 'Rollover Damage Repair' },
    { before: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80', after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80', label: 'Full Respray & Polish' },
  ];

  return (
    <section ref={ref} className="bg-neutral-900 py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-14 sm:mb-20">
          <div className="w-12 h-[2px] bg-amber-500 mb-6" />
          <h2 className="font-heading text-white leading-[0.92] font-bold uppercase" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>Proven <span className="text-amber-500">Results</span></h2>
        </motion.div>

        {/* Alternating stacked layout */}
        <div className="space-y-8">
          {cases.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.15 }} className={`grid md:grid-cols-2 gap-1 ${i % 2 === 1 ? 'md:direction-rtl' : ''}`}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={c.before} alt={`Before ${c.label}`} className="w-full h-full object-cover object-center" loading="lazy" />
                <div className="absolute inset-0 bg-red-900/15" />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[8px] uppercase tracking-widest px-2 py-1 font-bold">Before</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={c.after} alt={`After ${c.label}`} className="w-full h-full object-cover object-center" loading="lazy" />
                <span className="absolute top-3 right-3 bg-green-600 text-white text-[8px] uppercase tracking-widest px-2 py-1 font-bold">After</span>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-heading text-white text-sm font-bold uppercase tracking-wide">{c.label}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   4. SERVICES
   ================================================================ */
function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { servicesPreview, services } = siteData;
  const imgs = [
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=800&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
  ];

  return (
    <section ref={ref} className="bg-neutral-950 py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-14 sm:mb-20">
          <div className="w-12 h-[2px] bg-amber-500 mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-amber-500/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>What We Do</p>
              <h2 className="font-heading text-white leading-[0.92] font-bold uppercase" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>Our <span className="text-amber-500">Services</span></h2>
            </div>
            <Link to="/services" className="group text-white/30 text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-amber-500 transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>All Services <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></Link>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {servicesPreview?.slice(0, 6).map((service, i) => {
            const Icon = iconMap[service.icon] || Wrench;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08 * i }} className={i === 0 ? 'sm:col-span-2' : ''}>
                <Link to={`/services#${services?.items?.[i]?.slug || ''}`} className={`group relative block overflow-hidden ${i === 0 ? 'aspect-[16/9] sm:aspect-[2/1]' : 'aspect-[3/4]'}`}>
                  <img src={imgs[i]} alt={service.title} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent opacity-90" />
                  <div className="absolute top-5 left-5 z-10 w-10 h-10 bg-green-600 flex items-center justify-center"><Icon size={18} weight="fill" className="text-white" /></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="font-heading text-white text-xl font-bold uppercase tracking-wide mb-2">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{service.desc}</p>
                    <div className="flex items-center gap-2 mt-3 text-amber-500 group-hover:translate-x-1 transition-transform"><span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>Details</span><ArrowRight size={14} /></div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-500 to-yellow-500 z-10" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   5. STATS
   ================================================================ */
function StatsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { stats } = siteData;
  return (
    <section ref={ref} className="relative bg-neutral-950 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">
          {stats?.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.12 }} className="text-center relative">
              <div className="font-heading text-amber-500 leading-none font-bold" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}><AnimatedCounter target={String(stat.number).replace(/[^0-9]/g, '')} suffix={String(stat.number).replace(/[0-9]/g, '')} /></div>
              <div className="text-white/30 text-xs sm:text-sm uppercase tracking-[0.25em] mt-3" style={{ fontFamily: 'var(--font-sans)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   6. ABOUT
   ================================================================ */
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section ref={ref} className="bg-neutral-950 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }}>
            <div className="w-12 h-[2px] bg-amber-500 mb-6" />
            <p className="text-amber-500/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Who We Are</p>
            <h2 className="font-heading text-white leading-[0.95] font-bold uppercase mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>M&M Panel <span className="text-amber-500">Beaters</span></h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 max-w-lg" style={{ fontFamily: 'var(--font-sans)' }}>
              A family-owned operation built on decades of honest craftsmanship. M&M Panel Beaters (Pvt) Ltd has been restoring vehicles at our Anthony Road workshop, earning a reputation for meticulous attention to detail and fair pricing.
            </p>
            <p className="text-white/35 text-sm leading-relaxed max-w-lg" style={{ fontFamily: 'var(--font-sans)' }}>
              From minor scratch repairs to major collision rebuilds, our team treats every vehicle as if it were our own. We work with all major insurance companies and provide transparent quotes with no hidden costs.
            </p>
            <div className="w-full h-px bg-white/5 my-8" />
            <div className="flex gap-10 sm:gap-16">
              <div><div className="text-amber-500 font-heading text-3xl font-bold leading-none">29</div><div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Reviews</div></div>
              <div><div className="text-amber-500 font-heading text-3xl font-bold leading-none">4.0</div><div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Rating</div></div>
              <div><div className="text-amber-500 font-heading text-3xl font-bold leading-none">100%</div><div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Insurer Approved</div></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
            <div className="overflow-hidden"><img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80" alt="M&M workshop" className="w-full aspect-[4/5] object-cover object-center" loading="lazy" /></div>
            <div className="absolute -bottom-8 -left-6 w-[45%] overflow-hidden border-4 border-neutral-950 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=600&q=80" alt="Detail work" className="w-full aspect-square object-cover object-center" loading="lazy" />
            </div>
            <div className="absolute -top-4 -right-4 bg-amber-500 text-neutral-950 p-5 shadow-2xl">
              <div className="text-center"><ShieldCheck size={28} weight="fill" className="mx-auto mb-1" /><div className="font-heading text-xs uppercase tracking-[0.15em] font-bold">Certified</div></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   7. WHY CHOOSE US
   ================================================================ */
function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const points = [
    { title: 'Family-Owned Integrity', desc: 'Three decades of honest, transparent service with no hidden charges.' },
    { title: 'Full Insurance Support', desc: 'We handle all paperwork and bill insurers directly on your behalf.' },
    { title: 'Precision Equipment', desc: 'Modern frame straighteners, mixing systems, and spray booths on site.' },
    { title: 'Lifetime Paint Guarantee', desc: 'Our paint jobs carry a written guarantee against peeling, fading, and cracking.' },
  ];

  return (
    <section ref={ref} className="bg-neutral-900 py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }} className="relative">
            <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80" alt="Quality work" className="w-full aspect-[4/5] object-cover object-center" loading="lazy" />
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-amber-500/40" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-amber-500/40" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.15 }}>
            <div className="w-12 h-[2px] bg-amber-500 mb-6" />
            <h2 className="font-heading text-white leading-[0.95] font-bold uppercase mb-12" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>Why <span className="text-amber-500">M&M</span></h2>
            <div className="space-y-8">
              {points.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }} className="flex gap-5">
                  <div className="shrink-0 mt-1"><div className="w-8 h-8 bg-green-600 flex items-center justify-center"><CheckCircle size={16} weight="fill" className="text-white" /></div></div>
                  <div>
                    <h4 className="font-heading text-white text-base sm:text-lg font-bold uppercase tracking-wide mb-1">{p.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   8. TESTIMONIALS
   ================================================================ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const { homeTestimonials } = siteData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const testimonials = homeTestimonials || [];
  const next = useCallback(() => setActive(p => (p+1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setActive(p => (p-1+testimonials.length) % testimonials.length), [testimonials.length]);
  useEffect(() => { const t = setInterval(next, 7000); return () => clearInterval(t); }, [next]);
  if (!testimonials.length) return null;
  const t = testimonials[active];
  return (
    <section ref={ref} className="relative bg-neutral-950 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <NoiseTexture opacity={0.02} />
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <Quotes size={48} weight="fill" className="text-amber-500/15 mx-auto mb-8" />
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
            <blockquote className="text-white text-lg sm:text-xl lg:text-2xl leading-relaxed font-heading mb-10">&ldquo;{t.text}&rdquo;</blockquote>
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-[2px] bg-amber-500" />
              <div className="text-white text-sm uppercase tracking-[0.15em] font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>{t.name}</div>
              <div className="flex gap-0.5 mt-1">{[...Array(t.rating||5)].map((_,i)=><Star key={i} size={12} weight="fill" className="text-amber-500" />)}</div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-center gap-6 mt-12">
          <button onClick={prev} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-amber-500 transition-colors"><CaretLeft size={16} /></button>
          <div className="flex gap-2">{testimonials.map((_,i)=><button key={i} onClick={()=>setActive(i)} className={`h-[2px] transition-all duration-500 ${i===active?'w-10 bg-amber-500':'w-3 bg-white/10'}`} />)}</div>
          <button onClick={next} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-amber-500 transition-colors"><CaretRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   9. CTA
   ================================================================ */
function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=1400&q=80" alt="" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
      <div className="absolute inset-0 bg-neutral-950/70" />
      <NoiseTexture opacity={0.03} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <div className="w-12 h-[2px] bg-amber-500 mx-auto mb-6" />
        <h2 className="font-heading text-white leading-[0.92] font-bold uppercase mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Need a <span className="text-amber-500">Repair?</span></h2>
        <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-10" style={{ fontFamily: 'var(--font-sans)' }}>Bring your vehicle in for a free, no-obligation assessment. We'll have you back on the road looking factory-fresh.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="group inline-flex items-center justify-center gap-3 bg-amber-500 text-neutral-950 px-8 py-4 text-sm uppercase tracking-[0.15em] font-bold hover:bg-amber-400 transition-all" style={{ fontFamily: 'var(--font-sans)' }}>
            Get Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="https://wa.me/263772237475" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-3 border border-green-500/40 text-green-400 px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:bg-green-500/10 transition-all" style={{ fontFamily: 'var(--font-sans)' }}>
            <WhatsappLogo size={18} weight="fill" /> WhatsApp Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <MarqueeTicker />
      <BeforeAfterShowcase />
      <ServicesGrid />
      <StatsBand />
      <AboutSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </PageTransition>
  );
}
