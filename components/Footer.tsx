'use client';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container-wide px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6">
                <img 
                  src="/images/kakangalogo.png" 
                  alt="Kakanga Constructions Logo" 
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <span className="font-heading font-bold text-xl text-white tracking-tight">KAKANGA</span>
                  <span className="block text-xs text-gray-400 uppercase tracking-widest">Constructions</span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Kakanga Constructions is a leading Civil and Building Construction Company based in Malawi, registered in the UNLIMITED CATEGORY with NCIC.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-white text-lg mb-6 relative pb-3">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    Projects
                  </Link>
                </li>
                {/* <li>
                  <Link href="/equipment" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    Equipment
                  </Link>
                </li> */}
                <li>
                  <Link href="/vacancies" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    Vacancies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-heading font-semibold text-white text-lg mb-6 relative pb-3">
                Our Services
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
              </h4>
              <ul className="space-y-3">
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
                    Land Leveling
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={(e) => {
                    const scrollToService = () => {
                      const element = document.getElementById('civil-works');
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
                    Road Works
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={(e) => {
                    const scrollToService = () => {
                      const element = document.getElementById('materials-supply');
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
                    Drilling & Blasting
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={(e) => {
                    const scrollToService = () => {
                      const element = document.getElementById('house-design-construction');
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
                    Concrete Works
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={(e) => {
                    const scrollToService = () => {
                      const element = document.getElementById('civil-works');
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
                    Earthworks
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={(e) => {
                    const scrollToService = () => {
                      const element = document.getElementById('civil-works');
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
                    Bridge Construction
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-heading font-semibold text-white text-lg mb-6 relative pb-3">
                Contact Us
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">Area 47, Sector 4, Lilongwe, Malawi</span>
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
      <div className="py-6 border-t border-white/10">
        <div className="container-wide px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Kakanga Constructions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/policy" className="text-gray-500 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/policy" className="text-gray-500 hover:text-primary text-sm transition-colors">
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
