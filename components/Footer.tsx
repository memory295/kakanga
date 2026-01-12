'use client';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(var(--header-bg)), hsl(var(--primary)))' }}
    >
      {/* Decorative diagonal curvy lines */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,20 Q200,300 800,800" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <path d="M150,20 Q350,350 950,800" fill="none" stroke="rgba(0,163,232,0.5)" strokeWidth="2" />
          <path d="M300,20 Q500,400 1100,800" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        </svg>
      </div>
      {/* Main Footer Content */}
      <div className="py-8 md:py-10">
        <div className="container-wide px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Company Info */}
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <img 
                  src="/images/kakangalogo.png" 
                  alt="Kakanga Constructions Logo" 
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <span className="font-heading font-bold text-lg md:text-xl text-white tracking-tight">KAKANGA</span>
                  <span className="block text-xs text-gray-400 uppercase tracking-widest">Constructions</span>
                </div>
              </Link>
              <p className="text-gray-400 body-small leading-relaxed mb-4">
                KAKANGA CONSTRUCTIONS is a leading construction company, based in Malawi and fully registered with all legal regulatory statutory bodies like NCIC (now known as CIRA), PPDA, MRA and others.
              </p>
              <div className="flex gap-2">
                <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Our Services (moved up) */}
            <div>
              <h4 className="font-heading font-semibold text-white text-lg mb-4 relative pb-2">
                Our Services
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" onClick={(e) => {
                    const scrollToService = () => {
                      const element = document.getElementById('prefabricated-structures');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        // Try again after a longer delay if element not found
                        setTimeout(scrollToService, 500);
                      }
                    };
                    
                    // If already on services page, scroll immediately
                    if (window.location.pathname === '/services') {
                      e.preventDefault();
                      scrollToService();
                    } else {
                      // Navigate first, then scroll after page loads
                      setTimeout(scrollToService, 500);
                    }
                  }} className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    Steel works/Lubrication
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={(e) => {
                    const scrollToService = () => {
                      const element = document.getElementById('prefabricated-structures');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        setTimeout(scrollToService, 500);
                      }
                    };
                    
                    if (window.location.pathname === '/services') {
                      e.preventDefault();
                      scrollToService();
                    } else {
                      setTimeout(scrollToService, 500);
                    }
                  }} className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    Prefabricated structures Installation
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={(e) => {
                    const scrollToService = () => {
                      const element = document.getElementById('structural-construction');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        setTimeout(scrollToService, 500);
                      }
                    };
                    
                    if (window.location.pathname === '/services') {
                      e.preventDefault();
                      scrollToService();
                    } else {
                      setTimeout(scrollToService, 500);
                    }
                  }} className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    Structural construction
                  </Link>
                </li>
              </ul>
            </div>

            {/* Other Links (moved down) */}
            <div>
              <h4 className="font-heading font-semibold text-white text-lg mb-4 relative pb-2">
                Other links
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://cira.mw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    NCIC (now CIRA)
                  </a>
                </li>
                <li>
                  <a href="https://www.mra.mw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    MRA
                  </a>
                </li>
                <li>
                  <a href="https://www.malawi.gov.mw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    PPDA
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-heading font-semibold text-white text-lg mb-4 relative pb-2">
                Contact Us
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">Karonga</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-gray-400 text-sm">
                    <p>+265 999 951 283</p>
                    <p>+265 1 234 567</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">info@kakangaconstructions.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 border-t border-white/10">
        <div className="container-wide px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Kakanga Constructions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/policy" className="text-white/90 hover:text-white text-sm font-medium transition-colors underline-offset-2 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/policy" className="text-white/90 hover:text-white text-sm font-medium transition-colors underline-offset-2 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
