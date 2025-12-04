import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-header-bg">
      {/* Main Footer Content */}
      <div className="py-16 border-b border-header-foreground/10">
        <div className="container-wide px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-bold text-2xl">H</span>
                </div>
                <div>
                  <span className="font-heading font-bold text-xl text-header-foreground tracking-tight">HEMA</span>
                  <span className="block text-xs text-header-foreground/60 uppercase tracking-widest">Construction Ltd</span>
                </div>
              </Link>
              <p className="text-header-foreground/70 text-sm leading-relaxed mb-6">
                Hema Construction Limited is a leading Civil and Building Construction Company based in Malawi, registered in the UNLIMITED CATEGORY with NCIC.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-header-foreground/10 rounded-full flex items-center justify-center text-header-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-header-foreground/10 rounded-full flex items-center justify-center text-header-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-header-foreground/10 rounded-full flex items-center justify-center text-header-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-header-foreground/10 rounded-full flex items-center justify-center text-header-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-header-foreground text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/equipment" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Equipment
                  </Link>
                </li>
                <li>
                  <Link to="/vacancies" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Vacancies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-heading font-semibold text-header-foreground text-lg mb-6">Our Services</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Land Leveling
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Road Works
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Drilling & Blasting
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Concrete Works
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Earthworks
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-header-foreground/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Bridge Construction
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-heading font-semibold text-header-foreground text-lg mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-header-foreground/60 text-sm">Area 47, Sector 4, Lilongwe, Malawi</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-header-foreground/60 text-sm">
                    <p>+265 999 951 283</p>
                    <p>+265 1 234 567</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-header-foreground/60 text-sm">info@hemaconstruction.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-header-foreground/60 text-sm">
                    <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                    <p>Sat: 8:00 AM - 12:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6">
        <div className="container-wide px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-header-foreground/50 text-sm">
              © {new Date().getFullYear()} Hema Construction Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/policy" className="text-header-foreground/50 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/policy" className="text-header-foreground/50 hover:text-primary text-sm transition-colors">
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
