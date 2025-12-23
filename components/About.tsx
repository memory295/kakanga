'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Target, Eye, Download, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useInView } from '@/hooks/use-in-view';
import clsx from 'clsx';

const About = () => {
  return (
    <section id="about" className="bg-section-alt pt-6 md:pt-8 pb-16 md:pb-24 px-4 md:px-8">
      <div className="container-wide">
        {/* About Company */}
        <SectionAnimated />
      </div>
    </section>
  );
};

const LeftColumn = ({ inView }: { inView: boolean }) => {
  return (
    <div
      className={clsx(
        'transition-all duration-500 ease-out will-change-transform',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      )}
    >
            <span className="caption text-header mb-2 block">
              About Us
            </span>
            <h2 className="heading-3 mb-3">
              About Kakanga Constructions
            </h2>
            <p className={clsx(
              'highlight-large text-header mb-6',
              inView && 'animate-in fade-in slide-in-from-bottom-2 delay-75 duration-500'
            )}>
              "Offering Comprehensive Construction Solutions tailored to your every need"
            </p>
            <p className={clsx('body-small mb-6', inView && 'animate-in fade-in slide-in-from-bottom-2 delay-125 duration-500')}>
              Kakanga Constructions is a leading Civil and Building Construction Company based in Malawi. As a company registered in the UNLIMITED CATEGORY with the National Construction Industry Council (NCIC) for both Building and Civil Construction, we have established ourselves as a trusted partner in infrastructure development.
            </p>
            <p className={clsx('body-small mb-8', inView && 'animate-in fade-in slide-in-from-bottom-2 delay-200 duration-500')}>
              With years of experience and a dedicated team of professionals, we deliver excellence in every project, from road construction to complex civil engineering works.
            </p>
            <div className={clsx('flex flex-wrap gap-3', inView && 'animate-in fade-in slide-in-from-bottom-2 delay-250 duration-500')}>
              <a href="/kakanga-profile.pdf" download className="inline-flex">
                <Button asChild variant="default" size="default" className="gap-2">
                  <span className="inline-flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Company Profile
                  </span>
                </Button>
              </a>
              <Link href="/about">
                <Button variant="outline" size="default" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Learn More <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
  );
};

const RightStats = ({ inView }: { inView: boolean }) => {
  return (
    <div
      className={clsx(
        'bg-header/10 rounded-lg p-8 h-full flex items-center transition-all duration-500 ease-out will-change-transform',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      )}
    >
      <div className="grid grid-cols-2 gap-6 w-full">
        {[
          { value: '15+', label: 'Years Experience', delay: 'delay-100' },
          { value: '200+', label: 'Projects Completed', delay: 'delay-150' },
          { value: '150+', label: 'Team Members', delay: 'delay-200' },
          { value: '50+', label: 'Equipment Fleet', delay: 'delay-250' },
        ].map((item, idx) => (
          <div
            key={idx}
            className={clsx(
              'text-center p-6 bg-white/30 rounded-lg border border-gray-100',
              inView && 'animate-in fade-in slide-in-from-bottom-2 duration-500',
              inView && item.delay
            )}
          >
            <span className="block text-3xl md:text-4xl font-heading font-bold text-header mb-2">{item.value}</span>
            <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

const SectionAnimated = () => {
  const { ref, inView } = useInView({ threshold: 0.05, rootMargin: '0px 0px -5% 0px', once: false });
  return (
    <div ref={ref as any} className="grid lg:grid-cols-2 gap-12 items-center">
      <LeftColumn inView={inView} />
      <RightStats inView={inView} />
    </div>
  );
};
