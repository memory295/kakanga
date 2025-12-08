import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Download, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const About = () => {
  return (
    <section id="about" className="bg-section-alt pt-6 md:pt-8 pb-16 md:pb-24 px-4 md:px-8">
      <div className="container-wide">
        {/* About Company */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              About Us
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
              About Kakanga Constructions
            </h2>
            <p className="text-primary font-medium text-lg mb-6">
              "Offering Comprehensive Construction Solutions tailored to your every need"
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Kakanga Constructions is a leading Civil and Building Construction Company based in Malawi. As a company registered in the UNLIMITED CATEGORY with the National Construction Industry Council (NCIC) for both Building and Civil Construction, we have established ourselves as a trusted partner in infrastructure development.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              With years of experience and a dedicated team of professionals, we deliver excellence in every project, from road construction to complex civil engineering works.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Download Company Profile
              </Button>
              <Link to="/about">
                <Button variant="outline" size="lg" className="gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="bg-primary/10 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-card rounded-lg shadow-sm">
                  <span className="block font-heading font-bold text-4xl text-primary mb-2">15+</span>
                  <span className="text-muted-foreground text-sm">Years Experience</span>
                </div>
                <div className="text-center p-6 bg-card rounded-lg shadow-sm">
                  <span className="block font-heading font-bold text-4xl text-primary mb-2">200+</span>
                  <span className="text-muted-foreground text-sm">Projects Completed</span>
                </div>
                <div className="text-center p-6 bg-card rounded-lg shadow-sm">
                  <span className="block font-heading font-bold text-4xl text-primary mb-2">150+</span>
                  <span className="text-muted-foreground text-sm">Team Members</span>
                </div>
                <div className="text-center p-6 bg-card rounded-lg shadow-sm">
                  <span className="block font-heading font-bold text-4xl text-primary mb-2">50+</span>
                  <span className="text-muted-foreground text-sm">Equipment Fleet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
