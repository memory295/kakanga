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
      {/* Top bar with contact info */}
      <div className="bg-header-bg py-2 px-4">
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
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center">
              <img 
                src="/images/kakangalogo.jpg" 
                alt="Kakanga Constructions Logo" 
                className="w-12 h-12 object-contain"
              />
              <div className="ml-3">
                <span className="font-heading font-bold text-xl text-foreground tracking-tight">KAKANGA</span>
                <span className="block text-xs text-muted-foreground uppercase tracking-widest">Constructions</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link text-sm font-medium py-2 transition-colors ${
                  location.pathname === link.href 
                    ? 'text-primary' 
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
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
            <div className="container-wide py-4 px-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 px-2 border-b border-border/50 last:border-0 ${
                    location.pathname === link.href 
                      ? 'text-primary font-medium' 
                      : 'text-foreground/80 hover:text-primary'
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
