'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Target, Eye, Download, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const About = () => {
  return (
    <section id="about" className="bg-section-alt pt-6 md:pt-8 pb-16 md:pb-24 px-4 md:px-8">
      <div className="container-wide">
        {/* About Company */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="caption text-header mb-2 block">
              About Us
            </span>
            <h2 className="heading-3 mb-3">
              About Kakanga Constructions
            </h2>
            <p className="highlight-large text-header mb-6">
              "Offering Comprehensive Construction Solutions tailored to your every need"
            </p>
            <p className="body-small mb-6">
              Kakanga Constructions is a leading Civil and Building Construction Company based in Malawi. As a company registered in the UNLIMITED CATEGORY with the National Construction Industry Council (NCIC) for both Building and Civil Construction, we have established ourselves as a trusted partner in infrastructure development.
            </p>
            <p className="body-small mb-8">
              With years of experience and a dedicated team of professionals, we deliver excellence in every project, from road construction to complex civil engineering works.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/kakanga-profile.pdf" download className="inline-flex">
                <Button asChild variant="default" size="default" className="gap-2 bg-header hover:bg-header/90 text-white">
                  <span className="inline-flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Company Profile
                  </span>
                </Button>
              </a>
              <Link href="/about">
                <Button variant="outline" size="default" className="gap-2 border-header text-header hover:bg-header hover:text-white">
                  Learn More <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-header/10 rounded-lg p-8 h-full flex items-center">
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="text-center p-6 bg-white/30 rounded-lg border border-gray-100">
                <span className="block text-3xl md:text-4xl font-heading font-bold text-header mb-2">15+</span>
                <span className="text-sm font-medium text-muted-foreground">Years Experience</span>
              </div>
              <div className="text-center p-6 bg-white/30 rounded-lg border border-gray-100">
                <span className="block text-3xl md:text-4xl font-heading font-bold text-header mb-2">200+</span>
                <span className="text-sm font-medium text-muted-foreground">Projects Completed</span>
              </div>
              <div className="text-center p-6 bg-white/30 rounded-lg border border-gray-100">
                <span className="block text-3xl md:text-4xl font-heading font-bold text-header mb-2">150+</span>
                <span className="text-sm font-medium text-muted-foreground">Team Members</span>
              </div>
              <div className="text-center p-6 bg-white/30 rounded-lg border border-gray-100">
                <span className="block text-3xl md:text-4xl font-heading font-bold text-header mb-2">50+</span>
                <span className="text-sm font-medium text-muted-foreground">Equipment Fleet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
