import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Phone,
  Envelope,
  MapPin,
  WhatsappLogo,
  Clock,
  PaperPlaneTilt,
  NavigationArrow,
  ChatCircleDots,
  EnvelopeSimple,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import SectionReveal from '../components/SectionReveal';
import siteData from '../data/siteData';

function Contact() {
  const { business, contact, services } = siteData;

  const heroImage =
    siteData.pageImages?.contact ||
    siteData.hero?.backgroundImage ||
    '';

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: business.phone,
      href: `tel:${business.phoneRaw}`,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      icon: Envelope,
      label: 'Email',
      value: business.email,
      href: `mailto:${business.email}`,
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      icon: WhatsappLogo,
      label: 'WhatsApp',
      value: 'Chat with us',
      href: `https://wa.me/${business.whatsappNumber}`,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: business.address,
      href: `https://www.google.com/maps?q=${business.coordinates.lat},${business.coordinates.lng}`,
      color: 'text-gold-600',
      bg: 'bg-gold-50',
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [sendMethod, setSendMethod] = useState('email');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.message) {
      toast.error('Please fill in your name and message.');
      return;
    }

    if (sendMethod === 'whatsapp') {
      const text = encodeURIComponent(
        `Hello ${business.name},\n\nMy name is ${formData.name}.\n${
          formData.service ? `Service: ${formData.service}\n` : ''
        }${formData.email ? `Email: ${formData.email}\n` : ''}${
          formData.phone ? `Phone: ${formData.phone}\n` : ''
        }\nMessage:\n${formData.message}`
      );
      window.open(`https://wa.me/${business.whatsappNumber}?text=${text}`, '_blank');
      toast.success('Opening WhatsApp with your message.');
    } else {
      const subject = encodeURIComponent(
        `Project Inquiry${formData.service ? `: ${formData.service}` : ''} - ${formData.name}`
      );
      const body = encodeURIComponent(
        `Dear ${business.name},\n\nMy name is ${formData.name}.\n${
          formData.phone ? `Phone: ${formData.phone}\n` : ''
        }${
          formData.service ? `Service interested in: ${formData.service}\n` : ''
        }\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`
      );
      window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
      toast.success('Opening your email client with the message.');
    }
  };

  return (
    <PageTransition>
      <PageHero
        label="Get in Touch"
        title={contact.heroTitle}
        subtitle={contact.heroSubtitle}
        image={heroImage}
        imageAlt={`Contact ${business.name}`}
      />

      {/* Contact Cards */}
      <section className="relative -mt-8 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {contactInfo.map((item, index) => (
            <SectionReveal key={item.label} delay={index * 0.1}>
              <a
                href={item.href}
                target={item.label === 'WhatsApp' || item.label === 'Address' ? '_blank' : undefined}
                rel={item.label === 'WhatsApp' || item.label === 'Address' ? 'noopener noreferrer' : undefined}
                className="block bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg shadow-black/5 border border-earth-100 hover:shadow-xl transition-shadow group"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 ${item.bg} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4`}
                >
                  <item.icon
                    size={20}
                    className={item.color}
                    weight="fill"
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-steel-400 uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-navy-900 font-semibold text-xs sm:text-sm group-hover:text-gold-600 transition-colors truncate">
                  {item.value}
                </p>
              </a>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <SectionReveal direction="right">
                <div className="bg-earth-50/50 border border-earth-100 rounded-2xl p-6 sm:p-8 md:p-10">
                  <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-2">
                    {contact.formTitle}
                  </h2>
                  <p className="text-steel-500 text-sm mb-6 sm:mb-8">
                    {contact.formSubtitle}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-navy-900 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-earth-200 rounded-xl px-4 py-3 text-navy-900 text-sm placeholder:text-steel-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-navy-900 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white border border-earth-200 rounded-xl px-4 py-3 text-navy-900 text-sm placeholder:text-steel-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-navy-900 mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-white border border-earth-200 rounded-xl px-4 py-3 text-navy-900 text-sm placeholder:text-steel-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
                          placeholder="+263 ..."
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="service"
                          className="block text-sm font-medium text-navy-900 mb-2"
                        >
                          Service Needed
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-white border border-earth-200 rounded-xl px-4 py-3 text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
                        >
                          <option value="">Select a service</option>
                          {services.items.map((s) => (
                            <option key={s.title}>{s.title}</option>
                          ))}
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-navy-900 mb-2"
                      >
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-white border border-earth-200 rounded-xl px-4 py-3 text-navy-900 text-sm placeholder:text-steel-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {/* Send Method */}
                    <div>
                      <p className="text-sm font-medium text-navy-900 mb-3">
                        How would you like to send this?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setSendMethod('email')}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                            sendMethod === 'email'
                              ? 'border-gold-500 bg-gold-50 text-gold-700'
                              : 'border-earth-200 text-steel-500 hover:border-earth-300'
                          }`}
                        >
                          <EnvelopeSimple size={18} />
                          Email
                        </button>
                        <button
                          type="button"
                          onClick={() => setSendMethod('whatsapp')}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                            sendMethod === 'whatsapp'
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-earth-200 text-steel-500 hover:border-earth-300'
                          }`}
                        >
                          <WhatsappLogo size={18} weight="fill" />
                          WhatsApp
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5 text-sm sm:text-base ${
                        sendMethod === 'whatsapp'
                          ? 'bg-green-600 hover:bg-green-500'
                          : 'bg-gold-500 hover:bg-gold-400'
                      }`}
                    >
                      {sendMethod === 'whatsapp' ? (
                        <>
                          <ChatCircleDots size={20} />
                          Send via WhatsApp
                        </>
                      ) : (
                        <>
                          <PaperPlaneTilt size={20} />
                          Send via Email
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </SectionReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <SectionReveal direction="left">
                <div className="bg-navy-900 text-white rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <Clock size={24} className="text-gold-400" />
                    <h3 className="text-base sm:text-lg font-bold">Business Hours</h3>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {business.hours.map((h) => (
                      <div
                        key={h.day}
                        className="flex items-center justify-between text-xs sm:text-sm"
                      >
                        <span className="text-white/70">{h.day}</span>
                        <span
                          className={`font-medium ${
                            h.time === 'Closed'
                              ? 'text-red-400'
                              : 'text-gold-400'
                          }`}
                        >
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal direction="left" delay={0.1}>
                <div className="bg-earth-50 rounded-2xl p-6 sm:p-8 border border-earth-100">
                  <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-4">
                    Quick Contact
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <a
                      href={`tel:${business.phoneRaw}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Phone size={18} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs text-steel-400">Call Us</p>
                        <p className="text-navy-900 font-semibold text-xs sm:text-sm">
                          {business.phone}
                        </p>
                      </div>
                    </a>
                    <a
                      href={`https://wa.me/${business.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-50 rounded-lg flex items-center justify-center">
                        <WhatsappLogo
                          size={18}
                          className="text-green-500"
                          weight="fill"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-steel-400">WhatsApp</p>
                        <p className="text-navy-900 font-semibold text-xs sm:text-sm">
                          Chat Now
                        </p>
                      </div>
                    </a>
                    <a
                      href={`mailto:${business.email}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <Envelope size={18} className="text-red-500" />
                      </div>
                      <div>
                        <p className="text-xs text-steel-400">Email</p>
                        <p className="text-navy-900 font-semibold text-xs sm:text-sm truncate max-w-[180px]">
                          {business.email}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal direction="left" delay={0.2}>
                <a
                  href={`https://www.google.com/maps?q=${business.coordinates.lat},${business.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-white p-4 rounded-2xl transition-colors"
                >
                  <NavigationArrow size={24} weight="fill" />
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Get Directions</p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Open in Google Maps
                    </p>
                  </div>
                </a>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-earth-50">
        <SectionReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4 sm:mb-6 flex items-center gap-3">
              <MapPin size={24} className="text-gold-500" />
              Find Us
            </h3>
          </div>
          <div className="w-full h-[300px] sm:h-[450px] bg-earth-200">
            <iframe
              src={business.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${business.name} office location on Google Maps`}
            />
          </div>
        </SectionReveal>
      </section>
    </PageTransition>
  );
}

export default Contact;
