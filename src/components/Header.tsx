import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#values', label: 'Core Values' },
  { href: '#contact', label: 'Contact Us' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-header py-2 px-4">
        <div className="container-wide flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="mailto:info@hemaconstruction.com" className="flex items-center gap-2 text-sm text-header-foreground/80 hover:text-primary transition-colors">
              <Mail className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">info@hemaconstruction.com</span>
            </a>
            <a href="tel:+265999951283" className="flex items-center gap-2 text-sm text-header-foreground/80 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">+265 999 951 283</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-background/95 backdrop-blur-md shadow-md">
        <div className="container-wide flex justify-between items-center py-4 px-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xl">H</span>
              </div>
              <div className="ml-2">
                <span className="font-heading font-bold text-xl text-foreground tracking-tight">HEMA</span>
                <span className="block text-xs text-muted-foreground uppercase tracking-widest">Construction Ltd</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium text-foreground/80 hover:text-primary py-2"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in">
            <div className="container-wide py-4 px-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-foreground/80 hover:text-primary py-2 border-b border-border/50 last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
