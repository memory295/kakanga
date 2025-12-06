import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/equipment', label: 'Equipments' },
  { href: '/policy', label: 'Policy' },
  { href: '/vacancies', label: 'Vacancies' },
  { href: '/contact', label: 'Contact Us' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top ribbon with contact info (thin white background) */}
      <div className="bg-white/90 backdrop-blur-sm py-1 px-4 shadow-sm">
        <div className="container-wide flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="mailto:info@kakangaconstructions.com" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors">
              <Mail className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">info@kakangaconstructions.com</span>
            </a>
            <a href="tel:+265999951283" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">+265 999 951 283</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation (transparent over hero) */}
      <nav className="bg-transparent">
        <div className="container-wide flex justify-between items-center py-4 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center">
              <img 
                src="/images/kakangalogo.jpg" 
                alt="Kakanga Constructions Logo" 
                className="w-14 h-14 object-contain"
              />
              <div className="ml-3">
                <span className="font-heading font-bold text-2xl text-header-foreground tracking-tight">KAKANGA</span>
                <span className="block text-[0.7rem] text-header-foreground/70 uppercase tracking-widest">Constructions</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.href === '/about') {
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      to={link.href}
                      className={`nav-link text-sm font-medium py-2 transition-colors ${
                        location.pathname === link.href 
                          ? 'text-primary' 
                          : 'text-header-foreground/80 group-hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                    {/* Hover dropdown menu */}
                    <div className="absolute left-0 mt-2 w-56 bg-background/95 backdrop-blur-md border border-border rounded-md shadow-lg hidden group-hover:block">
                      <div className="py-2">
                        <Link to="/about" className="block px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted/40">Who we are</Link>
                        <a href="#about" className="block px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted/40">Our Vision & Mission</a>
                        <Link to="/about#team" className="block px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted/40">Our Team</Link>
                        <Link to="/about#why-us" className="block px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted/40">Why Us</Link>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`nav-link text-sm font-medium py-2 transition-colors ${
                    location.pathname === link.href 
                      ? 'text-primary' 
                      : 'text-header-foreground/80 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-header-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border animate-fade-in">
            <div className="container-wide py-4 px-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 px-2 border-b border-border/50 last:border-0 ${
                    location.pathname === link.href 
                      ? 'text-primary font-medium' 
                      : 'text-header-foreground/90 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
