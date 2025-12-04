import { Button } from './ui/button';
import heroImage from '@/assets/hero-construction.jpg';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Road construction in progress"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-32">
        <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-6 animate-slide-up tracking-tight">
          ROAD CONSTRUCTION
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 animate-slide-up font-light" style={{ animationDelay: '0.2s' }}>
          We Build with integrity, deliver with pride.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button variant="hero" size="xl" asChild>
            <a href="#services">Our Services</a>
          </Button>
          <Button variant="hero-outline" size="xl" asChild>
            <a href="#contact">Get a Quote</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
