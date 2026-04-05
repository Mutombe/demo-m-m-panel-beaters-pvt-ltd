import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { designTokens } from '../../data/siteData';
import siteData from '../../data/siteData';
import SectionReveal from '../SectionReveal';

function Grid3Projects() {
  const { business, featuredProjects } = siteData;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {featuredProjects.map((project, index) => (
        <SectionReveal key={project.title} delay={index * 0.15}>
          <Link to="/projects" className="group relative block rounded-2xl overflow-hidden aspect-[4/5]">
            <img
              src={project.image}
              alt={`${project.title} by ${business.name}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-medium px-3 py-1 rounded-full mb-3">
                {project.category}
              </span>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
            </div>
          </Link>
        </SectionReveal>
      ))}
    </div>
  );
}

function MasonryProjects() {
  const { business, featuredProjects } = siteData;
  const heights = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-square'];

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {featuredProjects.map((project, index) => (
        <SectionReveal key={project.title} delay={index * 0.15}>
          <Link
            to="/projects"
            className={`group relative block rounded-2xl overflow-hidden ${heights[index % heights.length]} break-inside-avoid`}
          >
            <img
              src={project.image}
              alt={`${project.title} by ${business.name}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-medium px-3 py-1 rounded-full mb-2">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-white">{project.title}</h3>
            </div>
          </Link>
        </SectionReveal>
      ))}
    </div>
  );
}

function CarouselProjects() {
  const { business, featuredProjects } = siteData;
  const scrollRef = useRef(null);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`[data-carousel-scroll]::-webkit-scrollbar { display: none; }`}</style>
        {featuredProjects.map((project, index) => (
          <Link
            key={project.title}
            to="/projects"
            className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[40vw] snap-center rounded-2xl overflow-hidden aspect-[4/5]"
          >
            <img
              src={project.image}
              alt={`${project.title} by ${business.name}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-medium px-3 py-1 rounded-full mb-3">
                {project.category}
              </span>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      {/* Scroll fade hints */}
      <div className="absolute top-0 bottom-4 left-0 w-8 bg-gradient-to-r from-earth-50 to-transparent pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-4 right-0 w-8 bg-gradient-to-l from-earth-50 to-transparent pointer-events-none hidden md:block" />
    </div>
  );
}

function BentoProjects() {
  const { business, featuredProjects } = siteData;
  if (featuredProjects.length < 2) return <Grid3Projects />;

  return (
    <div className="grid md:grid-cols-2 gap-4 auto-rows-auto">
      {/* Large hero item */}
      <SectionReveal>
        <Link to="/projects" className="group relative block rounded-2xl overflow-hidden h-full min-h-[400px] md:row-span-2">
          <img
            src={featuredProjects[0].image}
            alt={`${featuredProjects[0].title} by ${business.name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-medium px-3 py-1 rounded-full mb-3">
              {featuredProjects[0].category}
            </span>
            <h3 className="text-2xl font-bold text-white">{featuredProjects[0].title}</h3>
          </div>
        </Link>
      </SectionReveal>

      {/* Stacked smaller items */}
      {featuredProjects.slice(1).map((project, index) => (
        <SectionReveal key={project.title} delay={(index + 1) * 0.15}>
          <Link to="/projects" className="group relative block rounded-2xl overflow-hidden aspect-video">
            <img
              src={project.image}
              alt={`${project.title} by ${business.name}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-medium px-3 py-1 rounded-full mb-2">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-white">{project.title}</h3>
            </div>
          </Link>
        </SectionReveal>
      ))}
    </div>
  );
}

function ProjectGrid() {
  const style = designTokens?.projectGridStyle || 'grid-3';

  const variants = {
    'grid-3': Grid3Projects,
    'masonry': MasonryProjects,
    'carousel': CarouselProjects,
    'bento': BentoProjects,
  };

  const Component = variants[style] || Grid3Projects;

  return (
    <section className="section-padding bg-earth-50">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <span className="inline-block text-gold-600 text-sm font-semibold uppercase tracking-wider mb-4">Our Portfolio</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900">Featured Projects</h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600 transition-colors">
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
        </SectionReveal>
        <Component />
      </div>
    </section>
  );
}

export default ProjectGrid;
