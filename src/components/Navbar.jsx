import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  List,
  X,
  CaretDown,
  HardHat,
  Phone,
  WhatsappLogo,
  MagnifyingGlass,
} from '@phosphor-icons/react';
import siteData from '../data/siteData';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  {
    name: 'Our Work',
    children: [
      { name: 'Services', path: '/services' },
      { name: 'Projects', path: '/projects' },
    ],
  },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
];

function Navbar({ onSearchOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();

  const { business, navbar } = siteData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-navy-950/95 backdrop-blur-xl shadow-2xl shadow-black/20'
          : 'bg-navy-950/30 backdrop-blur-sm'
      }`}
      style={{ top: 'var(--banner-height, 0px)' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gold-500 rounded-lg flex items-center justify-center group-hover:bg-gold-400 transition-colors">
              <HardHat size={18} weight="fill" className="text-white sm:hidden" />
              <HardHat size={20} weight="fill" className="text-white hidden sm:block" />
            </div>
            <div className="min-w-0">
              <span className="text-white font-bold text-xs sm:text-sm lg:text-base tracking-tight block leading-tight truncate max-w-[120px] sm:max-w-[180px] lg:max-w-none">
                {navbar.logoLine1}
              </span>
              <span className="text-gold-400 text-[8px] sm:text-[9px] uppercase tracking-[0.12em] sm:tracking-[0.18em] font-medium leading-tight block truncate max-w-[120px] sm:max-w-[180px] lg:max-w-none">
                {navbar.logoLine2}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(link.name)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button className="flex items-center gap-1 text-white/80 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    {link.name}
                    <CaretDown
                      size={14}
                      className={`transition-transform ${
                        dropdownOpen === link.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-navy-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-4 py-3 text-sm transition-colors ${
                              location.pathname === child.path
                                ? 'text-gold-400 bg-white/5'
                                : 'text-white/70 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-gold-400 bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* CTA + Search + Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search */}
            <button
              onClick={onSearchOpen}
              className="text-white/70 hover:text-white p-1.5 sm:p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlass size={18} className="sm:hidden" />
              <MagnifyingGlass size={20} className="hidden sm:block" />
            </button>
            <a
              href={`https://wa.me/${business.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all hover:-translate-y-0.5"
            >
              <WhatsappLogo size={16} weight="fill" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <a
              href={`tel:${business.phoneRaw}`}
              className="hidden lg:flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
            >
              <Phone size={18} />
              <span>{business.phone}</span>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-1.5"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-navy-950/98 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {/* Mobile Search */}
              <button
                onClick={() => { setMobileOpen(false); onSearchOpen?.(); }}
                className="flex items-center gap-3 w-full text-white/60 px-4 py-2.5 rounded-lg hover:bg-white/5 mb-2"
              >
                <MagnifyingGlass size={16} />
                <span className="text-sm">Search...</span>
                <kbd className="ml-auto text-xs text-white/30 bg-white/5 px-1.5 py-0.5 rounded">Ctrl+K</kbd>
              </button>

              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.name}>
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === link.name ? null : link.name
                        )
                      }
                      className="flex items-center justify-between w-full text-white/80 px-4 py-2.5 rounded-lg text-sm font-medium"
                    >
                      {link.name}
                      <CaretDown
                        size={16}
                        className={`transition-transform ${
                          dropdownOpen === link.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen === link.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`block px-4 py-2 text-sm rounded-lg ${
                                location.pathname === child.path
                                  ? 'text-gold-400'
                                  : 'text-white/60 hover:text-white'
                              }`}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                      location.pathname === link.path
                        ? 'text-gold-400 bg-white/5'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
              <div className="pt-3 border-t border-white/10 flex gap-3">
                <a
                  href={`https://wa.me/${business.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${business.phoneRaw}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-2.5 rounded-lg text-sm font-medium"
                >
                  <Phone size={18} />
                  Call Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
