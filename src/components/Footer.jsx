import React from 'react';
import { Link } from 'react-router-dom';
import {
  HardHat,
  MapPin,
  Phone,
  Envelope,
  WhatsappLogo,
  Clock,
  ArrowRight,
  FacebookLogo,
  LinkedinLogo,
  InstagramLogo,
} from '@phosphor-icons/react';
import siteData from '../data/siteData';

function Footer() {
  const currentYear = new Date().getFullYear();
  const { business, navbar, footer } = siteData;

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceNames = siteData.servicesPreview.map((s) => s.title);

  return (
    <footer className="bg-navy-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                <HardHat size={24} weight="fill" className="text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-lg block leading-tight">
                  {navbar.logoLine1}
                </span>
                <span className="text-gold-400 text-[10px] uppercase tracking-[0.2em] font-medium">
                  {navbar.logoLine2}
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {footer.description}
            </p>
            <div className="flex gap-3">
              {business.socialLinks.facebook && (
                <a
                  href={business.socialLinks.facebook}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gold-500 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookLogo size={20} />
                </a>
              )}
              {business.socialLinks.linkedin && (
                <a
                  href={business.socialLinks.linkedin}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gold-500 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo size={20} />
                </a>
              )}
              {business.socialLinks.instagram && (
                <a
                  href={business.socialLinks.instagram}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gold-500 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramLogo size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceNames.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-white/60 hover:text-gold-400 text-sm transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin
                  size={18}
                  className="text-gold-500 shrink-0 mt-0.5"
                />
                <span className="text-white/60">
                  {business.address}, {business.country}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${business.phoneRaw}`}
                  className="flex gap-3 text-sm text-white/60 hover:text-gold-400 transition-colors"
                >
                  <Phone size={18} className="text-gold-500 shrink-0" />
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="flex gap-3 text-sm text-white/60 hover:text-gold-400 transition-colors"
                >
                  <Envelope size={18} className="text-gold-500 shrink-0" />
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${business.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-sm text-white/60 hover:text-green-400 transition-colors"
                >
                  <WhatsappLogo size={18} className="text-green-500 shrink-0" />
                  WhatsApp Us
                </a>
              </li>
              <li className="flex gap-3 text-sm">
                <Clock size={18} className="text-gold-500 shrink-0 mt-0.5" />
                <div className="text-white/60">
                  {business.hours.map((h) => (
                    <p key={h.day}>
                      {h.day}: {h.time}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {currentYear} {footer.copyright}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/40">
              <button
                onClick={() =>
                  document.dispatchEvent(new CustomEvent('openPrivacy'))
                }
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() =>
                  document.dispatchEvent(new CustomEvent('openCookie'))
                }
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
